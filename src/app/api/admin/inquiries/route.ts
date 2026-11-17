import { NextResponse } from "next/server";
import { hydrateMissingSubmissionReferences } from "@/lib/appointment-reference-id";
import { requireApiPermission } from "@/lib/admin-api-auth";
import { canAccessEnquiryType, resolveEnquiryFilterForRole } from "@/lib/admin-roles";
import { deleteFormSubmission, findFormSubmissionById } from "@/lib/db/form-submissions";
import { listEnquiriesForRole } from "@/lib/enquiry-access";

export async function GET(request: Request) {
  const auth = await requireApiPermission("inquiries");
  if (auth.error) return auth.error;

  const { searchParams } = new URL(request.url);
  const type = searchParams.get("type");
  const filter = resolveEnquiryFilterForRole(auth.session.role, type);

  const inquiries = await hydrateMissingSubmissionReferences(
    await listEnquiriesForRole(auth.session.role, filter)
  );

  return NextResponse.json(inquiries, {
    headers: {
      "Cache-Control": "no-store, max-age=0",
    },
  });
}

export async function DELETE(request: Request) {
  const auth = await requireApiPermission("inquiries");
  if (auth.error) return auth.error;

  try {
    const body = await request.json().catch(() => ({}));
    const ids = Array.isArray(body?.ids) ? (body.ids as string[]) : [];

    if (ids.length === 0) {
      return NextResponse.json({ error: "No inquiry IDs provided" }, { status: 400 });
    }

    let deletedCount = 0;
    for (const id of ids) {
      if (typeof id !== "string" || !id.trim()) continue;
      const existing = await findFormSubmissionById(id);
      if (!existing) continue;
      if (!canAccessEnquiryType(auth.session.role, existing.type)) continue;

      const deleted = await deleteFormSubmission(id);
      if (deleted) deletedCount++;
    }

    return NextResponse.json({ ok: true, count: deletedCount });
  } catch (error) {
    console.error("[admin/inquiries DELETE]", error);
    return NextResponse.json({ error: "Failed to delete inquiries" }, { status: 500 });
  }
}
