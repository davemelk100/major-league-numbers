"use client";

import { useState } from "react";
import { cn } from "@/lib/utils";
import { SiteRemoteImage } from "@/components/music-site/site-remote-image";
import { SKINGRAFT_SITE, type MusicSiteConfig } from "@/lib/music-site";
import type { RemoteImageProps } from "@/components/music-site/remote-image";

type SgRemoteImageProps = Omit<RemoteImageProps, "fallbackSrc" | "fit" | "onAllFailed"> & {
  site?: MusicSiteConfig;
  fallbackSrc?: string;
  localFallbackSrc?: string | null;
  fit?: "cover" | "contain";
};

export function SgRemoteImage({
  site: _site,
  fallbackSrc = "",
  localFallbackSrc,
  fit = "contain",
  className,
  alt,
  ...props
}: SgRemoteImageProps) {
  const [failed, setFailed] = useState(false);

  if (failed) {
    return (
      <div className={cn("rounded-lg bg-muted flex items-center justify-center p-2", className)}>
        <span className="text-xs text-muted-foreground text-center font-medium leading-tight">{alt}</span>
      </div>
    );
  }

  return (
    <SiteRemoteImage
      {...props}
      site={SKINGRAFT_SITE}
      alt={alt}
      fallbackSrc={fallbackSrc}
      localFallbackSrc={localFallbackSrc}
      fit={fit}
      className={className}
      onAllFailed={() => setFailed(true)}
    />
  );
}
