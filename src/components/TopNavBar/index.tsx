import { Container, Nav, Navbar, NavDropdown } from "react-bootstrap";
import "./TopNavBar.css";
import { Link, useLocation } from "react-router-dom";

export default function TopNavbar() {
  const location = useLocation(); // 获取当前路由信息

  return (
    <Navbar bg="light" expand="lg">
      <Container>
        <Nav
          variant="pills"
          activeKey={location.pathname} // 动态绑定当前路径
          className="custom-nav w-100"
        >
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
        <img
          src="https://img.picgo.net/2025/05/26/logoe24a9a02409449d6.png"
          style={{ height: "35px", width: "35px" }}
          alt="logo"
        />
      </Container>
    </Navbar>
  );
}
