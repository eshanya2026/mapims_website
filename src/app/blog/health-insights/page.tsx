import type { Metadata } from "next";
import BlogHero from "@/components/blog/BlogHero";
import BlogGrid from "@/components/blog/BlogGrid";
import BlogSectionNav from "@/components/blog/BlogSectionNav";

export const metadata: Metadata = {
  title: "Health Insights | Adhiparasakthi Hospital Blog",
  description:
    "Expert health tips, preventive care guidance, and wellness advice from Adhiparasakthi Hospitals at Melmaruvathur.",
};

export default function HealthInsightsPage() {
  return (
    <main className="min-h-screen">
      <BlogHero section="health-insights" />
      <BlogSectionNav active="health-insights" />
      <BlogGrid section="health-insights" />
    </main>
  );
}
