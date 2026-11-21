"use client";

import { useState } from "react";
import Link from "next/link";
import {
  TrendingUp,
  TrendingDown,
  Users,
  Eye,
  Smartphone,
  Monitor,
  Tablet,
  ExternalLink,
  Activity,
  Calendar,
} from "lucide-react";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { cn } from "@/lib/utils";
import type { AnalyticsSummary } from "@/lib/db/analytics";

interface AnalyticsDashboardProps {
  initialSummary: AnalyticsSummary;
}

export default function AnalyticsDashboard({
  initialSummary,
}: AnalyticsDashboardProps) {
  const [summary, setSummary] = useState<AnalyticsSummary>(initialSummary);
  const [selectedRange, setSelectedRange] = useState<7 | 14 | 30>(
    (initialSummary.period.days as 7 | 14 | 30) || 14
  );
  const [loading, setLoading] = useState(false);
  const [hoveredIndex, setHoveredIndex] = useState<number | null>(null);

  async function handleRangeChange(days: 7 | 14 | 30) {
    if (days === selectedRange || loading) return;
    setSelectedRange(days);
    setLoading(true);

    try {
      const res = await fetch(`/api/admin/analytics?days=${days}`);
      if (res.ok) {
        const data = await res.json();
        setSummary(data);
      }
    } catch (err) {
      console.error("Failed to load analytics range:", err);
    } finally {
      setLoading(false);
    }
  }

  // Chart calculations
  const maxViews = Math.max(
    ...summary.dailyChart.map((d) => d.views),
    10
  );
  const chartHeight = 160;

  // Device percentages
  const hasTraffic = summary.devices.total > 0;
  const totalDevices = summary.devices.total || 1;
  const mobilePct = hasTraffic ? Math.round((summary.devices.mobile / totalDevices) * 100) : 0;
  const desktopPct = hasTraffic ? Math.round((summary.devices.desktop / totalDevices) * 100) : 0;
  const tabletPct = hasTraffic ? Math.max(0, 100 - mobilePct - desktopPct) : 0;

  return (
    <div className="space-y-6">
      {/* Header with Title and Range Picker */}
      <div className="flex flex-col gap-4 sm:flex-row sm:items-center sm:justify-between border-b border-slate-200 pb-5">
        <div>
          <div className="flex items-center gap-2">
            <h2 className="text-xl font-bold text-slate-900">
              Website Traffic & Page Activity
            </h2>
            <span className="inline-flex items-center gap-1 rounded-full bg-emerald-50 px-2 py-0.5 text-[11px] font-semibold text-emerald-700 ring-1 ring-emerald-200">
              <span className="h-1.5 w-1.5 rounded-full bg-emerald-500 animate-pulse" />
              Live Tracking
            </span>
          </div>
          <p className="mt-1 text-xs text-slate-500">
            Real-time page views, unique visitors, and top visited content across MAPIMS.
          </p>
        </div>

        <div className="flex items-center rounded-xl border border-slate-200 bg-white p-1 shadow-sm self-start sm:self-auto">
          {[
            { label: "7 Days", value: 7 as const },
            { label: "14 Days", value: 14 as const },
            { label: "30 Days", value: 30 as const },
          ].map((option) => (
            <button
              key={option.value}
              type="button"
              disabled={loading}
              onClick={() => void handleRangeChange(option.value)}
              className={cn(
                "rounded-lg px-3 py-1.5 text-xs font-semibold transition-all",
                selectedRange === option.value
                  ? "bg-red-600 text-white shadow-sm"
                  : "text-slate-600 hover:text-slate-900 hover:bg-slate-50"
              )}
            >
              {option.label}
            </button>
          ))}
        </div>
      </div>

      {/* KPI Cards */}
      <div className="grid gap-4 sm:grid-cols-2 lg:grid-cols-4">
        {/* Today's Views */}
        <Card className="border-slate-200 bg-white shadow-sm transition-all hover:shadow-md">
          <CardHeader className="flex flex-row items-center justify-between pb-2">
            <CardTitle className="text-xs font-semibold uppercase tracking-wider text-slate-500">
              Today's Views
            </CardTitle>
            <div className="rounded-lg bg-red-50 p-2 text-red-600">
              <Eye className="h-4 w-4" />
            </div>
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-black text-slate-900 tabular-nums">
              {summary.today.views.toLocaleString()}
            </div>
            <p className="mt-1 text-xs text-slate-500">
              <strong className="text-slate-800">
                {summary.today.visitors.toLocaleString()}
              </strong>{" "}
              unique visitors today
            </p>
          </CardContent>
        </Card>

        {/* Period Total Views */}
        <Card className="border-slate-200 bg-white shadow-sm transition-all hover:shadow-md">
          <CardHeader className="flex flex-row items-center justify-between pb-2">
            <CardTitle className="text-xs font-semibold uppercase tracking-wider text-slate-500">
              Last {selectedRange} Days Views
            </CardTitle>
            <div className="rounded-lg bg-blue-50 p-2 text-blue-600">
              <Activity className="h-4 w-4" />
            </div>
          </CardHeader>
          <CardContent>
            <div className="flex items-baseline gap-2">
              <div className="text-2xl font-black text-slate-900 tabular-nums">
                {summary.period.views.toLocaleString()}
              </div>
              {summary.period.viewsChangePercent !== 0 && (
                <span
                  className={cn(
                    "inline-flex items-center gap-0.5 text-xs font-bold",
                    summary.period.viewsChangePercent > 0
                      ? "text-emerald-600"
                      : "text-amber-600"
                  )}
                >
                  {summary.period.viewsChangePercent > 0 ? (
                    <TrendingUp className="h-3 w-3" />
                  ) : (
                    <TrendingDown className="h-3 w-3" />
                  )}
                  {summary.period.viewsChangePercent > 0 ? "+" : ""}
                  {summary.period.viewsChangePercent}%
                </span>
              )}
            </div>
            <p className="mt-1 text-xs text-slate-500">
              vs previous {selectedRange} days
            </p>
          </CardContent>
        </Card>

        {/* Period Unique Visitors */}
        <Card className="border-slate-200 bg-white shadow-sm transition-all hover:shadow-md">
          <CardHeader className="flex flex-row items-center justify-between pb-2">
            <CardTitle className="text-xs font-semibold uppercase tracking-wider text-slate-500">
              Total Visitors
            </CardTitle>
            <div className="rounded-lg bg-emerald-50 p-2 text-emerald-600">
              <Users className="h-4 w-4" />
            </div>
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-black text-slate-900 tabular-nums">
              {summary.period.visitors.toLocaleString()}
            </div>
            <p className="mt-1 text-xs text-slate-500">
              {summary.totalAllTime.views.toLocaleString()} total all-time views
            </p>
          </CardContent>
        </Card>

        {/* Primary Device */}
        <Card className="border-slate-200 bg-white shadow-sm transition-all hover:shadow-md">
          <CardHeader className="flex flex-row items-center justify-between pb-2">
            <CardTitle className="text-xs font-semibold uppercase tracking-wider text-slate-500">
              Mobile Traffic
            </CardTitle>
            <div className="rounded-lg bg-purple-50 p-2 text-purple-600">
              <Smartphone className="h-4 w-4" />
            </div>
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-black text-slate-900 tabular-nums">
              {mobilePct}%
            </div>
            <p className="mt-1 text-xs text-slate-500">
              Desktop {desktopPct}% · Tablet {tabletPct}%
            </p>
          </CardContent>
        </Card>
      </div>

      {/* Visual Traffic Trend Chart */}
      <Card className="border-slate-200 bg-white shadow-sm">
        <CardHeader className="flex flex-col gap-2 pb-2 sm:flex-row sm:items-center sm:justify-between border-b border-slate-100">
          <div>
            <CardTitle className="text-base font-bold text-slate-900">
              Traffic Trends ({selectedRange} Days)
            </CardTitle>
            <p className="text-xs text-slate-500">
              Daily page views and estimated unique visitors
            </p>
          </div>

          <div className="flex items-center gap-4 text-xs">
            <div className="flex items-center gap-1.5">
              <span className="h-3 w-3 rounded-sm bg-red-600" />
              <span className="font-medium text-slate-600">Page Views</span>
            </div>
            <div className="flex items-center gap-1.5">
              <span className="h-3 w-3 rounded-sm bg-blue-400" />
              <span className="font-medium text-slate-600">Visitors</span>
            </div>
          </div>
        </CardHeader>

        <CardContent className="pt-6">
          <div className="relative">
            {/* Horizontal guideline */}
            <div className="absolute inset-x-0 top-0 border-b border-dashed border-slate-200" />
            <div className="absolute inset-x-0 top-1/2 border-b border-dashed border-slate-200" />
            <div className="absolute inset-x-0 bottom-6 border-b border-slate-200" />

            {/* Bars container */}
            <div className="flex h-48 items-end gap-1.5 sm:gap-3 pb-6 pt-2">
              {summary.dailyChart.map((day, idx) => {
                const viewHeight = Math.max(
                  8,
                  Math.round((day.views / maxViews) * chartHeight)
                );
                const visitorHeight = Math.max(
                  4,
                  Math.round((day.visitors / maxViews) * chartHeight)
                );
                const isHovered = hoveredIndex === idx;

                return (
                  <div
                    key={day.date}
                    className="group relative flex flex-1 flex-col items-center h-full justify-end"
                    onMouseEnter={() => setHoveredIndex(idx)}
                    onMouseLeave={() => setHoveredIndex(null)}
                  >
                    {/* Tooltip */}
                    {isHovered && (
                      <div className="absolute -top-12 z-20 whitespace-nowrap rounded-lg bg-slate-900 px-2.5 py-1.5 text-center text-[11px] text-white shadow-lg ring-1 ring-white/10 pointer-events-none">
                        <p className="font-bold text-slate-100">{day.label}</p>
                        <p className="font-medium text-red-300">
                          {day.views.toLocaleString()} views · {day.visitors.toLocaleString()} visitors
                        </p>
                      </div>
                    )}

                    {/* Bars pair */}
                    <div className="flex w-full items-end justify-center gap-1 h-full">
                      {/* Views bar */}
                      <div
                        style={{ height: `${viewHeight}px` }}
                        className={cn(
                          "w-full max-w-[18px] rounded-t-sm transition-all duration-300",
                          isHovered
                            ? "bg-red-500 scale-y-105"
                            : "bg-red-600 hover:bg-red-500"
                        )}
                      />
                      {/* Visitors bar */}
                      <div
                        style={{ height: `${visitorHeight}px` }}
                        className={cn(
                          "w-full max-w-[12px] rounded-t-sm transition-all duration-300",
                          isHovered
                            ? "bg-blue-300 scale-y-105"
                            : "bg-blue-400 hover:bg-blue-300"
                        )}
                      />
                    </div>

                    {/* Date label */}
                    <span className="absolute -bottom-6 truncate text-[10px] font-medium text-slate-400">
                      {idx % 2 === 0 || selectedRange === 7 ? day.label.split(" ")[1] : ""}
                    </span>
                  </div>
                );
              })}
            </div>
          </div>
        </CardContent>
      </Card>

      {/* Two-Column Grid: Top Pages & Device/Audience Breakdown */}
      <div className="grid gap-6 lg:grid-cols-12">
        {/* Top Visited Pages (8 cols) */}
        <Card className="border-slate-200 bg-white shadow-sm lg:col-span-8">
          <CardHeader className="flex flex-row items-center justify-between pb-3 border-b border-slate-100">
            <div>
              <CardTitle className="text-base font-bold text-slate-900">
                Top Visited Pages
              </CardTitle>
              <p className="text-xs text-slate-500">
                Most visited pages and sections over the selected period
              </p>
            </div>
            <span className="text-xs font-semibold text-slate-500">
              {summary.topPages.length} active paths
            </span>
          </CardHeader>

          <CardContent className="p-0">
            {summary.topPages.length === 0 ? (
              <div className="py-12 text-center text-sm text-slate-500">
                No page visits recorded in this period yet.
              </div>
            ) : (
              <ul className="divide-y divide-slate-100">
                {summary.topPages.map((page, index) => (
                  <li
                    key={page.path}
                    className="flex items-center gap-3 px-5 py-3.5 transition-colors hover:bg-slate-50/70"
                  >
                    {/* Rank Badge */}
                    <span
                      className={cn(
                        "flex h-6 w-6 shrink-0 items-center justify-center rounded-full text-xs font-bold",
                        index === 0
                          ? "bg-red-100 text-red-700 font-extrabold"
                          : index === 1
                          ? "bg-amber-100 text-amber-800"
                          : index === 2
                          ? "bg-blue-100 text-blue-800"
                          : "bg-slate-100 text-slate-600"
                      )}
                    >
                      {index + 1}
                    </span>

                    {/* Page Title & Path */}
                    <div className="min-w-0 flex-1">
                      <div className="flex items-center gap-1.5">
                        <p className="truncate text-sm font-semibold text-slate-800">
                          {page.title}
                        </p>
                        <Link
                          href={page.path}
                          target="_blank"
                          rel="noopener noreferrer"
                          className="text-slate-400 hover:text-red-600 transition-colors"
                          title="Open live page"
                        >
                          <ExternalLink className="h-3.5 w-3.5" />
                        </Link>
                      </div>
                      <p className="truncate text-xs font-mono text-slate-400">
                        {page.path}
                      </p>
                    </div>

                    {/* Progress Bar & View Count */}
                    <div className="flex items-center gap-3 shrink-0">
                      <div className="hidden sm:block w-28">
                        <div className="h-2 w-full overflow-hidden rounded-full bg-slate-100">
                          <div
                            className="h-full rounded-full bg-red-600"
                            style={{ width: `${Math.min(100, page.percent)}%` }}
                          />
                        </div>
                      </div>

                      <div className="text-right">
                        <span className="text-sm font-bold text-slate-900 tabular-nums">
                          {page.views.toLocaleString()}
                        </span>
                        <span className="ml-1 text-[11px] text-slate-400">
                          ({page.percent}%)
                        </span>
                      </div>
                    </div>
                  </li>
                ))}
              </ul>
            )}
          </CardContent>
        </Card>

        {/* Device & Traffic Insights (4 cols) */}
        <Card className="border-slate-200 bg-white shadow-sm lg:col-span-4 flex flex-col">
          <CardHeader className="pb-3 border-b border-slate-100">
            <CardTitle className="text-base font-bold text-slate-900">
              Visitor Devices
            </CardTitle>
            <p className="text-xs text-slate-500">
              Breakdown by device category
            </p>
          </CardHeader>

          <CardContent className="p-5 flex-1 flex flex-col justify-between space-y-6">
            {/* Visual Multi-Segment Bar */}
            <div className="space-y-2">
              <div className="flex h-3.5 w-full overflow-hidden rounded-full bg-slate-100 p-0.5">
                <div
                  style={{ width: `${mobilePct}%` }}
                  className="h-full rounded-l-full bg-purple-600 transition-all"
                  title={`Mobile: ${mobilePct}%`}
                />
                <div
                  style={{ width: `${desktopPct}%` }}
                  className="h-full bg-blue-600 transition-all"
                  title={`Desktop: ${desktopPct}%`}
                />
                <div
                  style={{ width: `${tabletPct}%` }}
                  className="h-full rounded-r-full bg-amber-500 transition-all"
                  title={`Tablet: ${tabletPct}%`}
                />
              </div>

              <div className="flex justify-between text-[11px] text-slate-500 font-medium">
                <span>Mobile {mobilePct}%</span>
                <span>Desktop {desktopPct}%</span>
                <span>Tablet {tabletPct}%</span>
              </div>
            </div>

            {/* Device Detail List */}
            <div className="space-y-3">
              <div className="flex items-center justify-between rounded-xl border border-slate-100 bg-slate-50/60 p-3">
                <div className="flex items-center gap-2.5">
                  <div className="rounded-lg bg-purple-100 p-2 text-purple-700">
                    <Smartphone className="h-4 w-4" />
                  </div>
                  <div>
                    <p className="text-xs font-bold text-slate-800">Mobile Phones</p>
                    <p className="text-[11px] text-slate-500">iOS & Android devices</p>
                  </div>
                </div>
                <div className="text-right">
                  <span className="text-sm font-extrabold text-slate-900">
                    {mobilePct}%
                  </span>
                  <p className="text-[10px] text-slate-400">
                    {summary.devices.mobile.toLocaleString()} views
                  </p>
                </div>
              </div>

              <div className="flex items-center justify-between rounded-xl border border-slate-100 bg-slate-50/60 p-3">
                <div className="flex items-center gap-2.5">
                  <div className="rounded-lg bg-blue-100 p-2 text-blue-700">
                    <Monitor className="h-4 w-4" />
                  </div>
                  <div>
                    <p className="text-xs font-bold text-slate-800">Desktop / Laptops</p>
                    <p className="text-[11px] text-slate-500">Windows, Mac & Linux</p>
                  </div>
                </div>
                <div className="text-right">
                  <span className="text-sm font-extrabold text-slate-900">
                    {desktopPct}%
                  </span>
                  <p className="text-[10px] text-slate-400">
                    {summary.devices.desktop.toLocaleString()} views
                  </p>
                </div>
              </div>

              <div className="flex items-center justify-between rounded-xl border border-slate-100 bg-slate-50/60 p-3">
                <div className="flex items-center gap-2.5">
                  <div className="rounded-lg bg-amber-100 p-2 text-amber-700">
                    <Tablet className="h-4 w-4" />
                  </div>
                  <div>
                    <p className="text-xs font-bold text-slate-800">Tablets & iPads</p>
                    <p className="text-[11px] text-slate-500">Touch tablet displays</p>
                  </div>
                </div>
                <div className="text-right">
                  <span className="text-sm font-extrabold text-slate-900">
                    {tabletPct}%
                  </span>
                  <p className="text-[10px] text-slate-400">
                    {summary.devices.tablet.toLocaleString()} views
                  </p>
                </div>
              </div>
            </div>

            {/* Quick Insights Box */}
            <div className="rounded-xl border border-emerald-200 bg-emerald-50/60 p-3.5 text-xs text-emerald-900">
              <p className="font-semibold flex items-center gap-1.5">
                <Calendar className="h-3.5 w-3.5 text-emerald-600" />
                Hospital Patient Insights
              </p>
              <p className="mt-1 leading-relaxed text-emerald-800">
                Most appointment bookings and specialty inquiries originate from mobile smartphones.
              </p>
            </div>
          </CardContent>
        </Card>
      </div>
    </div>
  );
}

