import { getAllE6Releases, getE6ReleaseImageUrl, type E6Release } from "./e6-discography-data";

export interface E6RecordOfDay {
  catalogNumber: number;
  artist: string;
  title: string;
  year: number;
  highlight: string;
  coverUrl?: string;
}

const E6_FACTS: Record<string, string> = {
  "in the aeroplane over the sea": "Consistently ranked among the greatest albums of the 1990s; has sold over 500,000 copies despite minimal promotion.",
  "on avery island": "Neutral Milk Hotel's debut; recorded with Robert Schneider at Pet Sounds Studio in Denver.",
  "music from the unrealized film script: dusk at cubist castle": "A sprawling double album blending psychedelic pop with musique concrete tape experiments.",
  "dusk at cubist castle": "A sprawling double album blending psychedelic pop with musique concrete tape experiments.",
  "black foliage: animation music volume one": "The Olivia Tremor Control's second album, pushing sonic experimentation to new extremes.",
  "fun trick noisemaker": "The Apples in Stereo's debut LP, produced by Robert Schneider at Pet Sounds Studio.",
  "tone soul evolution": "Expanded the Apples' sound with lush, layered production; one of their most acclaimed records.",
  "her wallpaper reverie": "An early E6 release, showcasing the Apples in Stereo's jangly lo-fi pop.",
  "hissing fauna, are you the destroyer?": "Marked of Montreal's dramatic shift to electro-funk, inspired by Kevin Barnes's personal upheaval.",
  "satanic panic in the attic": "The album that launched of Montreal into wider recognition, praised for its lush baroque pop.",
  "the sunlandic twins": "of Montreal's first foray into electronic textures, bridging baroque pop and synth-driven experimentation.",
  "when the red king comes": "Elf Power's debut full-length, a cornerstone of the early Elephant 6 sound.",
  "a tribute to the past": "Elf Power's follow-up, deepening their hazy, psych-folk approach.",
  "first imaginary symphony for nomad": "The Music Tapes' debut; a whimsical lo-fi concept album featuring singing saws and toy instruments.",
  "science faire": "A compilation of early Apples in Stereo recordings, documenting the band's formative lo-fi days.",
};

function getE6Fact(artist: string, title: string): string | undefined {
  return E6_FACTS[title.toLowerCase()] || E6_FACTS[`${artist} - ${title}`.toLowerCase()];
}

// Convert a release to a record of the day
function toRecordOfDay(release: E6Release): E6RecordOfDay {
  return {
    catalogNumber: release.catalogNumber,
    artist: release.artist,
    title: release.title,
    year: release.year,
    highlight: getE6Fact(release.artist, release.title) || `E6 catalog #${release.catalogNumber}, released in ${release.year}.`,
    coverUrl: getE6ReleaseImageUrl(release.catalogNumber),
  };
}

export function getDailyE6Record(date?: Date): E6RecordOfDay {
  const releases = getAllE6Releases();
  const now = date || new Date();
  const utc = Date.UTC(now.getFullYear(), now.getMonth(), now.getDate());
  const epochDay = Math.floor(utc / 86400000);
  const index = epochDay % releases.length;
  return toRecordOfDay(releases[index]);
}
