"use client";

import { Clock, Mail, MapPin, Phone } from "lucide-react";
import InternationalDeskInquiryForm from "@/components/international/InternationalDeskInquiryForm";
import { internationalDesk } from "@/data/international-patients";
import { ScrollReveal, StaggerItem, StaggerReveal } from "@/components/ui/scroll-reveal";

const contactItems = [
  {
    icon: Phone,
    label: "International Patient Helpline",
    lines: [
      { text: internationalDesk.tollFreeDisplay, href: internationalDesk.tollFreeTel },
      { text: internationalDesk.phoneDisplay, href: internationalDesk.phoneTel },
    ],
  },
  {
    icon: Mail,
    label: "Email address",
    lines: [{ text: internationalDesk.email, href: internationalDesk.mailto }],
  },
  {
    icon: MapPin,
    label: "Hospital location",
    lines: [{ text: internationalDesk.address, href: internationalDesk.mapsUrl, external: true }],
  },
  {
    icon: Clock,
    label: "Available 24/7",
    lines: [{ text: "International desk & emergency support", href: undefined }],
  },
] as const;

export default function InternationalDeskSection() {
  return (
    <section
      id="contact-international-desk"
      className="scroll-mt-28 border-t border-slate-200 bg-slate-50 py-14 md:py-16"
      aria-labelledby="international-desk-heading"
    >
      <div className="container mx-auto px-4">
        <ScrollReveal className="mx-auto mb-10 max-w-2xl text-center md:mb-12">
          <p className="text-sm font-semibold uppercase tracking-wider text-red-600">
            Get in touch
          </p>
          <h2
            id="international-desk-heading"
            className="mt-3 text-2xl font-bold text-slate-900 md:text-3xl"
          >
            Contact International Desk
          </h2>
        </ScrollReveal>

        <div className="grid grid-cols-1 items-start gap-10 lg:grid-cols-2 lg:gap-12">
          <StaggerReveal className="space-y-4">
            {contactItems.map(({ icon: Icon, label, lines }) => (
              <StaggerItem key={label}>
                <div className="flex gap-4 rounded-2xl border border-slate-200 bg-white p-5 shadow-sm transition-all duration-300 hover:-translate-y-0.5 hover:border-red-100 hover:shadow-md">
                  <span className="flex h-12 w-12 shrink-0 items-center justify-center rounded-xl bg-red-50 text-red-600">
                    <Icon className="h-5 w-5" aria-hidden />
                  </span>
                  <div className="min-w-0">
                    <p className="text-sm font-semibold text-slate-900">{label}</p>
                    <div className="mt-1.5 space-y-1">
                      {lines.map((line) =>
                        line.href ? (
                          <a
                            key={line.text}
                            href={line.href}
                            target={"external" in line && line.external ? "_blank" : undefined}
                            rel={
                              "external" in line && line.external
                                ? "noopener noreferrer"
                                : undefined
                            }
                            className="block text-sm leading-relaxed text-slate-600 transition hover:text-red-600"
                          >
                            {line.text}
                          </a>
                        ) : (
                          <p
                            key={line.text}
                            className="text-sm leading-relaxed text-slate-600"
                          >
                            {line.text}
                          </p>
                        )
                      )}
                    </div>
                  </div>
                </div>
              </StaggerItem>
            ))}
          </StaggerReveal>

          <ScrollReveal direction="left" delay={0.15}>
            <InternationalDeskInquiryForm />
          </ScrollReveal>
        </div>
      </div>
    </section>
  );
}
