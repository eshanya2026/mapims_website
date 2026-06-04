"use client";

import Link from "next/link";
import { usePathname } from "next/navigation";
import { motion } from "framer-motion";
import { cn } from "@/lib/utils";
import { procedureServicesSidebar } from "@/data/procedure-services";

/** Sidebar for procedure / service detail pages — not used on International Patients care. */
export default function ProcedureServicesSidebar() {
  const pathname = usePathname();

  return (
    <aside className="w-full shrink-0 lg:w-72">
      <motion.div
        initial={{ opacity: 0, x: -20 }}
        whileInView={{ opacity: 1, x: 0 }}
        viewport={{ once: true }}
        transition={{ duration: 0.5 }}
        className="space-y-5 lg:sticky lg:top-28"
      >
        <div>
          <p className="mb-3 px-1 text-xs font-bold uppercase tracking-wider text-red-600">
            All Services
          </p>
          <nav className="overflow-hidden rounded-2xl border border-slate-100 bg-white shadow-lg shadow-slate-200/40">
            {procedureServicesSidebar.map((link) => {
              const isActive = pathname === link.href;
              return (
                <Link
                  key={link.label}
                  href={link.href}
                  className={cn(
                    "block border-b border-slate-50 px-5 py-3.5 text-sm font-semibold transition-all duration-200 last:border-0",
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
      </motion.div>
    </aside>
  );
}
