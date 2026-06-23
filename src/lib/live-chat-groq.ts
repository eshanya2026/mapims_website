import { buildLiveChatSystemPrompt } from "@/lib/live-chat-knowledge";
import { formatChatReply } from "@/lib/live-chat-answers";

export type LiveChatApiMessage = {
  role: "user" | "assistant";
  content: string;
};

const GROQ_API_URL = "https://api.groq.com/openai/v1/chat/completions";
const DEFAULT_GROQ_MODEL = "llama-3.3-70b-versatile";

function getGroqModel() {
  return process.env.GROQ_MODEL?.trim() || DEFAULT_GROQ_MODEL;
}

export async function generateLiveChatReply(
  messages: LiveChatApiMessage[]
): Promise<string> {
  const apiKey = process.env.GROQ_API_KEY?.trim();
  if (!apiKey) {
    throw new Error("GROQ_API_KEY is not configured on the server.");
  }

  const response = await fetch(GROQ_API_URL, {
    method: "POST",
    headers: {
      Authorization: `Bearer ${apiKey}`,
      "Content-Type": "application/json",
    },
    body: JSON.stringify({
      model: getGroqModel(),
      temperature: 0.3,
      max_tokens: 600,
      messages: [
        { role: "system", content: buildLiveChatSystemPrompt() },
        ...messages,
      ],
    }),
  });

  if (!response.ok) {
    const errorBody = await response.text().catch(() => "");
    console.error("[live-chat groq]", response.status, errorBody);
    throw new Error("Unable to get a reply right now. Please try again shortly.");
  }

  const data = (await response.json()) as {
    choices?: Array<{ message?: { content?: string } }>;
  };

  const content = data.choices?.[0]?.message?.content?.trim();
  if (!content) {
    throw new Error("The assistant returned an empty reply. Please try again.");
  }

  return formatChatReply(content);
}
