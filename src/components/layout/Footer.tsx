import ScrollToTopLink from "@/components/layout/ScrollToTopLink";
import { MapPin, Phone, Mail } from "lucide-react";
import FooterNewsletter from "@/components/layout/FooterNewsletter";
import FooterFindUs from "@/components/layout/FooterFindUs";
import FooterQuickLinks from "@/components/layout/FooterQuickLinks";
import { socialLinks } from "@/data/site-social";

function FooterHeading({ children }: { children: React.ReactNode }) {
  return (
    <h3 className="text-sm font-semibold uppercase tracking-wider text-white mb-5">
      {children}
      <span className="mt-2 block h-0.5 w-10 rounded-full bg-red-600" />
    </h3>
  );
}

const HOSPITAL_EMAIL = process.env.NEXT_PUBLIC_HOSPITAL_EMAIL || "contact@mapims.edu.in";
const TOLL_FREE_PHONE = process.env.NEXT_PUBLIC_TOLL_FREE_PHONE || "1800 599 0999";
const HOSPITAL_PHONE = process.env.NEXT_PUBLIC_HOSPITAL_PHONE || "+91 94990 59966";

export default function Footer() {
  return (
    <footer className="bg-slate-900 text-slate-300 border-t border-slate-800/80">
      <div className="container mx-auto px-4 pt-14 pb-10">
        {/* Main link columns */}
        <div className="grid grid-cols-1 lg:grid-cols-[minmax(0,1.2fr)_minmax(0,1.6fr)_minmax(0,1fr)] gap-10 lg:gap-8 lg:items-start">
          <div className="space-y-5 min-w-0">
            <ScrollToTopLink
              href="/"
              className="inline-flex items-center gap-3.5 group max-w-full flex-wrap sm:flex-nowrap transition-opacity hover:opacity-95"
            >
              <span className="flex items-center shrink-0 min-w-0 transition-transform group-hover:scale-[1.02]">
                <img
                  src="/images/adhiparasakthi-hospitals-emblem-vivid-red.png"
                  alt="Adhiparasakthi Hospitals"
                  className="h-14 sm:h-16 w-auto max-w-[13rem] object-contain object-left shrink-0"
                />
              </span>
              <div className="flex items-center gap-2.5 sm:gap-3 shrink-0 pl-3 sm:pl-3.5 border-l border-slate-700/80">
                <img
                  src="/images/nabl-emblem-transparent.png"
                  alt="NABL Accredited"
                  className="h-11 sm:h-13 w-auto object-contain shrink-0 drop-shadow-sm"
                />
                <img
                  src="/images/nabh-emblem-transparent.png"
                  alt="NABH Accredited"
                  className="h-11 sm:h-13 w-auto object-contain shrink-0 drop-shadow-sm"
                />
              </div>
            </ScrollToTopLink>

            <ul className="space-y-4">
              <li className="flex items-start gap-3">
                <MapPin className="w-5 h-5 text-red-500 shrink-0 mt-0.5" />
                <span className="text-sm text-slate-400 leading-relaxed">
                  Adhiparasakthi Hospitals, Melmaruvathur, Kancheepuram
                  District, Tamilnadu, India 603319
                </span>
              </li>
              <li className="flex items-start gap-3">
                <Phone className="w-5 h-5 text-red-500 shrink-0 mt-0.5" />
                <div className="flex flex-col text-sm space-y-1">
                  <a
                    href={`tel:${TOLL_FREE_PHONE.replace(/[^0-9+]/g, "")}`}
                    className="text-white hover:text-red-400 transition-colors"
                  >
                    Toll Free: <span className="font-semibold">{TOLL_FREE_PHONE}</span>
                  </a>
                  <a
                    href={`tel:${HOSPITAL_PHONE.replace(/[^0-9+]/g, "")}`}
                    className="text-white hover:text-red-400 transition-colors"
                  >
                    Emergency Call: <span className="font-semibold">{HOSPITAL_PHONE}</span>
                  </a>
                </div>
              </li>
              <li className="flex items-center gap-3">
                <Mail className="w-5 h-5 text-red-500 shrink-0" />
                <a
                  href={`mailto:${HOSPITAL_EMAIL}`}
                  className="text-sm text-white hover:text-red-400 transition-colors break-all"
                >
                  {HOSPITAL_EMAIL}
                </a>
              </li>
            </ul>

            <div>
              <p className="text-xs font-semibold uppercase tracking-wider text-slate-500 mb-3">
                Follow us
              </p>
              <div className="flex flex-wrap gap-2">
                {socialLinks.map(({ name, href, icon: Icon }) => (
                  <a
                    key={name}
                    href={href}
                    target="_blank"
                    rel="noopener noreferrer"
                    aria-label={name}
                    className="inline-flex items-center justify-center size-10 rounded-lg bg-slate-900 border border-slate-800 text-slate-400 hover:text-white hover:border-red-600/50 hover:bg-red-600/10 transition-colors"
                  >
                    <Icon className="size-4" />
                  </a>
                ))}
              </div>
            </div>
          </div>

          <div className="min-w-0">
            <FooterHeading>Quick Links</FooterHeading>
            <FooterQuickLinks />
          </div>

          <div className="min-w-0">
            <FooterHeading>Newsletter</FooterHeading>
            <FooterNewsletter />
          </div>
        </div>

        <FooterFindUs />

        <div className="mt-12 border-t border-slate-800 pt-8">
          <p className="text-sm text-slate-500 text-center">
            &copy; {new Date().getFullYear()} Adhiparasakthi Hospitals. All
            rights reserved.
          </p>
        </div>
      </div>
    </footer>
  );
}
