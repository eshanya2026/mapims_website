"use client";

import { motion } from "framer-motion";
import { CheckCircle2, type LucideIcon } from "lucide-react";

export type DepartmentServiceItem = {
  title: string;
  description?: string;
  bullets?: string[];
};

type DepartmentServicesGridProps = {
  services: DepartmentServiceItem[];
  icons?: readonly LucideIcon[];
};

export default function DepartmentServicesGrid({
  services,
  icons = [],
}: DepartmentServicesGridProps) {
  return (
    <div className="grid grid-cols-1 gap-5 sm:grid-cols-2">
      {services.map((service, index) => {
        const Icon = icons[index];
        return (
          <motion.article
            key={service.title}
            initial={{ opacity: 0, y: 18 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.4, delay: index * 0.04 }}
            whileHover={{ y: -4 }}
            className="group flex h-full flex-col rounded-2xl border border-slate-200/80 bg-white p-6 shadow-sm transition-all hover:border-red-100 hover:shadow-lg"
          >
            <div className="mb-4 flex items-start gap-4">
              {Icon ? (
                <span className="flex h-12 w-12 shrink-0 items-center justify-center rounded-xl bg-red-50 text-red-600 transition-colors group-hover:bg-red-600 group-hover:text-white">
                  <Icon className="h-6 w-6" />
                </span>
              ) : (
                <span className="flex h-12 w-12 shrink-0 items-center justify-center rounded-xl bg-red-50 text-sm font-bold text-red-600">
                  {String(index + 1).padStart(2, "0")}
                </span>
              )}
              <h3 className="pt-2 text-lg font-bold leading-snug text-slate-900 group-hover:text-red-700">
                {service.title}
              </h3>
            </div>

            {service.bullets ? (
              <ul className="mt-auto space-y-2.5 border-t border-slate-100 pt-4">
                {service.bullets.map((bullet) => (
                  <li
                    key={bullet}
                    className="flex gap-2.5 text-sm leading-relaxed text-slate-600"
                  >
                    <CheckCircle2 className="mt-0.5 h-4 w-4 shrink-0 text-red-600" />
                    {bullet}
                  </li>
                ))}
              </ul>
            ) : service.description ? (
              <p className="mt-auto border-t border-slate-100 pt-4 text-sm leading-relaxed text-slate-600">
                {service.description}
              </p>
            ) : null}
          </motion.article>
        );
      })}
    </div>
  );
}
