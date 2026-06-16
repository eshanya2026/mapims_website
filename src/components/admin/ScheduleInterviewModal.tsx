"use client";

import { useState } from "react";
import { CalendarClock, Send } from "lucide-react";
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogHeader,
  DialogTitle,
} from "@/components/ui/dialog";
import { cn } from "@/lib/utils";

type ScheduleInterviewModalProps = {
  open: boolean;
  onOpenChange: (open: boolean) => void;
  inquiryId: string;
  candidateName: string;
  onScheduled?: (updated?: Record<string, unknown>) => void | Promise<void>;
};

type FormState = {
  date: string;
  time: string;
  interviewer: string;
  mode: "online" | "offline";
  notifyCandidate: boolean;
};

const INITIAL_STATE: FormState = {
  date: "",
  time: "",
  interviewer: "",
  mode: "offline",
  notifyCandidate: true,
};

export default function ScheduleInterviewModal({
  open,
  onOpenChange,
  inquiryId,
  candidateName,
  onScheduled,
}: ScheduleInterviewModalProps) {
  const [state, setState] = useState<FormState>(INITIAL_STATE);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState("");

  function resetForm() {
    setState(INITIAL_STATE);
    setError("");
  }

  function handleOpenChange(nextOpen: boolean) {
    if (!nextOpen && !loading) {
      resetForm();
    }
    onOpenChange(nextOpen);
  }

  async function onSubmit(event: React.FormEvent) {
    event.preventDefault();
    setError("");

    if (!state.date || !state.time || state.interviewer.trim().length < 2) {
      setError("Please fill in date, time, and interviewer.");
      return;
    }

    setLoading(true);

    const response = await fetch(`/api/admin/inquiries/${inquiryId}`, {
      method: "PATCH",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({
        status: "interview_scheduled",
        interview: {
          date: state.date,
          time: state.time,
          interviewer: state.interviewer.trim(),
          mode: state.mode,
          notifyCandidate: state.notifyCandidate,
        },
      }),
    });

    setLoading(false);

    if (!response.ok) {
      const data = await response.json().catch(() => ({}));
      setError(typeof data.error === "string" ? data.error : "Unable to schedule interview.");
      return;
    }

    resetForm();
    handleOpenChange(false);
    const updated = await response.json();
    await onScheduled?.(updated);
  }

  const inputClass =
    "w-full rounded-xl border border-slate-200 bg-white px-3.5 py-2.5 text-sm text-slate-900 outline-none transition-colors focus:border-red-500 focus:ring-2 focus:ring-red-600/15";

  return (
    <Dialog open={open} onOpenChange={handleOpenChange}>
      <DialogContent className="max-h-[90vh] overflow-y-auto sm:max-w-lg">
        <DialogHeader>
          <DialogTitle className="text-lg font-bold text-slate-900">
            Schedule interview
          </DialogTitle>
          <DialogDescription className="text-slate-600">
            {candidateName}
          </DialogDescription>
        </DialogHeader>

        <form onSubmit={onSubmit} className="space-y-4">
          <div className="grid grid-cols-1 gap-4 sm:grid-cols-2">
            <div>
              <label className="mb-1.5 block text-sm font-semibold text-slate-900" htmlFor="interview-date">
                Date <span className="text-red-600">*</span>
              </label>
              <input
                id="interview-date"
                type="date"
                value={state.date}
                onChange={(e) => setState((prev) => ({ ...prev, date: e.target.value }))}
                className={inputClass}
                required
              />
            </div>

            <div>
              <label className="mb-1.5 block text-sm font-semibold text-slate-900" htmlFor="interview-time">
                Time <span className="text-red-600">*</span>
              </label>
              <input
                id="interview-time"
                type="time"
                value={state.time}
                onChange={(e) => setState((prev) => ({ ...prev, time: e.target.value }))}
                className={inputClass}
                required
              />
            </div>
          </div>

          <div>
            <label className="mb-1.5 block text-sm font-semibold text-slate-900" htmlFor="interview-interviewer">
              Interviewer <span className="text-red-600">*</span>
            </label>
            <input
              id="interview-interviewer"
              value={state.interviewer}
              onChange={(e) => setState((prev) => ({ ...prev, interviewer: e.target.value }))}
              className={inputClass}
              placeholder="e.g. Dr. Ramesh / HR Manager"
              required
            />
          </div>

          <fieldset>
            <legend className="mb-2 block text-sm font-semibold text-slate-900">
              Mode <span className="text-red-600">*</span>
            </legend>
            <div className="grid grid-cols-2 gap-3">
              {(["online", "offline"] as const).map((mode) => (
                <label
                  key={mode}
                  className={cn(
                    "flex cursor-pointer items-center justify-center gap-2 rounded-xl border px-4 py-3 text-sm font-medium transition-colors",
                    state.mode === mode
                      ? "border-red-500 bg-red-50 text-red-700"
                      : "border-slate-200 bg-white text-slate-700 hover:border-slate-300"
                  )}
                >
                  <input
                    type="radio"
                    name="interview-mode"
                    value={mode}
                    checked={state.mode === mode}
                    onChange={() => setState((prev) => ({ ...prev, mode }))}
                    className="sr-only"
                  />
                  {mode === "online" ? "Online" : "Offline"}
                </label>
              ))}
            </div>
          </fieldset>

          <label className="flex cursor-pointer items-start gap-3 rounded-xl border border-slate-200 bg-slate-50 px-4 py-3">
            <input
              type="checkbox"
              checked={state.notifyCandidate}
              onChange={(e) =>
                setState((prev) => ({ ...prev, notifyCandidate: e.target.checked }))
              }
              className="mt-0.5 h-4 w-4 rounded border-slate-300 text-red-600 focus:ring-red-500"
            />
            <span className="text-sm text-slate-700">
              Send email notification to candidate with interview details
            </span>
          </label>

          {error ? (
            <p className="rounded-xl border border-red-200 bg-red-50 px-4 py-3 text-sm text-red-700">
              {error}
            </p>
          ) : null}

          <button
            type="submit"
            disabled={loading}
            className="inline-flex w-full items-center justify-center gap-2 rounded-full bg-red-600 px-6 py-3 text-sm font-semibold text-white shadow-md shadow-red-600/25 transition-all hover:bg-red-700 disabled:cursor-not-allowed disabled:opacity-70"
          >
            {loading ? (
              <>
                <CalendarClock className="h-4 w-4" />
                Saving...
              </>
            ) : (
              <>
                <Send className="h-4 w-4" />
                Save & mark interview scheduled
              </>
            )}
          </button>
        </form>
      </DialogContent>
    </Dialog>
  );
}
