/**
 * Central registry for site-specific data: artists, releases, timeline,
 * and side-projects / related-labels.
 *
 * Shared components use this registry to look up data by `site.id`
 * instead of maintaining per-site if/else chains with GBV fallbacks.
 */

// ── Artist imports ──────────────────────────────────────────────────
import { gbvMembers } from "@/lib/gbv-members-data";
import { amrepArtists } from "@/lib/amrep-artists-data";
import { AMREP_ARTIST_IMAGES } from "@/lib/amrep-artist-images";
import { revArtists } from "@/lib/rev-artists-data";
import { sgArtists } from "@/lib/sg-artists-data";
import { e6Artists } from "@/lib/e6-artists-data";
import { touchgorecordsArtists } from "@/lib/touch-go-records-artists-data";
import { TOUCH_GO_RECORDS_ARTIST_IMAGES } from "@/lib/touch-go-records-artist-images";
import { slapahamrecordsArtists } from "@/lib/slap-a-ham-records-artists-data";
import { SLAP_A_HAM_RECORDS_ARTIST_IMAGES } from "@/lib/slap-a-ham-records-artist-images";
import { slapahamnumbersArtists } from "@/lib/slap-a-ham-numbers-artists-data";
import { SLAP_A_HAM_NUMBERS_ARTIST_IMAGES } from "@/lib/slap-a-ham-numbers-artist-images";
import { testgithubcommitArtists } from "@/lib/test-github-commit-artists-data";
import { TEST_GITHUB_COMMIT_ARTIST_IMAGES } from "@/lib/test-github-commit-artist-images";
// ── new-site-artists ──

// ── Release imports ─────────────────────────────────────────────────
import { gbvAlbums } from "@/lib/gbv-discography-data";
import { amrepReleases } from "@/lib/amrep-releases-data";
import { touchgorecordsReleases } from "@/lib/touch-go-records-releases-data";
import { slapahamrecordsReleases } from "@/lib/slap-a-ham-records-releases-data";
import { slapahamnumbersReleases } from "@/lib/slap-a-ham-numbers-releases-data";
import { testgithubcommitReleases } from "@/lib/test-github-commit-releases-data";
// ── new-site-releases ──

// ── Timeline imports ────────────────────────────────────────────────
import { amrepTimeline } from "@/lib/amrep-timeline-data";
import { revTimeline } from "@/lib/rev-timeline-data";
import { sgTimeline } from "@/lib/sg-timeline-data";
import { e6Timeline } from "@/lib/e6-timeline-data";
import { touchgorecordsTimeline } from "@/lib/touch-go-records-timeline-data";
import { slapahamrecordsTimeline } from "@/lib/slap-a-ham-records-timeline-data";
import { slapahamnumbersTimeline } from "@/lib/slap-a-ham-numbers-timeline-data";
import { testgithubcommitTimeline } from "@/lib/test-github-commit-timeline-data";
// ── new-site-timeline ──

// ── Side-projects / related-labels imports ──────────────────────────
import { pollardSideProjects } from "@/lib/gbv-side-projects";
import { amrepImprints } from "@/lib/amrep-imprints-data";
import { revSubLabels } from "@/lib/rev-sublabels-data";
import { sgSubLabels } from "@/lib/sg-sublabels-data";
import { e6SubLabels } from "@/lib/e6-sublabels-data";
// ── new-site-sideprojects ──

// ── Album image imports ─────────────────────────────────────────────
import { getLocalAlbumImage as getGbvAlbumImage } from "@/lib/gbv-release-images";
import { getAmrepAlbumImage } from "@/lib/amrep-release-images";
import { getLocalAlbumImage as getE6AlbumImage } from "@/lib/e6-release-images";
import { getLocalAlbumImage as getTouchGoAlbumImage } from "@/lib/touch-go-records-release-images";
import { getLocalAlbumImage as getSlapAHamRecordsAlbumImage } from "@/lib/slap-a-ham-records-release-images";
import { getLocalAlbumImage as getSlapAHamNumbersAlbumImage } from "@/lib/slap-a-ham-numbers-release-images";
import { getLocalAlbumImage as getTestGithubCommitAlbumImage } from "@/lib/test-github-commit-release-images";
// ── new-site-albumimages ──

// ── Common types ────────────────────────────────────────────────────

export interface SiteArtist {
  id: number | string;
  name: string;
  description?: string;
  imageUrl?: string | null;
  active?: boolean;
}

export interface SiteRelease {
  id: number | string;
  title: string;
  artist?: string;
  year?: number | null;
  format?: string | string[] | null;
  catalogNo?: string;
  releaseType?: string;
}

export interface SiteTimelineEvent {
  year: number;
  title?: string;
  event?: string;
  description?: string;
}

export interface SiteSideProject {
  name: string;
  description: string;
  years?: string;
  highlights?: string[];
  releases?: Array<{ title: string; year: number }>;
  url?: string;
  discographyUrl?: string;
}

// ── Artist registry ─────────────────────────────────────────────────

function mapArtists(
  artists: Array<{ id: number | string; name: string; description?: string }>,
  images?: Record<number | string, string>,
): SiteArtist[] {
  return artists.map((a) => ({
    id: a.id,
    name: a.name,
    description: a.description,
    imageUrl: images?.[a.id] ?? null,
  }));
}

const ARTISTS_REGISTRY: Record<string, () => SiteArtist[]> = {
  gbv: () =>
    gbvMembers.map((m) => ({
      id: m.id ?? 0,
      name: m.name,
      active: m.active,
      imageUrl: null,
    })),
  amrep: () => mapArtists(amrepArtists, AMREP_ARTIST_IMAGES),
  rev: () =>
    revArtists.map((a) => ({
      id: a.id,
      name: a.name,
      imageUrl: null,
    })),
  sg: () =>
    sgArtists.map((a) => ({
      id: a.id,
      name: a.name,
      imageUrl: null,
    })),
  e6: () =>
    e6Artists.map((a) => ({
      id: a.id,
      name: a.name,
      imageUrl: null,
    })),
  "touch-go-records": () => mapArtists(touchgorecordsArtists, TOUCH_GO_RECORDS_ARTIST_IMAGES),
  "slap-a-ham-records": () => mapArtists(slapahamrecordsArtists, SLAP_A_HAM_RECORDS_ARTIST_IMAGES),
  "slap-a-ham-numbers": () => mapArtists(slapahamnumbersArtists, SLAP_A_HAM_NUMBERS_ARTIST_IMAGES),
  "test-github-commit": () => mapArtists(testgithubcommitArtists, TEST_GITHUB_COMMIT_ARTIST_IMAGES),
  // ── new-site-artists-entry ──
};

// ── Release registry ────────────────────────────────────────────────

const RELEASES_REGISTRY: Record<string, () => SiteRelease[]> = {
  gbv: () =>
    gbvAlbums.map((a) => ({
      id: a.id,
      title: a.title,
      year: a.year,
      releaseType: a.releaseType,
    })),
  amrep: () =>
    amrepReleases.map((r) => ({
      id: r.id,
      title: r.artist ? `${r.artist} — ${r.title}` : r.title,
      artist: r.artist,
      year: r.year,
      format: r.format,
      catalogNo: r.catalogNo,
    })),
  "touch-go-records": () =>
    touchgorecordsReleases.map((r) => ({
      id: r.id,
      title: r.artist ? `${r.artist} — ${r.title}` : r.title,
      artist: r.artist,
      year: r.year,
      format: r.format,
      catalogNo: r.catalogNo,
    })),
  "slap-a-ham-records": () =>
    slapahamrecordsReleases.map((r) => ({
      id: r.id,
      title: r.artist ? `${r.artist} — ${r.title}` : r.title,
      artist: r.artist,
      year: r.year,
      format: r.format,
      catalogNo: r.catalogNo,
    })),
  "slap-a-ham-numbers": () =>
    slapahamnumbersReleases.map((r) => ({
      id: r.id,
      title: r.artist ? `${r.artist} — ${r.title}` : r.title,
      artist: r.artist,
      year: r.year,
      format: r.format,
      catalogNo: r.catalogNo,
    })),
  "test-github-commit": () =>
    testgithubcommitReleases.map((r) => ({
      id: r.id,
      title: r.artist ? `${r.artist} — ${r.title}` : r.title,
      artist: r.artist,
      year: r.year,
      format: r.format,
      catalogNo: r.catalogNo,
    })),
  // ── new-site-releases-entry ──
};

// ── Timeline registry ───────────────────────────────────────────────

const GBV_TIMELINE: SiteTimelineEvent[] = [
  { year: 1983, event: "Band formed in Dayton, Ohio by Robert Pollard" },
  { year: 1986, event: "First release: Forever Since Breakfast EP" },
  { year: 1987, event: "Devil Between My Toes released" },
  { year: 1992, event: "Propeller released - first critical recognition" },
  { year: 1993, event: "Vampire on Titus released" },
  { year: 1994, event: "Bee Thousand released - breakthrough album" },
  { year: 1995, event: "Alien Lanes released - Matador Records debut" },
  { year: 1996, event: "Under the Bushes Under the Stars released on Matador Records" },
  { year: 1997, event: "Mag Earwhig! released - lineup changes" },
  { year: 1999, event: "Do the Collapse - TVT Records, major label debut" },
  { year: 2001, event: "Isolation Drills released" },
  { year: 2002, event: "Universal Truths and Cycles released" },
  { year: 2004, event: "Half Smiles of the Decomposed - final album before breakup" },
  { year: 2004, event: "Band breaks up after New Year's Eve show" },
  { year: 2010, event: "Classic lineup reunites" },
  { year: 2012, event: "Let's Go Eat the Factory - first reunion album" },
  { year: 2017, event: "August by Cake released" },
  { year: 2019, event: "Zeppelin Over China - double album" },
  { year: 2022, event: "Tremblers and Goggles by Rank released" },
  { year: 2024, event: "Band continues prolific output" },
];

function mapTimeline(
  items: Array<{ year: number; title?: string; description?: string; event?: string }>,
): SiteTimelineEvent[] {
  return items.map((item) => ({
    year: item.year,
    title: item.title,
    description: item.description,
    event: item.event ?? (item.title && item.description ? `${item.title} — ${item.description}` : item.title || item.description),
  }));
}

const TIMELINE_REGISTRY: Record<string, () => SiteTimelineEvent[]> = {
  gbv: () => GBV_TIMELINE,
  amrep: () => mapTimeline(amrepTimeline),
  rev: () => mapTimeline(revTimeline),
  sg: () => mapTimeline(sgTimeline),
  e6: () => mapTimeline(e6Timeline),
  "touch-go-records": () => mapTimeline(touchgorecordsTimeline),
  "slap-a-ham-records": () => mapTimeline(slapahamrecordsTimeline),
  "slap-a-ham-numbers": () => mapTimeline(slapahamnumbersTimeline),
  "test-github-commit": () => mapTimeline(testgithubcommitTimeline),
  // ── new-site-timeline-entry ──
};

// ── Side-projects / related-labels registry ─────────────────────────

const SIDE_PROJECTS_REGISTRY: Record<string, () => SiteSideProject[]> = {
  gbv: () => pollardSideProjects as SiteSideProject[],
  amrep: () => amrepImprints as SiteSideProject[],
  rev: () => revSubLabels as SiteSideProject[],
  sg: () => sgSubLabels as SiteSideProject[],
  e6: () => e6SubLabels as SiteSideProject[],
  // ── new-site-sideprojects-entry ──
};

// ── Album image registry ────────────────────────────────────────────

const ALBUM_IMAGE_REGISTRY: Record<string, (id: number) => string | null> = {
  gbv: getGbvAlbumImage,
  amrep: getAmrepAlbumImage,
  e6: getE6AlbumImage,
  "touch-go-records": getTouchGoAlbumImage,
  "slap-a-ham-records": getSlapAHamRecordsAlbumImage,
  "slap-a-ham-numbers": getSlapAHamNumbersAlbumImage,
  "test-github-commit": getTestGithubCommitAlbumImage,
  // ── new-site-albumimages-entry ──
};

// ── Lookup functions ────────────────────────────────────────────────

export function getSiteArtists(siteId: string): SiteArtist[] {
  return ARTISTS_REGISTRY[siteId]?.() ?? [];
}

export function getSiteReleases(siteId: string): SiteRelease[] {
  return RELEASES_REGISTRY[siteId]?.() ?? [];
}

export function getSiteTimeline(siteId: string): SiteTimelineEvent[] {
  return TIMELINE_REGISTRY[siteId]?.() ?? [];
}

export function getSiteSideProjects(siteId: string): SiteSideProject[] {
  return SIDE_PROJECTS_REGISTRY[siteId]?.() ?? [];
}

export function getSiteAlbumImageFn(siteId: string): ((id: number) => string | null) | null {
  return ALBUM_IMAGE_REGISTRY[siteId] ?? null;
}
