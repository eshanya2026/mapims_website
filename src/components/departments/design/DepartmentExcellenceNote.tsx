"use client";

import { motion } from "framer-motion";

type DepartmentExcellenceNoteProps = {
  title: React.ReactNode;
  paragraphs: string[];
};

export default function DepartmentExcellenceNote({
  title,
  paragraphs,
}: DepartmentExcellenceNoteProps) {
  return (
    <motion.div
      initial={{ opacity: 0, y: 14 }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true }}
      className="rounded-2xl border border-slate-200/80 bg-slate-50 p-6 md:p-8"
    >
      <h3 className="mb-4 text-xl font-bold text-slate-900">{title}</h3>
      <div className="space-y-4 text-sm leading-relaxed text-slate-600 md:text-base">
        {paragraphs.map((paragraph) => (
          <p key={paragraph}>{paragraph}</p>
        ))}
      </div>
    </motion.div>
  );
}
