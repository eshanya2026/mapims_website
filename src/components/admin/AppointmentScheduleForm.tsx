"use client";

import { useState } from "react";
import Link from "next/link";
import { useRouter } from "next/navigation";
import { ArrowLeft, CalendarClock, X } from "lucide-react";

import {
  getPresetOptionsForDay,
  SCHEDULE_DAY_KEYS,
  SCHEDULE_DAY_LABELS,
  type DaySlotsMap,
  normalizeTimeSlotInput,
  sortTimeSlots,
} from "@/lib/appointment-schedule-config";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Textarea } from "@/components/ui/textarea";
import { cn } from "@/lib/utils";

type AppointmentScheduleFormProps = {
  departmentSlug: string;
  departmentName: string;
  initial: {
    enabled: boolean;
    daySlots: DaySlotsMap;
    advanceDays: number;
    notes: string;
  };
};

function SlotToggleGrid({
  label,
  options,
  selected,
  onChange,
}: {
  label: string;
  options: readonly string[];
  selected: string[];
  onChange: (next: string[]) => void;
}) {
  const [customInput, setCustomInput] = useState("");
  const [customError, setCustomError] = useState("");
  const selectedSet = new Set(selected);
  const presetSet = new Set(options);
  const customSlots = selected.filter((slot) => !presetSet.has(slot));

  function toggleSlot(slot: string) {
    if (selectedSet.has(slot)) {
      onChange(selected.filter((value) => value !== slot));
      return;
    }
    onChange(sortTimeSlots([...selected, slot]));
  }

  function removeSlot(slot: string) {
    onChange(selected.filter((value) => value !== slot));
  }

  function addCustomSlot() {
    const normalized = normalizeTimeSlotInput(customInput);
    if (!normalized) {
      setCustomError("Use format like 08:30 AM or 2:15 PM");
      return;
    }

    if (selectedSet.has(normalized)) {
      setCustomError("This time is already added.");
      return;
    }

    onChange(sortTimeSlots([...selected, normalized]));
    setCustomInput("");
    setCustomError("");
  }

  return (
    <div className="rounded-xl border border-slate-100 bg-slate-50/50 p-4 sm:p-5">
      <div className="flex flex-col gap-4 lg:flex-row lg:items-start">
        <div className="shrink-0 lg:w-40 xl:w-44">
          <p className="text-sm font-semibold text-slate-900">{label}</p>
          <div className="mt-2 flex flex-wrap gap-x-3 gap-y-1">
            <button
              type="button"
              onClick={() => onChange(sortTimeSlots([...new Set([...selected, ...options])]))}
              className="text-xs font-semibold text-red-600 hover:underline"
            >
              Select all
            </button>
            <button
              type="button"
              onClick={() => onChange([])}
              className="text-xs font-semibold text-slate-500 hover:underline"
            >
              Clear
            </button>
          </div>
        </div>

        <div className="min-w-0 flex-1 space-y-4">
          <div className="flex flex-wrap gap-2">
            {options.map((slot) => {
              const isSelected = selectedSet.has(slot);
              return (
                <button
                  key={slot}
                  type="button"
                  onClick={() => toggleSlot(slot)}
                  className={cn(
                    "shrink-0 rounded-full border px-3 py-2 text-sm font-semibold transition-colors",
                    isSelected
                      ? "border-red-600 bg-red-600 text-white"
                      : "border-slate-200 bg-white text-slate-700 hover:border-red-200 hover:bg-red-50"
                  )}
                >
                  {slot}
                </button>
              );
            })}

            {customSlots.map((slot) => (
              <span
                key={slot}
                className="inline-flex shrink-0 items-center gap-1 rounded-full border border-red-200 bg-red-50 px-3 py-2 text-sm font-semibold text-red-700"
              >
                {slot}
                <button
                  type="button"
                  onClick={() => removeSlot(slot)}
                  className="rounded-full p-0.5 hover:bg-red-100"
                  aria-label={`Remove ${slot}`}
                >
                  <X className="h-3.5 w-3.5" />
                </button>
              </span>
            ))}
          </div>

          <div className="rounded-xl border border-dashed border-slate-200 bg-white p-3 sm:p-4">
            <p className="mb-2 text-xs font-semibold uppercase tracking-wide text-slate-500">
              Add custom time
            </p>
            <div className="flex flex-col gap-2 sm:flex-row sm:items-center">
              <Input
                value={customInput}
                onChange={(event) => {
                  setCustomInput(event.target.value);
                  if (customError) setCustomError("");
                }}
                onKeyDown={(event) => {
                  if (event.key === "Enter") {
                    event.preventDefault();
                    addCustomSlot();
                  }
                }}
                placeholder="e.g. 08:30 AM or 2:15 PM"
                className="rounded-xl bg-slate-50 sm:max-w-xs"
              />
              <Button
                type="button"
                variant="outline"
                className="rounded-xl"
                onClick={addCustomSlot}
              >
                Add time
              </Button>
            </div>
            {customError ? (
              <p className="mt-2 text-xs text-red-600">{customError}</p>
            ) : (
              <p className="mt-2 text-xs text-slate-500">
                Type any time not listed. Use 12-hour format with AM or PM.
              </p>
            )}
          </div>
        </div>
      </div>
    </div>
  );
}

export default function AppointmentScheduleForm({
  departmentSlug,
  departmentName,
  initial,
}: AppointmentScheduleFormProps) {
  const router = useRouter();
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState("");
  const [form, setForm] = useState(initial);

  async function handleSubmit(event: React.FormEvent<HTMLFormElement>) {
    event.preventDefault();
    setLoading(true);
    setError("");

    try {
      const response = await fetch("/api/admin/appointment-schedules", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({
          departmentSlug,
          enabled: form.enabled,
          daySlots: form.daySlots,
          advanceDays: form.advanceDays,
          notes: form.notes,
        }),
      });

      const data = await response.json().catch(() => ({}));
      if (!response.ok) {
        throw new Error(
          typeof data.error === "string" ? data.error : "Failed to save schedule."
        );
      }

      router.push("/admin/appointment-schedules");
      router.refresh();
    } catch (submitError) {
      setError(
        submitError instanceof Error ? submitError.message : "Failed to save schedule."
      );
    } finally {
      setLoading(false);
    }
  }

  return (
    <div className="space-y-6 p-8">
      <div className="flex items-center gap-3">
        <Link
          href="/admin/appointment-schedules"
          className="inline-flex h-8 items-center justify-center rounded-lg border border-slate-200 bg-white px-3 text-sm font-medium text-slate-700 hover:bg-slate-50"
        >
          <ArrowLeft className="mr-2 h-4 w-4" />
          Back
        </Link>
      </div>

      <div>
        <div className="flex items-center gap-2 text-red-600">
          <CalendarClock className="h-5 w-5" />
          <p className="text-xs font-semibold uppercase tracking-wider">Appointment Schedules</p>
        </div>
        <h1 className="mt-2 text-2xl font-bold text-slate-900">{departmentName}</h1>
        <p className="mt-1 text-sm text-slate-600">
          Set doctor availability for each day of the week. Leave a day empty if the department
          is closed.
        </p>
      </div>

      <form
        onSubmit={handleSubmit}
        className="space-y-6 rounded-2xl border border-slate-200 bg-white p-6 shadow-sm"
      >
        <label className="flex items-center gap-3 rounded-xl border border-slate-200 bg-slate-50 px-4 py-3">
          <input
            type="checkbox"
            checked={form.enabled}
            onChange={(event) =>
              setForm((current) => ({ ...current, enabled: event.target.checked }))
            }
            className="h-4 w-4 rounded border-slate-300 text-red-600 focus:ring-red-600"
          />
          <span className="text-sm font-semibold text-slate-900">
            Enable online appointments for this department
          </span>
        </label>

        <div className="grid gap-4 sm:grid-cols-[180px_1fr] sm:items-center">
          <label htmlFor="advance-days" className="text-sm font-semibold text-slate-700">
            Booking window (days)
          </label>
          <Input
            id="advance-days"
            type="number"
            min={1}
            max={30}
            value={form.advanceDays}
            onChange={(event) =>
              setForm((current) => ({
                ...current,
                advanceDays: Number(event.target.value) || 1,
              }))
            }
            className="max-w-xs rounded-xl"
          />
        </div>

        <div className="space-y-4">
          <div>
            <h2 className="text-sm font-semibold text-slate-900">Weekly availability</h2>
            <p className="mt-1 text-xs text-slate-500">
              Configure time slots separately for each day based on doctor OPD schedules.
            </p>
          </div>

          {SCHEDULE_DAY_KEYS.map((dayKey) => (
            <SlotToggleGrid
              key={dayKey}
              label={SCHEDULE_DAY_LABELS[dayKey]}
              options={getPresetOptionsForDay(dayKey)}
              selected={form.daySlots[dayKey]}
              onChange={(slots) =>
                setForm((current) => ({
                  ...current,
                  daySlots: { ...current.daySlots, [dayKey]: slots },
                }))
              }
            />
          ))}
        </div>

        <div className="space-y-2">
          <label htmlFor="schedule-notes" className="text-sm font-semibold text-slate-700">
            Internal notes
          </label>
          <Textarea
            id="schedule-notes"
            rows={3}
            value={form.notes}
            onChange={(event) =>
              setForm((current) => ({ ...current, notes: event.target.value }))
            }
            placeholder="Optional notes for front office staff (not shown on the website)."
            className="rounded-xl"
          />
        </div>

        {error ? (
          <p className="rounded-lg bg-red-50 px-3 py-2 text-sm text-red-600">{error}</p>
        ) : null}

        <div className="flex flex-wrap gap-3">
          <Button
            type="submit"
            disabled={loading}
            className="h-11 min-w-36 rounded-xl px-4 bg-red-600 hover:bg-red-600/90"
          >
            {loading ? "Saving..." : "Save schedule"}
          </Button>
          <Link
            href="/admin/appointment-schedules"
            className="inline-flex h-11 min-w-36 items-center justify-center rounded-xl border border-slate-200 bg-white px-4 text-sm font-medium text-slate-700 hover:bg-slate-50"
          >
            Cancel
          </Link>
        </div>
      </form>
    </div>
  );
}
