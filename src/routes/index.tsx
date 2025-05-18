import { Navigate } from "react-router-dom";
import Home from "../pages/Home";
import Log from "../pages/Log";

import FullScreenLayout from "../pages/Log/components/FullscreenLayout";
import Page2025_01_01 from "../pages/Log/pages/Page2025_01_01";
import Page2025_05_03 from "../pages/Log/pages/Page2025_05_03";
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
  {
    path: "/log/pages",
    element: <FullScreenLayout />, 
    children: [
      {
        path: "page2025_01_01",
        element: <Page2025_01_01 />,
      },
      {
        path: "page2025_05_03",
        element: <Page2025_05_03 />,
      },
    ],
  },
];
