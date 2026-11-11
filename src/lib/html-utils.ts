/**
 * Decodes common HTML entities like &amp;, &nbsp;, &quot;, &#39;, &lt;, &gt;.
 */
export function decodeHtmlEntities(input?: string | null): string {
  if (!input || typeof input !== "string") return "";
  let text = input;
  while (text.includes("&amp;")) {
    text = text.replace(/&amp;/g, "&");
  }
  return text
    .replace(/&nbsp;/g, " ")
    .replace(/&quot;/g, '"')
    .replace(/&#39;/g, "'")
    .replace(/&apos;/g, "'")
    .replace(/&ndash;/g, "–")
    .replace(/&mdash;/g, "—")
    .replace(/&lt;/g, "<")
    .replace(/&gt;/g, ">");
}

/**
 * Sanitizes inline HTML for safe rich text rendering via dangerouslySetInnerHTML.
 * Ensures entities like &amp; are cleanly decoded, while allowing standard
 * inline formatting tags from Editor.js (b, strong, i, em, u, a, code, mark, br, span).
 */
export function sanitizeInlineHtml(input?: string | null): string {
  if (!input || typeof input !== "string") return "";

  // 1. Strip dangerous tags and attributes
  let html = input
    .replace(/<script\b[^<]*(?:(?!<\/script>)<[^<]*)*<\/script>/gi, "")
    .replace(/<iframe\b[^<]*(?:(?!<\/iframe>)<[^<]*)*<\/iframe>/gi, "")
    .replace(/on\w+\s*=\s*(?:'[^']*'|"[^"]*"|[^\s>]+)/gi, "")
    .replace(/javascript:/gi, "");

  // 2. Decode &amp; and &nbsp; entities
  while (html.includes("&amp;")) {
    html = html.replace(/&amp;/g, "&");
  }
  html = html.replace(/&nbsp;/g, " ");

  // 3. Ensure links have safe target and rel
  html = html.replace(
    /<a\s+(href="[^"]*")/gi,
    '<a $1 target="_blank" rel="noopener noreferrer" class="text-red-600 underline hover:text-red-700"'
  );

  return html;
}

