"use client";

import { useCallback, useEffect, useState } from "react";

import type { DepartmentScheduleConfig } from "@/lib/appointment-schedule-config";
import { createDefaultScheduleConfig } from "@/lib/appointment-schedule-config";

export function useDepartmentAppointmentSchedule(departmentSlug: string) {
  const [schedule, setSchedule] = useState<DepartmentScheduleConfig>(() =>
    createDefaultScheduleConfig(departmentSlug || "general-medicine")
  );
  const [loading, setLoading] = useState(Boolean(departmentSlug));

  const loadSchedule = useCallback(async () => {
    if (!departmentSlug) {
      setSchedule(createDefaultScheduleConfig("general-medicine"));
      setLoading(false);
      return;
    }

    setLoading(true);

    try {
      const response = await fetch(
        `/api/appointment-schedules?department=${encodeURIComponent(departmentSlug)}`,
        { cache: "no-store" }
      );

      if (!response.ok) {
        setSchedule(createDefaultScheduleConfig(departmentSlug));
        return;
      }

      const data = (await response.json()) as DepartmentScheduleConfig;
      setSchedule({
        departmentSlug: data.departmentSlug,
        enabled: data.enabled,
        daySlots: data.daySlots,
        advanceDays: data.advanceDays,
      });
    } catch {
      setSchedule(createDefaultScheduleConfig(departmentSlug));
    } finally {
      setLoading(false);
    }
  }, [departmentSlug]);

  useEffect(() => {
    void loadSchedule();
  }, [loadSchedule]);

  return { schedule, loading, refreshSchedule: loadSchedule };
}
