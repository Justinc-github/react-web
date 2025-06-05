import { Navigate } from "react-router-dom";
import Home from "../pages/Home";
import Log from "../pages/Log";

import FullScreenLayout from "../pages/Log/components/FullscreenLayout";
import Page2025_01_01 from "../pages/Log/pages/Page2025_01_01";
import Page2025_05_03 from "../pages/Log/pages/Page2025_05_03";
import Music from "../pages/Music";
import RequireAuth from "../pages/Auth/components/requireAuth";
import Login from "../pages/Auth";
import Default from "../pages/Log/pages/default";
export default [
  {
    path: "/",
    element: <Navigate to="/home" />,
  },
  {
    path: "/home",
    element: (
      <RequireAuth>
        <Home />
      </RequireAuth>
    ),
  },

  {
    path: "/login",
    element: <Login />, // 登录页本身不需要保护
  },
  {
    path: "/log",
    element: (
      <RequireAuth>
        <Log />
      </RequireAuth>
    ),
  },
  {
    path: "/music",
    element: (
      <RequireAuth>
        <Music />
      </RequireAuth>
    ),
  },
  {
    path: "/log/pages",
    element: (
      <RequireAuth>
        <FullScreenLayout />
      </RequireAuth>
    ),
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
  {
    path: '/test',
    element: <Default/>
  }
];
