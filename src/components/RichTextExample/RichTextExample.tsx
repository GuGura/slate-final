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
import { Icon, Paragraph } from "@/components/slate/Icon";
import { CustomText, EmptyText } from "@/components/custom-types";

const HOTKEYS: {
  [key: string]: string;
  "mod+b": string;
  "mod+i": string;
  "mod+u": string;
  "mod+`": string;
} = {
  "mod+b": "bold",
  "mod+i": "italic",
  "mod+u": "underline",
  "mod+`": "code",
};

const LIST_TYPES = ["numbered-list", "bulleted-list"];
const TEXT_ALIGN_TYPES = ["left", "center", "right", "justify"];

const RichTextExample = () => {
  const renderElement = useCallback((props: any) => <Element {...props} />, []);
  const renderLeaf = useCallback((props: any) => <Leaf {...props} />, []);
  const editor = useMemo(() => withHistory(withReact(createEditor())), []);

  return (
    <div className={"w-full max-w-[1000px] rounded-2xl border-2"}>
      <Slate editor={editor} initialValue={initialValue}>
        <Toolbar>
          <MarkButton format="bold" icon="bold" />
          <MarkButton format="paragraph" icon="paragraph" />
          <MarkButton format="italic" icon="italic" />
          <MarkButton format="underline" icon="underlined" />
          <MarkButton format="code" icon="code" />
          <BlockButton format="heading1" icon="heading1" />
          <BlockButton format="heading2" icon="heading2" />
          <BlockButton format="heading3" icon="heading3" />
          <BlockButton format="block-quote" icon="quote" />
          <BlockButton format="list_numbered" icon="list_numbered" />
          <BlockButton format="list_bulleted" icon="list_bulleted" />
          <BlockButton format="line-height" icon="line-height" />
          <BlockButton format="left" icon="align_left" />
          <BlockButton format="center" icon="align_center" />
          <BlockButton format="right" icon="align_right" />
          <BlockButton format="emoji" icon="smail" />
        </Toolbar>
        <Editable
          className={"p-2"}
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

const toggleMark = (editor: any, format: any) => {
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
    case "heading-one":
      return (
        <h1 style={style} {...attributes}>
          {children}
        </h1>
      );
    case "heading-two":
      return (
        <h2 style={style} {...attributes}>
          {children}
        </h2>
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

const BlockButton = ({ format, icon }: { format: string; icon: string }) => {
  const editor = useSlate();
  console.log("icon", icon);
  return (
    <div className={"flex h-[36px] w-[36px] items-center justify-center"}>
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
    </div>
  );
};

const MarkButton = ({ format, icon }: { format: string; icon: string }) => {
  const editor = useSlate();
  return (
    <div className={"flex h-[36px] w-[36px] items-center justify-center"}>
      <Button
        className={"flex"}
        active={isMarkActive(editor, format)}
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

export default RichTextExample;
