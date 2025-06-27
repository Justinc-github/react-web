import { NavLink, Outlet, useLocation, useNavigate } from "react-router-dom";

const HelpLayout = () => {
  const location = useLocation();
  // 判断当前一级目录
  // const isApp = location.pathname.startsWith("/help/app");
  // const isWeb = location.pathname.startsWith("/help/web");
  const navigate = useNavigate();
  const params = new URLSearchParams(location.search);
  const isWebView = params.get("webview") === "1";
  return (
    <div className="container-fluid">
      {/* 顶部一级导航 */}
      {!isWebView && (
        <div className="row mt-4">
          <div className="col-12 mb-3  d-flex align-items-center justify-content-between">
            <nav className="nav nav-pills">
              <NavLink
                to="/help/app/getting-started"
                className={
                  "nav-link" +
                  (location.pathname.startsWith("/help/app") ? " active" : "")
                }
                end
              >
                App
              </NavLink>
              <NavLink
                to="/help/web/intro"
                className={
                  "nav-link" +
                  (location.pathname.startsWith("/help/web") ? " active" : "")
                }
                end
              >
                网站
              </NavLink>
            </nav>
            <button
              className="btn btn-outline-primary"
              onClick={() => navigate("/")}
            >
              返回首页
            </button>
          </div>
        </div>
      )}
      <div className={`row${isWebView ? " mt-4" : ""}`}>
        <Outlet />
      </div>
    </div>
  );
};

export default HelpLayout;
