import MarkdownEditorPreview from "./components/MarkdownEditorPreview";

export default function Note() {
  return (
    <div style={{ padding: 32 }}>
      <h2>Markdown 编辑与预览</h2>
      <MarkdownEditorPreview />
    </div>
  );
}
