 "use client";

 import { useEffect, useState } from "react";
 import { usePathname } from "next/navigation";
 import { getMusicSiteFromPathname } from "@/lib/music-site";
 import { getSiteReleases } from "@/lib/site-data-registry";

 export interface GbvAlbumDetail {
   id: number;
   title: string;
   year: number;
   images?: Array<{ uri: string; type: string }>;
   tracklist?: Array<{ position: string; title: string; duration: string }>;
   genres?: string[];
   styles?: string[];
   labels?: Array<{ name: string }>;
   formats?: Array<{ name: string; descriptions?: string[] }>;
   uri?: string;
 }

 export interface AmrepAlbumDetail {
   id: number;
   title: string;
  year?: number | null;
   thumb?: string | null;
   mainRelease?: number;
   format?: string | string[];
   labels?: Array<{ name: string }>;
   artists?: Array<{ name: string }>;
   styles?: string[];
   genres?: string[];
   tracklist?: Array<{ position: string; title: string; duration: string }>;
   releaseType?: string;
 }

 export function useSiteAlbumDetail(albumId: string) {
   const pathname = usePathname();
   const site = getMusicSiteFromPathname(pathname);
   const isAmrep = site.id === "amrep";
   const isGbv = site.id === "gbv";
   const [album, setAlbum] = useState<GbvAlbumDetail | AmrepAlbumDetail | null>(null);
   const [isLoading, setIsLoading] = useState(true);
   const [isTracklistLoading, setIsTracklistLoading] = useState(false);
   const [error, setError] = useState<string | null>(null);

   useEffect(() => {
     let isActive = true;

     async function fetchAlbum() {
       setIsLoading(true);
       setError(null);

       // GBV: use live Discogs API
       if (isGbv) {
         try {
           const res = await fetch(`/api/gbv/discogs?type=master&id=${albumId}`);
           if (!res.ok) throw new Error("Failed to fetch album");
           const data = await res.json();
           if (isActive) {
             setAlbum(data);
           }
         } catch (err) {
           if (isActive) {
             setError("Failed to load album details");
           }
           console.error(err);
         } finally {
           if (isActive) {
             setIsLoading(false);
           }
         }
         return;
       }

       // All other sites: use local registry data
       const releases = getSiteReleases(site.id);
       const release = releases.find((r) => r.id === Number(albumId));

       if (!release) {
         if (isActive) {
           setError("Release not found");
           setAlbum(null);
           setIsLoading(false);
         }
         return;
       }

       const baseAlbum: AmrepAlbumDetail = {
         id: Number(release.id),
         title: release.artist ? release.title.replace(`${release.artist} — `, "") : release.title,
         year: release.year,
         thumb: "",
         format: release.format ?? undefined,
         artists: release.artist ? [{ name: release.artist }] : undefined,
       };

       if (isActive) {
         setAlbum(baseAlbum);
         setIsLoading(false);
       }

       // Try to fetch tracklist from site's Discogs route
       if (release.artist || release.title) {
         setIsTracklistLoading(true);
         try {
           const plainTitle = release.artist
             ? release.title.replace(`${release.artist} — `, "")
             : release.title;
           const params = new URLSearchParams({
             type: "resolve",
             ...(release.artist ? { artist: release.artist } : {}),
             ...(plainTitle ? { title: plainTitle } : {}),
           });
           const res = await fetch(`/api/${site.id}/discogs?${params}`);
           if (res.ok) {
             const data = await res.json();
             if (isActive && data.release) {
               setAlbum((prev) => ({ ...prev, ...data.release, id: release.id }));
             }
           }
         } catch {
           // tracklist unavailable, local data still shown
         } finally {
           if (isActive) setIsTracklistLoading(false);
         }
       }
     }

     fetchAlbum();
     return () => {
       isActive = false;
     };
   }, [albumId, isGbv, site.id]);

   return { site, isAmrep, album, isLoading, isTracklistLoading, error };
 }
