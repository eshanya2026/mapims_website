import { NextResponse } from "next/server";
import { revalidatePath } from "next/cache";
import { findPosts, reorderPostsInSection } from "@/lib/db/posts";
import { postReorderSchema } from "@/lib/validations";

export async function PUT(request: Request) {
  try {
    const body = await request.json();
    const parsed = postReorderSchema.safeParse(body);

    if (!parsed.success) {
      return NextResponse.json(
        { error: "Invalid reorder payload" },
        { status: 400 }
      );
    }

    const { section, orderedIds } = parsed.data;

    const sectionPosts = await findPosts({ section });
    const sectionIds = new Set(sectionPosts.map((post) => post.id));
    const validIds = orderedIds.filter((id) => sectionIds.has(id));

    if (validIds.length !== orderedIds.length) {
      return NextResponse.json(
        { error: "One or more posts do not belong to this section" },
        { status: 400 }
      );
    }

    await reorderPostsInSection(section, validIds);

    revalidatePath("/");
    revalidatePath(`/blog/${section}`);
    revalidatePath("/blog");

    return NextResponse.json({ ok: true });
  } catch (error) {
    console.error("[admin/posts/reorder PUT]", error);
    return NextResponse.json({ error: "Failed to reorder posts" }, { status: 500 });
  }
}
