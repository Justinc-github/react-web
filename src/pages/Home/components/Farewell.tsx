import React from "react";
import { Card, Row, Col, Container, Image, Button } from "react-bootstrap";
import { FaGraduationCap, FaBriefcase } from "react-icons/fa";
import { Link } from "react-router-dom";

// 定义学长信息接口
interface Senior {
  id: number;
  name: string;
  major: string;
  avatar: string;
  quote: string;
  graduationDestination: string;
}

// 送别模块组件
const FarewellModule: React.FC = () => {
  const seniors: Senior[] = [
    {
      id: 1,
      name: "李炤毅",
      major: "方向三",
      avatar:
        "https://img.picgo.net/2025/06/14/da4711d7431f916356223a0343efcfac5afb46bb5ae669d1.png",
      quote: "携少年意气踏新程，待他日顶峰再相逢。",
      graduationDestination: "北京.小米",
    },
    {
      id: 2,
      name: "王勃",
      major: "方向三",
      avatar:
        "https://img.picgo.net/2025/06/15/882d328f39005511e542835dea20d456e2d283383d0a2eb6.jpg",
      quote: "海内存知己，天涯若比邻。",
      graduationDestination: "苏州.汇川",
    },
    {
      id: 3,
      name: "于明昆",
      major: "方向二",
      avatar:
        "https://img.picgo.net/2025/06/14/5634efee9204efb582c4b9937924dd03903cffa6c1f2e7d4.jpg",
      quote: "天行健，君子以自强不息，让我们在自强不息中挑战自我。",
      graduationDestination: "研究生.辽宁石油化工大学",
    },
  ];

  return (
    <section className="py-12 bg-gray-50">
      <Container>
        <div className="text-center mb-10">
          <h2 className="text-[clamp(1.5rem,3vw,2.5rem)] font-bold text-gray-800 mb-3">
            <FaGraduationCap className="mr-2" /> 25届毕业生{" "}
            <Link to="/video">
              <Button>一睹风采?</Button>
            </Link>
          </h2>
          <p className="text-gray-600 max-w-3xl mx-auto">
            毕业不是终点，而是新征程的起点。让我们一起祝福学长学姐们在未来的道路上一帆风顺！
          </p>
        </div>

        <Row className="g-6">
          {seniors.map((senior) => (
            <Col key={senior.id} xs={12} md={6} lg={4}>
              {" "}
              {/* 修改列宽配置 */}
              <Card className="border-0 shadow-lg rounded-lg overflow-hidden transition-transform duration-300 hover:scale-[1.02] h-full">
                {" "}
                {/* 添加h-full */}
                <Card.Body className="p-6 flex flex-col">
                  {" "}
                  {/* 添加flex布局 */}
                  <div className="flex flex-col md:flex-row gap-6 items-center flex-grow">
                    {" "}
                    {/* 添加flex-grow */}
                    <Image
                      src={senior.avatar}
                      alt={`${senior.name}照片`}
                      roundedCircle
                      className="w-32 h-32 object-cover border-4 border-primary/20"
                    />
                    <div className="text-center md:text-left">
                      <h3 className="text-xl font-bold text-gray-800 mb-1">
                        {senior.name}
                      </h3>
                      <p className="text-primary font-medium mb-2">
                        {senior.major}
                      </p>
                      <p className="text-gray-700 mb-3">
                        <FaBriefcase className="mr-2 text-primary" />
                        <span className="font-medium">毕业去向:</span>{" "}
                        {senior.graduationDestination}
                      </p>
                      <p className="text-gray-600 italic mb-4">
                        " {senior.quote} "
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
