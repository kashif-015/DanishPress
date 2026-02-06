"use client";

import { cn, getAvailabilityText } from "@/lib/utils";
import { AvailabilityStatus } from "@/types";

interface AvailabilityBadgeProps {
  status: AvailabilityStatus;
  size?: "sm" | "md";
}

const statusStyles = {
  available: {
    bg: "bg-green-50",
    border: "border-green-200",
    dot: "bg-green-500",
    text: "text-green-700",
  },
  limited: {
    bg: "bg-amber-50",
    border: "border-amber-200",
    dot: "bg-amber-500",
    text: "text-amber-700",
  },
  unavailable: {
    bg: "bg-red-50",
    border: "border-red-200",
    dot: "bg-red-500",
    text: "text-red-700",
  },
};

export function AvailabilityBadge({
  status,
  size = "sm",
}: AvailabilityBadgeProps) {
  const styles = statusStyles[status];

  return (
    <span
      className={cn(
        "inline-flex items-center gap-1.5 font-semibold rounded-full border",
        size === "sm" ? "px-2.5 py-1 text-xs" : "px-3.5 py-1.5 text-sm",
        styles.bg,
        styles.border
      )}
    >
      <span
        className={cn(
          "rounded-full",
          size === "sm" ? "w-2 h-2" : "w-2.5 h-2.5",
          styles.dot,
          status === "available" && "animate-pulse"
        )}
      />
      <span className={styles.text}>{getAvailabilityText(status)}</span>
    </span>
  );
}
