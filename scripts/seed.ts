import "dotenv/config";
import bcrypt from "bcryptjs";
import { upsertAdmin } from "../src/lib/db/admins";
import { upsertPostBySlug } from "../src/lib/db/posts";
import { ensureDbIndexes } from "../src/lib/db/indexes";
import { blogPosts } from "../src/data/blog-posts";

const cmsUsers = [
  {
    email: "admin@mapims.edu.in",
    password: process.env.ADMIN_PASSWORD ?? "admin123",
    name: "MAPIMS Admin",
    role: "super_admin",
  },
  {
    email: "hr@mapims.edu.in",
    password: process.env.HR_PASSWORD ?? "hrmapims123",
    name: "HR Team",
    role: "hr",
  },
  {
    email: "dm@mapims.edu.in",
    password: process.env.DM_PASSWORD ?? "dmmapims123",
    name: "Marketing Team",
    role: "marketing",
  },
  {
    email: "reception@mapims.edu.in",
    password: process.env.RECEPTION_PASSWORD ?? "recepmapims123",
    name: "Front Office",
    role: "front_office",
  },
] as const;

async function seedAdminUsers() {
  for (const user of cmsUsers) {
    const passwordHash = await bcrypt.hash(user.password, 12);
    await upsertAdmin({
      email: user.email,
      passwordHash,
      name: user.name,
      role: user.role,
    });
  }
}

async function main() {
  await ensureDbIndexes();
  await seedAdminUsers();

  const sortOrderBySection: Record<string, number> = {};

  for (const post of blogPosts) {
    const sortOrder = sortOrderBySection[post.section] ?? 0;
    sortOrderBySection[post.section] = sortOrder + 1;

    await upsertPostBySlug(post.slug, {
      slug: post.slug,
      title: post.title,
      excerpt: post.excerpt,
      content: post.content,
      image: post.image,
      author: post.author ?? null,
      category: post.category,
      section: post.section,
      sortOrder,
      published: true,
      featured: false,
      publishedAt: new Date(post.date),
    });
  }

  console.log(
    `Seeded ${cmsUsers.length} CMS users (${cmsUsers.map((user) => user.email).join(", ")}) and ${blogPosts.length} blog posts.`
  );

  process.exit(0);
}

main().catch((error) => {
  console.error(error);
  process.exit(1);
});
