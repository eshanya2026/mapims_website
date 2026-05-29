"use client";

import { motion } from "framer-motion";
import { HelpCircle } from "lucide-react";
import {
  Accordion,
  AccordionContent,
  AccordionItem,
  AccordionTrigger,
} from "@/components/ui/accordion";

const faqs = [
  {
    question: "Can I consult online?",
    answer:
      "Yes. You can request an online consultation through our website by booking an appointment or contacting us at +91 94990 59966 or contact@mapims.edu.in. Our team will guide you on available teleconsultation options, required reports, and follow-up care at the hospital when needed.",
  },
  {
    question: "Is the hospital NABH accredited?",
    answer:
      "Yes. Adhiparasakthi Hospital is NABH accredited and recognized by the Government of Tamil Nadu for maintaining high standards in patient safety, clinical excellence, and quality healthcare delivery.",
  },
  {
    question: "How many beds and specialties does the hospital offer?",
    answer:
      "We are a 1000+ bed super-specialty tertiary care hospital with departments including cardiology, neurology, oncology, orthopaedics, nephrology, transplant services, and many more — supported by experienced specialists and modern medical technology.",
  },
  {
    question: "Do you treat international patients?",
    answer:
      "Yes. We welcome patients from India and abroad, including the Middle East, South East Asia, and the African continent. Dedicated international patient services help with appointments, travel guidance, and coordinated care.",
  },
  {
    question: "How can I book an appointment or reach emergency care?",
    answer:
      "You can book an appointment online through our website, call +91 94990 59966, or email contact@mapims.edu.in. For emergencies, our 24/7 emergency and trauma teams are available around the clock.",
  },
];

export default function AboutFAQ() {
  return (
    <section className="section-padding bg-white">
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
            Quick answers about our hospital, accreditation, and how to get care
            at Adhiparasakthi Hospital.
          </p>
        </motion.div>

        <motion.div
          initial={{ opacity: 0, y: 24 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.5, delay: 0.1 }}
          className="max-w-3xl mx-auto"
        >
          <Accordion className="rounded-2xl border border-slate-200 bg-slate-50/50 shadow-sm overflow-hidden">
            {faqs.map((faq, index) => (
              <AccordionItem
                key={faq.question}
                value={`faq-${index}`}
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
