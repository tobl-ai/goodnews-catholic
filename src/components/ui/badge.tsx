import type { ReactNode } from "react";

type BadgeVariant =
  | "default"
  | "notice"
  | "purple"
  | "white"
  | "red"
  | "green";

interface BadgeProps {
  variant?: BadgeVariant;
  className?: string;
  children: ReactNode;
}

const VARIANT_STYLES: Record<BadgeVariant, string> = {
  default: "bg-gray-100 text-gray-700",
  notice: "bg-red-100 text-red-700",
  purple:
    "bg-[var(--color-liturgical-purple)] text-white",
  white:
    "bg-white text-gray-800 border border-gray-300",
  red: "bg-[var(--color-liturgical-red)] text-white",
  green:
    "bg-[var(--color-liturgical-green)] text-white",
};

export function Badge({
  variant = "default",
  className = "",
  children,
}: BadgeProps) {
  return (
    <span
      className={`inline-flex items-center rounded-full px-2.5 py-0.5 text-xs font-medium ${VARIANT_STYLES[variant]} ${className}`}
    >
      {children}
    </span>
  );
}
