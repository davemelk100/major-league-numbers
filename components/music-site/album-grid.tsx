 "use client";

 import Link from "next/link";
 import type { ComponentType } from "react";
 import { ShoppingCart } from "lucide-react";
 import { Card, CardContent } from "@/components/ui/card";
 import type { MusicSiteConfig } from "@/lib/music-site";
import { SitePlaceholderIcon } from "@/components/music-site/site-placeholder-icon";

export type AlbumGridItem = {
   id: number;
   title: string;
   year: number;
   format?: string | string[];
   releaseType?: string;
 };

 type RemoteImageProps = {
   site: MusicSiteConfig;
   src: string;
   alt: string;
   width: number;
   height: number;
   className?: string;
   loading?: "lazy" | "eager";
   fetchPriority?: "high" | "low" | "auto";
   cacheKey?: string;
   preferProxy?: boolean;
   localFallbackSrc?: string | null;
 };

 type AlbumGridProps<T extends AlbumGridItem> = {
   albums: T[];
   site: MusicSiteConfig;
   getAlbumImage: (album: T) => string | null;
   getLocalFallbackImage?: (album: T) => string | null;
   getReleaseTypeLabel: (album: T) => string;
   RemoteImage: ComponentType<RemoteImageProps>;
   linkBasePath: string;
   cacheKeyPrefix: string;
   eagerCount?: number;
   imageFit?: "cover" | "contain";
   preferProxy?: boolean;
   getPurchaseUrl?: (album: T) => string | null;
 };

export function AlbumGrid<T extends AlbumGridItem>({
   albums,
   site,
   getAlbumImage,
   getLocalFallbackImage,
   getReleaseTypeLabel,
   RemoteImage,
   linkBasePath,
   cacheKeyPrefix,
   eagerCount = 6,
   imageFit = "cover",
   preferProxy = true,
   getPurchaseUrl,
}: AlbumGridProps<T>) {
   const imageClassName = `w-full aspect-square rounded-lg object-${imageFit} mb-2`;

   return (
     <div className="grid gap-4 grid-cols-2 sm:grid-cols-3 md:grid-cols-4 lg:grid-cols-5 xl:grid-cols-6">
       {albums.map((album, index) => {
         const purchaseUrl = getPurchaseUrl?.(album);
         return (
           <div
             key={`${album.id ?? "release"}-${album.year ?? "unknown"}-${index}`}
             className="relative"
           >
             <Link href={`${linkBasePath}/${album.id}`}>
               <Card className="hover:bg-muted/80 transition-colors cursor-pointer h-full">
                 <CardContent className={`p-3${purchaseUrl ? " pb-10" : ""}`}>
                   {getAlbumImage(album) ? (
                     <RemoteImage
                       site={site}
                       src={getAlbumImage(album) as string}
                       alt={album.title}
                       width={200}
                       height={200}
                       className={imageClassName}
                       loading={index < eagerCount ? "eager" : "lazy"}
                       fetchPriority={index === 0 ? "high" : undefined}
                       cacheKey={`${cacheKeyPrefix}:${album.id}`}
                       preferProxy={preferProxy}
                       localFallbackSrc={getLocalFallbackImage?.(album)}
                     />
                   ) : (
                     <div className="w-full aspect-square rounded-lg bg-muted flex items-center justify-center mb-2">
                       <SitePlaceholderIcon className="h-12 w-12" />
                     </div>
                   )}
                   <h3 className="font-semibold text-base truncate">{album.title}</h3>
                   <div className="flex items-center justify-between text-xs text-muted-foreground">
                     <span>{album.year}</span>
                     <span className="border border-border rounded px-1.5 py-0.5 text-[10px] uppercase tracking-wide">
                       {getReleaseTypeLabel(album)}
                     </span>
                   </div>
                 </CardContent>
               </Card>
             </Link>
             {purchaseUrl && (
               <a
                 href={purchaseUrl}
                 target="_blank"
                 rel="noopener noreferrer"
                 className="absolute bottom-0 left-0 right-0 flex items-center justify-center gap-1.5 text-xs text-primary hover:underline mx-3 mb-3 border border-primary/30 rounded px-2 py-1.5"
               >
                 <ShoppingCart className="h-3.5 w-3.5" />
                 Buy on Rockathon
               </a>
             )}
           </div>
         );
       })}
     </div>
   );
 }
