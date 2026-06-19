export type EditorJsBlock = {
  id?: string;
  type: string;
  data: Record<string, unknown>;
};

export type EditorJsOutput = {
  time?: number;
  blocks: EditorJsBlock[];
  version?: string;
};

export function isEditorJsContent(content: string): boolean {
  const trimmed = content.trim();
  if (!trimmed.startsWith("{")) return false;

  try {
    const parsed = JSON.parse(trimmed) as EditorJsOutput;
    return Array.isArray(parsed.blocks);
  } catch {
    return false;
  }
}

export function parseEditorJsContent(content: string): EditorJsOutput | null {
  if (!isEditorJsContent(content)) return null;

  try {
    return JSON.parse(content) as EditorJsOutput;
  } catch {
    return null;
  }
}

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

export function plainTextToEditorJsData(text: string): EditorJsOutput {
  const blocks = text
    .split(/\n\n+/)
    .map((block) => block.trim())
    .filter(Boolean)
    .map((block) => {
      if (isSectionHeading(block)) {
        return {
          type: "header",
          data: { text: block, level: 2 },
        };
      }

      if (isListBlock(block)) {
        return {
          type: "list",
          data: {
            style: "unordered",
            items: block.split("\n").map((line) => line.trim()).filter(Boolean),
          },
        };
      }

      return {
        type: "paragraph",
        data: { text: block },
      };
    });

  return {
    time: Date.now(),
    blocks,
  };
}

export function contentToEditorJsData(content: string): EditorJsOutput {
  const parsed = parseEditorJsContent(content);
  if (parsed) return parsed;

  if (!content.trim()) {
    return { time: Date.now(), blocks: [] };
  }

  return plainTextToEditorJsData(content);
}

function collectListItemText(items: unknown[]): string[] {
  const lines: string[] = [];

  for (const item of items) {
    if (typeof item === "string") {
      lines.push(item);
      continue;
    }

    if (item && typeof item === "object" && "content" in item) {
      const content = (item as { content?: string }).content?.trim();
      if (content) lines.push(content);

      const nested = (item as { items?: unknown[] }).items;
      if (Array.isArray(nested) && nested.length > 0) {
        lines.push(...collectListItemText(nested));
      }
    }
  }

  return lines;
}

export function getEditorJsPlainText(content: string): string {
  const parsed = parseEditorJsContent(content);
  if (!parsed) return content.trim();

  const parts: string[] = [];

  for (const block of parsed.blocks) {
    switch (block.type) {
      case "paragraph":
      case "quote": {
        const text = String(block.data.text ?? "").trim();
        if (text) parts.push(text);
        break;
      }
      case "header": {
        const text = String(block.data.text ?? "").trim();
        if (text) parts.push(text);
        break;
      }
      case "list": {
        const items = Array.isArray(block.data.items) ? block.data.items : [];
        parts.push(...collectListItemText(items));
        break;
      }
      default:
        break;
    }
  }

  return parts.join("\n\n").trim();
}

export function getEditorJsContentLength(content: string) {
  return getEditorJsPlainText(content).length;
}
