import { Navigate } from "react-router-dom";
import Home from "../pages/Home";
import Log from "../pages/Log";
export default [
  {
    path: "/",
    element: <Navigate to="/home" />,
  },
  {
    path: "/home",
    element: <Home />,
  },
  {
    path: "/log",
    element: <Log />,
  },
];
