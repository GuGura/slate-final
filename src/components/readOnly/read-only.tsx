"use client";
import React from "react";
import { useMemo } from "react";
import { Editable, Slate, withReact } from "slate-react";
import { createEditor, Descendant } from "slate";
export default function ReadOnly() {
  const editor = useMemo(() => withReact(createEditor()), []);
  return (
    // eslint-disable-next-line react/jsx-no-undef
    <Slate editor={editor} initialValue={initialValue}>
      {/* eslint-disable-next-line react/jsx-no-undef */}
      <Editable readOnly={true} placeholder="Enter some plain text..." />
    </Slate>
  );
}

const initialValue: Descendant[] = [
  {
    type: "paragraph",
    children: [
      {
        text: "This example shows what happens when the Editor is set to readOnly, it is not editablefsdfmdslmklfdmskdfsm",
      },
    ],
  },
];
