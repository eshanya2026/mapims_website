import type { Metadata } from "next";
import BlogHero from "@/components/blog/BlogHero";
import BlogComingSoon from "@/components/blog/BlogComingSoon";
import BlogSectionNav from "@/components/blog/BlogSectionNav";
import EmergencyCTA from "@/components/home/EmergencyCTA";

export const metadata: Metadata = {
  title: "Hospital News | Adhiparasakthi Hospital Blog",
  description:
    "Hospital announcements, milestones, and updates from Adhiparasakthi Hospitals at Melmaruvathur.",
};

export default function HospitalNewsPage() {
  return (
    <main className="min-h-screen">
      <BlogHero section="hospital-news" />
      <BlogSectionNav active="hospital-news" />
      <BlogComingSoon section="hospital-news" />
      <EmergencyCTA />
    </main>
  );
}
