"use client";

import { Card, CardContent } from "@/components/ui/card";
import Link from "next/link";
import { usePathname } from "next/navigation";
import { getMusicSiteFromPathname } from "@/lib/music-site";
import { sgArtists, sgArtistImages } from "@/lib/sg-artists-data";
import { SgRemoteImage } from "@/components/sg/sg-remote-image";
import { SitePlaceholderIcon } from "@/components/music-site/site-placeholder-icon";

export function SgMembersContent() {
  const pathname = usePathname();
  const site = getMusicSiteFromPathname(pathname);

  const members = sgArtists.map((artist) => ({
    id: artist.id,
    name: artist.name,
    imageUrl: sgArtistImages[artist.id] ?? null,
  }));

  return (
    <div className="container py-6">
      <h1 className="font-league mb-6">
        {members.length} {site.navLabels.members}
      </h1>

      <div className="grid gap-4 grid-cols-2 sm:grid-cols-3 md:grid-cols-4 lg:grid-cols-5 xl:grid-cols-6">
        {members.map((member) => (
          <Link key={member.id} href={`${site.basePath}/members/${member.id}`}>
            <Card className="hover:bg-muted/50 transition-colors cursor-pointer h-full">
              <CardContent className="p-3 text-center">
                {member.imageUrl ? (
                  <SgRemoteImage
                    src={member.imageUrl}
                    alt={member.name}
                    width={200}
                    height={200}
                    className="w-full aspect-square rounded-lg object-contain mb-2"
                    cacheKey={`sg-member-thumb:${member.id}`}
                  />
                ) : (
                  <SitePlaceholderIcon site={site} />
                )}
                <h3 className="font-semibold text-sm">{member.name}</h3>
              </CardContent>
            </Card>
          </Link>
        ))}
      </div>
    </div>
  );
}
