const NETLIFY_FALLBACK_SECRET = "mapims-change-this-secret-in-netlify-ui";

export function getAuthSecret(): string {
  const secret = process.env.AUTH_SECRET?.trim();
  if (secret) return secret;

  if (isServerlessHost()) {
    return NETLIFY_FALLBACK_SECRET;
  }

  throw new Error("AUTH_SECRET environment variable is not set");
}

export function getAuthSecretKey() {
  return new TextEncoder().encode(getAuthSecret());
}

function isServerlessHost() {
  return Boolean(
    process.env.NETLIFY ||
      process.env.AWS_LAMBDA_FUNCTION_NAME ||
      process.env.VERCEL
  );
}
