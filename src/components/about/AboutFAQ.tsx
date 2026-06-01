"use client";

import { motion } from "framer-motion";
import FaqAccordion, { type FaqItem } from "@/components/shared/FaqAccordion";

const faqs: FaqItem[] = [
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
    <section
      id="faq"
      className="section-padding bg-white"
      aria-labelledby="about-faq-heading"
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
            id="about-faq-heading"
            className="mb-4 text-3xl font-bold text-slate-900 md:text-4xl"
          >
            Frequently Asked <span className="text-red-600">Questions</span>
          </h2>
          <p className="leading-relaxed text-slate-600">
            Quick answers about our hospital, accreditation, and how to get care
            at Adhiparasakthi Hospital.
          </p>
        </motion.header>

        <motion.div
          initial={{ opacity: 0, y: 24 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.5, delay: 0.1 }}
          className="mx-auto max-w-3xl"
        >
          <FaqAccordion faqs={faqs} idPrefix="about-faq" />
        </motion.div>
      </div>
    </section>
  );
}
