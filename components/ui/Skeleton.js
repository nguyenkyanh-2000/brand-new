import { cn } from "@/utils/tailwind-utils";
import React from "react";

function Skeleton({ className, ...props }) {
  return React.createElement("div", {
    className: cn("animate-pulse rounded-md bg-muted", className),
    ...props,
  });
}

export { Skeleton };
