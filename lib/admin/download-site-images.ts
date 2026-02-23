/**
 * Reusable image download module for generated music sites.
 *
 * Downloads artist photos from Discogs and release cover art from
 * MusicBrainz/Cover Art Archive (primary) + Discogs (fallback).
 */

import fs from "fs";
import path from "path";
import https from "https";
import http from "http";
import type { GeneratedArtist, GeneratedRelease } from "./schemas";

const DISCOGS_BASE = "https://api.discogs.com";
const USER_AGENT = "MajorLeagueNumbers/1.0";
const DISCOGS_RATE_LIMIT_MS = 5000;

const MUSICBRAINZ_BASE = "https://musicbrainz.org/ws/2";
const COVER_ART_BASE = "https://coverartarchive.org";
const MB_USER_AGENT = "MajorLeagueNumbers/1.0 (https://majorleaguenumbers.com)";
const MB_RATE_LIMIT_MS = 1100;

export interface DownloadSiteImagesResult {
  artistImages: Record<string, string>;
  releaseImages: Record<number, string>;
}

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

function fetchDiscogs(endpoint: string, token: string): Promise<any> {
  const url = `${DISCOGS_BASE}${endpoint}`;
  const headers: Record<string, string> = { "User-Agent": USER_AGENT };
  if (token) {
    headers["Authorization"] = `Discogs token=${token}`;
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

function fetchMusicBrainz(endpoint: string): Promise<any> {
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

function fetchCoverArt(releaseGroupId: string): Promise<any> {
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

// ─── Artist photos from Discogs ───

async function downloadArtistPhotos(
  siteId: string,
  artists: GeneratedArtist[],
  discogsToken: string,
): Promise<Record<string, string>> {
  console.log("\n=== Downloading artist photos from Discogs ===\n");
  const results: Record<string, string> = {};

  if (!discogsToken) {
    console.log("  WARNING: No DISCOGS_USER_TOKEN set. Skipping artist image downloads.");
    return results;
  }

  const artistsDir = path.join(process.cwd(), "public", "images", siteId, "artists");
  fs.mkdirSync(artistsDir, { recursive: true });

  for (const artist of artists) {
    const slug = artist.name.toLowerCase().replace(/[^a-z0-9]+/g, "-").replace(/(^-|-$)/g, "");
    const outPath = path.join(artistsDir, `${slug}.jpg`);
    if (fs.existsSync(outPath)) {
      console.log(`  [skip] ${artist.name} — already exists`);
      results[slug] = `/images/${siteId}/artists/${slug}.jpg`;
      continue;
    }

    let found = false;

    try {
      console.log(`  [search] searching Discogs for "${artist.name}"...`);
      const searchData = await fetchDiscogs(
        `/database/search?q=${encodeURIComponent(artist.name)}&type=artist&per_page=5`,
        discogsToken,
      );
      await sleep(DISCOGS_RATE_LIMIT_MS);

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
              results[slug] = `/images/${siteId}/artists/${slug}.jpg`;
              console.log(`  [ok]   ${artist.name} — [discogs-search] (${(buf.length / 1024).toFixed(0)} KB)`);
              found = true;
            }
          } catch {
            // cover_image download failed
          }
        }

        // If cover_image didn't work, try fetching the artist detail page for images
        if (!found && match?.id) {
          try {
            const artistData = await fetchDiscogs(`/artists/${match.id}`, discogsToken);
            await sleep(DISCOGS_RATE_LIMIT_MS);
            const imageUrl = artistData?.images?.[0]?.uri || artistData?.images?.[0]?.uri150;
            if (imageUrl) {
              const buf = await fetchUrl(imageUrl.replace(/^http:/, "https:"));
              if (buf.length > 1000) {
                fs.writeFileSync(outPath, buf);
                results[slug] = `/images/${siteId}/artists/${slug}.jpg`;
                console.log(`  [ok]   ${artist.name} — [discogs-artist] (${(buf.length / 1024).toFixed(0)} KB)`);
                found = true;
              }
            }
          } catch {
            // Artist detail fetch failed
          }
        }
      }
    } catch (err: any) {
      console.log(`  [fail] ${artist.name} — Discogs search: ${err.message}`);
    }

    if (!found) {
      console.log(`  [miss] ${artist.name} — no image found`);
    }
  }

  return results;
}

// ─── Release cover art from MusicBrainz + Discogs fallback ───

async function downloadReleaseCoverArt(
  siteId: string,
  releases: GeneratedRelease[],
  discogsToken: string,
  discogsLabelId?: number,
): Promise<Record<number, string>> {
  console.log("\n=== Downloading release cover art from MusicBrainz + Discogs ===\n");
  const results: Record<number, string> = {};

  const releasesDir = path.join(process.cwd(), "public", "images", siteId, "releases");
  fs.mkdirSync(releasesDir, { recursive: true });

  // Build Discogs label release lookup for fallback
  let discogsLabelReleases: Map<string, number> | null = null;
  if (discogsLabelId && discogsToken) {
    try {
      console.log("  Building Discogs label release lookup...");
      discogsLabelReleases = new Map();
      const firstPage = await fetchDiscogs(
        `/labels/${discogsLabelId}/releases?page=1&per_page=100&sort=year&sort_order=asc`,
        discogsToken,
      );
      for (const r of firstPage?.releases || []) {
        const key = `${(r.artist || "").toLowerCase()}::${(r.title || "").toLowerCase()}`;
        if (!discogsLabelReleases.has(key)) discogsLabelReleases.set(key, r.id);
      }
      const totalPages = Math.min(firstPage?.pagination?.pages || 1, 10);
      for (let page = 2; page <= totalPages; page++) {
        await sleep(DISCOGS_RATE_LIMIT_MS);
        try {
          const pageData = await fetchDiscogs(
            `/labels/${discogsLabelId}/releases?page=${page}&per_page=100&sort=year&sort_order=asc`,
            discogsToken,
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
  }

  for (const release of releases) {
    const outPath = path.join(releasesDir, `release-${release.id}.jpg`);
    if (fs.existsSync(outPath)) {
      console.log(`  [skip] #${release.id} (${release.artist} — ${release.title}) — already exists`);
      results[release.id] = `/images/${siteId}/releases/release-${release.id}.jpg`;
      continue;
    }

    let found = false;

    // Try MusicBrainz first (free, no auth)
    try {
      console.log(`  [mb]   #${release.id} — searching MusicBrainz for "${release.artist} - ${release.title}"...`);
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
                results[release.id] = `/images/${siteId}/releases/release-${release.id}.jpg`;
                console.log(`  [ok]   #${release.id} (${release.artist} — ${release.title}) — [musicbrainz] (${(buf.length / 1024).toFixed(0)} KB)`);
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

    // Fallback: Discogs label lookup
    if (!found && discogsLabelReleases && discogsToken) {
      const lookupKey = `${release.artist.toLowerCase()}::${release.title.toLowerCase()}`;
      const discogsId = discogsLabelReleases.get(lookupKey);

      if (discogsId) {
        try {
          console.log(`  [dg]   #${release.id} — trying Discogs release ${discogsId}...`);
          const releaseData = await fetchDiscogs(`/releases/${discogsId}`, discogsToken);
          await sleep(DISCOGS_RATE_LIMIT_MS);

          const images = releaseData?.images;
          if (Array.isArray(images) && images.length > 0) {
            const primary = images.find((img: any) => img.type === "primary");
            const imageUrl = primary?.uri || images[0]?.uri;
            if (imageUrl) {
              const buf = await fetchUrl(imageUrl.replace(/^http:/, "https:"));
              if (buf.length > 1000) {
                fs.writeFileSync(outPath, buf);
                results[release.id] = `/images/${siteId}/releases/release-${release.id}.jpg`;
                console.log(`  [ok]   #${release.id} (${release.artist} — ${release.title}) — [discogs] (${(buf.length / 1024).toFixed(0)} KB)`);
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
            `/database/search?q=${q}&type=release&per_page=3`,
            discogsToken,
          );
          await sleep(DISCOGS_RATE_LIMIT_MS);

          const match = searchData?.results?.[0];
          if (match?.cover_image && !match.cover_image.includes("spacer.gif")) {
            const buf = await fetchUrl(match.cover_image.replace(/^http:/, "https:"));
            if (buf.length > 1000) {
              fs.writeFileSync(outPath, buf);
              results[release.id] = `/images/${siteId}/releases/release-${release.id}.jpg`;
              console.log(`  [ok]   #${release.id} (${release.artist} — ${release.title}) — [discogs-search] (${(buf.length / 1024).toFixed(0)} KB)`);
              found = true;
            }
          }
        } catch {
          // search failed
        }
      }
    }

    if (!found) {
      console.log(`  [miss] #${release.id} (${release.artist} — ${release.title}) — no image found`);
    }
  }

  return results;
}

// ─── Main entry point ───

export async function downloadSiteImages(
  siteId: string,
  artists: GeneratedArtist[],
  releases: GeneratedRelease[],
  discogsLabelId?: number,
): Promise<DownloadSiteImagesResult> {
  const discogsToken = process.env.DISCOGS_USER_TOKEN || process.env.DISCOGS_TOKEN || "";

  console.log(`\nDownloading images for site "${siteId}"...`);

  const artistImages = await downloadArtistPhotos(siteId, artists, discogsToken);
  const releaseImages = await downloadReleaseCoverArt(siteId, releases, discogsToken, discogsLabelId);

  console.log(`\nImage download complete: ${Object.keys(artistImages).length} artist images, ${Object.keys(releaseImages).length} release images.`);

  return { artistImages, releaseImages };
}
