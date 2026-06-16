import { NextResponse } from "next/server";
import { requireApiPath } from "@/lib/admin-api-auth";
import {
  canManageTrashItem,
  getTrashResourcesForRole,
  purgeTrashItem,
  revalidateAfterTrashRestore,
  restoreTrashItem,
} from "@/lib/trash-actions";
import { listTrashItems, type TrashResource } from "@/lib/db/trash";

function isTrashResource(value: string): value is TrashResource {
  return value === "posts" || value === "jobs" || value === "doctors" || value === "inquiries";
}

export async function GET() {
  const auth = await requireApiPath("/api/admin/trash");
  if (auth.error) return auth.error;

  const resources = getTrashResourcesForRole(auth.session.role);
  const items = await listTrashItems(resources);

  return NextResponse.json(items);
}

export async function POST(request: Request) {
  const auth = await requireApiPath("/api/admin/trash");
  if (auth.error) return auth.error;

  try {
    const body = await request.json();
    const action = body.action;
    const resource = body.resource;
    const id = typeof body.id === "string" ? body.id : "";

    if (!isTrashResource(resource) || !id) {
      return NextResponse.json({ error: "Invalid request" }, { status: 400 });
    }

    if (!canManageTrashItem(auth.session.role, resource)) {
      return NextResponse.json({ error: "Forbidden" }, { status: 403 });
    }

    if (action === "restore") {
      const restored = await restoreTrashItem(resource, id);
      if (!restored) {
        return NextResponse.json({ error: "Not found" }, { status: 404 });
      }
      revalidateAfterTrashRestore(resource, restored);
      return NextResponse.json({ ok: true, item: restored });
    }

    if (action === "purge") {
      const purged = await purgeTrashItem(resource, id);
      if (!purged) {
        return NextResponse.json({ error: "Not found" }, { status: 404 });
      }
      return NextResponse.json({ ok: true });
    }

    return NextResponse.json({ error: "Invalid action" }, { status: 400 });
  } catch (error) {
    console.error("[admin/trash POST]", error);
    return NextResponse.json({ error: "Failed to update trash item" }, { status: 500 });
  }
}
