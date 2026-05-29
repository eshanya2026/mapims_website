"use client";

import Link from "next/link";
import { usePathname } from "next/navigation";
import { motion } from "framer-motion";
import { Phone, Calendar } from "lucide-react";
import { cn } from "@/lib/utils";
import { internationalCareSidebar } from "@/data/international-patient-care";

export default function InternationalServicesSidebar() {
  const pathname = usePathname();

  return (
    <aside className="w-full lg:w-72 shrink-0">
      <motion.div
        initial={{ opacity: 0, x: -20 }}
        whileInView={{ opacity: 1, x: 0 }}
        viewport={{ once: true }}
        transition={{ duration: 0.5 }}
        className="lg:sticky lg:top-28 space-y-5"
      >
        <div>
          <p className="text-xs font-bold uppercase tracking-wider text-red-600 mb-3 px-1">
            All Services
          </p>
          <nav className="bg-white rounded-2xl border border-slate-100 shadow-lg shadow-slate-200/40 overflow-hidden">
            {internationalCareSidebar.map((link) => {
              const isActive = pathname === link.href;
              return (
                <Link
                  key={link.label}
                  href={link.href}
                  className={cn(
                    "block px-5 py-3.5 text-sm font-semibold border-b border-slate-50 last:border-0 transition-all duration-200",
                    isActive
                      ? "bg-red-600 text-white shadow-inner"
                      : "text-slate-700 hover:bg-red-50 hover:text-red-600"
                  )}
                >
                  {link.label}
                </Link>
              );
            })}
          </nav>
        </div>

        <div className="bg-gradient-to-br from-red-600 to-red-700 rounded-2xl p-6 text-white shadow-xl shadow-red-600/25">
          <div className="flex items-center gap-3 mb-3">
            <div className="w-10 h-10 rounded-xl bg-white/20 flex items-center justify-center">
              <Phone className="w-5 h-5" />
            </div>
            <span className="font-bold uppercase tracking-wider text-sm">
              Emergency Call
            </span>
          </div>
          <a href="tel:1066" className="text-3xl font-black block mb-1 hover:underline">
            1066
          </a>
          <a
            href="tel:+919499059966"
            className="text-sm text-white/80 hover:text-white"
          >
            +91 94990 59966
          </a>
        </div>

        <Link
          href="/#book-appointment"
          className="flex w-full h-12 items-center justify-center bg-red-600 hover:bg-red-700 hover:shadow-lg hover:-translate-y-0.5 text-white rounded-full text-base font-semibold shadow-md shadow-red-600/20 transition-all"
        >
          <Calendar className="mr-2 w-5 h-5" />
          Book Appointment
        </Link>
      </motion.div>
    </aside>
  );
}
