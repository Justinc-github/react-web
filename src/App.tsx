import { useRoutes } from "react-router-dom";
import routes from "./routes";
import "bootstrap/dist/css/bootstrap.min.css";

export default function App() {
  const element = useRoutes(routes);

  return <div id="app">{element}</div>;
}
