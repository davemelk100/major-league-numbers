/**
 * Fetch artist/band members and discography from the Discogs API.
 *
 * Usage:
 *   const { artists, releases } = await fetchDiscogsArtistData(252314, token);
 */

import type { GeneratedArtist, GeneratedRelease } from "./schemas";

interface DiscogsMember {
  id: number;
  name: string;
  active: boolean;
}

interface DiscogsArtistResponse {
  name: string;
  profile: string;
  members?: DiscogsMember[];
}

interface DiscogsArtistRelease {
  id: number;
  title: string;
  artist: string;
  year?: number;
  format?: string;
  label?: string;
  type: "master" | "release";
  role: string;
  main_release?: number;
}

interface DiscogsArtistReleasesResponse {
  pagination: {
    page: number;
    pages: number;
    per_page: number;
    items: number;
  };
  releases: DiscogsArtistRelease[];
}

function sleep(ms: number) {
  return new Promise((resolve) => setTimeout(resolve, ms));
}

/**
 * Try to extract role info from the Discogs artist profile text.
 * Profiles often contain lines like "J. Robbins – Vocals, Guitar (1989–present)"
 */
function parseProfileDescription(
  profile: string,
  memberName: string,
): string | undefined {
  if (!profile) return undefined;

  // Try to find a line mentioning this member
  const escaped = memberName.replace(/[.*+?^${}()|[\]\\]/g, "\\$&");
  const pattern = new RegExp(
    `${escaped}\\s*[-–—:]\\s*([^\\n]+)`,
    "i",
  );
  const match = profile.match(pattern);
  if (match) {
    return match[1].trim();
  }
  return undefined;
}

export async function fetchDiscogsArtistData(
  artistId: number,
  token: string,
): Promise<{ artists: GeneratedArtist[]; releases: GeneratedRelease[] }> {
  const headers = {
    Authorization: `Discogs token=${token}`,
    "User-Agent": "MajorLeagueNumbers/1.0",
  };

  // 1. Fetch artist details (members + profile)
  console.log(`Fetching artist details for Discogs artist ${artistId}...`);
  const artistRes = await fetch(
    `https://api.discogs.com/artists/${artistId}`,
    { headers },
  );
  if (!artistRes.ok) {
    throw new Error(
      `Discogs API error: ${artistRes.status} ${artistRes.statusText}`,
    );
  }
  const artistData = (await artistRes.json()) as DiscogsArtistResponse;

  // Parse members
  const artists: GeneratedArtist[] = [];
  if (artistData.members && artistData.members.length > 0) {
    let id = 1;
    for (const member of artistData.members) {
      const description = parseProfileDescription(
        artistData.profile,
        member.name,
      );
      artists.push({
        id,
        name: member.name.replace(/\s*\(\d+\)$/, "").trim(),
        ...(description ? { description } : {}),
      });
      id += 1;
    }
  }

  console.log(
    `Found ${artists.length} members for "${artistData.name}".`,
  );

  await sleep(1500);

  // 2. Fetch releases (paginated)
  const allReleases: DiscogsArtistRelease[] = [];
  let page = 1;
  let totalPages = 1;

  console.log(`Fetching releases for Discogs artist ${artistId}...`);

  while (page <= totalPages) {
    const url = `https://api.discogs.com/artists/${artistId}/releases?page=${page}&per_page=100&sort=year&sort_order=asc`;

    const res = await fetch(url, { headers });

    if (!res.ok) {
      throw new Error(
        `Discogs API error: ${res.status} ${res.statusText} (page ${page})`,
      );
    }

    const data = (await res.json()) as DiscogsArtistReleasesResponse;
    totalPages = data.pagination.pages;
    allReleases.push(...data.releases);

    console.log(
      `  Page ${page}/${totalPages} — ${data.releases.length} releases (${allReleases.length} total)`,
    );

    page += 1;

    if (page <= totalPages) {
      await sleep(1500);
    }
  }

  console.log(`Fetched ${allReleases.length} total releases from Discogs.`);

  // Filter to Main role only, deduplicate masters vs releases
  const seenMasterIds = new Set<number>();
  const releases: GeneratedRelease[] = [];
  let releaseId = 1;

  for (const rel of allReleases) {
    // Only include releases where this artist has the Main role
    if (rel.role !== "Main") continue;

    // Deduplicate: if this is a release that has a master, skip if we already saw the master
    if (rel.type === "release" && rel.main_release) {
      if (seenMasterIds.has(rel.main_release)) continue;
    }

    // Track master IDs
    if (rel.type === "master") {
      seenMasterIds.add(rel.id);
    }

    releases.push({
      id: releaseId,
      title: rel.title || "Untitled",
      artist: rel.artist
        ? rel.artist.replace(/\s*\(\d+\)$/, "").trim()
        : "Unknown",
      year: rel.year ?? null,
      format: rel.format || null,
    });
    releaseId += 1;
  }

  console.log(
    `Extracted ${artists.length} members and ${releases.length} main releases.`,
  );

  return { artists, releases };
}
