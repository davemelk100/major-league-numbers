"use client";

import { useState } from "react";
import { usePathname } from "next/navigation";
import { Card, CardContent } from "@/components/ui/card";
import { Input } from "@/components/ui/input";
import { getAllRevArtists, getRevArtistImageUrl } from "@/lib/rev-artists-data";
import { SitePlaceholderIcon } from "@/components/music-site/site-placeholder-icon";
import { getMusicSiteFromPathname } from "@/lib/music-site";
import Link from "next/link";

export function RevMembersContent() {
  const pathname = usePathname();
  const site = getMusicSiteFromPathname(pathname);
  const artists = getAllRevArtists();
  const [search, setSearch] = useState("");

  const filteredArtists = artists.filter((artist) =>
    search === "" || artist.name.toLowerCase().includes(search.toLowerCase())
  );

  return (
    <div className="container py-6">
      <h1 className="font-league mb-6">Bands</h1>

      <div className="mb-6">
        <Input
          placeholder="Search bands..."
          value={search}
          onChange={(e) => setSearch(e.target.value)}
          className="max-w-xs"
        />
      </div>

      <p className="text-sm text-muted-foreground mb-4">
        Showing {filteredArtists.length} of {artists.length} bands
      </p>

      <div className="grid gap-4 grid-cols-2 sm:grid-cols-3 md:grid-cols-4 lg:grid-cols-5 xl:grid-cols-6">
        {filteredArtists.map((artist) => {
          const imageUrl = getRevArtistImageUrl(artist.id);
          return (
            <Link key={artist.id} href={`${site.basePath}/${site.membersSlug}/${artist.id}`}>
              <Card className="hover:bg-muted/80 transition-colors cursor-pointer h-full">
                <CardContent className="p-3 text-center">
                  {imageUrl ? (
                    <div className="w-full aspect-square bg-muted/30 rounded-lg mb-2 flex items-center justify-center overflow-hidden">
                      <img
                        src={imageUrl}
                        alt={artist.name}
                        className="w-full h-full object-cover"
                        loading="lazy"
                      />
                    </div>
                  ) : (
                    <SitePlaceholderIcon site={site} />
                  )}
                  <p className="text-sm font-medium">{artist.name}</p>
                </CardContent>
              </Card>
            </Link>
          );
        })}
      </div>
    </div>
  );
}
