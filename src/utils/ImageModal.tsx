import { Modal } from "react-bootstrap";
import { FC, useState, useEffect, useRef, useCallback } from "react";
import {
  FaDownload,
  FaSearchPlus,
  FaSearchMinus,
  FaTimes,
  FaSpinner,
  FaCompress,
  FaUndo,
  FaExpandArrowsAlt,
} from "react-icons/fa";

declare global {
  interface Window {
    flutter_inappwebview?: {
      callHandler: (handlerName: string, ...args: unknown[]) => void;
    };
  }
}

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
  const [canDrag, setCanDrag] = useState(false);
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
  const [longPressTimeout, setLongPressTimeout] =
    useState<NodeJS.Timeout | null>(null);

  const imgRef = useRef<HTMLImageElement | null>(null);
  const containerRef = useRef<HTMLDivElement | null>(null);

  useEffect(() => {
    const mobile =
      /Android|webOS|iPhone|iPad|iPod|BlackBerry|IEMobile|Opera Mini/i.test(
        navigator.userAgent
      );
    setIsMobile(mobile);
  }, []);

  useEffect(() => {
    if (!show) return;
    const updateContainerSize = () => {
      if (containerRef.current) {
        setContainerWidth(containerRef.current.clientWidth);
        setContainerHeight(containerRef.current.clientHeight);
      }
    };
    updateContainerSize();
    window.addEventListener("resize", updateContainerSize);
    return () => window.removeEventListener("resize", updateContainerSize);
  }, [show]);

  const resetTransform = useCallback(() => {
    setScale(1);
    setTranslateX(0);
    setTranslateY(0);
  }, []);

  const zoomIn = useCallback(() => {
    setScale((prev) => Math.min(prev * 1.2, maxScale));
  }, [maxScale]);

  const zoomOut = useCallback(() => {
    setScale((prev) => Math.max(prev / 1.2, minScale));
  }, [minScale]);

  const downloadImage = async () => {
    try {
      const response = await fetch(imgUrl);
      const blob = await response.blob();
      const url = URL.createObjectURL(blob);

      if (window.flutter_inappwebview) {
        window.flutter_inappwebview.callHandler("saveImageToGallery", imgUrl);
        return;
      }

      const link = document.createElement("a");
      link.href = url;
      const filename = imgUrl.split("/").pop() || "download.jpg";
      link.download = filename.includes(".") ? filename : `${filename}.jpg`;
      document.body.appendChild(link);
      link.click();
      document.body.removeChild(link);
      URL.revokeObjectURL(url);
    } catch (error) {
      console.error("下载失败:", error);
      window.open(imgUrl, "_blank")?.focus();
    }
  };

  // 仅左键，长按300ms后允许拖动
  const handleDragStart = (e: React.MouseEvent | React.TouchEvent) => {
    if ("button" in e && e.button !== 0) return; // 仅左键

    const point = "touches" in e ? e.touches[0] : e;

    setStartX(point.clientX - translateX);
    setStartY(point.clientY - translateY);

    if (!isPinching) {
      const timeout = setTimeout(() => {
        setIsDragging(true);
        setCanDrag(true);
      }, 50);
      setLongPressTimeout(timeout);
    }
  };

  const handleDragMove = (e: React.MouseEvent | React.TouchEvent) => {
    if (isDragging && canDrag && !isPinching) {
      const point = "touches" in e ? e.touches[0] : e;
      const newX = point.clientX - startX;
      const newY = point.clientY - startY;

      const maxX = Math.max((imgWidth * scale - containerWidth) / 2, 0);
      const maxY = Math.max((imgHeight * scale - containerHeight) / 2, 0);

      setTranslateX(Math.max(-maxX, Math.min(maxX, newX)));
      setTranslateY(Math.max(-maxY, Math.min(maxY, newY)));
    }
  };

  const handleDragEnd = () => {
    if (longPressTimeout) {
      clearTimeout(longPressTimeout);
      setLongPressTimeout(null);
    }
    setIsDragging(false);
    setCanDrag(false);
  };

  const handleTouchStart = (e: React.TouchEvent<HTMLImageElement>) => {
    if (e.touches.length === 2) {
      const touches = Array.from(e.touches);
      const t1 = touches[0];
      const t2 = touches[1];

      const dx = t2.clientX - t1.clientX;
      const dy = t2.clientY - t1.clientY;
      setStartDistance(Math.sqrt(dx * dx + dy * dy));
      setInitialScale(scale);
      setIsPinching(true);
      setIsDragging(false);

      if (longPressTimeout) {
        clearTimeout(longPressTimeout);
        setLongPressTimeout(null);
      }
    }
  };

  const handleTouchMove = (e: React.TouchEvent<HTMLImageElement>) => {
    if (isPinching && e.touches.length === 2) {
      const touches = Array.from(e.touches);
      const t1 = touches[0];
      const t2 = touches[1];

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
    }
  };

  const handleTouchEnd = () => {
    setIsPinching(false);
    if (longPressTimeout) {
      clearTimeout(longPressTimeout);
      setLongPressTimeout(null);
    }
  };

  const handleWheel = (e: React.WheelEvent<HTMLDivElement>) => {
    e.preventDefault();
    const delta = e.deltaY < 0 ? 1.1 : 0.9;
    const newScale = Math.min(Math.max(scale * delta, minScale), maxScale);
    const rect = e.currentTarget.getBoundingClientRect();
    const offsetX = e.clientX - rect.left;
    const offsetY = e.clientY - rect.top;
    const deltaScale = newScale / scale;

    setTranslateX((prev) => prev + (offsetX - prev) * (1 - deltaScale));
    setTranslateY((prev) => prev + (offsetY - prev) * (1 - deltaScale));
    setScale(newScale);
  };

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
      resetTransform();
      setImageLoaded(false);
      if (longPressTimeout) {
        clearTimeout(longPressTimeout);
        setLongPressTimeout(null);
      }
    }
  }, [show, resetTransform, longPressTimeout]);


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
        <div className="position-absolute top-0 left-0 w-full p-3 flex justify-between items-center z-10">
          <div className="flex items-center space-x-2">
            <button
              onClick={onHide}
              title="关闭 (ESC)"
              className="bg-white p-2 rounded-full"
            >
              <FaTimes />
            </button>
            <button
              onClick={resetTransform}
              title="重置视图 (0)"
              className="bg-white p-2 rounded-full"
            >
              <FaUndo />
            </button>
            <div className="bg-white text-gray-800 rounded-full px-3 py-1 text-sm font-medium">
              {Math.round(scale * 100)}%
            </div>
          </div>
          <div className="flex space-x-2">
            <button
              onClick={zoomOut}
              title="缩小 (-)"
              className="bg-white p-2 rounded-full"
            >
              <FaSearchMinus />
            </button>
            <button
              onClick={zoomIn}
              title="放大 (+)"
              className="bg-white p-2 rounded-full"
            >
              <FaSearchPlus />
            </button>
            <button
              onClick={downloadImage}
              title="保存图片"
              className="bg-white p-2 rounded-full"
            >
              <FaDownload />
            </button>
          </div>
        </div>

        <div
          ref={containerRef}
          className="relative w-full h-[90vh] overflow-hidden bg-gray-900"
          onWheel={handleWheel}
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
            onMouseDown={handleDragStart}
            onMouseMove={handleDragMove}
            onMouseUp={handleDragEnd}
            onMouseLeave={handleDragEnd}
            onTouchStart={handleTouchStart}
            onTouchMove={handleTouchMove}
            onTouchEnd={handleTouchEnd}
            style={{
              position: "absolute",
              left: "50%",
              top: "50%",
              transform: `translate(calc(-50% + ${translateX}px), calc(-50% + ${translateY}px)) scale(${scale})`,
              maxWidth: "none",
              maxHeight: "none",
              opacity: imageLoaded ? 1 : 0,
              cursor:
                scale > 1 && canDrag
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
                <FaExpandArrowsAlt className="inline-block mr-2" />
                双指缩放，单指拖动
              </>
            ) : (
              <>
                <FaCompress className="inline-block mr-2" />
                鼠标滚轮缩放，长按左键拖动，ESC关闭
              </>
            )}
          </div>
        </div>
      </Modal.Body>
    </Modal>
  );
};

export default ImageModal;
