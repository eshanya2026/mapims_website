"use client";

import { useEffect, useMemo, useState } from "react";
import Link from "next/link";
import { usePathname } from "next/navigation";
import {
  Activity,
  ArrowRight,
  Calendar,
  ChevronDown,
  HeartPulse,
  Search,
  ShieldAlert,
  Stethoscope,
  X,
} from "lucide-react";
import { cn } from "@/lib/utils";
import {
  departmentAsideIcons,
  departments,
  getDepartmentHref,
} from "@/data/departments";

type DepartmentCategory = {
  id: string;
  name: string;
  icon: typeof Stethoscope;
  slugs: string[];
};

const CATEGORIES: DepartmentCategory[] = [
  {
    id: "medical",
    name: "Medical Specialties",
    icon: Stethoscope,
    slugs: [
      "general-medicine",
      "dermatology",
      "diabetology",
      "paediatric",
      "pulmonology",
      "ophthalmology",
      "ent",
      "psychiatry",
    ],
  },
  {
    id: "surgical",
    name: "Surgical Specialties",
    icon: Activity,
    slugs: [
      "general-surgery",
      "orthopaedics",
      "joint-replacement",
      "spinal-surgeries",
      "obstetrics-gynaecology",
      "plastic-surgery",
      "oral-maxillofacial-surgery",
    ],
  },
  {
    id: "superspecialty",
    name: "Super Specialties",
    icon: HeartPulse,
    slugs: [
      "cardiology",
      "nephrology",
      "urology",
      "multi-organ-transplant",
      "neurology",
      "medical-gastroenterology",
      "oncology",
      "surgical-oncology",
      "cardiovascular-thoracic-surgery",
    ],
  },
  {
    id: "emergency",
    name: "Emergency & Diagnostics",
    icon: ShieldAlert,
    slugs: [
      "accident-emergency-services",
      "critical-care-medicine",
      "radiology",
      "radiology-imaging-science",
      "anaesthesiology",
      "transfusion-medicine",
    ],
  },
];

function isSlugMatch(current: string | undefined, target: string) {
  if (!current) return false;
  if (current === target) return true;
  if (
    (current === "radiology" && target === "radiology-imaging-science") ||
    (current === "radiology-imaging-science" && target === "radiology")
  ) {
    return true;
  }
  return false;
}

export default function DepartmentPageAside() {
  const pathname = usePathname();
  const activeDepartmentSlug = pathname?.split("/departments/")[1]?.split("/")[0];
  const [searchQuery, setSearchQuery] = useState("");

  // Map departments by slug for quick lookup
  const deptMap = useMemo(() => {
    return new Map(departments.map((d) => [d.slug, d]));
  }, []);

  // Determine which category contains the currently active department
  const initialCategoryId = useMemo(() => {
    const matched = CATEGORIES.find((cat) =>
      cat.slugs.some((slug) => isSlugMatch(activeDepartmentSlug, slug))
    );
    return matched ? matched.id : "medical";
  }, [activeDepartmentSlug]);

  const [openCategories, setOpenCategories] = useState<Set<string>>(
    () => new Set([initialCategoryId])
  );

  // Automatically expand category when navigating to a department
  useEffect(() => {
    if (!activeDepartmentSlug) return;
    const matched = CATEGORIES.find((cat) =>
      cat.slugs.some((slug) => isSlugMatch(activeDepartmentSlug, slug))
    );
    if (matched) {
      setOpenCategories((prev) => new Set([...prev, matched.id]));
    }
  }, [activeDepartmentSlug]);

  function toggleCategory(categoryId: string) {
    setOpenCategories((prev) => {
      const next = new Set(prev);
      if (next.has(categoryId)) {
        next.delete(categoryId);
      } else {
        next.add(categoryId);
      }
      return next;
    });
  }

  const normalizedQuery = searchQuery.trim().toLowerCase();

  return (
    <aside className="hidden w-72 shrink-0 self-start lg:sticky lg:top-24 lg:block lg:max-h-[calc(100vh-6rem)]">
      <div className="space-y-4">
        <div className="overflow-hidden rounded-2xl border border-slate-200/80 bg-white shadow-md shadow-slate-200/50">
          {/* Header */}
          <div className="border-b border-slate-100 bg-slate-50 px-4 py-3.5">
            <h3 className="text-xs font-bold uppercase tracking-[0.14em] text-slate-500">
              Browse Specialities
            </h3>

            {/* Quick Filter */}
            <div className="relative mt-2.5">
              <Search className="pointer-events-none absolute left-3 top-1/2 h-3.5 w-3.5 -translate-y-1/2 text-slate-400" />
              <input
                type="text"
                value={searchQuery}
                onChange={(e) => setSearchQuery(e.target.value)}
                placeholder="Search specialty..."
                className="w-full rounded-lg border border-slate-200 bg-white py-1.5 pl-8 pr-7 text-xs text-slate-800 placeholder-slate-400 outline-none transition focus:border-red-500 focus:ring-1 focus:ring-red-500"
              />
              {searchQuery ? (
                <button
                  type="button"
                  onClick={() => setSearchQuery("")}
                  className="absolute right-2 top-1/2 -translate-y-1/2 rounded p-0.5 text-slate-400 hover:text-slate-600"
                  aria-label="Clear search"
                >
                  <X className="h-3 w-3" />
                </button>
              ) : null}
            </div>
          </div>

          {/* Grouped Accordion Categories */}
          <div className="max-h-[min(30rem,calc(100vh-16rem))] overflow-y-auto overscroll-contain divide-y divide-slate-100">
            {CATEGORIES.map((category) => {
              const Icon = category.icon;
              const hasActiveDept = category.slugs.some((slug) =>
                isSlugMatch(activeDepartmentSlug, slug)
              );

              // Gather valid department objects in this category
              const categoryDepts = category.slugs
                .map((slug) => {
                  const dept = deptMap.get(slug);
                  if (dept) return dept;
                  if (slug === "radiology-imaging-science") return deptMap.get("radiology");
                  return null;
                })
                .filter((d): d is NonNullable<typeof d> => d !== null);

              // Deduplicate if needed
              const uniqueDepts = Array.from(
                new Map(categoryDepts.map((d) => [d.slug, d])).values()
              );

              // Filter by search query if user is searching
              const filteredDepts = normalizedQuery
                ? uniqueDepts.filter((d) =>
                    d.name.toLowerCase().includes(normalizedQuery)
                  )
                : uniqueDepts;

              // Hide category if searching and has no matches
              if (normalizedQuery && filteredDepts.length === 0) {
                return null;
              }

              const isOpen = normalizedQuery ? true : openCategories.has(category.id);

              return (
                <div key={category.id} className="bg-white">
                  {/* Category Accordion Header */}
                  <button
                    type="button"
                    onClick={() => toggleCategory(category.id)}
                    className={cn(
                      "flex w-full items-center justify-between px-4 py-3 text-left transition-colors",
                      hasActiveDept && !isOpen
                        ? "bg-red-50/70 text-red-900"
                        : "bg-white hover:bg-slate-50 text-slate-800"
                    )}
                  >
                    <div className="flex items-center gap-2.5 min-w-0">
                      <span
                        className={cn(
                          "flex h-7 w-7 shrink-0 items-center justify-center rounded-lg text-xs font-semibold",
                          hasActiveDept
                            ? "bg-red-100 text-red-700"
                            : "bg-slate-100 text-slate-600"
                        )}
                      >
                        <Icon className="h-3.5 w-3.5" />
                      </span>
                      <div className="min-w-0">
                        <span className="block truncate text-xs font-bold leading-tight">
                          {category.name}
                        </span>
                        <span className="text-[10px] text-slate-500">
                          {filteredDepts.length} {filteredDepts.length === 1 ? "specialty" : "specialties"}
                        </span>
                      </div>
                    </div>

                    <div className="flex items-center gap-1.5 shrink-0 ml-2">
                      {hasActiveDept && !isOpen ? (
                        <span className="h-2 w-2 rounded-full bg-red-600 ring-4 ring-red-100 animate-pulse" />
                      ) : null}
                      <ChevronDown
                        className={cn(
                          "h-4 w-4 text-slate-400 transition-transform duration-200",
                          isOpen ? "rotate-180 text-red-600" : ""
                        )}
                      />
                    </div>
                  </button>

                  {/* Category Departments List */}
                  {isOpen ? (
                    <div className="bg-slate-50/60 pb-1">
                      {filteredDepts.map((dept) => {
                        const isActive = isSlugMatch(activeDepartmentSlug, dept.slug);
                        const icon = departmentAsideIcons[dept.slug];

                        return (
                          <Link
                            key={dept.slug}
                            href={getDepartmentHref(dept.slug)}
                            className={cn(
                              "flex items-center gap-2.5 px-4 py-2.5 text-xs font-semibold transition-all duration-150 border-l-4",
                              isActive
                                ? "border-red-600 bg-red-600 text-white shadow-sm font-bold pl-3.5"
                                : "border-transparent text-slate-700 hover:border-red-300 hover:bg-red-50/60 hover:text-red-700"
                            )}
                          >
                            {icon ? (
                              <span
                                className={cn(
                                  "flex h-6 w-6 shrink-0 items-center justify-center rounded-md text-sm",
                                  isActive ? "bg-white/20" : "bg-white shadow-xs"
                                )}
                                aria-hidden="true"
                              >
                                {icon}
                              </span>
                            ) : null}
                            <span className="min-w-0 flex-1 truncate">{dept.name}</span>
                            {isActive ? (
                              <span
                                className="h-1.5 w-1.5 shrink-0 rounded-full bg-white"
                                aria-hidden
                              />
                            ) : null}
                          </Link>
                        );
                      })}
                    </div>
                  ) : null}
                </div>
              );
            })}
          </div>
        </div>

        {/* Book Appointment CTA Button */}
        <Link
          href="/#book-appointment"
          className="inline-flex h-11 w-full items-center justify-center gap-2 rounded-xl bg-red-600 px-6 text-sm font-bold text-white shadow-lg shadow-red-600/25 transition-all hover:-translate-y-0.5 hover:bg-red-700 hover:shadow-xl"
        >
          <Calendar className="h-4 w-4" />
          Book Appointment
          <ArrowRight className="h-4 w-4" />
        </Link>
      </div>
    </aside>
  );
}
