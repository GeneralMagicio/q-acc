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

        // Custom image handler
        const imageHandler = () => {
          const input = document.createElement("input");
          input.setAttribute("type", "file");
          input.setAttribute("accept", "image/*");
          input.click();

          input.onchange = async () => {
            const file = input.files?.[0];
            if (file) {
              // Perform the image upload here
              const imageUrl = await uploadImage(file);

              // Insert the image URL into the editor
              const range = quillInstanceRef.current.getSelection();
              quillInstanceRef.current.insertEmbed(
                range.index,
                "image",
                imageUrl
              );
            }
          };
        };

        const quillInstance = new Quill(editorRef.current, {
          modules: {
            toolbar: {
              container: toolbarOptions,
              handlers: {
                image: imageHandler, // Override the default image handler
              },
            },
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

  // Mock upload function - replace with your actual upload logic
  const uploadImage = async (file: File) => {
    // Implement your image upload logic here, e.g., uploading to a server or cloud storage
    // For example, you might use fetch or axios to upload the file and get the URL
    // Here's a placeholder that simulates an upload and returns a mock URL
    const imageUrl =
      "https://resource.flexclip.com/templates/cover/w400/save-the-date-wedding-invitation-instagram.webp"; // Replace with actual URL from upload response
    return imageUrl;
  };

  const getEditorContent = () => {
    if (quillInstanceRef.current) {
      const content = quillInstanceRef.current.root.innerHTML; // Get HTML content
      console.log("Editor content:", content);
      return content;
    }
    return "";
  };

  const handleSave = () => {
    const content = getEditorContent();
    // You can now send this content to a server or store it in the state
    console.log("Saving content:", content);
  };

  return (
    <div>
      <div
        ref={editorRef}
        style={{ height: "400px", border: "1px solid #ccc" }}
      ></div>
      <button onClick={handleSave} style={{ marginTop: "10px" }}>
        Save Content
      </button>
    </div>
  );
};
