export function normalizeImageUrl(url?: string | null): string | null {
  if (!url) return null;
  if (url.startsWith("/")) return url;
  return url.replace(/^http:/, "https:");
}

export function isLocalImageUrl(url: string): boolean {
  return url.startsWith("/");
}

export function getProxiedImageUrl(url?: string | null): string | null {
  const normalized = normalizeImageUrl(url);
  if (!normalized) return null;
  if (isLocalImageUrl(normalized)) return normalized;
  return `/api/images/proxy?url=${encodeURIComponent(normalized)}`;
}
