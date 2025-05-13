import { Row } from "react-bootstrap";
import { NavLink } from "react-router-dom";

export default function Home() {
  return (
    <Row>
      <div className="text-center">
        <h1>这是主界面</h1>
        <NavLink to="/log">队伍日志</NavLink>
      </div>
    </Row>
  );
}
