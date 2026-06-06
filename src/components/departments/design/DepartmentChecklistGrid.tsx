"use client";

import { motion } from "framer-motion";
import { CheckCircle2 } from "lucide-react";
import { cn } from "@/lib/utils";

type DepartmentChecklistGridProps = {
  items: string[];
  columns?: 1 | 2;
  variant?: "card" | "pill";
  className?: string;
};

export default function DepartmentChecklistGrid({
  items,
  columns = 2,
  variant = "card",
  className,
}: DepartmentChecklistGridProps) {
  return (
    <ul
      className={cn(
        "grid gap-3",
        columns === 2 ? "grid-cols-1 sm:grid-cols-2" : "grid-cols-1",
        className
      )}
    >
      {items.map((item, index) => (
        <motion.li
          key={item}
          initial={{ opacity: 0, y: 10 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ delay: index * 0.03 }}
          className={cn(
            "flex gap-3 text-sm text-slate-700 md:text-base",
            variant === "card" &&
              "rounded-xl border border-slate-200/80 bg-white px-4 py-3.5 shadow-sm",
            variant === "pill" &&
              "rounded-full border border-red-100 bg-red-50/60 px-4 py-2.5 font-medium text-slate-800"
          )}
        >
          <CheckCircle2 className="mt-0.5 h-5 w-5 shrink-0 text-red-600" />
          {item}
        </motion.li>
      ))}
    </ul>
  );
}
