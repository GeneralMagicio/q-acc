import React, { useEffect, useRef } from "react";
import "quill/dist/quill.snow.css";

const options = {
  modules: {
    toolbar: true,
  },
  placeholder: "Compose an epic...",
  theme: "snow",
};

export const RichTextEditor: React.FC = () => {
  const editorRef = useRef<HTMLDivElement | null>(null);

  useEffect(() => {
    let quillInstance: any = null;

    const initializeQuill = async () => {
      if (editorRef.current) {
        const Quill = (await import("quill")).default;
        quillInstance = new Quill(editorRef.current, options);
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
      <div ref={editorRef}></div>
    </div>
  );
};
