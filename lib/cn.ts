import { clsx, type ClassValue } from "clsx";
import { twMerge } from "tailwind-merge";

/** Combine conditional class names and merge conflicting Tailwind utilities. */
export function cn(...inputs: ClassValue[]) {
  return twMerge(clsx(inputs));
}
