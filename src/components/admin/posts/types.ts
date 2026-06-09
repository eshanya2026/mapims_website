import type { BlogSection } from "@/data/blog-posts";

export type PostFormData = {
  id?: string;
  title: string;
  slug: string;
  excerpt: string;
  content: string;
  image: string;
  author: string;
  category: string;
  section: BlogSection;
  published: boolean;
  featured: boolean;
};

export type AdminPostRecord = PostFormData & {
  id: string;
  sortOrder: number;
  publishedAt: string;
  updatedAt: string;
};

export function sortAdminPosts(posts: AdminPostRecord[]) {
  return [...posts].sort((a, b) => {
    if (a.section !== b.section) return a.section.localeCompare(b.section);
    if (a.sortOrder !== b.sortOrder) return a.sortOrder - b.sortOrder;
    return new Date(b.publishedAt).getTime() - new Date(a.publishedAt).getTime();
  });
}

export const BLOG_PLACEHOLDER_IMAGE =
  "/images/blog/579502f2-f668-42e9-be7a-995936f42cfa.png";

export function createEmptyPost(section: BlogSection): PostFormData {
  return {
    title: "",
    slug: "",
    excerpt: "",
    content: "",
    image: "",
    author: "",
    category: "",
    section,
    published: false,
    featured: false,
  };
}

export function formatPreviewDate(date = new Date()) {
  return date.toLocaleDateString("en-US", {
    year: "numeric",
    month: "long",
    day: "numeric",
  });
}
