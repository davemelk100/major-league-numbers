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
  {
    id: "TtqizaMLMDQ",
    title: "Guided By Voices - TtqizaMLMDQ",
    description: "Guided By Voices video.",
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

const revVideos: Video[] = [
  {
    id: "blMvZmF_i0c",
    title: "Revelation Records",
    description: "Revelation Records video.",
  },
  {
    id: "0nbdlQetym4",
    title: "Revelation Records",
    description: "Revelation Records video.",
  },
  {
    id: "YNRkRs0y1CA",
    title: "Revelation Records",
    description: "Revelation Records video.",
  },
  {
    id: "N600-iOqlvM",
    title: "Revelation Records",
    description: "Revelation Records video.",
  },
  {
    id: "YnIEgnar4aY",
    title: "Gorilla Biscuits - New Direction",
    description: "From Start Today (Revelation Records, 1989). Iconic NYHC straight edge anthem.",
  },
  {
    id: "RjR0GUOAXOU",
    title: "Gorilla Biscuits - Start Today",
    description: "Title track from Start Today (Revelation Records, 1989).",
  },
  {
    id: "la_kXIiM8lQ",
    title: "Youth of Today - Break Down the Walls",
    description: "Title track from Break Down the Walls (1986). Straight edge youth crew classic.",
  },
  {
    id: "T9oS9kk5Im4",
    title: "Judge - New York Crew",
    description: "From the New York Crew 7\" EP (1988). NYHC anthem from Mike Judge and Porcell.",
  },
  {
    id: "dDpbMND2f0w",
    title: "Judge - Bringin' It Down",
    description: "Title track from Bringin' It Down (Revelation Records, 1989).",
  },
  {
    id: "HGPzJs1WK88",
    title: "Quicksand - Fazer",
    description: "Official music video from Slip (1993). Post-hardcore crossover.",
  },
  {
    id: "qdo5E8v9vXo",
    title: "Chain of Strength - True Till Death",
    description: "From the True Till Death 7\" EP (Revelation Records, 1989). SoCal straight edge.",
  },
  {
    id: "3pr9TOf-RpU",
    title: "Inside Out - Burning Fight",
    description: "From No Spiritual Surrender (Revelation Records, 1990). Zack de la Rocha's pre-RATM band.",
  },
];

const sgVideos: Video[] = [
  {
    id: "QiIL1VtjE48",
    title: "Dazzling Killmen - Medicine Me",
    description: "7\" single produced by Steve Albini (Skin Graft Records, 1993).",
  },
  {
    id: "dOr_L5BebS0",
    title: "U.S. Maple - Stuck",
    description: "From the debut 7\" on Skin Graft Records (1995).",
  },
  {
    id: "SZSSlEMCYWg",
    title: "The Flying Luttenbachers - Kkring Number One",
    description: "Brutal prog from Weasel Walter's The Flying Luttenbachers.",
  },
{
    id: "OcTz5Qep7EM",
    title: "Ruins - Live",
    description: "Tatsuya Yoshida's legendary Japanese duo Ruins, live performance.",
  },
  {
    id: "nUcvrpZxnj0",
    title: "Koenjihyakkei",
    description: "Zeuhl-inspired Japanese ensemble led by Tatsuya Yoshida.",
  },
  {
    id: "lonGP3Q67mI",
    title: "Yowie - Throckmorton (Live)",
    description: "From Taking Umbrage (Skin Graft Records, 2025).",
  },
  {
    id: "SJxd_Lu8VPA",
    title: "Yowie - Live Microfiche",
    description: "St. Louis math rock trio Yowie, live performance.",
  },
  {
    id: "YeeIQX8ElB0",
    title: "Arab On Radar - My Mind Is a Muffler (Live)",
    description: "Providence noise rock on Skin Graft Records.",
  },
  {
    id: "bBZsan0t3os",
    title: "Space Streakings - Karaoke",
    description: "Japanese noise/industrial from Space Streakings.",
  },
  {
    id: "Mzebcwy_ae0",
    title: "Space Streakings - Super Mini-Car",
    description: "Japanese noise/industrial from Space Streakings.",
  },
  {
    id: "odHOjDgKEqw",
    title: "Lake of Dracula - Live at Fireside Bowl (1996)",
    description: "Skin Graft supergroup live at Chicago's Fireside Bowl.",
  },
  {
    id: "NuBYg2icNy4",
    title: "Cheer-Accident - Live (2008)",
    description: "Chicago avant-prog stalwarts Cheer-Accident, live.",
  },
  {
    id: "FuXnVdtlEsw",
    title: "Lovely Little Girls",
    description: "Nine-piece art-prog band from Chicago on Skin Graft Records.",
  },
{
    id: "_lxCm2-BoDg",
    title: "The Chinese Stars - Girls Of Las Vegas (Live)",
    description: "Post-Arab On Radar project on Skin Graft Records.",
  },
  {
    id: "xqTo2XSGqog",
    title: "AIDS Wolf - Spit Tastes Like Metal",
    description: "Official video from Montreal's AIDS Wolf.",
  },
  {
    id: "_NB01w9HFfw",
    title: "Made In Mexico - International Zombie (Live)",
    description: "Austin noise trio on Skin Graft Records.",
  },
];

const e6Videos: Video[] = [
  {
    id: "W6H8WcTPnWM",
    title: "Neutral Milk Hotel - In the Aeroplane Over the Sea",
    description: "Title track from the landmark album In the Aeroplane Over the Sea (1998).",
  },
  {
    id: "Nu91q_F4fuA",
    title: "Neutral Milk Hotel - Holland, 1945",
    description: "The only single from In the Aeroplane Over the Sea (1998).",
  },
  {
    id: "LULmbLlPvVk",
    title: "Neutral Milk Hotel - The King of Carrot Flowers, Pt. 1",
    description: "Opening track from In the Aeroplane Over the Sea (1998).",
  },
  {
    id: "L8cCPH1qnYI",
    title: "of Montreal - Wraith Pinned to the Mist and Other Games",
    description: "Official music video from The Sunlandic Twins (2005).",
  },
  {
    id: "HBfgQvM7wtE",
    title: "of Montreal - Gronlandic Edit",
    description: "Official music video from Hissing Fauna, Are You the Destroyer? (2007).",
  },
  {
    id: "5VeIL7juFE0",
    title: "of Montreal - Heimdalsgate Like a Promethean Curse",
    description: "Official music video from Hissing Fauna, Are You the Destroyer? (2007).",
  },
  {
    id: "B6gSSsCdFeA",
    title: "The Apples in Stereo - Energy",
    description: "Music video directed by Elijah Wood from New Magnetic Wonder (2007).",
  },
  {
    id: "H74VcyVetrA",
    title: "The Olivia Tremor Control - The Sylvan Screen",
    description: "From Music from the Unrealized Film Script: Dusk at Cubist Castle (1996).",
  },
  {
    id: "VmXtP3ciD0I",
    title: "Beulah - Score From Augusta",
    description: "From The Coast Is Never Clear (2001).",
  },
  {
    id: "cS5AhnmjDJ0",
    title: "Circulatory System - Inside Blasts",
    description: "From the self-titled debut Circulatory System (2001).",
  },
];

const jawboxVideos: Video[] = [
  {
    id: "xFvz1JQAPgQ",
    title: "Video 1",
  },
  {
    id: "1ivnf4p3EFI",
    title: "Video 2",
  },
  {
    id: "wXuIQa9uzpg",
    title: "Video 3",
  },
  {
    id: "qXi_TtLSg-Y",
    title: "Video 4",
  },
  {
    id: "olJUri6nQxM",
    title: "Video 5",
  },
  {
    id: "TZG6L555Zb0",
    title: "Video 6",
  },
  {
    id: "XxxnStEamug",
    title: "Video 7",
  },
  {
    id: "8lIRYXFbXsg",
    title: "Video 8",
  },
  {
    id: "FF6L-onR_AU",
    title: "Video 9",
  },
  {
    id: "4_JEvbJrLZc",
    title: "Video 10",
  },
  {
    id: "HEb5xdGjbuU",
    title: "Video 11",
  },
  {
    id: "Elf-CdR5Rq4",
    title: "Video 12",
  },
  {
    id: "_tv3QwrOqSk",
    title: "Video 13",
  },
];

const SITE_VIDEOS: Record<string, typeof videos> = {
  gbv: videos,
  amrep: amrepVideos,
  e6: e6Videos,
  rev: revVideos,
  sg: sgVideos,
  "jawbox": jawboxVideos,
};

function getVideosForSite(siteId: string) {
  return SITE_VIDEOS[siteId] ?? [];
}

export function SiteVideosContent() {
  const pathname = usePathname();
  const site = getMusicSiteFromPathname(pathname);
  const list = getVideosForSite(site.id);

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
