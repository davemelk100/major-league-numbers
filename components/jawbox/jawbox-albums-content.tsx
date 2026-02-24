"use client";

import { useState, useMemo } from "react";
import { jawboxReleases } from "@/lib/jawbox-releases-data";
import { getLocalAlbumImage } from "@/lib/jawbox-release-images";
import { usePathname } from "next/navigation";
import { getMusicSiteFromPathname } from "@/lib/music-site";
import { SiteRemoteImage } from "@/components/music-site/site-remote-image";
import { AlbumGrid, type AlbumGridItem } from "@/components/music-site/album-grid";

type JawboxAlbumGridItem = AlbumGridItem & {
  artist: string;
};

export function JawboxAlbumsContent() {
  const pathname = usePathname();
  const site = getMusicSiteFromPathname(pathname);
  const [search, setSearch] = useState("");

  const albums: JawboxAlbumGridItem[] = useMemo(
    () =>
      jawboxReleases.map((r) => ({
        id: r.id,
        title: r.artist ? `${r.artist} — ${r.title}` : r.title,
        year: r.year ?? 0,
        artist: r.artist,
      })),
    []
  );

  const filteredAlbums = useMemo(
    () =>
      albums.filter(
        (a) =>
          search === "" ||
          a.title.toLowerCase().includes(search.toLowerCase())
      ),
    [albums, search]
  );

  const getAlbumImage = (album: JawboxAlbumGridItem): string | null => {
    return getLocalAlbumImage(album.id);
  };

  return (
    <div className="container py-6">
      <h1 className="font-league mb-6">{site.navLabels.discography}</h1>

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
        cacheKeyPrefix="jawbox-album-thumb"
        imageFit="contain"
        preferProxy={false}
      />
    </div>
  );
}
