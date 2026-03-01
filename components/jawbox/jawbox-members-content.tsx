"use client";

import { Card, CardContent } from "@/components/ui/card";
import { jawboxArtists } from "@/lib/jawbox-artists-data";
import { JAWBOX_ARTIST_IMAGES } from "@/lib/jawbox-artist-images";
import Link from "next/link";
import { usePathname } from "next/navigation";
import { getMusicSiteFromPathname } from "@/lib/music-site";
import { MemberAvatar } from "@/components/music-site/member-avatar";
import { SitePlaceholderIcon } from "@/components/music-site/site-placeholder-icon";

export function JawboxMembersContent() {
  const pathname = usePathname();
  const site = getMusicSiteFromPathname(pathname);

  return (
    <div className="container py-6">
      <h1 className="font-league mb-6">{site.navLabels.members}</h1>

      <p className="text-sm text-muted-foreground mb-4">
        Showing {jawboxArtists.length} artists
      </p>

      <div className="grid gap-4 grid-cols-2 sm:grid-cols-3 md:grid-cols-4 lg:grid-cols-5 xl:grid-cols-6">
        {jawboxArtists.map((artist) => {
          const localImage = JAWBOX_ARTIST_IMAGES[artist.id] ?? null;
          return (
            <Link key={artist.id} href={`${site.basePath}/${site.membersSlug}/${artist.id}`}>
              <Card className="hover:bg-muted/80 transition-colors cursor-pointer h-full">
                <CardContent className="p-3 text-center">
                  <MemberAvatar
                    name={artist.name}
                    localImageUrl={localImage}
                    site={site}
                    skipRemoteLookup={false}
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
