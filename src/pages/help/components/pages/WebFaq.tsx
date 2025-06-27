import ReactMarkdown from "react-markdown";
import webfaqMd from "../docs/webfaq.md?raw";

const WebFaq = () => (
  <div className="prose max-w-none p-6">
    <ReactMarkdown>{webfaqMd}</ReactMarkdown>
  </div>
);

export default WebFaq;
