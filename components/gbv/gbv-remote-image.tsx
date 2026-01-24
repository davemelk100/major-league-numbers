"use client";

import { cn } from "@/lib/utils";
import { RemoteImage, type RemoteImageProps } from "@/components/music-site/remote-image";

type GbvRemoteImageProps = Omit<RemoteImageProps, "fallbackSrc" | "fit"> & {
  fallbackSrc?: string;
  fit?: "cover" | "contain";
};

export function GbvRemoteImage({
  fallbackSrc = "/chat-gbv-box.svg",
  fit = "cover",
  className,
  ...props
}: GbvRemoteImageProps) {
  return (
    <RemoteImage
      {...props}
      fallbackSrc={fallbackSrc}
      fit={fit}
      className={cn("rounded-lg", className)}
    />
  );
}
