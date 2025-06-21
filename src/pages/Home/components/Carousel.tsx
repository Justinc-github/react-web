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

  // 集中管理轮播项数据
  const carouselItems: CarouselItem[] = [
    {
      id: 1,
      src: "https://img.picgo.net/2025/05/26/_2025-01-01e9c68136ae71afbc.jpg",
      alt: "元旦活动照片",
      caption: "",
    },
    {
      id: 2,
      src: "https://img.picgo.net/2025/05/26/_2025-05-0391f8cef7c2f1da66.jpg",
      alt: "五一活动照片",
      caption: "",
    },
    {
      id: 3,
      src: "https://img.picgo.net/2025/06/15/_2025_06_149cdf0f25c5dd8cbe.jpg",
      alt: "送学长照片",
      caption: "",
    },
    {
      id: 4,
      src: "https://img.picgo.net/2025/06/21/a64ab2055767c29224e5f93ed454679f93b27c54533d2780.jpg",
      alt: "过生日",
      caption: "",
    },
  ];

  const handleImageClick = (imgUrl: string) => {
    setSelectedImg(imgUrl);
    setShowModal(true);
  };

  return (
    <Container className="py-8">
      <h1 className="text-center font-bold text-3xl mb-6 font-serif">
        今年的我们
      </h1>

      <Carousel
        interval={5000}
        indicators={true}
        controls={true}
        className="rounded-lg overflow-hidden shadow-xl mx-auto max-w-4xl"
        nextIcon={<FaChevronRight className="text-2xl" />}
        prevIcon={<FaChevronLeft className="text-2xl" />}
      >
        {carouselItems.map((item) => (
          <Carousel.Item key={item.id}>
            <img
              className="d-block w-100"
              style={{
                height: "500px",
                objectFit: "cover",
                cursor: "pointer",
                transition: "transform 0.5s ease",
              }}
              src={item.src}
              alt={item.alt}
              onClick={() => handleImageClick(item.src)}
              onMouseEnter={(e) => {
                e.currentTarget.style.transform = "scale(1.02)";
              }}
              onMouseLeave={(e) => {
                e.currentTarget.style.transform = "scale(1)";
              }}
            />
            <Carousel.Caption>
              <p>{item.caption}</p>
            </Carousel.Caption>
          </Carousel.Item>
        ))}
      </Carousel>

      {/* 图片放大模态框 */}
      <ImageModal
        show={showModal}
        onHide={() => setShowModal(false)}
        imgUrl={selectedImg}
      />
    </Container>
  );
}

