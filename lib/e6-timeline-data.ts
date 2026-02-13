// Elephant 6 Recording Company Timeline

export interface E6TimelineEvent {
  year: number;
  title: string;
  description: string;
}

export const e6Timeline: E6TimelineEvent[] = [
  {
    year: 1991,
    title: "Collective Founded",
    description: "Robert Schneider, Jeff Mangum, Will Cullen Hart, and Bill Doss form the Elephant 6 Recording Company in Ruston, Louisiana while attending Louisiana Tech University.",
  },
  {
    year: 1993,
    title: "Athens Migration",
    description: "Several E6 members begin relocating to Athens, Georgia, which becomes the collective's creative hub.",
  },
  {
    year: 1994,
    title: "Early Releases",
    description: "Neutral Milk Hotel releases the 'Everything Is' EP and Elf Power forms, marking the first wave of E6 recordings.",
  },
  {
    year: 1995,
    title: "Fun Trick Noisemaker",
    description: "The Apples in Stereo release 'Fun Trick Noisemaker'. Robert Schneider begins recording at what will become Pet Sounds Studio in Denver, Colorado.",
  },
  {
    year: 1996,
    title: "Breakthrough Year",
    description: "Neutral Milk Hotel releases 'On Avery Island' and The Olivia Tremor Control debuts with the double album 'Dusk at Cubist Castle'. The E6 sound reaches a wider audience.",
  },
  {
    year: 1997,
    title: "Creative Peak",
    description: "of Montreal, Elf Power, Beulah, and The Apples in Stereo all release albums. The collective's roster expands rapidly.",
  },
  {
    year: 1998,
    title: "Aeroplane Over the Sea",
    description: "Neutral Milk Hotel releases 'In the Aeroplane Over the Sea', which becomes one of the most acclaimed indie albums of all time. Jeff Mangum retreats from public life.",
  },
  {
    year: 1999,
    title: "Golden Era",
    description: "The Olivia Tremor Control releases 'Black Foliage', The Music Tapes debut, Dressy Bessy and Essex Green release albums. E6 is at its most prolific.",
  },
  {
    year: 2000,
    title: "OTC Hiatus",
    description: "The Olivia Tremor Control goes on hiatus. Will Cullen Hart begins working on Circulatory System.",
  },
  {
    year: 2001,
    title: "New Directions",
    description: "Major Organ and the Adding Machine supergroup project released. Circulatory System and The Sunshine Fix debut. of Montreal continues to evolve.",
  },
  {
    year: 2004,
    title: "of Montreal's Rise",
    description: "of Montreal releases 'Satanic Panic in the Attic', signaling Kevin Barnes's shift toward more experimental pop.",
  },
  {
    year: 2007,
    title: "Hissing Fauna",
    description: "of Montreal releases 'Hissing Fauna, Are You the Destroyer?', achieving critical and commercial success far beyond the E6 scene.",
  },
  {
    year: 2012,
    title: "Farewell to Bill Doss",
    description: "Bill Doss, co-founder of The Olivia Tremor Control and The Sunshine Fix, passes away on July 30 at age 43.",
  },
  {
    year: 2013,
    title: "Neutral Milk Hotel Reunion",
    description: "Neutral Milk Hotel reunites for live performances, touring extensively through 2014-2015 after Jeff Mangum's 15-year hiatus.",
  },
  {
    year: 2020,
    title: "Enduring Legacy",
    description: "'In the Aeroplane Over the Sea' continues to be celebrated as a masterpiece. E6 bands like of Montreal and Elf Power remain active. The collective's influence on indie music endures.",
  },
];

export function getAllE6TimelineEvents(): E6TimelineEvent[] {
  return e6Timeline;
}
