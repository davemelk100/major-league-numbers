import { cn } from "@/lib/utils";
import type { MusicSiteConfig } from "@/lib/music-site";

type SitePlaceholderIconProps = {
  site?: MusicSiteConfig;
  className?: string;
};

export function SitePlaceholderIcon({
  site,
  className,
}: SitePlaceholderIconProps) {
  const iconSrc = site?.placeholderIconSrc;
  const altText = site ? `${site.shortName} logo` : "placeholder";

  return (
    <div
      data-testid="site-placeholder-icon"
      className={cn(
        "mb-2 flex items-center justify-center",
        className
      )}
      style={{ opacity: 0.2 }}
    >
      {iconSrc ? (
        <img
          src={iconSrc}
          alt={altText}
          className="w-auto h-auto object-contain"
        />
      ) : (
        <svg className="w-12 h-12 text-muted-foreground" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5">
          <circle cx="12" cy="12" r="10" />
          <path d="M9 9l6 6M15 9l-6 6" />
        </svg>
      )}
    </div>
  );
}
