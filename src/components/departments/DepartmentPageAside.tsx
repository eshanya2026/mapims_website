"use client";

import Link from "next/link";
import { usePathname } from "next/navigation";
import { motion } from "framer-motion";
import { ArrowRight, Calendar } from "lucide-react";
import { cn } from "@/lib/utils";
import {
  departmentAsideIcons,
  getDepartmentHref,
  getDepartmentsForAside,
} from "@/data/departments";

export default function DepartmentPageAside() {
  const pathname = usePathname();
  const activeDepartmentSlug = pathname?.split("/departments/")[1]?.split("/")[0];

  return (
    <aside className="order-2 w-full shrink-0 lg:order-1 lg:w-72">
      <motion.div
        initial={{ opacity: 0, x: -20 }}
        whileInView={{ opacity: 1, x: 0 }}
        viewport={{ once: true }}
        transition={{ duration: 0.5 }}
        className="space-y-5 lg:sticky lg:top-28"
      >
        <div className="overflow-hidden rounded-2xl border border-slate-200/80 bg-white shadow-md shadow-slate-200/50">
          <div className="border-b border-slate-100 bg-slate-50 px-5 py-4">
            <h3 className="text-xs font-bold uppercase tracking-[0.14em] text-slate-500">
              Browse Departments
            </h3>
          </div>
          <nav aria-label="All hospital departments" className="max-h-[28rem] overflow-y-auto">
            {getDepartmentsForAside().map((dept) => {
              const isActive = activeDepartmentSlug === dept.slug;
              const icon = departmentAsideIcons[dept.slug];
              return (
                <Link
                  key={dept.slug}
                  href={getDepartmentHref(dept.slug)}
                  className={cn(
                    "flex items-center gap-3 border-b border-slate-50 px-5 py-3.5 text-sm font-semibold transition-all duration-200 last:border-0",
                    isActive
                      ? "bg-red-600 text-white shadow-inner"
                      : "text-slate-700 hover:bg-red-50 hover:text-red-700"
                  )}
                >
                  {icon ? (
                    <span
                      className={cn(
                        "flex h-8 w-8 items-center justify-center rounded-lg text-base leading-none",
                        isActive ? "bg-white/15" : "bg-slate-100"
                      )}
                      aria-hidden="true"
                    >
                      {icon}
                    </span>
                  ) : null}
                  <span className="min-w-0 flex-1 leading-snug">{dept.name}</span>
                  {isActive ? (
                    <span className="h-2 w-2 rounded-full bg-white" aria-hidden />
                  ) : null}
                </Link>
              );
            })}
          </nav>
        </div>

        <Link
          href="/#book-appointment"
          className="inline-flex h-12 w-full items-center justify-center gap-2 rounded-xl bg-red-600 px-6 text-sm font-bold text-white shadow-lg shadow-red-600/25 transition-all hover:-translate-y-0.5 hover:bg-red-700 hover:shadow-xl"
        >
          <Calendar className="h-4 w-4" />
          Book Appointment
          <ArrowRight className="h-4 w-4" />
        </Link>
      </motion.div>
    </aside>
  );
}
