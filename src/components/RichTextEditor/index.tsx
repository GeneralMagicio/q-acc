import React, { useEffect, useRef } from "react";
import "quill/dist/quill.snow.css";

const toolbarOptions = [
  ["bold", "italic", "underline", "strike"], // toggled buttons
  ["blockquote", "code-block"],
  ["link", "image", "video", "formula"],
  [{ header: 1 }, { header: 2 }], // custom button values
  [{ list: "ordered" }, { list: "bullet" }, { list: "check" }],
  [{ script: "sub" }, { script: "super" }], // superscript/subscript
  [{ indent: "-1" }, { indent: "+1" }], // outdent/indent
  [{ direction: "rtl" }], // text direction
  [{ size: ["small", false, "large", "huge"] }], // custom dropdown
  [{ header: [1, 2, 3, 4, 5, 6, false] }],
  [{ color: [] }, { background: [] }], // dropdown with defaults from theme
  [{ font: [] }],
  [{ align: [] }],
  ["clean"], // remove formatting button
];

export const RichTextEditor: React.FC = () => {
  const editorRef = useRef<HTMLDivElement | null>(null);
  const quillInstanceRef = useRef<any>(null);

  useEffect(() => {
    const initializeQuill = async () => {
      if (editorRef.current) {
        const { default: Quill } = await import("quill");
        const quillInstance = new Quill(editorRef.current, {
          modules: {
            toolbar: toolbarOptions,
          },
          theme: "snow",
        });
        quillInstanceRef.current = quillInstance;
        console.log("Quill instance initialized", quillInstance);
      }
    };
    initializeQuill();

    // Cleanup on unmount
    return () => {
      quillInstanceRef.current = null;
    };
  }, []);

  const getEditorContent = () => {
    if (quillInstanceRef.current) {
      const content = quillInstanceRef.current.root.innerHTML; // Get HTML content
      console.log("Editor content:", content);
      return content;
    }
    return "";
  };

  return (
    <div>
      <div
        ref={editorRef}
        style={{ height: "400px", border: "1px solid #ccc" }}
      ></div>
    </div>
  );
};
