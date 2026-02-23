"use client";

import Link from "next/link";
import { Badge } from "@/components/ui/badge";
import { usePathname } from "next/navigation";
import { getMusicSiteFromPathname, SLAP_A_HAM_RECORDS_SITE } from "@/lib/music-site";
import { getSlapAHamRecordsArtistById } from "@/lib/slap-a-ham-records-artists-data";
import { slapahamrecordsReleases } from "@/lib/slap-a-ham-records-releases-data";
import { SLAP_A_HAM_RECORDS_ARTIST_IMAGES } from "@/lib/slap-a-ham-records-artist-images";
import { useMemberImage } from "@/components/music-site/use-member-image";
import { SiteRemoteImage } from "@/components/music-site/site-remote-image";
import { MemberDetailLayout } from "@/components/music-site/member-detail-layout";
import { MemberDetailLeft } from "@/components/music-site/member-detail-left";
import { MemberDetailRight } from "@/components/music-site/member-detail-right";
import { SitePlaceholderIcon } from "@/components/music-site/site-placeholder-icon";

export function SlapAHamRecordsMemberDetailContent({ memberId }: { memberId: string }) {
  const pathname = usePathname();
  const site = getMusicSiteFromPathname(pathname);
  const artist = getSlapAHamRecordsArtistById(Number(memberId));
  const artistName = artist?.name?.toLowerCase() ?? "";

  const releases = artist
    ? slapahamrecordsReleases.filter(
        (r) => r.artist.toLowerCase() === artist.name.toLowerCase()
      )
    : [];

  const localImage = SLAP_A_HAM_RECORDS_ARTIST_IMAGES[Number(memberId)] ?? null;

  const { resolvedImageUrl } = useMemberImage({
    siteId: site.id,
    site,
    memberName: artist?.name,
    memberId,
    localImageUrl: localImage,
    skipRemoteLookup: false,
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
            site={SLAP_A_HAM_RECORDS_SITE}
            src={resolvedImageUrl}
            alt={artist.name}
            width={300}
            height={300}
            className="w-full aspect-square object-contain"
            fallbackSrc={site.placeholderIconSrc}
            cacheKey={`${site.id}-member-image:${artistName}`}
            preferProxy
          />
        ) : (
          <SitePlaceholderIcon site={site} />
        )
      }
      name={artist.name}
      profile={artist.description}
    />
  );

  const rightContent = (
    <MemberDetailRight
      items={releases}
      emptyLabel="No releases found in catalog."
      emptyClassName="text-sm"
      containerClassName="space-y-2"
      renderItem={(release) => (
        <Link
          key={release.id}
          href={`${site.basePath}/${site.albumsSlug}/${release.id}`}
          className="flex items-center justify-between border-b border-border pb-2 last:border-0 hover:bg-muted/80 -mx-2 px-2 py-1 rounded transition-colors"
        >
          <div>
            <p className="font-semibold text-sm">{release.title}</p>
            {release.catalogNo && (
              <p className="text-xs text-muted-foreground">{release.catalogNo}</p>
            )}
          </div>
          {release.year && <Badge variant="outline">{release.year}</Badge>}
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
      rightTitle={`Releases (${releases.length})`}
      rightContent={rightContent}
    />
  );
}
