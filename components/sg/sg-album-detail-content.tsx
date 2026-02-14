"use client";

import { useMemo } from "react";
import { SgRemoteImage } from "@/components/sg/sg-remote-image";
import { getSgReleaseByCatalogNumber, sgReleaseImages } from "@/lib/sg-discography-data";
import { usePathname } from "next/navigation";
import { getMusicSiteFromPathname } from "@/lib/music-site";
import { AlbumDetailLayout } from "@/components/music-site/album-detail-layout";
import { AlbumDetailLeft } from "@/components/music-site/album-detail-left";
import { SitePlaceholderIcon } from "@/components/music-site/site-placeholder-icon";

export function SgAlbumDetailContent({ albumId }: { albumId: string }) {
  const pathname = usePathname();
  const site = getMusicSiteFromPathname(pathname);

  const release = useMemo(
    () => getSgReleaseByCatalogNumber(Number(albumId)),
    [albumId],
  );

  const imageUrl = release ? sgReleaseImages[release.catalogNumber] ?? null : null;

  if (!release) {
    return (
      <AlbumDetailLayout
        site={site}
        backHref={`${site.basePath}/albums`}
        backLabel={site.navLabels.discography}
        leftContent={
          <SitePlaceholderIcon site={site} className="mb-4" />
        }
        rightTitle="Details"
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
          <SitePlaceholderIcon site={site} className="mb-4" />
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

  const rightContent = (
    <div className="space-y-3">
      <div className="border-b border-border pb-2">
        <p className="font-semibold text-sm">{release.title}</p>
        <p className="text-xs text-muted-foreground">
          {release.artist} · {release.year}
          {release.format ? ` · ${release.format}` : ""}
        </p>
      </div>
      <p className="text-sm text-muted-foreground">
        Catalog number GR {String(release.catalogNumber).padStart(3, "0")} on Skin Graft Records.
      </p>
    </div>
  );

  return (
    <AlbumDetailLayout
      site={site}
      backHref={`${site.basePath}/albums`}
      backLabel={site.navLabels.discography}
      leftContent={leftContent}
      rightTitle="Details"
      rightContent={rightContent}
    />
  );
}
