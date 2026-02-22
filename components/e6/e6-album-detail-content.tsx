"use client";

import { useEffect, useState } from "react";
import { usePathname } from "next/navigation";
import { Loader2 } from "lucide-react";
import { getMusicSiteFromPathname, E6_SITE } from "@/lib/music-site";
import { getE6ReleaseByCatalogNumber } from "@/lib/e6-discography-data";
import { getLocalAlbumImage } from "@/lib/e6-release-images";
import { SiteRemoteImage } from "@/components/music-site/site-remote-image";
import { AlbumDetailLayout } from "@/components/music-site/album-detail-layout";
import { AlbumDetailLeft } from "@/components/music-site/album-detail-left";
import { AlbumDetailTracklist } from "@/components/music-site/album-detail-tracklist";
import { SitePlaceholderIcon } from "@/components/music-site/site-placeholder-icon";

type Track = { position: string; title: string; duration: string };

export function E6AlbumDetailContent({ albumId }: { albumId: string }) {
  const pathname = usePathname();
  const site = getMusicSiteFromPathname(pathname);
  const release = getE6ReleaseByCatalogNumber(parseInt(albumId, 10));
  const localImage = release ? getLocalAlbumImage(release.catalogNumber) : null;

  const [tracklist, setTracklist] = useState<Track[] | null>(null);
  const [coverImage, setCoverImage] = useState<string | undefined>(undefined);
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
        const res = await fetch(`/api/e6/discogs?${params}`);
        if (res.ok) {
          const data = await res.json();
          if (isActive) {
            if (data.release?.tracklist) {
              setTracklist(data.release.tracklist);
            }
            if (data.release?.coverImage) {
              setCoverImage(data.release.coverImage);
            }
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
            No release found for catalog number {albumId}.
          </p>
        }
      />
    );
  }

  const resolvedImage = localImage || coverImage;

  const leftContent = (
    <AlbumDetailLeft
      image={
        resolvedImage ? (
          <SiteRemoteImage
            site={E6_SITE}
            src={resolvedImage}
            alt={`${release.artist} - ${release.title}`}
            width={300}
            height={300}
            className="w-full aspect-square rounded-lg object-contain"
            cacheKey={`e6-album-thumb:${release.catalogNumber}`}
            preferProxy={false}
          />
        ) : (
          <SitePlaceholderIcon site={site} className="mb-4" />
        )
      }
      title={`${release.artist} — ${release.title}`}
      badges={[
        { label: String(release.year), variant: "outline" as const },
        { label: `E6: ${release.catalogNumber}`, variant: "outline" as const },
      ]}
      meta={[
        { label: "Artist", value: release.artist },
        { label: "Label", value: "Elephant 6 Recording Co." },
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
