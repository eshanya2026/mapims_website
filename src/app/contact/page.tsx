import type { Metadata } from "next";
import { MapPin, Phone, Mail, Clock, Ambulance } from "lucide-react";

import ContactHero from "@/components/contact/ContactHero";
import ContactForm from "@/components/contact/ContactForm";
import FooterMap from "@/components/layout/FooterMap";
import EmergencyCTA from "@/components/home/EmergencyCTA";
import { cn } from "@/lib/utils";

export const metadata: Metadata = {
  title: "Contact | Adhiparasakthi Hospital",
  description:
    "Contact Adhiparasakthi Hospital, Melmaruvathur — phone, email, OPD timings, and directions.",
};

const ADDRESS =
  "Adhiparasakthi Hospitals, Melmaruvathur, Kancheepuram District, Tamil Nadu, India 603319";

type ContactItem = {
  icon: typeof MapPin;
  label: string;
  value: string;
  href?: string;
  multiline?: boolean;
};

const contactItems: ContactItem[] = [
  {
    icon: MapPin,
    label: "Address",
    value: ADDRESS,
    multiline: true,
  },
  {
    icon: Phone,
    label: "Helpline",
    value: "1800 599 0999",
    href: "tel:18005990999",
    multiline: false,
  },
  {
    icon: Mail,
    label: "Email",
    value: "contact@mapims.edu.in",
    href: "mailto:contact@mapims.edu.in",
    multiline: false,
  },
  {
    icon: Clock,
    label: "OPD timings",
    value: "Mon–Sat: 8:00 AM – 8:00 PM · Sun: 9:00 AM – 1:00 PM",
    multiline: false,
  },
];

const emergencyButtonClass = cn(
  "mt-4 flex items-center gap-3 rounded-xl border border-red-200 bg-red-600 p-3.5 text-white shadow-sm transition-all duration-200",
  "hover:-translate-y-0.5 hover:bg-red-700 hover:shadow-md hover:shadow-red-700/20",
  "focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-red-500/70 focus-visible:ring-offset-2 focus-visible:ring-offset-white"
);

export default function ContactPage() {
  return (
    <main className="min-h-screen">
      <ContactHero />

      <section className="section-padding bg-slate-50">
        <div className="container mx-auto px-4 sm:px-6">
          <div className="mx-auto mb-8 max-w-2xl text-center md:mb-10">
            <p className="text-sm font-semibold uppercase tracking-wider text-red-600">
              We&apos;re here to help
            </p>
            <h2 className="mt-2 text-2xl font-bold text-slate-900 sm:text-3xl">
              Reach our team
            </h2>
            <p className="mt-2 text-sm text-slate-600 sm:text-base">
              Appointments, reports, international care, or general enquiries —
              choose the option that works best for you.
            </p>
          </div>

          <div className="grid grid-cols-1 items-stretch gap-6 lg:grid-cols-2 lg:gap-8">
            {/* Get in Touch */}
            <div className="flex h-full flex-col rounded-2xl border border-slate-200 bg-white p-5 shadow-sm sm:p-6 md:p-7">
              <div className="border-b border-slate-100 pb-5">
                <h2 className="text-xl font-bold text-slate-900 sm:text-2xl">
                  Get in Touch
                </h2>
                <p className="mt-1.5 text-sm text-slate-600 leading-relaxed">
                  Call, email, or visit us. For emergencies, use the helpline
                  below — available 24/7.
                </p>
              </div>

              <ul className="mt-5 flex flex-1 flex-col gap-3">
                {contactItems.map(({ icon: Icon, label, value, href, multiline }) => {
                  const inner = (
                    <>
                      <span className="flex h-10 w-10 shrink-0 items-center justify-center rounded-lg bg-red-600/10 text-red-600">
                        <Icon className="h-4 w-4" />
                      </span>
                      <span className="min-w-0 flex-1">
                        <span className="block text-xs font-semibold uppercase tracking-wide text-slate-500">
                          {label}
                        </span>
                        <span
                          className={`mt-0.5 block text-sm font-medium text-slate-900 ${multiline ? "leading-relaxed" : ""} ${href ? "group-hover:text-red-600 transition-colors" : ""}`}
                        >
                          {value}
                        </span>
                      </span>
                    </>
                  );

                  return (
                    <li key={label}>
                      {href ? (
                        <a
                          href={href}
                          className="group flex items-start gap-3 rounded-xl border border-slate-100 bg-slate-50/80 p-3.5 transition-colors hover:border-red-100 hover:bg-red-50/50"
                        >
                          {inner}
                        </a>
                      ) : (
                        <div className="flex items-start gap-3 rounded-xl border border-slate-100 bg-slate-50/80 p-3.5">
                          {inner}
                        </div>
                      )}
                    </li>
                  );
                })}
              </ul>

              <a
                href="tel:1066"
                className={emergencyButtonClass}
              >
                <span className="flex h-10 w-10 shrink-0 items-center justify-center rounded-lg bg-white/20">
                  <Ambulance className="h-5 w-5" />
                </span>
                <span>
                  <span className="block text-xs font-semibold uppercase tracking-wide text-white/80">
                    Emergency
                  </span>
                  <span className="mt-0.5 block text-lg font-bold">1066</span>
                  <span className="text-xs text-white/90">24/7 casualty</span>
                </span>
              </a>
            </div>

            {/* Send a Message */}
            <ContactForm className="h-full" />
          </div>

          {/* Map — full width below */}
          <div className="mt-8 rounded-2xl border border-slate-200 bg-white p-5 shadow-sm sm:p-6 md:mt-10">
            <h3 className="text-lg font-bold text-slate-900 sm:text-xl">Map</h3>
            <div className="mt-4 overflow-hidden rounded-xl">
              <FooterMap />
            </div>
          </div>
        </div>
      </section>

      <EmergencyCTA />
    </main>
  );
}
