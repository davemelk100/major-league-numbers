"use client";

import { useState } from "react";
import { Card, CardContent } from "@/components/ui/card";
import { Input } from "@/components/ui/input";
import { getAllE6Artists } from "@/lib/e6-artists-data";
import {
  getLocalMemberImage,
  E6_MEMBER_IMAGE_FALLBACKS,
  E6_MEMBER_IMAGE_SKIP,
} from "@/lib/e6-artist-images";
import Link from "next/link";
import { usePathname } from "next/navigation";
import { getMusicSiteFromPathname } from "@/lib/music-site";
import { MemberAvatar } from "@/components/music-site/member-avatar";
import { SitePlaceholderIcon } from "@/components/music-site/site-placeholder-icon";

export function E6MembersContent() {
  const pathname = usePathname();
  const site = getMusicSiteFromPathname(pathname);
  const artists = getAllE6Artists();
  const [search, setSearch] = useState("");

  const filteredArtists = artists.filter((artist) =>
    search === "" || artist.name.toLowerCase().includes(search.toLowerCase())
  );

  return (
    <div className="container py-6">
      <h1 className="font-league mb-6">Artists</h1>

      <div className="mb-6">
        <Input
          placeholder="Search artists..."
          value={search}
          onChange={(e) => setSearch(e.target.value)}
          className="max-w-xs"
        />
      </div>

      <p className="text-sm text-muted-foreground mb-4">
        Showing {filteredArtists.length} of {artists.length} artists
      </p>

      <div className="grid gap-4 grid-cols-2 sm:grid-cols-3 md:grid-cols-4 lg:grid-cols-5 xl:grid-cols-6">
        {filteredArtists.map((artist) => {
          const localImage = getLocalMemberImage(artist.id);
          return (
            <Link key={artist.id} href={`${site.basePath}/${site.membersSlug}/${artist.id}`}>
              <Card className="hover:bg-muted/80 transition-colors cursor-pointer h-full">
                <CardContent className="p-3 text-center">
                  <MemberAvatar
                    name={artist.name}
                    localImageUrl={localImage}
                    site={site}
                    skipRemoteLookup={false}
                    fallbackImages={E6_MEMBER_IMAGE_FALLBACKS}
                    skipImages={E6_MEMBER_IMAGE_SKIP}
                    renderPlaceholder={() => <SitePlaceholderIcon site={site} />}
                  />
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
