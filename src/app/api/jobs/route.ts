import { NextResponse } from "next/server";
import { getPublishedJobs } from "@/lib/content";

export async function GET() {
  const jobs = await getPublishedJobs();
  return NextResponse.json(jobs);
}
