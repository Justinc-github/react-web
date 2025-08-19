import React, { useEffect, useState } from "react";
import { Card, Row, Col, Container, Image, Button } from "react-bootstrap";
import { FaGraduationCap, FaBriefcase } from "react-icons/fa";
import { Link } from "react-router-dom";

interface Graduate {
  id: number;
  name: string;
  role: string;
  bio: string;
  avatarUrl: string;
  projectId: number;
  skills: string;
}

const FarewellModule: React.FC = () => {
  const [graduates, setGraduates] = useState<Graduate[]>([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    const fetchData = async () => {
      try {
        const response = await fetch(
          "https://api.zhongzhi.site/information/team/member/graduate"
        );
        if (!response.ok) {
          throw new Error(`网络请求错误: ${response.status}`);
        }
        const data = await response.json();
        setGraduates(data);
      } catch (err) {
        setError(
          err instanceof Error ? err.message : "获取毕业生信息失败"
        );
      } finally {
        setLoading(false);
      }
    };

    fetchData();
  }, []);

  if (loading) {
    return (
      <section className="py-5 bg-light">
        <Container className="text-center py-5">
          <div className="spinner-border text-primary" role="status">
            <span className="visually-hidden">加载中...</span>
          </div>
          <p className="mt-3">正在加载毕业生信息...</p>
        </Container>
      </section>
    );
  }

  if (error) {
    return (
      <section className="py-5 bg-light">
        <Container className="text-center py-5">
          <div className="alert alert-danger">{error}</div>
        </Container>
      </section>
    );
  }

  return (
    <section className="py-5 bg-light">
      <Container>
        <div className="text-center mb-5">
          <h2 className="h2 fw-bold mb-3 text-dark">
            <FaGraduationCap className="me-2" />
            21级毕业生
          </h2>
          <p className="text-muted mx-auto" style={{ maxWidth: "720px" }}>
            毕业不是终点，而是新征程的起点。让我们一起祝福学长们在未来的道路上一帆风顺！
          </p>
          <Link to="/home/previous/graduate">
            <Button>往届毕业生</Button>
          </Link>
        </div>

        <Row className="gy-4">
          {graduates.map((graduate) => (
            <Col key={graduate.id} xs={12} md={6} lg={4}>
              <Card className="h-100 shadow rounded border-0">
                <Card.Body>
                  <div className="d-flex flex-column flex-md-row align-items-center gap-3">
                    <Image
                      src={graduate.avatarUrl}
                      alt={`${graduate.name}照片`}
                      roundedCircle
                      className="border border-primary border-3"
                      style={{
                        width: "100px",
                        height: "100px",
                        objectFit: "cover",
                        aspectRatio: "1/1",
                      }}
                    />
                    <div
                      className="text-center text-md-start d-flex flex-column"
                      style={{ minHeight: "160px" }}
                    >
                      <h5 className="fw-bold mb-1">{graduate.name}</h5>
                      <p className="text-muted mb-2">
                        <FaBriefcase className="me-2 text-primary" />
                        <strong>毕业去向: </strong>
                        {graduate.skills}
                      </p>
                      <p
                        className="fst-italic text-secondary mt-auto mb-0"
                        style={{
                          fontSize: "15px",
                          minHeight: "60px",
                          display: "flex",
                          alignItems: "center",
                        }}
                      >
                        “ {graduate.bio} ”
                      </p>
                    </div>
                  </div>
                </Card.Body>
              </Card>
            </Col>
          ))}
        </Row>
      </Container>
    </section>
  );
};

export default FarewellModule;
