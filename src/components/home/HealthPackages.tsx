"use client";

import { useState } from "react";
import Link from "next/link";
import { motion } from "framer-motion";
import { CheckCircle2 } from "lucide-react";
import { healthPackages } from "@/data/health-packages";
import { mapimsHealthCheckupUrl } from "@/data/site-links";
import { cn } from "@/lib/utils";

export default function HealthPackages() {
  const [selectedId, setSelectedId] = useState(healthPackages[0].id);
  const [expandedIds, setExpandedIds] = useState<Set<string>>(new Set());

  const toggleExpanded = (id: string) => {
    setExpandedIds((prev) => {
      const next = new Set(prev);
      if (next.has(id)) {
        next.delete(id);
      } else {
        next.add(id);
      }
      return next;
    });
  };

  return (
    <section
      id="health-packages"
      className="section-padding bg-gradient-to-b from-red-50/40 via-white to-red-50/30"
    >
      <div className="page-container">
        <div className="section-header-center">
          <div className="section-eyebrow-center">
            <div className="w-12 h-[2px] bg-red-600" />
            <span className="text-red-600 font-semibold uppercase tracking-wider text-sm">
              Professional Healthcare Excellence
            </span>
            <div className="w-12 h-[2px] bg-red-600" />
          </div>
          <h2 className="section-title">
            Health Checkup <span className="text-red-600">Packages</span>
          </h2>
          <p className="text-lg text-slate-600">
            Choose from our affordable preventive health packages at Adhiparasakthi
            Hospitals, Melmaruvathur.{" "}
            <a
              href={mapimsHealthCheckupUrl}
              target="_blank"
              rel="noopener noreferrer"
              className="font-semibold text-red-600 hover:text-red-700 hover:underline"
            >
              Start your free MAPIMS AI health assessment
            </a>{" "}
            for master health checkup recommendations.
          </p>
        </div>

        <div className="section-grid mx-auto max-w-7xl grid-cols-1 sm:grid-cols-2 xl:grid-cols-4">
          {healthPackages.map((pkg, index) => {
            const isSelected = selectedId === pkg.id;
            const isExpanded = expandedIds.has(pkg.id);
            const previewCount = pkg.previewCount ?? pkg.tests.length;
            const hasMore = pkg.tests.length > previewCount;
            const visibleTests =
              isExpanded || !hasMore ? pkg.tests : pkg.tests.slice(0, previewCount);
            const hiddenCount = pkg.tests.length - previewCount;

            return (
              <motion.article
                key={pkg.id}
                initial={{ opacity: 0, y: 30 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ duration: 0.5, delay: index * 0.08 }}
                className={cn(
                  "relative rounded-2xl border-2 p-6 flex flex-col h-full transition-all duration-300",
                  isSelected
                    ? "border-emerald-500 bg-emerald-50/60 shadow-lg shadow-emerald-500/10"
                    : "border-red-100 bg-white shadow-md hover:shadow-lg hover:border-red-200"
                )}
              >
                <div className="mb-5">
                  <h3 className="mb-3 text-base font-bold leading-snug text-red-600 sm:text-lg sm:min-h-[3.5rem]">
                    {pkg.name}
                  </h3>
                  <p className="text-4xl font-bold text-red-600 mb-2">{pkg.priceLabel}</p>
                  <p className="text-sm text-slate-600">{pkg.description}</p>
                </div>

                <div className="flex-1">
                  <p className="font-semibold text-red-600 mb-3 text-sm">Includes</p>
                  <ul className="space-y-2.5 mb-4">
                    {visibleTests.map((test) => (
                      <li key={test} className="flex items-start gap-2.5">
                        <CheckCircle2 className="w-4 h-4 text-red-600 shrink-0 mt-0.5" />
                        <span className="text-slate-700 text-sm leading-snug">{test}</span>
                      </li>
                    ))}
                  </ul>
                  {hasMore && !isExpanded && (
                    <button
                      type="button"
                      onClick={() => toggleExpanded(pkg.id)}
                      className="text-sm font-medium text-blue-600 hover:text-blue-700 hover:underline mb-4"
                    >
                      +{hiddenCount} more items
                    </button>
                  )}
                  {hasMore && isExpanded && (
                    <button
                      type="button"
                      onClick={() => toggleExpanded(pkg.id)}
                      className="text-sm font-medium text-blue-600 hover:text-blue-700 hover:underline mb-4"
                    >
                      Show less
                    </button>
                  )}
                </div>

                {isSelected ? (
                  <p className="w-full rounded-lg bg-emerald-500 text-white text-center py-3 font-semibold text-sm">
                    Selected
                  </p>
                ) : (
                  <button
                    type="button"
                    onClick={() => setSelectedId(pkg.id)}
                    className="w-full rounded-lg bg-emerald-700 hover:bg-emerald-800 text-white py-3 font-semibold text-sm transition-colors"
                  >
                    Select Package
                  </button>
                )}
              </motion.article>
            );
          })}
        </div>

        <div className="mt-8 flex flex-col items-center justify-center gap-3 text-center sm:mt-10 sm:flex-row sm:gap-4 md:mt-12">
          <a
            href={mapimsHealthCheckupUrl}
            target="_blank"
            rel="noopener noreferrer"
            className="inline-flex items-center justify-center rounded-full bg-red-600 hover:bg-red-700 text-white px-8 h-12 font-medium shadow-lg shadow-red-600/20 transition-all"
          >
            MAPIMS AI Health Assessment
          </a>
          <Link
            href="/#book-appointment"
            className="inline-flex items-center justify-center rounded-full border-2 border-red-600 text-red-600 hover:bg-red-50 px-8 h-12 font-medium transition-all"
          >
            Book at Hospital
          </Link>
        </div>
      </div>
    </section>
  );
}
