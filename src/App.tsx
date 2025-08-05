import "bootstrap/dist/css/bootstrap.min.css";
import routes from "./routes";
import { useRoutes, useLocation } from "react-router-dom";
import { Container } from "react-bootstrap";

import { useEffect, useState } from "react";
import { getAuthInfo } from "./pages/Auth/utils/auth";
import NavigationBar from "./components/TopNavBar";
import Footer from "./components/Footer";

function App() {
  const element = useRoutes(routes);
  const location = useLocation();

  // 管理登录状态和导航显示状态
  const [isAuthenticated, setIsAuthenticated] = useState(false);
  const [showNavigation, setShowNavigation] = useState(true);

  // 检查登录状态（基于完整的认证信息，而非仅 token）
  useEffect(() => {
    // 使用 getAuthInfo 判断是否登录（更可靠，包含完整信息校验）
    const authInfo = getAuthInfo();
    setIsAuthenticated(!!authInfo);
  }, [location.pathname]); // 路由变化时重新检查登录状态

  // 决定是否显示导航栏和页脚
  useEffect(() => {
    // 规则：
    // 1. 登录页面（/login）始终不显示导航
    // 2. 其他页面：登录状态则显示，未登录则不显示
    if (location.pathname === "/login") {
      setShowNavigation(false);
    } else {
      setShowNavigation(isAuthenticated);
    }
  }, [location.pathname, isAuthenticated]);

  return (
    <>
      {/* 登录成功且非登录页时显示导航栏 */}
      {showNavigation && <NavigationBar />}

      <Container
        className="pb-5"
        style={{
          backgroundColor: showNavigation ? "#f8f9fa" : "transparent",
          padding: showNavigation ? "inherit" : "0",
        }}
      >
        {element}
      </Container>

      {/* 登录成功且非登录页时显示页脚 */}
      {showNavigation && <Footer />}
    </>
  );
}

export default App;
