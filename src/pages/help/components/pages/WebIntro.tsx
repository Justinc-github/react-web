import ReactMarkdown from "react-markdown";
import WebIntroMd from "../docs/webintro.md?raw";

const WebIntro = () => (
  <div>
    <ReactMarkdown>{WebIntroMd}</ReactMarkdown>
  </div>
);

export default WebIntro;
