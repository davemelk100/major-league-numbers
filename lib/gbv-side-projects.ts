export interface SideProjectRelease {
  title: string;
  year: number;
}

export interface SideProject {
  name: string;
  years: string;
  description: string;
  releases: SideProjectRelease[];
}

export const pollardSideProjects: SideProject[] = [
  {
    name: "Robert Pollard (solo)",
    years: "1996–present",
    description: "Extensive solo catalog ranging from lo-fi to polished power-pop.",
    releases: [
      { title: "Not in My Airforce", year: 1996 },
      { title: "Waved Out", year: 1998 },
      { title: "Fiction Man", year: 2001 },
      { title: "From a Compound Eye", year: 2006 },
      { title: "Silverfish Trivia", year: 2007 },
      { title: "Faulty Superheroes", year: 2015 },
    ],
  },
  {
    name: "Boston Spaceships",
    years: "2008–2013",
    description: "High-energy rock trio led by Pollard with a tight, punchy sound.",
    releases: [
      { title: "Brown Submarine", year: 2008 },
      { title: "The Planets Are Blasted", year: 2009 },
      { title: "Zero to 99", year: 2009 },
      { title: "The Farewell Transmission", year: 2013 },
    ],
  },
  {
    name: "Circus Devils",
    years: "2001–2018",
    description: "Dark, psychedelic collaborations with the Tobias brothers.",
    releases: [
      { title: "Ringworm Interiors", year: 2001 },
      { title: "Pinball Mars", year: 2001 },
      { title: "Gringo", year: 2004 },
      { title: "Ataxia", year: 2008 },
    ],
  },
  {
    name: "The Moping Swans",
    years: "1992–1994",
    description: "Lo-fi side project with Kim Pollard.",
    releases: [
      { title: "The Moping Swans", year: 1992 },
      { title: "The Moping Swans (2)", year: 1994 },
    ],
  },
  {
    name: "Keene Brothers",
    years: "2005–2006",
    description: "Power-pop collaboration with Tommy Keene.",
    releases: [
      { title: "Blues and Boogie Shoes", year: 2005 },
      { title: "Tulipomania", year: 2006 },
    ],
  },
  {
    name: "Psychedelic Horseshit",
    years: "2010–2012",
    description: "Garage-leaning project with a raw, buzzing edge.",
    releases: [
      { title: "Desperate Creatures", year: 2010 },
      { title: "Swampyankee", year: 2011 },
      { title: "Vegetable Oblivion", year: 2012 },
    ],
  },
];
