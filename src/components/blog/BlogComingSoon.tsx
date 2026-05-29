import Link from "next/link";
import { Clock } from "lucide-react";
import { getBlogSection, type BlogSection } from "@/data/blog-posts";

type BlogComingSoonProps = {
  section: BlogSection;
};

export default function BlogComingSoon({ section }: BlogComingSoonProps) {
  const activeSection = getBlogSection(section);

  return (
    <section className="section-padding bg-slate-50">
      <div className="container mx-auto px-4">
        <div className="max-w-xl mx-auto text-center bg-white rounded-2xl border border-slate-100 shadow-sm p-10 md:p-12">
          <div className="w-14 h-14 rounded-full bg-red-50 flex items-center justify-center mx-auto mb-6">
            <Clock className="w-7 h-7 text-red-600" />
          </div>
          <h2 className="text-2xl md:text-3xl font-bold text-slate-900 mb-4">
            Content coming soon
          </h2>
          <p className="text-slate-600 leading-relaxed mb-8">
            We are preparing {activeSection?.label.toLowerCase()} for
            Adhiparasakthi Hospitals. Please check back soon for the latest
            updates.
          </p>
          <Link
            href="/blog/health-insights"
            className="inline-flex items-center justify-center rounded-full bg-red-600 px-6 py-3 text-sm font-semibold text-white hover:bg-red-700 transition-colors"
          >
            Read Health Insights
          </Link>
        </div>
      </div>
    </section>
  );
}
