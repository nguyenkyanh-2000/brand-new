import React from "react";
import Link from "next/link";
import { cn } from "@/utils/tailwind-utils";

function Logo({ className }) {
  return (
    <Link
      className={cn("font-serif text-2xl sm:text-4xl font-bold", className)}
      href="/"
    >
      brand.
    </Link>
  );
}

export default Logo;
