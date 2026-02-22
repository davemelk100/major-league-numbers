"use client";

import { cn } from "@/lib/utils";
import { RemoteImage, type RemoteImageProps } from "@/components/music-site/remote-image";
import type { MusicSiteConfig } from "@/lib/music-site";

type SiteRemoteImageProps = Omit<RemoteImageProps, "fallbackSrc" | "fit"> & {
  site: MusicSiteConfig;
  fallbackSrc?: string;
  localFallbackSrc?: string | null;
  fit?: "cover" | "contain";
};

export function SiteRemoteImage({
  site,
  fallbackSrc,
  localFallbackSrc,
  fit,
  className,
  ...props
}: SiteRemoteImageProps) {
  return (
    <RemoteImage
      {...props}
      fallbackSrc={fallbackSrc ?? site.images.fallbackIcon}
      localFallbackSrc={localFallbackSrc}
      fit={fit ?? site.images.fit}
      className={cn("rounded-lg", className)}
      fallbackClassName="object-contain rounded-lg opacity-20"
      invalidCacheValues={site.images.invalidCacheValues}
    />
  );
}
