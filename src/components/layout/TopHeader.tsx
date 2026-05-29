import Link from "next/link";
import { Phone, Mail, Globe } from "lucide-react";

const itemClass =
  "inline-flex shrink-0 items-center gap-1.5 whitespace-nowrap transition-colors hover:text-white";

export default function TopHeader() {
  return (
    <div className="bg-slate-900 text-slate-200">
      {/* Mobile: phones + email */}
      <div className="md:hidden">
        <div className="grid grid-cols-2 divide-x divide-slate-700 border-b border-slate-700/60">
          <Link
            href="tel:1066"
            className="flex h-9 min-w-0 items-center justify-center gap-1.5 px-2 text-[11px] transition-colors hover:bg-slate-800"
          >
            <Phone className="h-3.5 w-3.5 shrink-0 text-red-500" />
            <span className="truncate">
              Emergency: <span className="font-bold text-white">1066</span>
            </span>
          </Link>
          <a
            href="tel:+919499059966"
            className="flex h-9 min-w-0 items-center justify-center gap-1.5 px-2 text-[11px] transition-colors hover:bg-slate-800"
          >
            <Phone className="h-3.5 w-3.5 shrink-0 text-red-500" />
            <span className="truncate">
              Ambulance:{" "}
              <span className="font-bold text-white">+91 94990 59966</span>
            </span>
          </a>
        </div>
        <a
          href="mailto:info@adhiparasakthihospital.com"
          className="flex h-7 min-w-0 items-center justify-center gap-1.5 px-3 text-[10px] transition-colors hover:bg-slate-800"
        >
          <Mail className="h-3.5 w-3.5 shrink-0 text-red-500" />
          <span className="truncate">info@adhiparasakthihospital.com</span>
        </a>
      </div>

      {/* Tablet & desktop */}
      <div className="hidden md:block">
        <div className="page-container">
          <div className="flex h-[var(--site-topbar-height)] min-w-0 items-center justify-between gap-3 text-sm lg:gap-4">
            <div className="flex min-w-0 flex-1 items-center gap-3 overflow-x-auto [-ms-overflow-style:none] [scrollbar-width:none] lg:gap-5 lg:overflow-visible [&::-webkit-scrollbar]:hidden">
              <Link href="tel:1066" className={itemClass}>
                <Phone className="h-4 w-4 shrink-0 text-red-600" />
                <span>
                  Emergency: <span className="font-bold text-white">1066</span>
                </span>
              </Link>
              <span className="h-4 w-px shrink-0 bg-slate-700" aria-hidden />
              <a href="tel:+919499059966" className={itemClass}>
                <Phone className="h-4 w-4 shrink-0 text-red-600" />
                <span>
                  Ambulance:{" "}
                  <span className="font-bold text-white">+91 94990 59966</span>
                </span>
              </a>
              <span className="h-4 w-px shrink-0 bg-slate-700" aria-hidden />
              <a href="mailto:info@adhiparasakthihospital.com" className={itemClass}>
                <Mail className="h-4 w-4 shrink-0 text-red-600" />
                <span className="max-w-[180px] truncate lg:max-w-none">
                  info@adhiparasakthihospital.com
                </span>
              </a>
            </div>
            <div className="hidden shrink-0 items-center gap-4 lg:flex">
              <a
                href="#"
                className="text-xs font-medium uppercase tracking-wider transition-colors hover:text-white"
              >
                Follow Us
              </a>
              <span className="h-4 w-px bg-slate-700" aria-hidden />
              <button type="button" className={itemClass} aria-label="Language">
                <Globe className="h-4 w-4 shrink-0 text-red-600" />
                <span>English</span>
              </button>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
