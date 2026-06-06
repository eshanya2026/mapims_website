type DepartmentGradientPanelProps = {
  eyebrow: string;
  title: React.ReactNode;
  highlight?: string;
  description?: string;
};

export default function DepartmentGradientPanel({
  eyebrow,
  title,
  highlight,
  description,
}: DepartmentGradientPanelProps) {
  return (
    <div className="relative overflow-hidden rounded-2xl border border-red-100 bg-gradient-to-br from-white via-red-50/70 to-white px-7 py-9 md:px-10 md:py-11">
      <div
        className="pointer-events-none absolute -right-8 -top-8 h-40 w-40 rounded-full bg-red-200/40 blur-3xl"
        aria-hidden
      />
      <div
        className="pointer-events-none absolute -bottom-10 left-1/3 h-32 w-32 rounded-full bg-red-100/60 blur-3xl"
        aria-hidden
      />
      <div className="relative max-w-3xl">
        <p className="text-[11px] font-bold uppercase tracking-[0.16em] text-red-600">
          {eyebrow}
        </p>
        <h2 className="mt-3 text-2xl font-bold text-slate-900 md:text-3xl lg:text-4xl">
          {title}
          {highlight ? (
            <>
              {" "}
              <span className="text-red-600">{highlight}</span>
            </>
          ) : null}
        </h2>
        {description ? (
          <p className="mt-4 text-sm leading-relaxed text-slate-600 md:text-base">
            {description}
          </p>
        ) : null}
      </div>
    </div>
  );
}
