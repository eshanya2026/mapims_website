import { cn } from "@/lib/utils";

type ChatTypingIndicatorProps = {
  className?: string;
};

export default function ChatTypingIndicator({ className }: ChatTypingIndicatorProps) {
  return (
    <div
      className={cn(
        "flex max-w-[92%] self-start rounded-2xl rounded-bl-md bg-white px-4 py-3 shadow-sm",
        className
      )}
      role="status"
      aria-label="MAPIMS Assist is typing"
    >
      <div className="flex items-center gap-1.5">
        <span className="chat-typing-dot bg-slate-400" />
        <span className="chat-typing-dot bg-slate-400 [animation-delay:0.2s]" />
        <span className="chat-typing-dot bg-slate-400 [animation-delay:0.4s]" />
      </div>
    </div>
  );
}
