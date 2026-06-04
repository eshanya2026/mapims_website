type DepartmentHeroBadgeProps = {
  children: React.ReactNode;
};

/** Pill tagline above department hero titles — matches Departments listing hero */
export default function DepartmentHeroBadge({ children }: DepartmentHeroBadgeProps) {
  return (
    <span className="mb-6 inline-block rounded-full border border-red-600/30 bg-red-600/20 px-4 py-1.5 text-sm font-semibold text-red-400 backdrop-blur-md">
      {children}
    </span>
  );
}
