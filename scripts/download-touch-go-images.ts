/**
 * Download Touch & Go Records images
 *
 * Part A: Artist photos from Discogs
 * Part B: Release cover art from MusicBrainz/Cover Art Archive + Discogs fallback
 * Part C: Generate lib/touch-go-records-images.ts mapping file
 *
 * Usage: DISCOGS_USER_TOKEN=xxx npx tsx scripts/download-touch-go-images.ts
 */

import fs from "fs";
import path from "path";
import https from "https";
import http from "http";

const DISCOGS_TOKEN = process.env.DISCOGS_USER_TOKEN || process.env.DISCOGS_TOKEN || "";
const TOUCH_GO_LABEL_ID = 819;
const DISCOGS_BASE = "https://api.discogs.com";
const USER_AGENT = "TouchAndGoRecords/1.0";
const RATE_LIMIT_MS = 5000;

// MusicBrainz / Cover Art Archive
const MUSICBRAINZ_BASE = "https://musicbrainz.org/ws/2";
const COVER_ART_BASE = "https://coverartarchive.org";
const MB_USER_AGENT = "MajorLeagueNumbers/1.0 (https://majorleaguenumbers.com)";
const MB_RATE_LIMIT_MS = 1100;

const ARTISTS_DIR = path.join(process.cwd(), "public", "images", "touch-go-records", "artists");
const ALBUMS_DIR = path.join(process.cwd(), "public", "images", "touch-go-records", "albums");
const OUTPUT_FILE = path.join(process.cwd(), "lib", "touch-go-records-images.ts");

import { touchgorecordsArtists } from "../lib/touch-go-records-artists-data";
import { touchgorecordsReleases } from "../lib/touch-go-records-releases-data";

function sleep(ms: number): Promise<void> {
  return new Promise((resolve) => setTimeout(resolve, ms));
}

function fetchUrl(url: string): Promise<Buffer> {
  return new Promise((resolve, reject) => {
    const client = url.startsWith("https") ? https : http;
    const req = client.get(url, { headers: { "User-Agent": USER_AGENT } }, (res) => {
      if (res.statusCode && res.statusCode >= 300 && res.statusCode < 400 && res.headers.location) {
        fetchUrl(res.headers.location).then(resolve).catch(reject);
        return;
      }
      if (res.statusCode && res.statusCode !== 200) {
        reject(new Error(`HTTP ${res.statusCode} for ${url}`));
        return;
      }
      const chunks: Buffer[] = [];
      res.on("data", (chunk) => chunks.push(chunk));
      res.on("end", () => resolve(Buffer.concat(chunks)));
      res.on("error", reject);
    });
    req.on("error", reject);
    req.setTimeout(15000, () => {
      req.destroy();
      reject(new Error(`Timeout fetching ${url}`));
    });
  });
}

async function fetchDiscogs(endpoint: string): Promise<any> {
  const url = `${DISCOGS_BASE}${endpoint}`;
  const headers: Record<string, string> = { "User-Agent": USER_AGENT };
  if (DISCOGS_TOKEN) {
    headers["Authorization"] = `Discogs token=${DISCOGS_TOKEN}`;
  }

  return new Promise((resolve, reject) => {
    const req = https.get(url, { headers }, (res) => {
      const chunks: Buffer[] = [];
      res.on("data", (chunk) => chunks.push(chunk));
      res.on("end", () => {
        const body = Buffer.concat(chunks).toString("utf-8");
        if (res.statusCode && res.statusCode !== 200) {
          reject(new Error(`Discogs ${res.statusCode}: ${body.slice(0, 200)}`));
          return;
        }
        try {
          resolve(JSON.parse(body));
        } catch {
          reject(new Error(`Invalid JSON from Discogs: ${body.slice(0, 200)}`));
        }
      });
      res.on("error", reject);
    });
    req.on("error", reject);
    req.setTimeout(15000, () => {
      req.destroy();
      reject(new Error(`Timeout fetching ${url}`));
    });
  });
}

function getExtFromUrl(url: string): string {
  const match = url.match(/\.(jpe?g|png|webp|gif|avif)(\?|$)/i);
  return match ? match[1].toLowerCase().replace("jpeg", "jpg") : "jpg";
}

// ─── Part A: Artist photos from Discogs ───

async function downloadArtistPhotos(): Promise<Record<number, string>> {
  console.log("\n=== Part A: Artist photos from Discogs ===\n");
  const results: Record<number, string> = {};

  if (!DISCOGS_TOKEN) {
    console.log("  WARNING: No DISCOGS_USER_TOKEN set. Artist image downloads require authentication.");
    console.log("  Set DISCOGS_USER_TOKEN in your environment or .env.local file.");
    console.log("  Get a token at: https://www.discogs.com/settings/developers\n");
    return results;
  }

  for (const artist of touchgorecordsArtists) {
    const outPath = path.join(ARTISTS_DIR, `${artist.id}.jpg`);
    if (fs.existsSync(outPath)) {
      console.log(`  [skip] ${artist.id} (${artist.name}) — already exists`);
      results[artist.id] = `/images/touch-go-records/artists/${artist.id}.jpg`;
      continue;
    }

    let found = false;

    // Try Discogs artist search
    try {
      console.log(`  [search] ${artist.id} — searching Discogs for "${artist.name}"...`);
      const searchData = await fetchDiscogs(
        `/database/search?q=${encodeURIComponent(artist.name)}&type=artist&per_page=5`
      );
      await sleep(RATE_LIMIT_MS);

      if (searchData?.results?.length > 0) {
        const match = searchData.results.find(
          (r: any) => r.title?.toLowerCase() === artist.name.toLowerCase()
        ) || searchData.results[0];

        // Try cover_image from search results first
        if (match?.cover_image && !match.cover_image.includes("spacer.gif")) {
          try {
            const buf = await fetchUrl(match.cover_image.replace(/^http:/, "https:"));
            if (buf.length > 1000) {
              fs.writeFileSync(outPath, buf);
              results[artist.id] = `/images/touch-go-records/artists/${artist.id}.jpg`;
              console.log(`  [ok]   ${artist.id} (${artist.name}) — [discogs-search] (${(buf.length / 1024).toFixed(0)} KB)`);
              found = true;
            }
          } catch {
            // cover_image download failed
          }
        }

        // If cover_image didn't work, try fetching the artist detail page for images
        if (!found && match?.id) {
          try {
            const artistData = await fetchDiscogs(`/artists/${match.id}`);
            await sleep(RATE_LIMIT_MS);
            const imageUrl = artistData?.images?.[0]?.uri || artistData?.images?.[0]?.uri150;
            if (imageUrl) {
              const buf = await fetchUrl(imageUrl.replace(/^http:/, "https:"));
              if (buf.length > 1000) {
                fs.writeFileSync(outPath, buf);
                results[artist.id] = `/images/touch-go-records/artists/${artist.id}.jpg`;
                console.log(`  [ok]   ${artist.id} (${artist.name}) — [discogs-artist] (${(buf.length / 1024).toFixed(0)} KB)`);
                found = true;
              }
            }
          } catch {
            // Artist detail fetch failed
          }
        }
      }
    } catch (err: any) {
      console.log(`  [fail] ${artist.id} (${artist.name}) — Discogs search: ${err.message}`);
    }

    if (!found) {
      console.log(`  [miss] ${artist.id} (${artist.name}) — no image found`);
    }
  }

  return results;
}

// ─── MusicBrainz / Cover Art Archive helpers ───

interface MusicBrainzReleaseGroup {
  id: string;
  title: string;
  "primary-type"?: string;
  "first-release-date"?: string;
  score: number;
}

interface CoverArtImage {
  id: number;
  image: string;
  front: boolean;
  thumbnails: {
    small?: string;
    large?: string;
    "250"?: string;
    "500"?: string;
    "1200"?: string;
  };
}

function fetchJson(url: string, userAgent: string): Promise<any> {
  return new Promise((resolve, reject) => {
    const client = url.startsWith("https") ? https : http;
    const req = client.get(url, { headers: { "User-Agent": userAgent } }, (res) => {
      if (res.statusCode && res.statusCode >= 300 && res.statusCode < 400 && res.headers.location) {
        fetchJson(res.headers.location, userAgent).then(resolve).catch(reject);
        return;
      }
      if (res.statusCode && res.statusCode !== 200) {
        reject(new Error(`HTTP ${res.statusCode} for ${url}`));
        return;
      }
      const chunks: Buffer[] = [];
      res.on("data", (chunk) => chunks.push(chunk));
      res.on("end", () => {
        try {
          resolve(JSON.parse(Buffer.concat(chunks).toString("utf-8")));
        } catch {
          reject(new Error(`Invalid JSON from ${url}`));
        }
      });
      res.on("error", reject);
    });
    req.on("error", reject);
    req.setTimeout(15000, () => {
      req.destroy();
      reject(new Error(`Timeout fetching ${url}`));
    });
  });
}

function pickBestReleaseGroup(groups: MusicBrainzReleaseGroup[]): MusicBrainzReleaseGroup | null {
  const scored = groups.map((group) => {
    let bonus = 0;
    const groupType = (group["primary-type"] || "").toLowerCase();
    if (groupType === "album" || groupType === "ep") bonus += 20;
    if (groupType === "single") bonus += 5;
    return { group, score: group.score + bonus };
  });

  scored.sort((a, b) => b.score - a.score);
  return scored[0]?.group ?? null;
}

async function searchMusicBrainzCover(
  artist: string,
  title: string,
): Promise<string | null> {
  const query = encodeURIComponent(`artist:"${artist}" AND releasegroup:"${title}"`);
  const searchUrl = `${MUSICBRAINZ_BASE}/release-group?query=${query}&fmt=json&limit=5`;

  try {
    const data = await fetchJson(searchUrl, MB_USER_AGENT);
    const releaseGroups: MusicBrainzReleaseGroup[] = data["release-groups"] || [];

    if (releaseGroups.length === 0) return null;

    const best = pickBestReleaseGroup(releaseGroups);
    if (!best) return null;

    await sleep(MB_RATE_LIMIT_MS);

    const caaUrl = `${COVER_ART_BASE}/release-group/${best.id}`;
    const caaData = await fetchJson(caaUrl, MB_USER_AGENT);
    const images: CoverArtImage[] = caaData.images || [];

    const toHttps = (url: string | undefined) => url?.replace(/^http:/, "https:");

    const frontCover = images.find((img) => img.front);
    if (frontCover) {
      return toHttps(
        frontCover.thumbnails["500"] ||
        frontCover.thumbnails["1200"] ||
        frontCover.thumbnails.large ||
        frontCover.image
      ) || null;
    }

    if (images.length > 0) {
      const first = images[0];
      return toHttps(first.thumbnails["500"] || first.thumbnails.large || first.image) || null;
    }

    return null;
  } catch {
    return null;
  }
}

// ─── Part B: Release cover art from MusicBrainz + Discogs fallback ───

function normalizeKey(artist: string, title: string): string {
  return `${artist}::${title}`
    .toLowerCase()
    .replace(/\s*\(\d+\)\s*/g, "")
    .replace(/[^a-z0-9:]/g, "");
}

function normalizeForMatch(s: string): string {
  return s.toLowerCase().replace(/^the\s+/, "").replace(/[^a-z0-9]/g, "");
}

async function fetchAllLabelReleases(): Promise<Map<string, any>> {
  const lookup = new Map<string, any>();

  console.log(`\n  Fetching all releases from Discogs label ${TOUCH_GO_LABEL_ID}...`);

  let page = 1;
  let totalPages = 1;

  do {
    try {
      const data = await fetchDiscogs(
        `/labels/${TOUCH_GO_LABEL_ID}/releases?page=${page}&per_page=100&sort=year&sort_order=asc`
      );
      totalPages = data?.pagination?.pages || 1;

      for (const r of data?.releases || []) {
        const key = normalizeKey(r.artist || "", r.title || "");
        if (key && !lookup.has(key)) {
          lookup.set(key, r);
        }
      }
      console.log(`    Page ${page}/${totalPages} — ${data?.releases?.length || 0} releases`);
    } catch (err: any) {
      console.log(`    Page ${page} error: ${err.message}`);
    }

    page++;
    if (page <= totalPages) await sleep(RATE_LIMIT_MS);
  } while (page <= totalPages);

  console.log(`  Total unique releases in lookup: ${lookup.size}`);
  return lookup;
}

async function searchDiscogsRelease(artist: string, title: string): Promise<any | null> {
  try {
    const q = `${artist} ${title}`.replace(/[&]/g, "and");
    const data = await fetchDiscogs(
      `/database/search?q=${encodeURIComponent(q)}&type=release&per_page=5`
    );
    const normArtist = normalizeForMatch(artist);
    for (const result of data?.results || []) {
      const resultTitle = normalizeForMatch(result.title || "");
      if (resultTitle.includes(normArtist)) {
        return { id: result.id };
      }
    }
  } catch {
    // ignore
  }
  return null;
}

async function downloadReleaseCoverArt(): Promise<Record<number, string>> {
  console.log("\n=== Part B: Release cover art from MusicBrainz + Discogs ===\n");
  const results: Record<number, string> = {};

  const lookup = DISCOGS_TOKEN ? await fetchAllLabelReleases() : new Map<string, any>();

  let mbHits = 0;
  let discogsHits = 0;

  for (const release of touchgorecordsReleases) {
    const label = release.catalogNo || `#${release.id}`;
    const existingFile = ["jpg", "gif", "png"].map(e => `release-${release.id}.${e}`).find(f => fs.existsSync(path.join(ALBUMS_DIR, f)));
    if (existingFile) {
      console.log(`  [skip] ${label} — already exists`);
      results[release.id] = `/images/touch-go-records/albums/${existingFile}`;
      continue;
    }

    let imageUrl: string | null = null;
    let source: string | null = null;

    // 1. Try MusicBrainz / Cover Art Archive first (free, no auth needed)
    try {
      console.log(`  [mb]   ${label} ${release.artist} — "${release.title}" — searching MusicBrainz...`);
      imageUrl = await searchMusicBrainzCover(release.artist, release.title);
      await sleep(MB_RATE_LIMIT_MS);
      if (imageUrl) source = "mb";
    } catch {
      // MusicBrainz failed
    }

    // 2. Try Discogs label lookup
    if (!imageUrl && DISCOGS_TOKEN) {
      const key = normalizeKey(release.artist, release.title);
      const discogsRelease = lookup.get(key);

      if (discogsRelease) {
        try {
          console.log(`  [discogs] ${label} — found in label lookup (id: ${discogsRelease.id})`);
          const fullRelease = await fetchDiscogs(`/releases/${discogsRelease.id}`);
          await sleep(RATE_LIMIT_MS);

          const releaseArtists = (fullRelease?.artists || [])
            .map((a: any) => normalizeForMatch(a.name || ""))
            .join(" ");
          const normArtist = normalizeForMatch(release.artist);

          if (!releaseArtists.includes(normArtist)) {
            console.log(`  [skip-mismatch] ${label} — Discogs artist "${fullRelease?.artists?.[0]?.name}" doesn't match "${release.artist}"`);
          } else {
            imageUrl =
              fullRelease?.images?.[0]?.uri ||
              fullRelease?.images?.[0]?.uri150 ||
              discogsRelease.thumb || null;
            if (imageUrl) source = "discogs";
          }
        } catch {
          // Discogs fetch failed
        }
      }

      // 3. Last resort: Discogs search
      if (!imageUrl && !discogsRelease) {
        console.log(`  [discogs-search] ${label} — trying Discogs search...`);
        const searchResult = await searchDiscogsRelease(release.artist, release.title);
        await sleep(RATE_LIMIT_MS);

        if (searchResult) {
          try {
            const fullRelease = await fetchDiscogs(`/releases/${searchResult.id}`);
            await sleep(RATE_LIMIT_MS);

            const releaseArtists = (fullRelease?.artists || [])
              .map((a: any) => normalizeForMatch(a.name || ""))
              .join(" ");
            const normArtist = normalizeForMatch(release.artist);

            if (releaseArtists.includes(normArtist)) {
              imageUrl =
                fullRelease?.images?.[0]?.uri ||
                fullRelease?.images?.[0]?.uri150 || null;
              if (imageUrl) source = "discogs";
            }
          } catch {
            // Discogs fetch failed
          }
        }
      }
    }

    if (!imageUrl) {
      console.log(`  [miss] ${label} ${release.artist} — "${release.title}" — no image found`);
      continue;
    }

    // Download the image
    try {
      const buf = await fetchUrl(imageUrl.replace(/^http:/, "https:"));
      const actualExt = getExtFromUrl(imageUrl);
      const actualFilename = `release-${release.id}.${actualExt}`;
      const actualPath = path.join(ALBUMS_DIR, actualFilename);

      fs.writeFileSync(actualPath, buf);
      results[release.id] = `/images/touch-go-records/albums/${actualFilename}`;

      if (source === "mb") mbHits++;
      else discogsHits++;

      console.log(`  [ok]   ${label} ${release.artist} — "${release.title}" [${source}] (${(buf.length / 1024).toFixed(0)} KB)`);
    } catch (err: any) {
      console.log(`  [fail] ${label} ${release.artist} — ${err.message}`);
    }
  }

  console.log(`\n  Sources: ${mbHits} from MusicBrainz, ${discogsHits} from Discogs`);
  return results;
}

// ─── Part C: Generate mapping file ───

function generateMappingFile(
  artistImages: Record<number, string>,
  releaseImages: Record<number, string>,
): void {
  console.log("\n=== Part C: Generate lib/touch-go-records-images.ts ===\n");

  const artistEntries = Object.entries(artistImages)
    .sort(([a], [b]) => Number(a) - Number(b))
    .map(([id, p]) => `  ${id}: "${p}",`)
    .join("\n");

  const releaseEntries = Object.entries(releaseImages)
    .sort(([a], [b]) => Number(a) - Number(b))
    .map(([id, p]) => `  ${id}: "${p}",`)
    .join("\n");

  const content = `// Auto-generated by scripts/download-touch-go-images.ts
// Do not edit manually — re-run the script to update.

export const tgLocalArtistImages: Record<number, string> = {
${artistEntries}
};

export const tgLocalReleaseImages: Record<number, string> = {
${releaseEntries}
};

export function getTgLocalArtistImage(id: number): string | undefined {
  return tgLocalArtistImages[id];
}

export function getTgLocalReleaseImage(id: number): string | undefined {
  return tgLocalReleaseImages[id];
}
`;

  fs.writeFileSync(OUTPUT_FILE, content, "utf-8");
  console.log(`  Written ${OUTPUT_FILE}`);
  console.log(`  Artists: ${Object.keys(artistImages).length} mapped`);
  console.log(`  Releases: ${Object.keys(releaseImages).length} mapped`);
}

// ─── Main ───

async function main() {
  console.log("Touch & Go Records — Image Download Script");
  console.log("=".repeat(50));

  if (!DISCOGS_TOKEN) {
    console.log("\nWARNING: No DISCOGS_USER_TOKEN set.");
    console.log("Artist images require a Discogs token. Release covers will use MusicBrainz (free).");
    console.log("Get a token at: https://www.discogs.com/settings/developers\n");
  }

  fs.mkdirSync(ARTISTS_DIR, { recursive: true });
  fs.mkdirSync(ALBUMS_DIR, { recursive: true });

  const artistImages = await downloadArtistPhotos();
  const releaseImages = await downloadReleaseCoverArt();
  generateMappingFile(artistImages, releaseImages);

  console.log("\nDone!");
}

main().catch((err) => {
  console.error("Fatal error:", err);
  process.exit(1);
});
