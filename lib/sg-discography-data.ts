// Skin Graft Records Discography Data
// Source: Discogs (label #33275), verified against skingraftrecords.com
// Catalog numbers are official GR### numbers

import { getSgLocalReleaseImage } from "./sg-local-images";

export interface SgRelease {
  catalogNumber: number;
  artist: string;
  title: string;
  year: number;
  format?: string;
  isReissue?: boolean;
}

// Remote Discogs thumbnail URLs removed — all signed URLs expired (403).
// All working releases now have local images via download script.
export const sgReleaseImages: Record<number, string> = {};

// Get image URL for a release (prefer local, fall back to remote)
export function getSgReleaseImageUrl(catalogNumber: number): string | undefined {
  return getSgLocalReleaseImage(catalogNumber) ?? sgReleaseImages[catalogNumber];
}

export const sgDiscography: SgRelease[] = [
  // ─── 1991–1993: Early 7"s ───
  { catalogNumber: 1, artist: "Dazzling Killmen / Mother's Day", title: "Split", year: 1991, format: "7\"" },
  { catalogNumber: 2, artist: "Strangulated Beatoffs", title: "Porky the Pig and Bess", year: 1992, format: "2x7\"" },
  { catalogNumber: 3, artist: "Dazzling Killmen", title: "Medicine Me", year: 1993, format: "7\"" },
  { catalogNumber: 4, artist: "Fruitcake", title: "Patty Lane / Story of Life", year: 1993, format: "7\"" },
  { catalogNumber: 5, artist: "Mount Shasta", title: "Nodule", year: 1993, format: "7\"" },
  { catalogNumber: 6, artist: "Mama Tick", title: "Horsedoctor", year: 1993, format: "7\"" },
  { catalogNumber: 7, artist: "Shorty", title: "Kaput!", year: 1993, format: "7\"" },
  { catalogNumber: 8, artist: "Dazzling Killmen", title: "Lounge Ax", year: 1993, format: "Cassette" },
  { catalogNumber: 9, artist: "Zeni Geva", title: "Autofuck", year: 1993, format: "7\"" },
  { catalogNumber: 10, artist: "Space Streakings", title: "Sexual Aesthetic Salon After School", year: 1993, format: "7\"" },

  // ─── 1994: Full-lengths begin ───
  { catalogNumber: 11, artist: "UFO or Die", title: "Shock Shoppers", year: 1994, format: "7\"" },
  { catalogNumber: 12, artist: "Dazzling Killmen", title: "Face of Collapse", year: 1994, format: "LP" },
  { catalogNumber: 13, artist: "Mount Shasta", title: "Put the Creep On", year: 1994, format: "LP" },
  { catalogNumber: 14, artist: "Shorty", title: "Fresh Breath EP", year: 1994, format: "10\"" },
  { catalogNumber: 15, artist: "Brise-Glace", title: "In Sisters All and Felony", year: 1994, format: "7\"" },
  { catalogNumber: 16, artist: "Denison Kimball Trio", title: "Walls in the City", year: 1994, format: "LP" },
  { catalogNumber: 17, artist: "Brise-Glace", title: "When in Vanitas...", year: 1994, format: "LP" },
  { catalogNumber: 18, artist: "Space Streakings", title: "7-Toku", year: 1994, format: "LP" },

  // ─── 1995–1996 ───
  { catalogNumber: 19, artist: "U.S. Maple", title: "Stuck", year: 1995, format: "7\"" },
  { catalogNumber: 20, artist: "Yona-Kit", title: "Yona-Kit", year: 1995, format: "LP" },
  { catalogNumber: 22, artist: "Denison Kimball Trio", title: "Soul Machine", year: 1995, format: "LP" },
  { catalogNumber: 23, artist: "Big'n", title: "Discipline Through Sound", year: 1996, format: "LP" },
  { catalogNumber: 24, artist: "Melt-Banana", title: "It's in the Pillcase", year: 1995, format: "7\"" },
  { catalogNumber: 25, artist: "Various Artists", title: "Sides 1-4", year: 1995, format: "2x7\"" },
  { catalogNumber: 26, artist: "Various Artists", title: "Sides 5-6", year: 1997, format: "7\"" },
  { catalogNumber: 27, artist: "Various Artists", title: "Sides 7-10", year: 1998, format: "2x7\"" },
  { catalogNumber: 28, artist: "Various Artists", title: "Sides 11-14", year: 2008, format: "7\"" },
  { catalogNumber: 31, artist: "Mount Shasta", title: "Who's the Hottie?", year: 1995, format: "LP" },
  { catalogNumber: 32, artist: "Space Streakings", title: "Taco Beya", year: 1996, format: "7\"" },
  { catalogNumber: 33, artist: "U.S. Maple", title: "Long Hair in Three Stages", year: 1995, format: "LP" },
  { catalogNumber: 34, artist: "Melt-Banana", title: "Scratch or Stitch", year: 1996, format: "LP" },
  { catalogNumber: 35, artist: "Shakuhachi Surprise", title: "Space Streakings Sighted Over Mount Shasta", year: 1996, format: "LP" },
  { catalogNumber: 36, artist: "Dazzling Killmen", title: "Recuerda", year: 1996, format: "CD" },
  { catalogNumber: 37, artist: "The Flying Luttenbachers", title: "Revenge", year: 1996, format: "LP" },
  { catalogNumber: 38, artist: "You Fantastic!", title: "Riddler EP", year: 1996, format: "CD" },

  // ─── 1997–1999 ───
  { catalogNumber: 39, artist: "Lake of Dracula", title: "Lake of Dracula", year: 1997, format: "LP" },
  { catalogNumber: 40, artist: "Zeni Geva", title: "Nai-Ha", year: 1996, format: "LP" },
  { catalogNumber: 42, artist: "You Fantastic!", title: "Pals", year: 1997, format: "CD" },
  { catalogNumber: 43, artist: "Colossamite", title: "All Lingo's Clamor", year: 1997, format: "CD" },
  { catalogNumber: 44, artist: "U.S. Maple", title: "Sang Phat Editor", year: 1997, format: "LP" },
  { catalogNumber: 45, artist: "Ruins", title: "Refusal Fossil", year: 1997, format: "CD" },
  { catalogNumber: 46, artist: "The Flying Luttenbachers", title: "Gods of Chaos", year: 1997, format: "CD" },
  { catalogNumber: 47, artist: "Zeek Sheck", title: "I Love You", year: 1998, format: "CD" },
  { catalogNumber: 48, artist: "Colossamite", title: "Camera Within", year: 1998, format: "CD" },
  { catalogNumber: 49, artist: "Strangulated Beatoffs", title: "Beating Off All Over the World", year: 1998, format: "LP" },
  { catalogNumber: 50, artist: "Various Artists", title: "Camp Skin Graft: Now Wave!", year: 1997, format: "CD" },
  { catalogNumber: 51, artist: "The Flying Luttenbachers", title: "Destroy All Music", year: 1998, format: "CD" },
  { catalogNumber: 52, artist: "Mount Shasta", title: "Watch Out", year: 1998, format: "LP" },
  { catalogNumber: 53, artist: "Zeek Sheck", title: "Good Luck Suckers", year: 1998, format: "CD" },
  { catalogNumber: 54, artist: "Flossie and the Unicorns", title: "L M N O P", year: 1998, format: "CD" },
  { catalogNumber: 55, artist: "Colossamite", title: "Economy of Motion", year: 1998, format: "LP" },
  { catalogNumber: 56, artist: "You Fantastic!", title: "Homesickness", year: 1998, format: "CD" },
  { catalogNumber: 57, artist: "Quintron", title: "These Hands of Mine", year: 1998, format: "LP" },
  { catalogNumber: 58, artist: "Various Artists", title: "Engine Engine Number 9", year: 1998, format: "Cassette" },
  { catalogNumber: 59, artist: "Zeek Sheck", title: "Good Luck Remix", year: 2000, format: "LP" },
  { catalogNumber: 60, artist: "Arab on Radar", title: "Soak the Saddle", year: 2000, format: "LP" },
  { catalogNumber: 61, artist: "The Flying Luttenbachers", title: "...The Truth Is a Fucking Lie...", year: 1999, format: "CD" },

  // ─── 2000–2005 ───
  { catalogNumber: 62, artist: "Cheer-Accident", title: "Salad Days", year: 2000, format: "CD" },
  { catalogNumber: 63, artist: "Flossie and the Unicorns", title: "The Animals' Clubhouse", year: 2003, format: "LP" },
  { catalogNumber: 65, artist: "Q Electronics", title: "Drum Buddy Demonstration Record Vol. 1", year: 2001, format: "LP" },
  { catalogNumber: 66, artist: "Arab on Radar", title: "Yahweh or the Highway", year: 2001, format: "LP" },
  { catalogNumber: 67, artist: "Cheer-Accident", title: "Gumballhead the Cat", year: 2003, format: "CD" },
  { catalogNumber: 68, artist: "Ruins", title: "1986-1992", year: 2002, format: "CD" },
  { catalogNumber: 69, artist: "The Chinese Stars", title: "Turbo Mattress", year: 2003, format: "CD" },
  { catalogNumber: 70, artist: "Gorge Trio", title: "Open Mouth, O Wisp", year: 2004, format: "CD" },
  { catalogNumber: 71, artist: "Cheer-Accident", title: "Introducing Lemon", year: 2003, format: "CD" },
  { catalogNumber: 72, artist: "Quintron", title: "The Frog Tape", year: 2005, format: "LP" },
  { catalogNumber: 73, artist: "Point Line Plane", title: "Smoke Signals", year: 2004, format: "CD" },
  { catalogNumber: 74, artist: "Yowie", title: "Cryptooology", year: 2004, format: "CD" },
  { catalogNumber: 75, artist: "High on Fire / Ruins", title: "Brother in the Wind / Gwodhunqa", year: 2005, format: "7\"" },
  { catalogNumber: 76, artist: "Ruins", title: "Vrresto", year: 2004, format: "CD" },
  { catalogNumber: 77, artist: "Made in Mexico", title: "Zodiac Zoo", year: 2005, format: "LP" },
  { catalogNumber: 78, artist: "Koenjihyakkei", title: "Angherr Shisspa", year: 2005, format: "CD" },
  { catalogNumber: 79, artist: "Ruins", title: "Pallaschtom", year: 2005, format: "CD" },
  { catalogNumber: 80, artist: "Various Artists", title: "The Blueghost Party Favor", year: 2005, format: "CD" },

  // ─── 2006–2010 ───
  { catalogNumber: 81, artist: "AIDS Wolf", title: "The Lovvers LP", year: 2006, format: "LP" },
  { catalogNumber: 82, artist: "Holy Smokes", title: "Talk to Your Kids About Gangs", year: 2006, format: "CD" },
  { catalogNumber: 83, artist: "Koenjihyakkei", title: "Viva Koenji!!", year: 2006, format: "CD", isReissue: true },
  { catalogNumber: 84, artist: "AIDS Wolf / Athletic Automaton", title: "Clash of the Life-Force Warriors", year: 2006, format: "LP" },
  { catalogNumber: 85, artist: "The Flying Luttenbachers", title: "Destroy All Music Revisited", year: 2007, format: "CD", isReissue: true },
  { catalogNumber: 86, artist: "The Chinese Stars", title: "Listen to Your Left Brain", year: 2007, format: "LP" },
  { catalogNumber: 87, artist: "Ruins", title: "Refusal Fossil Special Edition", year: 2007, format: "CD", isReissue: true },
  { catalogNumber: 88, artist: "Athletic Automaton", title: "A Journey Through Roman's Empire", year: 2007, format: "CD" },
  { catalogNumber: 89, artist: "Pre", title: "Epic Fits", year: 2007, format: "CD" },
  { catalogNumber: 90, artist: "Koenjihyakkei", title: "Hundred Sights of Koenji", year: 2008, format: "CD", isReissue: true },
  { catalogNumber: 91, artist: "AIDS Wolf", title: "Cities of Glass", year: 2008, format: "CD" },
  { catalogNumber: 92, artist: "Made in Mexico", title: "Guerillaton", year: 2008, format: "LP" },
  { catalogNumber: 93, artist: "Gay Beast", title: "Second Wave", year: 2009, format: "LP" },
  { catalogNumber: 94, artist: "Pre", title: "Hope Freaks", year: 2009, format: "LP" },
  { catalogNumber: 95, artist: "Koenjihyakkei", title: "Nivraym", year: 2009, format: "CD", isReissue: true },
  { catalogNumber: 96, artist: "AIDS Wolf", title: "Dustin' Off the Sphynx", year: 2009, format: "7\"" },
  { catalogNumber: 97, artist: "Pre", title: "Third Album", year: 2011, format: "7\"" },
  { catalogNumber: 98, artist: "Gay Beast", title: "Charm", year: 2009, format: "7\"" },
  { catalogNumber: 99, artist: "AIDS Wolf", title: "March to the Sea", year: 2010, format: "LP" },
  { catalogNumber: 100, artist: "Ruins Alone", title: "Ruins Alone", year: 2011, format: "LP" },
  { catalogNumber: 101, artist: "Gay Beast", title: "To Smithereens", year: 2010, format: "LP" },

  // ─── 2011–2015 ───
  { catalogNumber: 102, artist: "Korekyojinn", title: "Tundra", year: 2011, format: "CD" },
  { catalogNumber: 103, artist: "Satanized", title: "Technical Virginity", year: 2011, format: "LP" },
  { catalogNumber: 104, artist: "Koenjihyakkei", title: "Live at Koenji High", year: 2011, format: "DVD" },
  { catalogNumber: 105, artist: "Chrome Jackson", title: "Chrome Forest", year: 2012, format: "CD" },
  { catalogNumber: 106, artist: "Doomsday Student", title: "A Jumper's Handbook", year: 2012, format: "CD" },
  { catalogNumber: 107, artist: "Xaddax", title: "Counterclockwork", year: 2012, format: "LP" },
  { catalogNumber: 108, artist: "Lovely Little Girls", title: "Cleaning the Filth from a Delicate Frame", year: 2012, format: "LP" },
  { catalogNumber: 109, artist: "Yowie", title: "Damning with Faint Praise", year: 2012, format: "LP" },
  { catalogNumber: 111, artist: "Athletic Automaton", title: "5 Days in Africa", year: 2013, format: "CD" },
  { catalogNumber: 112, artist: "Sax Ruins", title: "Blimmguass", year: 2013, format: "CD" },
  { catalogNumber: 113, artist: "Strangulated Beatoffs", title: "The Beatoffs", year: 2014, format: "LP" },
  { catalogNumber: 114, artist: "Child Abuse", title: "Trouble in Paradise", year: 2014, format: "LP" },
  { catalogNumber: 115, artist: "Arab on Radar", title: "The Yahweh or the Highway Sessions", year: 2016, format: "7\"" },

  // ─── 2016–2018 ───
  { catalogNumber: 116, artist: "Doomsday Student", title: "A Walk Through Hysteria Park", year: 2014, format: "CD" },
  { catalogNumber: 117, artist: "Cellular Chaos", title: "Diamond Teeth Clenched", year: 2016, format: "LP" },
  { catalogNumber: 118, artist: "Lovely Little Girls", title: "Glistening Vivid Splash", year: 2016, format: "LP" },
  { catalogNumber: 119, artist: "Doomsday Student", title: "A Self-Help Tragedy", year: 2016, format: "CD" },
  { catalogNumber: 120, artist: "Dazzling Killmen", title: "Face of Collapse", year: 2016, format: "LP", isReissue: true },
  { catalogNumber: 121, artist: "The Flying Luttenbachers", title: "Revenge", year: 2017, format: "LP", isReissue: true },
  { catalogNumber: 122, artist: "Yowie", title: "Synchromysticism", year: 2017, format: "LP" },
  { catalogNumber: 123, artist: "Cheer-Accident", title: "Salad Days", year: 2017, format: "LP", isReissue: true },
  { catalogNumber: 124, artist: "Cheer-Accident", title: "Trading Balloons", year: 2017, format: "CD", isReissue: true },
  { catalogNumber: 125, artist: "Xaddax / My Name Is Rar-Rar", title: "Ripper / Mr. Deer", year: 2018, format: "7\"" },
  { catalogNumber: 126, artist: "My Name Is Rar-Rar / Xaddax", title: "Mr. Deer / Ripper", year: 2018, format: "7\"" },
  { catalogNumber: 127, artist: "Cheer-Accident", title: "Fades", year: 2018, format: "LP" },
  { catalogNumber: 128, artist: "Koenjihyakkei", title: "Dhorimviskha", year: 2018, format: "CD" },
  { catalogNumber: 129, artist: "Space Streakings", title: "First Love", year: 2018, format: "CD", isReissue: true },

  // ─── 2019–2020 ───
  { catalogNumber: 130, artist: "Psychic Graveyard", title: "Dead in Different Places", year: 2019, format: "CD" },
  { catalogNumber: 131, artist: "Various Artists", title: "Post Now: Round One", year: 2019, format: "CD" },
  { catalogNumber: 132, artist: "Skryptor", title: "Luminous Volumes", year: 2019, format: "LP" },
  { catalogNumber: 133, artist: "Psychic Graveyard", title: "Loud as Laughter (Single)", year: 2019, format: "CD" },
  { catalogNumber: 134, artist: "Psychic Graveyard", title: "Loud as Laughter", year: 2019, format: "LP" },
  { catalogNumber: 135, artist: "Psychic Graveyard", title: "The Next World EP", year: 2019, format: "CD" },
  { catalogNumber: 136, artist: "Koenjihyakkei", title: "Angherr Shisspa Revisited", year: 2019, format: "LP", isReissue: true },
  { catalogNumber: 137, artist: "Child Abuse", title: "Imaginary Enemy", year: 2019, format: "LP" },
  { catalogNumber: 138, artist: "Tijuana Hercules", title: "Mudslod & the Singles", year: 2021, format: "LP" },
  { catalogNumber: 139, artist: "Terms", title: "Hoarder of Operations", year: 2020, format: "CD" },
  { catalogNumber: 140, artist: "Psychic Graveyard", title: "Cheap Casket", year: 2020, format: "CD" },
  { catalogNumber: 141, artist: "Tijuana Hercules", title: "Evening Dressings", year: 2020, format: "CD" },
  { catalogNumber: 142, artist: "Terms", title: "Asbestos Mouth", year: 2020, format: "CD" },
  { catalogNumber: 143, artist: "AIDS Wolf", title: "Ma Vie Banale Avant-Garde", year: 2020, format: "CD" },
  { catalogNumber: 144, artist: "AIDS Wolf", title: "Very Friendly", year: 2020, format: "CD" },
  { catalogNumber: 145, artist: "Cheer-Accident", title: "Fringements One", year: 2020, format: "CD" },

  // ─── 2022–2023 ───
  { catalogNumber: 146, artist: "Cheer-Accident", title: "Here Comes the Sunset", year: 2022, format: "LP" },
  { catalogNumber: 147, artist: "Koenjihyakkei", title: "Nivraym Revisited", year: 2023, format: "CD", isReissue: true },
  { catalogNumber: 148, artist: "Psychic Graveyard / USA Nails", title: "Split", year: 2022, format: "LP" },
  { catalogNumber: 149, artist: "Terms", title: "All Becomes Indistinct", year: 2023, format: "LP" },
  { catalogNumber: 150, artist: "Various Artists", title: "Sounds to Make You Shudder!", year: 2022, format: "CD" },
  { catalogNumber: 151, artist: "Pili Coït", title: "Love Everywhere", year: 2022, format: "LP" },
  { catalogNumber: 152, artist: "Cheer-Accident", title: "Fringements Two", year: 2023, format: "CD" },
  { catalogNumber: 153, artist: "Lovely Little Girls", title: "Effusive Supreme", year: 2023, format: "LP" },

  // ─── 2024 ───
  { catalogNumber: 154, artist: "Cuntroaches", title: "Cuntroaches", year: 2024, format: "LP" },
  { catalogNumber: 155, artist: "Squid Pisser", title: "Vaporize a Neighbor", year: 2024, format: "7\"" },
  { catalogNumber: 156, artist: "Squid Pisser", title: "Vaporize a Tadpole", year: 2024, format: "CD" },
  { catalogNumber: 157, artist: "Hyper Gal", title: "Pure", year: 2024, format: "CD", isReissue: true },
  { catalogNumber: 158, artist: "Upright Forms", title: "Blurred Wires", year: 2024, format: "LP" },
  { catalogNumber: 159, artist: "Buñuel", title: "Mansuetude", year: 2024, format: "LP" },
  { catalogNumber: 160, artist: "Squid Pisser", title: "Dreams of Puke", year: 2024, format: "CD" },
  { catalogNumber: 161, artist: "Hyper Gal", title: "After Image", year: 2024, format: "LP" },

  // ─── 2025 ───
  { catalogNumber: 162, artist: "Pili Coït / Yowie", title: "Split", year: 2025, format: "7\"" },
  { catalogNumber: 163, artist: "Koenjihyakkei", title: "Live at Club Goodman", year: 2025, format: "2xLP" },
  { catalogNumber: 164, artist: "Cheer-Accident", title: "Admission", year: 2025, format: "LP" },
  { catalogNumber: 165, artist: "Yowie", title: "Taking Umbrage", year: 2025, format: "LP" },
  { catalogNumber: 166, artist: "Dazzling Killmen", title: "Dig Out the Switch", year: 2025, format: "LP", isReissue: true },
];

// Get all releases
export function getAllSgReleases(): SgRelease[] {
  return sgDiscography;
}

// Get releases by year
export function getSgReleasesByYear(year: number): SgRelease[] {
  return sgDiscography.filter((r) => r.year === year);
}

// Get release by catalog number
export function getSgReleaseByCatalogNumber(num: number): SgRelease | undefined {
  return sgDiscography.find((r) => r.catalogNumber === num);
}

// Get unique years
export function getSgReleaseYears(): number[] {
  return [...new Set(sgDiscography.map((r) => r.year))].sort((a, b) => a - b);
}

// Get unique artists
export function getSgArtists(): string[] {
  return [...new Set(sgDiscography.map((r) => r.artist))].sort();
}

// Get releases by artist
export function getSgReleasesByArtist(artist: string): SgRelease[] {
  return sgDiscography.filter((r) => r.artist.toLowerCase().includes(artist.toLowerCase()));
}
