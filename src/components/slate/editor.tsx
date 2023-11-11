"use client";
import { useCallback, useMemo } from "react";
import { Editable, Slate, withReact } from "slate-react";
import { createEditor, Descendant } from "slate";
import {
  CodeElement,
  DefaultElement,
  Leaf,
} from "@/components/slate/RenderElement";
import { KeySet } from "@/lib/slate-key";
import { withHistory } from "slate-history";

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

export default function Editor() {
  const editor = useMemo(() => withHistory(withReact(createEditor())), []);
  const renderLeaf = useCallback((props: any) => <Leaf {...props} />, []);

  const renderElement = useCallback((props: any) => {
    switch (props.element.type) {
      case "code":
        return <CodeElement {...props} />;
      default:
        return <DefaultElement {...props} />;
    }
  }, []);

  return (
    <div className={"w-full max-w-[1000px]"}>
      <Slate editor={editor} initialValue={initialValue}>
        <Editable
          className={"h-full"}
          renderLeaf={renderLeaf}
          placeholder={"Start typing..."}
          renderElement={renderElement}
          onKeyDown={(event) => KeySet(editor, event)}
        />
      </Slate>
    </div>
  );
}
