"use client";

import ReactQuill from "react-quill-new";
import Quill from "quill";
import "react-quill-new/dist/quill.snow.css";

const fontSizeArr = [
  "8px",
  "9px",
  "10px",
  "12px",
  "14px",
  "16px",
  "20px",
  "24px",
  "32px",
];

const Size = Quill.import("attributors/style/size");
Size.whitelist = fontSizeArr;
Quill.register(Size, true);

export default function TextEditorClient({ value, onChange }) {
  const modules = {
    toolbar: [
      [{ size: fontSizeArr }],
      [{ header: [1, 2, 3, false] }],
      ["bold", "italic", "underline"],
      [{ align: [] }],
      [{ list: "ordered" }, { list: "bullet" }],
      [{ indent: "-1" }, { indent: "+1" }],
      ["clean"],
    ],
  };

  return (
    <div className="text-editor">
      <ReactQuill
        theme="snow"
        value={value}
        onChange={onChange}
        modules={modules}
      />
    </div>
  );
}
