import type { Metadata } from "next";
import BlogHero from "@/components/blog/BlogHero";
import BlogGrid from "@/components/blog/BlogGrid";
import BlogComingSoon from "@/components/blog/BlogComingSoon";
import BlogSectionNav from "@/components/blog/BlogSectionNav";
import { getPublishedPosts } from "@/lib/content";

export const metadata: Metadata = {
  title: "Hospitals Events | Adhiparasakthi Hospitals Blog",
  description:
    "Health camps, conferences, and community events at Adhiparasakthi Hospitals, Melmaruvathur.",
};

export default async function HospitalsEventsPage() {
  const posts = await getPublishedPosts("hospitals-events");

  return (
    <main className="min-h-screen">
      <BlogHero section="hospitals-events" />
      <BlogSectionNav active="hospitals-events" />
      {posts.length > 0 ? (
        <BlogGrid posts={posts} />
      ) : (
        <BlogComingSoon section="hospitals-events" />
      )}
    </main>
  );
}
