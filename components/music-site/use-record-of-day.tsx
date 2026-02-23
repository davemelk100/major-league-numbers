"use client";

import { useEffect, useState } from "react";
import { usePathname } from "next/navigation";
import { pickDailyGbvRecord, getDailyGbvSingle, type GbvRecordOfDay } from "@/lib/gbv-records-data";
import { getLocalAlbumImage } from "@/lib/gbv-release-images";
import { getMusicSiteFromPathname } from "@/lib/music-site";
import {
  getSiteDailyRecord,
  getSiteAlbumImage,
  type RecordOfDay,
} from "@/lib/site-daily-registry";

export function useRecordOfDay() {
  const pathname = usePathname();
  const site = getMusicSiteFromPathname(pathname);
  const [record, setRecord] = useState<RecordOfDay | null>(null);
  const [coverUrl, setCoverUrl] = useState<string | null>(null);
  const [albumId, setAlbumId] = useState<number | null>(null);

  useEffect(() => {
    // GBV has special API-enhancement logic — keep it separate
    if (site.id === "gbv") {
      const gbvDaily = getSiteDailyRecord("gbv")!;
      setRecord(gbvDaily);
      if (gbvDaily.id) {
        setAlbumId(gbvDaily.id);
        const localImage = getLocalAlbumImage(gbvDaily.id);
        if (localImage) {
          setCoverUrl(localImage);
        }
      }

      const albumsCacheKey = "gbv-albums-cache";

      async function enhanceWithApiData() {
        let albums: Array<{ id?: number; title?: string; year?: number; thumb?: string }> = [];

        try {
          const cached = localStorage.getItem(albumsCacheKey);
          if (cached) {
            const parsed = JSON.parse(cached) as { albums?: typeof albums };
            if (parsed?.albums?.length) {
              albums = parsed.albums;
            }
          }
        } catch {
          // ignore cache errors
        }

        if (albums.length === 0) {
          try {
            const res = await fetch("/api/gbv/discogs?type=albums");
            if (res.ok) {
              const data = await res.json();
              albums = Array.isArray(data.albums) ? data.albums : [];
              try {
                localStorage.setItem(albumsCacheKey, JSON.stringify({ albums }));
              } catch {
                // ignore cache errors
              }
            }
          } catch {
            // ignore fetch errors
          }
        }

        // Enhance with API data if available (may have thumb URLs)
        const daily = pickDailyGbvRecord(albums);
        if (daily) {
          setRecord(daily);
          if (daily.id) {
            setAlbumId(daily.id);
          }
          const localImage = getLocalAlbumImage(daily.id);
          const normalizeImageUrl = (url: string | null | undefined) =>
            url ? url.replace(/^http:/, "https:") : null;
          const resolvedUrl = localImage || normalizeImageUrl(daily.thumb);
          if (resolvedUrl) {
            setCoverUrl(resolvedUrl);
          }
        }
      }

      enhanceWithApiData();
      return;
    }

    // All other sites: use the registry
    const daily = getSiteDailyRecord(site.id);
    if (!daily) return;
    setRecord(daily);

    const recordId = daily.id ?? ("catalogNumber" in daily ? (daily as any).catalogNumber : undefined);
    if (recordId != null) {
      setAlbumId(recordId);
      const localImage = getSiteAlbumImage(site.id, recordId);
      if (localImage) {
        setCoverUrl(localImage);
      } else if (daily.coverUrl) {
        setCoverUrl(daily.coverUrl);
      }
    } else if (daily.coverUrl) {
      setCoverUrl(daily.coverUrl);
    }

    // For sites with a Discogs API route, try fetching cover art if we don't have one yet
    if (!daily.coverUrl && !getSiteAlbumImage(site.id, recordId ?? 0) && daily.artist && daily.title) {
      const artistName = daily.artist;
      const releaseTitle = daily.title;
      async function fetchCoverFromDiscogs() {
        try {
          const params = new URLSearchParams({
            type: "resolve",
            artist: artistName,
            title: releaseTitle,
          });
          const res = await fetch(`/api/${site.id}/discogs?${params}`);
          if (!res.ok) return;
          const data = await res.json();
          if (data.release?.coverImage) {
            setCoverUrl(data.release.coverImage);
          }
        } catch {
          // ignore cover lookup errors
        }
      }
      fetchCoverFromDiscogs();
    }
  }, [site.id]);

  const albumHref = albumId ? `${site.basePath}/${site.albumsSlug}/${albumId}` : null;
  const displayTitle =
    record && "artist" in record && record.artist
      ? `${record.artist} — ${record.title}`
      : record?.title;

  return {
    site,
    record,
    coverUrl,
    albumHref,
    displayTitle,
  };
}

export function useSingleOfDay() {
  const pathname = usePathname();
  const site = getMusicSiteFromPathname(pathname);
  const [record, setRecord] = useState<GbvRecordOfDay | null>(null);
  const [coverUrl, setCoverUrl] = useState<string | null>(null);

  useEffect(() => {
    const single = getDailyGbvSingle();
    setRecord(single);
    if (single.id) {
      const localImage = getLocalAlbumImage(single.id);
      if (localImage) {
        setCoverUrl(localImage);
      }
    }
  }, []);

  const albumHref = record?.id ? `${site.basePath}/${site.albumsSlug}/${record.id}` : null;
  const displayTitle = record?.title ?? null;

  return { site, record, coverUrl, albumHref, displayTitle };
}
