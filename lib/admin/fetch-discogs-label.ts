/**
 * Fetch a complete label discography from the Discogs API.
 *
 * Usage:
 *   const { artists, releases } = await fetchDiscogsLabelData(244, token);
 */

import type { GeneratedArtist, GeneratedRelease } from "./schemas";

interface DiscogsLabelRelease {
  id: number;
  catno?: string;
  title?: string;
  artist?: string;
  year?: number;
  format?: string;
  status?: string;
  thumb?: string;
}

interface DiscogsLabelResponse {
  pagination: {
    page: number;
    pages: number;
    per_page: number;
    items: number;
  };
  releases: DiscogsLabelRelease[];
}

function sleep(ms: number) {
  return new Promise((resolve) => setTimeout(resolve, ms));
}

function normalizeName(name: string): string {
  return name
    .toLowerCase()
    .replace(/\s*\(\d+\)$/, "") // remove trailing (2), (3) etc. used by Discogs for disambiguation
    .trim();
}

export async function fetchDiscogsLabelData(
  labelId: number,
  token: string,
): Promise<{ artists: GeneratedArtist[]; releases: GeneratedRelease[] }> {
  const allReleases: DiscogsLabelRelease[] = [];
  let page = 1;
  let totalPages = 1;

  console.log(`Fetching discography for Discogs label ${labelId}...`);

  while (page <= totalPages) {
    const url = `https://api.discogs.com/labels/${labelId}/releases?page=${page}&per_page=100&sort=year&sort_order=asc`;

    const res = await fetch(url, {
      headers: {
        Authorization: `Discogs token=${token}`,
        "User-Agent": "MajorLeagueNumbers/1.0",
      },
    });

    if (!res.ok) {
      throw new Error(
        `Discogs API error: ${res.status} ${res.statusText} (page ${page})`,
      );
    }

    const data = (await res.json()) as DiscogsLabelResponse;
    totalPages = data.pagination.pages;
    allReleases.push(...data.releases);

    console.log(
      `  Page ${page}/${totalPages} — ${data.releases.length} releases (${allReleases.length} total)`,
    );

    page += 1;

    // Respect Discogs rate limit (60 requests/min → ~1s between, use 1.5s to be safe)
    if (page <= totalPages) {
      await sleep(1500);
    }
  }

  console.log(`Fetched ${allReleases.length} total releases from Discogs.`);

  // Deduplicate artists by normalized name
  const artistMap = new Map<string, string>(); // normalizedName → display name
  for (const rel of allReleases) {
    if (!rel.artist) continue;
    const norm = normalizeName(rel.artist);
    if (!artistMap.has(norm)) {
      // Use the original casing from Discogs, but strip disambiguation suffix
      artistMap.set(norm, rel.artist.replace(/\s*\(\d+\)$/, "").trim());
    }
  }

  const artists: GeneratedArtist[] = [];
  let artistId = 1;
  for (const [, displayName] of artistMap) {
    artists.push({ id: artistId, name: displayName });
    artistId += 1;
  }

  // Map releases, deduplicating by Discogs release ID
  const seenReleaseIds = new Set<number>();
  const releases: GeneratedRelease[] = [];
  for (const rel of allReleases) {
    if (seenReleaseIds.has(rel.id)) continue;
    seenReleaseIds.add(rel.id);
    releases.push({
      id: rel.id,
      catalogNo: rel.catno || undefined,
      title: rel.title || "Untitled",
      artist: rel.artist
        ? rel.artist.replace(/\s*\(\d+\)$/, "").trim()
        : "Various",
      year: rel.year ?? null,
      format: rel.format || null,
    });
  }

  console.log(
    `Extracted ${artists.length} unique artists and ${releases.length} releases.`,
  );

  return { artists, releases };
}
