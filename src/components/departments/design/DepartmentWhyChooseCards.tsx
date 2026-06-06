"use client";

import { motion } from "framer-motion";
import { CheckCircle2 } from "lucide-react";

export type WhyChooseItem = {
  title: string;
  description: string;
};

type DepartmentWhyChooseCardsProps = {
  items: WhyChooseItem[];
  columns?: 2 | 4;
};

export default function DepartmentWhyChooseCards({
  items,
  columns = 2,
}: DepartmentWhyChooseCardsProps) {
  return (
    <div
      className={
        columns === 4
          ? "grid grid-cols-1 gap-4 sm:grid-cols-2 xl:grid-cols-4"
          : "grid grid-cols-1 gap-4 sm:grid-cols-2"
      }
    >
      {items.map((item, index) => (
        <motion.article
          key={item.title}
          initial={{ opacity: 0, y: 18 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.4, delay: index * 0.06 }}
          whileHover={{ y: -4 }}
          className="group relative overflow-hidden rounded-2xl border border-slate-200/80 bg-white p-6 shadow-sm transition-shadow hover:shadow-md"
        >
          <div className="absolute inset-x-0 top-0 h-1 bg-gradient-to-r from-red-600 via-red-500 to-red-400" />
          <span
            className="mb-4 block text-3xl font-black leading-none text-red-600/10"
            aria-hidden
          >
            {String(index + 1).padStart(2, "0")}
          </span>
          <CheckCircle2 className="mb-3 h-7 w-7 text-red-600" />
          <h3 className="mb-2 font-bold text-slate-900 group-hover:text-red-700">
            {item.title}
          </h3>
          <p className="text-sm leading-relaxed text-slate-600">
            {item.description}
          </p>
        </motion.article>
      ))}
    </div>
  );
}
