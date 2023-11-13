"use client";
import React, { useCallback, useMemo } from "react";
import isHotkey from "is-hotkey";
import { Editable, withReact, useSlate, Slate } from "slate-react";
import {
  Editor,
  Transforms,
  createEditor,
  Descendant,
  Element as SlateElement,
} from "slate";
import { withHistory } from "slate-history";
import { Button } from "@/components/slate/Button";
import { Toolbar } from "@/components/slate/Toolbar";
import { Icon } from "@/components/slate/Icon";
import { CustomText, EmptyText } from "@/components/custom-types";
import {
  RenderElementProps,
  RenderLeafProps,
} from "slate-react/dist/components/editable";

import {
  LIST_TYPES,
  TEXT_ALIGN_TYPES,
} from "@/components/slate/custom-slate-plugins";

import { HOTKEYS } from "@/components/slate/hotkeys";
import { ToolbarHeaderButtons } from "@/components/slate/ToolbarHeaderButtons";

const RichTextExample = () => {
  const renderElement = useCallback(
    (props: RenderElementProps) => <Element {...props} />,
    [],
  );
  const renderLeaf = useCallback(
    (props: RenderLeafProps) => <Leaf {...props} />,
    [],
  );
  const editor = useMemo(() => withHistory(withReact(createEditor())), []);

  return (
    <div className={"w-full max-w-[1000px] rounded-2xl border-2"}>
      <Slate editor={editor} initialValue={initialValue}>
        <Toolbar className={"justify-between"}>
          <ToolbarHeaderButtons mode={"modify"} readOnly={false} />
        </Toolbar>
        <Editable
          className={"p-5"}
          renderElement={renderElement}
          renderLeaf={renderLeaf}
          placeholder="Enter some rich text…"
          // spellCheck
          // autoFocus
          onKeyDown={(event) => {
            for (const hotkey in HOTKEYS) {
              if (isHotkey(hotkey, event as any)) {
                event.preventDefault();
                const mark = HOTKEYS[hotkey];
                toggleMark(editor, mark);
              }
            }
          }}
        />
      </Slate>
    </div>
  );
};

const toggleBlock = (editor: any, format: any) => {
  const isActive = isBlockActive(
    editor,
    format,
    TEXT_ALIGN_TYPES.includes(format) ? "align" : "type",
  );
  const isList = LIST_TYPES.includes(format);

  Transforms.unwrapNodes(editor, {
    match: (n) =>
      !Editor.isEditor(n) &&
      SlateElement.isElement(n) &&
      LIST_TYPES.includes(n.type) &&
      !TEXT_ALIGN_TYPES.includes(format),
    split: true,
  });
  let newProperties: Partial<SlateElement>;
  if (TEXT_ALIGN_TYPES.includes(format)) {
    newProperties = {
      align: isActive ? undefined : format,
    };
  } else {
    newProperties = {
      type: isActive ? "paragraph" : isList ? "list-item" : format,
    };
  }
  Transforms.setNodes<SlateElement>(editor, newProperties);

  if (!isActive && isList) {
    const block = { type: format, children: [] };
    Transforms.wrapNodes(editor, block);
  }
};

const toggleMark = (editor: any, format: string) => {
  const isActive = isMarkActive(editor, format);
  if (isActive) {
    Editor.removeMark(editor, format);
  } else {
    Editor.addMark(editor, format, true);
  }
};

const isBlockActive = (editor: any, format: string, blockType = "type") => {
  const { selection } = editor;
  if (!selection) return false;
  const [match] = Array.from(
    Editor.nodes(editor, {
      at: Editor.unhangRange(editor, selection),
      match: (n) =>
        !Editor.isEditor(n) &&
        SlateElement.isElement(n) &&
        (n as any)[blockType] === format,
    }),
  );

  return !!match;
};

const isMarkActive = (editor: any, format: string) => {
  const marks: Omit<CustomText | EmptyText, "text"> | null =
    Editor.marks(editor);
  return marks ? (marks as any)[format] === true : false;
};

const Element = ({
  attributes,
  children,
  element,
}: {
  attributes: any;
  children?: any;
  element: any;
}) => {
  const style = { textAlign: element.align };
  switch (element.type) {
    case "block-quote":
      return (
        <blockquote style={style} {...attributes}>
          {children}
        </blockquote>
      );
    case "bulleted-list":
      return (
        <ul style={style} {...attributes}>
          {children}
        </ul>
      );
    case "heading1":
      return (
        <h1 style={style} {...attributes}>
          {children}
        </h1>
      );
    case "heading2":
      return (
        <h2 style={style} {...attributes}>
          {children}
        </h2>
      );
    case "heading3":
      return (
        <h3 style={style} {...attributes}>
          {children}
        </h3>
      );
    case "list-item":
      return (
        <li style={style} {...attributes}>
          {children}
        </li>
      );
    case "numbered-list":
      return (
        <ol style={style} {...attributes}>
          {children}
        </ol>
      );
    default:
      return (
        <p style={style} {...attributes}>
          {children}
        </p>
      );
  }
};

const Leaf = ({
  attributes,
  children,
  leaf,
}: {
  attributes: any;
  children?: any;
  leaf: any;
}) => {
  if (leaf.bold) {
    children = <strong>{children}</strong>;
  }

  if (leaf.code) {
    children = <code>{children}</code>;
  }

  if (leaf.italic) {
    children = <em>{children}</em>;
  }

  if (leaf.underline) {
    children = <u>{children}</u>;
  }

  return <span {...attributes}>{children}</span>;
};

export const BlockButton = ({
  format,
  icon,
  dropdown,
}: {
  format: string;
  icon: string;
  dropdown?: boolean;
}) => {
  const editor = useSlate();

  return (
    <div
      className={
        "hover:bg-grey-custom flex h-[36px] w-[36px] cursor-pointer items-center justify-center rounded hover:text-gray-500"
      }
    >
      <Button
        className={"flex"}
        active={isBlockActive(
          editor,
          format,
          TEXT_ALIGN_TYPES.includes(format) ? "align" : "type",
        )}
        onMouseDown={(event: any) => {
          event.preventDefault();
          toggleBlock(editor, format);
        }}
      >
        <Icon>{icon}</Icon>
      </Button>
      {dropdown && <Icon>chevron-down</Icon>}
    </div>
  );
};

export const MarkButton = ({
  format,
  icon,
}: {
  format: string;
  icon: string;
}) => {
  const editor = useSlate();
  const isActive = isMarkActive(editor, format);
  const color = isActive ? "bg-grey-custom" : "";
  return (
    <div
      className={`hover:bg-grey-custom flex h-[36px] w-[36px] cursor-pointer items-center justify-center rounded hover:text-gray-500 ${color}`}
    >
      <Button
        className={"flex"}
        active={isActive}
        onMouseDown={(event: any) => {
          event.preventDefault();
          toggleMark(editor, format);
        }}
      >
        <Icon>{icon}</Icon>
      </Button>
    </div>
  );
};

const initialValue: Descendant[] = [
  {
    type: "paragraph",
    children: [
      { text: "This is editable " },
      { text: "rich", bold: true },
      { text: " text, " },
      { text: "much", italic: true },
      { text: " better than a " },
      { text: "<textarea>", code: true },
      { text: "!" },
    ],
  },
  {
    type: "paragraph",
    children: [
      {
        text: "Since it's rich text, you can do things like turn a selection of text ",
      },
      { text: "bold", bold: true },
      {
        text: ", or add a semantically rendered block quote in the middle of the page, like this:",
      },
    ],
  },
  {
    type: "block-quote",
    children: [{ text: "A wise quote." }],
  },
  {
    type: "paragraph",
    align: "center",
    children: [{ text: "Try it out for yourself!" }],
  },
];

function DropDownButton({ children }: { children: any }) {
  return <div>{children}</div>;
}

export default RichTextExample;
