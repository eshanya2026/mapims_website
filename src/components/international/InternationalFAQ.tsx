"use client";

import { motion } from "framer-motion";
import FaqAccordion from "@/components/shared/FaqAccordion";
import { internationalFaqs } from "@/data/international-patients";

export default function InternationalFAQ() {
  return (
    <section
      id="faq"
      className="section-padding bg-slate-50"
      aria-labelledby="international-faq-heading"
    >
      <div className="container mx-auto px-4">
        <motion.header
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.5 }}
          className="mx-auto mb-12 max-w-2xl text-center"
        >
          <div className="mb-4 flex items-center justify-center gap-2">
            <div className="h-0.5 w-12 bg-red-600" />
            <span className="text-sm font-semibold uppercase tracking-wider text-red-600">
              FAQ
            </span>
            <div className="h-0.5 w-12 bg-red-600" />
          </div>
          <h2
            id="international-faq-heading"
            className="mb-4 text-3xl font-bold text-slate-900 md:text-4xl"
          >
            Frequently Asked <span className="text-red-600">Questions</span>
          </h2>
          <p className="leading-relaxed text-slate-600">
            Common questions about international patient registration, travel,
            costs, and care at Adhiparasakthi Hospitals.
          </p>
        </motion.header>

        <motion.div
          initial={{ opacity: 0, y: 24 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.5, delay: 0.1 }}
          className="mx-auto max-w-3xl"
        >
          <FaqAccordion faqs={internationalFaqs} idPrefix="international-faq" />
        </motion.div>
      </div>
    </section>
  );
}
