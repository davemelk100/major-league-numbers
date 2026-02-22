 "use client";

import { useEffect, useState } from "react";
import { getProxiedImageUrl } from "@/lib/image-utils";
import type { MusicSiteConfig } from "@/lib/music-site";

 type UseMemberImageOptions = {
   siteId: string;
   site?: MusicSiteConfig;
   memberName?: string | null;
   memberId?: string | number;
   localImageUrl?: string | null;
   discogsImageUrl?: string | null;
   fallbackImageUrl?: string | null;
   skipRemoteLookup?: boolean;
 };

 export function useMemberImage({
   siteId,
   site,
   memberName,
   memberId,
   localImageUrl,
   discogsImageUrl,
   fallbackImageUrl,
   skipRemoteLookup,
 }: UseMemberImageOptions) {
   const lookupStrategy = site?.images.lookupStrategy ?? "wikimedia";
   const lookupContext = site?.images.lookupContext;

   const [resolvedImageUrl, setResolvedImageUrl] = useState<string | null>(null);
   const [lookupAttempted, setLookupAttempted] = useState(false);
  const normalizedName = memberName?.toLowerCase().trim() || "";
  const proxiedLocalImageUrl = getProxiedImageUrl(localImageUrl);
  const proxiedDiscogsImageUrl = getProxiedImageUrl(discogsImageUrl);
  const proxiedFallbackImageUrl = getProxiedImageUrl(fallbackImageUrl);

   useEffect(() => {
     setResolvedImageUrl(null);
     setLookupAttempted(false);
   }, [memberId, normalizedName]);

   useEffect(() => {
     if (!memberName) return;

    if (proxiedLocalImageUrl) {
      setResolvedImageUrl(proxiedLocalImageUrl);
       return;
     }

    if (proxiedDiscogsImageUrl) {
      setResolvedImageUrl(proxiedDiscogsImageUrl);
       return;
     }

    if (proxiedFallbackImageUrl && !lookupAttempted) {
      setResolvedImageUrl(proxiedFallbackImageUrl);
       setLookupAttempted(true);
       return;
     }

     if (skipRemoteLookup || lookupAttempted) return;

     const cacheKey = `${siteId}-member-image:${normalizedName}`;
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
     const fetchImage = async () => {
       try {
        let imageUrl: string | null = null;

        if (lookupStrategy === "discogs") {
          const q = new URLSearchParams({ type: "artist", name: memberName });
          const res = await fetch(`/api/${siteId}/discogs?${q.toString()}`);
          if (!res.ok) return;
          const data = await res.json();
          imageUrl = data?.artist?.imageUrl || null;
        } else {
          const query = new URLSearchParams({ name: memberName });
          if (lookupContext) {
            query.set("context", lookupContext);
          }
          const res = await fetch(`/api/images/commons?${query.toString()}`);
          if (!res.ok) return;
          const data = await res.json();
          imageUrl = typeof data?.imageUrl === "string" && data.imageUrl.length > 0
            ? data.imageUrl
            : null;
        }

        if (isActive && imageUrl) {
          const proxiedUrl = getProxiedImageUrl(imageUrl);
          if (proxiedUrl) {
            setResolvedImageUrl(proxiedUrl);
          }
           try {
            if (proxiedUrl) {
              localStorage.setItem(cacheKey, proxiedUrl);
            }
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
     };

     fetchImage();
     return () => {
       isActive = false;
     };
   }, [
    proxiedDiscogsImageUrl,
    proxiedFallbackImageUrl,
    proxiedLocalImageUrl,
     lookupAttempted,
     lookupContext,
     lookupStrategy,
     memberName,
     normalizedName,
     siteId,
     skipRemoteLookup,
   ]);

   return { resolvedImageUrl };
 }
