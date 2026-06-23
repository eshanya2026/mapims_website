import { NextResponse } from "next/server";
import { z } from "zod";

import { saveChatFeedback } from "@/lib/chat-feedback";
import { getClientIpFromRequest } from "@/lib/request-client-ip";

const chatFeedbackSchema = z.object({
  messageId: z.string().trim().min(1).max(120),
  helpful: z.boolean(),
  userQuestion: z.string().trim().max(2000).optional().nullable(),
  assistantAnswer: z.string().trim().min(1).max(8000),
});

export async function POST(request: Request) {
  try {
    const body = await request.json();
    const parsed = chatFeedbackSchema.safeParse(body);

    if (!parsed.success) {
      const firstIssue = parsed.error.issues[0];
      const message = firstIssue?.message ?? "Invalid feedback request.";
      return NextResponse.json({ error: message }, { status: 400 });
    }

    await saveChatFeedback({
      ...parsed.data,
      clientIp: getClientIpFromRequest(request),
    });

    return NextResponse.json({ ok: true });
  } catch (error) {
    console.error("[chat feedback POST]", error);
    return NextResponse.json(
      { error: "Unable to save feedback right now." },
      { status: 500 }
    );
  }
}
