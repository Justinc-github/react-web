import ReactMarkdown from "react-markdown";
import remarkGfm from "remark-gfm";
import rehypeSlug from "rehype-slug";
import rehypeAutolinkHeadings from "rehype-autolink-headings";

import doc from "../docs/getting-started.md?raw";

const GettingStarted = () => {
  return (
    <article className="markdown-body">
      <ReactMarkdown
        children={doc}
        remarkPlugins={[remarkGfm]}
        rehypePlugins={[
          rehypeSlug,
          [rehypeAutolinkHeadings, { behavior: "wrap" }],
        ]}
      />
    </article>
  );
};

export default GettingStarted;
