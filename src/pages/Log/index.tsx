import { useState, useEffect } from "react";
import { Card, Col, Container, Row } from "react-bootstrap";
import { useNavigate } from "react-router-dom";
import TopNavBar from "../../components/TopNavBar";

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
          "https://api.zhongzhi.site/static/jsons/log.json"
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
        <TopNavBar />
        <Container className="my-4 text-center">
          <p>加载中...</p>
        </Container>
      </div>
    );
  }

  if (error) {
    return (
      <div className="log">
        <TopNavBar />
        <Container className="my-4 text-center">
          <p>数据加载失败，请稍后重试</p>
        </Container>
      </div>
    );
  }

  return (
    <div className="log">
      <TopNavBar />
      <Container className="my-4">
        <Row className="justify-content-center">
          <Col md={8}>
            <div className="d-grid gap-3">
              {cardsData.map((card) => (
                <Card
                  key={card.id}
                  className="shadow-sm p-0 rounded-3"
                  style={{
                    cursor: "pointer",
                    overflow: "hidden",
                    // 控制卡片尺寸
                    aspectRatio: "20/7",
                  }}
                  onClick={() => handleCardClick(card)}
                >
                  {/* 图片容器 - 保持宽高比 */}
                  <div
                    style={{
                      position: "relative",
                      width: "100%",
                      paddingTop: "35%", // 16:9 = 56.25%, 4:3 = 75%
                      overflow: "hidden",
                    }}
                  >
                    <Card.Img
                      variant="top"
                      src={card.image}
                      style={{
                        position: "absolute",
                        top: 0,
                        left: 0,
                        width: "100%",
                        height: "100%",
                        // 保持比例同时裁剪多余部分
                        objectFit: "cover",
                        // 平滑的悬停效果
                        transition: "transform 0.3s ease",
                      }}
                      onMouseEnter={(e) =>
                        (e.currentTarget.style.transform = "scale(1.03)")
                      }
                      onMouseLeave={(e) =>
                        (e.currentTarget.style.transform = "scale(1)")
                      }
                      // 添加加载占位背景
                      onLoad={(e) =>
                        (e.currentTarget.style.backgroundColor = "transparent")
                      }
                    />
                  </div>
                </Card>
              ))}
            </div>
          </Col>
        </Row>
      </Container>
    </div>
  );
}
