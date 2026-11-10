import type { BlogSection } from "@/data/blog-posts";

export type PostFormData = {
  id?: string;
  title: string;
  slug: string;
  excerpt: string;
  content: string;
  image: string;
  video?: string;
  author: string;
  category: string;
  section: BlogSection;
  published: boolean;
  featured: boolean;
  isIncoming?: boolean;
  eventDate?: string;
  publishedAt?: string;
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

    if (a.section === "hospitals-news") {
      const aIsVideo = Boolean(a.video?.trim());
      const bIsVideo = Boolean(b.video?.trim());

      // Pinned non-video announcement articles come first
      if (!aIsVideo && bIsVideo) return -1;
      if (aIsVideo && !bIsVideo) return 1;

      // Between articles: preserve sortOrder
      if (!aIsVideo && !bIsVideo) {
        if (a.sortOrder !== b.sortOrder) return a.sortOrder - b.sortOrder;
      }

      // Between videos: strictly latest to older (newest published date first)
      const timeA = a.publishedAt ? new Date(a.publishedAt).getTime() : 0;
      const timeB = b.publishedAt ? new Date(b.publishedAt).getTime() : 0;
      if (timeA !== timeB) return timeB - timeA;
      return a.sortOrder - b.sortOrder;
    }

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
    video: "",
    author: "Adhiparasakthi Hospitals",
    category:
      section === "hospitals-news"
        ? "Hospitals News"
        : section === "hospitals-events"
        ? "Hospitals Events"
        : "Health Insights",
    section,
    published: false,
    featured: false,
    isIncoming: false,
    eventDate: "",
  };
}

export function formatPreviewDate(date = new Date()) {
  return date.toLocaleDateString("en-US", {
    year: "numeric",
    month: "long",
    day: "numeric",
  });
}
