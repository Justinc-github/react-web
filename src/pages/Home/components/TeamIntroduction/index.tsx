import React from "react";
import { Container, Row, Col, Card, ListGroup } from "react-bootstrap";

const TeamIntroduction: React.FC = () => {
  return (
    <Container fluid className="py-5 bg-light">
      <Row className="justify-content-center">
        <Col xl={10} xxl={10}>
          <Card className="shadow-sm border-0">
            <Card.Body className="p-5">
              {/* 团队标题 */}
              <h2 className="text-center fw-bold mb-4 text-dark">
                众智创新团队
              </h2>

              {/* 团队基本信息 */}
              <p className="lead mb-3">
                众智创新团队是辽宁工业大学的校级科研团队，成立于2016年。
              </p>

              <p className="mb-3">团队名称取自古语：</p>

              {/* 引用部分 */}
              <blockquote className="blockquote bg-light p-4 rounded border-start border-4 border-dark mb-4">
                <p className="mb-0">
                  "积力之所举，则无不胜也；众智之所为，则无不成也。"
                </p>
              </blockquote>

              <p className="mb-4">
                团队秉持<span className="fw-semibold">"聚集众智以得创新"</span>
                的理念，专注于工业自动化领域的研究与实践。
              </p>

              {/* 团队特色部分 */}
              <h4 className="mt-4 mb-3 text-dark">团队特色</h4>

              <ListGroup variant="flush" className="mb-4">
                <ListGroup.Item className="px-0 py-2 border-0">
                  <i className="bi bi-check-circle-fill text-success me-2"></i>
                  专注于下位机西门子PLC和上位机控制技术
                </ListGroup.Item>
                <ListGroup.Item className="px-0 py-2 border-0">
                  <i className="bi bi-check-circle-fill text-success me-2"></i>
                  坚持理论与实践相结合的教学模式
                </ListGroup.Item>
                <ListGroup.Item className="px-0 py-2 border-0">
                  <i className="bi bi-check-circle-fill text-success me-2"></i>
                  注重培养学生专业实践能力和创新思维
                </ListGroup.Item>
                <ListGroup.Item className="px-0 py-2 border-0">
                  <i className="bi bi-check-circle-fill text-success me-2"></i>
                  强化团队协作精神与项目管理能力
                </ListGroup.Item>
              </ListGroup>

              {/* 总结部分 */}
              <p className="fst-italic text-secondary mt-4 pt-3 border-top">
                作为校级重点团队，我们不断追求技术创新与人才培养的有机结合，致力于为工业自动化领域输送高素质专业人才。
              </p>
            </Card.Body>
          </Card>
        </Col>
      </Row>
    </Container>
  );
};

export default TeamIntroduction;
