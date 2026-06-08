import type { Metadata } from "next";
import BlogHero from "@/components/blog/BlogHero";
import BlogGrid from "@/components/blog/BlogGrid";
import BlogComingSoon from "@/components/blog/BlogComingSoon";
import BlogSectionNav from "@/components/blog/BlogSectionNav";
import { getPublishedPosts } from "@/lib/content";

export const metadata: Metadata = {
  title: "Hospital Events | Adhiparasakthi Hospital Blog",
  description:
    "Health camps, conferences, and community events at Adhiparasakthi Hospitals, Melmaruvathur.",
};

export default async function HospitalEventsPage() {
  const posts = await getPublishedPosts("hospital-events");

  return (
    <main className="min-h-screen">
      <BlogHero section="hospital-events" />
      <BlogSectionNav active="hospital-events" />
      {posts.length > 0 ? (
        <BlogGrid posts={posts} />
      ) : (
        <BlogComingSoon section="hospital-events" />
      )}
    </main>
  );
}
