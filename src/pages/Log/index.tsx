import { useState, useEffect } from "react";
import { Card, Col, Container, Row } from "react-bootstrap";
import { useNavigate } from "react-router-dom";

export default function Log() {
  const navigate = useNavigate();
  const [cardsData, setCardsData] = useState<CardData[]>([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(false);

  interface CardData {
    id: string;
    image: string;
    routePath: string;
  }

  useEffect(() => {
    const fetchData = async () => {
      try {
        setLoading(true);
        const response = await fetch(
          "https://cdn.jsdelivr.net/gh/Justinc-github/project_resources@main/jsons/log_web.json"
        );
        if (!response.ok) {
          throw new Error("Network response was not ok");
        }

        const jsonData = await response.json();

        const dataArray = Object.keys(jsonData).map((key) => ({
          id: key,
          ...jsonData[key],
        }));

        const sortedData = dataArray
          .map((item) => ({ ...item, id: parseInt(item.id) }))
          .sort((a, b) => b.id - a.id);

        setCardsData(sortedData);
        setError(false);
      } catch (err) {
        console.error("Error fetching data:", err);
        setError(true);
      } finally {
        setLoading(false);
      }
    };

    fetchData();
  }, []);

  const handleCardClick = (card: CardData) => {
    navigate({
      pathname: card.routePath,
      search: `?id=${card.id}`,
    });
  };

  if (loading) {
    return (
      <div className="log">
        <Container className="my-4 text-center">
          <p>加载中...</p>
        </Container>
      </div>
    );
  }

  if (error) {
    return (
      <div className="log">
        <Container className="my-4 text-center">
          <p>数据加载失败，请稍后重试</p>
        </Container>
      </div>
    );
  }

  return (
    <div className="log">
      <Container className="my-4">
        <Row className="justify-content-center">
          <Col md={8}>
            <div className="d-grid gap-3">
              {cardsData.map((card) => (
                <Card
                  key={card.id}
                  className="shadow-sm p-0 rounded-3 overflow-hidden"
                  style={{
                    cursor: "pointer",
                    aspectRatio: "20/7",
                    position: "relative",
                  }}
                  onClick={() => handleCardClick(card)}
                >
                  {/* 保证图片填充整个卡片区域 */}
                  <Card.Img
                    variant="top"
                    src={card.image}
                    style={{
                      width: "100%",
                      height: "100%",
                      objectFit: "cover", // 保持比例裁切填满
                      transition: "transform 0.3s ease",
                      backgroundColor: "#f8f9fa",
                    }}
                    onMouseEnter={(e) =>
                      (e.currentTarget.style.transform = "scale(1.03)")
                    }
                    onMouseLeave={(e) =>
                      (e.currentTarget.style.transform = "scale(1)")
                    }
                    onLoad={(e) => {
                      e.currentTarget.style.backgroundColor = "transparent";
                    }}
                  />
                </Card>
              ))}
            </div>
          </Col>
        </Row>
      </Container>
    </div>
  );
}
