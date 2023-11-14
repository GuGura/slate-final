import React from "react";
import {
  BLOCK_HEADING_ONE,
  BLOCK_HEADING_THREE,
  BLOCK_HEADING_TWO,
  BLOCK_QUOTE,
  LIST_BULLETED,
  LIST_ITEM,
  LIST_NUMBERED,
} from "@/components/slate/custom-slate-plugins";

type ElementProps = {
  attributes: any;
  children?: any;
  element: any;
};

export const Element = ({ attributes, children, element }: ElementProps) => {
  const style = { textAlign: element.align };
  switch (element.type) {
    case BLOCK_QUOTE:
      return (
        <blockquote
          className={"me-10 ms-10 block rounded bg-gray-100 p-4"}
          style={style}
          {...attributes}
        >
          {children}
        </blockquote>
      );
    case BLOCK_HEADING_ONE:
      return (
        <h1 style={style} className={"text-3xl"} {...attributes}>
          {children}
        </h1>
      );
    case BLOCK_HEADING_TWO:
      return (
        <h2 style={style} className={"text-2xl"} {...attributes}>
          {children}
        </h2>
      );
    case LIST_ITEM:
      return (
        <li style={style} {...attributes}>
          {children}
        </li>
      );
    case BLOCK_HEADING_THREE:
      return (
        <h3 style={style} className={"text-xl"} {...attributes}>
          {children}
        </h3>
      );
    case LIST_BULLETED:
      return (
        <ul style={style} className={"list-inside list-disc"} {...attributes}>
          {children}
        </ul>
      );
    case LIST_NUMBERED:
      return (
        <ol
          style={style}
          className={"list-inside list-decimal"}
          {...attributes}
        >
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

export const Leaf = ({
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
