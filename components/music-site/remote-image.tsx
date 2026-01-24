"use client";

import { useEffect, useMemo, useState } from "react";
import { cn } from "@/lib/utils";
import { getProxiedImageUrl, normalizeImageUrl } from "@/lib/image-utils";

type SourceState = "direct" | "proxy" | "fallback";

export type RemoteImageProps = {
  src?: string | null;
  alt: string;
  className?: string;
  width?: number;
  height?: number;
  loading?: "lazy" | "eager";
  fallbackSrc?: string;
  fit?: "cover" | "contain";
  cacheKey?: string;
  preferProxy?: boolean;
  invalidCacheValues?: string[];
};

export function RemoteImage({
  src,
  alt,
  className,
  width,
  height,
  loading = "lazy",
  fallbackSrc = "/chat-gbv-box.svg",
  fit = "cover",
  cacheKey,
  preferProxy = true,
  invalidCacheValues = [],
}: RemoteImageProps) {
  const normalized = normalizeImageUrl(src);
  const invalidCacheSet = useMemo(
    () =>
      new Set(
        [fallbackSrc, ...invalidCacheValues].filter(
          (value): value is string => Boolean(value)
        )
      ),
    [fallbackSrc, invalidCacheValues]
  );
  const [currentSrc, setCurrentSrc] = useState<string | null>(normalized);
  const [sourceState, setSourceState] = useState<SourceState>("direct");
  const effectiveFit = sourceState === "fallback" ? "contain" : fit;

  useEffect(() => {
    let initialSrc = normalized;
    if (cacheKey) {
      try {
        const cached = localStorage.getItem(cacheKey);
        if (cached && !invalidCacheSet.has(cached)) {
          const cachedUrl = getProxiedImageUrl(cached) ?? cached;
          if (!invalidCacheSet.has(cachedUrl)) {
            setCurrentSrc(cachedUrl);
            setSourceState("direct");
            return;
          }
        }
      } catch {
        // ignore cache errors
      }
    }

    if (preferProxy && normalized && !normalized.startsWith("/")) {
      initialSrc = getProxiedImageUrl(normalized);
      setSourceState("proxy");
    } else {
      setSourceState("direct");
    }

    setCurrentSrc(initialSrc);
  }, [cacheKey, invalidCacheSet, normalized, preferProxy]);

  const handleError = () => {
    if (!normalized) {
      setCurrentSrc(fallbackSrc);
      setSourceState("fallback");
      return;
    }

    if (sourceState === "direct") {
      setCurrentSrc(getProxiedImageUrl(normalized));
      setSourceState("proxy");
      return;
    }

    if (sourceState === "proxy") {
      setCurrentSrc(fallbackSrc);
      setSourceState("fallback");
    }
  };

  if (!currentSrc) return null;

  return (
    <img
      src={currentSrc}
      alt={alt}
      width={width}
      height={height}
      loading={loading}
      referrerPolicy="no-referrer"
      onError={handleError}
      onLoad={() => {
        if (!cacheKey || sourceState === "fallback") return;
        try {
          localStorage.setItem(cacheKey, currentSrc);
        } catch {
          // ignore cache errors
        }
      }}
      className={cn(
        "block",
        effectiveFit === "cover" ? "object-cover" : "object-contain",
        className
      )}
    />
  );
}
