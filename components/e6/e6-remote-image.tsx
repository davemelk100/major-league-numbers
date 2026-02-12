"use client";

import { cn } from "@/lib/utils";
import { RemoteImage, type RemoteImageProps } from "@/components/music-site/remote-image";

type E6RemoteImageProps = Omit<RemoteImageProps, "fallbackSrc" | "fit"> & {
  fallbackSrc?: string;
  fit?: "cover" | "contain";
};

export function E6RemoteImage({
  fallbackSrc = "/e6-logo.png",
  fit = "contain",
  className,
  ...props
}: E6RemoteImageProps) {
  return (
    <RemoteImage
      {...props}
      fallbackSrc={fallbackSrc}
      fit={fit}
      className={cn("rounded-lg", className)}
      invalidCacheValues={["/chat-gbv-box.svg", "/noise-bird.svg", "/revelation-logo.png", "/e6-logo.png"]}
    />
  );
}
