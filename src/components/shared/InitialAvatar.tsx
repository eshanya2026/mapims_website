import { cn } from "@/lib/utils";

const avatarColors = [
  { bg: "bg-[#1A73E8]", text: "text-white" },
  { bg: "bg-[#34A853]", text: "text-white" },
  { bg: "bg-[#9334E6]", text: "text-white" },
  { bg: "bg-[#E67C73]", text: "text-white" },
  { bg: "bg-[#F4511E]", text: "text-white" },
  { bg: "bg-[#039BE5]", text: "text-white" },
  { bg: "bg-[#0B8043]", text: "text-white" },
  { bg: "bg-[#FBBC04]", text: "text-slate-900" },
] as const;

function getInitials(name: string): string {
  return name
    .split(/\s+/)
    .map((part) => part.replace(/\./g, "").charAt(0))
    .filter(Boolean)
    .slice(0, 2)
    .join("")
    .toUpperCase();
}

function avatarColorIndex(name: string): number {
  let hash = 0;
  for (let i = 0; i < name.length; i++) {
    hash = name.charCodeAt(i) + ((hash << 5) - hash);
  }
  return Math.abs(hash) % avatarColors.length;
}

type InitialAvatarProps = {
  name: string;
  size?: "md" | "lg";
  className?: string;
};

const sizeClasses = {
  md: "h-16 w-16 text-lg border-4",
  lg: "h-20 w-20 text-xl border-4",
} as const;

export default function InitialAvatar({
  name,
  size = "md",
  className,
}: InitialAvatarProps) {
  const initials = getInitials(name);
  const color = avatarColors[avatarColorIndex(name)];

  return (
    <div
      className={cn(
        "flex shrink-0 items-center justify-center rounded-full border-white font-bold shadow-sm",
        sizeClasses[size],
        color.bg,
        color.text,
        className
      )}
      aria-hidden
    >
      {initials}
    </div>
  );
}
