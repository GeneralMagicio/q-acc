import React from 'react';
import 'quill/dist/quill.snow.css';

interface RichTextViewerProps {
  description: string;
}

const RichTextViewer: React.FC<RichTextViewerProps> = ({ description }) => {
  return (
    <div className='container border-b-[1px]  px-0  font-redHatText '>
      <style>{`
        .ql-container > .ql-editor {
          word-break: break-word;
          font-family: "Red Hat Text", sans-serif;
          font-size: 16px;
        }

        .ql-container > .ql-editor p,
        .ql-container > .ql-editor li,
        .ql-container > .ql-editor blockquote {
          line-height: 24px;
        }

        .ql-container > .ql-editor h1 {
          font-family: "TeX Gyre Adventor", serif;
          line-height: 45px;
          margin-bottom: 10px;
        }

        .ql-container > .ql-editor h2 {
          font-family: "TeX Gyre Adventor", serif;
          line-height: 35px;
          margin-bottom: 10px;
        }

        .ql-container > .ql-editor .ql-size-small {
          line-height: 18px;
        }

        .ql-container > .ql-editor .ql-size-large {
          line-height: 36px;
        }

        .ql-container > .ql-editor .ql-size-huge {
          line-height: 56px;
        }

        .ql-container > .ql-editor blockquote {
          border-left: 4px solid #ccc;
          margin-bottom: 5px;
          margin-top: 5px;
          padding-left: 16px;
        }

        .ql-container > .ql-editor img {
          max-width: 100%;
        }

        .ql-container > .ql-editor a {
          color: #007bff !important;
          cursor:pointer
        }

        .ql-container > .ql-editor a:hover {
          text-decoration: underline !important;
        }
      `}</style>
      <div className='ql-container'>
        <div
          className='ql-editor'
          dangerouslySetInnerHTML={{ __html: description }}
        />
      </div>
    </div>
  );
};

export default RichTextViewer;
