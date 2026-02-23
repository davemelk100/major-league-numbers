"use client";

import { usePathname } from "next/navigation";
import { getMusicSiteFromPathname, TOUCH_GO_RECORDS_SITE } from "@/lib/music-site";
import { getTouchGoRecordsReleaseById } from "@/lib/touch-go-records-releases-data";
import { getLocalAlbumImage } from "@/lib/touch-go-records-release-images";
import { SiteRemoteImage } from "@/components/music-site/site-remote-image";
import { AlbumDetailLayout } from "@/components/music-site/album-detail-layout";
import { AlbumDetailLeft } from "@/components/music-site/album-detail-left";
import { SitePlaceholderIcon } from "@/components/music-site/site-placeholder-icon";

export function TouchGoRecordsAlbumDetailContent({ albumId }: { albumId: string }) {
  const pathname = usePathname();
  const site = getMusicSiteFromPathname(pathname);
  const release = getTouchGoRecordsReleaseById(Number(albumId));
  const localImage = release ? getLocalAlbumImage(release.id) : null;

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
        rightTitle="Details"
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

  const rightContent = (
    <div className="text-sm text-muted-foreground">
      {release.highlight ? (
        <p>{release.highlight}</p>
      ) : (
        <p>No additional details available.</p>
      )}
    </div>
  );

  return (
    <AlbumDetailLayout
      site={site}
      backHref={`${site.basePath}/${site.albumsSlug}`}
      backLabel={site.navLabels.discography}
      leftContent={leftContent}
      rightTitle="Details"
      rightContent={rightContent}
    />
  );
}
