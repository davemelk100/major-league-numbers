"use client";

import { useEffect, useState, useMemo } from "react";
import { usePathname } from "next/navigation";
import { Loader2 } from "lucide-react";
import { SgRemoteImage } from "@/components/sg/sg-remote-image";
import { getSgReleaseByCatalogNumber, getSgReleaseImageUrl } from "@/lib/sg-discography-data";
import { getMusicSiteFromPathname } from "@/lib/music-site";
import { AlbumDetailLayout } from "@/components/music-site/album-detail-layout";
import { AlbumDetailLeft } from "@/components/music-site/album-detail-left";
import { AlbumDetailTracklist } from "@/components/music-site/album-detail-tracklist";

type Track = { position: string; title: string; duration: string };

export function SgAlbumDetailContent({ albumId }: { albumId: string }) {
  const pathname = usePathname();
  const site = getMusicSiteFromPathname(pathname);

  const release = useMemo(
    () => getSgReleaseByCatalogNumber(Number(albumId)),
    [albumId],
  );

  const imageUrl = release ? getSgReleaseImageUrl(release.catalogNumber) ?? null : null;

  const [tracklist, setTracklist] = useState<Track[] | null>(null);
  const [isTracklistLoading, setIsTracklistLoading] = useState(false);

  useEffect(() => {
    if (!release) return;
    let isActive = true;

    async function fetchDiscogsData() {
      setIsTracklistLoading(true);
      try {
        const params = new URLSearchParams({
          type: "resolve",
          artist: release!.artist,
          title: release!.title,
        });
        const res = await fetch(`/api/sg/discogs?${params}`);
        if (res.ok) {
          const data = await res.json();
          if (isActive && data.release?.tracklist) {
            setTracklist(data.release.tracklist);
          }
        }
      } catch {
        // data unavailable
      } finally {
        if (isActive) setIsTracklistLoading(false);
      }
    }

    fetchDiscogsData();
    return () => {
      isActive = false;
    };
  }, [release?.artist, release?.title]);

  if (!release) {
    return (
      <AlbumDetailLayout
        site={site}
        backHref={`${site.basePath}/${site.albumsSlug}`}
        backLabel={site.navLabels.discography}
        leftContent={
          <div className="w-full aspect-square rounded-lg bg-muted flex items-center justify-center mb-4 p-4">
            <span className="text-sm text-muted-foreground font-medium">Release not found</span>
          </div>
        }
        rightTitle="Tracklist"
        rightContent={
          <p className="text-sm text-muted-foreground">Release not found</p>
        }
      />
    );
  }

  const displayTitle = `${release.artist} — ${release.title}`;

  const leftContent = (
    <AlbumDetailLeft
      image={
        imageUrl ? (
          <SgRemoteImage
            src={imageUrl}
            alt={release.title}
            width={300}
            height={300}
            className="w-full aspect-square rounded-lg object-contain"
            cacheKey={`sg-album-thumb:${release.catalogNumber}`}
          />
        ) : (
          <div className="w-full aspect-square rounded-lg bg-muted flex items-center justify-center mb-4 p-4">
            <span className="text-sm text-muted-foreground font-medium text-center leading-tight">{displayTitle}</span>
          </div>
        )
      }
      title={displayTitle}
      badges={[
        { label: String(release.year), variant: "outline" as const },
        {
          label: release.format || "Release",
          variant: "outline" as const,
        },
      ]}
      meta={[
        { label: "Catalog #", value: `GR ${String(release.catalogNumber).padStart(3, "0")}` },
        { label: "Artist", value: release.artist },
      ]}
    />
  );

  const rightContent = isTracklistLoading ? (
    <div className="flex items-center gap-2 text-sm text-muted-foreground">
      <Loader2 className="h-4 w-4 animate-spin" />
      <span>Loading tracklist...</span>
    </div>
  ) : (
    <AlbumDetailTracklist
      tracks={tracklist ?? undefined}
      variant="amrep"
      emptyLabel="Tracklist not available."
    />
  );

  return (
    <AlbumDetailLayout
      site={site}
      backHref={`${site.basePath}/${site.albumsSlug}`}
      backLabel={site.navLabels.discography}
      leftContent={leftContent}
      rightTitle="Tracklist"
      rightContent={rightContent}
    />
  );
}
