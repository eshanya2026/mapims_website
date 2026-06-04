"use client";

import FaqAccordion from "@/components/shared/FaqAccordion";
import { getDepartmentFaqs } from "@/data/department-faqs";

function SectionLabel({ children }: { children: React.ReactNode }) {
  return (
    <div className="mb-4 flex items-center justify-center gap-2">
      <div className="h-0.5 w-12 bg-red-600" />
      <span className="text-sm font-semibold uppercase tracking-wider text-red-600">
        {children}
      </span>
      <div className="h-0.5 w-12 bg-red-600" />
    </div>
  );
}

type DepartmentFAQProps = {
  departmentSlug: string;
};

export default function DepartmentFAQ({ departmentSlug }: DepartmentFAQProps) {
  const faqs = getDepartmentFaqs(departmentSlug);
  if (!faqs) return null;

  const headingId = `${departmentSlug}-faq-heading`;

  return (
    <section
      id="faq"
      className="scroll-mt-28 border-b border-slate-100 py-12 md:py-16"
      aria-labelledby={headingId}
    >
      <header className="mb-8 text-center">
        <SectionLabel>FAQ</SectionLabel>
        <h2
          id={headingId}
          className="text-3xl font-bold text-slate-900 md:text-4xl"
        >
          Frequently Asked <span className="text-red-600">Questions</span>
        </h2>
      </header>
      <div className="mx-auto max-w-3xl">
        <FaqAccordion faqs={faqs} idPrefix={`${departmentSlug}-faq`} />
      </div>
    </section>
  );
}
