import { NextResponse } from "next/server";
import { hydrateMissingSubmissionReferences } from "@/lib/appointment-reference-id";
import { requireApiPermission } from "@/lib/admin-api-auth";
import { resolveEnquiryFilterForRole } from "@/lib/admin-roles";
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
