import ReactMarkdown from "react-markdown";

import doc from "../docs/getting-started.md?raw";
import remarkToc from "remark-toc";
import rehypeRaw from "rehype-raw";

const GettingStarted = () => (
  <div className="prose max-w-none p-6">
    <ReactMarkdown remarkPlugins={[remarkToc]} rehypePlugins={[rehypeRaw]}>
      {doc}
    </ReactMarkdown>
  </div>
);

export default GettingStarted;