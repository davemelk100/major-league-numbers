"use client";

import { useCallback, useEffect, useState } from "react";
import { usePathname } from "next/navigation";
import { getMusicSiteFromPathname } from "@/lib/music-site";
import {
  getSiteArtists,
  getSiteReleases,
  getSiteAlbumImageFn,
  type SiteArtist,
  type SiteRelease,
} from "@/lib/site-data-registry";

export type DashboardMember = {
  id?: number | string;
  name: string;
  active: boolean;
  imageUrl?: string | null;
};

export type DashboardAlbum = {
  id?: number | string;
  title: string;
  year?: number;
  thumb?: string;
  format?: string | string[];
  releaseType?: string;
  mainRelease?: number;
};

type ArtistData = {
  id: number;
  name: string;
  profile: string;
  members?: DashboardMember[];
};

const GBV_ARTIST_ID = 83529;

const dedupeReleases = (items: DashboardAlbum[]) => {
  const seen = new Set<string>();
  return items.filter((item) => {
    const titleKey = `${item.title || ""}::${item.year || ""}`.toLowerCase();
    const key = item.mainRelease
      ? `main:${item.mainRelease}`
      : `title:${titleKey}`;
    if (seen.has(key)) return false;
    seen.add(key);
    return true;
  });
};

function registryArtistsToMembers(artists: SiteArtist[]): DashboardMember[] {
  return artists.map((a) => ({
    id: a.id,
    name: a.name,
    active: a.active ?? true,
    imageUrl: a.imageUrl,
  }));
}

function registryReleasesToAlbums(releases: SiteRelease[]): DashboardAlbum[] {
  return releases.map((r) => ({
    id: r.id,
    title: r.title,
    year: r.year ?? undefined,
    format: r.format ?? undefined,
    releaseType: r.releaseType,
  }));
}

export function useDashboardData() {
  const pathname = usePathname();
  const site = getMusicSiteFromPathname(pathname);
  const isGbv = site.id === "gbv";
  const isAmrep = site.id === "amrep";
  const [artist, setArtist] = useState<ArtistData | null>(null);
  const [albums, setAlbums] = useState<DashboardAlbum[]>([]);
  const [isLoading, setIsLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    // For GBV, try live Discogs API first (preserves existing behavior)
    if (isGbv) {
      const cacheKey = "gbv-dashboard-artist";
      const cacheTtlMs = 24 * 60 * 60 * 1000;
      let hasCached = false;

      try {
        const cached = localStorage.getItem(cacheKey);
        if (cached) {
          const parsed = JSON.parse(cached) as {
            timestamp: number;
            data: ArtistData;
          };
          if (parsed?.data && Date.now() - parsed.timestamp < cacheTtlMs) {
            setArtist(parsed.data);
            setIsLoading(false);
            hasCached = true;
          }
        }
      } catch {
        // ignore cache errors
      }

      async function fetchGbvData() {
        try {
          const artistRes = await fetch(
            "/api/gbv/discogs?type=artist&include_member_images=true&member_image_limit=20",
          );
          if (!artistRes.ok) {
            if (!hasCached) {
              const fallbackMembers = registryArtistsToMembers(getSiteArtists("gbv"));
              setArtist({
                id: GBV_ARTIST_ID,
                name: "Guided by Voices",
                profile: "American indie rock band formed in Dayton, Ohio in 1983.",
                members: fallbackMembers,
              });
            }
            return;
          }
          const artistData = await artistRes.json();
          if (Array.isArray(artistData?.members) && artistData.members.length <= 1) {
            const fallbackRes = await fetch("/api/gbv/discogs?type=artist");
            if (fallbackRes.ok) {
              const fallbackData = await fallbackRes.json();
              if (Array.isArray(fallbackData?.members)) {
                artistData.members = fallbackData.members;
              }
            }
          }
          setArtist(artistData);
          try {
            localStorage.setItem(cacheKey, JSON.stringify({ timestamp: Date.now(), data: artistData }));
          } catch { /* ignore */ }
        } catch (err) {
          if (!hasCached) {
            const fallbackMembers = registryArtistsToMembers(getSiteArtists("gbv"));
            setArtist({
              id: GBV_ARTIST_ID,
              name: "Guided by Voices",
              profile: "American indie rock band formed in Dayton, Ohio in 1983.",
              members: fallbackMembers,
            });
          }
          console.error(err);
        } finally {
          if (!hasCached) setIsLoading(false);
        }
      }

      fetchGbvData();
      return;
    }

    // For all other sites, use local registry data
    const siteArtists = getSiteArtists(site.id);
    setArtist({
      id: 0,
      name: site.name,
      profile: site.description || "",
      members: registryArtistsToMembers(siteArtists),
    });
    setIsLoading(false);
  }, [isGbv, site.id, site.name, site.description]);

  useEffect(() => {
    if (isGbv) {
      // GBV: try live API, fall back to registry
      const fallbackAlbums = registryReleasesToAlbums(getSiteReleases("gbv"));
      setAlbums(dedupeReleases(fallbackAlbums));

      const cacheKey = "gbv-albums-cache";
      const cacheTtlMs = 24 * 60 * 60 * 1000;
      try {
        const cached = localStorage.getItem(cacheKey);
        if (cached) {
          const parsed = JSON.parse(cached) as { timestamp: number; albums: DashboardAlbum[] };
          if (parsed?.albums?.length && Date.now() - parsed.timestamp < cacheTtlMs) {
            setAlbums(parsed.albums);
          }
        }
      } catch { /* ignore */ }

      async function fetchAlbums() {
        try {
          const res = await fetch("/api/gbv/discogs?type=albums");
          if (!res.ok) throw new Error("Failed to fetch albums");
          const data = await res.json();
          const nextAlbums = data.albums || [];
          if (nextAlbums.length > 0) {
            setAlbums(nextAlbums);
            try {
              localStorage.setItem(cacheKey, JSON.stringify({ timestamp: Date.now(), albums: nextAlbums }));
            } catch { /* ignore */ }
          }
        } catch (err) {
          console.error(err);
        }
      }

      fetchAlbums();
      return;
    }

    // All other sites: use local registry data
    const siteReleases = getSiteReleases(site.id);
    setAlbums(dedupeReleases(registryReleasesToAlbums(siteReleases)));
  }, [isGbv, site.id]);

  const activeMembers =
    artist?.members?.filter((member) => member.active) || [];
  const fallbackMembers: DashboardMember[] = registryArtistsToMembers(getSiteArtists(site.id));
  const memberLimit = 5;

  const membersToShow = (() => {
    const source = activeMembers.length > 0 ? activeMembers : fallbackMembers;
    if (!isGbv && source.length > memberLimit) {
      const daysSinceEpoch = Math.floor(Date.now() / (1000 * 60 * 60 * 24));
      const offset = (daysSinceEpoch * memberLimit) % source.length;
      const cycled = [];
      for (let i = 0; i < memberLimit; i++) {
        cycled.push(source[(offset + i) % source.length]);
      }
      return cycled;
    }
    return source.slice(0, memberLimit);
  })();

  const fallbackAlbums: DashboardAlbum[] = registryReleasesToAlbums(getSiteReleases(site.id)).slice(0, 6);
  const albumsToShow = albums.length > 0 ? albums.slice(0, 6) : fallbackAlbums;

  const getAlbumImage = useCallback(
    (album: DashboardAlbum): string | null => {
      if (album.id) {
        const fn = getSiteAlbumImageFn(site.id);
        if (fn) return fn(Number(album.id));
      }
      return album.thumb || null;
    },
    [site.id],
  );

  return {
    site,
    isAmrep,
    isLoading,
    error,
    membersToShow,
    albumsToShow,
    getAlbumImage,
  };
}
