import { Modal } from "react-bootstrap";
import { FC } from "react";
import { FaDownload } from "react-icons/fa"; // 引入下载图标

interface ImageModalProps {
  show: boolean;
  onHide: () => void;
  imgUrl: string;
}

const ImageModal: FC<ImageModalProps> = ({ show, onHide, imgUrl }) => {
  // 下载图片功能（处理跨域问题）
  const downloadImage = async () => {
    try {
      const response = await fetch(imgUrl);
      const blob = await response.blob();
      const url = URL.createObjectURL(blob);

      const link = document.createElement("a");
      link.href = url;

      // 从URL中提取文件名
      const filename =
        imgUrl.substring(imgUrl.lastIndexOf("/") + 1) || "download";
      link.download = filename.includes(".") ? filename : `${filename}.jpg`;

      document.body.appendChild(link);
      link.click();
      document.body.removeChild(link);

      // 清理临时URL
      setTimeout(() => URL.revokeObjectURL(url), 100);
    } catch (error) {
      console.error("下载失败:", error);
      // 备用方案：直接打开图片
      const win = window.open(imgUrl, "_blank");
      win?.focus();
    }
  };

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
        {/* 下载按钮 - 绝对定位在右上角 */}
        <button
          onClick={downloadImage}
          className="position-absolute bg-white rounded-circle border-0 shadow-sm"
          style={{
            top: "15px",
            right: "15px",
            width: "40px",
            height: "40px",
            zIndex: 10,
            display: "flex",
            alignItems: "center",
            justifyContent: "center",
          }}
          title="保存图片"
        >
          <FaDownload size={16} />
        </button>

        {/* 图片区域 - 保持原有功能 */}
        <img
          src={imgUrl}
          style={{
            width: "100%",
            height: "auto",
            maxHeight: "90vh",
            objectFit: "contain",
            cursor: "zoom-out",
            maxWidth: "100%",
          }}
          alt="放大预览"
          onClick={onHide}
        />
      </Modal.Body>
    </Modal>
  );
};

export default ImageModal;
