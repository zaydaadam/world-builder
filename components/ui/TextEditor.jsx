"use client";

import dynamic from "next/dynamic";

const Editor = dynamic(() => import("./TextEditorClient"), {
  ssr: false,
});

export default function TextEditor(props) {
  return <Editor {...props} />;
}
