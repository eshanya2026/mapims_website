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

export default function Footer() {
  return (
    <footer className="bg-slate-950 text-slate-300 border-t border-slate-800">
      <div className="container mx-auto px-4 pt-14 pb-10">
        {/* Main link columns */}
        <div className="grid grid-cols-1 lg:grid-cols-[minmax(0,1.2fr)_minmax(0,1.6fr)_minmax(0,1fr)] gap-10 lg:gap-8 lg:items-start">
          <div className="space-y-5 min-w-0">
            <ScrollToTopLink href="/" className="inline-flex items-center gap-3 group max-w-full flex-wrap sm:flex-nowrap">
              <span className="flex items-center gap-1.5 sm:gap-2 shrink-0 min-w-0 transition-transform group-hover:scale-[1.02]">
                <img
                  src="/images/adhiparasakthi-hospitals-emblem.png"
                  alt="Adhiparasakthi Hospitals emblem"
                  className="h-[5rem] w-[12rem] max-h-[6rem] max-w-[12rem] object-contain object-center shrink-0 sm:h-16 sm:max-w-[12rem] transform -translate-y-[5px]"
                />
                {/* <span className="text-base sm:text-lg font-bold leading-tight text-white whitespace-nowrap">
                  Adhiparasakthi Hospital
                </span> */}
              </span>
              <img
                src="/images/nabh-nabl-certifications.png"
                alt="NABH and NABL certified"
                className="h-11 sm:h-12 w-auto max-w-[120px] sm:max-w-[140px] object-contain shrink-0 border-l border-slate-700 pl-3"
              />
            </ScrollToTopLink>

            <ul className="space-y-4">
              <li className="flex items-start gap-3">
                <MapPin className="w-5 h-5 text-red-500 shrink-0 mt-0.5" />
                <span className="text-sm text-slate-400 leading-relaxed">
                  Adhiparasakthi Hospitals, Melmaruvathur, Kancheepuram
                  District, Tamilnadu, India 603319
                </span>
              </li>
              <li className="flex items-center gap-3">
                <Phone className="w-5 h-5 text-red-500 shrink-0" />
                <a
                  href="tel:+919499059966"
                  className="text-sm text-white hover:text-red-400 transition-colors"
                >
                  +91 94990 59966
                </a>
              </li>
              <li className="flex items-center gap-3">
                <Mail className="w-5 h-5 text-red-500 shrink-0" />
                <a
                  href="mailto:contact@mapims.edu.in"
                  className="text-sm text-white hover:text-red-400 transition-colors break-all"
                >
                  contact@mapims.edu.in
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
            &copy; {new Date().getFullYear()} Adhiparasakthi Hospital. All
            rights reserved.
          </p>
        </div>
      </div>
    </footer>
  );
}
