import React from "react";
import { Container, Row, Col, Card, Button, Badge } from "react-bootstrap";
import { Link } from "react-router-dom";

interface Project {
  id: number;
  name: string;
  members: number;
  subject: string;
  image: string;
}

const projects: Project[] = [
  {
    id: 1,
    name: "JAVA、PYTHON、C#",
    members: 6,
    subject: "上位机",
    image: "https://picsum.photos/400/300?random=2",
  },
  {
    id: 2,
    name: "PLC、Solid Edge、LAD",
    members: 11,
    subject: "下位机",
    image: "https://picsum.photos/400/300?random=3",
  },
];

const TeamProjects: React.FC = () => {
  return (
    <section className="py-5 bg-light">
      <Container>
        <div className="text-center mb-5">
          <h2 className="h2 fw-bold text-dark mb-3">学习方向</h2>
          <p
            className="text-muted mx-auto fw-medium"
            style={{ maxWidth: "720px", fontSize: "1.1rem" }}
          >
            发掘兴趣，明确目标。
          </p>
        </div>

        <Row className="gy-4">
          {projects.map((project) => (
            <Col key={project.id} xs={12} md={6} lg={6}>
              <Card className="h-100 shadow-sm border-0 rounded-3 overflow-hidden">
                <div
                  className="position-relative bg-light"
                  style={{
                    height: "200px",
                    display: "flex",
                    alignItems: "center",
                    justifyContent: "center",
                    overflow: "hidden",
                  }}
                >
                  {/* 使用背景图完整显示图片 */}
                  <div
                    className="w-100 h-100"
                    style={{
                      backgroundImage: `url(${project.image})`,
                      backgroundSize: "contain",
                      backgroundPosition: "center",
                      backgroundRepeat: "no-repeat",
                    }}
                  ></div>

                  {/* 方向标签 */}
                  <Badge
                    bg="primary"
                    className="position-absolute top-0 start-0 m-3 px-3 py-2 rounded-pill"
                    style={{ fontWeight: "bold", fontSize: "0.85rem" }}
                  >
                    {project.subject}
                  </Badge>
                </div>

                <Card.Body className="py-4">
                  <Card.Title className="fw-bold text-dark mb-2 fs-5">
                    {project.name}
                  </Card.Title>
                  <Card.Text className="text-muted mb-3">
                    <i className="fas fa-users me-2"></i>
                    <span className="fw-medium">{project.members} 成员</span>
                  </Card.Text>
                  <Link to={`/home/introduce/${project.id}`}>
                    {/* 传入当前项目的id */}
                    <Button
                      variant="primary"
                      className="w-100 fw-medium rounded-pill py-2"
                      style={{ fontWeight: 500 }}
                    >
                      查看详情
                    </Button>
                  </Link>
                </Card.Body>
              </Card>
            </Col>
          ))}
        </Row>
      </Container>
    </section>
  );
};

export default TeamProjects;
