"use client";

import { useThemeStore } from "@/lib/theme-store";
import { cn } from "@/lib/utils";

interface ThemeBodyProps {
  children: React.ReactNode;
  className?: string;
}

export function ThemeBody({ children, className }: ThemeBodyProps) {
  const isCinemaMode = useThemeStore((s) => s.isHoveringBubble);

  return (
    <body
      className={cn(
        "min-h-full flex flex-col transition-colors duration-500",
        isCinemaMode ? "bg-black" : "bg-white",
        className
      )}
      suppressHydrationWarning
    >
      {children}
    </body>
  );
}
