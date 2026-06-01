"use client";

import { motion } from "framer-motion";
import FaqAccordion from "@/components/shared/FaqAccordion";
import { departmentsFaqs } from "@/data/site-faqs";

export default function DepartmentsFAQ() {
  return (
    <section
      id="faq"
      className="section-padding bg-white"
      aria-labelledby="departments-faq-heading"
    >
      <div className="container mx-auto px-4 max-w-3xl">
        <motion.header
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.5 }}
          className="mb-10 text-center"
        >
          <div className="mb-4 flex items-center justify-center gap-2">
            <div className="h-0.5 w-12 bg-red-600" />
            <span className="text-sm font-semibold uppercase tracking-wider text-red-600">
              FAQ
            </span>
            <div className="h-0.5 w-12 bg-red-600" />
          </div>
          <h2
            id="departments-faq-heading"
            className="text-3xl font-bold text-slate-900 md:text-4xl"
          >
            Frequently Asked <span className="text-red-600">Questions</span>
          </h2>
          <p className="mt-3 text-slate-600">
            Common questions about our departments and how to access specialist care.
          </p>
        </motion.header>
        <FaqAccordion faqs={departmentsFaqs} idPrefix="departments-faq" />
      </div>
    </section>
  );
}
