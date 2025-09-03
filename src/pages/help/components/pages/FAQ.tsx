import faqMd from "../docs/faq.md?raw";

import ReactMarkdown from "react-markdown";

import remarkToc from "remark-toc";
import rehypeRaw from "rehype-raw";

const FAQ = () => (
  <div className="prose max-w-none p-6">
    <ReactMarkdown remarkPlugins={[remarkToc]} rehypePlugins={[rehypeRaw]}>
      {faqMd}
    </ReactMarkdown>
  </div>
);

export default FAQ;
