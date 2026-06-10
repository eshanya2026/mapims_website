import { NextResponse } from "next/server";
import { hydrateMissingAppointmentReferences } from "@/lib/appointment-reference-id";
import { listFormSubmissions } from "@/lib/db/form-submissions";

export async function GET(request: Request) {
  const { searchParams } = new URL(request.url);
  const type = searchParams.get("type");

  const inquiries = await hydrateMissingAppointmentReferences(
    await listFormSubmissions(type ? { type } : undefined)
  );

  return NextResponse.json(inquiries, {
    headers: {
      "Cache-Control": "no-store, max-age=0",
    },
  });
}
