import { Card, Col, Container, Row } from "react-bootstrap";

export default function Log() {
  interface CardData {
    id: number;
    image: string;
    link: string;
  }
  // 示例数据
  const cardsData = [
    {
      id: 1,
      image: "https://img.picgo.net/2025/05/13/2025-05-0396080e60cd805950.png",
      link: "https://justinc.netlify.app/pages/2025-01-01.html",
    },
    {
      id: 2,
      image: "https://img.picgo.net/2025/05/13/2025-01-01b2ab3eb8900fee2a.png",
      link: "https://justinc.netlify.app/pages/2025-01-01.html",
    },
  ];
  // 处理卡片点击事件
  const handleCardClick = (card: CardData) => {
    window.open(card.link, "_blank");
  };
  return (
    <Container className="my-4">
      {/* 新增标题区域 */}
      <Row className="justify-content-center mb-4">
        <Col md={8}>
          <h2 className="text-center display-5 fw-bold ">团队日志</h2>
        </Col>
      </Row>
      <Row className="justify-content-center">
        <Col md={8}>
          <div className="d-grid gap-3">
            {cardsData.map((card) => (
              <Card
                key={card.id}
                className="shadow-sm"
                style={{ cursor: "pointer" }}
                onClick={() => handleCardClick(card)}
              >
                <Card.Img variant="top" src={card.image} />
              </Card>
            ))}
          </div>
        </Col>
      </Row>
    </Container>
  );
}
