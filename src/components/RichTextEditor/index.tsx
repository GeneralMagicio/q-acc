import React, { useEffect, useRef } from "react";
import Quill from "quill";
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

  useEffect(() => {
    let quillInstance: any = null;
    const initializeQuill = async () => {
      if (editorRef.current) {
        const { default: Quill } = await import("quill");
        quillInstance = new Quill(editorRef.current, {
          modules: {
            toolbar: toolbarOptions,
          },
          theme: "snow",
        });
        console.log("quill", quillInstance);
      }
    };
    initializeQuill();
    // Cleanup on unmount
    return () => {
      if (quillInstance) {
        quillInstance = null;
      }
    };
  }, []);

  return (
    <div>
      <div
        ref={editorRef}
        style={{ height: "400px", border: "1px solid #ccc" }}
      ></div>
    </div>
  );
};
