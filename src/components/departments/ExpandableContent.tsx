"use client";

import { useState } from "react";
import { ChevronDown } from "lucide-react";
import { cn } from "@/lib/utils";

type ExpandableContentProps = {
  preview: React.ReactNode;
  children: React.ReactNode;
  expandLabel?: string;
  collapseLabel?: string;
  className?: string;
  contentClassName?: string;
  variant?: "default" | "light";
};

export default function ExpandableContent({
  preview,
  children,
  expandLabel = "More Details",
  collapseLabel = "Read Less",
  className,
  contentClassName,
  variant = "default",
}: ExpandableContentProps) {
  const [expanded, setExpanded] = useState(false);

  return (
    <div className={className}>
      <div className={cn("text-slate-600 leading-relaxed", contentClassName)}>
        {preview}
        {expanded && <div className="mt-4">{children}</div>}
      </div>
      <button
        type="button"
        onClick={() => setExpanded((prev) => !prev)}
        className={cn(
          "mt-3 inline-flex items-center gap-1.5 text-sm font-semibold transition-colors",
          variant === "light"
            ? "text-white hover:text-white/80"
            : "text-red-600 hover:text-red-700"
        )}
        aria-expanded={expanded}
      >
        {expanded ? collapseLabel : expandLabel}
        <ChevronDown
          className={cn(
            "size-4 transition-transform",
            expanded && "rotate-180"
          )}
        />
      </button>
    </div>
  );
}
