function isSectionHeading(block: string) {
  const trimmed = block.trim();
  return (
    /^\d+\.\s/.test(trimmed) ||
    trimmed === "Conclusion" ||
    (trimmed.length < 80 && !trimmed.includes("."))
  );
}

function isListBlock(block: string) {
  const lines = block.split("\n").filter(Boolean);
  return lines.length > 1 && lines.every((line) => line.trim().length < 120);
}

export default function BlogArticleBody({ content }: { content: string }) {
  const blocks = content.split(/\n\n+/).filter(Boolean);

  return (
    <div className="space-y-4 break-words text-[15px] leading-relaxed text-slate-700 sm:text-base">
      {blocks.map((block, index) => {
        const trimmed = block.trim();

        if (isSectionHeading(trimmed)) {
          return (
            <h2
              key={index}
              className="pt-2 text-base font-bold leading-snug text-slate-900 first:pt-0 sm:pt-3 sm:text-lg"
            >
              {trimmed}
            </h2>
          );
        }

        if (isListBlock(trimmed)) {
          return (
            <ul key={index} className="list-disc space-y-2 pl-5 sm:pl-6">
              {trimmed.split("\n").map((line, lineIndex) => (
                <li key={lineIndex}>{line.trim()}</li>
              ))}
            </ul>
          );
        }

        return <p key={index}>{trimmed}</p>;
      })}
    </div>
  );
}
