import { getDb } from "@/lib/mongodb";

const CHAT_FEEDBACK_COLLECTION = "chat_feedback";

export type ChatFeedbackInput = {
  messageId: string;
  helpful: boolean;
  userQuestion?: string | null;
  assistantAnswer: string;
  clientIp?: string | null;
};

export async function saveChatFeedback(input: ChatFeedbackInput) {
  const db = await getDb();

  await db.collection(CHAT_FEEDBACK_COLLECTION).updateOne(
    { messageId: input.messageId },
    {
      $set: {
        messageId: input.messageId,
        helpful: input.helpful,
        userQuestion: input.userQuestion?.trim() || null,
        assistantAnswer: input.assistantAnswer.trim(),
        clientIp: input.clientIp ?? null,
        updatedAt: new Date(),
      },
      $setOnInsert: {
        createdAt: new Date(),
      },
    },
    { upsert: true }
  );
}
