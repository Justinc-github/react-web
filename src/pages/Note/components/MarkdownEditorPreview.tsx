import React, { useRef, useState } from "react";
import { marked } from "marked";

const MarkdownEditorPreview: React.FC = () => {
  const [markdown, setMarkdown] = useState("");
  const fileInputRef = useRef<HTMLInputElement>(null);

  const handleFileUpload = (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0];
    if (file) {
      const reader = new FileReader();
      reader.onload = (event) => {
        setMarkdown(event.target?.result as string);
      };
      reader.readAsText(file);
    }
  };

  return (
    <div>
      <div style={{ marginBottom: 16 }}>
        <input
          type="file"
          accept=".md, .markdown, .txt"
          ref={fileInputRef}
          onChange={handleFileUpload}
        />
      </div>
      <div style={{ display: "flex", gap: 16 }}>
        <textarea
          style={{
            width: "50%",
            height: 400,
            marginBottom: 8,
            resize: "vertical",
          }}
          value={markdown}
          onChange={(e) => setMarkdown(e.target.value)}
          placeholder="在此输入或上传 Markdown 内容..."
        />
        <div
          style={{
            width: "50%",
            height: 400,
            border: "1px solid #eee",
            padding: 16,
            overflowY: "auto",
            background: "#fafbfc",
          }}
        >
          <div dangerouslySetInnerHTML={{ __html: marked(markdown) }} />
        </div>
      </div>
    </div>
  );
};

export default MarkdownEditorPreview;