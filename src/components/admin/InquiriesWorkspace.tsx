"use client";

import { useCallback, useEffect, useMemo, useRef, useState } from "react";
import {
  Briefcase,
  Calendar,
  FileText,
  Globe,
  Inbox,
  Mail,
  Phone,
  Search,
} from "lucide-react";
import { formTypeLabels } from "@/lib/form-type-labels";
import {
  getInquiryStatusClassName,
  getInquiryStatusLabel,
  matchesQuickStatusFilter,
  QUICK_STATUS_FILTERS,
  shouldShowProminentInterviewDetails,
  type QuickStatusFilter,
} from "@/lib/inquiry-status";
import { toInquiryRecord } from "@/lib/inquiry-record";
import InquiryActions from "@/components/admin/InquiryActions";
import type { InquiryRecord } from "@/types/inquiry";
import {
  formatDisplayDate,
  formatDisplayDateLong,
  formatDisplayDateTime,
  formatDisplayListTime,
  formatDisplayTime,
} from "@/lib/format-display-date";
import { cn } from "@/lib/utils";

import type { EnquiryFilter } from "@/lib/admin-roles";

const POLL_INTERVAL_MS = 5000;

const filters = [
  { value: "all", label: "All" },
  { value: "appointment", label: "Appointments" },
  { value: "contact", label: "Contact" },
  { value: "international", label: "International" },
  { value: "career", label: "Careers" },
] as const;

type FilterValue = (typeof filters)[number]["value"];

type EnquiriesWorkspaceProps = {
  initialEnquiries: InquiryRecord[];
  initialFilter: FilterValue;
  allowedFilters: EnquiryFilter[];
};

function formatDate(value: string) {
  return formatDisplayDateTime(value);
}

function formatListTime(value: string) {
  return formatDisplayListTime(value);
}

function formatPreferredDate(value: string | null) {
  if (!value) return "—";
  return formatDisplayDate(value);
}

function formatInterviewDate(value: string | null) {
  return formatDisplayDateLong(value);
}

function formatInterviewMode(value: InquiryRecord["interviewMode"]) {
  if (value === "online") return "Online";
  if (value === "offline") return "Offline";
  return "—";
}

function initials(name: string) {
  return name
    .split(/\s+/)
    .filter(Boolean)
    .slice(0, 2)
    .map((part) => part[0]?.toUpperCase() ?? "")
    .join("");
}

function previewText(enquiry: InquiryRecord) {
  if (enquiry.type === "job_application") {
    if (enquiry.referenceId) return enquiry.referenceId;
    if (enquiry.jobTitle) return enquiry.jobTitle;
  }
  if (enquiry.type === "appointment" && enquiry.department) return enquiry.department;
  return enquiry.message?.slice(0, 80) ?? "No message";
}

function DetailRow({ label, value }: { label: string; value: React.ReactNode }) {
  if (!value) return null;
  return (
    <div className="grid gap-1 border-b border-slate-100 py-3 sm:grid-cols-[140px_1fr]">
      <dt className="text-xs font-semibold uppercase tracking-wide text-slate-400">{label}</dt>
      <dd className="text-sm text-slate-800">{value}</dd>
    </div>
  );
}

function InterviewBlock({ enquiry }: { enquiry: InquiryRecord }) {
  if (!enquiry.interviewDate && !enquiry.interviewTime) return null;
  if (!shouldShowProminentInterviewDetails(enquiry.status)) return null;

  return (
    <div className="mt-4 rounded-xl border border-blue-200 bg-blue-50 p-4">
      <p className="text-sm font-semibold text-blue-900">Interview details</p>
      <dl className="mt-3 space-y-2 text-sm text-slate-700">
        <div className="flex justify-between gap-4">
          <span className="text-slate-500">Date</span>
          <span className="text-right font-medium">{formatInterviewDate(enquiry.interviewDate)}</span>
        </div>
        {enquiry.interviewTime ? (
          <div className="flex justify-between gap-4">
            <span className="text-slate-500">Time</span>
            <span className="font-medium">{enquiry.interviewTime}</span>
          </div>
        ) : null}
        {enquiry.interviewInterviewer ? (
          <div className="flex justify-between gap-4">
            <span className="text-slate-500">Interviewer</span>
            <span className="text-right font-medium">{enquiry.interviewInterviewer}</span>
          </div>
        ) : null}
        <div className="flex justify-between gap-4">
          <span className="text-slate-500">Mode</span>
          <span className="font-medium">{formatInterviewMode(enquiry.interviewMode)}</span>
        </div>
      </dl>
    </div>
  );
}

export default function EnquiriesWorkspace({
  initialEnquiries,
  initialFilter,
  allowedFilters,
}: EnquiriesWorkspaceProps) {
  const visibleFilters = useMemo(
    () => filters.filter((filter) => allowedFilters.includes(filter.value)),
    [allowedFilters]
  );
  const [enquiries, setEnquiries] = useState(initialEnquiries);
  const [activeFilter, setActiveFilter] = useState<FilterValue>(initialFilter);
  const [selectedId, setSelectedId] = useState<string | null>(
    initialEnquiries[0]?.id ?? null
  );
  const [search, setSearch] = useState("");
  const [activeStatusFilter, setActiveStatusFilter] = useState<QuickStatusFilter>("all");
  const [highlightIds, setHighlightIds] = useState<Set<string>>(new Set());
  const [lastSyncedAt, setLastSyncedAt] = useState<Date | null>(null);
  const [isPolling, setIsPolling] = useState(true);
  const knownIdsRef = useRef(new Set(initialEnquiries.map((item) => item.id)));

  const applyEnquiries = useCallback((next: InquiryRecord[]) => {
    const newIds = next
      .filter((item) => !knownIdsRef.current.has(item.id))
      .map((item) => item.id);

    knownIdsRef.current = new Set(next.map((item) => item.id));
    setEnquiries(next);
    setLastSyncedAt(new Date());

    if (newIds.length > 0) {
      setHighlightIds(new Set(newIds));
      window.setTimeout(() => setHighlightIds(new Set()), 4000);
    }
  }, []);

  const fetchEnquiries = useCallback(async () => {
    const query =
      activeFilter === "all" ? "" : `?type=${encodeURIComponent(activeFilter)}`;
    const response = await fetch(`/api/admin/inquiries${query}`, {
      cache: "no-store",
    });

    if (!response.ok) return;

    const data = (await response.json()) as InquiryRecord[];
    applyEnquiries(data);
  }, [activeFilter, applyEnquiries]);

  const handleInquiryUpdated = useCallback(
    async (updated?: Record<string, unknown>) => {
      if (updated?.id) {
        const next = toInquiryRecord(updated);
        setEnquiries((prev) =>
          prev.map((item) => (item.id === next.id ? next : item))
        );
      }
      await fetchEnquiries();
    },
    [fetchEnquiries]
  );

  useEffect(() => {
    setEnquiries(initialEnquiries);
    knownIdsRef.current = new Set(initialEnquiries.map((item) => item.id));
    setActiveFilter(initialFilter);
    setActiveStatusFilter("all");
    setSelectedId(initialEnquiries[0]?.id ?? null);
  }, [initialFilter, initialEnquiries]);

  useEffect(() => {
    setActiveStatusFilter("all");
  }, [activeFilter]);

  useEffect(() => {
    void fetchEnquiries();
  }, [fetchEnquiries]);

  useEffect(() => {
    function handleVisibility() {
      setIsPolling(document.visibilityState === "visible");
      if (document.visibilityState === "visible") {
        void fetchEnquiries();
      }
    }

    document.addEventListener("visibilitychange", handleVisibility);
    return () => document.removeEventListener("visibilitychange", handleVisibility);
  }, [fetchEnquiries]);

  useEffect(() => {
    if (!isPolling) return;

    const intervalId = window.setInterval(() => {
      void fetchEnquiries();
    }, POLL_INTERVAL_MS);

    return () => window.clearInterval(intervalId);
  }, [fetchEnquiries, isPolling]);

  const statusCounts = useMemo(() => {
    const counts: Record<QuickStatusFilter, number> = {
      all: enquiries.length,
      new: 0,
      pending: 0,
      confirmed: 0,
      completed: 0,
    };

    for (const item of enquiries) {
      for (const filter of QUICK_STATUS_FILTERS) {
        if (
          filter.value !== "all" &&
          matchesQuickStatusFilter(item.type, item.status, filter.value)
        ) {
          counts[filter.value]++;
        }
      }
    }

    return counts;
  }, [enquiries]);

  const filteredEnquiries = useMemo(() => {
    let list = enquiries;

    if (activeStatusFilter !== "all") {
      list = list.filter((item) =>
        matchesQuickStatusFilter(item.type, item.status, activeStatusFilter)
      );
    }

    const query = search.trim().toLowerCase();
    if (!query) return list;

    return list.filter((item) => {
      return (
        item.name.toLowerCase().includes(query) ||
        item.email?.toLowerCase().includes(query) ||
        item.phone?.toLowerCase().includes(query) ||
        item.jobTitle?.toLowerCase().includes(query)
      );
    });
  }, [enquiries, search, activeStatusFilter]);

  useEffect(() => {
    if (filteredEnquiries.length === 0) {
      setSelectedId(null);
      return;
    }

    if (!selectedId || !filteredEnquiries.some((item) => item.id === selectedId)) {
      setSelectedId(filteredEnquiries[0].id);
    }
  }, [filteredEnquiries, selectedId]);

  const selected = filteredEnquiries.find((item) => item.id === selectedId) ?? null;
  const newCount = enquiries.filter((item) => item.status === "new").length;

  return (
    <div className="flex h-[calc(100vh-0px)] flex-col bg-slate-100">
      <header className="shrink-0 border-b border-slate-200 bg-white px-4 py-4 sm:px-6">
        <div className="flex flex-col gap-4 lg:flex-row lg:items-center lg:justify-between">
          <div>
            <h1 className="text-xl font-bold text-slate-900 sm:text-2xl">Enquiries</h1>
            <p className="mt-0.5 text-sm text-slate-500">
              {enquiries.length} total
              {newCount > 0 ? ` · ${newCount} new` : ""}
              {lastSyncedAt ? ` · synced ${formatDisplayTime(lastSyncedAt)}` : ""}
            </p>
          </div>

          <div className="flex flex-col gap-3 sm:flex-row sm:items-start sm:justify-end">
            <div className="flex min-w-0 flex-col gap-2">
              <div className="relative min-w-[220px]">
                <Search className="pointer-events-none absolute left-3 top-1/2 h-4 w-4 -translate-y-1/2 text-slate-400" />
                <input
                  value={search}
                  onChange={(e) => setSearch(e.target.value)}
                  placeholder="Search name, email, role..."
                  className="w-full rounded-xl border border-slate-200 bg-slate-50 py-2.5 pl-10 pr-3 text-sm outline-none transition-colors focus:border-red-400 focus:bg-white focus:ring-2 focus:ring-red-500/15"
                />
              </div>

              <div className="flex gap-1.5 overflow-x-auto pb-0.5">
                {QUICK_STATUS_FILTERS.map((filter) => {
                  const count = statusCounts[filter.value];
                  const isActive = activeStatusFilter === filter.value;

                  return (
                    <button
                      key={filter.value}
                      type="button"
                      onClick={() => setActiveStatusFilter(filter.value)}
                      className={cn(
                        "inline-flex shrink-0 items-center gap-1.5 rounded-full px-3 py-1.5 text-xs font-medium transition-colors",
                        isActive
                          ? "bg-red-600 text-white shadow-sm"
                          : "bg-slate-100 text-slate-600 hover:bg-slate-200 hover:text-slate-900"
                      )}
                    >
                      {filter.label}
                      <span
                        className={cn(
                          "rounded-full px-1.5 py-0.5 text-[10px] font-semibold tabular-nums",
                          isActive ? "bg-white/20 text-white" : "bg-white text-slate-500"
                        )}
                      >
                        {count}
                      </span>
                    </button>
                  );
                })}
              </div>
            </div>

            <span
              className={cn(
                "inline-flex shrink-0 items-center justify-center gap-1.5 self-start rounded-full px-3 py-1.5 text-xs font-medium sm:mt-2",
                isPolling
                  ? "bg-emerald-50 text-emerald-700 ring-1 ring-emerald-200"
                  : "bg-slate-100 text-slate-600"
              )}
            >
              <span
                className={cn(
                  "h-2 w-2 rounded-full",
                  isPolling ? "animate-pulse bg-emerald-500" : "bg-slate-400"
                )}
              />
              Live
            </span>
          </div>
        </div>

        <div className="mt-4 flex gap-1 overflow-x-auto border-b border-slate-200">
          {visibleFilters.map((filter) => (
            <button
              key={filter.value}
              type="button"
              onClick={() => setActiveFilter(filter.value)}
              className={cn(
                "shrink-0 border-b-2 px-4 py-2.5 text-sm font-medium transition-colors",
                activeFilter === filter.value
                  ? "border-red-600 text-red-600"
                  : "border-transparent text-slate-500 hover:text-slate-800"
              )}
            >
              {filter.label}
            </button>
          ))}
        </div>
      </header>

      <div className="flex min-h-0 flex-1 flex-col lg:flex-row">
        <aside
          className={cn(
            "flex w-full flex-col border-b border-slate-200 bg-white lg:w-[360px] lg:shrink-0 lg:border-b-0 lg:border-r",
            selected && "hidden lg:flex"
          )}
        >
          {filteredEnquiries.length === 0 ? (
            <div className="flex flex-1 flex-col items-center justify-center px-6 py-16 text-center">
              <Inbox className="mb-3 h-10 w-10 text-slate-300" />
              <p className="font-medium text-slate-700">No enquiries found</p>
              <p className="mt-1 text-sm text-slate-500">Try a different filter or search.</p>
            </div>
          ) : (
            <ul className="divide-y divide-slate-100 overflow-y-auto">
              {filteredEnquiries.map((enquiry) => {
                const isSelected = enquiry.id === selectedId;
                const isNew = enquiry.status === "new";

                return (
                  <li key={enquiry.id}>
                    <button
                      type="button"
                      onClick={() => setSelectedId(enquiry.id)}
                      className={cn(
                        "flex w-full gap-3 px-4 py-4 text-left transition-colors",
                        isSelected ? "bg-red-50" : "hover:bg-slate-50",
                        highlightIds.has(enquiry.id) && !isSelected && "bg-amber-50/70"
                      )}
                    >
                      <div
                        className={cn(
                          "flex h-10 w-10 shrink-0 items-center justify-center rounded-full text-sm font-bold",
                          isSelected
                            ? "bg-red-600 text-white"
                            : "bg-slate-200 text-slate-700"
                        )}
                      >
                        {initials(enquiry.name)}
                      </div>

                      <div className="min-w-0 flex-1">
                        <div className="flex items-start justify-between gap-2">
                          <p
                            className={cn(
                              "truncate text-sm",
                              isNew ? "font-bold text-slate-900" : "font-semibold text-slate-800"
                            )}
                          >
                            {enquiry.name}
                          </p>
                          <span className="shrink-0 text-[11px] text-slate-400">
                            {formatListTime(enquiry.createdAt)}
                          </span>
                        </div>
                        <p className="mt-0.5 truncate text-xs text-slate-500">
                          {previewText(enquiry)}
                        </p>
                        <div className="mt-2 flex flex-wrap items-center gap-1.5">
                          <span className="rounded-md bg-slate-100 px-2 py-0.5 text-[10px] font-semibold uppercase tracking-wide text-slate-600">
                            {formTypeLabels[enquiry.type] ?? enquiry.type}
                          </span>
                          <span
                            className={cn(
                              "rounded-md px-2 py-0.5 text-[10px] font-semibold",
                              getInquiryStatusClassName(enquiry.type, enquiry.status)
                            )}
                          >
                            {getInquiryStatusLabel(enquiry.type, enquiry.status)}
                          </span>
                        </div>
                      </div>
                    </button>
                  </li>
                );
              })}
            </ul>
          )}
        </aside>

        <main
          className={cn(
            "min-w-0 flex-1 overflow-y-auto bg-slate-50",
            !selected && "hidden lg:block"
          )}
        >
          {!selected ? (
            <div className="flex h-full flex-col items-center justify-center px-6 py-20 text-center">
              <Mail className="mb-4 h-12 w-12 text-slate-300" />
              <p className="text-lg font-medium text-slate-700">Select an enquiry</p>
              <p className="mt-1 text-sm text-slate-500">
                Choose a submission from the list to view details and take action.
              </p>
            </div>
          ) : (
            <div className="mx-auto max-w-3xl p-4 sm:p-6 lg:p-8">
              <button
                type="button"
                onClick={() => setSelectedId(null)}
                className="mb-4 text-sm font-medium text-red-600 lg:hidden"
              >
                ← Back to list
              </button>

              <div className="overflow-hidden rounded-2xl border border-slate-200 bg-white shadow-sm">
                <div className="border-b border-slate-100 px-5 py-5 sm:px-6">
                  <div className="flex flex-wrap items-start justify-between gap-4">
                    <div className="flex items-start gap-4">
                      <div className="flex h-14 w-14 items-center justify-center rounded-2xl bg-red-600 text-lg font-bold text-white">
                        {initials(selected.name)}
                      </div>
                      <div>
                        <h2 className="text-xl font-bold text-slate-900">{selected.name}</h2>
                        <p className="mt-1 text-sm text-slate-500">{formatDate(selected.createdAt)}</p>
                        <div className="mt-3 flex flex-wrap gap-2">
                          <span className="rounded-full bg-slate-100 px-3 py-1 text-xs font-semibold text-slate-700">
                            {formTypeLabels[selected.type] ?? selected.type}
                          </span>
                          <span
                            className={cn(
                              "rounded-full px-3 py-1 text-xs font-semibold",
                              getInquiryStatusClassName(selected.type, selected.status)
                            )}
                          >
                            {getInquiryStatusLabel(selected.type, selected.status)}
                          </span>
                        </div>
                      </div>
                    </div>
                  </div>
                </div>

                <div className="grid gap-0 px-5 sm:grid-cols-2 sm:px-6">
                  <div className="border-b border-slate-100 py-4 sm:border-b-0 sm:border-r sm:pr-6">
                    <p className="mb-2 flex items-center gap-2 text-xs font-semibold uppercase tracking-wide text-slate-400">
                      <Phone className="h-3.5 w-3.5" /> Phone
                    </p>
                    <p className="text-sm font-medium text-slate-900">{selected.phone ?? "—"}</p>
                  </div>
                  <div className="border-b border-slate-100 py-4 sm:pl-6">
                    <p className="mb-2 flex items-center gap-2 text-xs font-semibold uppercase tracking-wide text-slate-400">
                      <Mail className="h-3.5 w-3.5" /> Email
                    </p>
                    <p className="break-all text-sm font-medium text-slate-900">
                      {selected.email ?? "—"}
                    </p>
                  </div>
                </div>

                <div className="px-5 py-2 sm:px-6">
                  <dl>
                    {selected.type === "appointment" ? (
                      <>
                        <DetailRow label="Department" value={selected.department} />
                        <DetailRow
                          label="Preferred slot"
                          value={`${formatPreferredDate(selected.preferredDate)} at ${selected.preferredTime ?? "—"}`}
                        />
                        <DetailRow
                          label="Appointment ID"
                          value={
                            selected.referenceId ? (
                              <span className="font-mono text-red-700">{selected.referenceId}</span>
                            ) : null
                          }
                        />
                      </>
                    ) : null}

                    {selected.type === "international" ? (
                      <>
                        <DetailRow label="Country" value={selected.country} />
                        <DetailRow label="Condition" value={selected.medicalCondition} />
                      </>
                    ) : null}

                    {selected.type === "job_application" ? (
                      <>
                        <DetailRow
                          label="Application ID"
                          value={
                            selected.referenceId ? (
                              <span className="font-mono text-red-700">{selected.referenceId}</span>
                            ) : null
                          }
                        />
                        <DetailRow label="Position" value={selected.jobTitle} />
                        <DetailRow label="Address" value={selected.address} />
                        <DetailRow
                          label="Resume"
                          value={
                            selected.resumeUrl ? (
                              <a
                                href={selected.resumeUrl}
                                target="_blank"
                                rel="noopener noreferrer"
                                className="inline-flex items-center gap-1.5 font-medium text-red-600 hover:underline"
                              >
                                <FileText className="h-4 w-4" />
                                View resume
                              </a>
                            ) : null
                          }
                        />
                      </>
                    ) : null}

                    <DetailRow
                      label="Message"
                      value={
                        selected.message ? (
                          <p className="whitespace-pre-wrap leading-relaxed text-slate-600">
                            {selected.message}
                          </p>
                        ) : null
                      }
                    />
                  </dl>

                  <InterviewBlock enquiry={selected} />
                </div>

                <div className="border-t border-slate-100 bg-slate-50 px-5 py-5 sm:px-6">
                  <p className="mb-3 text-xs font-semibold uppercase tracking-wide text-slate-500">
                    Actions
                  </p>
                  <InquiryActions
                    id={selected.id}
                    type={selected.type}
                    status={selected.status}
                    candidateName={selected.name}
                    onUpdated={handleInquiryUpdated}
                  />
                </div>
              </div>
            </div>
          )}
        </main>
      </div>
    </div>
  );
}
