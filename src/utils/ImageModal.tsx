import { Modal } from "react-bootstrap";
import { FC } from "react";

interface ImageModalProps {
  show: boolean;
  onHide: () => void;
  imgUrl: string;
}

 const ImageModal: FC<ImageModalProps> = ({ show, onHide, imgUrl }) => {
  return (
    <Modal
      show={show}
      onHide={onHide}
      centered
      size="xl"
      contentClassName="border-0 bg-transparent"
      dialogClassName="border-0 bg-transparent"
    >
      <Modal.Body className="text-center p-0">
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
