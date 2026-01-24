 "use client";

import { useEffect, useState } from "react";
import { getProxiedImageUrl } from "@/lib/image-utils";

 type UseMemberImageOptions = {
   siteId: string;
   memberName?: string | null;
   memberId?: string | number;
   localImageUrl?: string | null;
   discogsImageUrl?: string | null;
   fallbackImageUrl?: string | null;
   skipRemoteLookup?: boolean;
 };

 export function useMemberImage({
   siteId,
   memberName,
   memberId,
   localImageUrl,
   discogsImageUrl,
   fallbackImageUrl,
   skipRemoteLookup,
 }: UseMemberImageOptions) {
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
     const fetchCommonsImage = async () => {
       try {
         const res = await fetch(
           `/api/gbv/commons-image?name=${encodeURIComponent(memberName)}`,
         );
         if (!res.ok) return;
         const data = await res.json();
        if (isActive && typeof data?.imageUrl === "string") {
          const proxiedUrl = getProxiedImageUrl(data.imageUrl);
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

     fetchCommonsImage();
     return () => {
       isActive = false;
     };
   }, [
    proxiedDiscogsImageUrl,
    proxiedFallbackImageUrl,
    proxiedLocalImageUrl,
     lookupAttempted,
     memberName,
     normalizedName,
     siteId,
     skipRemoteLookup,
   ]);

   return { resolvedImageUrl };
 }
