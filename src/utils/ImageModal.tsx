import { Modal } from "react-bootstrap";
import { FC, useState, useEffect, useRef } from "react";
import {
  FaDownload,
  FaSearchPlus,
  FaSearchMinus,
  FaExpand,
} from "react-icons/fa";

// 声明 flutter_inappwebview 类型
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
  const [startX, setStartX] = useState(0);
  const [startY, setStartY] = useState(0);
  const [isDragging, setIsDragging] = useState(false);
  const [startDistance, setStartDistance] = useState(0);
  const [initialScale, setInitialScale] = useState(1);
  const [isPinching, setIsPinching] = useState(false);
  const [containerWidth, setContainerWidth] = useState(0);
  const [containerHeight, setContainerHeight] = useState(0);
  const [isMobile, setIsMobile] = useState(false);

  // 图片和容器引用
  const imgRef = useRef<HTMLImageElement | null>(null);
  const containerRef = useRef<HTMLDivElement | null>(null);

  // 检测设备类型
  useEffect(() => {
    setIsMobile(
      /Android|webOS|iPhone|iPad|iPod|BlackBerry|IEMobile|Opera Mini/i.test(
        navigator.userAgent
      )
    );
  }, []);

  // 计算容器尺寸
  useEffect(() => {
    const updateContainerSize = () => {
      if (containerRef.current) {
        setContainerWidth(containerRef.current.clientWidth);
        setContainerHeight(containerRef.current.clientHeight);
      }
    };

    updateContainerSize();
    window.addEventListener("resize", updateContainerSize);

    return () => window.removeEventListener("resize", updateContainerSize);
  }, []);

  // 图片加载完成后调整初始缩放
  useEffect(() => {
    if (imgRef.current && containerWidth && containerHeight) {
      const img = imgRef.current;

      // 计算图片适应容器的初始缩放比例
      const widthRatio = containerWidth / img.naturalWidth;
      const heightRatio = containerHeight / img.naturalHeight;
      const initialFitScale = Math.min(widthRatio, heightRatio, 1);

      // 如果是移动设备且图片很大，使用适应容器的缩放
      if (isMobile && initialFitScale < 1) {
        setScale(initialFitScale);
      }
    }
  }, [imgRef, containerWidth, containerHeight, isMobile]);

  // 重置图片缩放和平移
  const resetTransform = () => {
    setScale(1);
    setTranslateX(0);
    setTranslateY(0);
  };

  // 放大图片
  const zoomIn = () => {
    setScale((prev) => Math.min(prev * 1.2, 5));
  };

  // 缩小图片
  const zoomOut = () => {
    setScale((prev) => Math.max(prev / 1.2, 0.5));
  };

  // 下载图片功能
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

      const filename =
        imgUrl.substring(imgUrl.lastIndexOf("/") + 1) || "download";
      link.download = filename.includes(".") ? filename : `${filename}.jpg`;

      document.body.appendChild(link);
      link.click();
      document.body.removeChild(link);

      setTimeout(() => URL.revokeObjectURL(url), 100);
    } catch (error) {
      console.error("下载失败:", error);
      window.open(imgUrl, "_blank")?.focus();
    }
  };

  // 拖拽开始
  const handleDragStart = (
    e: React.MouseEvent<HTMLImageElement> | React.TouchEvent<HTMLImageElement>
  ) => {
    if (scale > 1 && !isPinching) {
      const event = "touches" in e ? e.touches[0] : e;
      setIsDragging(true);
      setStartX(event.clientX - translateX);
      setStartY(event.clientY - translateY);
    }
  };

  // 拖拽移动
  const handleDragMove = (
    e: React.MouseEvent<HTMLImageElement> | React.TouchEvent<HTMLImageElement>
  ) => {
    if (isDragging && !isPinching) {
      e.preventDefault();
      const event = "touches" in e ? e.touches[0] : e;
      setTranslateX(event.clientX - startX);
      setTranslateY(event.clientY - startY);
    }
  };

  // 拖拽结束
  const handleDragEnd = () => {
    setIsDragging(false);
  };

  // 触摸开始（处理多点触摸）
  const handleTouchStart = (e: React.TouchEvent<HTMLImageElement>) => {
    if (e.touches.length === 2) {
      e.preventDefault();
      const touch1 = e.touches[0];
      const touch2 = e.touches[1];

      // 计算两点之间的距离
      const dx = touch2.clientX - touch1.clientX;
      const dy = touch2.clientY - touch1.clientY;
      const distance = Math.sqrt(dx * dx + dy * dy);

      setStartDistance(distance);
      setInitialScale(scale);
      setIsPinching(true);
      setIsDragging(false);
    }
  };

  // 触摸移动（处理缩放）
  const handleTouchMove = (e: React.TouchEvent<HTMLImageElement>) => {
    if (isPinching && e.touches.length === 2) {
      e.preventDefault();
      const touch1 = e.touches[0];
      const touch2 = e.touches[1];

      // 计算新的两点之间的距离
      const dx = touch2.clientX - touch1.clientX;
      const dy = touch2.clientY - touch1.clientY;
      const newDistance = Math.sqrt(dx * dx + dy * dy);

      // 计算缩放比例
      const newScale = Math.min(
        Math.max(initialScale * (newDistance / startDistance), 0.5),
        5
      );
      setScale(newScale);
    }
  };

  // 触摸结束
  const handleTouchEnd = () => {
    setIsPinching(false);
  };

  // 滚轮缩放
  const handleWheel = (e: React.WheelEvent<HTMLDivElement>) => {
    e.preventDefault();

    const newScale =
      e.deltaY < 0 ? Math.min(scale * 1.1, 5) : Math.max(scale / 1.1, 0.5);

    // 计算缩放中心
    const container = e.currentTarget.getBoundingClientRect();
    const centerX = e.clientX - container.left;
    const centerY = e.clientY - container.top;

    // 调整平移以保持鼠标位置不变
    const deltaScale = newScale / scale;
    setTranslateX(centerX - deltaScale * (centerX - translateX));
    setTranslateY(centerY - deltaScale * (centerY - translateY));

    setScale(newScale);
  };

  // 模态框关闭时重置变换
  useEffect(() => {
    if (!show) {
      resetTransform();
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
    >
      <Modal.Body className="text-center p-0 position-relative">
        {/* 工具栏 */}
        <div className="position-absolute top-0 left-0 w-full p-4 flex justify-between items-center z-10">
          <button
            onClick={resetTransform}
            className="bg-white/80 hover:bg-white text-black rounded-full p-2 mr-2 transition-all"
            title="重置视图"
          >
            <i className="fa fa-refresh"></i>
          </button>
          <div className="flex space-x-2">
            <button
              onClick={zoomOut}
              className="bg-white/80 hover:bg-white text-black rounded-full p-2 transition-all"
              title="缩小"
            >
              <FaSearchMinus />
            </button>
            <button
              onClick={zoomIn}
              className="bg-white/80 hover:bg-white text-black rounded-full p-2 transition-all"
              title="放大"
            >
              <FaSearchPlus />
            </button>
            <button
              onClick={downloadImage}
              className="bg-white/80 hover:bg-white text-black rounded-full p-2 transition-all"
              title="保存图片"
            >
              <FaDownload />
            </button>
          </div>
        </div>

        {/* 图片容器 - 处理拖拽和缩放 */}
        <div
          ref={containerRef}
          className="relative w-full h-[90vh] overflow-hidden"
          onWheel={handleWheel}
          onTouchStart={handleTouchStart}
          onTouchMove={handleTouchMove}
          onTouchEnd={handleTouchEnd}
        >
          <img
            ref={imgRef}
            src={imgUrl}
            style={{
              position: "absolute",
              top: "50%",
              left: "50%",
              transform: `translate(${-50 + translateX / scale}%, ${
                -50 + translateY / scale
              }%) scale(${scale})`,
              maxWidth: "none",
              maxHeight: "none",
              cursor: scale > 1 ? "move" : "zoom-out",
              transition: "transform 0.1s ease-out",
            }}
            alt="放大预览"
            onClick={scale > 1 ? resetTransform : onHide}
            onMouseDown={handleDragStart}
            onMouseMove={handleDragMove}
            onMouseUp={handleDragEnd}
            onMouseLeave={handleDragEnd}
            onTouchStart={handleDragStart}
            onTouchMove={handleDragMove}
            onTouchEnd={handleDragEnd}
          />
        </div>

        {/* 移动端提示 */}
        {isMobile && (
          <div className="absolute bottom-4 left-0 w-full text-center text-white/80 text-sm z-10">
            <div className="bg-black/50 inline-block px-4 py-2 rounded-full">
              <span className="mr-2">
                <FaExpand />
              </span>
              双指缩放或点击重置视图
            </div>
          </div>
        )}
      </Modal.Body>
    </Modal>
  );
};

export default ImageModal;
