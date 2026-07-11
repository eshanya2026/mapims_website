import type { Metadata } from "next";
import BlogHero from "@/components/blog/BlogHero";
import BlogGrid from "@/components/blog/BlogGrid";
import BlogComingSoon from "@/components/blog/BlogComingSoon";
import BlogSectionNav from "@/components/blog/BlogSectionNav";
import { getPublishedPosts } from "@/lib/content";

export const metadata: Metadata = {
  title: "Hospitals News | Adhiparasakthi Hospitals Blog",
  description:
    "Hospitals announcements, milestones, and updates from Adhiparasakthi Hospitals at Melmaruvathur.",
};

export default async function HospitalsNewsPage() {
  const posts = await getPublishedPosts("hospitals-news");

  return (
    <main className="min-h-screen">
      <BlogHero section="hospitals-news" />
      <BlogSectionNav active="hospitals-news" />
      {posts.length > 0 ? <BlogGrid posts={posts} /> : <BlogComingSoon section="hospitals-news" />}
    </main>
  );
}
