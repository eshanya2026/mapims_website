import { findJobs } from "@/lib/db/jobs";
import { findPosts } from "@/lib/db/posts";
import type { BlogSection } from "@/data/blog-posts";
import { decodeHtmlEntities } from "@/lib/html-utils";

export type ContentPost = {
  id: string;
  slug: string;
  title: string;
  date: string;
  publishedAt?: string;
  author?: string;
  category: string;
  section: BlogSection;
  image: string;
  video?: string;
  excerpt: string;
  content: string;
  featured: boolean;
  isIncoming?: boolean;
  eventDate?: string;
  sortOrder?: number;
};

export type ContentJob = {
  id: string;
  slug: string;
  jobRefNo: string | null;
  title: string;
  department: string;
  location: string;
  employmentType: string;
  vacancy: number;
  summary: string;
  description: string;
  requirements: string;
  qualifications: string;
  applyEmail: string | null;
  applyUrl: string | null;
  postedAt: string;
  closingDate: string | null;
};

function formatDate(date: Date) {
  return date.toLocaleDateString("en-US", {
    year: "numeric",
    month: "long",
    day: "numeric",
  });
}

function normalizeBlogSection(section: string): BlogSection {
  if (section === "hospital-events" || section === "hospitals-events") {
    return "hospitals-events";
  }
  if (section === "hospital-news" || section === "hospitals-news") {
    return "hospitals-news";
  }
  return section as BlogSection;
}

function mapPost(post: {
  id: string;
  slug: string;
  title: string;
  excerpt: string;
  content: string;
  image: string;
  video?: string | null;
  author: string | null;
  category: string;
  section: string;
  publishedAt: Date;
  featured: boolean;
  isIncoming?: boolean;
  eventDate?: string | null;
  sortOrder?: number;
}): ContentPost {
  let isIncoming = Boolean(post.isIncoming);
  if (isIncoming && post.eventDate) {
    // If eventDate is provided (e.g. YYYY-MM-DD), set to end of that day (23:59:59.999)
    const eventTime = new Date(post.eventDate);
    eventTime.setHours(23, 59, 59, 999);
    if (!isNaN(eventTime.getTime()) && Date.now() > eventTime.getTime()) {
      isIncoming = false;
    }
  }

  return {
    id: post.id,
    slug: post.slug,
    title: decodeHtmlEntities(post.title),
    date: formatDate(post.publishedAt),
    publishedAt:
      post.publishedAt instanceof Date
        ? post.publishedAt.toISOString()
        : new Date(post.publishedAt).toISOString(),
    author: post.author ? decodeHtmlEntities(post.author) : undefined,
    category: post.category,
    section: normalizeBlogSection(post.section),
    image: post.image,
    video: post.video || undefined,
    excerpt: decodeHtmlEntities(post.excerpt),
    content: post.content,
    featured: post.featured,
    isIncoming,
    eventDate: post.eventDate || undefined,
    sortOrder: post.sortOrder,
  };
}

async function safeQuery<T>(fn: () => Promise<T>, fallback: T): Promise<T> {
  try {
    return await fn();
  } catch (error) {
    if (process.env.NODE_ENV === "development") {
      console.warn("[content] Database query failed:", error);
    }
    return fallback;
  }
}

export async function getPublishedPosts(
  section?: BlogSection,
  options?: { featured?: boolean; limit?: number }
) {
  return safeQuery(async () => {
    const posts = await findPosts({
      published: true,
      ...(options?.featured !== undefined ? { featured: options.featured } : {}),
      ...(options?.limit ? { limit: options.limit } : {}),
      ...(section
        ? {
            sections:
              section === "hospitals-events"
                ? ["hospitals-events", "hospital-events"]
                : section === "hospitals-news"
                  ? ["hospitals-news", "hospital-news"]
                  : [section],
          }
        : {}),
    });
    const mapped = posts.map(mapPost);
    if (section === "hospitals-events") {
      return mapped.sort((a, b) => {
        // 1. Incoming events come first
        if (a.isIncoming && !b.isIncoming) return -1;
        if (!a.isIncoming && b.isIncoming) return 1;

        // 2. If both are incoming events: sort by upcoming eventDate (earliest upcoming first) or newest publishedAt
        if (a.isIncoming && b.isIncoming) {
          const dateA = a.eventDate
            ? new Date(a.eventDate).getTime()
            : a.publishedAt
            ? new Date(a.publishedAt).getTime()
            : 0;
          const dateB = b.eventDate
            ? new Date(b.eventDate).getTime()
            : b.publishedAt
            ? new Date(b.publishedAt).getTime()
            : 0;
          return dateA - dateB;
        }

        // 3. For past events: strictly LATEST TO OLDER (newest published date first)
        const timeA = a.publishedAt ? new Date(a.publishedAt).getTime() : 0;
        const timeB = b.publishedAt ? new Date(b.publishedAt).getTime() : 0;
        return timeB - timeA;
      });
    }

    if (section === "hospitals-news") {
      // 1. Pinned hospital announcement articles (non-video posts) remain strictly at the top (top 3 posts)
      const preferredArticleOrder = [
        "special-benefits-for-general-ward-inpatients-at-adhiparasakthi-hospital",
        "ent-surgery-special-concession-packages",
        "special-concession-packages-for-ent-surgical-procedures",
        "special-concession-packages-for-general-surgery-procedures",
      ];

      const articles = mapped
        .filter((p) => !p.video)
        .sort((a, b) => {
          const idxA = preferredArticleOrder.indexOf(a.slug);
          const idxB = preferredArticleOrder.indexOf(b.slug);
          if (idxA !== -1 && idxB !== -1) return idxA - idxB;
          if (idxA !== -1) return -1;
          if (idxB !== -1) return 1;
          return (a.sortOrder ?? 0) - (b.sortOrder ?? 0);
        });

      // 2. Immediately after those 3 posts, ALL video posts are arranged strictly from LATEST TO OLDER
      const videos = mapped
        .filter((p) => Boolean(p.video))
        .sort((a, b) => {
          const timeA = a.publishedAt ? new Date(a.publishedAt).getTime() : 0;
          const timeB = b.publishedAt ? new Date(b.publishedAt).getTime() : 0;
          return timeB - timeA;
        });

      return [...articles, ...videos];
    }

    // For all other sections: strictly latest to older by publishedAt
    return mapped.sort((a, b) => {
      const timeA = a.publishedAt ? new Date(a.publishedAt).getTime() : 0;
      const timeB = b.publishedAt ? new Date(b.publishedAt).getTime() : 0;
      return timeB - timeA;
    });
  }, []);
}

export async function getPublishedPostBySlug(slug: string) {
  return safeQuery(async () => {
    const { findPostBySlug } = await import("@/lib/db/posts");
    const post = await findPostBySlug(slug, true);
    return post ? mapPost(post) : null;
  }, null);
}

export async function getAllPublishedPostSlugs() {
  return safeQuery(async () => {
    const posts = await findPosts({ published: true });
    return posts.map((post) => post.slug);
  }, []);
}

export async function getFeaturedNewsAndEvents(limit = 3) {
  return safeQuery(async () => {
    const posts = await findPosts({
      published: true,
      featured: true,
      sections: ["hospitals-news", "hospital-news", "hospitals-events", "hospital-events"],
      sort: { publishedAt: -1, sortOrder: 1 },
      limit,
    });
    return posts.map(mapPost);
  }, []);
}

export async function getPublishedJobs() {
  return safeQuery(async () => {
    const jobs = await findJobs({ published: true });
    return jobs.map(mapJob);
  }, []);
}

export async function getPublishedJobBySlug(slug: string) {
  return safeQuery(async () => {
    const { findJobBySlug } = await import("@/lib/db/jobs");
    const job = await findJobBySlug(slug, true);
    return job ? mapJob(job) : null;
  }, null);
}

export async function getAllPublishedJobSlugs() {
  return safeQuery(async () => {
    const jobs = await findJobs({ published: true });
    return jobs.map((job) => job.slug);
  }, []);
}

function mapJob(job: {
  id: string;
  slug: string;
  jobRefNo?: string | null;
  title: string;
  department: string;
  location: string;
  employmentType: string;
  vacancy: number;
  summary: string;
  description: string;
  requirements: string;
  qualifications: string;
  applyEmail: string | null;
  applyUrl: string | null;
  postedAt: Date;
  closingDate: Date | null;
}): ContentJob {
  return {
    id: job.id,
    slug: job.slug,
    jobRefNo: job.jobRefNo ?? null,
    title: job.title,
    department: job.department,
    location: job.location,
    employmentType: job.employmentType,
    vacancy: job.vacancy,
    summary: job.summary,
    description: job.description,
    requirements: job.requirements,
    qualifications: job.qualifications,
    applyEmail: job.applyEmail,
    applyUrl: job.applyUrl,
    postedAt: formatDate(job.postedAt),
    closingDate: job.closingDate ? formatDate(job.closingDate) : null,
  };
}
