import type { Metadata } from "next";
import BlogHero from "@/components/blog/BlogHero";
import BlogComingSoon from "@/components/blog/BlogComingSoon";
import BlogSectionNav from "@/components/blog/BlogSectionNav";

export const metadata: Metadata = {
  title: "Hospital Events | Adhiparasakthi Hospital Blog",
  description:
    "Health camps, conferences, and community events at Adhiparasakthi Hospitals, Melmaruvathur.",
};

export default function HospitalEventsPage() {
  return (
    <main className="min-h-screen">
      <BlogHero section="hospital-events" />
      <BlogSectionNav active="hospital-events" />
      <BlogComingSoon section="hospital-events" />
    </main>
  );
}
