import { listPosts } from "@/lib/db/posts";
import PostsCmsWorkspace from "@/components/admin/posts/PostsCmsWorkspace";
import type { AdminPostRecord } from "@/components/admin/posts/types";
import type { BlogSection } from "@/data/blog-posts";

function serializePosts(
  posts: Awaited<ReturnType<typeof listPosts>>
): AdminPostRecord[] {
  return posts.map((post) => ({
    id: post.id,
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
    sortOrder: post.sortOrder,
    publishedAt: post.publishedAt.toISOString(),
    updatedAt: post.updatedAt.toISOString(),
  }));
}

export default async function AdminPostsPage() {
  const posts = await listPosts();

  return <PostsCmsWorkspace posts={serializePosts(posts)} />;
}
