import HelpLayout from "./HelpLayout";
import AppHelpLayout from "./utils/AppHelpLayout";
import WebHelpLayout from "./utils/WebHelpLayout";
import GettingStarted from "./components/pages/GettingStarted";
import Faq from "./components/pages/FAQ";
import WebIntro from "./components/pages/WebIntro";
import WebFaq from "./components/pages/WebFaq";

export default {
  path: "/help",
  element: <HelpLayout />,
  children: [
    {
      path: "app",
      element: <AppHelpLayout />,
      children: [
        { path: "getting-started", element: <GettingStarted /> },
        { path: "faq", element: <Faq /> },
      ],
    },
    {
      path: "web",
      element: <WebHelpLayout />,
      children: [
        { path: "intro", element: <WebIntro /> },
        { path: "faq", element: <WebFaq /> },
      ],
    },
  ],
};
