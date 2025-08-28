import Home from "../pages/Home";
import Log from "../pages/Log";

import FullScreenLayout from "../pages/Log/components/FullscreenLayout";
import helpRoutes from "../pages/help/HelpRoutes";

import Music from "../pages/Music";
import Login from "../pages/Auth";
import Page2024_10_03 from "../pages/Log/pages/Page2024_10_03";
import Page2025_01_01 from "../pages/Log/pages/Page2025_01_01";
import Page2025_05_03 from "../pages/Log/pages/Page2025_05_03";
import Page2025_05_28 from "../pages/Log/pages/Page2025_05_28";
import Unauthorized from "../components/Unauthorized";
import VideoPlayer from "../components/VideoPlayer";
import Download from "../pages/WindowsDownload";
import AuthRoute from "../pages/Auth/utils/AuthRoute";
import StudentForm from "../pages/Entroll";
import TeamMembersSection from "../pages/Home/components/TeamProjects/components/TeamMembersSection";
import GraduatePrevious from "../pages/Home/components/Farewell/GraduatePrevious";
import NumberSign from "../pages/Home/components/NumberSign";

export default [
  {
    path: "/",
    element: (
      <AuthRoute>
        <Home />
      </AuthRoute>
    ),
  },
  {
    path: "/home/introduce/:id",
    element: <TeamMembersSection />,
  },
  {
    path: "/home/previous/graduate",
    element: <GraduatePrevious />,
  },
  {
    path: "/home/number/sign",
    element: <NumberSign/>
  },
  helpRoutes,
  {
    path: "/login",
    element: <Login />,
  },
  {
    path: "/log",
    element: (
      <AuthRoute>
        <Log />
      </AuthRoute>
    ),
  },
  {
    path: "/download",
    element: (
      <AuthRoute>
        <Download />
      </AuthRoute>
    ),
  },
  {
    path: "/music",
    element: (
      <AuthRoute>
        <Music />
      </AuthRoute>
    ),
  },
  {
    path: "/video",
    element: (
      <AuthRoute>
        <VideoPlayer />
      </AuthRoute>
    ),
  },
  {
    path: "/enroll",
    element: (
      <AuthRoute>
        <StudentForm />
      </AuthRoute>
    ),
  },
  {
    path: "/log/pages",
    element: (
      <AuthRoute>
        <FullScreenLayout />
      </AuthRoute>
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
