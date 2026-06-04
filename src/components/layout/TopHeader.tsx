import { Phone, Mail } from "lucide-react";
import { socialLinks } from "@/data/site-social";

const iconClass = "h-3.5 w-3.5 shrink-0 text-red-500";
const AMBULANCE_TEL = "+919499059966";

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
    <div className="relative z-[60] overflow-visible bg-slate-900 text-slate-200 text-xs sm:text-sm">
      {/* Mobile */}
      <div className="px-3 py-2.5 md:hidden">
        <div className="grid grid-cols-2 gap-x-3 gap-y-2.5">
          <a
            href="tel:1066"
            className="flex items-center gap-1.5 font-medium text-white"
          >
            <Phone className={iconClass} />
            <span className="leading-tight">
              Emergency: <span className="font-bold">1066</span>
            </span>
          </a>

          <a
            href={`tel:${AMBULANCE_TEL}`}
            className="flex items-center justify-end gap-1.5 text-right font-medium text-white"
          >
            <Phone className={iconClass} />
            <span className="leading-tight">Ambulance</span>
          </a>

          <a
            href="mailto:info@adhiparasakthihospital.com"
            className="col-span-2 flex min-w-0 items-start gap-1.5 text-slate-300"
          >
            <Mail className={`${iconClass} mt-0.5`} />
            <span className="break-all text-[10px] leading-snug sm:text-[11px]">
              info@adhiparasakthihospital.com
            </span>
          </a>
        </div>

        <div className="mt-2.5 flex flex-wrap items-center gap-2 border-t border-slate-800 pt-2.5">
          <span className="text-[10px] font-medium uppercase tracking-wider text-slate-500">
            Follow us
          </span>
          <SocialIconLinks size="sm" />
        </div>
      </div>

      {/* Desktop */}
      <div className="container mx-auto hidden overflow-visible px-4 py-2 md:block">
        <div className="flex items-center justify-between gap-4">
          <div className="flex min-w-0 flex-wrap items-center gap-x-6 gap-y-1">
            <a
              href="tel:1066"
              className="flex shrink-0 items-center space-x-2 transition-colors hover:text-white"
            >
              <Phone className="h-4 w-4 text-red-600" />
              <span>
                Emergency: <span className="font-bold text-white">1066</span>
              </span>
            </a>
            <a
              href={`tel:${AMBULANCE_TEL}`}
              className="flex shrink-0 items-center space-x-2 transition-colors hover:text-white"
            >
              <Phone className="h-4 w-4 text-red-600" />
              <span>
                Ambulance:{" "}
                <span className="font-bold text-white">+91 94990 59966</span>
              </span>
            </a>
            <a
              href="mailto:info@adhiparasakthihospital.com"
              className="flex min-w-0 items-center space-x-2 transition-colors hover:text-white"
            >
              <Mail className="h-4 w-4 shrink-0 text-red-600" />
              <span className="truncate">info@adhiparasakthihospital.com</span>
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
