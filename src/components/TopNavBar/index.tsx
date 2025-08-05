import { Container, Nav } from "react-bootstrap";
import { Link } from "react-router-dom";
import NavigationProfile from "./components/NavigationProfile";

// 顶部导航栏
export default function NavigationBar() {
  return (
    <Container className="d-flex justify-content-center pt-2">
      <Nav variant="pills" defaultActiveKey="/home">
        <Nav.Item>
          <Nav.Link as={Link} to="/" eventKey="/">
            主页
          </Nav.Link>
        </Nav.Item>
        <Nav.Item>
          <Nav.Link as={Link} to="/log" eventKey="/log">
            日志
          </Nav.Link>
        </Nav.Item>
        <Nav.Item>
          <Nav.Link as={Link} to="/help/web/intro" eventKey="/help">
            帮助中心
          </Nav.Link>
        </Nav.Item>
        <Nav.Item className="d-flex align-items-center">
          <NavigationProfile />
        </Nav.Item>
      </Nav>
    </Container>
  );
}
