import { Carousel, Container } from "react-bootstrap";
import { useState } from "react";
import ImageModal from "../../../utils/ImageModal";

export default function CarouselComponent() {
  const [showModal, setShowModal] = useState(false);
  const [selectedImg, setSelectedImg] = useState("");
  const handleImageClick = (imgUrl: string) => {
    setSelectedImg(imgUrl);
    setShowModal(true);
  };

  return (
    <Container>
      <div
        style={{
          display: "flex",
          justifyContent: "center",
          width: "100%", // 确保容器撑满父元素
        }}
      >
        <Carousel style={{ width: "70%" }}>
          <Carousel.Item>
            <img
              className="d-block w-100"
              style={{
                height: "500px",
                objectFit: "cover",
                cursor: "pointer",
              }}
              src="https://img.picgo.net/2025/05/26/_2025-05-0391f8cef7c2f1da66.jpg"
              alt="五一"
              onClick={() =>
                handleImageClick(
                  "https://img.picgo.net/2025/05/26/_2025-05-0391f8cef7c2f1da66.jpg"
                )
              }
            />
            <Carousel.Caption>
              <p>五一</p>
            </Carousel.Caption>
          </Carousel.Item>
          <Carousel.Item>
            <img
              className="d-block w-100"
              style={{
                height: "500px",
                objectFit: "cover",
                cursor: "pointer",
              }}
              src="https://img.picgo.net/2025/05/26/_2025-01-01e9c68136ae71afbc.jpg"
              alt="元旦"
              onClick={() =>
                handleImageClick(
                  "https://img.picgo.net/2025/05/26/_2025-01-01e9c68136ae71afbc.jpg"
                )
              }
            />
            <Carousel.Caption>
              <p>元旦</p>
            </Carousel.Caption>
          </Carousel.Item>
        </Carousel>
      </div>
      {/* 图片放大 */}
      <ImageModal
        show={showModal}
        onHide={() => setShowModal(false)}
        imgUrl={selectedImg}
      />
    </Container>
  );
}
