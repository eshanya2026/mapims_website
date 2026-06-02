import {
  MapPin,
  Phone,
  Mail,
  Clock,
  Ambulance,
  ArrowUpRight,
  MessageSquare,
} from "lucide-react";
import { cn } from "@/lib/utils";

const ADDRESS =
  "Adhiparasakthi Hospitals, Melmaruvathur, Kancheepuram District, Tamil Nadu, India 603319";

const primaryContacts = [
  {
    icon: Phone,
    label: "Helpline",
    value: "1800 599 0999",
    href: "tel:18005990999",
    hint: "Mon–Sat 8 AM – 8 PM",
  },
  {
    icon: Mail,
    label: "Email",
    value: "contact@mapims.edu.in",
    href: "mailto:contact@mapims.edu.in",
    hint: "We reply within 1–2 business days",
  },
  {
    icon: MessageSquare,
    label: "Patient Feedback",
    value: "Feedback Portal",
    href: "https://feedback.mapims.edu.in/feedback",
    hint: "Share your experience",
    external: true,
  },
] as const;

const details = [
  {
    icon: MapPin,
    label: "Visit us",
    value: ADDRESS,
  },
  {
    icon: Clock,
    label: "OPD timings",
    value: "Mon–Sat: 8:00 AM – 8:00 PM · Sun: 9:00 AM – 1:00 PM",
  },
] as const;

export default function ContactInfo() {
  return (
    <div className="flex h-full flex-col">
      <div>
        <p className="text-sm font-semibold uppercase tracking-wider text-red-600">
          Get in touch
        </p>
        <h2 className="mt-2 text-2xl font-bold text-slate-900 sm:text-3xl">
          Talk to our team
        </h2>
        <p className="mt-3 max-w-md text-sm leading-relaxed text-slate-600 sm:text-base">
          Call, email, or visit us. For emergencies, dial{" "}
          <span className="font-semibold text-red-600">1066</span> — available
          24/7.
        </p>
      </div>

      <div className="mt-8 grid grid-cols-1 gap-4 sm:grid-cols-2">
        {primaryContacts.map(
          ({ icon: Icon, label, value, href, hint, external }) => (
          <a
            key={label}
            href={href}
            target={external ? "_blank" : undefined}
            rel={external ? "noopener noreferrer" : undefined}
            className={cn(
              "group relative overflow-hidden rounded-2xl bg-white p-5 shadow-sm ring-1 ring-slate-200/80 transition-all duration-200",
              "hover:-translate-y-0.5 hover:shadow-md hover:ring-red-200"
            )}
          >
            <span className="absolute inset-y-0 left-0 w-1 bg-red-600 transition-all group-hover:w-1.5" />
            <div className="flex items-start justify-between gap-3 pl-2">
              <div className="min-w-0">
                <span className="flex h-10 w-10 items-center justify-center rounded-full bg-red-50 text-red-600">
                  <Icon className="h-4 w-4" />
                </span>
                <p className="mt-3 text-xs font-semibold uppercase tracking-wide text-slate-500">
                  {label}
                </p>
                <p className="mt-1 break-all text-base font-bold text-slate-900 group-hover:text-red-600 sm:text-lg">
                  {value}
                </p>
                <p className="mt-1 text-xs text-slate-500">{hint}</p>
              </div>
              <ArrowUpRight className="h-4 w-4 shrink-0 text-slate-300 transition-colors group-hover:text-red-500" />
            </div>
          </a>
        ))}
      </div>

      <ul className="mt-8 divide-y divide-slate-200/80">
        {details.map(({ icon: Icon, label, value }) => (
          <li key={label} className="flex gap-4 py-5 first:pt-0 last:pb-0">
            <span className="flex h-10 w-10 shrink-0 items-center justify-center rounded-full bg-slate-100 text-slate-600">
              <Icon className="h-4 w-4" />
            </span>
            <div className="min-w-0 pt-0.5">
              <p className="text-xs font-semibold uppercase tracking-wide text-slate-500">
                {label}
              </p>
              <p className="mt-1 text-sm leading-relaxed text-slate-800">{value}</p>
            </div>
          </li>
        ))}
      </ul>

      <a
        href="tel:1066"
        className={cn(
          "group mt-8 flex w-full max-w-md items-center gap-4 rounded-full border-2 border-red-200 bg-white py-2 pl-2 pr-5 shadow-sm transition-all duration-200",
          "hover:border-red-400 hover:shadow-md hover:shadow-red-100",
          "focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-red-500/70 focus-visible:ring-offset-2"
        )}
      >
        <span className="relative flex h-16 w-16 shrink-0 items-center justify-center rounded-full bg-red-600 text-white shadow-md ring-4 ring-red-600/15 transition-transform group-hover:scale-105">
          <span className="absolute inset-0 rounded-full bg-red-500/40 animate-ping opacity-30" />
          <Ambulance className="relative h-6 w-6" />
        </span>
        <span className="min-w-0 flex-1">
          <span className="block text-[10px] font-bold uppercase tracking-[0.2em] text-red-600">
            Emergency · 24/7
          </span>
          <span className="mt-0.5 block text-3xl font-black leading-none tracking-tight text-slate-900">
            1066
          </span>
          <span className="mt-0.5 block text-xs text-slate-500">
            Tap to call casualty & ambulance
          </span>
        </span>
        <span className="flex h-10 w-10 shrink-0 items-center justify-center rounded-full bg-red-600 text-white transition-colors group-hover:bg-red-700">
          <Phone className="h-4 w-4" />
        </span>
      </a>
    </div>
  );
}
