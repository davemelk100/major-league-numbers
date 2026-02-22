"use client";

import { useState, useMemo } from "react";
import { getAllE6Releases, getE6ReleaseYears } from "@/lib/e6-discography-data";
import { getLocalAlbumImage } from "@/lib/e6-release-images";
import { usePathname } from "next/navigation";
import { getMusicSiteFromPathname } from "@/lib/music-site";
import { SiteRemoteImage } from "@/components/music-site/site-remote-image";
import { AlbumGrid, type AlbumGridItem } from "@/components/music-site/album-grid";

type E6AlbumGridItem = AlbumGridItem & {
  artist: string;
  catalogNumber: number;
};

export function E6AlbumsContent() {
  const pathname = usePathname();
  const site = getMusicSiteFromPathname(pathname);
  const releases = getAllE6Releases();
  const years = getE6ReleaseYears();
  const [selectedYear, setSelectedYear] = useState<number | null>(null);

  const albums: E6AlbumGridItem[] = useMemo(
    () =>
      releases.map((r) => ({
        id: r.catalogNumber,
        title: r.title,
        year: r.year,
        artist: r.artist,
        catalogNumber: r.catalogNumber,
      })),
    [releases]
  );

  const filteredAlbums = useMemo(
    () => albums.filter((a) => selectedYear === null || a.year === selectedYear),
    [albums, selectedYear]
  );

  const getAlbumImage = (album: E6AlbumGridItem): string | null => {
    return getLocalAlbumImage(album.catalogNumber);
  };

  return (
    <div className="container py-6">
      <div className="flex flex-col sm:flex-row sm:items-center gap-4 mb-6">
        <h1 className="font-league shrink-0">Releases</h1>
        <select
          value={selectedYear ?? ""}
          onChange={(e) => setSelectedYear(e.target.value ? Number(e.target.value) : null)}
          className="h-10 px-3 rounded-md border border-input bg-background text-sm shrink-0"
        >
          <option value="">All Years</option>
          {years.map((year) => (
            <option key={year} value={year}>
              {year}
            </option>
          ))}
        </select>
      </div>

      <p className="text-sm text-muted-foreground mb-4">
        Showing {filteredAlbums.length} of {albums.length} releases
      </p>

      <AlbumGrid
        albums={filteredAlbums}
        site={site}
        getAlbumImage={getAlbumImage}
        getReleaseTypeLabel={() => "Album"}
        RemoteImage={SiteRemoteImage}
        linkBasePath={`${site.basePath}/${site.albumsSlug}`}
        cacheKeyPrefix="e6-album-thumb"
        imageFit="contain"
        preferProxy={false}
      />
    </div>
  );
}
