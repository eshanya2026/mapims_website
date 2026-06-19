"use client";

import { useEffect, useMemo } from "react";
import { motion } from "framer-motion";
import { Calendar, Clock } from "lucide-react";

import {
  getAvailableTimeSlotsForDate,
  getBookableTimeSlotsForDate,
  normalizeAppointmentSelection,
} from "@/data/appointment-slots";
import type { DepartmentScheduleConfig } from "@/lib/appointment-schedule-config";
import type { BookedSlotsByDate } from "@/lib/appointment-bookings";
import { cn } from "@/lib/utils";

type AppointmentScheduleFieldsProps = {
  now: Date;
  selectedDate: string;
  selectedTime: string;
  schedule: DepartmentScheduleConfig;
  bookedByDate?: BookedSlotsByDate;
  scheduleLoading?: boolean;
  onDateChange: (date: string) => void;
  onTimeChange: (time: string) => void;
};

function formatSelectedDateLabel(dateKey: string) {
  if (!/^\d{4}-\d{2}-\d{2}$/.test(dateKey)) return dateKey;

  const [year, month, day] = dateKey.split("-").map(Number);
  const date = new Date(year, month - 1, day);
  if (Number.isNaN(date.getTime())) return dateKey;

  return new Intl.DateTimeFormat("en-IN", {
    weekday: "short",
    day: "numeric",
    month: "short",
    year: "numeric",
  }).format(date);
}

export default function AppointmentScheduleFields({
  now,
  selectedDate,
  selectedTime,
  schedule,
  bookedByDate = {},
  scheduleLoading = false,
  onDateChange,
  onTimeChange,
}: AppointmentScheduleFieldsProps) {
  const { days } = useMemo(
    () => normalizeAppointmentSelection(selectedDate, selectedTime, now, bookedByDate, schedule),
    [selectedDate, selectedTime, now, bookedByDate, schedule]
  );

  useEffect(() => {
    const normalized = normalizeAppointmentSelection(
      selectedDate,
      selectedTime,
      now,
      bookedByDate,
      schedule
    );

    if (normalized.date !== selectedDate) {
      onDateChange(normalized.date);
    }
    if (normalized.time && normalized.time !== selectedTime) {
      onTimeChange(normalized.time);
    }
  }, [
    bookedByDate,
    now,
    onDateChange,
    onTimeChange,
    schedule,
    selectedDate,
    selectedTime,
  ]);

  const bookedForSelectedDate = selectedDate ? bookedByDate[selectedDate] ?? [] : [];
  const bookedSet = useMemo(() => new Set(bookedForSelectedDate), [bookedForSelectedDate]);
  const displaySlotsForSelectedDate = selectedDate
    ? getAvailableTimeSlotsForDate(selectedDate, now, schedule)
    : [];
  const bookableSlotsForSelectedDate = selectedDate
    ? getBookableTimeSlotsForDate(selectedDate, now, bookedForSelectedDate, schedule)
    : [];

  if (scheduleLoading) {
    return (
      <div className="rounded-2xl border border-slate-100 bg-slate-50 px-4 py-8 text-center text-sm text-slate-600">
        Loading department schedule...
      </div>
    );
  }

  if (!schedule.enabled) {
    return (
      <div className="rounded-2xl border border-amber-200 bg-amber-50 px-4 py-8 text-center text-sm text-amber-900">
        Online appointments are not available for this department right now. Please call the
        hospital to book.
      </div>
    );
  }

  return (
    <div className="space-y-5">
      {selectedDate && selectedTime ? (
        <div className="flex flex-col gap-2 rounded-2xl border border-red-100 bg-red-50/80 px-4 py-3 sm:flex-row sm:items-center sm:justify-between">
          <div>
            <p className="text-[11px] font-semibold uppercase tracking-wide text-red-600">
              Selected slot
            </p>
            <p className="mt-0.5 text-sm font-semibold text-slate-900 sm:text-base">
              {formatSelectedDateLabel(selectedDate)}
            </p>
          </div>
          <div className="inline-flex w-fit items-center gap-2 rounded-full bg-white px-3 py-1.5 text-sm font-semibold text-red-700 shadow-sm">
            <Clock className="h-4 w-4" />
            {selectedTime}
          </div>
        </div>
      ) : null}

      <div>
        <p className="mb-3 text-xs font-semibold uppercase tracking-[0.16em] text-slate-500">
          Select date
        </p>
        <div className="grid grid-cols-6 gap-1.5 sm:gap-2">
          {days.map((day) => {
            const isSelected = selectedDate === day.date;
            const dayHasSlots =
              getBookableTimeSlotsForDate(
                day.date,
                now,
                bookedByDate[day.date] ?? [],
                schedule
              ).length > 0;

            return (
              <motion.button
                key={day.date}
                type="button"
                onClick={() => {
                  onDateChange(day.date);
                  const nextSlots = getBookableTimeSlotsForDate(
                    day.date,
                    now,
                    bookedByDate[day.date] ?? [],
                    schedule
                  );
                  if (nextSlots[0]) onTimeChange(nextSlots[0]);
                }}
                disabled={!dayHasSlots}
                whileTap={dayHasSlots ? { scale: 0.97 } : undefined}
                className={cn(
                  "flex min-h-[4.5rem] flex-col items-center justify-center rounded-xl border px-1 py-2.5 text-center transition-all duration-200 sm:min-h-[5rem] sm:rounded-2xl sm:px-2 sm:py-3",
                  !dayHasSlots && "cursor-not-allowed opacity-40",
                  isSelected
                    ? "border-red-600 bg-red-600 text-white shadow-md shadow-red-600/20 ring-2 ring-red-600/20"
                    : "border-slate-200 bg-slate-50 text-slate-900 hover:border-red-200 hover:bg-red-50"
                )}
              >
                <span
                  className={cn(
                    "text-[10px] font-semibold uppercase tracking-wide",
                    isSelected ? "text-white/80" : "text-slate-500"
                  )}
                >
                  {day.monthLabel}
                </span>
                <span className="text-lg font-bold leading-none sm:text-xl">{day.dayNum}</span>
                <span
                  className={cn(
                    "mt-1 text-[10px] font-semibold uppercase tracking-wider sm:text-[11px]",
                    isSelected ? "text-white/90" : "text-slate-600"
                  )}
                >
                  {day.dayName}
                </span>
              </motion.button>
            );
          })}
        </div>
      </div>

      <div>
        <p className="mb-3 text-xs font-semibold uppercase tracking-[0.16em] text-slate-500">
          Available time slots
        </p>
        {displaySlotsForSelectedDate.length > 0 ? (
          <div className="grid grid-cols-4 gap-1.5 sm:gap-2">
            {displaySlotsForSelectedDate.map((slot) => {
              const isSelected = selectedTime === slot;
              const isBooked = bookedSet.has(slot);

              return (
                <motion.button
                  key={slot}
                  type="button"
                  onClick={() => onTimeChange(slot)}
                  disabled={isBooked}
                  whileTap={isBooked ? undefined : { scale: 0.98 }}
                  aria-disabled={isBooked}
                  aria-label={isBooked ? `${slot} already booked` : slot}
                  className={cn(
                    "relative rounded-xl border px-1.5 py-2 text-xs font-semibold transition-all duration-200 sm:rounded-full sm:px-2 sm:py-2.5 sm:text-sm",
                    isBooked &&
                      "cursor-not-allowed border-slate-200 bg-slate-100 text-slate-400",
                    !isBooked &&
                      isSelected &&
                      "border-red-600 bg-red-600 text-white shadow-md shadow-red-600/20",
                    !isBooked &&
                      !isSelected &&
                      "border-slate-200 bg-slate-50 text-slate-800 hover:border-red-200 hover:bg-red-50"
                  )}
                >
                  <span
                    className={cn(
                      "relative z-[1]",
                      isBooked && "line-through decoration-red-500 decoration-2"
                    )}
                  >
                    {slot}
                  </span>
                  {isBooked ? (
                    <span
                      aria-hidden
                      className="pointer-events-none absolute inset-x-2 top-1/2 z-[2] h-px -translate-y-1/2 bg-red-500/70"
                    />
                  ) : null}
                </motion.button>
              );
            })}
          </div>
        ) : (
          <p className="rounded-xl border border-amber-200 bg-amber-50 px-4 py-3 text-sm text-amber-900">
            No slots left for this day. Please choose another date.
          </p>
        )}

        {displaySlotsForSelectedDate.length > 0 && bookableSlotsForSelectedDate.length === 0 ? (
          <p className="mt-3 rounded-xl border border-amber-200 bg-amber-50 px-4 py-3 text-sm text-amber-900">
            All remaining slots are booked for this day. Please choose another date.
          </p>
        ) : null}
      </div>

      <div className="flex items-start gap-3 rounded-2xl border border-slate-100 bg-slate-50 p-4">
        <div className="flex h-10 w-10 shrink-0 items-center justify-center rounded-xl bg-red-600 text-white">
          <Calendar className="h-5 w-5" />
        </div>
        <div className="min-w-0 text-sm text-slate-600">
          <p className="font-semibold text-slate-900">Department OPD schedule</p>
          <p className="mt-1">
            Mon–Sat slots and Sun slots are managed by the hospital for this department.
          </p>
          <p className="mt-1 text-xs text-slate-500">
            Crossed-out slots are already booked by another patient.
          </p>
        </div>
      </div>
    </div>
  );
}
