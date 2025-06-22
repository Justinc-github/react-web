import { Navigate } from "react-router-dom";
import Home from "../pages/Home";
import Log from "../pages/Log";

import FullScreenLayout from "../pages/Log/components/FullscreenLayout";

import Music from "../pages/Music";
import RequireAuth from "../pages/Auth/components/requireAuth";
import Login from "../pages/Auth";
import Page2024_10_03 from "../pages/Log/pages/Page2024_10_03";
import Page2025_01_01 from "../pages/Log/pages/Page2025_01_01";
import Page2025_05_03 from "../pages/Log/pages/Page2025_05_03";
import Page2025_05_28 from "../pages/Log/pages/Page2025_05_28";
import Note from "../pages/Note";
import MarkdownPage from "../pages/Note/components/MarkdownPage";
import Unauthorized from "../components/Unauthorized";
import VideoPlayer from "../components/VideoPlayer";
import Download from "../pages/WindowsDownload";


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
    element: <Login />,
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
    path: "/download",
    element: <Download />,
  },
  {
    path: "/note",
    element: (
      <RequireAuth>
        <Note />
      </RequireAuth>
    ),
    children: [
      {
        path: "markdown",
        element: (
          <RequireAuth>
            <MarkdownPage />
          </RequireAuth>
        ),
      },
    ],
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
    path: "/video",
    element: (
      <RequireAuth>
        <VideoPlayer />
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
        path: "page2024_10_03",
        element: <Page2024_10_03 />,
      },
      {
        path: "page2025_01_01",
        element: <Page2025_01_01 />,
      },
      {
        path: "page2025_05_03",
        element: <Page2025_05_03 />,
      },
      {
        path: "page2025_05_28",
        element: <Page2025_05_28 />,
      },
    ],
  },
  {
    path: "*",
    element: <Unauthorized />,
  },
];
