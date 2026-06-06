type DepartmentHeroBadgeProps = {
  children: React.ReactNode;
};

export default function DepartmentHeroBadge({ children }: DepartmentHeroBadgeProps) {
  return (
    <span className="mb-5 inline-flex items-center gap-2 rounded-full border border-white/15 bg-white/10 px-4 py-1.5 text-xs font-bold uppercase tracking-wider text-white/90 backdrop-blur-md">
      <span className="h-1.5 w-1.5 rounded-full bg-red-400" aria-hidden />
      {children}
    </span>
  );
}
