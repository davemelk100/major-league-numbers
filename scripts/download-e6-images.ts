/**
 * Download Elephant 6 Recording Co. images
 *
 * Part A: Artist photos from Discogs
 * Part B: Release cover art from MusicBrainz/Cover Art Archive + Discogs fallback
 * Part C: Generate mapping files
 *
 * Usage: DISCOGS_USER_TOKEN=xxx npx tsx scripts/download-e6-images.ts
 */

import fs from "fs";
import path from "path";
import https from "https";
import http from "http";

const DISCOGS_TOKEN = process.env.DISCOGS_USER_TOKEN || process.env.DISCOGS_TOKEN || "";
const E6_LABEL_ID = 43843;
const DISCOGS_BASE = "https://api.discogs.com";
const USER_AGENT = "Elephant6RecordingCo/1.0";
const RATE_LIMIT_MS = 5000;

// MusicBrainz / Cover Art Archive
const MUSICBRAINZ_BASE = "https://musicbrainz.org/ws/2";
const COVER_ART_BASE = "https://coverartarchive.org";
const MB_USER_AGENT = "MajorLeagueNumbers/1.0 (https://majorleaguenumbers.com)";
const MB_RATE_LIMIT_MS = 1100;

const ARTISTS_DIR = path.join(process.cwd(), "public", "images", "e6", "artists");
const ALBUMS_DIR = path.join(process.cwd(), "public", "images", "e6", "releases");
const ARTIST_IMAGES_FILE = path.join(process.cwd(), "lib", "e6-artist-images.ts");
const RELEASE_IMAGES_FILE = path.join(process.cwd(), "lib", "e6-release-images.ts");

import { e6Artists } from "../lib/e6-artists-data";
import { e6Discography } from "../lib/e6-discography-data";

function sleep(ms: number): Promise<void> {
  return new Promise((resolve) => setTimeout(resolve, ms));
}

function fetchUrl(url: string, userAgent = USER_AGENT): Promise<Buffer> {
  return new Promise((resolve, reject) => {
    const client = url.startsWith("https") ? https : http;
    const req = client.get(url, { headers: { "User-Agent": userAgent } }, (res) => {
      if (res.statusCode && res.statusCode >= 300 && res.statusCode < 400 && res.headers.location) {
        fetchUrl(res.headers.location, userAgent).then(resolve).catch(reject);
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

async function fetchMusicBrainz(endpoint: string): Promise<any> {
  const url = `${MUSICBRAINZ_BASE}${endpoint}`;
  return new Promise((resolve, reject) => {
    const req = https.get(url, { headers: { "User-Agent": MB_USER_AGENT, Accept: "application/json" } }, (res) => {
      const chunks: Buffer[] = [];
      res.on("data", (chunk) => chunks.push(chunk));
      res.on("end", () => {
        const body = Buffer.concat(chunks).toString("utf-8");
        if (res.statusCode && res.statusCode !== 200) {
          reject(new Error(`MusicBrainz ${res.statusCode}: ${body.slice(0, 200)}`));
          return;
        }
        try {
          resolve(JSON.parse(body));
        } catch {
          reject(new Error(`Invalid JSON: ${body.slice(0, 200)}`));
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

async function fetchCoverArt(releaseGroupId: string): Promise<any> {
  const url = `${COVER_ART_BASE}/release-group/${releaseGroupId}`;
  return new Promise((resolve, reject) => {
    const req = https.get(url, { headers: { "User-Agent": MB_USER_AGENT, Accept: "application/json" } }, (res) => {
      if (res.statusCode && res.statusCode >= 300 && res.statusCode < 400 && res.headers.location) {
        fetchUrl(res.headers.location, MB_USER_AGENT)
          .then((buf) => resolve(JSON.parse(buf.toString("utf-8"))))
          .catch(reject);
        return;
      }
      const chunks: Buffer[] = [];
      res.on("data", (chunk) => chunks.push(chunk));
      res.on("end", () => {
        const body = Buffer.concat(chunks).toString("utf-8");
        if (res.statusCode && res.statusCode !== 200) {
          reject(new Error(`CoverArt ${res.statusCode}`));
          return;
        }
        try {
          resolve(JSON.parse(body));
        } catch {
          reject(new Error(`Invalid JSON from CoverArt`));
        }
      });
      res.on("error", reject);
    });
    req.on("error", reject);
    req.setTimeout(15000, () => {
      req.destroy();
      reject(new Error(`Timeout fetching CoverArt`));
    });
  });
}

// ─── Part A: Artist photos from Discogs ───

async function downloadArtistPhotos(): Promise<Record<string, string>> {
  console.log("\n=== Part A: Artist photos from Discogs ===\n");
  const results: Record<string, string> = {};

  if (!DISCOGS_TOKEN) {
    console.log("  WARNING: No DISCOGS_USER_TOKEN set. Artist image downloads require authentication.");
    console.log("  Set DISCOGS_USER_TOKEN in your environment or .env.local file.");
    console.log("  Get a token at: https://www.discogs.com/settings/developers\n");
    return results;
  }

  fs.mkdirSync(ARTISTS_DIR, { recursive: true });

  for (const artist of e6Artists) {
    const outPath = path.join(ARTISTS_DIR, `${artist.id}.jpg`);
    if (fs.existsSync(outPath)) {
      console.log(`  [skip] ${artist.id} (${artist.name}) — already exists`);
      results[artist.id] = `/images/e6/artists/${artist.id}.jpg`;
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
              results[artist.id] = `/images/e6/artists/${artist.id}.jpg`;
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
                results[artist.id] = `/images/e6/artists/${artist.id}.jpg`;
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

// ─── Part B: Release cover art from MusicBrainz + Discogs fallback ───

async function downloadReleaseCoverArt(): Promise<Record<number, string>> {
  console.log("\n=== Part B: Release cover art from MusicBrainz + Discogs ===\n");
  const results: Record<number, string> = {};

  fs.mkdirSync(ALBUMS_DIR, { recursive: true });

  // Build Discogs label release lookup for fallback
  let discogsLabelReleases: Map<string, number> | null = null;
  try {
    console.log("  Building Discogs label release lookup...");
    discogsLabelReleases = new Map();
    const firstPage = await fetchDiscogs(
      `/labels/${E6_LABEL_ID}/releases?page=1&per_page=100&sort=year&sort_order=asc`
    );
    for (const r of firstPage?.releases || []) {
      const key = `${(r.artist || "").toLowerCase()}::${(r.title || "").toLowerCase()}`;
      if (!discogsLabelReleases.has(key)) discogsLabelReleases.set(key, r.id);
    }
    const totalPages = Math.min(firstPage?.pagination?.pages || 1, 10);
    for (let page = 2; page <= totalPages; page++) {
      await sleep(RATE_LIMIT_MS);
      try {
        const pageData = await fetchDiscogs(
          `/labels/${E6_LABEL_ID}/releases?page=${page}&per_page=100&sort=year&sort_order=asc`
        );
        for (const r of pageData?.releases || []) {
          const key = `${(r.artist || "").toLowerCase()}::${(r.title || "").toLowerCase()}`;
          if (!discogsLabelReleases.has(key)) discogsLabelReleases.set(key, r.id);
        }
      } catch {
        // page fetch failed
      }
    }
    console.log(`  Discogs label lookup: ${discogsLabelReleases.size} releases indexed\n`);
  } catch (err: any) {
    console.log(`  WARNING: Could not build Discogs label lookup: ${err.message}\n`);
  }

  for (const release of e6Discography) {
    const outPath = path.join(ALBUMS_DIR, `release-${release.catalogNumber}.jpg`);
    if (fs.existsSync(outPath)) {
      console.log(`  [skip] E6-${release.catalogNumber} (${release.artist} — ${release.title}) — already exists`);
      results[release.catalogNumber] = `/images/e6/releases/release-${release.catalogNumber}.jpg`;
      continue;
    }

    let found = false;

    // Try MusicBrainz first (free, no auth)
    try {
      console.log(`  [mb]   E6-${release.catalogNumber} — searching MusicBrainz for "${release.artist} - ${release.title}"...`);
      const query = encodeURIComponent(`"${release.title}" AND artist:"${release.artist}"`);
      const mbData = await fetchMusicBrainz(
        `/release-group?query=${query}&limit=5&fmt=json`
      );
      await sleep(MB_RATE_LIMIT_MS);

      const releaseGroups = mbData?.["release-groups"] || [];
      if (releaseGroups.length > 0) {
        const rg = releaseGroups[0];
        try {
          const coverData = await fetchCoverArt(rg.id);
          const frontImage = coverData?.images?.find((img: any) => img.front);
          const imageEntry = frontImage || coverData?.images?.[0];
          if (imageEntry) {
            const imageUrl =
              imageEntry.thumbnails?.["500"] ||
              imageEntry.thumbnails?.large ||
              imageEntry.image;
            if (imageUrl) {
              const buf = await fetchUrl(imageUrl, MB_USER_AGENT);
              if (buf.length > 1000) {
                fs.writeFileSync(outPath, buf);
                results[release.catalogNumber] = `/images/e6/releases/release-${release.catalogNumber}.jpg`;
                console.log(`  [ok]   E6-${release.catalogNumber} (${release.artist} — ${release.title}) — [musicbrainz] (${(buf.length / 1024).toFixed(0)} KB)`);
                found = true;
              }
            }
          }
        } catch {
          // Cover art not available for this release group
        }
      }
    } catch {
      // MusicBrainz search failed
    }

    // Fallback: Discogs
    if (!found && discogsLabelReleases && DISCOGS_TOKEN) {
      const lookupKey = `${release.artist.toLowerCase()}::${release.title.toLowerCase()}`;
      const discogsId = discogsLabelReleases.get(lookupKey);

      if (discogsId) {
        try {
          console.log(`  [dg]   E6-${release.catalogNumber} — trying Discogs release ${discogsId}...`);
          const releaseData = await fetchDiscogs(`/releases/${discogsId}`);
          await sleep(RATE_LIMIT_MS);

          const images = releaseData?.images;
          if (Array.isArray(images) && images.length > 0) {
            const primary = images.find((img: any) => img.type === "primary");
            const imageUrl = primary?.uri || images[0]?.uri;
            if (imageUrl) {
              const buf = await fetchUrl(imageUrl.replace(/^http:/, "https:"));
              if (buf.length > 1000) {
                fs.writeFileSync(outPath, buf);
                results[release.catalogNumber] = `/images/e6/releases/release-${release.catalogNumber}.jpg`;
                console.log(`  [ok]   E6-${release.catalogNumber} (${release.artist} — ${release.title}) — [discogs] (${(buf.length / 1024).toFixed(0)} KB)`);
                found = true;
              }
            }
          }
        } catch {
          // Discogs release fetch failed
        }
      }

      // Last resort: Discogs search
      if (!found) {
        try {
          const q = encodeURIComponent(`${release.artist} ${release.title}`);
          const searchData = await fetchDiscogs(
            `/database/search?q=${q}&type=release&per_page=3`
          );
          await sleep(RATE_LIMIT_MS);

          const match = searchData?.results?.[0];
          if (match?.cover_image && !match.cover_image.includes("spacer.gif")) {
            const buf = await fetchUrl(match.cover_image.replace(/^http:/, "https:"));
            if (buf.length > 1000) {
              fs.writeFileSync(outPath, buf);
              results[release.catalogNumber] = `/images/e6/releases/release-${release.catalogNumber}.jpg`;
              console.log(`  [ok]   E6-${release.catalogNumber} (${release.artist} — ${release.title}) — [discogs-search] (${(buf.length / 1024).toFixed(0)} KB)`);
              found = true;
            }
          }
        } catch {
          // search failed
        }
      }
    }

    if (!found) {
      console.log(`  [miss] E6-${release.catalogNumber} (${release.artist} — ${release.title}) — no image found`);
    }
  }

  return results;
}

// ─── Part C: Generate mapping files ───

function writeArtistImagesFile(artistImages: Record<string, string>) {
  const entries = Object.entries(artistImages)
    .sort(([a], [b]) => a.localeCompare(b))
    .map(([id, url]) => `  "${id}": "${url}",`)
    .join("\n");

  const content = `export const localMemberImages: Record<string, string> = {
${entries}
};

export const E6_MEMBER_IMAGE_FALLBACKS: Record<string, string> = {};

export const E6_MEMBER_IMAGE_SKIP: Record<string, true> = {};

export function getLocalMemberImage(memberId?: string | null): string | null {
  if (!memberId) return null;
  return localMemberImages[memberId] || null;
}
`;

  fs.writeFileSync(ARTIST_IMAGES_FILE, content);
  console.log(`\n  Wrote ${ARTIST_IMAGES_FILE} (${Object.keys(artistImages).length} entries)`);
}

function writeReleaseImagesFile(releaseImages: Record<number, string>) {
  const entries = Object.entries(releaseImages)
    .sort(([a], [b]) => Number(a) - Number(b))
    .map(([id, url]) => `  ${id}: "${url}",`)
    .join("\n");

  const content = `export const localAlbumImages: Record<number, string> = {
${entries}
};

export function getLocalAlbumImage(catalogNumber: number): string | null {
  return localAlbumImages[catalogNumber] || null;
}
`;

  fs.writeFileSync(RELEASE_IMAGES_FILE, content);
  console.log(`  Wrote ${RELEASE_IMAGES_FILE} (${Object.keys(releaseImages).length} entries)`);
}

// ─── Main ───

async function main() {
  console.log("Downloading Elephant 6 Recording Co. images...");

  const artistImages = await downloadArtistPhotos();
  const releaseImages = await downloadReleaseCoverArt();

  console.log("\n=== Part C: Writing mapping files ===");
  writeArtistImagesFile(artistImages);
  writeReleaseImagesFile(releaseImages);

  console.log(`\nDone! ${Object.keys(artistImages).length} artist images, ${Object.keys(releaseImages).length} release images.`);
}

main().catch((err) => {
  console.error("Fatal error:", err);
  process.exit(1);
});
