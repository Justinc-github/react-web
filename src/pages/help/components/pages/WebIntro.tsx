import ReactMarkdown from "react-markdown";
import WebIntroMd from "../docs/webintro.md?raw";
import rehypeRaw from "rehype-raw"; // 1. 引入 rehypeRaw 插件

const WebIntro = () => (
  <div>
    <ReactMarkdown rehypePlugins={[rehypeRaw]}>{WebIntroMd}</ReactMarkdown>
  </div>
);

export default WebIntro;
