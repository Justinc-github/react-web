import { NavLink, Outlet, useLocation } from "react-router-dom";

const AppHelpLayout = () => {
  const location = useLocation();
  const params = new URLSearchParams(location.search);
  const isWebView = params.get("webview") === "1";
  const search = isWebView ? "?webview=1" : "";

  return (
    <div className="row">
      {isWebView ? (
        // WebView模式：顶部水平导航
        <nav className="col-12 mb-3 nav nav-pills justify-content-center">
          <NavLink to={`getting-started${search}`} className="nav-link">
            快速开始
          </NavLink>
          <NavLink to={`faq${search}`} className="nav-link">
            常见问题
          </NavLink>
        </nav>
      ) : (
        // 普通模式：左侧垂直导航
        <nav className="col-md-2 border-end">
          <ul className="nav flex-column">
            <li className="nav-item">
              <NavLink
                to={`getting-started${search}`}
                className="nav-link px-0"
              >
                快速开始
              </NavLink>
            </li>
            <li className="nav-item">
              <NavLink to={`faq${search}`} className="nav-link px-0">
                常见问题
              </NavLink>
            </li>
          </ul>
        </nav>
      )}
      <main className={isWebView ? "col-12" : "col-md-8"}>
        <div className="py-2 px-3">
          <Outlet />
        </div>
      </main>
      {!isWebView && <aside className="col-md-2 d-none d-md-block"></aside>}
    </div>
  );
};

export default AppHelpLayout;
