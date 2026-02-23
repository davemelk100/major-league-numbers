 "use client";

 import { useEffect, useState } from "react";
 import { usePathname } from "next/navigation";
 import { getMusicSiteFromPathname } from "@/lib/music-site";
 import { getSiteArtists, getSiteReleases } from "@/lib/site-data-registry";

 export interface SiteSearchAlbum {
   id: number | string;
   title: string;
  year?: number | null;
   thumb: string;
   coverUrl?: string | null;
   format?: string | string[];
   releaseType?: string;
 }

 export interface SiteSearchMember {
   id: number | string;
   name: string;
   active: boolean;
   imageUrl?: string | null;
 }

 export function useSiteSearchData(query: string) {
   const pathname = usePathname();
   const site = getMusicSiteFromPathname(pathname);
   const isAmrep = site.id === "amrep";
   const [albums, setAlbums] = useState<SiteSearchAlbum[]>([]);
   const [members, setMembers] = useState<SiteSearchMember[]>([]);
   const [isLoading, setIsLoading] = useState(true);

   useEffect(() => {
     let isActive = true;
     const fetchData = async () => {
       if (!query) {
         if (isActive) {
           setAlbums([]);
           setMembers([]);
           setIsLoading(false);
         }
         return;
       }

       // Use local registry data
       const localReleases = getSiteReleases(site.id);
       const localArtists = getSiteArtists(site.id);

       if (localReleases.length > 0 || localArtists.length > 0) {
         if (isActive) {
           setAlbums(
             localReleases.map((release) => ({
               id: release.id,
               title: release.title,
               year: release.year,
               thumb: "",
               format: release.format ?? undefined,
               releaseType: release.releaseType,
             }))
           );
           setMembers(
             localArtists.map((artist) => ({
               id: artist.id,
               name: artist.name,
               active: artist.active ?? true,
               imageUrl: artist.imageUrl,
             }))
           );
           setIsLoading(false);
         }
         return;
       }

       // Fallback for sites without local data
       if (isActive) setIsLoading(false);
     };

     fetchData();
     return () => {
       isActive = false;
     };
   }, [site.id, query]);

   return {
     site,
     isAmrep,
     albums,
     members,
     isLoading,
   };
 }
