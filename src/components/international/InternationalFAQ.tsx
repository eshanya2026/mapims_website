"use client";

import { motion } from "framer-motion";
import { HelpCircle } from "lucide-react";
import {
  Accordion,
  AccordionContent,
  AccordionItem,
  AccordionTrigger,
} from "@/components/ui/accordion";
import { internationalFaqs } from "@/data/international-patients";

export default function InternationalFAQ() {
  return (
    <section id="faq" className="py-16 md:py-24 bg-slate-50">
      <div className="container mx-auto px-4">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.5 }}
          className="text-center max-w-2xl mx-auto mb-12"
        >
          <div className="flex items-center justify-center gap-2 mb-4">
            <div className="w-12 h-0.5 bg-red-600" />
            <span className="text-red-600 font-semibold uppercase tracking-wider text-sm">
              FAQ
            </span>
            <div className="w-12 h-0.5 bg-red-600" />
          </div>
          <h2 className="text-3xl md:text-4xl font-bold text-slate-900 mb-4">
            Frequently Asked <span className="text-red-600">Questions</span>
          </h2>
          <p className="text-slate-600 leading-relaxed">
            Common questions about international patient registration, travel,
            costs, and care at Adhiparasakthi Hospitals.
          </p>
        </motion.div>

        <motion.div
          initial={{ opacity: 0, y: 24 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.5, delay: 0.1 }}
          className="max-w-3xl mx-auto"
        >
          <Accordion className="rounded-2xl border border-slate-200 bg-white shadow-sm overflow-hidden">
            {internationalFaqs.map((faq, index) => (
              <AccordionItem
                key={faq.question}
                value={`international-faq-${index}`}
                className="border-slate-200 bg-white px-5 md:px-6"
              >
                <AccordionTrigger className="py-5 text-base font-semibold text-slate-900 hover:text-red-600 hover:no-underline gap-4">
                  <span className="flex items-start gap-3 text-left">
                    <HelpCircle className="w-5 h-5 text-red-600 shrink-0 mt-0.5" />
                    {faq.question}
                  </span>
                </AccordionTrigger>
                <AccordionContent className="text-slate-600 leading-relaxed pb-5 pl-8">
                  {faq.answer}
                </AccordionContent>
              </AccordionItem>
            ))}
          </Accordion>
        </motion.div>
      </div>
    </section>
  );
}
