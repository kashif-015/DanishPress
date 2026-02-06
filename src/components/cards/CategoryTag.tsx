"use client";

import { cn } from "@/lib/utils";
import { CardCategory } from "@/types";

interface CategoryTagProps {
  category: CardCategory;
  size?: "sm" | "md";
}

const categoryStyles: Record<CardCategory, string> = {
  hindu: "bg-gradient-to-r from-orange-500 to-red-500",
  muslim: "bg-gradient-to-r from-emerald-500 to-teal-500",
};

const categoryLabels: Record<CardCategory, string> = {
  hindu: "Hindu",
  muslim: "Muslim",
};

export function CategoryTag({ category, size = "sm" }: CategoryTagProps) {
  return (
    <span
      className={cn(
        "inline-flex items-center font-semibold rounded-lg text-white shadow-sm",
        size === "sm" ? "px-2.5 py-1 text-xs" : "px-3 py-1.5 text-sm",
        categoryStyles[category]
      )}
    >
      {categoryLabels[category]}
    </span>
  );
}
