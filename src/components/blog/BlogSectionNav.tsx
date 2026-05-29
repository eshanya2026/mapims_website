import Link from "next/link";
import { blogSections, type BlogSection } from "@/data/blog-posts";
import { cn } from "@/lib/utils";

type BlogSectionNavProps = {
  active: BlogSection;
};

export default function BlogSectionNav({ active }: BlogSectionNavProps) {
  return (
    <section className="border-b border-slate-100 bg-white">
      <div className="container mx-auto px-4 py-3 sm:px-6 sm:py-4">
        <nav className="-mx-4 flex gap-2 overflow-x-auto px-4 pb-1 [-ms-overflow-style:none] [scrollbar-width:none] sm:mx-0 sm:flex-wrap sm:overflow-visible sm:px-0 sm:pb-0 [&::-webkit-scrollbar]:hidden">
          {blogSections.map((section) => (
            <Link
              key={section.slug}
              href={section.href}
              className={cn(
                "shrink-0 rounded-full px-3.5 py-2 text-xs font-semibold transition-colors sm:px-4 sm:text-sm",
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
