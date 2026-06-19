"use client";

import { useCallback, useEffect, useState } from "react";

import { getUpcomingAppointmentDays } from "@/data/appointment-slots";
import type { DepartmentScheduleConfig } from "@/lib/appointment-schedule-config";
import type { BookedSlotsByDate } from "@/lib/appointment-bookings";

export function useBookedAppointmentSlots(
  now: Date,
  departmentSlug: string,
  schedule: DepartmentScheduleConfig,
  refreshKey = 0
) {
  const [bookedByDate, setBookedByDate] = useState<BookedSlotsByDate>({});
  const [loading, setLoading] = useState(true);

  const loadBookedSlots = useCallback(async () => {
    if (!departmentSlug || !schedule.enabled) {
      setBookedByDate({});
      setLoading(false);
      return;
    }

    const dates = getUpcomingAppointmentDays(undefined, now, schedule).map((day) => day.date);

    try {
      const response = await fetch(
        `/api/appointments/booked-slots?dates=${encodeURIComponent(dates.join(","))}&department=${encodeURIComponent(departmentSlug)}`,
        { cache: "no-store" }
      );

      if (!response.ok) {
        return;
      }

      const data = (await response.json()) as { booked?: BookedSlotsByDate };
      setBookedByDate(data.booked ?? {});
    } catch {
      // Keep the last known booked slots if refresh fails.
    } finally {
      setLoading(false);
    }
  }, [departmentSlug, now, schedule]);

  useEffect(() => {
    setLoading(true);
    void loadBookedSlots();
  }, [loadBookedSlots, refreshKey]);

  return { bookedByDate, loading, refreshBookedSlots: loadBookedSlots };
}
