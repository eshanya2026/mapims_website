import { NextResponse } from "next/server";
import { prisma } from "@/lib/prisma";

export async function GET(request: Request) {
  const { searchParams } = new URL(request.url);
  const type = searchParams.get("type");

  const inquiries = await prisma.formSubmission.findMany({
    where: type ? { type } : undefined,
    orderBy: { createdAt: "desc" },
  });

  return NextResponse.json(inquiries, {
    headers: {
      "Cache-Control": "no-store, max-age=0",
    },
  });
}
