import type { Metadata } from "next";

export interface MusicSiteConfig {
  id: string;
  name: string;
  shortName: string;
  basePath: string;
  chatLabel: string;
  headerTitle: string;
  headerTextClass: string;
  logoSrc: string;
  chatIconSrc: string;
  placeholderIconSrc: string;
  shellClass: string;
  logoClassName?: string;
  hideHeaderTitle?: boolean;
  description?: string;
  navLabels: {
    discography: string;
    members: string;
    sideProjects: string;
  };
  footerDisclaimer?: string;
  sources: Array<{ label: string; url: string }>;
  imageSources: Array<{ label: string; url: string }>;
  membersSlug: string;
  albumsSlug: string;
  images: {
    fallbackIcon: string;
    fit: "cover" | "contain";
    lookupStrategy: "wikimedia" | "discogs";
    lookupContext?: string;
    invalidCacheValues: string[];
  };
  searchPlaceholder: string;
  seo: {
    title: string;
    titleTemplate?: string;
    description: string;
    keywords: string[];
    siteName?: string;
    ogImage: string;
    ogImageAlt: string;
    twitterImage?: string;
  };
}

export const GBV_SITE: MusicSiteConfig = {
  id: "gbv",
  name: "Guided By Data",
  shortName: "GBV",
  basePath: "/gbv",
  chatLabel: "Chat GBV",
  headerTitle: "Guided By Data",
  headerTextClass: "text-white",
  logoSrc: "/gbv-rune.svg",
  logoClassName: "h-10 w-auto sm:h-12 lg:h-14 brightness-0 invert",
  chatIconSrc: "/gbv-rune.svg",
  placeholderIconSrc: "/chat-gbv-box.svg",
  shellClass: "gbv-shell",
  description:
    "Guided by Voices is an American indie rock band from Dayton, Ohio, formed in 1983 by Robert Pollard. Known for their prolific output, lo-fi aesthetic, and short, melodic songs influenced by the British Invasion, GBV has become one of the most beloved bands in independent music.\n\nPollard, a former fourth-grade teacher, initially self-released albums on cassette before Bee Thousand and Alien Lanes earned widespread critical acclaim in the mid-1990s.\n\nThose records, packed with hook-filled fragments and four-track fidelity, turned GBV into unlikely indie heroes and helped define the sound of '90s lo-fi rock.\n\nThe band's ever-rotating lineup, relentless touring schedule, and over 30 studio albums have cemented their reputation as one of indie rock's most vital and unpredictable acts.",
  navLabels: {
    discography: "Releases",
    members: "Members",
    sideProjects: "Side Projects",
  },
  membersSlug: "members",
  albumsSlug: "albums",
  footerDisclaimer:
    "All Content, Rights, Copyrights, etc. are the property of Robert Pollard unless otherwise noted. This is simply a fan site.",
  sources: [
    { label: "Discogs", url: "https://www.discogs.com/" },
    { label: "GBVDB", url: "https://www.gbvdb.com/" },
    { label: "MusicBrainz", url: "https://musicbrainz.org/" },
    { label: "Cover Art Archive", url: "https://coverartarchive.org/" },
    { label: "Wikidata", url: "https://www.wikidata.org/" },
    { label: "Wikimedia Commons", url: "https://commons.wikimedia.org/" },
    { label: "Pitchfork", url: "https://pitchfork.com/" },
    { label: "Rolling Stone", url: "https://www.rollingstone.com/" },
    { label: "NME", url: "https://www.nme.com/" },
    { label: "Spin", url: "https://www.spin.com/" },
    { label: "AllMusic", url: "https://www.allmusic.com/" },
    { label: "YouTube", url: "https://www.youtube.com/" },
    { label: "Wikipedia", url: "https://en.wikipedia.org/" },
  ],
  imageSources: [
    { label: "Discogs", url: "https://www.discogs.com/" },
    { label: "Cover Art Archive", url: "https://coverartarchive.org/" },
    { label: "MusicBrainz", url: "https://musicbrainz.org/" },
    { label: "Wikimedia Commons", url: "https://commons.wikimedia.org/" },
    { label: "Archive.org", url: "https://archive.org/" },
  ],
  images: {
    fallbackIcon: "/chat-gbv-box.svg",
    fit: "cover",
    lookupStrategy: "wikimedia",
    lookupContext: "Guided By Voices",
    invalidCacheValues: ["/chat-gbv-box.svg"],
  },
  searchPlaceholder: "Search GBV...",
  seo: {
    title: "Guided By Data",
    titleTemplate: "%s | Guided By Data",
    description:
      "Explore Guided By Voices discography, albums, songs, and band history.",
    keywords: [
      "Guided By Voices",
      "GBV",
      "Robert Pollard",
      "indie rock",
      "lo-fi",
      "discography",
      "albums",
      "songs",
    ],
    siteName: "Guided By Data",
    ogImage: "https://majorleaguenumbers.com/og-gbv.png",
    ogImageAlt: "Guided By Data",
    twitterImage: "https://majorleaguenumbers.com/og-gbv.png",
  },
};

export const AMREP_SITE: MusicSiteConfig = {
  id: "amrep",
  name: "AmRep By The Numbers",
  shortName: "AmRep",
  basePath: "/amrep",
  chatLabel: "ChatREP",
  headerTitle: "AmRep By The Numbers",
  headerTextClass: "text-black",
  logoSrc: "/amrep-logo-foreground.svg",
  chatIconSrc: "/noise-bird.svg",
  placeholderIconSrc: "/noise-placeholder.svg",
  shellClass: "amrep-shell",
  logoClassName: "h-auto w-[40%] lg:w-[45%]",
  description:
    "Amphetamine Reptile Records is an independent record label founded by Tom Hazelmyer in 1986. Based in Minneapolis, AmRep became synonymous with the noise rock movement of the late '80s and '90s.\n\nThe label released foundational records by artists like the Melvins, Helmet, Halo of Flies, Cows, and Hammerhead, helping define the sound of underground heavy music.\n\nHazelmyer, also frontman of Halo of Flies, built AmRep around raw, abrasive sounds that bridged punk, metal, and art rock. The label's iconic artwork and limited-edition singles became instant collector staples.\n\nAmRep's influence continues to resonate decades later across noise rock, sludge, and experimental punk scenes worldwide.",
  navLabels: {
    discography: "Releases",
    members: "Artists",
    sideProjects: "Imprints",
  },
  membersSlug: "artists",
  albumsSlug: "releases",
  footerDisclaimer:
    "All Content, Rights, Copyrights, etc. are the property of Tom Hazelmyer and AmRep records. This is simply a fan site.",
  sources: [
    {
      label: "Discogs",
      url: "https://www.discogs.com/label/5126-Amphetamine-Reptile-Records",
    },
    {
      label: "AmRep Discography",
      url: "https://en.wikipedia.org/wiki/Amphetamine_Reptile_Records_discography",
    },
    {
      label: "Hammerhead Discography",
      url: "https://en.wikipedia.org/wiki/Hammerhead_(band)",
    },
    {
      label: "Wikipedia",
      url: "https://en.wikipedia.org/wiki/Amphetamine_Reptile_Records",
    },
    { label: "Shoxop", url: "https://www.shoxop.com/" },
    {
      label: "Shoxop Archive",
      url: "https://www.shoxop.com/collections/archive-sold-out-releases-over-the-years",
    },
    {
      label: "Shoxop All Releases",
      url: "https://www.shoxop.com/collections/all",
    },
    { label: "Facebook", url: "https://www.facebook.com/amphetaminereptile/" },
  ],
  imageSources: [
    { label: "Discogs", url: "https://www.discogs.com/" },
    { label: "Wikimedia Commons", url: "https://commons.wikimedia.org/" },
    { label: "Wikipedia", url: "https://en.wikipedia.org/" },
    { label: "Wikia", url: "https://www.fandom.com/" },
    { label: "HPR", url: "https://hpr1.com/" },
    { label: "Fungus Boy", url: "https://www.fungusboy.net/" },
    { label: "Magnet Magazine", url: "https://magnetmagazine.com/" },
    { label: "Sub Pop", url: "https://www.subpop.com/" },
    { label: "Blogger", url: "https://blogger.googleusercontent.com/" },
    { label: "Squarespace", url: "https://www.squarespace.com/" },
    { label: "Chaos Control", url: "https://chaoscontrol.com/" },
    { label: "Sun 13", url: "https://sun-13.com/" },
    { label: "Spotify", url: "https://open.spotify.com/" },
    { label: "Amazon", url: "https://www.amazon.com/" },
    { label: "Beautiful Noise", url: "https://beautifulnoise.wordpress.com/" },
    { label: "The Urinals", url: "https://www.theurinals.com/" },
    { label: "I Heart N", url: "https://ihrtn.net/" },
    { label: "Townsquare Media", url: "https://townsquare.media/" },
    { label: "Lollipop Magazine", url: "https://lollipopmagazine.com/" },
    { label: "Rokkos Adventures", url: "https://www.rokkosadventures.at/" },
    { label: "Last.fm", url: "https://www.last.fm/" },
    { label: "Bandcamp", url: "https://bandcamp.com/" },
    { label: "YouTube", url: "https://www.youtube.com/" },
    { label: "eBay", url: "https://www.ebay.com/" },
    { label: "Timebomb Records", url: "https://timebomb.co.jp/" },
    { label: "Chokebore", url: "https://www.chokebore.net/" },
    {
      label: "Metal Music Archives",
      url: "https://www.metalmusicarchives.com/",
    },
    { label: "Metallipromo", url: "https://metallipromo.com/" },
    { label: "The Melvins Wiki", url: "https://themelvins.net/" },
    { label: "Shoxop", url: "https://www.shoxop.com/" },
  ],
  images: {
    fallbackIcon: "/noise-bird.svg",
    fit: "contain",
    lookupStrategy: "wikimedia",
    lookupContext: "Amphetamine Reptile Records",
    invalidCacheValues: ["/noise-bird.svg"],
  },
  searchPlaceholder: "Search AmRep...",
  seo: {
    title: "Amphetamine Reptile Records",
    titleTemplate: "%s | Amphetamine Reptile Records",
    description:
      "Explore Amphetamine Reptile Records: artist roster, releases, label history, and milestones.",
    keywords: [
      "Amphetamine Reptile Records",
      "AmRep",
      "noise rock",
      "independent label",
      "artists",
      "releases",
      "label history",
    ],
    siteName: "Major League Numbers",
    ogImage: "https://majorleaguenumbers.com/noise-og.png",
    ogImageAlt: "Amphetamine Reptile Records",
    twitterImage: "https://majorleaguenumbers.com/noise-og.png",
  },
};

export const E6_SITE: MusicSiteConfig = {
  id: "e6",
  name: "Elephant 6 By The Numbers",
  shortName: "E6",
  basePath: "/e6",
  chatLabel: "ChatE6",
  headerTitle: "Elephant 6 By The Numbers",
  headerTextClass: "text-black",
  logoSrc: "/e6-logo.png",
  chatIconSrc: "/e6-logo.png",
  placeholderIconSrc: "/e6-logo.png",
  shellClass: "e6-shell",
  logoClassName: "h-auto w-[40%]",
  hideHeaderTitle: true,
  description:
    "The Elephant 6 Recording Company is a collective of musicians formed in the early 1990s, centered in Athens, Georgia. Built around a shared love of lo-fi recording, psychedelic pop, and collaborative creativity, E6 produced some of the most acclaimed indie music of the era.\n\nKey artists include Neutral Milk Hotel, The Apples in Stereo, The Olivia Tremor Control, and of Montreal, each bringing a distinct vision to the collective's sprawling catalog.\n\nMany members grew up together in Ruston, Louisiana, sharing four-track recorders and a deep love of '60s pop before migrating to Athens and Denver.\n\nThe collective's DIY ethos and densely layered recordings helped spark a broader revival of psychedelic and experimental pop throughout the late 1990s and 2000s.",
  navLabels: {
    discography: "Releases",
    members: "Artists",
    sideProjects: "Related Labels",
  },
  membersSlug: "artists",
  albumsSlug: "releases",
  footerDisclaimer:
    "All Content, Rights, Copyrights, etc. are the property of the respective artists and labels. This is simply a fan site.",
  sources: [
    {
      label: "Discogs",
      url: "https://www.discogs.com/label/43843-Elephant-Six-Recording-Co",
    },
    { label: "Wikipedia", url: "https://en.wikipedia.org/wiki/Elephant_6" },
    { label: "MusicBrainz", url: "https://musicbrainz.org/" },
    { label: "Bandcamp", url: "https://bandcamp.com/" },
    { label: "Orange Twin", url: "https://orangetwin.com/" },
  ],
  imageSources: [
    { label: "Discogs", url: "https://www.discogs.com/" },
    { label: "Wikipedia", url: "https://en.wikipedia.org/" },
    { label: "Wikimedia Commons", url: "https://commons.wikimedia.org/" },
    { label: "Bandcamp", url: "https://bandcamp.com/" },
    { label: "Last.fm", url: "https://www.last.fm/" },
  ],
  images: {
    fallbackIcon: "/e6-logo.png",
    fit: "contain",
    lookupStrategy: "discogs",
    invalidCacheValues: ["/e6-logo.png"],
  },
  searchPlaceholder: "Search E6...",
  seo: {
    title: "Elephant 6 Recording Company",
    titleTemplate: "%s | Elephant 6 Recording Company",
    description:
      "Explore the Elephant 6 Recording Company: artists, releases, collective history, and milestones.",
    keywords: [
      "Elephant 6",
      "E6",
      "Neutral Milk Hotel",
      "The Apples in Stereo",
      "of Montreal",
      "indie pop",
      "lo-fi",
      "psychedelic",
      "Athens Georgia",
      "collective",
    ],
    siteName: "Major League Numbers",
    ogImage: "https://majorleaguenumbers.com/e6-logo.png",
    ogImageAlt: "Elephant 6 Recording Company",
    twitterImage: "https://majorleaguenumbers.com/e6-logo.png",
  },
};

export const REVELATION_SITE: MusicSiteConfig = {
  id: "rev",
  name: "Revelation By The Numbers",
  shortName: "Rev",
  basePath: "/rev",
  chatLabel: "ChatREV",
  headerTitle: "Revelation By The Numbers",
  headerTextClass: "",
  logoSrc: "/rev-logo.png",
  chatIconSrc: "/rev-icon.svg",
  placeholderIconSrc: "/rev-icon.svg",
  shellClass: "revelation-shell",
  logoClassName: "h-auto w-[22%]",
  description:
    "Revelation Records is an independent record label founded by Jordan Cooper in 1987 in New Haven, Connecticut. A cornerstone of the American hardcore and punk scene, Revelation helped launch the careers of iconic bands like Youth of Today, Gorilla Biscuits, Bold, Chain of Strength, and Judge.\n\nThe label's early releases defined the sound of late-'80s New York straight edge, with seven-inches and EPs that became essential documents of the scene.\n\nAs hardcore evolved, Revelation expanded to embrace melodic hardcore, post-hardcore, and emo, signing acts like Texas Is the Reason, Into Another, and Samiam.\n\nThe label's catalog remains a definitive document of American punk's evolution over four decades and one of the most influential in hardcore music history.",
  navLabels: {
    discography: "Releases",
    members: "Bands",
    sideProjects: "Sub-Labels",
  },
  membersSlug: "artists",
  albumsSlug: "releases",
  footerDisclaimer:
    "All Content, Rights, Copyrights, etc. are the property of Revelation Records. This is simply a fan site.",
  sources: [
    {
      label: "Discogs",
      url: "https://www.discogs.com/label/910-Revelation-Records",
    },
    { label: "RevHQ", url: "https://revhq.com/" },
    {
      label: "Wikipedia",
      url: "https://en.wikipedia.org/wiki/Revelation_Records",
    },
    { label: "MusicBrainz", url: "https://musicbrainz.org/" },
    { label: "Bandcamp", url: "https://bandcamp.com/" },
  ],
  imageSources: [
    { label: "Discogs", url: "https://www.discogs.com/" },
    { label: "RevHQ", url: "https://revhq.com/" },
    { label: "Wikipedia", url: "https://en.wikipedia.org/" },
    { label: "Wikimedia Commons", url: "https://commons.wikimedia.org/" },
    { label: "Bandcamp", url: "https://bandcamp.com/" },
  ],
  images: {
    fallbackIcon: "/rev-icon.svg",
    fit: "contain",
    lookupStrategy: "discogs",
    invalidCacheValues: ["/rev-icon.svg"],
  },
  searchPlaceholder: "Search Rev...",
  seo: {
    title: "Revelation Records",
    titleTemplate: "%s | Revelation Records",
    description:
      "Explore Revelation Records: artist roster, discography, label history, and milestones.",
    keywords: [
      "Revelation Records",
      "hardcore",
      "punk",
      "straight edge",
      "discography",
      "artists",
      "releases",
      "label history",
    ],
    siteName: "Major League Numbers",
    ogImage: "https://majorleaguenumbers.com/rev-logo.png",
    ogImageAlt: "Revelation Records",
    twitterImage: "https://majorleaguenumbers.com/rev-logo.png",
  },
};

export const SKINGRAFT_SITE: MusicSiteConfig = {
  id: "sg",
  name: "Skin Graft By The Numbers",
  shortName: "SG",
  basePath: "/sg",
  chatLabel: "ChatSG",
  headerTitle: "Skin Graft By The Numbers",
  headerTextClass: "text-white",
  logoSrc: "/sg-logo.png",
  chatIconSrc: "/sg-logo.png",
  placeholderIconSrc: "/sg-logo.png",
  shellClass: "skingraft-shell",
  logoClassName: "h-12 w-auto sm:h-16 lg:h-28",
  hideHeaderTitle: true,
  description:
    "Skin Graft Records is an independent record label founded by Mark Fischer in 1991 in Chicago. Known for releasing experimental, noise rock, and avant-garde music, Skin Graft has championed some of the most daring artists in underground music.\n\nThe roster includes The Flying Luttenbachers, U.S. Maple, Dazzling Killmen, Mount Shasta, and Cheer-Accident, each pushing the boundaries of what rock music could be.\n\nFischer's distinctive hand-drawn artwork and bold graphic design gave the label a visual identity as striking as its sonic one, making each release a complete artistic statement.\n\nSkin Graft also built strong ties with Japan's noise and math-rock scenes, releasing records by Ruins, Zeni Geva, and other international acts that expanded its reach far beyond Chicago.",
  navLabels: {
    discography: "Releases",
    members: "Artists",
    sideProjects: "Imprints",
  },
  membersSlug: "artists",
  albumsSlug: "releases",
  footerDisclaimer:
    "All Content, Rights, Copyrights, etc. are the property of Skin Graft Records and the respective artists. This is simply a fan site.",
  sources: [
    {
      label: "Discogs",
      url: "https://www.discogs.com/label/1252-Skin-Graft-Records",
    },
    {
      label: "Wikipedia",
      url: "https://en.wikipedia.org/wiki/Skin_Graft_Records",
    },
    { label: "Bandcamp", url: "https://bandcamp.com/" },
    { label: "AllMusic", url: "https://www.allmusic.com/" },
  ],
  imageSources: [
    { label: "Discogs", url: "https://www.discogs.com/label/33275-Skin-Graft-Records" },
    { label: "Skin Graft Records", url: "https://skingraftrecords.com/photo_galleries.html" },
    { label: "MusicBrainz", url: "https://musicbrainz.org/label/ce065ac8-48d8-465b-bebd-2a4b3afb4180" },
    { label: "Wikipedia", url: "https://en.wikipedia.org/" },
    { label: "Wikimedia Commons", url: "https://commons.wikimedia.org/" },
    { label: "Bandcamp", url: "https://bandcamp.com/" },
  ],
  images: {
    fallbackIcon: "/sg-logo.png",
    fit: "contain",
    lookupStrategy: "wikimedia",
    lookupContext: "Skin Graft Records",
    invalidCacheValues: ["/sg-logo.png"],
  },
  searchPlaceholder: "Search Skin Graft...",
  seo: {
    title: "Skin Graft Records",
    titleTemplate: "%s | Skin Graft Records",
    description:
      "Explore Skin Graft Records: artist roster, releases, label history, and milestones.",
    keywords: [
      "Skin Graft Records",
      "noise rock",
      "experimental",
      "avant-garde",
      "independent label",
      "Chicago",
      "artists",
      "releases",
      "label history",
    ],
    siteName: "Major League Numbers",
    ogImage: "https://majorleaguenumbers.com/sg-logo.png",
    ogImageAlt: "Skin Graft Records",
    twitterImage: "https://majorleaguenumbers.com/sg-logo.png",
  },
};


export const TOUCH_GO_RECORDS_SITE: MusicSiteConfig = {
  id: "touch-go-records",
  name: "Touch & Go Records",
  shortName: "Touch & Go",
  basePath: "/touch-go-records",
  chatLabel: "ChatTGR",
  headerTitle: "Touch & Go Records",
  headerTextClass: "text-black",
  logoSrc: "/images/touch-go-records/logo.svg",
  chatIconSrc: "/images/touch-go-records/logo.svg",
  placeholderIconSrc: "/images/touch-go-records/logo.svg",
  shellClass: "touch-go-shell",
  logoClassName: "h-auto w-[85%]",
  hideHeaderTitle: true,
  description: "Touch & Go Records is a renowned independent record label founded by Corey Rusk in 1981, originally as a fanzine in Lansing, Michigan. Instrumental in shaping the hardcore and indie music scenes, the label became a pillar of American underground music.\n\nThe roster includes landmark records by Big Black, the Butthole Surfers, Slint, the Jesus Lizard, Shellac, and many more across punk, noise rock, and post-rock.\n\nKnown for its artist-friendly handshake deals and refusal to sign contracts, Touch & Go became a model for ethical independent label operations. Artists retained ownership of their masters and received a fair split.\n\nThe label's catalog spans decades of groundbreaking music, and its influence on underground culture remains immeasurable.",
  navLabels: {
    discography: "Releases",
    members: "Artists",
    sideProjects: "Related Labels",
  },
  membersSlug: "artists",
  albumsSlug: "releases",
  footerDisclaimer: "All Content, Rights, Copyrights, etc. are the property of Touch & Go Records and associated artists. This is simply a fan site.",
  sources: [
    { label: "Official Website", url: "https://touchandgorecords.com/" },
    { label: "Discogs", url: "https://www.discogs.com/label/819-Touch-And-Go" },
    { label: "Wikipedia", url: "https://en.wikipedia.org/wiki/Touch_and_Go_Records" },
  ],
  imageSources: [
    { label: "Official Photo Archive", url: "https://touchandgorecords.com/photos/index.php" },
  ],
  images: {
    fallbackIcon: "/images/touch-go-records/logo.svg",
    fit: "contain",
    lookupStrategy: "discogs",
    invalidCacheValues: ["/images/touch-go-records/logo.svg"],
  },
  searchPlaceholder: "Search Touch & Go...",
  seo: {
    title: "Touch & Go Records",
    titleTemplate: "%s | Touch & Go Records",
    description: "Discover Touch & Go Records: artist roster, releases, history, and milestones.",
    keywords: ["Touch & Go Records", "independent label", "hardcore", "post-hardcore", "indie music"],
    siteName: "Major League Numbers",
    ogImage: "https://majorleaguenumbers.com/images/touch-go-records/logo.svg",
    ogImageAlt: "Touch & Go Records",
    twitterImage: "https://majorleaguenumbers.com/images/touch-go-records/logo.svg",
  },
};



export const SLAP_A_HAM_RECORDS_SITE: MusicSiteConfig = {
  id: "slap-a-ham-records",
  name: "Slap-A-Ham Numbers",
  shortName: "Slap-A-Ham",
  basePath: "/slap-a-ham-records",
  chatLabel: "ChatHam",
  headerTitle: "Slap-A-Ham Numbers",
  headerTextClass: "text-black",
  logoSrc: "/images/slap-a-ham-records/logo.jpg",
  chatIconSrc: "/images/slap-a-ham-records/logo.jpg",
  placeholderIconSrc: "/images/slap-a-ham-records/logo.jpg",
  shellClass: "slap-a-ham-shell",
  logoClassName: "h-auto w-[60%]",
  hideHeaderTitle: true,
  description: "Slap-A-Ham Records was an independent record label founded by Chris Dodge in 1989 in San Francisco. A pioneering force in hardcore punk, powerviolence, and grindcore, the label became essential to the West Coast underground.\n\nThe roster included Spazz, Crossed Out, No Comment, Infest, and Man Is the Bastard — bands that defined the sound of powerviolence.\n\nDodge, also a member of Spazz and Lack of Interest, ran the label as a true DIY operation, pressing vinyl in tiny runs and booking bands through underground networks.\n\nSlap-A-Ham ceased operations in 2002 due to financial struggles, but its catalog remains a touchstone for extreme punk and the movement it helped define.",
  navLabels: {
    discography: "Releases",
    members: "Artists",
    sideProjects: "Related Labels",
  },
  membersSlug: "artists",
  albumsSlug: "releases",
  footerDisclaimer: "All Content, Rights, Copyrights, etc. are the property of Chris Dodge and Slap-A-Ham Records. This is simply a fan site.",
  sources: [
    { label: "Wikipedia", url: "https://en.wikipedia.org/wiki/Slap-a-Ham_Records" },
    { label: "MusicBrainz", url: "https://musicbrainz.org/label/43fea7a2-8d22-4767-aa3a-589806823e4d" },
  ],
  imageSources: [
    { label: "Wikipedia", url: "https://upload.wikimedia.org/wikipedia/en/thumb/2/2a/SlapAHamRecords.jpg/250px-SlapAHamRecords.jpg" },
  ],
  images: {
    fallbackIcon: "/images/slap-a-ham-records/logo.jpg",
    fit: "contain",
    lookupStrategy: "discogs",
    invalidCacheValues: ["/images/slap-a-ham-records/logo.jpg"],
  },
  searchPlaceholder: "Search Slap-A-Ham...",
  seo: {
    title: "Slap-A-Ham Records",
    titleTemplate: "%s | Slap-A-Ham Records",
    description: "Explore Slap-A-Ham Records: artist roster, releases, label history, and milestones.",
    keywords: ["Slap-A-Ham Records", "hardcore punk", "powerviolence", "grindcore"],
    siteName: "Major League Numbers",
    ogImage: "https://majorleaguenumbers.com/images/slap-a-ham-records/logo.jpg",
    ogImageAlt: "Slap-A-Ham Records",
    twitterImage: "https://majorleaguenumbers.com/images/slap-a-ham-records/logo.jpg",
  },
};


export const SLAP_A_HAM_NUMBERS_SITE: MusicSiteConfig = {
  id: "slap-a-ham-numbers",
  name: "Slap-A-Ham Numbers",
  shortName: "Slap-A-Ham",
  basePath: "/slap-a-ham-numbers",
  chatLabel: "ChatSlapAHam",
  headerTitle: "Slap-A-Ham Numbers",
  headerTextClass: "text-black",
  logoSrc: "/images/slap-a-ham-numbers/logo.jpg",
  chatIconSrc: "/images/slap-a-ham-numbers/logo.jpg",
  placeholderIconSrc: "/images/slap-a-ham-numbers/logo.jpg",
  shellClass: "slap-a-ham-shell",
  logoClassName: "h-auto w-[13%]",
  description: "Slap-A-Ham Records was an influential independent record label based in San Francisco, founded in 1989 by Chris Dodge. A cornerstone of the underground music scene, the label became synonymous with powerviolence and grindcore.\n\nThe catalog includes essential records by Spazz, Crossed Out, No Comment, Infest, and Capitalist Casualties — some of the most intense music ever committed to vinyl.\n\nDodge ran the operation with uncompromising DIY principles, keeping prices low and pressing runs small. The label's compilation series and split 7-inches helped connect a global network of extreme punk bands.\n\nSlap-A-Ham officially shut down in 2002 due to financial difficulties, but its legacy endures as a blueprint for independent punk labels.",
  navLabels: {
    discography: "Releases",
    members: "Artists",
    sideProjects: "Related Labels",
  },
  membersSlug: "artists",
  albumsSlug: "releases",
  footerDisclaimer: "All Content, Rights, Copyrights, etc. are the property of Chris Dodge and Slap-A-Ham Records. This is simply a fan site.",
  sources: [
    { label: "Discogs", url: "https://www.discogs.com/label/34315-Slap-A-Ham-Records" },
    { label: "MusicBrainz", url: "https://musicbrainz.org/label/43fea7a2-8d22-4767-aa3a-589806823e4d" },
    { label: "Wikipedia", url: "https://en.wikipedia.org/wiki/Slap-a-Ham_Records" },
  ],
  imageSources: [
    { label: "Wikipedia", url: "https://upload.wikimedia.org/wikipedia/en/thumb/2/2a/SlapAHamRecords.jpg/250px-SlapAHamRecords.jpg" },
  ],
  images: {
    fallbackIcon: "/images/slap-a-ham-numbers/logo.jpg",
    fit: "contain",
    lookupStrategy: "discogs",
    invalidCacheValues: ["/images/slap-a-ham-numbers/logo.jpg"],
  },
  searchPlaceholder: "Search Slap-A-Ham...",
  seo: {
    title: "Slap-A-Ham Records",
    titleTemplate: "%s | Slap-A-Ham Records",
    description: "Explore Slap-A-Ham Records: artist roster, releases, label history, and milestones.",
    keywords: ["Slap-A-Ham Records", "hardcore punk", "powerviolence", "grindcore"],
    siteName: "Major League Numbers",
    ogImage: "https://majorleaguenumbers.com/images/slap-a-ham-numbers/logo.jpg",
    ogImageAlt: "Slap-A-Ham Records",
    twitterImage: "https://majorleaguenumbers.com/images/slap-a-ham-numbers/logo.jpg",
  },
};



export const JAWBOX_SITE: MusicSiteConfig = {
  id: "jawbox",
  name: "Jawbox",
  shortName: "Jawbox",
  basePath: "/jawbox",
  chatLabel: "ChatJawbox",
  headerTitle: "Jawbox",
  headerTextClass: "text-black",
  logoSrc: "/images/jawbox/logo.png",
  chatIconSrc: "/images/jawbox/logo.png",
  placeholderIconSrc: "/images/jawbox/logo.png",
  shellClass: "jawbox-shell",
  logoClassName: "h-auto w-[70%]",
  hideHeaderTitle: true,
  description: "Jawbox was an American post-hardcore band from Washington, D.C., formed in 1989 by J. Robbins, Kim Coletta, and Adam Wade. Known for their intricate guitar interplay, angular rhythms, and insightful lyrics, they gained prominence in the '90s.\n\nThe band released albums on both Dischord Records and Atlantic, navigating the indie-to-major transition with their artistic integrity intact.\n\nTheir records — including Grippe, Novelty, For Your Own Special Sweetheart, and the self-titled Jawbox — helped define the sound of '90s post-hardcore and earned them a devoted following.\n\nAfter disbanding in 1997, they reunited in 2009 for select performances. Robbins went on to produce dozens of influential records and front the band Burning Airlines.",
  navLabels: {
    discography: "Releases",
    members: "Members",
    sideProjects: "Side Projects",
  },
  membersSlug: "artists",
  albumsSlug: "releases",
  footerDisclaimer: "All Content, Rights, Copyrights, etc. are the property of the respective owners. This is simply a fan site.",
  sources: [
    { label: "Wikipedia", url: "https://en.wikipedia.org/wiki/Jawbox" },
    { label: "Dischord Records", url: "https://dischord.com/band/jawbox" },
    { label: "MusicBrainz", url: "https://musicbrainz.org/artist/016fba14-1fc6-4986-86c2-2113ec9b28de" },
    { label: "Last.fm", url: "https://www.last.fm/music/Jawbox" },
    { label: "Spotify", url: "https://open.spotify.com/artist/0Fj0cWPHOpexJCZRdSHioP" },
    { label: "Bandcamp", url: "https://jawbox.bandcamp.com/" },
  ],
  imageSources: [
    { label: "Discogs", url: "https://www.discogs.com/" },
    { label: "YouTube", url: "https://www.youtube.com/" },
  ],
  images: {
    fallbackIcon: "/images/jawbox/logo.png",
    fit: "contain",
    lookupStrategy: "discogs",
    invalidCacheValues: ["/images/jawbox/logo.png"],
  },
  searchPlaceholder: "Search Jawbox...",
  seo: {
    title: "Jawbox - Discography and History",
    titleTemplate: "%s | Jawbox - Discography and History",
    description: "Explore Jawbox's releases, band history, and member details of the influential post-hardcore band from DC.",
    keywords: ["Jawbox", "post-hardcore", "DC music scene"],
    siteName: "Major League Numbers",
    ogImage: "https://majorleaguenumbers.com/images/jawbox/logo.png",
    ogImageAlt: "Jawbox - Discography and History",
    twitterImage: "https://majorleaguenumbers.com/images/jawbox/logo.png",
  },
};

export const MUSIC_SITES = [
  GBV_SITE,
  AMREP_SITE,
  REVELATION_SITE,
  E6_SITE,
  SKINGRAFT_SITE,
  TOUCH_GO_RECORDS_SITE,
  SLAP_A_HAM_RECORDS_SITE,
  SLAP_A_HAM_NUMBERS_SITE,
  JAWBOX_SITE,
] as const;

export type MusicSiteId = (typeof MUSIC_SITES)[number]["id"];

export const SITE_URL = "https://majorleaguenumbers.com";

export function getMusicSites(): MusicSiteConfig[] {
  return [...MUSIC_SITES];
}

export function getMusicSiteById(id: MusicSiteId): MusicSiteConfig {
  return MUSIC_SITES.find((site) => site.id === id) ?? GBV_SITE;
}

export function getMusicSiteFromPathname(
  pathname?: string | null,
): MusicSiteConfig {
  if (!pathname) return GBV_SITE;
  const match = MUSIC_SITES.find((site) => pathname.startsWith(site.basePath));
  return match ?? GBV_SITE;
}

export function isMusicSiteRoute(pathname?: string | null): boolean {
  if (!pathname) return false;
  return MUSIC_SITES.some((site) => pathname.startsWith(site.basePath));
}

export function createSiteMetadata(site: MusicSiteConfig): Metadata {
  return {
    title: {
      default: site.seo.title,
      template: site.seo.titleTemplate ?? `%s | ${site.seo.title}`,
    },
    description: site.seo.description,
    metadataBase: new URL(SITE_URL),
    alternates: {
      canonical: site.basePath,
    },
    keywords: site.seo.keywords,
    authors: [{ name: site.seo.title }],
    openGraph: {
      title: site.seo.title,
      description: site.seo.description,
      url: `${SITE_URL}${site.basePath}`,
      siteName: site.seo.siteName ?? site.seo.title,
      locale: "en_US",
      type: "website",
      images: [
        {
          url: site.seo.ogImage,
          width: 1200,
          height: 630,
          alt: site.seo.ogImageAlt,
        },
      ],
    },
    twitter: {
      card: "summary_large_image",
      title: site.seo.title,
      description: site.seo.description,
      images: [site.seo.twitterImage ?? site.seo.ogImage],
    },
  };
}

export function getSiteJsonLd(site: MusicSiteConfig) {
  return {
    "@context": "https://schema.org",
    "@type": "WebSite",
    name: site.seo.title,
    url: `${SITE_URL}${site.basePath}`,
    description: site.seo.description,
    potentialAction: {
      "@type": "SearchAction",
      target: {
        "@type": "EntryPoint",
        urlTemplate: `${SITE_URL}${site.basePath}/search?q={search_term_string}`,
      },
      "query-input": "required name=search_term_string",
    },
  };
}
