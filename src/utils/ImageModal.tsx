import React, { useState, useCallback, useRef } from "react";
import { Modal } from "react-bootstrap";

interface ImageModalProps {
  show: boolean;
  onHide: () => void;
  imgUrl: string;
}

const ImageModal: React.FC<ImageModalProps> = ({ show, onHide, imgUrl }) => {
  // 缩放比例状态，默认为1（100%）
  const [scale, setScale] = useState(1);
  // 图片位置偏移状态
  const [position, setPosition] = useState({ x: 0, y: 0 });
  // 拖动状态
  const [isDragging, setIsDragging] = useState(false);
  // 记录鼠标起始位置
  const [startPos, setStartPos] = useState({ x: 0, y: 0 });
  // 最小缩放比例限制
  const MIN_SCALE = 0.5;
  // 最大缩放比例限制
  const MAX_SCALE = 3;
  // 图片容器引用
  const containerRef = useRef<HTMLDivElement>(null);

  // 点击模态框背景关闭
  const handleClose = (e: React.MouseEvent) => {
    if (e.target === e.currentTarget) {
      resetImageState();
      onHide();
    }
  };

  // 处理鼠标滚轮事件来缩放图片
  const handleWheel = useCallback(
    (e: React.WheelEvent) => {
      e.preventDefault(); // 阻止页面滚动

      // 计算新的缩放比例，每次滚动调整10%
      const delta = e.deltaY < 0 ? 0.1 : -0.1;
      let newScale = scale + delta;

      // 限制缩放范围在MIN_SCALE到MAX_SCALE之间
      newScale = Math.max(MIN_SCALE, Math.min(newScale, MAX_SCALE));

      setScale(newScale);
    },
    [scale]
  );

  // 开始拖动 - 仅响应鼠标左键
  const handleMouseDown = (e: React.MouseEvent) => {
    // 只有鼠标左键点击且缩放比例大于1时才允许拖动
    if (e.button === 0 && scale > 1) {
      setIsDragging(true);
      setStartPos({
        x: e.clientX - position.x,
        y: e.clientY - position.y,
      });
    }
  };

  // 处理拖动
  const handleMouseMove = useCallback(
    (e: React.MouseEvent) => {
      if (!isDragging) return;

      e.preventDefault();

      // 计算新的位置
      const newX = e.clientX - startPos.x;
      const newY = e.clientY - startPos.y;

      // 如果有容器引用，限制拖动范围在容器内
      if (containerRef.current) {
        const container = containerRef.current.getBoundingClientRect();
        const maxX = ((scale - 1) * container.width) / 2;
        const maxY = ((scale - 1) * container.height) / 2;

        // 限制拖动边界
        setPosition({
          x: Math.max(-maxX, Math.min(newX, maxX)),
          y: Math.max(-maxY, Math.min(newY, maxY)),
        });
      } else {
        setPosition({ x: newX, y: newY });
      }
    },
    [isDragging, startPos, scale]
  );

  // 结束拖动 - 仅响应鼠标左键释放
  const handleMouseUp = (e: React.MouseEvent) => {
    // 只有松开鼠标左键时才结束拖动
    if (e.button === 0 && isDragging) {
      setIsDragging(false);
    }
  };

  // 双击重置缩放和位置
  const handleDoubleClick = () => {
    resetImageState();
  };

  // 重置图片状态
  const resetImageState = () => {
    setScale(1);
    setPosition({ x: 0, y: 0 });
    setIsDragging(false);
  };

  return (
    <Modal
      show={show}
      onHide={() => {
        resetImageState();
        onHide();
      }}
      centered
      dialogClassName="p-0 border-0"
      contentClassName="bg-black bg-opacity-90 p-0 rounded-0"
      dialogAs="div"
    >
      <div
        ref={containerRef}
        className="w-full h-screen flex items-center justify-center p-4"
        onClick={handleClose}
        onWheel={handleWheel}
        onMouseDown={handleMouseDown}
        onMouseMove={handleMouseMove}
        onMouseUp={handleMouseUp}
        onMouseLeave={() => setIsDragging(false)} // 鼠标离开区域时强制结束拖动
        style={{
          cursor: isDragging ? "grabbing" : scale > 1 ? "grab" : "zoom-in",
        }}
      >
        <img
          src={imgUrl}
          alt="放大查看"
          style={{
            maxWidth: "100%",
            maxHeight: "100%",
            objectFit: "contain",
            transform: `scale(${scale}) translate(${position.x}px, ${position.y}px)`,
            transition: "transform 0.1s ease",
          }}
          onDoubleClick={handleDoubleClick}
          onClick={(e) => e.stopPropagation()} // 防止点击图片关闭模态框
        />
      </div>
    </Modal>
  );
};

export default ImageModal;
