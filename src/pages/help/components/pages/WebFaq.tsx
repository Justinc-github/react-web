import ReactMarkdown from "react-markdown";
import rehypeRaw from "rehype-raw"; // 1. 引入 rehypeRaw 插件
import webfaqMd from "../docs/webfaq.md?raw";
import remarkToc from "remark-toc";

const WebFaq = () => (
  <div className="prose max-w-none p-6">
    <ReactMarkdown remarkPlugins={[remarkToc]} rehypePlugins={[rehypeRaw]}>
      {webfaqMd}
    </ReactMarkdown>
  </div>
);

export default WebFaq;
