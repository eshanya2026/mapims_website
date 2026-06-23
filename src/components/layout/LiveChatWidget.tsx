"use client";

import { useEffect, useRef, useState } from "react";
import { Bot, MessageSquarePlus, X, Send, Loader2, Mic } from "lucide-react";
import ChatTypingIndicator from "@/components/layout/ChatTypingIndicator";
import {
  LIVE_CHAT_WELCOME,
  liveChatStarterOptions,
  type LiveChatStarterOption,
} from "@/data/live-chat";
import { getCannedReplyDelayMs, getStarterAnswer } from "@/lib/live-chat-answers";
import { useSpeechRecognition } from "@/hooks/use-speech-recognition";
import { cn } from "@/lib/utils";

type ChatMessage = {
  id: string;
  role: "assistant" | "user";
  text: string;
};

type MessageFeedback = "helpful" | "not_helpful";

const MAX_HISTORY_FOR_API = 12;
const MAX_INPUT_LENGTH = 500;

function createMessage(role: ChatMessage["role"], text: string): ChatMessage {
  return {
    id: `${role}-${Date.now()}-${Math.random().toString(36).slice(2, 8)}`,
    role,
    text,
  };
}

function toApiMessages(messages: ChatMessage[]) {
  return messages
    .filter((message) => message.text.trim())
    .slice(-MAX_HISTORY_FOR_API)
    .map((message) => ({
      role: message.role,
      content: message.text.trim(),
    }));
}

function getPreviousUserQuestion(messages: ChatMessage[], assistantIndex: number) {
  for (let index = assistantIndex - 1; index >= 0; index -= 1) {
    const message = messages[index];
    if (message?.role === "user") {
      return message.text;
    }
  }
  return null;
}

function shouldShowAnswerFeedback(message: ChatMessage) {
  return message.role === "assistant" && message.text !== LIVE_CHAT_WELCOME;
}

export default function LiveChatWidget() {
  const [open, setOpen] = useState(false);
  const [messages, setMessages] = useState<ChatMessage[]>([]);
  const [input, setInput] = useState("");
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);
  const [feedbackByMessageId, setFeedbackByMessageId] = useState<Record<string, MessageFeedback>>({});
  const scrollRef = useRef<HTMLDivElement>(null);
  const inputRef = useRef<HTMLTextAreaElement>(null);
  const voiceBaseInputRef = useRef("");
  const isVoiceTypingRef = useRef(false);

  const {
    isSupported: isVoiceSupported,
    isListening,
    error: voiceError,
    startListening,
    stopListening,
    clearError: clearVoiceError,
  } = useSpeechRecognition({
    onInterimTranscript: (transcript) => {
      isVoiceTypingRef.current = true;
      const base = voiceBaseInputRef.current;
      const combined = base ? `${base} ${transcript}` : transcript;
      setInput(combined.slice(0, MAX_INPUT_LENGTH));
      isVoiceTypingRef.current = false;
    },
    onFinalTranscript: (transcript) => {
      isVoiceTypingRef.current = true;
      const base = voiceBaseInputRef.current;
      const combined = (base ? `${base} ${transcript}` : transcript).trim();
      voiceBaseInputRef.current = "";
      setInput(combined.slice(0, MAX_INPUT_LENGTH));
      isVoiceTypingRef.current = false;
      clearVoiceError();
      inputRef.current?.focus();
    },
  });

  const showStarterOptions = !loading && messages.length <= 1;

  useEffect(() => {
    if (!open) return;

    if (messages.length === 0) {
      setMessages([createMessage("assistant", LIVE_CHAT_WELCOME)]);
    }
  }, [open, messages.length]);

  useEffect(() => {
    if (!open || !scrollRef.current) return;
    scrollRef.current.scrollTop = scrollRef.current.scrollHeight;
  }, [messages, open, loading, error]);

  useEffect(() => {
    if (open && inputRef.current) {
      inputRef.current.focus();
    }
  }, [open]);

  async function deliverAssistantReply(userText: string, answer: string, delayMs?: number) {
    setError(null);
    clearVoiceError();
    setMessages((current) => [...current, createMessage("user", userText)]);
    setLoading(true);

    await new Promise((resolve) => setTimeout(resolve, delayMs ?? getCannedReplyDelayMs()));

    setMessages((current) => [...current, createMessage("assistant", answer)]);
    setLoading(false);
  }

  async function sendUserMessage(text: string) {
    const trimmed = text.trim();
    if (!trimmed || loading) return;

    setError(null);
    clearVoiceError();
    const userMessage = createMessage("user", trimmed);
    const nextMessages = [...messages, userMessage];
    setMessages(nextMessages);
    setInput("");
    setLoading(true);

    try {
      const response = await fetch("/api/chat", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ messages: toApiMessages(nextMessages) }),
      });

      const data = (await response.json()) as { reply?: string; error?: string };

      if (!response.ok) {
        throw new Error(data.error ?? "Unable to send your message. Please try again.");
      }

      if (!data.reply?.trim()) {
        throw new Error("The assistant returned an empty reply. Please try again.");
      }

      setMessages((current) => [...current, createMessage("assistant", data.reply!.trim())]);
    } catch (sendError) {
      const message =
        sendError instanceof Error
          ? sendError.message
          : "Unable to send your message. Please try again.";
      setError(message);
    } finally {
      setLoading(false);
    }
  }

  function handleSelectStarter(option: LiveChatStarterOption) {
    const cannedAnswer = getStarterAnswer(option.id);
    if (cannedAnswer) {
      void deliverAssistantReply(option.label, cannedAnswer);
      return;
    }

    void sendUserMessage(option.prompt);
  }

  function handleReset() {
    stopListening();
    voiceBaseInputRef.current = "";
    setMessages([createMessage("assistant", LIVE_CHAT_WELCOME)]);
    setInput("");
    setError(null);
    setFeedbackByMessageId({});
    clearVoiceError();
  }

  async function submitMessageFeedback(
    message: ChatMessage,
    messageIndex: number,
    helpful: boolean
  ) {
    if (feedbackByMessageId[message.id]) return;

    setFeedbackByMessageId((current) => ({
      ...current,
      [message.id]: helpful ? "helpful" : "not_helpful",
    }));

    try {
      await fetch("/api/chat/feedback", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({
          messageId: message.id,
          helpful,
          userQuestion: getPreviousUserQuestion(messages, messageIndex),
          assistantAnswer: message.text,
        }),
      });
    } catch (feedbackError) {
      console.error("[live chat feedback]", feedbackError);
    }
  }

  function handleClose() {
    stopListening();
    clearVoiceError();
    setOpen(false);
  }

  function handleInputChange(value: string) {
    if (isListening) stopListening();
    if (!isVoiceTypingRef.current) {
      clearVoiceError();
    }
    setInput(value.slice(0, MAX_INPUT_LENGTH));
  }

  function handleToggleVoiceInput() {
    if (loading) return;

    clearVoiceError();
    setError(null);

    if (isListening) {
      stopListening();
      return;
    }

    voiceBaseInputRef.current = input.trim();
    startListening();
  }

  function handleSubmit(event: React.FormEvent) {
    event.preventDefault();
    void sendUserMessage(input);
  }

  function handleInputKeyDown(event: React.KeyboardEvent<HTMLTextAreaElement>) {
    if (event.key === "Enter" && !event.shiftKey) {
      event.preventDefault();
      void sendUserMessage(input);
    }
  }

  return (
    <>
      {open ? (
        <div
          className="fixed inset-0 z-[60] bg-slate-900/20 backdrop-blur-[1px] sm:bg-transparent sm:backdrop-blur-none"
          aria-hidden
          onClick={handleClose}
        />
      ) : null}

      <div className="fixed bottom-4 right-4 z-[70] flex flex-col items-end gap-3 sm:bottom-6 sm:right-6">
        {open ? (
          <div
            role="dialog"
            aria-label="Patient support chat"
            className={cn(
              "flex w-[min(100vw-2rem,24rem)] flex-col overflow-hidden rounded-2xl border border-slate-200 bg-white shadow-2xl shadow-slate-900/15",
              "animate-in fade-in slide-in-from-bottom-4 duration-200"
            )}
            onClick={(event) => event.stopPropagation()}
          >
            <header className="flex items-center justify-between gap-3 bg-gradient-to-r from-red-600 to-red-700 px-4 py-3.5 text-white">
              <div className="min-w-0">
                <p className="text-sm font-bold">MAPIMS Assist</p>
                <p className="text-xs text-white/85">Your personal assistant</p>
              </div>
              <div className="flex shrink-0 items-center gap-1.5">
                <button
                  type="button"
                  onClick={handleReset}
                  disabled={loading}
                  className="inline-flex h-9 w-9 items-center justify-center rounded-lg bg-red-800 text-white shadow-sm transition-colors hover:bg-red-900 disabled:cursor-not-allowed disabled:opacity-50"
                  aria-label="Start new chat"
                  title="New chat"
                >
                  <MessageSquarePlus className="h-5 w-5" strokeWidth={2.25} />
                </button>
                <button
                  type="button"
                  onClick={handleClose}
                  className="rounded-lg p-1.5 text-white/90 transition-colors hover:bg-white/15"
                  aria-label="Close chat"
                >
                  <X className="h-5 w-5" />
                </button>
              </div>
            </header>

            <div
              ref={scrollRef}
              className="flex max-h-[min(60vh,22rem)] flex-col gap-3 overflow-y-auto bg-slate-50 px-3 py-4"
            >
              {messages.map((message, messageIndex) => (
                <div
                  key={message.id}
                  className={cn(
                    "flex max-w-[92%] flex-col gap-2",
                    message.role === "assistant" ? "self-start" : "self-end"
                  )}
                >
                  <div
                    className={cn(
                      "whitespace-pre-wrap rounded-2xl px-3.5 py-2.5 text-sm leading-relaxed shadow-sm",
                      message.role === "assistant"
                        ? "rounded-bl-md bg-white text-slate-700"
                        : "rounded-br-md bg-red-600 text-white"
                    )}
                  >
                    {message.text}
                  </div>

                  {shouldShowAnswerFeedback(message) ? (
                    <div className="px-1">
                      {feedbackByMessageId[message.id] ? (
                        <p className="text-[11px] text-slate-500">Thanks for your feedback!</p>
                      ) : (
                        <>
                          <div className="flex flex-wrap items-center gap-2">
                            <button
                              type="button"
                              onClick={() =>
                                void submitMessageFeedback(message, messageIndex, true)
                              }
                              className="inline-flex items-center gap-1 rounded-full border border-slate-200 bg-white px-2.5 py-1 text-[11px] font-medium text-slate-600 transition-colors hover:border-green-300 hover:bg-green-50 hover:text-green-700"
                            >
                              <span aria-hidden>👍</span>
                              Helpful
                            </button>
                            <button
                              type="button"
                              onClick={() =>
                                void submitMessageFeedback(message, messageIndex, false)
                              }
                              className="inline-flex items-center gap-1 rounded-full border border-slate-200 bg-white px-2.5 py-1 text-[11px] font-medium text-slate-600 transition-colors hover:border-red-300 hover:bg-red-50 hover:text-red-700"
                            >
                              <span aria-hidden>👎</span>
                              Not Helpful
                            </button>
                          </div>
                        </>
                      )}
                    </div>
                  ) : null}
                </div>
              ))}

              {loading ? <ChatTypingIndicator /> : null}

              {error ? (
                <p className="whitespace-pre-wrap rounded-xl border border-red-200 bg-red-50 px-3 py-2 text-xs leading-relaxed text-red-700">
                  {error}
                </p>
              ) : null}

              {showStarterOptions ? (
                <div className="flex flex-col gap-2 pt-1">
                  {liveChatStarterOptions.map((option) => (
                    <button
                      key={option.id}
                      type="button"
                      onClick={() => handleSelectStarter(option)}
                      className="flex w-full items-center gap-2 rounded-xl border border-red-200 bg-white px-3.5 py-2.5 text-left text-sm font-medium text-slate-700 transition-colors hover:border-red-400 hover:bg-red-50 hover:text-red-700"
                    >
                      <span className="text-red-600" aria-hidden>
                        •
                      </span>
                      {option.label}
                    </button>
                  ))}
                </div>
              ) : null}
            </div>

            <form
              onSubmit={handleSubmit}
              className="border-t border-slate-100 bg-white p-3"
            >
              <div className="flex items-end gap-1.5 rounded-2xl border border-slate-200 bg-slate-50 py-1.5 pl-4 pr-1.5 transition-colors focus-within:border-red-300 focus-within:bg-white focus-within:ring-2 focus-within:ring-red-100">
                <textarea
                  ref={inputRef}
                  value={input}
                  onChange={(event) => handleInputChange(event.target.value)}
                  onFocus={clearVoiceError}
                  onKeyDown={handleInputKeyDown}
                  rows={1}
                  placeholder={isListening ? "Listening…" : "Type a message…"}
                  disabled={loading}
                  className="max-h-28 min-h-10 flex-1 resize-none overflow-y-auto border-0 bg-transparent py-2 text-sm leading-relaxed text-slate-800 outline-none placeholder:text-slate-400 disabled:opacity-60"
                  aria-label="Type your message"
                />
                {isVoiceSupported ? (
                  <button
                    type="button"
                    onClick={handleToggleVoiceInput}
                    disabled={loading}
                    className={cn(
                      "inline-flex h-9 w-9 shrink-0 items-center justify-center rounded-full transition-colors disabled:cursor-not-allowed disabled:opacity-50",
                      isListening
                        ? "bg-red-600 text-white animate-pulse"
                        : "text-slate-500 hover:bg-red-50 hover:text-red-600"
                    )}
                    aria-label={isListening ? "Stop voice input" : "Start voice input"}
                    title={isListening ? "Stop listening" : "Voice input"}
                  >
                    <Mic className="h-4 w-4" />
                  </button>
                ) : null}
                <button
                  type="submit"
                  disabled={loading || !input.trim()}
                  className="inline-flex h-9 w-9 shrink-0 items-center justify-center rounded-full bg-red-600 text-white transition-colors hover:bg-red-700 disabled:cursor-not-allowed disabled:bg-red-300"
                  aria-label="Send message"
                >
                  {loading ? (
                    <Loader2 className="h-4 w-4 animate-spin" />
                  ) : (
                    <Send className="h-4 w-4" />
                  )}
                </button>
              </div>
              {voiceError ? (
                <div className="mt-2 flex items-start justify-between gap-2 rounded-xl border border-amber-200 bg-amber-50 px-3 py-2 text-xs text-amber-900">
                  <p>{voiceError}</p>
                  <button
                    type="button"
                    onClick={clearVoiceError}
                    className="shrink-0 rounded-md px-1 text-amber-700 hover:bg-amber-100"
                    aria-label="Dismiss voice input message"
                  >
                    <X className="h-3.5 w-3.5" />
                  </button>
                </div>
              ) : null}
            </form>
          </div>
        ) : null}

        <div className="relative">
          {!open ? (
            <>
              <span
                className="chat-launcher-pulse absolute inset-0 rounded-full bg-red-500/50"
                aria-hidden
              />
              <span
                className="chat-launcher-pulse chat-launcher-pulse--delay absolute inset-0 rounded-full bg-red-400/35"
                aria-hidden
              />
            </>
          ) : null}

          <button
            type="button"
            onClick={() => setOpen((value) => !value)}
            className={cn(
              "relative z-10 box-border flex h-[3.75rem] w-[3.75rem] shrink-0 items-center justify-center rounded-full border-4 border-white bg-red-600 text-white shadow-lg shadow-red-900/25 transition-all duration-300 hover:scale-[1.04] hover:bg-red-700 hover:shadow-xl hover:shadow-red-600/35 active:scale-[0.98]",
              !open && "chat-launcher-float",
              open && "shadow-red-600/30"
            )}
            aria-label={open ? "Close patient support chat" : "Open MAPIMS Assist chat"}
            aria-expanded={open}
            title={open ? "Close chat" : "MAPIMS Assist"}
          >
            {open ? (
              <X className="h-6 w-6 shrink-0 transition-transform duration-200" strokeWidth={2.5} />
            ) : (
              <>
                <Bot className="h-7 w-7 shrink-0" strokeWidth={2} aria-hidden />
                <span
                  className="pointer-events-none absolute right-0.5 top-0.5 flex h-3.5 w-3.5 items-center justify-center"
                  aria-hidden
                >
                  <span className="chat-launcher-online-ping absolute inline-flex h-full w-full rounded-full bg-emerald-400/70" />
                  <span className="relative block h-3.5 w-3.5 rounded-full border-2 border-white bg-emerald-500" />
                </span>
              </>
            )}
          </button>
        </div>
      </div>
    </>
  );
}
