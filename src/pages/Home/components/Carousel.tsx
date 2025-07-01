import { useState } from "react";
import { Carousel, Container } from "react-bootstrap";
import ImageModal from "../../../utils/ImageModal";
import { FaChevronLeft, FaChevronRight } from "react-icons/fa";

interface CarouselItem {
  id: number;
  src: string;
  alt: string;
  caption: string;
}

export default function CarouselComponent() {
  const [showModal, setShowModal] = useState(false);
  const [selectedImg, setSelectedImg] = useState("");

  const carouselItems: CarouselItem[] = [
    {
      id: 1,
      src: "https://e3f49eaa46b57.cdn.sohucs.com/2025/6/29/14/55/MTAwMTIyXzE3NTExODAxMjI5MTI=.jpg",
      alt: "元旦活动照片",
      caption: "",
    },
    {
      id: 2,
      src: "https://e3f49eaa46b57.cdn.sohucs.com/2025/6/29/14/55/MTAwMTIyXzE3NTExODAxMjk3NTI=.jpg",
      alt: "五一活动照片",
      caption: "",
    },
    {
      id: 3,
      src: "https://e3f49eaa46b57.cdn.sohucs.com/2025/6/29/14/55/MTAwMTIyXzE3NTExODAxMTM1NDk=.jpg",
      alt: "送学长照片",
      caption: "",
    },
    {
      id: 4,
      src: "https://assets-hs-cdn.soutushenqi.com/ai_images/da113cea-fb73-48a3-9afa-685246e088ac.png",
      alt: "过生日",
      caption: "",
    },
  ];

  const handleImageClick = (imgUrl: string) => {
    setSelectedImg(imgUrl);
    setShowModal(true);
  };

  return (
    <Container className="my-4">
      <h1 className="text-center fw-bold display-5 mb-4">今年的我们</h1>

      <div className="mx-auto" style={{ maxWidth: "800px" }}>
        <Carousel
          interval={5000}
          indicators={true}
          controls={true}
          nextIcon={<FaChevronRight className="fs-3" />}
          prevIcon={<FaChevronLeft className="fs-3" />}
        >
          {carouselItems.map((item) => (
            <Carousel.Item key={item.id}>
              <img
                className="d-block w-100 img-fluid rounded"
                src={item.src}
                alt={item.alt}
                onClick={() => handleImageClick(item.src)}
                style={{
                  height: "500px",
                  objectFit: "cover",
                  cursor: "pointer",
                }}
              />
              {item.caption && (
                <Carousel.Caption>
                  <p>{item.caption}</p>
                </Carousel.Caption>
              )}
            </Carousel.Item>
          ))}
        </Carousel>
      </div>

      {/* 图片放大模态框 */}
      <ImageModal
        show={showModal}
        onHide={() => setShowModal(false)}
        imgUrl={selectedImg}
      />
    </Container>
  );
}
