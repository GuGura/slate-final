"use client+";
import React, { Ref, PropsWithChildren } from "react";
import { twMerge } from "tailwind-merge";

interface BaseProps {
  className?: string;

  [key: string]: unknown;
}

type OrNull<T> = T | null;
export const Button = React.forwardRef(
  (
    {
      className,
      active,
      reversed,
      ...props
    }: PropsWithChildren<
      {
        active: boolean;
        reversed?: boolean;
      } & BaseProps
    >,
    ref: Ref<OrNull<HTMLSpanElement>>,
  ) => {
    const color = "bg-[" + reversed ? "white" : "#aaa" + "]";
    const activeColor = "bg-[" + reversed ? "black" : "#ccc" + "]";
    return (
      <span
        {...props}
        ref={ref as Ref<HTMLDivElement>}
        className={twMerge(`cursor-pointer ${color} ${activeColor}`, className)}
      />
    );
  },
);

Button.displayName = "Button";
