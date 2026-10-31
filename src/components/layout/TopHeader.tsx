import { Phone, Mail } from "lucide-react";
import { socialLinks } from "@/data/site-social";

const iconClass = "h-3.5 w-3.5 shrink-0 text-red-500";
const TOLL_FREE_DISPLAY = "1800 599 0999";
const TOLL_FREE_TEL = "18005990999";
const EMERGENCY_DISPLAY = "+91 94990 59966";
const EMERGENCY_TEL = "+919499059966";

function SocialIconLinks({ size = "md" }: { size?: "sm" | "md" }) {
  const buttonClass =
    size === "sm"
      ? "inline-flex size-8 items-center justify-center rounded-md bg-slate-800 text-slate-300 transition-colors hover:bg-red-600 hover:text-white"
      : "inline-flex size-9 items-center justify-center rounded-lg bg-slate-800 text-slate-300 transition-colors hover:bg-red-600 hover:text-white";

  const iconSize = size === "sm" ? "size-3.5" : "size-4";

  return (
    <>
      {socialLinks.map(({ name, href, icon: Icon }) => (
        <a
          key={name}
          href={href}
          target="_blank"
          rel="noopener noreferrer"
          aria-label={name}
          className={buttonClass}
        >
          <Icon className={iconSize} />
        </a>
      ))}
    </>
  );
}

export default function TopHeader() {
  return (
    <div className="hidden md:block relative z-[60] overflow-visible bg-slate-900 text-slate-200 text-xs sm:text-sm">
      {/* Desktop */}
      <div className="container mx-auto overflow-visible px-4 py-2">
        <div className="flex items-center justify-between gap-4">
          <div className="flex min-w-0 flex-wrap items-center gap-x-6 gap-y-1">
            <a
              href={`tel:${TOLL_FREE_TEL}`}
              className="flex shrink-0 items-center space-x-2 transition-colors hover:text-white"
            >
              <Phone className="h-4 w-4 text-red-600" />
              <span>
                Toll Free:{" "}
                <span className="font-bold text-white">{TOLL_FREE_DISPLAY}</span>
              </span>
            </a>
            <a
              href={`tel:${EMERGENCY_TEL}`}
              className="flex shrink-0 items-center space-x-2 transition-colors hover:text-white"
            >
              <Phone className="h-4 w-4 text-red-600" />
              <span>
                Emergency Call:{" "}
                <span className="font-bold text-white">{EMERGENCY_DISPLAY}</span>
              </span>
            </a>
            <a
              href="mailto:info@adhiparasakthihospitals.com"
              className="flex min-w-0 items-center space-x-2 transition-colors hover:text-white"
            >
              <Mail className="h-4 w-4 shrink-0 text-red-600" />
              <span className="truncate">info@adhiparasakthihospitals.com</span>
            </a>
          </div>

          <div className="flex shrink-0 items-center gap-2.5">
            <span className="text-xs font-medium uppercase tracking-wider text-slate-400">
              Follow us
            </span>
            <SocialIconLinks />
          </div>
        </div>
      </div>
    </div>
  );
}
