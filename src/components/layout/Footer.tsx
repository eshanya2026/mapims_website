import Link from "next/link";
import { MapPin, Phone, Mail, ExternalLink } from "lucide-react";
import { mapimsHealthCheckupUrl } from "@/data/site-links";
import FooterNewsletter from "@/components/layout/FooterNewsletter";
import {
  FacebookIcon,
  YoutubeIcon,
  InstagramIcon,
  LinkedinIcon,
} from "@/components/layout/SocialIcons";

const departments = [
  "Multi Organ Transplant",
  "Oncology",
  "Neurology",
  "Cardiology",
  "Joint replacement",
  "Orthopaedics",
  "Obstetrics & Gynaecology",
  "Nephrology",
  "Paediatric",
  "Diabetology",
  "General Medicine",
  "Medical Gastroenterology",
  "Plastic Surgery",
  "Ophthalmology",
  "Otorhinolaryngology - ENT",
  "Urology",
];

const healthCheckupLinks = [
  "Master Health Check Up Package",
  "Cardio Health Check Up Package",
  "Well Women Checkup Executive Package",
] as const;

const quickLinks = [
  "Mission & Vision",
  "Charity Initiatives",
  "International Patients",
  ...healthCheckupLinks,
  "Blog",
  "Appointment",
  "Patient Feedback",
  "Value Added Services",
  "Contact",
];

function quickLinkHref(item: string): string {
  if (item === "Appointment") return "#book-appointment";
  if (item === "International Patients") return "/international";
  if (item === "Contact") return "/contact";
  if (item === "Value Added Services") return "/about#value-added-services";
  if (item === "Blog") return "/blog/health-insights";
  if (
    healthCheckupLinks.includes(item as (typeof healthCheckupLinks)[number])
  ) {
    return mapimsHealthCheckupUrl;
  }
  return "#";
}

const socialLinks = [
  {
    name: "Facebook",
    href: "https://www.facebook.com/ADHIPARASAKTHIHOSPITALSMELMARUVATHUR/",
    icon: FacebookIcon,
  },
  {
    name: "YouTube",
    href: "https://www.youtube.com/results?search_query=MAPIMS+Adhiparasakthi+Hospital+Melmaruvathur",
    icon: YoutubeIcon,
  },
  {
    name: "Instagram",
    href: "https://www.instagram.com/explore/tags/mapims/",
    icon: InstagramIcon,
  },
  {
    name: "LinkedIn",
    href: "https://www.linkedin.com/search/results/all/?keywords=MAPIMS%20Melmaruvathur",
    icon: LinkedinIcon,
  },
];

const MAP_EMBED_URL =
  "https://maps.google.com/maps?q=Melmaruvathur+Adhiparasakthi+Institute+of+Medical+Sciences+and+Research,+Melmaruvathur,+Kancheepuram,+603319&hl=en&z=15&output=embed";

const MAP_DIRECTIONS_URL =
  "https://www.google.com/maps/dir/?api=1&destination=Melmaruvathur+Adhiparasakthi+Institute+of+Medical+Sciences+and+Research,+Melmaruvathur,+Tamil+Nadu+603319";

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
        <div className="grid grid-cols-1 sm:grid-cols-2 xl:grid-cols-4 gap-10 xl:gap-8">
          <div className="space-y-5 sm:col-span-2 xl:col-span-1">
            <Link href="/" className="inline-flex items-center gap-3 group max-w-full flex-wrap sm:flex-nowrap">
              <span className="flex items-center gap-1.5 sm:gap-2 shrink-0 min-w-0 transition-transform group-hover:scale-[1.02]">
                <img
                  src="/images/adhiparasakthi-hospitals-emblem.png"
                  alt=""
                  aria-hidden
                  className="h-12 sm:h-14 w-auto object-contain shrink-0"
                />
                <span className="text-base sm:text-lg font-bold leading-tight text-white whitespace-nowrap">
                  Adhiparasakthi Hospital
                </span>
              </span>
              <img
                src="/images/nabh-nabl-certifications.png"
                alt="NABH and NABL certified"
                className="h-11 sm:h-12 w-auto max-w-[120px] sm:max-w-[140px] object-contain shrink-0 border-l border-slate-700 pl-3"
              />
            </Link>
            <p className="text-sm text-slate-400 leading-relaxed max-w-sm">
              Melmaruvathur Adhiparasakthi Institute of Medical Sciences and
              Research was established in 2008. The Hospital attached to the
              College is being run from the year 1986, later evolved as
              Adhiparasakthi Hospitals by His Holiness &quot;Padmashri&quot;
              Bangaru Adigalar and runs by non-profitable ACMEC Trust.
            </p>
          </div>

          <div>
            <FooterHeading>Departments</FooterHeading>
            <ul className="grid grid-cols-1 sm:grid-cols-2 xl:grid-cols-1 gap-x-4 gap-y-2">
              {departments.map((item) => (
                <li key={item}>
                  <Link
                    href={
                      item === "Multi Organ Transplant"
                        ? "/departments/multi-organ-transplant"
                        : "/departments"
                    }
                    className="text-sm text-slate-400 hover:text-white transition-colors"
                  >
                    {item}
                  </Link>
                </li>
              ))}
            </ul>
          </div>

          <div>
            <FooterHeading>Quick Links</FooterHeading>
            <ul className="space-y-2">
              {quickLinks.map((item) => {
                const href = quickLinkHref(item);
                const isExternal = href.startsWith("http");
                const className =
                  "text-sm text-slate-400 hover:text-white transition-colors";
                return (
                  <li key={item}>
                    {isExternal ? (
                      <a
                        href={href}
                        target="_blank"
                        rel="noopener noreferrer"
                        className={className}
                      >
                        {item}
                      </a>
                    ) : (
                      <Link href={href} className={className}>
                        {item}
                      </Link>
                    )}
                  </li>
                );
              })}
            </ul>
          </div>

          <div>
            <FooterHeading>Contact Details</FooterHeading>
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

            <div className="mt-6">
              <FooterHeading>Newsletter</FooterHeading>
              <FooterNewsletter />
            </div>

            <div className="mt-6">
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
        </div>

        {/* Map — full-width rectangle below main columns */}
        <div className="mt-12 pt-10 border-t border-slate-800">
          <FooterHeading>Find us on Google Maps</FooterHeading>
          <div className="relative w-full overflow-hidden rounded-lg border border-slate-800 bg-slate-900 h-44 sm:h-52 md:h-60">
            <iframe
              title="Adhiparasakthi Hospital location on Google Maps"
              src={MAP_EMBED_URL}
              className="absolute inset-0 w-full h-full border-0"
              loading="lazy"
              referrerPolicy="no-referrer-when-downgrade"
              allowFullScreen
            />
          </div>
          <a
            href={MAP_DIRECTIONS_URL}
            target="_blank"
            rel="noopener noreferrer"
            className="inline-flex items-center gap-1.5 mt-3 text-sm text-red-500 hover:text-red-400 transition-colors"
          >
            Get directions
            <ExternalLink className="size-3.5" />
          </a>
        </div>

        <div className="mt-12 pt-8 border-t border-slate-800 flex flex-col md:flex-row justify-between items-center gap-4">
          <p className="text-sm text-slate-500 text-center md:text-left">
            &copy; {new Date().getFullYear()} Adhiparasakthi Hospital. All
            rights reserved.
          </p>
          <div className="flex gap-6 text-sm text-slate-500">
            <Link href="#" className="hover:text-white transition-colors">
              Privacy Policy
            </Link>
            <Link href="#" className="hover:text-white transition-colors">
              Terms of Service
            </Link>
          </div>
        </div>
      </div>
    </footer>
  );
}
