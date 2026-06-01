export default function InternationalServiceLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <section className="section-padding bg-white">
      <div className="container mx-auto max-w-4xl px-4">{children}</div>
    </section>
  );
}
