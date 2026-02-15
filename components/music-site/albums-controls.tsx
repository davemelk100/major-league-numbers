 "use client";

 import { useRef, useState } from "react";
 import { Input } from "@/components/ui/input";
 import {
   Select,
   SelectContent,
   SelectItem,
   SelectTrigger,
   SelectValue,
 } from "@/components/ui/select";
 import { Tabs, TabsList, TabsTrigger } from "@/components/ui/tabs";
 import { Search } from "lucide-react";
 import type { MusicSiteConfig } from "@/lib/music-site";

 type AlbumsControlsProps = {
   site: MusicSiteConfig;
   isAmrep: boolean;
   totalCount: number;
   typeCounts?: { all: number; albums: number; eps: number; singles: number };
   releaseFilter: "all" | "albums" | "eps" | "singles";
   onReleaseFilterChange: (value: "all" | "albums" | "eps" | "singles") => void;
   sortBy: "year-asc" | "year-desc" | "title";
   onSortByChange: (value: "year-asc" | "year-desc" | "title") => void;
   search: string;
   onSearchChange: (value: string) => void;
 };

 export function AlbumsControls({
   site,
   isAmrep,
   totalCount,
   typeCounts,
   releaseFilter,
   onReleaseFilterChange,
   sortBy,
   onSortByChange,
   search,
   onSearchChange,
 }: AlbumsControlsProps) {
   const [searchOpen, setSearchOpen] = useState(false);
   const searchWrapperRef = useRef<HTMLDivElement>(null);

   const showSearch = searchOpen || search.length > 0;

   return (
     <div className="flex flex-col gap-4 mb-6 overflow-hidden">
       <div className="flex flex-col lg:flex-row lg:items-center gap-4">
         <div className="flex items-center gap-4 min-w-0">
           <div className="shrink-0">
             <h1 className="font-league">{site.navLabels.discography}</h1>
             <p className="text-sm text-muted-foreground">
               {isAmrep
                 ? "Releases"
                 : releaseFilter === "albums"
                   ? "Albums"
                   : releaseFilter === "eps"
                     ? "EPs"
                     : releaseFilter === "singles"
                       ? "Singles"
                       : "All"}
               {isAmrep && (
                 <span className="align-baseline"> ({totalCount})</span>
               )}
             </p>
           </div>
           {showSearch ? (
             <div ref={searchWrapperRef} className="relative flex-1 max-w-xs min-w-0">
               <Search
                 className={`absolute left-3 top-1/2 -translate-y-1/2 h-4 w-4 ${
                   isAmrep ? "text-black" : "text-white/80"
                 }`}
               />
               <Input
                 placeholder="Search titles..."
                 value={search}
                 onChange={(e) => onSearchChange(e.target.value)}
                 onBlur={() => {
                   if (search.length === 0) setSearchOpen(false);
                 }}
                 className="pl-9 w-full text-white gbv-input-white"
               />
             </div>
           ) : (
             <button
               type="button"
               onClick={() => {
                 setSearchOpen(true);
                 requestAnimationFrame(() => {
                   searchWrapperRef.current?.querySelector("input")?.focus();
                 });
               }}
               className="shrink-0 h-10 w-10 flex items-center justify-center rounded-md border border-input hover:bg-muted/50 transition-colors"
               aria-label="Search"
             >
               <Search className={`h-4 w-4 ${isAmrep ? "text-black" : "text-white/80"}`} />
             </button>
           )}
         </div>
         <div className="flex items-center gap-4">
           <Tabs
             value={releaseFilter}
             onValueChange={(v) => onReleaseFilterChange(v as typeof releaseFilter)}
           >
             <TabsList className="text-black">
               <TabsTrigger value="all" className="text-black">
                 All{typeCounts ? ` (${typeCounts.all})` : ""}
               </TabsTrigger>
               <TabsTrigger value="albums" className="text-black">
                 Albums{typeCounts ? ` (${typeCounts.albums})` : ""}
               </TabsTrigger>
               <TabsTrigger value="eps" className="text-black">
                 EPs{typeCounts ? ` (${typeCounts.eps})` : ""}
               </TabsTrigger>
               <TabsTrigger value="singles" className="text-black">
                 Singles{typeCounts ? ` (${typeCounts.singles})` : ""}
               </TabsTrigger>
             </TabsList>
           </Tabs>
           <Select value={sortBy} onValueChange={(v) => onSortByChange(v as typeof sortBy)}>
             <SelectTrigger className="w-44 text-white">
               <SelectValue className="text-white" />
             </SelectTrigger>
             <SelectContent className="text-black">
               <SelectItem value="year-asc" className="text-black">
                 Year (oldest)
               </SelectItem>
               <SelectItem value="year-desc" className="text-black">
                 Year (newest)
               </SelectItem>
               <SelectItem value="title" className="text-black">
                 Title A-Z
               </SelectItem>
             </SelectContent>
           </Select>
         </div>
       </div>
     </div>
   );
 }
