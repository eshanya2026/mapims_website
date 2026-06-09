"use client";

import { useCallback, useEffect, useRef, useState } from "react";
import { formTypeLabels } from "@/lib/form-type-labels";
import InquiryActions from "@/components/admin/InquiryActions";
import type { InquiryRecord } from "@/types/inquiry";
import { cn } from "@/lib/utils";

const POLL_INTERVAL_MS = 5000;

const filters = [
  { value: "all", label: "All" },
  { value: "appointment", label: "Appointments" },
  { value: "contact", label: "Contact" },
  { value: "international", label: "International" },
] as const;

type FilterValue = (typeof filters)[number]["value"];

type InquiriesWorkspaceProps = {
  initialInquiries: InquiryRecord[];
  initialFilter: FilterValue;
};

function formatDate(value: string) {
  return new Date(value).toLocaleString("en-IN", {
    dateStyle: "medium",
    timeStyle: "short",
  });
}

function formatPreferredDate(value: string | null) {
  if (!value) return "—";
  return new Date(value).toLocaleDateString("en-IN");
}

export default function InquiriesWorkspace({
  initialInquiries,
  initialFilter,
}: InquiriesWorkspaceProps) {
  const [inquiries, setInquiries] = useState(initialInquiries);
  const [activeFilter, setActiveFilter] = useState<FilterValue>(initialFilter);
  const [highlightIds, setHighlightIds] = useState<Set<string>>(new Set());
  const [lastSyncedAt, setLastSyncedAt] = useState<Date | null>(null);
  const [isPolling, setIsPolling] = useState(true);
  const knownIdsRef = useRef(new Set(initialInquiries.map((item) => item.id)));

  const applyInquiries = useCallback((next: InquiryRecord[]) => {
    const newIds = next
      .filter((item) => !knownIdsRef.current.has(item.id))
      .map((item) => item.id);

    knownIdsRef.current = new Set(next.map((item) => item.id));
    setInquiries(next);
    setLastSyncedAt(new Date());

    if (newIds.length > 0) {
      setHighlightIds(new Set(newIds));
      window.setTimeout(() => setHighlightIds(new Set()), 4000);
    }
  }, []);

  const fetchInquiries = useCallback(async () => {
    const query =
      activeFilter === "all" ? "" : `?type=${encodeURIComponent(activeFilter)}`;
    const response = await fetch(`/api/admin/inquiries${query}`, {
      cache: "no-store",
    });

    if (!response.ok) return;

    const data = (await response.json()) as InquiryRecord[];
    applyInquiries(data);
  }, [activeFilter, applyInquiries]);

  useEffect(() => {
    setInquiries(initialInquiries);
    knownIdsRef.current = new Set(initialInquiries.map((item) => item.id));
    setActiveFilter(initialFilter);
  }, [initialFilter, initialInquiries]);

  useEffect(() => {
    void fetchInquiries();
  }, [fetchInquiries]);

  useEffect(() => {
    function handleVisibility() {
      setIsPolling(document.visibilityState === "visible");
      if (document.visibilityState === "visible") {
        void fetchInquiries();
      }
    }

    document.addEventListener("visibilitychange", handleVisibility);
    return () => document.removeEventListener("visibilitychange", handleVisibility);
  }, [fetchInquiries]);

  useEffect(() => {
    if (!isPolling) return;

    const intervalId = window.setInterval(() => {
      void fetchInquiries();
    }, POLL_INTERVAL_MS);

    return () => window.clearInterval(intervalId);
  }, [fetchInquiries, isPolling]);

  const newCount = inquiries.filter((item) => item.status === "new").length;

  return (
    <div className="p-8">
      <div className="mb-6 flex flex-col gap-3 sm:flex-row sm:items-start sm:justify-between">
        <div>
          <h1 className="text-2xl font-bold text-slate-900">Form inquiries</h1>
          <p className="mt-1 text-sm text-slate-500">
            Appointments, contact messages, and international patient desk submissions.
            {newCount > 0 ? ` ${newCount} new.` : ""}
          </p>
        </div>

        <div className="flex items-center gap-2 text-xs text-slate-500">
          <span
            className={cn(
              "inline-flex items-center gap-1.5 rounded-full px-2.5 py-1 ring-1 ring-slate-200",
              isPolling ? "bg-emerald-50 text-emerald-700 ring-emerald-200" : "bg-slate-50"
            )}
          >
            <span
              className={cn(
                "h-2 w-2 rounded-full",
                isPolling ? "animate-pulse bg-emerald-500" : "bg-slate-400"
              )}
            />
            {isPolling ? "Live" : "Paused"}
          </span>
          {lastSyncedAt ? (
            <span>Updated {lastSyncedAt.toLocaleTimeString("en-IN")}</span>
          ) : null}
        </div>
      </div>

      <div className="mb-6 flex flex-wrap gap-2">
        {filters.map((filter) => (
          <button
            key={filter.value}
            type="button"
            onClick={() => setActiveFilter(filter.value)}
            className={cn(
              "rounded-full px-4 py-2 text-sm font-medium transition-colors",
              activeFilter === filter.value
                ? "bg-red-600 text-white"
                : "bg-white text-slate-600 ring-1 ring-slate-200 hover:text-red-600"
            )}
          >
            {filter.label}
          </button>
        ))}
      </div>

      <div className="overflow-hidden rounded-xl border border-slate-200 bg-white">
        <table className="w-full text-left text-sm">
          <thead className="border-b border-slate-200 bg-slate-50 text-slate-600">
            <tr>
              <th className="px-4 py-3 font-medium">Date</th>
              <th className="px-4 py-3 font-medium">Type</th>
              <th className="px-4 py-3 font-medium">Name</th>
              <th className="px-4 py-3 font-medium">Contact</th>
              <th className="px-4 py-3 font-medium">Details</th>
              <th className="px-4 py-3 font-medium">Status</th>
              <th className="px-4 py-3 font-medium">Actions</th>
            </tr>
          </thead>
          <tbody>
            {inquiries.map((inquiry) => (
              <tr
                key={inquiry.id}
                className={cn(
                  "border-b border-slate-100 align-top last:border-0 transition-colors",
                  highlightIds.has(inquiry.id) && "bg-amber-50/80"
                )}
              >
                <td className="px-4 py-3 text-slate-500 whitespace-nowrap">
                  {formatDate(inquiry.createdAt)}
                </td>
                <td className="px-4 py-3 text-slate-600">
                  {formTypeLabels[inquiry.type] ?? inquiry.type}
                </td>
                <td className="px-4 py-3 font-medium text-slate-900">{inquiry.name}</td>
                <td className="px-4 py-3 text-slate-600">
                  <div>{inquiry.phone ?? "—"}</div>
                  <div className="text-xs text-slate-400">{inquiry.email ?? "—"}</div>
                </td>
                <td className="max-w-xs px-4 py-3 text-slate-600">
                  {inquiry.type === "appointment" ? (
                    <div className="space-y-1 text-xs">
                      <p>
                        <span className="font-medium text-slate-700">Dept:</span>{" "}
                        {inquiry.department}
                      </p>
                      <p>
                        <span className="font-medium text-slate-700">When:</span>{" "}
                        {formatPreferredDate(inquiry.preferredDate)} at {inquiry.preferredTime}
                      </p>
                      {inquiry.message ? (
                        <p className="line-clamp-2">{inquiry.message}</p>
                      ) : null}
                    </div>
                  ) : null}
                  {inquiry.type === "contact" ? (
                    <p className="line-clamp-3 text-xs">{inquiry.message}</p>
                  ) : null}
                  {inquiry.type === "international" ? (
                    <div className="space-y-1 text-xs">
                      {inquiry.country ? <p>Country: {inquiry.country}</p> : null}
                      {inquiry.medicalCondition ? (
                        <p>Condition: {inquiry.medicalCondition}</p>
                      ) : null}
                      <p className="line-clamp-2">{inquiry.message}</p>
                    </div>
                  ) : null}
                </td>
                <td className="px-4 py-3">
                  <span
                    className={cn(
                      "inline-flex rounded-full px-2.5 py-0.5 text-xs font-semibold capitalize",
                      inquiry.status === "new" && "bg-amber-100 text-amber-700",
                      inquiry.status === "read" && "bg-blue-100 text-blue-700",
                      inquiry.status === "archived" && "bg-slate-100 text-slate-600"
                    )}
                  >
                    {inquiry.status}
                  </span>
                </td>
                <td className="px-4 py-3">
                  <InquiryActions
                    id={inquiry.id}
                    status={inquiry.status}
                    onUpdated={fetchInquiries}
                  />
                </td>
              </tr>
            ))}
          </tbody>
        </table>
        {inquiries.length === 0 ? (
          <p className="px-4 py-12 text-center text-slate-500">No submissions yet.</p>
        ) : null}
      </div>
    </div>
  );
}
