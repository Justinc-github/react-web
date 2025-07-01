import { Container, Nav, Navbar, NavDropdown, Image } from "react-bootstrap";
import { Link, useLocation, useNavigate } from "react-router-dom";
import { useState, useEffect } from "react";
import { signOut } from "../../pages/Auth/utils/logout";

interface User {
  avatar_url?: string;
  name?: string;
  email?: string;
}

export default function TopNavbar() {
  const location = useLocation();
  const navigate = useNavigate();
  const [isMobile, setIsMobile] = useState(false);
  const [showDropdown, setShowDropdown] = useState(false);
  const [user, setUser] = useState<User | null>(null);

  useEffect(() => {
    const handleResize = () => setIsMobile(window.innerWidth <= 768);
    handleResize();
    window.addEventListener("resize", handleResize);

    const loadUserData = () => {
      const userData = localStorage.getItem("userProfile");
      if (userData) {
        try {
          setUser(JSON.parse(userData));
        } catch (e) {
          console.error("解析用户数据失败", e);
        }
      }
    };

    loadUserData();
    window.addEventListener("storage", (e) => {
      if (e.key === "userProfile") loadUserData();
    });

    return () => {
      window.removeEventListener("resize", handleResize);
      window.removeEventListener("storage", () => {});
    };
  }, []);

  const handleSignOut = async () => {
    const result = await signOut();
    if (result.success) {
      localStorage.removeItem("userProfile");
    }
    navigate("/login", { replace: true });
  };

  const handleMobileClick = () => {
    if (isMobile) setShowDropdown(false);
  };

  const getUserAvatar = () =>
    user?.avatar_url ||
    "https://img.picgo.net/2025/05/05/touxiange48491887ed787ed.jpg";
  const getUserName = () => user?.name || "哈哈哈";
  const getUserEmail = () => user?.email || "zhangsan@example.com";

  return (
    <Navbar bg="light" expand="lg" sticky="top" className="border-bottom">
      <Container className="d-flex justify-content-between">
        <Nav activeKey={location.pathname} className="flex-grow-1">
          <Nav.Item>
            <Nav.Link
              as={Link}
              to="/"
              eventKey="/home"
              onClick={handleMobileClick}
            >
              首页
            </Nav.Link>
          </Nav.Item>
          <Nav.Item>
            <Nav.Link
              as={Link}
              to="/log"
              eventKey="/log"
              onClick={handleMobileClick}
            >
              日志
            </Nav.Link>
          </Nav.Item>
          <Nav.Item>
            <Nav.Link
              as={Link}
              to="/help/web/intro"
              eventKey="/help"
              onClick={handleMobileClick}
            >
              帮助中心
            </Nav.Link>
          </Nav.Item>
        </Nav>

        <div
          className="d-flex align-items-center"
          onMouseEnter={() => !isMobile && setShowDropdown(true)}
          onMouseLeave={() => !isMobile && setShowDropdown(false)}
          onClick={() => isMobile && setShowDropdown(!showDropdown)}
        >
          <NavDropdown
            show={showDropdown}
            align="end"
            id="user-dropdown"
            title={
              <Image
                src={getUserAvatar()}
                roundedCircle
                alt="用户头像"
                width={40}
                height={40}
              />
            }
            className="ms-3"
          >
            <div className="px-3 py-2 text-end">
              <div className="fw-bold">{getUserName()}</div>
              <div className="text-muted small">{getUserEmail()}</div>
            </div>
            <NavDropdown.Divider />
            <NavDropdown.Item className="text-danger" onClick={handleSignOut}>
              退出登录
            </NavDropdown.Item>
          </NavDropdown>
        </div>
      </Container>
    </Navbar>
  );
}
