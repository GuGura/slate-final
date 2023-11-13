"use client";
import React, { PropsWithChildren, Ref } from "react";

import { twMerge } from "tailwind-merge";
export interface BaseProps {
  className?: string;
  [key: string]: unknown;
}
export type OrNull<T> = T | null;

export const Toolbar = React.forwardRef(
  (
    { className, ...props }: PropsWithChildren<BaseProps>,
    ref: Ref<OrNull<HTMLDivElement>>,
  ) => (
    <Menu
      {...props}
      ref={ref as Ref<HTMLDivElement>}
      className={twMerge(
        "relative mx-0 mb-5 flex border-b-2 border-gray-200 p-2",
        className,
      )}
    />
  ),
);

export const Menu = React.forwardRef(
  (
    { className, ...props }: PropsWithChildren<BaseProps>,
    ref: Ref<OrNull<HTMLDivElement>>,
  ) => (
    <div
      {...props}
      ref={ref as Ref<HTMLDivElement>}
      className={twMerge("inline-block, ml-[15px]", className)}
    />
  ),
);

Toolbar.displayName = "Toolbar";
Menu.displayName = "Menu";
