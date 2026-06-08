import { z } from "zod";

export const loginSchema = z.object({
  email: z.string().email(),
  password: z.string().min(6),
});

export const postSchema = z.object({
  title: z.string().min(3),
  slug: z.string().min(3),
  excerpt: z.string().min(10),
  content: z.string().min(20),
  image: z.string().min(1),
  author: z.string().optional(),
  category: z.string().min(2),
  section: z.enum(["hospital-events", "hospital-news", "health-insights"]),
  published: z.boolean().default(false),
  featured: z.boolean().default(false),
});

export const jobSchema = z.object({
  title: z.string().min(3),
  slug: z.string().min(3),
  department: z.string().min(2),
  location: z.string().min(2),
  employmentType: z.string().min(2),
  summary: z.string().min(10),
  description: z.string().min(20),
  requirements: z.string().min(10),
  applyEmail: z.string().email().optional().or(z.literal("")),
  applyUrl: z.string().url().optional().or(z.literal("")),
  published: z.boolean().default(false),
  closingDate: z.string().optional().or(z.literal("")),
});
