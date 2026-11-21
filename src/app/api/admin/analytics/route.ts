import { NextRequest, NextResponse } from "next/server";
import { requireApiPermission } from "@/lib/admin-api-auth";
import { getAnalyticsSummary } from "@/lib/db/analytics";

export const dynamic = "force-dynamic";

export async function GET(request: NextRequest) {
  const auth = await requireApiPermission("dashboard");
  if (auth.error) return auth.error;

  try {
    const { searchParams } = new URL(request.url);
    const daysParam = parseInt(searchParams.get("days") || "14", 10);
    const days = [7, 14, 30].includes(daysParam) ? daysParam : 14;

    const summary = await getAnalyticsSummary(days);
    return NextResponse.json(summary);
  } catch (error) {
    console.error("[api/admin/analytics] Error:", error);
    return NextResponse.json(
      { error: "Failed to retrieve analytics" },
      { status: 500 }
    );
  }
}

