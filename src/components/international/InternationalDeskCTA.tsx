import { Mail, Phone, Headphones } from "lucide-react";
import InternationalDeskForm from "@/components/international/InternationalDeskForm";
import { internationalDesk } from "@/data/international-patients";

export default function InternationalDeskCTA() {
  return (
    <section
      id="contact-international-desk"
      className="scroll-mt-28 border-t border-slate-200 bg-slate-50 py-14 md:py-16"
      aria-labelledby="international-desk-heading"
    >
      <div className="container mx-auto px-4">
        <div className="grid grid-cols-1 items-start gap-10 lg:grid-cols-2 lg:gap-12 xl:gap-16">
          <div>
            <p className="text-sm font-semibold uppercase tracking-wider text-red-600">
              International Patient Department
            </p>
            <h2
              id="international-desk-heading"
              className="mt-3 text-2xl font-bold text-slate-900 md:text-3xl"
            >
              Contact International Desk
            </h2>
            <p className="mt-4 max-w-lg leading-relaxed text-slate-600">
              Coordinators assist with registration, medical visa letters, travel
              planning, cost estimates, and specialist appointments at MAPIMS,
              Melmaruvathur.
            </p>

            <ul className="mt-8 space-y-4">
              <li>
                <a
                  href={internationalDesk.tollFreeTel}
                  className="group flex items-start gap-4 rounded-xl border border-slate-200 bg-white p-4 shadow-sm transition hover:border-red-200 hover:shadow-md"
                >
                  <span className="flex h-11 w-11 shrink-0 items-center justify-center rounded-lg bg-red-50 text-red-600">
                    <Headphones className="h-5 w-5" />
                  </span>
                  <span>
                    <span className="block text-xs font-semibold uppercase tracking-wider text-slate-500">
                      Toll-free (India)
                    </span>
                    <span className="mt-0.5 block text-lg font-bold text-slate-900 group-hover:text-red-600">
                      {internationalDesk.tollFreeDisplay}
                    </span>
                  </span>
                </a>
              </li>
              <li>
                <a
                  href={internationalDesk.phoneTel}
                  className="group flex items-start gap-4 rounded-xl border border-slate-200 bg-white p-4 shadow-sm transition hover:border-red-200 hover:shadow-md"
                >
                  <span className="flex h-11 w-11 shrink-0 items-center justify-center rounded-lg bg-red-50 text-red-600">
                    <Phone className="h-5 w-5" />
                  </span>
                  <span>
                    <span className="block text-xs font-semibold uppercase tracking-wider text-slate-500">
                      Phone / WhatsApp
                    </span>
                    <span className="mt-0.5 block text-lg font-bold text-slate-900 group-hover:text-red-600">
                      {internationalDesk.phoneDisplay}
                    </span>
                  </span>
                </a>
              </li>
              <li>
                <a
                  href={internationalDesk.mailto}
                  className="group flex items-start gap-4 rounded-xl border border-slate-200 bg-white p-4 shadow-sm transition hover:border-red-200 hover:shadow-md"
                >
                  <span className="flex h-11 w-11 shrink-0 items-center justify-center rounded-lg bg-red-50 text-red-600">
                    <Mail className="h-5 w-5" />
                  </span>
                  <span className="min-w-0">
                    <span className="block text-xs font-semibold uppercase tracking-wider text-slate-500">
                      Email
                    </span>
                    <span className="mt-0.5 block break-all text-base font-semibold text-slate-900 group-hover:text-red-600 sm:text-lg">
                      {internationalDesk.email}
                    </span>
                  </span>
                </a>
              </li>
            </ul>
          </div>

          <InternationalDeskForm />
        </div>
      </div>
    </section>
  );
}
