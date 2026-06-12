import type { Metadata } from "next";

import ContactHero from "@/components/contact/ContactHero";
import ContactInfo from "@/components/contact/ContactInfo";
import ContactForm from "@/components/contact/ContactForm";
import ContactLocationMap from "@/components/contact/ContactLocationMap";

export const metadata: Metadata = {
  title: "Contact | Adhiparasakthi Hospital",
  description:
    "Contact Adhiparasakthi Hospital, Melmaruvathur — phone, email, OPD timings, and directions.",
};

export default function ContactPage() {
  return (
    <main className="min-h-screen">
      <ContactHero />

      <section className="section-padding bg-slate-50">
        <div className="page-container">
          <div className="grid grid-cols-1 items-stretch gap-8 lg:grid-cols-2 lg:gap-10 xl:gap-12">
            <ContactInfo />
            <ContactForm className="lg:sticky lg:top-24 lg:self-start" />
          </div>

          <ContactLocationMap />
        </div>
      </section>
    </main>
  );
}
