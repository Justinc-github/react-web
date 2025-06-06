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
    id: string; // API 返回的键是字符串
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
        console.log(jsonData);
        // 将对象转换为数组，并添加 id（使用对象的键）
        const dataArray = Object.keys(jsonData).map((key) => ({
          id: key,
          ...jsonData[key],
        }));

        // 将 id 转换为数字并按降序排序
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

  // 处理卡片点击事件
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
        {/* 卡片内容 */}
        <Row className="justify-content-center">
          <Col md={8}>
            <div className="d-grid gap-3">
              {cardsData.map((card) => (
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
    </div>
  );
}
