"use client";

import { useEffect, useState } from "react";
import { usePathname } from "next/navigation";
import { Loader2 } from "lucide-react";
import { getMusicSiteFromPathname } from "@/lib/music-site";
import { getRevReleaseByCatalogNumber } from "@/lib/rev-discography-data";
import { RevRemoteImage } from "@/components/rev/rev-remote-image";
import { AlbumDetailLayout } from "@/components/music-site/album-detail-layout";
import { AlbumDetailLeft } from "@/components/music-site/album-detail-left";
import { AlbumDetailTracklist } from "@/components/music-site/album-detail-tracklist";
import { SitePlaceholderIcon } from "@/components/music-site/site-placeholder-icon";

type Track = { position: string; title: string; duration: string };

export function RevAlbumDetailContent({ albumId }: { albumId: string }) {
  const pathname = usePathname();
  const site = getMusicSiteFromPathname(pathname);
  const release = getRevReleaseByCatalogNumber(parseInt(albumId, 10));

  const [tracklist, setTracklist] = useState<Track[] | null>(null);
  const [coverImage, setCoverImage] = useState<string | null>(null);
  const [isTracklistLoading, setIsTracklistLoading] = useState(false);

  useEffect(() => {
    if (!release) return;
    let isActive = true;

    async function fetchReleaseData() {
      setIsTracklistLoading(true);
      try {
        const params = new URLSearchParams({
          type: "resolve",
          artist: release!.artist,
          title: release!.title,
        });
        const res = await fetch(`/api/rev/discogs?${params}`);
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

    fetchReleaseData();
    return () => {
      isActive = false;
    };
  }, [release?.artist, release?.title]);

  if (!release) {
    return (
      <AlbumDetailLayout
        site={site}
        backHref={`${site.basePath}/albums`}
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

  const leftContent = (
    <AlbumDetailLeft
      image={
        coverImage ? (
          <RevRemoteImage
            src={coverImage}
            alt={`${release.artist} - ${release.title}`}
            width={300}
            height={300}
            className="w-full aspect-square rounded-lg object-contain"
          />
        ) : isTracklistLoading ? (
          <div className="w-full aspect-square bg-muted rounded-lg flex items-center justify-center">
            <Loader2 className="h-6 w-6 animate-spin text-muted-foreground" />
          </div>
        ) : (
          <SitePlaceholderIcon site={site} className="mb-4" />
        )
      }
      title={`${release.artist} — ${release.title}`}
      badges={[
        { label: String(release.year), variant: "outline" as const },
        { label: `REV: ${release.catalogNumber}`, variant: "outline" as const },
      ]}
      meta={[
        { label: "Artist", value: release.artist },
        { label: "Label", value: "Revelation Records" },
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
      backHref={`${site.basePath}/albums`}
      backLabel={site.navLabels.discography}
      leftContent={leftContent}
      rightTitle="Tracklist"
      rightContent={rightContent}
    />
  );
}
