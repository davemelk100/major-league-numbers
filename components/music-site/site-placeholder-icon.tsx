import { cn } from "@/lib/utils";
import type { MusicSiteConfig } from "@/lib/music-site";

type SitePlaceholderIconProps = {
  site: MusicSiteConfig;
  className?: string;
};

export function SitePlaceholderIcon({
  site,
  className,
}: SitePlaceholderIconProps) {
  return (
    <div
      data-testid="site-placeholder-icon"
      className={cn(
        "mb-2 flex items-center justify-center",
        className
      )}
      style={{ opacity: 0.2 }}
    >
      <img
        src={site.placeholderIconSrc}
        alt={`${site.shortName} logo`}
        className="w-auto h-auto object-contain"
      />
    </div>
  );
}
