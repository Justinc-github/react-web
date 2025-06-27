import ReactMarkdown from "react-markdown";
import faqMd from "../docs/faq.md?raw";

const FAQ = () => {
  return (
    <div className="prose max-w-none p-6">
      <ReactMarkdown>{faqMd}</ReactMarkdown>
    </div>
  );
};

export default FAQ;
