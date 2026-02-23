"use client";

import { useEffect, useState } from "react";
import { usePathname } from "next/navigation";
import { Loader2 } from "lucide-react";
import { getMusicSiteFromPathname, TOUCH_GO_RECORDS_SITE } from "@/lib/music-site";
import { getTouchGoRecordsReleaseById } from "@/lib/touch-go-records-releases-data";
import { getLocalAlbumImage } from "@/lib/touch-go-records-release-images";
import { SiteRemoteImage } from "@/components/music-site/site-remote-image";
import { AlbumDetailLayout } from "@/components/music-site/album-detail-layout";
import { AlbumDetailLeft } from "@/components/music-site/album-detail-left";
import { AlbumDetailTracklist } from "@/components/music-site/album-detail-tracklist";
import { SitePlaceholderIcon } from "@/components/music-site/site-placeholder-icon";

type Track = { position: string; title: string; duration: string };

export function TouchGoRecordsAlbumDetailContent({ albumId }: { albumId: string }) {
  const pathname = usePathname();
  const site = getMusicSiteFromPathname(pathname);
  const release = getTouchGoRecordsReleaseById(Number(albumId));
  const localImage = release ? getLocalAlbumImage(release.id) : null;

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
        const res = await fetch(`/api/touch-go-records/discogs?${params}`);
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
          <div className="w-full aspect-square bg-muted rounded-lg mb-4 flex items-center justify-center">
            <p className="text-muted-foreground text-sm">Release not found</p>
          </div>
        }
        rightTitle="Tracklist"
        rightContent={
          <p className="text-sm text-muted-foreground">
            No release found for ID {albumId}.
          </p>
        }
      />
    );
  }

  const leftContent = (
    <AlbumDetailLeft
      image={
        localImage ? (
          <SiteRemoteImage
            site={TOUCH_GO_RECORDS_SITE}
            src={localImage}
            alt={`${release.artist} - ${release.title}`}
            width={300}
            height={300}
            className="w-full aspect-square rounded-lg object-contain"
            cacheKey={`touch-go-records-album-thumb:${release.id}`}
            preferProxy={false}
          />
        ) : (
          <SitePlaceholderIcon site={site} className="mb-4" />
        )
      }
      title={`${release.artist} — ${release.title}`}
      badges={[
        ...(release.year ? [{ label: String(release.year), variant: "outline" as const }] : []),
        ...(release.format ? [{ label: release.format, variant: "outline" as const }] : []),
      ]}
      meta={[
        { label: "Artist", value: release.artist },
        ...(release.catalogNo ? [{ label: "Catalog", value: release.catalogNo }] : []),
      ]}
    />
  );

  const rightContent = isTracklistLoading ? (
    <div className="flex items-center gap-2 text-sm text-muted-foreground">
      <Loader2 className="h-4 w-4 animate-spin" />
      <span>Loading tracklist...</span>
    </div>
  ) : (
    <div className="space-y-4">
      {release.highlight && (
        <p className="text-sm text-muted-foreground">{release.highlight}</p>
      )}
      <AlbumDetailTracklist
        tracks={tracklist ?? undefined}
        variant="amrep"
        emptyLabel="Tracklist not available."
      />
    </div>
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
