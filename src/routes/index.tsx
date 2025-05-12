import { Navigate } from "react-router-dom";
import Page2025_01_01 from "../pages/web/Page2025_01_01";
import Page2025_05_03 from "../pages/web/Page2025_05_03";
export default [
  {
    path: "/Page2025_01_01",
    element: <Page2025_01_01 />,
  },
  {
    path: "/Page2025_05_03",
    element: <Page2025_05_03 />,
  },
  {
    path: "/",
    element: <Navigate to="/" />,
  },
];
