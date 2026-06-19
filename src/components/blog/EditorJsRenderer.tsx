import type { EditorJsBlock, EditorJsOutput } from "@/lib/editorjs-content";

function renderListItems(items: unknown[], ordered: boolean, keyPrefix: string) {
  const Tag = ordered ? "ol" : "ul";
  const listClass = ordered ? "list-decimal" : "list-disc";

  return (
    <Tag key={keyPrefix} className={`${listClass} space-y-2 pl-5 sm:pl-6`}>
      {items.map((item, index) => {
        if (typeof item === "string") {
          return <li key={`${keyPrefix}-${index}`}>{item}</li>;
        }

        if (item && typeof item === "object" && "content" in item) {
          const record = item as { content?: string; items?: unknown[] };
          const nested = Array.isArray(record.items) ? record.items : [];

          return (
            <li key={`${keyPrefix}-${index}`}>
              {record.content}
              {nested.length > 0
                ? renderListItems(nested, ordered, `${keyPrefix}-${index}-nested`)
                : null}
            </li>
          );
        }

        return null;
      })}
    </Tag>
  );
}

function renderBlock(block: EditorJsBlock, index: number) {
  switch (block.type) {
    case "header": {
      const level = Number(block.data.level ?? 2);
      const text = String(block.data.text ?? "");
      const className =
        level <= 2
          ? "pt-2 text-base font-bold leading-snug text-slate-900 first:pt-0 sm:pt-3 sm:text-lg"
          : level === 3
            ? "pt-2 text-base font-semibold text-slate-900 sm:text-lg"
            : "pt-1 text-sm font-semibold text-slate-900 sm:text-base";

      if (level <= 2) {
        return (
          <h2 key={index} className={className}>
            {text}
          </h2>
        );
      }

      if (level === 3) {
        return (
          <h3 key={index} className={className}>
            {text}
          </h3>
        );
      }

      return (
        <h4 key={index} className={className}>
          {text}
        </h4>
      );
    }

    case "paragraph": {
      const text = String(block.data.text ?? "").trim();
      if (!text) return null;
      return <p key={index}>{text}</p>;
    }

    case "list": {
      const items = Array.isArray(block.data.items) ? block.data.items : [];
      if (items.length === 0) return null;
      const ordered = block.data.style === "ordered";
      return renderListItems(items, ordered, `list-${index}`);
    }

    case "quote": {
      const text = String(block.data.text ?? "").trim();
      const caption = String(block.data.caption ?? "").trim();
      if (!text) return null;

      return (
        <blockquote
          key={index}
          className="border-l-4 border-red-200 bg-red-50/40 px-4 py-3 text-slate-700"
        >
          <p className="italic">{text}</p>
          {caption ? <footer className="mt-2 text-sm text-slate-500">— {caption}</footer> : null}
        </blockquote>
      );
    }

    case "delimiter":
      return (
        <div key={index} aria-hidden className="flex justify-center py-2">
          <span className="text-2xl tracking-[0.4em] text-slate-300">•••</span>
        </div>
      );

    case "image": {
      const file = block.data.file as { url?: string } | undefined;
      const url = file?.url ?? String(block.data.url ?? "");
      const caption = String(block.data.caption ?? "").trim();
      if (!url) return null;

      return (
        <figure key={index} className="overflow-hidden rounded-xl border border-slate-100">
          <img src={url} alt={caption || "Article image"} className="w-full object-cover" />
          {caption ? (
            <figcaption className="px-3 py-2 text-center text-xs text-slate-500">
              {caption}
            </figcaption>
          ) : null}
        </figure>
      );
    }

    default:
      return null;
  }
}

export default function EditorJsRenderer({ data }: { data: EditorJsOutput }) {
  return (
    <div className="space-y-4 break-words text-[15px] leading-relaxed text-slate-700 sm:text-base">
      {data.blocks.map((block, index) => renderBlock(block, index))}
    </div>
  );
}
