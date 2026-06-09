import { Suspense } from "react";
import { prisma } from "@/lib/prisma";
import PostsCmsWorkspace from "@/components/admin/posts/PostsCmsWorkspace";
import type { BlogSection } from "@/data/blog-posts";
import type { AdminPostRecord } from "@/components/admin/posts/types";

async function PostsCmsLoader() {
  const posts = await prisma.post.findMany({
    orderBy: [{ section: "asc" }, { sortOrder: "asc" }, { publishedAt: "desc" }],
  });

  const serialized: AdminPostRecord[] = posts.map((post) => ({
    id: post.id,
    sortOrder: post.sortOrder,
    title: post.title,
    slug: post.slug,
    excerpt: post.excerpt,
    content: post.content,
    image: post.image,
    author: post.author ?? "",
    category: post.category,
    section: post.section as BlogSection,
    published: post.published,
    featured: post.featured,
    publishedAt: post.publishedAt.toISOString(),
    updatedAt: post.updatedAt.toISOString(),
  }));

  return <PostsCmsWorkspace posts={serialized} />;
}

export default function AdminPostsPage() {
  return (
    <Suspense
      fallback={
        <div className="flex h-[calc(100vh)] items-center justify-center text-sm text-slate-500">
          Loading editor...
        </div>
      }
    >
      <PostsCmsLoader />
    </Suspense>
  );
}
