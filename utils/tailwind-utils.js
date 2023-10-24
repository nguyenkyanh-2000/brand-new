import { clsx } from "clsx";
import { twMerge } from "tailwind-merge";

// Merge Tailwind CSS classes using twMerge
export function cn(...classes) {
  return twMerge(clsx(classes));
}
