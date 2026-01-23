export type MusicSiteId = "gbv" | "amrep";

export interface MusicSiteConfig {
  id: MusicSiteId;
  name: string;
  shortName: string;
  basePath: string;
  chatLabel: string;
  headerTitle: string;
  headerTextClass: string;
  logoSrc: string;
  chatIconSrc: string;
  placeholderIconSrc: string;
  navLabels: {
    discography: string;
    members: string;
    sideProjects: string;
  };
  sources: Array<{ label: string; url: string }>;
  searchPlaceholder: string;
}

export const GBV_SITE: MusicSiteConfig = {
  id: "gbv",
  name: "Guided By Data",
  shortName: "GBV",
  basePath: "/gbv",
  chatLabel: "Chat GBV",
  headerTitle: "Guided By Data",
  headerTextClass: "text-white",
  logoSrc: "/gbv-mlb.svg",
  chatIconSrc: "/gbv-rune.svg",
  placeholderIconSrc: "/chat-gbv-box.svg",
  navLabels: {
    discography: "Discography",
    members: "Members",
    sideProjects: "Side Projects",
  },
  sources: [
    { label: "Discogs", url: "https://www.discogs.com/" },
    { label: "GBVDB", url: "https://www.gbvdb.com/" },
    { label: "MusicBrainz", url: "https://musicbrainz.org/" },
    { label: "Cover Art Archive", url: "https://coverartarchive.org/" },
    { label: "Wikidata", url: "https://www.wikidata.org/" },
    { label: "Wikimedia Commons", url: "https://commons.wikimedia.org/" },
  ],
  searchPlaceholder: "Search GBV...",
};

export const AMREP_SITE: MusicSiteConfig = {
  id: "amrep",
  name: "Noise By The Numbers",
  shortName: "AmRep",
  basePath: "/amrep",
  chatLabel: "ChatREP",
  headerTitle: "Noise By The Numbers",
  headerTextClass: "text-black",
  logoSrc: "/amrep-logo-black.svg",
  chatIconSrc: "/noise-bird.png",
  placeholderIconSrc: "/noise-placeholder.svg",
  navLabels: {
    discography: "Releases",
    members: "Artists",
    sideProjects: "Imprints",
  },
  sources: [
    { label: "Wikipedia", url: "https://en.wikipedia.org/wiki/Amphetamine_Reptile_Records" },
    { label: "Shoxop", url: "https://www.shoxop.com/" },
    { label: "Facebook", url: "https://www.facebook.com/amphetaminereptile/" },
  ],
  searchPlaceholder: "Search AmRep...",
};

export function getMusicSiteFromPathname(
  pathname?: string | null
): MusicSiteConfig {
  if (pathname?.startsWith("/amrep")) return AMREP_SITE;
  return GBV_SITE;
}
