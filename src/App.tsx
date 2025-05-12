import { NavLink, useRoutes } from "react-router-dom";
import routes from "./routes";
export default function App() {
  const element = useRoutes(routes);
  return (
    <div>
      <div className="row">
        <div className="col-xs-offset-2 col-xs-8">
          <div className="page-header">
            <h1 style={{textAlign: "center", fontSize: "50px"}}>团队日志</h1>
          </div>
        </div>
      </div>
      <div className="row">
        <div className="col-xs-2 col-xs-offset-2" style={{width: "200px"}}>
          <div className="list-group">
            <NavLink className="list-group-item" to="/Page2025_01_01">
              2025-01-01
            </NavLink>
            <NavLink className="list-group-item" to="/Page2025_05_03">
              2025-05-03
            </NavLink>
          </div>
        </div>
        <div className="col-xs-6">
          <div className="panel">
            <div className="panel-body">{element}</div>
          </div>
        </div>
      </div>
    </div>
  );
}
