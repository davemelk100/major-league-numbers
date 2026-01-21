export interface GbvRecordOfDay {
  title: string;
  year: number;
  highlight: string;
}

export const gbvRecordsOfTheDay: GbvRecordOfDay[] = [
  {
    title: "Bee Thousand",
    year: 1994,
    highlight: "Lo-fi classic packed with short, catchy gems.",
  },
  {
    title: "Alien Lanes",
    year: 1995,
    highlight: "A sprawling collage of hooks and buzzed-out riffs.",
  },
  {
    title: "Under the Bushes Under the Stars",
    year: 1996,
    highlight: "Sharper production with power-pop polish.",
  },
  {
    title: "Mag Earwhig!",
    year: 1997,
    highlight: "Punchy, immediate, and full of signature GBV charm.",
  },
  {
    title: "Do the Collapse",
    year: 1999,
    highlight: "A glossy, studio-minded detour with big choruses.",
  },
  {
    title: "Class Clown Spots a UFO",
    year: 2000,
    highlight: "The band rounds up late-90s singles and surprises.",
  },
  {
    title: "Isolation Drills",
    year: 2001,
    highlight: "Power-pop anthem after power-pop anthem.",
  },
  {
    title: "Universal Truths and Cycles",
    year: 2002,
    highlight: "A punchy reset with a rawer band feel.",
  },
  {
    title: "Earthquake Glue",
    year: 2003,
    highlight: "Dense, melodic, and packed with guitar fireworks.",
  },
  {
    title: "Half Smiles of the Decomposed",
    year: 2004,
    highlight: "A warm, melodic farewell to an era.",
  },
  {
    title: "Warp and Woof",
    year: 2019,
    highlight: "A modern-era favorite with hook-heavy momentum.",
  },
  {
    title: "Surrender Your Poppy Field",
    year: 2020,
    highlight: "Bright melodies and prolific Pollard wordplay.",
  },
];

export function getDailyGbvRecord(date = new Date()): GbvRecordOfDay {
  const dateString = `${date.getFullYear()}-${date.getMonth() + 1}-${date.getDate()}`;

  let hash = 0;
  for (let i = 0; i < dateString.length; i++) {
    const char = dateString.charCodeAt(i);
    hash = (hash << 5) - hash + char;
    hash = hash & hash;
  }

  const index = Math.abs(hash) % gbvRecordsOfTheDay.length;
  return gbvRecordsOfTheDay[index];
}
