import { useState, useEffect } from "react";
import { Container, Row, Col, Card } from "react-bootstrap";

interface Graduate {
  id: number;
  name: string;
  role: string;
  bio: string;
  avatarUrl: string;
}

interface RawGraduateData extends Graduate {
  projectId: number;
  skills: string;
}

type GraduateGroup = Record<number, Graduate[]>;

export default function GraduatePrevious() {
  const [groupedGraduates, setGroupedGraduates] = useState<GraduateGroup>({});
  const [isLoading, setIsLoading] = useState(true);

  useEffect(() => {
    const fetchData = async () => {
      try {
        const response = await fetch(
          "https://api.zhongzhi.site/information/team/member/graduate/previous"
        );
        const data: RawGraduateData[] = await response.json();

        // 按年级分组毕业生
        const grouped: GraduateGroup = data.reduce((acc, current) => {
          const grade = current.projectId;

          if (!acc[grade]) {
            acc[grade] = [];
          }

          // 创建一个新的毕业生对象，只包含需要的字段
          const graduate: Graduate = {
            id: current.id,
            name: current.name,
            role: current.role,
            bio: current.bio,
            avatarUrl: current.avatarUrl,
          };

          acc[grade].push(graduate);
          return acc;
        }, {} as GraduateGroup);

        setGroupedGraduates(grouped);
        setIsLoading(false);
      } catch (error) {
        console.error("Error fetching data:", error);
        setIsLoading(false);
      }
    };

    fetchData();
  }, []);

  // 获取所有年级并按降序排列
  const grades = Object.keys(groupedGraduates)
    .map((grade) => parseInt(grade))
    .sort((a, b) => b - a);

  return (
    <Container className="py-4">
      <h1 className="mb-4 text-center">往届毕业生</h1>

      {isLoading ? (
        <div className="text-center my-5">
          <p>加载中...</p>
        </div>
      ) : grades.length === 0 ? (
        <div className="text-center my-5">
          <p>暂无毕业生数据</p>
        </div>
      ) : (
        grades.map((grade) => (
          <div key={grade} className="mb-5">
            <h2 className="border-bottom pb-2 mb-4">{grade}级毕业生</h2>
            <Row xs={1} md={2} lg={3} xl={4} className="g-4">
              {groupedGraduates[grade].map((graduate) => (
                <Col key={graduate.id}>
                  <Card className="h-100 shadow-sm">
                    <Card.Img
                      variant="top"
                      src={graduate.avatarUrl}
                      alt={graduate.name}
                      style={{ height: "250px", objectFit: "cover" }}
                    />
                    <Card.Body>
                      <Card.Title>{graduate.name}</Card.Title>
                      <Card.Subtitle className="mb-2 text-muted">
                        {graduate.role}
                      </Card.Subtitle>
                      <Card.Text className="fst-italic">
                        "{graduate.bio}"
                      </Card.Text>
                    </Card.Body>
                  </Card>
                </Col>
              ))}
            </Row>
          </div>
        ))
      )}
    </Container>
  );
}
