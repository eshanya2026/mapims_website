import { liveChatContact } from "@/data/live-chat";
import { getDb } from "@/lib/mongodb";

export const CHAT_IP_RATE_LIMIT_WINDOW_MS = 60 * 60 * 1000;
export const CHAT_IP_RATE_LIMIT_MAX = 30;

export const CHAT_RATE_LIMIT_MESSAGE = `You've reached the chat usage limit for now.

Please try again in about an hour.

Need immediate assistance?

📞 ${liveChatContact.phone}
📧 ${liveChatContact.email}`;

const CHAT_REQUESTS_COLLECTION = "chat_requests";

export async function assertChatRateLimit(clientIp: string | null) {
  if (!clientIp) return;

  const since = new Date(Date.now() - CHAT_IP_RATE_LIMIT_WINDOW_MS);
  const db = await getDb();
  const recentCount = await db.collection(CHAT_REQUESTS_COLLECTION).countDocuments({
    ip: clientIp,
    createdAt: { $gte: since },
  });

  if (recentCount >= CHAT_IP_RATE_LIMIT_MAX) {
    throw new Error(CHAT_RATE_LIMIT_MESSAGE);
  }
}

export async function recordChatRequest(clientIp: string | null) {
  if (!clientIp) return;

  const db = await getDb();
  await db.collection(CHAT_REQUESTS_COLLECTION).insertOne({
    ip: clientIp,
    createdAt: new Date(),
  });
}
