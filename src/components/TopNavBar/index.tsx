import { Container, Nav, Navbar, NavDropdown, Image } from "react-bootstrap";
import "./TopNavBar.css";
import { Link, useLocation, useNavigate } from "react-router-dom";
import { useState } from "react";
import { signOut } from "../../pages/Auth/utils/logout";
// import { useUser } from "../../pages/Auth/utils/userCurrent";

export default function TopNavbar() {
  const location = useLocation();
  const [showDropdown, setShowDropdown] = useState(false);
  const navigate = useNavigate();

  // 模拟用户数据
  const user = {
    name: "张三",
    avatar: "https://img.picgo.net/2025/05/05/touxiange48491887ed787ed.jpg",
    email: "zhangsan@example.com",
  };
  const handleSignOut = async () => {
    const result = await signOut();
    if (result.success) {
      // 重定向到登录页
      navigate("/login", { replace: true });
    } else {
      alert(`退出失败: ${result.error}`);
    }
  };
  return (
    <Navbar bg="light" expand="lg">
      <Container>
        <Nav
          variant="pills"
          activeKey={location.pathname}
          className="custom-nav w-100"
        >
          {/* 导航项保持不变 */}
          <Nav.Item className="nav-item-flex">
            <Nav.Link
              as={Link}
              to="/home"
              eventKey="/home"
              className="nav-hover"
            >
              首页
            </Nav.Link>
          </Nav.Item>
          <Nav.Item className="nav-item-flex">
            <Nav.Link as={Link} to="/log" eventKey="/log" className="nav-hover">
              日志
            </Nav.Link>
          </Nav.Item>
          <Nav.Item className="nav-item-flex">
            <Nav.Link eventKey="3" className="nav-hover" disabled>
              详细信息
            </Nav.Link>
          </Nav.Item>
          <NavDropdown
            title="更多"
            id="nav-dropdown"
            className="nav-dropdown-flex"
            disabled
          >
            <NavDropdown.Item eventKey="4.1" className="dropdown-hover">
              动作
            </NavDropdown.Item>
            <NavDropdown.Item eventKey="4.2" className="dropdown-hover">
              其他操作
            </NavDropdown.Item>
            <NavDropdown.Item eventKey="4.3" className="dropdown-hover">
              其他内容
            </NavDropdown.Item>
          </NavDropdown>
        </Nav>

        {/* 头像及下拉菜单区域 */}
        <div
          className="avatar-container position-relative"
          onMouseEnter={() => setShowDropdown(true)}
          onMouseLeave={() => setShowDropdown(false)}
        >
          <NavDropdown
            show={showDropdown}
            align="end"
            id="user-dropdown"
            className="dropdown-menu-custom"
            title={
              <Image
                src={user.avatar}
                className="main-avatar"
                roundedCircle
                alt="用户头像"
                style={{ width: "40px", height: "40px" }}
              />
            }
          >
            {/* <div className="px-3 py-2">
              <div className="fw-bold">{user.name}</div>
              <div className="text-muted small">{user.email}</div>
            </div> */}
            {/* <NavDropdown.Divider />
            <NavDropdown.Item as={Link} to="/profile">
              个人资料
            </NavDropdown.Item>
            <NavDropdown.Item as={Link} to="/settings">
              账号设置
            </NavDropdown.Item>
            <NavDropdown.Divider /> */}
            <NavDropdown.Item className="text-danger" onClick={handleSignOut}>
              退出登录
            </NavDropdown.Item>
          </NavDropdown>
        </div>
      </Container>
    </Navbar>
  );
}
