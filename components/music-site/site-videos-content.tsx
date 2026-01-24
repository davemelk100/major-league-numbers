"use client";

import { usePathname } from "next/navigation";
import { getMusicSiteFromPathname } from "@/lib/music-site";

interface Video {
  id: string;
  title: string;
  description?: string;
}

const videos: Video[] = [
  {
    id: "jUjLDvrLDhg",
    title: "Guided By Voices - I Am A Scientist",
    description: "Music video for 'I Am A Scientist' from Bee Thousand (1994).",
  },
  {
    id: "ScR7x0m4Kxo",
    title: "Guided By Voices - Motor Away",
    description: "Music video for 'Motor Away' from Alien Lanes (1995).",
  },
  {
    id: "XZsi9uEOJLg",
    title: "Guided By Voices - Game of Pricks",
    description: "Music video for 'Game of Pricks' from Alien Lanes (1995).",
  },
  {
    id: "JRMobFKG-a4",
    title: "Guided By Voices - Echos Myron",
    description: "Music video for 'Echos Myron' from Bee Thousand (1994).",
  },
  {
    id: "_rNP2LK5QIA",
    title: "Guided By Voices - Glad Girls",
    description: "Music video for 'Glad Girls' from Isolation Drills (2001).",
  },
  {
    id: "vz6mD-0vTYA",
    title: "Guided By Voices - Do The Collapse",
    description:
      "Music video for 'Do The Collapse' from Do The Collapse (1999).",
  },
  {
    id: "UvsAS--CoXI",
    title: "Guided By Voices - Hold On Hope",
    description: "Music video for 'Hold On Hope' from Do The Collapse (1999).",
  },
  {
    id: "-fm83rY2aWc",
    title: "Guided By Voices - Teenage FBI",
    description: "Music video for 'Teenage FBI' from Do The Collapse (1999).",
  },
  {
    id: "7VGXLB3us70",
    title: "Guided By Voices feat. Kim Deal - Love Hurts",
    description: "Cover of the Everly Brothers' 'Love Hurts' featuring Kim Deal.",
  },
];

const amrepVideos: Video[] = [
  {
    id: "C8aNGVt79r4",
    title: "Halo of Flies - No Time",
    description: "Amphetamine Reptile Records video from Halo of Flies.",
  },
  {
    id: "g1Vv8OTguzY",
    title: 'Melvins 1983 - "Beer Hippy"',
    description: "AmRep video from the Melvins 1983 release.",
  },
  {
    id: "WLl2eNYznNM",
    title: "H•O•F - A New Kind Of Hate",
    description: "Another AmRep cut highlighting Halo of Flies.",
  },
  {
    id: "uyYqiW-LIAA",
    title: "AmRep video feature: uyYqiW-LIAA",
    description: "Amphetamine Reptile Records video highlight.",
  },
  {
    id: "DJwIgdInEy0",
    title: "AmRep video feature: DJwIgdInEy0",
    description: "Amphetamine Reptile Records video highlight.",
  },
  {
    id: "HjC0pEl0kSE",
    title: "AmRep video feature: HjC0pEl0kSE",
    description: "Amphetamine Reptile Records video highlight.",
  },
];

export function SiteVideosContent() {
  const pathname = usePathname();
  const site = getMusicSiteFromPathname(pathname);
  const isAmrep = site.id === "amrep";
  const list = isAmrep ? amrepVideos : videos;

  return (
    <div className="container py-6">
      <h1 className="font-league mb-2">Videos</h1>

      {list.length === 0 ? (
        <p className="text-sm text-muted-foreground">
          Video content coming soon.
        </p>
      ) : (
        <div className="grid gap-6 md:grid-cols-2">
          {list.map((video) => (
            <div key={video.id} className="aspect-video rounded-lg overflow-hidden">
              <iframe
                src={`https://www.youtube-nocookie.com/embed/${video.id}`}
                title={video.title}
                allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture; web-share"
                allowFullScreen
                className="w-full h-full border-0"
                loading="lazy"
              />
            </div>
          ))}
        </div>
      )}
    </div>
  );
}
