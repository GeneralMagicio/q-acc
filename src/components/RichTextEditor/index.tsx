import React, { useEffect, useRef } from "react";
import "quill/dist/quill.snow.css";
import { uploadToIPFS } from "@/services/ipfs";
import { getIpfsAddress } from "@/helpers/image";

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
              // Create a base64 preview of the image
              const reader = new FileReader();
              reader.onload = async (e) => {
                const base64ImageSrc = e.target?.result;

                // Insert the base64 image into the editor with 60% opacity
                const range = quillInstanceRef.current.getSelection(true);
                quillInstanceRef.current.insertEmbed(
                  range.index,
                  "image",
                  base64ImageSrc
                );

                const imageElement =
                  quillInstanceRef.current.root.querySelector(
                    `img[src="${base64ImageSrc}"]`
                  ) as HTMLImageElement;
                if (imageElement) {
                  imageElement.style.opacity = "0.6";
                }

                // Perform the image upload
                const imageIpfsHash = await uploadToIPFS(file);

                if (!imageIpfsHash) {
                  console.error("Failed to upload image to IPFS");
                  return;
                }

                const imageUrl = getIpfsAddress(imageIpfsHash);

                // Replace the base64 image source with the uploaded IPFS URL and set full opacity
                if (imageElement) {
                  imageElement.setAttribute("src", imageUrl);
                  imageElement.style.opacity = "1.0";
                }
              };
              reader.readAsDataURL(file);
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