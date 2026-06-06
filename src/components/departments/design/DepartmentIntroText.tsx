type DepartmentIntroTextProps = {
  children: React.ReactNode;
};

export default function DepartmentIntroText({ children }: DepartmentIntroTextProps) {
  return (
    <div className="mb-8 space-y-4 text-pretty text-base leading-relaxed text-slate-600 md:text-[17px] md:leading-8">
      {children}
    </div>
  );
}
