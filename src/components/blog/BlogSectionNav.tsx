import Link from "next/link";
import { blogSections, type BlogSection } from "@/data/blog-posts";
import { cn } from "@/lib/utils";

type BlogSectionNavProps = {
  active: BlogSection;
};

export default function BlogSectionNav({ active }: BlogSectionNavProps) {
  return (
    <section className="bg-white border-b border-slate-100">
      <div className="container mx-auto px-4 py-4">
        <nav className="flex flex-wrap gap-2">
          {blogSections.map((section) => (
            <Link
              key={section.slug}
              href={section.href}
              className={cn(
                "px-4 py-2 rounded-full text-sm font-semibold transition-colors",
                active === section.slug
                  ? "bg-red-600 text-white shadow-md shadow-red-600/20"
                  : "bg-slate-50 text-slate-600 border border-slate-200 hover:border-red-200 hover:text-red-600"
              )}
            >
              {section.label}
            </Link>
          ))}
        </nav>
      </div>
    </section>
  );
}
