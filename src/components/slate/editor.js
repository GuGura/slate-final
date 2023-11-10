"use client";
import { useCallback, useState } from "react";
import { Editable, Slate, withReact } from "slate-react";
import { createEditor, Descendant } from "slate";
import {
  CodeElement,
  DefaultElement,
  Leaf,
} from "@/components/slate/RenderElement";
import { KeySet } from "@/lib/slate-key";
import {initialValue} from "@/lib/utils";

export default function Editor() {
  const [editor] = useState(() => withReact(createEditor()));

  const renderLeaf = useCallback((props) => <Leaf {...props} />, []);

  const renderElement = useCallback((props) => {
    switch (props.element.type) {
      case "code":
        return <CodeElement {...props} />;
      default:
        return <DefaultElement {...props} />;
    }
  }, []);

  return (
    <div className={"w-full max-w-[1000px] bg-red-300"}>
      <Slate editor={editor} initialValue={initialValue}>
        <Editable
          className={"h-full"}
          renderLeaf={renderLeaf}
          renderElement={renderElement}
          onKeyDown={(event) => KeySet(editor, event)}
        />
      </Slate>
    </div>
  );
}
