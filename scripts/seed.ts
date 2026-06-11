import "dotenv/config";
import bcrypt from "bcryptjs";
import { upsertAdmin } from "../src/lib/db/admins";
import { upsertDoctorBySlug } from "../src/lib/db/doctors";
import { upsertPostBySlug } from "../src/lib/db/posts";
import { ensureDbIndexes } from "../src/lib/db/indexes";
import { blogPosts } from "../src/data/blog-posts";
import { seedDoctors } from "../src/data/doctors-seed";

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

  let homeIndex = 0;
  let aboutIndex = 0;

  for (const doctor of seedDoctors) {
    await upsertDoctorBySlug(doctor.slug, {
      ...doctor,
      homeSortOrder: doctor.showOnHome ? homeIndex++ : 0,
      aboutSortOrder: doctor.showOnAbout ? aboutIndex++ : 0,
      published: true,
    });
  }

  console.log(
    `Seeded ${cmsUsers.length} CMS users (${cmsUsers.map((user) => user.email).join(", ")}), ${blogPosts.length} blog posts, and ${seedDoctors.length} doctors.`
  );

  process.exit(0);
}

main().catch((error) => {
  console.error(error);
  process.exit(1);
});
