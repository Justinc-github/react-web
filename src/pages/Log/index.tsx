import { Card, Col, Container, Row } from "react-bootstrap";
import { useNavigate } from "react-router-dom";

export default function Log() {
  const navigate = useNavigate();

  interface CardData {
    id: number;
    image: string;
    routePath: string;
  }
  // 示例数据
  const cardsData = [
    {
      id: 1,
      image: "https://img.picgo.net/2025/05/13/2025-01-01b2ab3eb8900fee2a.png",
      routePath: "pages/page2025_01_01",
    },
    {
      id: 0,
      image: "https://img.picgo.net/2025/05/15/2025-05-03b98d429da029ae90.png",
      routePath: "pages/page2025_05_03",
    },
  ];
  
  // 处理卡片点击事件
  const handleCardClick = (card: CardData) => {
    navigate({
      pathname: card.routePath,
      search: `?id=${card.id}`,
    });
  };
  return (
    <Container className="my-4">
      {/* 标题 */}
      <Row className="justify-content-center mb-4">
        <Col md={8}>
          <h2 className="text-center display-5 fw-bold ">团队日志</h2>
        </Col>
      </Row>
      {/* 卡片内容 */}
      <Row className="justify-content-center">
        <Col md={8}>
          <div className="d-grid gap-3">
            {cardsData.reverse().map((card) => (
              <Card
                key={card.id}
                className="shadow-sm p-0 rounded-3"
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
