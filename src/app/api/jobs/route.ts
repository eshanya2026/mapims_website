import { NextResponse } from "next/server";
import { getPublishedJobs } from "@/lib/content";

export const dynamic = "force-dynamic";
export const revalidate = 0;

export async function GET() {
  const jobs = await getPublishedJobs();
  return NextResponse.json(jobs);
}
