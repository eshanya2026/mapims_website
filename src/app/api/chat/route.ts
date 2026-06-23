import { NextResponse } from "next/server";
import { z } from "zod";

import {
  assertChatRateLimit,
  CHAT_RATE_LIMIT_MESSAGE,
  recordChatRequest,
} from "@/lib/live-chat-guard";
import { generateLiveChatReply } from "@/lib/live-chat-groq";
import {
  buildOutOfScopeReply,
  isOutOfScopeChatMessage,
} from "@/lib/live-chat-scope";
import { getClientIpFromRequest } from "@/lib/request-client-ip";

const chatMessageSchema = z.object({
  role: z.enum(["user", "assistant"]),
  content: z.string().trim().min(1).max(2000),
});

const chatRequestSchema = z.object({
  messages: z.array(chatMessageSchema).min(1).max(20),
});

function chatErrorStatus(message: string) {
  if (message === CHAT_RATE_LIMIT_MESSAGE) return 429;
  if (message.includes("GROQ_API_KEY")) return 503;
  return 500;
}

export async function POST(request: Request) {
  try {
    const body = await request.json();
    const parsed = chatRequestSchema.safeParse(body);

    if (!parsed.success) {
      const firstIssue = parsed.error.issues[0];
      const message = firstIssue?.message ?? "Invalid chat request.";
      return NextResponse.json({ error: message }, { status: 400 });
    }

    const clientIp = getClientIpFromRequest(request);
    await assertChatRateLimit(clientIp);

    const messages = parsed.data.messages;
    const lastMessage = messages[messages.length - 1];

    if (lastMessage.role !== "user") {
      return NextResponse.json(
        { error: "The last message must be from the user." },
        { status: 400 }
      );
    }

    if (isOutOfScopeChatMessage(lastMessage.content)) {
      await recordChatRequest(clientIp);
      return NextResponse.json({ reply: buildOutOfScopeReply() });
    }

    const reply = await generateLiveChatReply(messages);
    await recordChatRequest(clientIp);

    return NextResponse.json({ reply });
  } catch (error) {
    console.error("[chat POST]", error);
    const message =
      error instanceof Error
        ? error.message
        : "Unable to send your message right now. Please try again.";
    return NextResponse.json({ error: message }, { status: chatErrorStatus(message) });
  }
}
