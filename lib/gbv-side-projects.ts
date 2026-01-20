export interface SideProjectRelease {
  title: string;
  year: number;
}

export interface SideProject {
  name: string;
  years: string;
  description: string;
  releases: SideProjectRelease[];
  discographyUrl?: string;
}

const GBVDB_BASE = "https://www.gbvdb.com/artist.asp?artistsort=";
const gbvdbUrl = (name: string) => `${GBVDB_BASE}${encodeURIComponent(name)}`;

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
    discographyUrl: gbvdbUrl("Robert Pollard"),
  },
  {
    name: "Airport 5",
    years: "2001–2005",
    description: "Tobacco‑bright power pop inspired by 1970s AM radio.",
    releases: [
      { title: "Tower in the Fountain of Sparks", year: 2001 },
      { title: "Life Starts Here", year: 2002 },
      { title: "Make the Bass Jump", year: 2004 },
    ],
    discographyUrl: gbvdbUrl("Airport 5"),
  },
  {
    name: "The Takeovers",
    years: "2001–2006",
    description: "Guitar‑driven rock side project led by Pollard.",
    releases: [
      { title: "Turn to Red", year: 2003 },
      { title: "Transmission Receiver", year: 2005 },
    ],
    discographyUrl: gbvdbUrl("The Takeovers"),
  },
  {
    name: "Howling Wolf Orchestra",
    years: "2006–2009",
    description: "Power‑pop band featuring Pollard and Todd Tobias.",
    releases: [
      { title: "Coyote Bits", year: 2006 },
      { title: "Conundrum", year: 2007 },
    ],
    discographyUrl: gbvdbUrl("Howling Wolf Orchestra"),
  },
  {
    name: "ESP Ohio",
    years: "2022–present",
    description: "Psychedelic-leaning project with Robert Pollard.",
    releases: [
      { title: "Ohio Players", year: 2022 },
    ],
    discographyUrl: gbvdbUrl("ESP Ohio"),
  },
  {
    name: "Lifeguards",
    years: "2021–present",
    description: "Recent trio with Pollard and longtime collaborators.",
    releases: [
      { title: "Crowd Can Talk", year: 2022 },
      { title: "Howlback", year: 2023 },
    ],
    discographyUrl: gbvdbUrl("Lifeguards"),
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
    discographyUrl: gbvdbUrl("Boston Spaceships"),
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
    discographyUrl: gbvdbUrl("Circus Devils"),
  },
  {
    name: "The Moping Swans",
    years: "1992–1994",
    description: "Lo-fi side project with Kim Pollard.",
    releases: [
      { title: "The Moping Swans", year: 1992 },
      { title: "The Moping Swans (2)", year: 1994 },
    ],
    discographyUrl: gbvdbUrl("Moping Swans, The"),
  },
  {
    name: "Keene Brothers",
    years: "2005–2006",
    description: "Power-pop collaboration with Tommy Keene.",
    releases: [
      { title: "Blues and Boogie Shoes", year: 2005 },
      { title: "Tulipomania", year: 2006 },
    ],
    discographyUrl: gbvdbUrl("Keene Brothers"),
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
    discographyUrl: gbvdbUrl("Psychedelic Horseshit"),
  },
  { name: "Acid Ranch", years: "—", description: "Side project featuring Robert Pollard.", releases: [], discographyUrl: gbvdbUrl("Acid Ranch") },
  { name: "Anacrusis", years: "—", description: "Side project featuring Robert Pollard.", releases: [], discographyUrl: gbvdbUrl("Anacrusis") },
  {
    name: "Bun E. Carlos (Featuring Robert Pollard)",
    years: "—",
    description: "Side project featuring Robert Pollard.",
    releases: [],
    discographyUrl: gbvdbUrl("Bun E. Carlos (Featuring Robert Pollard)"),
  },
  { name: "Carbon Whales", years: "—", description: "Side project featuring Robert Pollard.", releases: [], discographyUrl: gbvdbUrl("Carbon Whales") },
  {
    name: "Cash Rivers And The Sinners",
    years: "—",
    description: "Side project featuring Robert Pollard.",
    releases: [],
    discographyUrl: gbvdbUrl("Cash Rivers And The Sinners"),
  },
  { name: "Cosmos", years: "—", description: "Side project featuring Robert Pollard.", releases: [], discographyUrl: gbvdbUrl("Cosmos") },
  { name: "Crowd, The", years: "—", description: "Side project featuring Robert Pollard.", releases: [], discographyUrl: gbvdbUrl("Crowd, The") },
  {
    name: "Cub Scout Bowling Pins",
    years: "—",
    description: "Side project featuring Robert Pollard.",
    releases: [],
    discographyUrl: gbvdbUrl("Cub Scout Bowling Pins"),
  },
  { name: "Freedom Cruise", years: "—", description: "Side project featuring Robert Pollard.", releases: [], discographyUrl: gbvdbUrl("Freedom Cruise") },
  { name: "Go Back Snowball", years: "—", description: "Side project featuring Robert Pollard.", releases: [], discographyUrl: gbvdbUrl("Go Back Snowball") },
  { name: "Hazzard Hotrods", years: "—", description: "Side project featuring Robert Pollard.", releases: [], discographyUrl: gbvdbUrl("Hazzard Hotrods") },
  { name: "Kim Deal & Bob Pollard", years: "—", description: "Side project featuring Robert Pollard.", releases: [], discographyUrl: gbvdbUrl("Kim Deal & Bob Pollard") },
  { name: "Kuda Labranche", years: "—", description: "Side project featuring Robert Pollard.", releases: [], discographyUrl: gbvdbUrl("Kuda Labranche") },
  { name: "Lexo and the Leapers", years: "—", description: "Side project featuring Robert Pollard.", releases: [], discographyUrl: gbvdbUrl("Lexo and the Leapers") },
  { name: "Mars Classroom", years: "—", description: "Side project featuring Robert Pollard.", releases: [], discographyUrl: gbvdbUrl("Mars Classroom") },
  { name: "Nightwalker", years: "—", description: "Side project featuring Robert Pollard.", releases: [], discographyUrl: gbvdbUrl("Nightwalker") },
  { name: "Phantom Tollbooth", years: "—", description: "Side project featuring Robert Pollard.", releases: [], discographyUrl: gbvdbUrl("Phantom Tollbooth") },
  { name: "Psycho And The Birds", years: "—", description: "Side project featuring Robert Pollard.", releases: [], discographyUrl: gbvdbUrl("Psycho And The Birds") },
  {
    name: "Richard Meltzer, Robert Pollard, Smegma & Antler",
    years: "—",
    description: "Side project featuring Robert Pollard.",
    releases: [],
    discographyUrl: gbvdbUrl("Richard Meltzer, Robert Pollard, Smegma & Antler"),
  },
  { name: "Ricked Wicky", years: "—", description: "Side project featuring Robert Pollard.", releases: [], discographyUrl: gbvdbUrl("Ricked Wicky") },
  { name: "Rip Van Winkle", years: "—", description: "Side project featuring Robert Pollard.", releases: [], discographyUrl: gbvdbUrl("Rip Van Winkle") },
  {
    name: "Robert Pollard and his Soft Rock Renegades",
    years: "—",
    description: "Side project featuring Robert Pollard.",
    releases: [],
    discographyUrl: gbvdbUrl("Robert Pollard and his Soft Rock Renegades"),
  },
  {
    name: "Robert Pollard With Doug Gillard",
    years: "—",
    description: "Side project featuring Robert Pollard.",
    releases: [],
    discographyUrl: gbvdbUrl("Robert Pollard With Doug Gillard"),
  },
  { name: "Teenage Guitar", years: "—", description: "Side project featuring Robert Pollard.", releases: [], discographyUrl: gbvdbUrl("Teenage Guitar") },
  { name: "The Sunflower Logic", years: "—", description: "Side project featuring Robert Pollard.", releases: [], discographyUrl: gbvdbUrl("The Sunflower Logic") },
  { name: "We've Got Airplanes!", years: "—", description: "Side project featuring Robert Pollard.", releases: [], discographyUrl: gbvdbUrl("We've Got Airplanes!") },
];
