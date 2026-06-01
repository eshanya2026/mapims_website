"use client";

import { motion } from "framer-motion";
import FaqAccordion, { type FaqItem } from "@/components/shared/FaqAccordion";
import { cn } from "@/lib/utils";

type ServiceFAQProps = {
  faqs: FaqItem[];
  idPrefix?: string;
  description?: string;
  className?: string;
};

export default function ServiceFAQ({
  faqs,
  idPrefix = "service-faq",
  description = "Common questions about this service at Adhiparasakthi Hospital.",
  className,
}: ServiceFAQProps) {
  return (
    <motion.section
      initial={{ opacity: 0, y: 20 }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true }}
      transition={{ duration: 0.5 }}
      id="faq"
      className={cn(
        "mt-12 scroll-mt-28 border-t border-slate-200 pt-10",
        className
      )}
      aria-labelledby={`${idPrefix}-heading`}
    >
      <div className="mb-8">
        <div className="mb-3 flex items-center gap-2">
          <div className="h-0.5 w-10 bg-red-600" />
          <span className="text-sm font-semibold uppercase tracking-wider text-red-600">
            FAQ
          </span>
        </div>
        <h2
          id={`${idPrefix}-heading`}
          className="text-2xl font-bold text-slate-900 md:text-3xl"
        >
          Frequently Asked <span className="text-red-600">Questions</span>
        </h2>
        <p className="mt-3 max-w-2xl text-slate-600 leading-relaxed">{description}</p>
      </div>
      <FaqAccordion faqs={faqs} idPrefix={idPrefix} />
    </motion.section>
  );
}
