import { Modal } from "react-bootstrap";
import { FC, useState, useEffect, useRef, useCallback } from "react";
import { FaSpinner, FaCompress, FaExpandArrowsAlt } from "react-icons/fa";

interface ImageModalProps {
  show: boolean;
  onHide: () => void;
  imgUrl: string;
}

const ImageModal: FC<ImageModalProps> = ({ show, onHide, imgUrl }) => {
  const [scale, setScale] = useState(1);
  const [translateX, setTranslateX] = useState(0);
  const [translateY, setTranslateY] = useState(0);
  const [isDragging, setIsDragging] = useState(false);
  const [startX, setStartX] = useState(0);
  const [startY, setStartY] = useState(0);
  const [startDistance, setStartDistance] = useState(0);
  const [initialScale, setInitialScale] = useState(1);
  const [isPinching, setIsPinching] = useState(false);
  const [imageLoaded, setImageLoaded] = useState(false);
  const [minScale, setMinScale] = useState(0.5);
  const [maxScale] = useState(5);
  const [containerWidth, setContainerWidth] = useState(0);
  const [containerHeight, setContainerHeight] = useState(0);
  const [imgWidth, setImgWidth] = useState(0);
  const [imgHeight, setImgHeight] = useState(0);
  const [isMobile, setIsMobile] = useState(false);

  const imgRef = useRef<HTMLImageElement | null>(null);
  const containerRef = useRef<HTMLDivElement | null>(null);

  useEffect(() => {
    setIsMobile(/Android|iPhone|iPad|iPod/i.test(navigator.userAgent));
  }, []);

  useEffect(() => {
    if (!show) return;
    const updateSize = () => {
      if (containerRef.current) {
        setContainerWidth(containerRef.current.clientWidth);
        setContainerHeight(containerRef.current.clientHeight);
      }
    };
    updateSize();
    window.addEventListener("resize", updateSize);
    return () => window.removeEventListener("resize", updateSize);
  }, [show]);

  const handleDragStart = (e: React.MouseEvent | React.TouchEvent) => {
    let clientX: number, clientY: number;

    if ("touches" in e && e.touches.length === 1) {
      clientX = e.touches[0].clientX;
      clientY = e.touches[0].clientY;
    } else if ("clientX" in e.nativeEvent) {
      if ((e.nativeEvent as MouseEvent).button !== 0) return;
      clientX = (e.nativeEvent as MouseEvent).clientX;
      clientY = (e.nativeEvent as MouseEvent).clientY;
    } else {
      return;
    }

    const rect = containerRef.current?.getBoundingClientRect();
    if (!rect) return;

    const offsetX = clientX - rect.left;
    const offsetY = clientY - rect.top;

    setStartX(offsetX - translateX);
    setStartY(offsetY - translateY);
    setIsDragging(true);
  };

  const handleDragMove = (e: React.MouseEvent | React.TouchEvent) => {
    if (!isDragging) return;

    let clientX: number, clientY: number;

    if ("touches" in e && e.touches.length === 1) {
      clientX = e.touches[0].clientX;
      clientY = e.touches[0].clientY;
    } else if ("clientX" in e.nativeEvent) {
      clientX = (e.nativeEvent as MouseEvent).clientX;
      clientY = (e.nativeEvent as MouseEvent).clientY;
    } else {
      return;
    }

    const rect = containerRef.current?.getBoundingClientRect();
    if (!rect) return;

    const offsetX = clientX - rect.left;
    const offsetY = clientY - rect.top;

    const newX = offsetX - startX;
    const newY = offsetY - startY;

    const maxX = Math.max((imgWidth * scale - containerWidth) / 2, 0);
    const maxY = Math.max((imgHeight * scale - containerHeight) / 2, 0);

    setTranslateX(Math.max(-maxX, Math.min(maxX, newX)));
    setTranslateY(Math.max(-maxY, Math.min(maxY, newY)));
  };

  const handleTouchStart = (e: React.TouchEvent<HTMLImageElement>) => {
    if (e.touches.length === 2) {
      const [t1, t2] = [e.touches[0], e.touches[1]];
      const dx = t2.clientX - t1.clientX;
      const dy = t2.clientY - t1.clientY;
      setStartDistance(Math.sqrt(dx * dx + dy * dy));
      setInitialScale(scale);
      setIsPinching(true);
      setIsDragging(false);
    } else if (e.touches.length === 1) {
      handleDragStart(e);
    }
  };

  const handleTouchMove = (e: React.TouchEvent<HTMLImageElement>) => {
    if (isPinching && e.touches.length === 2) {
      const [t1, t2] = [e.touches[0], e.touches[1]];
      const dx = t2.clientX - t1.clientX;
      const dy = t2.clientY - t1.clientY;
      const newDist = Math.sqrt(dx * dx + dy * dy);
      const newScale = Math.min(
        Math.max(initialScale * (newDist / startDistance), minScale),
        maxScale
      );

      const container = containerRef.current?.getBoundingClientRect();
      if (!container) return;

      const centerX = (t1.clientX + t2.clientX) / 2 - container.left;
      const centerY = (t1.clientY + t2.clientY) / 2 - container.top;
      const deltaScale = newScale / scale;

      setTranslateX((prev) => prev + (centerX - prev) * (1 - deltaScale));
      setTranslateY((prev) => prev + (centerY - prev) * (1 - deltaScale));
      setScale(newScale);
    } else if (e.touches.length === 1 && isDragging) {
      handleDragMove(e);
    }
  };

  const handleTouchEnd = () => {
    setIsPinching(false);
    setIsDragging(false);
  };

  const handleWheel = useCallback(
    (e: WheelEvent) => {
      e.preventDefault();
      const delta = e.deltaY < 0 ? 1.1 : 0.9;
      const newScale = Math.min(Math.max(scale * delta, minScale), maxScale);

      const container = containerRef.current;
      if (!container) return;
      const rect = container.getBoundingClientRect();
      const offsetX = e.clientX - rect.left;
      const offsetY = e.clientY - rect.top;
      const deltaScale = newScale / scale;

      setTranslateX((prev) => prev + (offsetX - prev) * (1 - deltaScale));
      setTranslateY((prev) => prev + (offsetY - prev) * (1 - deltaScale));
      setScale(newScale);
    },
    [scale, minScale, maxScale]
  );

  useEffect(() => {
    const container = containerRef.current;
    if (!container) return;
    container.addEventListener("wheel", handleWheel, { passive: false });
    return () => container.removeEventListener("wheel", handleWheel);
  }, [handleWheel]);

  const handleImageLoad = () => {
    const img = imgRef.current;
    const container = containerRef.current;
    if (!img || !container) return;

    const imgW = img.naturalWidth;
    const imgH = img.naturalHeight;
    const conW = container.clientWidth;
    const conH = container.clientHeight;

    setImgWidth(imgW);
    setImgHeight(imgH);

    const fitScale = Math.min(conW / imgW, conH / imgH, 1);
    setScale(fitScale);
    setMinScale(Math.min(fitScale * 0.8, 0.5));
    setTranslateX(0);
    setTranslateY(0);
    setImageLoaded(true);
  };

  useEffect(() => {
    if (!show) {
      setScale(1);
      setTranslateX(0);
      setTranslateY(0);
      setImageLoaded(false);
    }
  }, [show]);

  return (
    <Modal
      show={show}
      onHide={onHide}
      centered
      size="xl"
      contentClassName="border-0 bg-transparent"
      dialogClassName="border-0 bg-transparent"
      backdropClassName="bg-black/80 backdrop-blur-sm"
    >
      <Modal.Body className="text-center p-0 position-relative">
        <div
          ref={containerRef}
          className="relative w-full h-[90vh] overflow-hidden bg-black touch-none select-none"
          onMouseDown={handleDragStart}
          onMouseMove={handleDragMove}
          onMouseUp={() => setIsDragging(false)}
          onMouseLeave={() => setIsDragging(false)}
          onTouchStart={handleTouchStart}
          onTouchMove={handleTouchMove}
          onTouchEnd={handleTouchEnd}
        >
          {!imageLoaded && (
            <div className="absolute inset-0 flex items-center justify-center">
              <FaSpinner className="text-white text-4xl animate-spin" />
            </div>
          )}
          <img
            ref={imgRef}
            src={imgUrl}
            alt="图片"
            onLoad={handleImageLoad}
            style={{
              position: "absolute",
              left: "50%",
              top: "50%",
              transform: `translate(calc(-50% + ${translateX}px), calc(-50% + ${translateY}px)) scale(${scale})`,
              maxWidth: "none",
              maxHeight: "none",
              opacity: imageLoaded ? 1 : 0,
              cursor:
                scale > 1 && isDragging
                  ? "grabbing"
                  : scale > 1
                  ? "grab"
                  : "default",
              transition:
                isDragging || isPinching ? "none" : "transform 0.2s ease",
              userSelect: "none",
            }}
            draggable={false}
          />
        </div>

        <div className="absolute bottom-4 left-0 w-full text-center z-10">
          <div className="bg-black/50 text-white/80 inline-block px-4 py-2 rounded-full text-sm">
            {isMobile ? (
              <>
                <FaExpandArrowsAlt className="inline-block mr-2" />{" "}
                双指缩放，单指拖动
              </>
            ) : (
              <>
                <FaCompress className="inline-block mr-2" />{" "}
                鼠标滚轮缩放，左键拖动
              </>
            )}
          </div>
        </div>
      </Modal.Body>
    </Modal>
  );
};

export default ImageModal;
