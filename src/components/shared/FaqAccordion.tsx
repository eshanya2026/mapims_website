"use client";

import { Minus, Plus } from "lucide-react";
import {
  Accordion,
  AccordionContent,
  AccordionItem,
  AccordionTrigger,
} from "@/components/ui/accordion";
import { cn } from "@/lib/utils";

export type FaqItem = {
  question: string;
  answer: string;
};

type FaqAccordionProps = {
  faqs: FaqItem[];
  idPrefix?: string;
  className?: string;
};

function FaqJsonLd({ faqs }: { faqs: FaqItem[] }) {
  const schema = {
    "@context": "https://schema.org",
    "@type": "FAQPage",
    mainEntity: faqs.map((faq) => ({
      "@type": "Question",
      name: faq.question,
      acceptedAnswer: {
        "@type": "Answer",
        text: faq.answer,
      },
    })),
  };

  return (
    <script
      type="application/ld+json"
      dangerouslySetInnerHTML={{ __html: JSON.stringify(schema) }}
    />
  );
}

export default function FaqAccordion({
  faqs,
  idPrefix = "faq",
  className,
}: FaqAccordionProps) {
  return (
    <>
      <FaqJsonLd faqs={faqs} />
      <Accordion
        className={cn(
          "flex flex-col gap-3",
          className
        )}
      >
        {faqs.map((faq, index) => (
          <AccordionItem
            key={faq.question}
            value={`${idPrefix}-${index}`}
            className={cn(
              "overflow-hidden rounded-xl border border-slate-200 bg-white shadow-sm transition-all duration-300",
              "border-l-4 border-l-transparent",
              "hover:border-slate-300 hover:bg-slate-50/80",
              "has-[[aria-expanded=true]]:border-l-red-600 has-[[aria-expanded=true]]:bg-red-50/40 has-[[aria-expanded=true]]:shadow-md"
            )}
          >
            <AccordionTrigger
              className={cn(
                "w-full px-4 py-4 text-left text-base font-semibold text-slate-900 sm:px-5 sm:py-5",
                "hover:bg-slate-50/90 hover:text-red-600 hover:no-underline",
                "group-aria-expanded/accordion-trigger:bg-red-50/50 group-aria-expanded/accordion-trigger:text-red-700",
                "[&_[data-slot=accordion-trigger-icon]]:hidden"
              )}
            >
              <span className="pr-4 leading-snug">{faq.question}</span>
              <span
                aria-hidden
                className={cn(
                  "ml-auto flex h-8 w-8 shrink-0 items-center justify-center rounded-full border transition-all duration-300",
                  "border-slate-200 bg-slate-100 text-slate-600",
                  "group-hover/accordion-trigger:border-red-200 group-hover/accordion-trigger:bg-red-50 group-hover/accordion-trigger:text-red-600",
                  "group-aria-expanded/accordion-trigger:border-red-600 group-aria-expanded/accordion-trigger:bg-red-600 group-aria-expanded/accordion-trigger:text-white"
                )}
              >
                <Plus className="h-4 w-4 group-aria-expanded/accordion-trigger:hidden" />
                <Minus className="hidden h-4 w-4 group-aria-expanded/accordion-trigger:block" />
              </span>
            </AccordionTrigger>
            <AccordionContent className="px-4 pb-5 text-slate-600 leading-relaxed sm:px-5 sm:pb-6 [&>div]:pb-0">
              {faq.answer}
            </AccordionContent>
          </AccordionItem>
        ))}
      </Accordion>
    </>
  );
}
