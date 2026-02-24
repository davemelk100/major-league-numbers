import type { MusicSiteConfig } from "@/lib/music-site";

export function SiteImagePreload({ site }: { site: MusicSiteConfig }) {
  return (
    <>
      <link rel="preload" as="image" href={site.logoSrc} />
      {site.chatIconSrc !== site.logoSrc && (
        <link rel="preload" as="image" href={site.chatIconSrc} />
      )}
    </>
  );
}
