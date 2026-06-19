function firstForwardedIp(value: string | null) {
  if (!value?.trim()) return null;
  const first = value.split(",")[0]?.trim();
  return first || null;
}

export function getClientIpFromRequest(request: Request): string | null {
  const forwarded = firstForwardedIp(request.headers.get("x-forwarded-for"));
  if (forwarded) return forwarded;

  const realIp = request.headers.get("x-real-ip")?.trim();
  if (realIp) return realIp;

  return null;
}
