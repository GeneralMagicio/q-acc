import React, { useEffect, useRef, useState } from 'react';
import 'quill/dist/quill.snow.css';
import { useFormContext, RegisterOptions } from 'react-hook-form';
import { uploadToIPFS } from '@/services/ipfs';
import { getIpfsAddress } from '@/helpers/image';

const toolbarOptions = [
  ['bold', 'italic', 'underline', 'strike'], // toggled buttons
  ['blockquote', 'code-block'],
  ['link', 'image', 'video', 'formula'],
  [{ header: 1 }, { header: 2 }], // custom button values
  [{ list: 'ordered' }, { list: 'bullet' }, { list: 'check' }],
  [{ script: 'sub' }, { script: 'super' }], // superscript/subscript
  [{ indent: '-1' }, { indent: '+1' }], // outdent/indent
  [{ direction: 'rtl' }], // text direction
  [{ size: ['small', false, 'large', 'huge'] }], // custom dropdown
  [{ header: [1, 2, 3, 4, 5, 6, false] }],
  [{ color: [] }, { background: [] }], // dropdown with defaults from theme
  [{ font: [] }],
  [{ align: [] }],
  ['clean'], // remove formatting button
];

interface RichTextEditorProps {
  name: string;
  label?: string;
  description?: string;
  rules?: RegisterOptions;
  maxLength?: number;
  defaultValue?: string;
}

enum QuillState {
  NOT_INITIALIZED,
  INITIALIZING,
  INITIALIZED,
}

// Remove the Base64 image from the editor
const removeBase64Image = (quill: any, range: any) => {
  quill.deleteText(range.index - 1, 1);
};

export const RichTextEditor: React.FC<RichTextEditorProps> = ({
  name,
  label,
  description,
  rules,
  maxLength,
  defaultValue,
}) => {
  const editorRef = useRef<HTMLDivElement | null>(null);
  const quillInstanceRef = useRef<any>(null);
  const quillStateRef = useRef<any>(QuillState.NOT_INITIALIZED);
  const {
    register,
    formState: { errors },
    setValue,
  } = useFormContext();
  const [charCount, setCharCount] = useState(0);

  // Register the editor field with react-hook-form
  useEffect(() => {
    const initializeQuill = async () => {
      if (
        quillStateRef.current === QuillState.NOT_INITIALIZED &&
        editorRef.current
      ) {
        quillStateRef.current = QuillState.INITIALIZING;
        const { default: Quill } = await import('quill');

        const quillInstance = new Quill(editorRef.current, {
          modules: {
            toolbar: {
              container: toolbarOptions,
              handlers: {
                image: imageHandler, // Hook into the image handler defined below
              },
            },
          },
          theme: 'snow',
        });

        quillInstance.root.addEventListener(
          'paste',
          async (event: ClipboardEvent) => {
            event.preventDefault();
            const clipboardData = event.clipboardData;
            if (clipboardData) {
              const items = Array.from(clipboardData.items);
              for (const item of items) {
                if (item.type.startsWith('image/')) {
                  event.preventDefault(); // Prevent default paste behavior for images
                  const file = item.getAsFile();
                  if (file) {
                    try {
                      const imageIpfsHash = await uploadToIPFS(file);
                      if (imageIpfsHash) {
                        const imageUrl = getIpfsAddress(imageIpfsHash);
                        const range = quillInstance.getSelection();
                        if (range) {
                          removeBase64Image(quillInstance, range);
                          quillInstance.insertEmbed(
                            range.index,
                            'image',
                            imageUrl,
                          );
                        }
                      }
                    } catch (error) {
                      console.error('Error uploading pasted image:', error);
                    }
                  }
                }
              }
            }
          },
        );
        quillInstanceRef.current = quillInstance;
        quillStateRef.current = QuillState.INITIALIZED;
        console.log('OUT');

        if (defaultValue) {
          console.log('INSIDE');
          quillInstance.clipboard.dangerouslyPasteHTML(defaultValue); // Set the default value as HTML content
        }

        quillInstance.on('text-change', () => {
          const text = quillInstance.getText().trim();
          setCharCount(text.length);
          setValue(name, quillInstance.root.innerHTML, {
            shouldValidate: true,
          });
        });
      }
    };

    // Initialize Quill only if it's not initialized already
    if (quillStateRef.current === QuillState.NOT_INITIALIZED) {
      initializeQuill();
    }

    return () => {
      quillInstanceRef.current = null; // Clean up the instance on unmount
    };
  }, [name, setValue]);

  useEffect(() => {
    if (quillStateRef.current === QuillState.INITIALIZED && defaultValue) {
      quillInstanceRef.current.clipboard.dangerouslyPasteHTML(defaultValue);
    }
  }, [defaultValue]);

  // Image handler function
  const imageHandler = () => {
    const input = document.createElement('input');
    input.setAttribute('type', 'file');
    input.setAttribute('accept', 'image/*');
    input.click();

    input.onchange = async () => {
      const file = input.files?.[0];
      if (file && quillInstanceRef.current) {
        const range = quillInstanceRef.current.getSelection();
        if (range) {
          try {
            const imageIpfsHash = await uploadToIPFS(file);
            if (imageIpfsHash) {
              const imageUrl = getIpfsAddress(imageIpfsHash);
              quillInstanceRef.current.insertEmbed(
                range.index,
                'image',
                imageUrl,
              );
            }
          } catch (error) {
            console.error('Error uploading image:', error);
          }
        }
      }
    };
  };

  return (
    <div>
      {label && (
        <label className='block text-sm font-medium text-gray-700'>
          {label}
        </label>
      )}
      <div
        ref={editorRef}
        style={{ height: '400px', border: '1px solid #ccc' }}
      ></div>
      {description && (
        <p className='text-sm text-gray-500 mt-1'>{description}</p>
      )}
      {/* {maxLength && (
        <div className='text-right text-sm text-gray-500 mt-1'>
          {charCount}/{maxLength} characters
        </div>
      )} */}
      {errors[name] && (
        <p className='text-red-500 text-xs mt-1'>
          {(errors[name]?.message as string) || 'Error'}
        </p>
      )}
    </div>
  );
};
