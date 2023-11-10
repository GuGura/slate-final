import React from "react";
import { cn } from "@/lib/utils";
import { cva, VariantProps } from "class-variance-authority";

type DefaultPageContainer = {
  children: React.ReactNode;
  className?: string;
};

const containerType = cva("flex flex-col m-auto h-screen w-full ", {
  variants: {
    size: {
      full: "max-w-full",
      max: "max-w-7xl",
    },
  },
  defaultVariants: {
    size: "full",
  },
});

export default function DefaultPageContainer({
  children,
  className,
  size,
}: DefaultPageContainer & VariantProps<typeof containerType>) {
  return (
    <main className={cn(containerType({ size }), className)}>{children}</main>
  );
}
