import { prisma } from "@/lib/prisma";
import type { BlogSection } from "@/data/blog-posts";

export type ContentPost = {
  id: string;
  slug: string;
  title: string;
  date: string;
  author?: string;
  category: string;
  section: BlogSection;
  image: string;
  excerpt: string;
  content: string;
  featured: boolean;
};

export type ContentJob = {
  id: string;
  slug: string;
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

function mapPost(post: {
  id: string;
  slug: string;
  title: string;
  excerpt: string;
  content: string;
  image: string;
  author: string | null;
  category: string;
  section: string;
  publishedAt: Date;
  featured: boolean;
}): ContentPost {
  return {
    id: post.id,
    slug: post.slug,
    title: post.title,
    date: formatDate(post.publishedAt),
    author: post.author ?? undefined,
    category: post.category,
    section: post.section as BlogSection,
    image: post.image,
    excerpt: post.excerpt,
    content: post.content,
    featured: post.featured,
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

export async function getPublishedPosts(section?: BlogSection) {
  return safeQuery(async () => {
    const posts = await prisma.post.findMany({
      where: {
        published: true,
        ...(section ? { section } : {}),
      },
      orderBy: [{ sortOrder: "asc" }, { publishedAt: "desc" }],
    });
    return posts.map(mapPost);
  }, []);
}

export async function getPublishedPostBySlug(slug: string) {
  return safeQuery(async () => {
    const post = await prisma.post.findFirst({
      where: { slug, published: true },
    });
    return post ? mapPost(post) : null;
  }, null);
}

export async function getAllPublishedPostSlugs() {
  return safeQuery(async () => {
    const posts = await prisma.post.findMany({
      where: { published: true },
      select: { slug: true },
    });
    return posts.map((post) => post.slug);
  }, []);
}

export async function getFeaturedNewsAndEvents(limit = 3) {
  return safeQuery(async () => {
    const posts = await prisma.post.findMany({
      where: {
        published: true,
        section: { in: ["hospital-news", "hospital-events"] },
      },
      orderBy: [{ sortOrder: "asc" }, { publishedAt: "desc" }],
      take: limit,
    });
    return posts.map(mapPost);
  }, []);
}

export async function getPublishedJobs() {
  return safeQuery(async () => {
    const jobs = await prisma.job.findMany({
      where: { published: true },
      orderBy: { postedAt: "desc" },
    });
    return jobs.map(mapJob);
  }, []);
}

export async function getPublishedJobBySlug(slug: string) {
  return safeQuery(async () => {
    const job = await prisma.job.findFirst({
      where: { slug, published: true },
    });
    return job ? mapJob(job) : null;
  }, null);
}

export async function getAllPublishedJobSlugs() {
  return safeQuery(async () => {
    const jobs = await prisma.job.findMany({
      where: { published: true },
      select: { slug: true },
    });
    return jobs.map((job) => job.slug);
  }, []);
}

function mapJob(job: {
  id: string;
  slug: string;
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
