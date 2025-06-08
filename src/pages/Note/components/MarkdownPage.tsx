import React, { useState } from "react";
import MDEditor from "@uiw/react-md-editor";

const MarkdownPage: React.FC = () => {
  const [value] = useState<string | undefined>("");

  return (
    <div style={{ padding: 24 }}>
      <h2>Markdown 所见即所得编辑器</h2>
      <MDEditor value={value}  height={500} />
    </div>
  );
};

export default MarkdownPage;