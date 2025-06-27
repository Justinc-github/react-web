import { NavLink, Outlet } from "react-router-dom";

const WebHelpLayout = () => (
  <>
    <nav className="col-md-2 border-end">
      <h6 className="fw-bold mb-3">网站帮助</h6>
      <ul className="nav flex-column">
        <li className="nav-item">
          <NavLink to="intro" className="nav-link px-0">
            网站简介
          </NavLink>
        </li>
        <li className="nav-item">
          <NavLink to="faq" className="nav-link px-0">
            常见问题
          </NavLink>
        </li>
      </ul>
    </nav>
    <main className="col-md-8">
      <div className="py-2 px-3">
        <Outlet />
      </div>
    </main>
    <aside className="col-md-2 d-none d-md-block">{/* 可选目录组件 */}</aside>
  </>
);

export default WebHelpLayout;
