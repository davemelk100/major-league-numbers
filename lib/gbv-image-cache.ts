import { promises as fs } from "fs";
import path from "path";
import crypto from "crypto";

const CACHE_DIR = path.join(process.cwd(), "public", "gbv-cache");

async function ensureCacheDir() {
  await fs.mkdir(CACHE_DIR, { recursive: true });
}

async function findCachedFile(prefix: string): Promise<string | null> {
  try {
    const files = await fs.readdir(CACHE_DIR);
    const match = files.find((file) => file.startsWith(`${prefix}.`));
    return match ? `/gbv-cache/${match}` : null;
  } catch {
    return null;
  }
}

function getExtensionFromContentType(contentType: string): string {
  if (contentType.includes("png")) return "png";
  if (contentType.includes("webp")) return "webp";
  if (contentType.includes("gif")) return "gif";
  if (contentType.includes("avif")) return "avif";
  return "jpg";
}

export async function cacheRemoteImage(
  url: string,
  prefix: string
): Promise<string | null> {
  if (!url || url.startsWith("/")) return url || null;

  await ensureCacheDir();

  const hash = crypto.createHash("sha256").update(url).digest("hex");
  const filenameBase = `${prefix}-${hash}`;
  const existing = await findCachedFile(filenameBase);
  if (existing) return existing;

  const response = await fetch(url, {
    headers: { "User-Agent": "MajorLeagueNumbers/1.0" },
  });

  if (!response.ok) return null;

  const contentType = response.headers.get("content-type") || "image/jpeg";
  const extension = getExtensionFromContentType(contentType);
  const filename = `${filenameBase}.${extension}`;
  const filePath = path.join(CACHE_DIR, filename);
  const buffer = Buffer.from(await response.arrayBuffer());

  await fs.writeFile(filePath, buffer);

  return `/gbv-cache/${filename}`;
}
