import { Phone, Mail, Globe } from "lucide-react";

const iconClass = "h-3.5 w-3.5 shrink-0 text-red-500";

export default function TopHeader() {
  return (
    <div className="bg-slate-900 text-slate-200 text-xs sm:text-sm">
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
            href="tel:+919876543210"
            className="flex items-center justify-end gap-1.5 text-right font-medium text-white"
          >
            <Phone className={iconClass} />
            <span className="leading-tight">Ambulance</span>
          </a>

          <a
            href="mailto:info@adhiparasakthihospital.com"
            className="flex min-w-0 items-start gap-1.5 text-slate-300"
          >
            <Mail className={`${iconClass} mt-0.5`} />
            <span className="break-all text-[10px] leading-snug sm:text-[11px]">
              info@adhiparasakthihospital.com
            </span>
          </a>

          <div className="flex items-center justify-end gap-1 text-slate-300">
            <Globe className={iconClass} />
            <span className="leading-tight">English</span>
          </div>
        </div>
      </div>

      {/* Desktop */}
      <div className="container mx-auto hidden px-4 py-2 md:block">
        <div className="flex items-center justify-between">
          <div className="flex items-center space-x-6">
            <div className="flex items-center space-x-2">
              <Phone className="h-4 w-4 text-red-600" />
              <span>
                Emergency: <span className="font-bold text-white">1066</span>
              </span>
            </div>
            <div className="flex items-center space-x-2">
              <Phone className="h-4 w-4 text-red-600" />
              <span>
                Ambulance:{" "}
                <span className="font-bold text-white">+91 98765 43210</span>
              </span>
            </div>
            <div className="flex items-center space-x-2">
              <Mail className="h-4 w-4 text-red-600" />
              <span>info@adhiparasakthihospital.com</span>
            </div>
          </div>
          <div className="flex items-center space-x-4">
            <div className="flex items-center space-x-3 border-r border-slate-700 pr-4">
              <a
                href="#"
                className="text-xs font-medium uppercase tracking-wider transition-colors hover:text-red-600"
              >
                Follow Us
              </a>
            </div>
            <div className="flex cursor-pointer items-center space-x-1 transition-colors hover:text-red-600">
              <Globe className="h-4 w-4" />
              <span>English</span>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
