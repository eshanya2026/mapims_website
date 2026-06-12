"use client";

import FaqAccordion from "@/components/shared/FaqAccordion";
import { getDepartmentFaqs } from "@/data/department-faqs";
import DepartmentSection from "@/components/departments/design/DepartmentSection";
import DepartmentSectionLabel from "@/components/departments/design/DepartmentSectionLabel";
import DepartmentSectionHeading from "@/components/departments/design/DepartmentSectionHeading";
import { ScrollReveal } from "@/components/ui/scroll-reveal";

type DepartmentFAQProps = {
  departmentSlug: string;
};

export default function DepartmentFAQ({ departmentSlug }: DepartmentFAQProps) {
  const faqs = getDepartmentFaqs(departmentSlug);
  if (!faqs) return null;

  const headingId = `${departmentSlug}-faq-heading`;

  return (
    <DepartmentSection id="faq" aria-labelledby={headingId}>
      <ScrollReveal>
        <header className="text-center">
          <DepartmentSectionLabel align="center">FAQ</DepartmentSectionLabel>
          <DepartmentSectionHeading
            title="Frequently Asked"
            highlight="Questions"
            align="center"
          />
        </header>
      </ScrollReveal>
      <ScrollReveal delay={0.1} className="mx-auto max-w-3xl">
        <FaqAccordion faqs={faqs} idPrefix={`${departmentSlug}-faq`} />
      </ScrollReveal>
    </DepartmentSection>
  );
}
