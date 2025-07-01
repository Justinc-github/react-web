import React from "react";
import { FaCalendarCheck, FaComments, FaTrophy } from "react-icons/fa";
import { Container, Row, Col } from "react-bootstrap";

interface Feature {
  icon: React.ElementType;
  title: string;
  description: string;
}

const features: Feature[] = [
  {
    icon: FaCalendarCheck,
    title: "任务布置",
    description: "找到自己的学习方向。",
  },
  {
    icon: FaComments,
    title: "良好氛围",
    description: "不同阶段的成员一起学习，互相交流经验。",
  },
  {
    icon: FaTrophy,
    title: "多种比赛",
    description: "锻炼个人能力",
  },
];

const Features: React.FC = () => {
  return (
    <section className="py-5 bg-white">
      <Container>
        <div className="text-center mb-5">
          <h2 className="h2 fw-bold text-dark mb-3">锻炼个人能力</h2>
          <p
            className="text-muted mx-auto"
            style={{ maxWidth: "720px", fontSize: "1.1rem" }}
          >
            通过对任务的完成，更好的锻炼思维，找到符合自己的学习定位，为未来打下基础。
          </p>
        </div>

        <Row className="gy-4">
          {features.map((feature, index) => (
            <Col key={index} xs={12} md={6} lg={4}>
              <div className="bg-light p-4 rounded shadow-sm h-100">
                <div className="text-primary mb-3">
                  <feature.icon size={36} />
                </div>
                <h5 className="fw-bold text-dark mb-2">{feature.title}</h5>
                <p className="text-muted">{feature.description}</p>
              </div>
            </Col>
          ))}
        </Row>
      </Container>
    </section>
  );
};

export default Features;
