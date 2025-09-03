import  { useState, useEffect } from "react";
import {
  Container,
  Row,
  Col,
  Card,
  Badge,
  Spinner,
  Alert,
} from "react-bootstrap";
import "bootstrap/dist/css/bootstrap.min.css";

interface Teacher {
  id: number;
  name: string;
  role: string;
  bio: string;
  avatarUrl: string;
  projectId: number;
  skills: string;
}

export default function TeacherShow() {
  const [teacher, setTeacher] = useState<Teacher | null>(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    const fetchTeacher = async () => {
      try {
        setLoading(true);
        const response = await fetch(
          "https://api.zhongzhi.site/information/team/member?projectId=0",
          {
            headers: {
              accept: "application/json",
            },
          }
        );

        if (!response.ok) {
          throw new Error(`HTTP error! status: ${response.status}`);
        }

        const data: Teacher[] = await response.json();
        if (data && data.length > 0) {
          setTeacher(data[0]);
        } else {
          throw new Error("No teacher data available");
        }
      } catch (err) {
        setError(err instanceof Error ? err.message : "An error occurred");
      } finally {
        setLoading(false);
      }
    };

    fetchTeacher();
  }, []);

  if (loading) {
    return (
      <Container
        className="d-flex justify-content-center align-items-center"
        style={{ minHeight: "300px" }}
      >
        <div className="text-center">
          <Spinner animation="border" variant="primary" />
          <p className="mt-3">正在加载教师信息...</p>
        </div>
      </Container>
    );
  }

  if (error) {
    return (
      <Container>
        <Alert variant="danger">
          <Alert.Heading>加载失败</Alert.Heading>
          <p>{error}</p>
        </Alert>
      </Container>
    );
  }

  if (!teacher) {
    return (
      <Container>
        <Alert variant="warning">
          <Alert.Heading>未找到教师信息</Alert.Heading>
          <p>暂无教师数据可供显示</p>
        </Alert>
      </Container>
    );
  }

  return (
    <Container className="my-5">
      <Row className="justify-content-center">
        <Col md={8} lg={6}>
          <Card
            className="shadow-sm border-0"
            style={{ borderRadius: "12px", overflow: "hidden" }}
          >
            <Card.Body className="p-4">
              <Row className="align-items-center">
                {/* 头像部分 */}
                <Col md={4} className="text-center mb-3 mb-md-0">
                  <div
                    className="rounded-circle overflow-hidden mx-auto border"
                    style={{
                      width: "150px",
                      height: "150px",
                      border: "3px solid #f0f0f0",
                    }}
                  >
                    <img
                      src={
                        teacher.avatarUrl || "https://via.placeholder.com/150"
                      }
                      alt={teacher.name}
                      className="img-fluid"
                      style={{
                        objectFit: "cover",
                        width: "100%",
                        height: "100%",
                      }}
                      onError={(e) => {
                        e.currentTarget.src =
                          "https://via.placeholder.com/150?text=头像加载失败";
                      }}
                    />
                  </div>
                </Col>

                {/* 信息部分 */}
                <Col md={8}>
                  <div className="d-flex align-items-center mb-2">
                    <h3
                      className="mb-0 me-2"
                      style={{ fontWeight: "bold", color: "#2c3e50" }}
                    >
                      {teacher.name}
                    </h3>
                    <Badge
                      bg="primary"
                      className="fs-6 px-3 py-2"
                      style={{
                        borderRadius: "20px",
                        backgroundColor: "#3498db",
                        border: "none",
                      }}
                    >
                      {teacher.role}
                    </Badge>
                  </div>

                  <div className="mt-4">
                    <p
                      className="mb-0 fst-italic"
                      style={{
                        color: "#7f8c8d",
                        fontSize: "1.1rem",
                        fontWeight: "500",
                        lineHeight: "1.5",
                      }}
                    >
                      "{teacher.bio}"
                    </p>
                  </div>

                  {teacher.skills && teacher.skills.trim() !== "" && (
                    <div className="mt-4 pt-3 border-top">
                      <h6
                        className="mb-2"
                        style={{ color: "#34495e", fontWeight: "600" }}
                      >
                        专业技能
                      </h6>
                      <div>
                        {teacher.skills.split(",").map((skill, index) => (
                          <Badge
                            key={index}
                            bg="light"
                            text="dark"
                            className="me-2 mb-2 px-3 py-2"
                            style={{
                              fontSize: "0.9rem",
                              borderRadius: "15px",
                              backgroundColor: "#ecf0f1",
                              border: "1px solid #ddd",
                            }}
                          >
                            {skill.trim()}
                          </Badge>
                        ))}
                      </div>
                    </div>
                  )}
                </Col>
              </Row>
            </Card.Body>
          </Card>
        </Col>
      </Row>
    </Container>
  );
}
