import type { Metadata } from "next";
import BlogHero from "@/components/blog/BlogHero";
import BlogGrid from "@/components/blog/BlogGrid";
import BlogComingSoon from "@/components/blog/BlogComingSoon";
import BlogSectionNav from "@/components/blog/BlogSectionNav";
import { getPublishedPosts } from "@/lib/content";

export const metadata: Metadata = {
  title: "Hospital News | Adhiparasakthi Hospital Blog",
  description:
    "Hospital announcements, milestones, and updates from Adhiparasakthi Hospitals at Melmaruvathur.",
};

export default async function HospitalNewsPage() {
  const posts = await getPublishedPosts("hospital-news");

  return (
    <main className="min-h-screen">
      <BlogHero section="hospital-news" />
      <BlogSectionNav active="hospital-news" />
      {posts.length > 0 ? <BlogGrid posts={posts} /> : <BlogComingSoon section="hospital-news" />}
    </main>
  );
}
