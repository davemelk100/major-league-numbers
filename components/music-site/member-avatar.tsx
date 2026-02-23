 "use client";

 import { useEffect, useState } from "react";
import Image from "next/image";
import { RemoteImage } from "@/components/music-site/remote-image";
import { getProxiedImageUrl, normalizeImageUrl } from "@/lib/image-utils";
import { cn } from "@/lib/utils";
import type { MusicSiteConfig } from "@/lib/music-site";

 type MemberAvatarProps = {
   name: string;
   imageUrl?: string | null;
   memberId?: number;
   localImageUrl?: string | null;
   site?: MusicSiteConfig;
   fallbackIconSrc?: string;
   cacheKeyPrefix?: string;
   skipRemoteLookup?: boolean;
   fallbackImages?: Record<string, string>;
   skipImages?: Record<string, true>;
   fit?: "cover" | "contain";
   placeholderSize?: number;
   placeholderClassName?: string;
   placeholderVariant?: "next-image" | "img";
   placeholderWrapperClassName?: string;
   fallbackClassName?: string;
   renderPlaceholder?: () => React.ReactNode;
 };

 export function MemberAvatar({
   name,
   imageUrl,
   memberId,
   localImageUrl,
   site,
   fallbackIconSrc,
   cacheKeyPrefix,
   skipRemoteLookup,
   fallbackImages,
   skipImages,
   fit,
   placeholderSize = 24,
   placeholderClassName = "w-1/2 h-1/2 gbv-nav-icon object-contain",
   placeholderVariant = "next-image",
   placeholderWrapperClassName,
   fallbackClassName,
   renderPlaceholder,
 }: MemberAvatarProps) {
   const effectiveFallbackIcon = fallbackIconSrc ?? site?.images.fallbackIcon ?? "/chat-gbv-box.svg";
   const effectiveCacheKeyPrefix = cacheKeyPrefix ?? site?.id ?? "gbv";
   const effectiveFit = fit ?? site?.images.fit ?? "cover";
   const lookupStrategy = site?.images.lookupStrategy ?? "wikimedia";
   const lookupContext = site?.images.lookupContext;

   const [hasError, setHasError] = useState(false);
   const [resolvedImageUrl, setResolvedImageUrl] = useState<string | null>(null);
   const [lookupAttempted, setLookupAttempted] = useState(false);
  const normalizedImageUrl = normalizeImageUrl(imageUrl);
   const nameKey = name.toLowerCase();
  const fallbackImageUrl = getProxiedImageUrl(fallbackImages?.[nameKey] || null);
   const shouldSkipLookup = skipRemoteLookup || Boolean(skipImages?.[nameKey]);

   useEffect(() => {
     if (localImageUrl && !hasError) {
       setResolvedImageUrl(localImageUrl);
       return;
     }

     if (normalizedImageUrl && !hasError) {
       setResolvedImageUrl(normalizedImageUrl);
       return;
     }

     if (fallbackImageUrl) {
       setResolvedImageUrl(fallbackImageUrl);
       setLookupAttempted(true);
       return;
     }

     if (shouldSkipLookup || lookupAttempted) return;

     const cacheKey = `${effectiveCacheKeyPrefix}-member-image:${nameKey}`;
     try {
        const cached = localStorage.getItem(cacheKey);
        if (cached) {
          const cachedUrl = getProxiedImageUrl(cached) ?? cached;
          setResolvedImageUrl(cachedUrl);
         setLookupAttempted(true);
         return;
       }
     } catch {
       // ignore cache errors
     }

     let isActive = true;

    async function fetchImage() {
       try {
        let fetchedImageUrl: string | null = null;

        if (lookupStrategy === "discogs") {
          const q = new URLSearchParams({ type: "artist", name });
          const res = await fetch(`/api/${effectiveCacheKeyPrefix}/discogs?${q.toString()}`);
          if (!res.ok) return;
          const data = await res.json();
          fetchedImageUrl = data?.artist?.imageUrl || null;
        } else {
          const query = new URLSearchParams({ name });
          if (lookupContext) {
            query.set("context", lookupContext);
          }
          const res = await fetch(`/api/images/commons?${query.toString()}`);
          if (!res.ok) return;
          const data = await res.json();
          fetchedImageUrl = typeof data?.imageUrl === "string" && data.imageUrl.length > 0
            ? data.imageUrl
            : null;
        }

        if (fetchedImageUrl) {
          const proxiedUrl = getProxiedImageUrl(fetchedImageUrl);
          if (!proxiedUrl) return;
           if (isActive) {
            setResolvedImageUrl(proxiedUrl);
           }
           try {
            localStorage.setItem(cacheKey, proxiedUrl);
           } catch {
             // ignore cache errors
           }
         }
       } catch {
         // ignore lookup errors
       } finally {
         if (isActive) {
           setLookupAttempted(true);
         }
       }
     }

     fetchImage();
     return () => {
       isActive = false;
     };
   }, [
     effectiveCacheKeyPrefix,
     fallbackImageUrl,
     hasError,
     localImageUrl,
     lookupAttempted,
     lookupContext,
     lookupStrategy,
     name,
     nameKey,
     normalizedImageUrl,
     shouldSkipLookup,
   ]);

   if (!resolvedImageUrl || hasError) {
    const placeholderUrl = `https://placehold.co/400x400/1a1a2e/eaeaea?text=${encodeURIComponent(name)}`;
    return (
      <div className="w-full aspect-square mb-2 mx-auto relative rounded-lg overflow-hidden">
        <img
          src={placeholderUrl}
          alt={`${name} placeholder`}
          className="rounded-lg object-cover w-full h-full"
        />
      </div>
    );
   }

   return (
    <div className="w-full aspect-square mb-2 mx-auto relative rounded-lg overflow-hidden">
      <RemoteImage
         src={resolvedImageUrl}
         alt={`${name} photo`}
        width={400}
        height={400}
        fallbackSrc={effectiveFallbackIcon}
        fallbackClassName={fallbackClassName}
        preferProxy={false}
        className={
          effectiveFit === "contain"
            ? "rounded-lg object-contain w-full h-full"
            : "rounded-lg object-cover w-full h-full"
        }
       />
     </div>
   );
 }
