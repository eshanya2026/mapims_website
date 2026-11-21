import crypto from "crypto";
import { getDb } from "@/lib/mongodb";

export type DeviceType = "desktop" | "mobile" | "tablet";

export interface PageViewEvent {
  path: string;
  ip?: string | null;
  userAgent?: string | null;
  referrer?: string | null;
}

export interface DailyAnalyticsDoc {
  date: string; // YYYY-MM-DD
  views: number;
  visitors: number;
  devices: {
    desktop: number;
    mobile: number;
    tablet: number;
  };
  updatedAt: Date;
}

export interface PageAnalyticsDoc {
  date: string; // YYYY-MM-DD
  path: string;
  views: number;
  updatedAt: Date;
}

const FRIENDLY_PATH_NAMES: Record<string, string> = {
  "/": "Homepage",
  "/appointments": "Book an Appointment",
  "/doctors": "Specialist Doctors",
  "/specialities": "Specialities & Centres",
  "/services": "Clinical Services",
  "/services/emergency-care": "24/7 Emergency Care",
  "/services/cardiology": "Cardiology & Cath Lab",
  "/services/neurology": "Neurology & Neurosurgery",
  "/services/oncology": "Comprehensive Cancer Care",
  "/services/orthopaedics": "Orthopaedics & Joint Care",
  "/services/radiology": "Advanced Radiology & Diagnostics",
  "/blog": "News, Events & Insights",
  "/about": "About MAPIMS Hospitals",
  "/contact": "Contact Us",
  "/insurance": "Insurance & Cashless Desk",
  "/international-patients": "International Patient Services",
  "/careers": "Careers & Job Openings",
  "/gallery": "Hospital Media Gallery",
};

export function getFriendlyPageTitle(path: string): string {
  if (FRIENDLY_PATH_NAMES[path]) {
    return FRIENDLY_PATH_NAMES[path];
  }

  // Handle blog post URLs
  if (path.startsWith("/blog/")) {
    const slug = path.replace("/blog/", "");
    return (
      "Article: " +
      slug
        .split("-")
        .map((w) => w.charAt(0).toUpperCase() + w.slice(1))
        .join(" ")
    );
  }

  // Handle department or service URLs
  if (path.startsWith("/services/")) {
    const slug = path.replace("/services/", "");
    return (
      "Service: " +
      slug
        .split("-")
        .map((w) => w.charAt(0).toUpperCase() + w.slice(1))
        .join(" ")
    );
  }

  // Fallback to formatted path
  return path === "/" ? "Homepage" : path;
}

export function detectDevice(userAgent?: string | null): DeviceType {
  if (!userAgent) return "desktop";
  const ua = userAgent.toLowerCase();
  if (/ipad|tablet|(android(?!.*mobile))/i.test(ua)) {
    return "tablet";
  }
  if (/mobile|iphone|ipod|blackberry|iemobile|opera mini/i.test(ua)) {
    return "mobile";
  }
  return "desktop";
}

export function normalizePath(rawPath: string): string | null {
  if (!rawPath || typeof rawPath !== "string") return null;

  try {
    let clean = rawPath.split("?")[0].split("#")[0].trim();
    if (!clean.startsWith("/")) clean = "/" + clean;
    if (clean.length > 1 && clean.endsWith("/")) {
      clean = clean.slice(0, -1);
    }

    // Ignore admin, API, Next.js internal, and asset URLs
    if (
      clean.startsWith("/admin") ||
      clean.startsWith("/api") ||
      clean.startsWith("/_next") ||
      clean.startsWith("/uploads") ||
      clean.startsWith("/images") ||
      clean === "/favicon.ico" ||
      /\.(png|jpg|jpeg|gif|svg|ico|css|js|map|mp4|webm|webp|woff|woff2)$/i.test(clean)
    ) {
      return null;
    }

    return clean;
  } catch {
    return null;
  }
}

let indexesInitialized = false;

async function ensureAnalyticsIndexes() {
  if (indexesInitialized) return;
  try {
    const db = await getDb();
    await Promise.all([
      db.collection("analyticsDaily").createIndex({ date: 1 }, { unique: true }),
      db
        .collection("analyticsPages")
        .createIndex({ date: 1, path: 1 }, { unique: true }),
      db.collection("analyticsPages").createIndex({ path: 1 }),
      db
        .collection("analyticsVisitors")
        .createIndex({ date: 1, visitorHash: 1 }, { unique: true }),
      db
        .collection("analyticsVisitors")
        .createIndex({ createdAt: 1 }, { expireAfterSeconds: 60 * 86400 }), // 60-day TTL
    ]);
    indexesInitialized = true;
  } catch (err) {
    console.warn("[analytics] Index setup error:", err);
  }
}

/**
 * Records a page view and unique daily visitor count.
 */
export async function recordPageView(event: PageViewEvent): Promise<boolean> {
  const path = normalizePath(event.path);
  if (!path) return false;

  try {
    await ensureAnalyticsIndexes();
    const db = await getDb();
    const today = new Date().toISOString().split("T")[0];
    const device = detectDevice(event.userAgent);

    // Create an anonymous daily visitor hash (IP + UserAgent + Date + Salt)
    const salt = process.env.AUTH_SECRET || "mapims-salt-2026";
    const visitorHash = crypto
      .createHash("sha256")
      .update(`${event.ip || "unknown"}-${event.userAgent || "unknown"}-${today}-${salt}`)
      .digest("hex")
      .slice(0, 16);

    let isNewVisitor = false;
    try {
      await db.collection("analyticsVisitors").insertOne({
        date: today,
        visitorHash,
        createdAt: new Date(),
      });
      isNewVisitor = true;
    } catch {
      // Duplicate key error: visitor already recorded today
      isNewVisitor = false;
    }

    const now = new Date();

    // 1. Update daily aggregate
    await db.collection("analyticsDaily").updateOne(
      { date: today },
      {
        $inc: {
          views: 1,
          visitors: isNewVisitor ? 1 : 0,
          [`devices.${device}`]: 1,
        },
        $set: { updatedAt: now },
        $setOnInsert: {
          date: today,
        },
      },
      { upsert: true }
    );

    // 2. Update page aggregate
    await db.collection("analyticsPages").updateOne(
      { date: today, path },
      {
        $inc: { views: 1 },
        $set: { updatedAt: now },
        $setOnInsert: {
          date: today,
          path,
        },
      },
      { upsert: true }
    );

    return true;
  } catch (err) {
    console.error("[analytics] Failed to record pageview:", err);
    return false;
  }
}

export interface AnalyticsSummary {
  today: {
    views: number;
    visitors: number;
  };
  period: {
    days: number;
    views: number;
    visitors: number;
    viewsChangePercent: number;
  };
  totalAllTime: {
    views: number;
    visitors: number;
  };
  dailyChart: Array<{
    date: string;
    label: string;
    views: number;
    visitors: number;
  }>;
  topPages: Array<{
    path: string;
    title: string;
    views: number;
    percent: number;
  }>;
  devices: {
    desktop: number;
    mobile: number;
    tablet: number;
    total: number;
  };
}

/**
 * Retrieves compiled analytics summary for the CMS dashboard.
 */
export async function getAnalyticsSummary(days = 14): Promise<AnalyticsSummary> {
  await ensureAnalyticsIndexes();

  const db = await getDb();
  const todayStr = new Date().toISOString().split("T")[0];

  // Calculate start date for current period
  const startDate = new Date();
  startDate.setDate(startDate.getDate() - (days - 1));
  const startDateStr = startDate.toISOString().split("T")[0];

  // Calculate start date for previous period (for trend %)
  const prevStartDate = new Date(startDate);
  prevStartDate.setDate(prevStartDate.getDate() - days);
  const prevStartDateStr = prevStartDate.toISOString().split("T")[0];

  const [dailyDocs, prevDailyDocs, allTimeStats, topPageDocs] = await Promise.all([
    // Current period daily docs
    db
      .collection<DailyAnalyticsDoc>("analyticsDaily")
      .find({ date: { $gte: startDateStr } })
      .sort({ date: 1 })
      .toArray(),

    // Previous period daily docs for growth trend
    db
      .collection<DailyAnalyticsDoc>("analyticsDaily")
      .find({ date: { $gte: prevStartDateStr, $lt: startDateStr } })
      .toArray(),

    // All-time totals
    db
      .collection("analyticsDaily")
      .aggregate<{ totalViews: number; totalVisitors: number }>([
        {
          $group: {
            _id: null,
            totalViews: { $sum: "$views" },
            totalVisitors: { $sum: "$visitors" },
          },
        },
      ])
      .toArray(),

    // Top pages aggregated over current period
    db
      .collection<PageAnalyticsDoc>("analyticsPages")
      .aggregate<{ _id: string; totalViews: number }>([
        { $match: { date: { $gte: startDateStr } } },
        { $group: { _id: "$path", totalViews: { $sum: "$views" } } },
        { $sort: { totalViews: -1 } },
        { $limit: 8 },
      ])
      .toArray(),
  ]);

  // Build continuous daily chart (fill missing dates with 0)
  const dailyMap = new Map<string, DailyAnalyticsDoc>();
  for (const doc of dailyDocs) {
    dailyMap.set(doc.date, doc);
  }

  const dailyChart: AnalyticsSummary["dailyChart"] = [];
  let periodViews = 0;
  let periodVisitors = 0;
  const devices = { desktop: 0, mobile: 0, tablet: 0, total: 0 };

  const cursor = new Date(startDate);
  const todayDate = new Date();

  while (cursor <= todayDate) {
    const dStr = cursor.toISOString().split("T")[0];
    const item = dailyMap.get(dStr);

    const views = item?.views ?? 0;
    const visitors = item?.visitors ?? 0;

    periodViews += views;
    periodVisitors += visitors;

    if (item?.devices) {
      devices.desktop += item.devices.desktop || 0;
      devices.mobile += item.devices.mobile || 0;
      devices.tablet += item.devices.tablet || 0;
    }

    const label = cursor.toLocaleDateString("en-US", {
      month: "short",
      day: "numeric",
    });

    dailyChart.push({
      date: dStr,
      label,
      views,
      visitors,
    });

    cursor.setDate(cursor.getDate() + 1);
  }

  devices.total = devices.desktop + devices.mobile + devices.tablet;

  // Previous period views for trend %
  const prevPeriodViews = prevDailyDocs.reduce((acc, curr) => acc + (curr.views || 0), 0);
  let viewsChangePercent = 0;
  if (prevPeriodViews > 0) {
    viewsChangePercent = Math.round(
      ((periodViews - prevPeriodViews) / prevPeriodViews) * 100
    );
  } else if (periodViews > 0) {
    viewsChangePercent = 100;
  }

  // Today's stats
  const todayItem = dailyMap.get(todayStr);
  const todayViews = todayItem?.views ?? 0;
  const todayVisitors = todayItem?.visitors ?? 0;

  // Top pages formatting
  const totalTopViews = topPageDocs.reduce((acc, curr) => acc + curr.totalViews, 0);
  const topPages = topPageDocs.map((item) => ({
    path: item._id,
    title: getFriendlyPageTitle(item._id),
    views: item.totalViews,
    percent: totalTopViews > 0 ? Math.round((item.totalViews / totalTopViews) * 100) : 0,
  }));

  const totalAllTime = {
    views: allTimeStats[0]?.totalViews ?? periodViews,
    visitors: allTimeStats[0]?.totalVisitors ?? periodVisitors,
  };

  return {
    today: {
      views: todayViews,
      visitors: todayVisitors,
    },
    period: {
      days,
      views: periodViews,
      visitors: periodVisitors,
      viewsChangePercent,
    },
    totalAllTime,
    dailyChart,
    topPages,
    devices,
  };
}
