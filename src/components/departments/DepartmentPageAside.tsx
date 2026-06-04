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
    <aside className="order-2 w-full shrink-0 border-t border-slate-100 pt-10 lg:order-1 lg:w-72 lg:border-t-0 lg:pt-0">
      <motion.div
        initial={{ opacity: 0, x: -20 }}
        whileInView={{ opacity: 1, x: 0 }}
        viewport={{ once: true }}
        transition={{ duration: 0.5 }}
        className="space-y-6 lg:sticky lg:top-28 lg:pt-12"
      >
        <div className="overflow-hidden rounded-2xl border border-slate-200 bg-white shadow-sm">
          <div className="border-b border-slate-100 px-5 py-4">
            <h3 className="text-sm font-bold uppercase tracking-wider text-red-600">
              All Departments
            </h3>
          </div>
          <nav aria-label="All hospital departments">
            {getDepartmentsForAside().map((dept) => {
              const isActive = activeDepartmentSlug === dept.slug;
              const icon = departmentAsideIcons[dept.slug];
              return (
                <Link
                  key={dept.slug}
                  href={getDepartmentHref(dept.slug)}
                  className={cn(
                    "flex items-center gap-2.5 border-b border-slate-50 px-5 py-3.5 text-sm font-semibold transition-all duration-200 last:border-0",
                    isActive
                      ? "bg-red-600 text-white"
                      : "text-slate-700 hover:bg-red-50 hover:text-red-600"
                  )}
                >
                  {icon ? (
                    <span
                      className="text-base leading-none"
                      aria-hidden="true"
                    >
                      {icon}
                    </span>
                  ) : null}
                  <span className="min-w-0 flex-1">{dept.name}</span>
                </Link>
              );
            })}
          </nav>
        </div>

        <Link
          href="/#book-appointment"
          className="inline-flex h-12 w-full items-center justify-center gap-2 rounded-full bg-red-600 px-8 text-base font-semibold text-white shadow-lg shadow-red-600/25 transition-all hover:-translate-y-0.5 hover:bg-red-700 hover:shadow-xl"
        >
          <Calendar className="h-4 w-4" />
          Book Appointment
          <ArrowRight className="h-4 w-4" />
        </Link>
      </motion.div>
    </aside>
  );
}
