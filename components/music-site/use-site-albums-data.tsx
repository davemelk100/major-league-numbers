 "use client";

 import { useEffect, useState } from "react";
 import { usePathname } from "next/navigation";
 import { getMusicSiteFromPathname } from "@/lib/music-site";
 import { getSiteReleases } from "@/lib/site-data-registry";

 export interface SiteAlbum {
   id: number | string;
   title: string;
  year?: number | null;
   thumb: string;
   mainRelease?: number;
   format?: string | string[];
   releaseType?: string;
 }

 export function useSiteAlbumsData() {
   const pathname = usePathname();
   const site = getMusicSiteFromPathname(pathname);
   const isGbv = site.id === "gbv";
   const isAmrep = site.id === "amrep";
   const [albums, setAlbums] = useState<SiteAlbum[]>([]);
   const [isLoading, setIsLoading] = useState(true);

   const dedupeReleases = (items: SiteAlbum[]) => {
     const seen = new Set<string>();
     return items.filter((item) => {
       const titleKey = `${item.title || ""}::${item.year || ""}`.toLowerCase();
       const key = item.mainRelease ? `main:${item.mainRelease}` : `title:${titleKey}`;
       if (seen.has(key)) return false;
       seen.add(key);
       return true;
     });
   };

   useEffect(() => {
     let isActive = true;

     const fetchData = async () => {
       // Use local registry data for all sites that have it
       const localReleases = getSiteReleases(site.id);
       if (localReleases.length > 0) {
         if (isActive) {
           const mapped = localReleases.map((release) => ({
             id: release.id,
             title: release.title,
             year: release.year ?? 0,
             thumb: "",
             format: release.format ?? undefined,
             releaseType: release.releaseType,
           }));
           setAlbums(dedupeReleases(mapped));
           setIsLoading(false);
         }
         return;
       }

       // Fallback for sites without local data: try Discogs API
       if (isActive) setIsLoading(false);
     };

     fetchData();
     return () => {
       isActive = false;
     };
   }, [site.id]);

   return { site, isAmrep, albums, isLoading };
 }
