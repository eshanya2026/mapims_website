import { buildLiveChatSystemPrompt } from "@/lib/live-chat-knowledge";
import { formatChatReply } from "@/lib/live-chat-answers";

export type LiveChatApiMessage = {
  role: "user" | "assistant";
  content: string;
};

const OPENROUTER_API_URL = "https://openrouter.ai/api/v1/chat/completions";
const DEFAULT_OPENROUTER_MODEL = "meta-llama/llama-3.3-70b-instruct";

const GROQ_API_URL = "https://api.groq.com/openai/v1/chat/completions";
const DEFAULT_GROQ_MODEL = "llama-3.3-70b-versatile";

export async function generateLiveChatReply(
  messages: LiveChatApiMessage[]
): Promise<string> {
  const openRouterKey = process.env.OPENROUTER_API_KEY?.trim();
  const groqKey = process.env.GROQ_API_KEY?.trim();

  // If OPENROUTER_API_KEY is present, use OpenRouter.
  // Fall back to GROQ_API_KEY if only groq is configured.
  if (!openRouterKey && !groqKey) {
    throw new Error("OPENROUTER_API_KEY is not configured on the server.");
  }

  const useOpenRouter = Boolean(openRouterKey);
  const apiKey = useOpenRouter ? openRouterKey : groqKey;
  const apiUrl = useOpenRouter ? OPENROUTER_API_URL : GROQ_API_URL;
  const model = useOpenRouter
    ? process.env.OPENROUTER_MODEL?.trim() || DEFAULT_OPENROUTER_MODEL
    : process.env.GROQ_MODEL?.trim() || DEFAULT_GROQ_MODEL;

  const headers: Record<string, string> = {
    Authorization: `Bearer ${apiKey}`,
    "Content-Type": "application/json",
  };

  if (useOpenRouter) {
    const siteUrl = process.env.SITE_URL?.trim() || "http://localhost:1004";
    headers["HTTP-Referer"] = siteUrl;
    headers["X-Title"] = "MAPIMS Hospitals Live Chat";
  }

  const response = await fetch(apiUrl, {
    method: "POST",
    headers,
    body: JSON.stringify({
      model,
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
    console.error(
      `[live-chat ${useOpenRouter ? "openrouter" : "groq"}]`,
      response.status,
      errorBody
    );
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
