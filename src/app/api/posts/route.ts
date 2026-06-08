import { NextResponse } from "next/server";
import { getPublishedPosts } from "@/lib/content";
import type { BlogSection } from "@/data/blog-posts";

export async function GET(request: Request) {
  const { searchParams } = new URL(request.url);
  const section = searchParams.get("section") as BlogSection | null;

  const validSections = ["hospital-events", "hospital-news", "health-insights"];
  const posts = await getPublishedPosts(
    section && validSections.includes(section) ? section : undefined
  );

  return NextResponse.json(posts);
}
