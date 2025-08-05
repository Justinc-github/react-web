import React from "react";
import { Card, Row, Col, Container, Image } from "react-bootstrap";
import { FaGraduationCap, FaBriefcase } from "react-icons/fa";
// import { Link } from "react-router-dom";

interface Senior {
  id: number;
  name: string;
  major: string;
  avatar: string;
  quote: string;
  graduationDestination: string;
}

const FarewellModule: React.FC = () => {
  const seniors: Senior[] = [
    {
      id: 1,
      name: "李炤毅",
      major: "方向三",
      avatar:
        "https://image.baidu.com/search/down?url=https://lz.sinaimg.cn/large/008txcFbgy1i2w7er9mxbj318g0tmq70.jpg",
      quote: "携少年意气踏新程，待他日顶峰再相逢。",
      graduationDestination: "北京.小米",
    },
    {
      id: 2,
      name: "王勃",
      major: "方向三",
      avatar:
        "https://image.baidu.com/search/down?url=https://e3f49eaa46b57.cdn.sohucs.com/2025/6/29/14/45/MTAwMTIyXzE3NTExNzk1MTI3NjU=.jpg",
      quote: "海内存知己，天涯若比邻。",
      graduationDestination: "苏州.汇川",
    },
    {
      id: 3,
      name: "于明昆",
      major: "方向二",
      avatar:
        "https://image.baidu.com/search/down?url=https://e3f49eaa46b57.cdn.sohucs.com/2025/6/29/14/45/MTAwMTIyXzE3NTExNzk1MjAyODc=.jpg",
      quote: "天行健，君子以自强不息，让我们在自强不息中挑战自我。",
      graduationDestination: "研究生.辽宁石油化工大学",
    },
  ];

  return (
    <section className="py-5 bg-light">
      <Container>
        <div className="text-center mb-5">
          <h2 className="h2 fw-bold mb-3 text-dark">
            <FaGraduationCap className="me-2" />
            25届毕业生{" "}
            {/* <Link to="/video">
              <Button variant="primary" className="ms-2">
                一睹风采?
              </Button>
            </Link> */}
          </h2>
          <p className="text-muted mx-auto" style={{ maxWidth: "720px" }}>
            毕业不是终点，而是新征程的起点。让我们一起祝福学长学姐们在未来的道路上一帆风顺！
          </p>
        </div>

        <Row className="gy-4">
          {seniors.map((senior) => (
            <Col key={senior.id} xs={12} md={6} lg={4}>
              <Card className="h-100 shadow rounded border-0">
                <Card.Body>
                  <div className="d-flex flex-column flex-md-row align-items-center gap-3">
                    <Image
                      src={senior.avatar}
                      alt={`${senior.name}照片`}
                      roundedCircle
                      className="border border-primary border-3"
                      style={{
                        width: "100px",
                        height: "100px",
                        objectFit: "cover",
                        aspectRatio: "1/1", // 解决头像比例
                      }}
                    />
                    <div className="text-center text-md-start">
                      <h5 className="fw-bold mb-1">{senior.name}</h5>
                      <p className="text-primary fw-medium mb-2">
                        {senior.major}
                      </p>
                      <p className="text-muted mb-2">
                        <FaBriefcase className="me-2 text-primary" />
                        <strong>毕业去向:</strong>{" "}
                        {senior.graduationDestination}
                      </p>
                      <p className="fst-italic text-secondary">
                        “ {senior.quote} ”
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
