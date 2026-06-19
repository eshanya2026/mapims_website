"use client";

import Link from "next/link";
import { CalendarClock, Pencil } from "lucide-react";

import { cn } from "@/lib/utils";

export type AdminAppointmentScheduleRecord = {
  id: string | null;
  departmentSlug: string;
  departmentName: string;
  enabled: boolean;
  activeDays: number;
  advanceDays: number;
  notes: string;
  updatedAt: string | null;
};

type AppointmentSchedulesAdminListProps = {
  schedules: AdminAppointmentScheduleRecord[];
};

export default function AppointmentSchedulesAdminList({
  schedules,
}: AppointmentSchedulesAdminListProps) {
  return (
    <div className="space-y-6 p-8">
      <div className="flex flex-col gap-3 sm:flex-row sm:items-center sm:justify-between">
        <div>
          <div className="flex items-center gap-2 text-red-600">
            <CalendarClock className="h-5 w-5" />
            <p className="text-xs font-semibold uppercase tracking-wider">Patient Services</p>
          </div>
          <h1 className="mt-2 text-2xl font-bold text-slate-900">Appointment Schedules</h1>
          <p className="mt-1 max-w-2xl text-sm text-slate-600">
            Set available date and time slots for each department based on doctor OPD
            availability.
          </p>
        </div>
      </div>

      <div className="overflow-hidden rounded-2xl border border-slate-200 bg-white shadow-sm">
        <div className="overflow-x-auto">
          <table className="min-w-full divide-y divide-slate-200 text-sm">
            <thead className="bg-slate-50">
              <tr>
                <th className="px-4 py-3 text-left font-semibold text-slate-700">Department</th>
                <th className="px-4 py-3 text-left font-semibold text-slate-700">Status</th>
                <th className="px-4 py-3 text-left font-semibold text-slate-700">Active days</th>
                <th className="px-4 py-3 text-left font-semibold text-slate-700">Window</th>
                <th className="px-4 py-3 text-right font-semibold text-slate-700">Actions</th>
              </tr>
            </thead>
            <tbody className="divide-y divide-slate-100">
              {schedules.map((schedule) => (
                <tr key={schedule.departmentSlug} className="hover:bg-slate-50/80">
                  <td className="px-4 py-4">
                    <p className="font-semibold text-slate-900">{schedule.departmentName}</p>
                    <p className="text-xs text-slate-500">{schedule.departmentSlug}</p>
                  </td>
                  <td className="px-4 py-4">
                    <span
                      className={cn(
                        "inline-flex rounded-full px-2.5 py-1 text-xs font-semibold",
                        schedule.enabled
                          ? "bg-emerald-100 text-emerald-700"
                          : "bg-slate-100 text-slate-600"
                      )}
                    >
                      {schedule.enabled ? "Enabled" : "Disabled"}
                    </span>
                  </td>
                  <td className="px-4 py-4 text-slate-600">{schedule.activeDays} / 7</td>
                  <td className="px-4 py-4 text-slate-600">{schedule.advanceDays} days</td>
                  <td className="px-4 py-4 text-right">
                    <Link
                      href={`/admin/appointment-schedules/${schedule.departmentSlug}/edit`}
                      className="inline-flex h-8 items-center justify-center rounded-lg border border-slate-200 bg-white px-3 text-sm font-medium text-slate-700 hover:bg-slate-50"
                    >
                      <Pencil className="mr-2 h-3.5 w-3.5" />
                      Edit schedule
                    </Link>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </div>
    </div>
  );
}
