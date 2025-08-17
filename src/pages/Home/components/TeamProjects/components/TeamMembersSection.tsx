import React, { useState, useEffect } from "react";
import { Card, Container, Row, Col, Overlay, Tooltip } from "react-bootstrap";
import { FaLinkedin, FaGithub, FaEnvelope } from "react-icons/fa";
import "bootstrap/dist/css/bootstrap.min.css";
import { useParams } from "react-router-dom";
import styles from "./TeamMembersSection.module.css";

// 定义API返回的成员原始数据接口（包含字符串格式的skills）
interface RawTeamMember {
  id: number;
  name: string;
  role: string;
  bio: string;
  avatarUrl: string;
  projectId: number;
  skills?: string; // 接口返回的是字符串，如"技能一、技能二"
  socialLinks?: {
    linkedin?: string;
    github?: string;
    email?: string;
  };
}

// 定义处理后的成员接口（skills转换为数组）
interface TeamMember extends Omit<RawTeamMember, "skills"> {
  skills?: string[]; // 转换为字符串数组
}

// 成员卡片组件
const MemberCard: React.FC<{ member: TeamMember }> = ({ member }) => {
  const [showTooltip, setShowTooltip] = useState(false);
  const target = React.useRef<HTMLDivElement>(null);

  return (
    <Card
      className={`${styles["member-card"]} h-100 border-0 rounded-xl overflow-hidden transition-all duration-300`}
      ref={target}
      onMouseEnter={() => setShowTooltip(true)}
      onMouseLeave={() => setShowTooltip(false)}
    >
      {/* 卡片头部 */}
      <div className={styles["card-header"]}>
        {/* 头像区域 */}
        <div
          className={`${styles["avatar-container"]} position-relative mx-auto mt-4`}
        >
          <img
            src={member.avatarUrl}
            alt={`${member.name}的头像`}
            className={`${styles["avatar"]} rounded-circle border-4 border-white shadow`}
          />
          {member.socialLinks && (
            <div
              className={`${styles["social-icons"]} position-absolute d-flex gap-2`}
            >
              {member.socialLinks.linkedin && (
                <a
                  href={member.socialLinks.linkedin}
                  target="_blank"
                  rel="noopener noreferrer"
                  className={`${styles["social-icon"]} bg-white rounded-circle d-flex justify-content-center align-items-center shadow-sm`}
                >
                  <FaLinkedin className="text-primary" size={16} />
                </a>
              )}
              {member.socialLinks.github && (
                <a
                  href={member.socialLinks.github}
                  target="_blank"
                  rel="noopener noreferrer"
                  className={`${styles["social-icon"]} bg-white rounded-circle d-flex justify-content-center align-items-center shadow-sm`}
                >
                  <FaGithub size={16} />
                </a>
              )}
              {member.socialLinks.email && (
                <a
                  href={`mailto:${member.socialLinks.email}`}
                  className={`${styles["social-icon"]} bg-white rounded-circle d-flex justify-content-center align-items-center shadow-sm`}
                >
                  <FaEnvelope className="text-danger" size={16} />
                </a>
              )}
            </div>
          )}
        </div>

        {/* 姓名和职位 */}
        <div className="text-center mt-4 mb-3 px-4">
          <Card.Title
            className={`${styles["member-name"]} h4 fw-bold text-dark mb-2`}
          >
            {member.name}
          </Card.Title>
          <Card.Subtitle
            className={`${styles["member-role"]} text-primary fw-medium`}
          >
            {member.role}
          </Card.Subtitle>
        </div>
      </div>

      {/* 卡片主体 */}
      <div className="card-body position-relative bg-white">
        <svg
          className="position-absolute w-100 top-0"
          viewBox="0 0 1440 20"
          preserveAspectRatio="none"
        >
          <path
            d="M1440,0 L0,0 L0,20 C150,0 350,20 720,20 C1080,20 1260,0 1440,0 Z"
            fill="white"
          />
        </svg>

        {/* 简介 */}
        <Card.Text className={`${styles["member-bio"]} px-4 py-3`}>
          {member.bio}
        </Card.Text>

        {/* 技能标签 */}
        {member.skills && member.skills.length > 0 && (
          <div className={`${styles["member-skills"]} px-4 pb-4`}>
            <div className="d-flex flex-wrap gap-2 justify-content-center">
              {member.skills.map((skill, index) => (
                <span
                  key={index}
                  className={`${styles["skill-tag"]} badge bg-light text-muted rounded-pill fw-normal px-3 py-2`}
                >
                  {skill}
                </span>
              ))}
            </div>
          </div>
        )}
      </div>

      {/* 悬停提示 */}
      <Overlay target={target.current} show={showTooltip} placement="top">
        {(props) => (
          <Tooltip id="member-tooltip" {...props}>
            查看{member.name}的详情
          </Tooltip>
        )}
      </Overlay>
    </Card>
  );
};

// 成员列表组件
const TeamMemberList: React.FC<{ members: TeamMember[] }> = ({ members }) => {
  if (members.length === 0) {
    return <div className="text-center py-10 text-gray-500">暂无成员信息</div>;
  }

  return (
    <Row xs={1} sm={2} lg={3} xl={4} className="g-4 justify-content-center">
      {members.map((member) => (
        <Col key={member.id}>
          <MemberCard member={member} />
        </Col>
      ))}
    </Row>
  );
};

// 主组件
const TeamMembersSection: React.FC = () => {
  // 获取路由中的项目ID参数
  const { id } = useParams<{ id: string }>();
  const projectId = Number(id);

  // 状态管理
  const [members, setMembers] = useState<TeamMember[]>([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);

  // 从API获取数据
  useEffect(() => {
    const fetchMembers = async () => {
      if (!projectId) return;

      try {
        setLoading(true);
        const response = await fetch(
          `https://api.zhongzhi.site/information/team/member?projectId=${projectId}`
        );

        if (!response.ok) {
          throw new Error(`HTTP错误: ${response.status}`);
        }

        // 使用明确的RawTeamMember类型，替代any
        const data: RawTeamMember[] = await response.json();

        // 处理技能字段：将字符串转换为数组
        const formattedMembers: TeamMember[] = data.map((member) => ({
          ...member,
          skills: member.skills
            ? member.skills.split("、").filter(Boolean) // 按中文顿号分割
            : [],
        }));

        setMembers(formattedMembers);
        setError(null);
      } catch (err) {
        setError(err instanceof Error ? err.message : "获取成员数据失败");
        setMembers([]);
      } finally {
        setLoading(false);
      }
    };

    fetchMembers();
  }, [projectId]); // 当projectId变化时重新请求

  // 加载状态显示
  if (loading) {
    return (
      <section className="py-5 bg-light">
        <Container className="text-center py-10">
          <div className="spinner-border text-primary" role="status">
            <span className="visually-hidden">加载中...</span>
          </div>
          <p className="mt-3 text-muted">正在加载团队成员信息...</p>
        </Container>
      </section>
    );
  }

  // 错误状态显示
  if (error) {
    return (
      <section className="py-5 bg-light">
        <Container className="text-center py-10">
          <div className="text-danger mb-3">
            <i className="bi bi-exclamation-triangle fs-3"></i>
          </div>
          <p className="text-danger">{error}</p>
          <button
            className="btn btn-primary mt-3"
            onClick={() => window.location.reload()}
          >
            重试
          </button>
        </Container>
      </section>
    );
  }

  return (
    <section className="py-5 bg-light">
      <Container>
        <div className="text-center mb-5">
          <h2 className="display-5 fw-bold text-dark mb-4">
            {projectId === 1
              ? "方向一成员"
              : projectId === 2
              ? "方向二成员"
              : projectId === 3
              ? "方向三成员"
              : "团队成员"}
          </h2>
          <p className="lead text-muted max-w-3xl mx-auto mb-5">
            {projectId === 1
              ? "负责视频剪辑及 PPT 制作，运用 PR、PS 等软件，高效完成视觉内容创作"
              : projectId === 2
              ? "负责与下位机的通讯交互，同时开发软件及网页平台，实现数据的实时接收、处理与可视化展示"
              : projectId === 3
              ? "负责 PLC 程序设计与开发，通过编写控制逻辑，实现对电机、气泵等设备的运行管理"
              : "方向介绍"}
          </p>
        </div>

        <TeamMemberList members={members} />
      </Container>
    </section>
  );
};

export default TeamMembersSection;
