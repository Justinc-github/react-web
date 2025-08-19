import React, { useState, useCallback } from "react";
import { Modal, Container, Row, Col } from "react-bootstrap";

interface ImageModalProps {
  show: boolean;
  onHide: () => void;
  imgUrl: string;
  altText?: string;
}

const ImageModal: React.FC<ImageModalProps> = ({
  show,
  onHide,
  imgUrl,
  altText = "放大查看图片",
}) => {
  // 缩放比例状态，默认为1（100%）
  const [scale, setScale] = useState(1);
  // 最小缩放比例限制
  const MIN_SCALE = 0.5;
  // 最大缩放比例限制
  const MAX_SCALE = 3;

  // 点击模态框背景关闭
  const handleClose = (e: React.MouseEvent) => {
    if (e.target === e.currentTarget) {
      // 关闭时重置缩放比例
      setScale(1);
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

  // 双击重置缩放
  const handleDoubleClick = () => {
    setScale(1);
  };

  // 关闭模态框时重置缩放
  const handleModalClose = () => {
    setScale(1);
    onHide();
  };

  return (
    <Modal
      show={show}
      onHide={handleModalClose}
      centered
      dialogClassName="p-0 border-0"
      // 去掉黑色背景，改为透明
      contentClassName="bg-transparent border-0 p-0 rounded-0"
      size="xl"
      fullscreen="sm-down"
    >
      <Modal.Body className="p-0 m-0">
        <Container fluid className="p-0 m-0 h-100">
          <Row className="justify-content-center align-items-center min-vh-100">
            <Col className="d-flex justify-content-center align-items-center p-0">
              <div
                className="position-relative"
                onClick={handleClose}
                onWheel={handleWheel}
                style={{
                  maxWidth: "90vw",
                  maxHeight: "90vh",
                  overflow: "hidden",
                }}
              >
                <img
                  src={imgUrl}
                  alt={altText}
                  style={{
                    maxWidth: "100%",
                    maxHeight: "90vh",
                    objectFit: "contain",
                    transform: `scale(${scale})`,
                    transformOrigin: "center center",
                    transition: "transform 0.1s ease",
                    // 为图片添加轻微阴影，使其在浅色背景下更突出
                    boxShadow: "0 4px 12px rgba(0, 0, 0, 0.1)",
                  }}
                  onDoubleClick={handleDoubleClick}
                  className="cursor-zoom-in"
                />
              </div>
            </Col>
          </Row>
        </Container>
      </Modal.Body>
    </Modal>
  );
};

export default ImageModal;
