import { gbvAlbums } from "./gbv-discography-data";

export interface GbvRecordOfDay {
  id?: number;
  title: string;
  year: number;
  highlight: string;
  thumb?: string;
}

const GBV_FACTS: Record<string, string> = {
  "devil between my toes": "GBV's self-released debut, recorded in Pollard's basement in Dayton, Ohio.",
  "sandbox": "An early lo-fi effort, limited to a small pressing and later reissued.",
  "self-inflicted aerial nostalgia": "A transitional album showing GBV moving toward their signature fragmented pop style.",
  "same place the fly got smashed": "A dark, lo-fi classic that hinted at the brilliance to come on Bee Thousand.",
  "propeller": "Early copies featured unique hand-assembled covers, each one different.",
  "vampire on titus": "Released on Scat Records, bridging the gap between early lo-fi experiments and Bee Thousand.",
  "bee thousand": "Recorded for under $500 on a 4-track cassette recorder; widely regarded as a masterpiece of lo-fi indie rock.",
  "alien lanes": "Contains 28 tracks, making it one of the most packed indie albums of the decade.",
  "under the bushes under the stars": "The last GBV album on Matador Records, featuring higher production values than its predecessors.",
  "mag earwhig!": "Introduced Doug Gillard to the lineup, marking a shift toward a more muscular guitar sound.",
  "do the collapse": "Produced by Ric Ocasek of The Cars; GBV's major label debut on TVT Records.",
  "isolation drills": "'Glad Girls' became one of GBV's biggest radio songs.",
  "universal truths and cycles": "The last GBV album to feature Rob Schnapf as producer.",
  "earthquake glue": "Marked a return to a more stripped-down sound after the polished TVT-era albums.",
  "half smiles of the decomposed": "The final GBV album before their 2004 breakup; a bittersweet farewell.",
  "let's go eat the factory": "The first post-reunion album (2012), reuniting the classic lineup of Pollard, Sprout, Mitchell, Demos, and Fennell.",
  "class clown spots a ufo": "The second of three albums GBV released in the prolific year of 2012.",
  "the bears for lunch": "The third and final GBV album of 2012, closing out a remarkably productive reunion year.",
  "english little league": "The last album featuring the reunited classic lineup before they parted ways again.",
  "motivational jumpsuit": "One of two GBV albums released in 2014, featuring a new post-classic lineup.",
  "cool planet": "The second 2014 release; Pollard described it as the more concise of the two.",
  "please be honest": "Essentially a Pollard solo album credited to GBV, with Pollard playing nearly every instrument.",
  "august by cake": "A double album and one of the longest entries in the GBV catalog.",
  "how do you spell heaven": "The second of two GBV albums released in 2017.",
  "space gun": "Features some of GBV's most polished production work of the late 2010s.",
  "zeppelin over china": "A sprawling 32-track album, one of GBV's longest releases.",
  "warp and woof": "Described by Pollard as the rawer counterpart to Zeppelin Over China.",
  "sweating the plague": "The third GBV album released in the prolific year of 2019.",
  "surrender your poppy field": "The first of four albums GBV released in 2020.",
  "mirrored aztec": "Released during the pandemic year of 2020, the second of four albums that year.",
  "styles we paid for": "One of four GBV albums from 2020, showcasing Pollard's relentless productivity.",
  "earth man blues": "Features reworked versions of songs from previous Pollard solo recordings.",
  "it's not them. it couldn't be them. it is them!": "The second GBV album of 2021, with one of the band's longest titles.",
  "crystal nuns cathedral": "The first of three GBV albums released in 2022.",
  "tremblers and goggles by rank": "A characteristically prolific mid-2022 release.",
  "scalping the guru": "The third GBV album of 2022, continuing their tradition of multi-album years.",
  "la la land": "Shares its title with the 2016 Ryan Gosling film; released January 2023.",
  "welshpool frillies": "Named after a town in Wales; the second of three 2023 GBV albums.",
  "nowhere to go but up": "The third and final GBV album of 2023.",
  "strut of kings": "GBV's 2024 album, continuing their extraordinary post-reunion output.",
};

function getGbvFact(title: string): string | undefined {
  return GBV_FACTS[title.toLowerCase()];
}

// Pick a daily record from a list of albums
export function pickDailyGbvRecord(
  albums: Array<{ id?: number; title?: string; year?: number; thumb?: string }>,
  date = new Date()
): GbvRecordOfDay | null {
  if (!albums || albums.length === 0) return null;

  const dateString = `${date.getFullYear()}-${date.getMonth() + 1}-${date.getDate()}`;

  let hash = 0;
  for (let i = 0; i < dateString.length; i++) {
    const char = dateString.charCodeAt(i);
    hash = (hash << 5) - hash + char;
    hash = hash | 0;
  }

  const index = Math.abs(hash) % albums.length;
  const album = albums[index];
  const title = album.title || "Unknown";

  return {
    id: album.id,
    title,
    year: album.year || 0,
    highlight: getGbvFact(title) || `Released in ${album.year || "unknown year"}.`,
    thumb: album.thumb,
  };
}

// Pick a daily single from GBV singles
export function getDailyGbvSingle(date = new Date()): GbvRecordOfDay {
  const singles = gbvAlbums.filter((a) => a.releaseType === "single");
  const dateString = `${date.getFullYear()}-${date.getMonth() + 1}-${date.getDate()}-single`;

  let hash = 0;
  for (let i = 0; i < dateString.length; i++) {
    const char = dateString.charCodeAt(i);
    hash = (hash << 5) - hash + char;
    hash = hash | 0;
  }

  const index = Math.abs(hash) % singles.length;
  const album = singles[index];

  return {
    id: album.id,
    title: album.title,
    year: album.year,
    highlight: `Released in ${album.year}.`,
  };
}

// Pick a daily record from static GBV discography data
export function getDailyGbvRecord(date = new Date()): GbvRecordOfDay {
  const dateString = `${date.getFullYear()}-${date.getMonth() + 1}-${date.getDate()}`;

  let hash = 0;
  for (let i = 0; i < dateString.length; i++) {
    const char = dateString.charCodeAt(i);
    hash = (hash << 5) - hash + char;
    hash = hash | 0;
  }

  const index = Math.abs(hash) % gbvAlbums.length;
  const album = gbvAlbums[index];

  return {
    id: album.id,
    title: album.title,
    year: album.year,
    highlight: getGbvFact(album.title) || `Released in ${album.year}.`,
  };
}
