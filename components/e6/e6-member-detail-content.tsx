"use client";

import Link from "next/link";
import { Badge } from "@/components/ui/badge";
import { ExternalLink } from "lucide-react";
import { usePathname } from "next/navigation";
import { getMusicSiteFromPathname, E6_SITE } from "@/lib/music-site";
import { getE6ArtistById } from "@/lib/e6-artists-data";
import { getE6ReleasesByArtist } from "@/lib/e6-discography-data";
import { getLocalMemberImage, E6_MEMBER_IMAGE_FALLBACKS, E6_MEMBER_IMAGE_SKIP } from "@/lib/e6-artist-images";
import { useMemberImage } from "@/components/music-site/use-member-image";
import { SiteRemoteImage } from "@/components/music-site/site-remote-image";
import { MemberDetailLayout } from "@/components/music-site/member-detail-layout";
import { MemberDetailLeft } from "@/components/music-site/member-detail-left";
import { MemberDetailRight } from "@/components/music-site/member-detail-right";
import { SitePlaceholderIcon } from "@/components/music-site/site-placeholder-icon";

export function E6MemberDetailContent({ memberId }: { memberId: string }) {
  const pathname = usePathname();
  const site = getMusicSiteFromPathname(pathname);
  const artist = getE6ArtistById(memberId);
  const releases = artist ? getE6ReleasesByArtist(artist.name) : [];
  const localImage = getLocalMemberImage(memberId);

  const nameKey = artist?.name?.toLowerCase() ?? "";
  const fallbackImageUrl = E6_MEMBER_IMAGE_FALLBACKS[nameKey] || null;
  const skipRemoteLookup = E6_MEMBER_IMAGE_SKIP[nameKey] || false;

  const { resolvedImageUrl } = useMemberImage({
    siteId: site.id,
    site,
    memberName: artist?.name,
    memberId,
    localImageUrl: localImage,
    fallbackImageUrl,
    skipRemoteLookup,
  });

  if (!artist) {
    return (
      <MemberDetailLayout
        site={site}
        backHref={`${site.basePath}/${site.membersSlug}`}
        backLabel={site.navLabels.members}
        leftContent={<SitePlaceholderIcon site={site} />}
        rightTitle="Releases"
        rightContent={
          <p className="text-sm text-muted-foreground">Artist not found.</p>
        }
      />
    );
  }

  const leftContent = (
    <MemberDetailLeft
      image={
        resolvedImageUrl ? (
          <SiteRemoteImage
            site={E6_SITE}
            src={resolvedImageUrl}
            alt={artist.name}
            width={300}
            height={300}
            className="w-full aspect-square object-contain"
            fallbackSrc={site.placeholderIconSrc}
            cacheKey={`${site.id}-member-image:${nameKey}`}
            preferProxy
          />
        ) : (
          <SitePlaceholderIcon site={site} />
        )
      }
      name={artist.name}
    >
      {artist.yearsActive && (
        <p className="text-sm text-muted-foreground mb-2">
          Active: {artist.yearsActive}
        </p>
      )}
      {artist.genre && (
        <p className="text-sm text-muted-foreground mb-2">
          Genre: {artist.genre}
        </p>
      )}
      {artist.wikipediaUrl && (
        <a
          href={artist.wikipediaUrl}
          target="_blank"
          rel="noopener noreferrer"
          className="inline-flex items-center gap-1 text-sm text-muted-foreground hover:text-foreground hover:underline"
        >
          Wikipedia
          <ExternalLink className="h-3 w-3" />
        </a>
      )}
    </MemberDetailLeft>
  );

  const rightContent = (
    <MemberDetailRight
      items={releases}
      emptyLabel="No releases found in catalog."
      emptyClassName="text-sm"
      containerClassName="space-y-2"
      renderItem={(release) => (
        <Link
          key={release.catalogNumber}
          href={`${site.basePath}/${site.albumsSlug}/${release.catalogNumber}`}
          className="flex items-center justify-between border-b border-border pb-2 last:border-0 hover:bg-muted/80 -mx-2 px-2 py-1 rounded transition-colors"
        >
          <div>
            <p className="font-semibold text-sm">{release.title}</p>
            <p className="text-xs text-muted-foreground">
              E6 {release.catalogNumber}
            </p>
          </div>
          <Badge variant="outline">{release.year}</Badge>
        </Link>
      )}
    />
  );

  return (
    <MemberDetailLayout
      site={site}
      backHref={`${site.basePath}/${site.membersSlug}`}
      backLabel={site.navLabels.members}
      leftContent={leftContent}
      rightTitle={`Releases on E6 (${releases.length})`}
      rightContent={rightContent}
    />
  );
}
