import fs from "node:fs/promises";
import path from "node:path";

const GBV_ARTIST_ID = 83529;
const DISCOGS_BASE_URL = "https://api.discogs.com";
const WIKIDATA_API = "https://www.wikidata.org/w/api.php";
const USER_AGENT = "MajorLeagueNumbers/1.0";
const OUTPUT_DIR = path.join(process.cwd(), "public", "gbv-members");
const OUTPUT_LIB = path.join(process.cwd(), "lib", "gbv-member-images.ts");
const OVERRIDES_PATH = path.join(
  process.cwd(),
  "data",
  "gbv-member-image-overrides.json"
);

const PERSON_KEYWORDS = ["musician", "singer", "guitarist", "drummer", "band"];

async function fetchJson(url) {
  const res = await fetch(url, { headers: { "User-Agent": USER_AGENT } });
  if (!res.ok) throw new Error(`Request failed: ${res.status}`);
  return res.json();
}

function pickDiscogsImage(images = []) {
  if (!images.length) return null;
  const primary = images.find((img) => img.type === "primary") || images[0];
  return primary?.uri150 || primary?.uri || null;
}

function getExtensionFromContentType(contentType = "") {
  if (contentType.includes("png")) return "png";
  if (contentType.includes("webp")) return "webp";
  if (contentType.includes("gif")) return "gif";
  if (contentType.includes("avif")) return "avif";
  return "jpg";
}

async function downloadImage(url, targetPath) {
  const res = await fetch(url, { headers: { "User-Agent": USER_AGENT } });
  if (!res.ok) throw new Error(`Image fetch failed: ${res.status}`);
  const contentType = res.headers.get("content-type") || "image/jpeg";
  const extension = getExtensionFromContentType(contentType);
  const buffer = new Uint8Array(await res.arrayBuffer());
  const finalPath = `${targetPath}.${extension}`;
  await fs.writeFile(finalPath, buffer);
  return finalPath;
}

async function searchWikidata(term) {
  const url = `${WIKIDATA_API}?action=wbsearchentities&search=${encodeURIComponent(
    term
  )}&language=en&format=json&limit=5`;
  const data = await fetchJson(url);
  return data?.search || [];
}

function pickBestResult(results) {
  const match = results.find((result) => {
    const description = result.description?.toLowerCase() || "";
    return PERSON_KEYWORDS.some((keyword) => description.includes(keyword));
  });
  return match || results[0];
}

function getImageFilename(entity) {
  const claims = entity?.claims;
  const imageClaim = claims?.P18?.[0]?.mainsnak?.datavalue?.value;
  return typeof imageClaim === "string" ? imageClaim : null;
}

async function findCommonsImage(name) {
  const results = await searchWikidata(name);
  if (!results.length) return null;
  const best = pickBestResult(results);
  const prioritized = best
    ? [best, ...results.filter((r) => r.id !== best.id)]
    : results;

  for (const result of prioritized) {
    const entityUrl = `${WIKIDATA_API}?action=wbgetentities&ids=${result.id}&props=claims&format=json`;
    const entityData = await fetchJson(entityUrl);
    const entity = entityData?.entities?.[result.id];
    const filename = getImageFilename(entity);
    if (filename) {
      return `https://commons.wikimedia.org/wiki/Special:FilePath/${encodeURIComponent(
        filename
      )}`;
    }
  }

  const fallbackResults = await searchWikidata(`${name} Guided By Voices`);
  if (!fallbackResults.length) return null;
  const fallbackBest = pickBestResult(fallbackResults);
  const fallbackPrioritized = fallbackBest
    ? [fallbackBest, ...fallbackResults.filter((r) => r.id !== fallbackBest.id)]
    : fallbackResults;

  for (const result of fallbackPrioritized) {
    const entityUrl = `${WIKIDATA_API}?action=wbgetentities&ids=${result.id}&props=claims&format=json`;
    const entityData = await fetchJson(entityUrl);
    const entity = entityData?.entities?.[result.id];
    const filename = getImageFilename(entity);
    if (filename) {
      return `https://commons.wikimedia.org/wiki/Special:FilePath/${encodeURIComponent(
        filename
      )}`;
    }
  }

  return null;
}

async function fetchDiscogs(endpoint) {
  const token = process.env.DISCOGS_USER_TOKEN || process.env.DISCOGS_TOKEN;
  const res = await fetch(`${DISCOGS_BASE_URL}${endpoint}`, {
    headers: {
      "User-Agent": USER_AGENT,
      ...(token ? { Authorization: `Discogs token=${token}` } : {}),
    },
  });
  if (!res.ok) throw new Error(`Discogs error: ${res.status}`);
  return res.json();
}

async function ensureDir() {
  await fs.mkdir(OUTPUT_DIR, { recursive: true });
}

async function loadOverrides() {
  try {
    const content = await fs.readFile(OVERRIDES_PATH, "utf-8");
    return JSON.parse(content);
  } catch {
    return {};
  }
}

async function fileExists(filePath) {
  try {
    await fs.access(filePath);
    return true;
  } catch {
    return false;
  }
}

async function main() {
  await ensureDir();
  const overrides = await loadOverrides();

  const artist = await fetchDiscogs(`/artists/${GBV_ARTIST_ID}`);
  const members = artist.members || [];

  const imageMap = {};

  for (const member of members) {
    const memberId = member.id;
    const memberName = member.name;
    const baseTarget = path.join(OUTPUT_DIR, String(memberId));

    const existing = await fileExists(baseTarget + ".jpg");
    if (existing) {
      imageMap[memberId] = `/gbv-members/${memberId}.jpg`;
      continue;
    }

    let imageUrl = null;
    try {
      const memberData = await fetchDiscogs(`/artists/${memberId}`);
      imageUrl = pickDiscogsImage(memberData.images);
    } catch {
      // ignore and fallback
    }

    if (!imageUrl && overrides[String(memberId)]) {
      imageUrl = overrides[String(memberId)];
    }

    if (!imageUrl) {
      try {
        imageUrl = await findCommonsImage(memberName);
      } catch {
        imageUrl = null;
      }
    }

    if (!imageUrl) {
      console.log(`No image found for ${memberName}`);
      continue;
    }

    const normalized = imageUrl.replace(/^http:/, "https:");
    try {
      const savedPath = await downloadImage(normalized, baseTarget);
      const filename = path.basename(savedPath);
      imageMap[memberId] = `/gbv-members/${filename}`;
      console.log(`Saved ${memberName} -> ${filename}`);
    } catch (error) {
      console.error(`Failed to save ${memberName}:`, error.message);
    }
  }

  const entries = Object.entries(imageMap)
    .map(([id, url]) => `  ${id}: "${url}"`)
    .join(",\n");

  const content = `export const localMemberImages: Record<number, string> = {\n${entries}\n};\n\nexport function getLocalMemberImage(memberId?: number | null): string | null {\n  if (!memberId) return null;\n  return localMemberImages[memberId] || null;\n}\n`;

  await fs.writeFile(OUTPUT_LIB, content);
  console.log(`Wrote ${OUTPUT_LIB}`);
}

main().catch((error) => {
  console.error(error);
  process.exit(1);
});
