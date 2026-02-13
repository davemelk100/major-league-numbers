// Elephant 6 Recording Company Artists/Bands

export interface E6Artist {
  id: string;
  name: string;
  genre?: string;
  yearsActive?: string;
  notableReleases?: string[];
  wikipediaUrl?: string;
}

// Artist image URLs from Wikipedia / Wikimedia / Bandcamp
export const e6ArtistImages: Record<string, string> = {
  "neutral-milk-hotel":
    "https://upload.wikimedia.org/wikipedia/commons/thumb/6/6e/Neutral_Milk_Hotel_-_Pitchfork_2014_%28Jeff_Mangum%29.jpg/330px-Neutral_Milk_Hotel_-_Pitchfork_2014_%28Jeff_Mangum%29.jpg",
  "the-apples-in-stereo":
    "https://upload.wikimedia.org/wikipedia/commons/thumb/e/ea/The_Apples_in_Stereo.jpg/330px-The_Apples_in_Stereo.jpg",
  "the-olivia-tremor-control":
    "https://upload.wikimedia.org/wikipedia/en/thumb/a/a8/Olivia_Tremor_Control.jpg/250px-Olivia_Tremor_Control.jpg",
  "of-montreal":
    "https://upload.wikimedia.org/wikipedia/commons/thumb/5/55/Of_Montreal_at_Bonnaroo_2012.jpg/330px-Of_Montreal_at_Bonnaroo_2012.jpg",
  "elf-power":
    "https://upload.wikimedia.org/wikipedia/commons/thumb/6/66/Elf_Power_2007.jpg/330px-Elf_Power_2007.jpg",
  "the-music-tapes":
    "https://f4.bcbits.com/img/a2037558893_10.jpg",
  "circulatory-system":
    "https://f4.bcbits.com/img/a1655045523_10.jpg",
  "beulah":
    "https://upload.wikimedia.org/wikipedia/en/thumb/3/31/Beulah_%28band%29.jpg/250px-Beulah_%28band%29.jpg",
  "dressy-bessy":
    "https://upload.wikimedia.org/wikipedia/commons/thumb/7/78/Dressy_Bessy_2005.jpg/330px-Dressy_Bessy_2005.jpg",
  "the-gerbils":
    "https://f4.bcbits.com/img/a3106283850_10.jpg",
  "marshmallow-coast":
    "https://f4.bcbits.com/img/a1539455770_10.jpg",
  "nana-grizol":
    "https://f4.bcbits.com/img/a2461028651_10.jpg",
  "great-lakes":
    "https://f4.bcbits.com/img/a0747685666_10.jpg",
  "japancakes":
    "https://f4.bcbits.com/img/a3854946820_10.jpg",
  "the-sunshine-fix":
    "https://f4.bcbits.com/img/a2843456771_10.jpg",
  "the-minders":
    "https://f4.bcbits.com/img/a3428730143_10.jpg",
  "essex-green":
    "https://f4.bcbits.com/img/a1773613291_10.jpg",
  "half-handed-cloud":
    "https://f4.bcbits.com/img/a3067476543_10.jpg",
  "comet":
    "https://f4.bcbits.com/img/a2715309765_10.jpg",
  "summer-hymns":
    "https://f4.bcbits.com/img/a1247860025_10.jpg",
  "lil-capn-travis":
    "https://f4.bcbits.com/img/a4220192063_10.jpg",
};

// Get image URL for an artist
export function getE6ArtistImageUrl(id: string): string | undefined {
  return e6ArtistImages[id];
}

export const e6Artists: E6Artist[] = [
  {
    id: "neutral-milk-hotel",
    name: "Neutral Milk Hotel",
    yearsActive: "1989–1998, 2013–2015",
    wikipediaUrl: "https://en.wikipedia.org/wiki/Neutral_Milk_Hotel",
  },
  {
    id: "the-apples-in-stereo",
    name: "The Apples in Stereo",
    yearsActive: "1991–present",
    wikipediaUrl: "https://en.wikipedia.org/wiki/The_Apples_in_Stereo",
  },
  {
    id: "the-olivia-tremor-control",
    name: "The Olivia Tremor Control",
    yearsActive: "1992–2000, 2005–2024",
    wikipediaUrl: "https://en.wikipedia.org/wiki/The_Olivia_Tremor_Control",
  },
  {
    id: "of-montreal",
    name: "of Montreal",
    yearsActive: "1996–present",
    wikipediaUrl: "https://en.wikipedia.org/wiki/Of_Montreal",
  },
  {
    id: "elf-power",
    name: "Elf Power",
    yearsActive: "1994–present",
    wikipediaUrl: "https://en.wikipedia.org/wiki/Elf_Power",
  },
  {
    id: "the-music-tapes",
    name: "The Music Tapes",
    yearsActive: "1996–present",
    wikipediaUrl: "https://en.wikipedia.org/wiki/The_Music_Tapes",
  },
  {
    id: "circulatory-system",
    name: "Circulatory System",
    yearsActive: "2001–present",
    wikipediaUrl: "https://en.wikipedia.org/wiki/Circulatory_System",
  },
  {
    id: "beulah",
    name: "Beulah",
    yearsActive: "1996–2004",
    wikipediaUrl: "https://en.wikipedia.org/wiki/Beulah_(band)",
  },
  {
    id: "dressy-bessy",
    name: "Dressy Bessy",
    yearsActive: "1996–present",
    wikipediaUrl: "https://en.wikipedia.org/wiki/Dressy_Bessy",
  },
  {
    id: "the-gerbils",
    name: "The Gerbils",
    yearsActive: "1994–2001",
    wikipediaUrl: "https://en.wikipedia.org/wiki/The_Gerbils",
  },
  {
    id: "major-organ-and-the-adding-machine",
    name: "Major Organ and the Adding Machine",
    yearsActive: "2001",
    wikipediaUrl: "https://en.wikipedia.org/wiki/Major_Organ_and_the_Adding_Machine",
  },
  {
    id: "pipes-you-see-pipes-you-dont",
    name: "Pipes You See, Pipes You Don't",
    yearsActive: "1993–1998",
  },
  {
    id: "chocolate-usa",
    name: "Chocolate USA",
    yearsActive: "1993–1996",
  },
  {
    id: "secret-square",
    name: "Secret Square",
    yearsActive: "1989–1993",
  },
  {
    id: "marshmallow-coast",
    name: "Marshmallow Coast",
    yearsActive: "1999–present",
    wikipediaUrl: "https://en.wikipedia.org/wiki/Marshmallow_Coast",
  },
  {
    id: "great-lakes",
    name: "Great Lakes",
    yearsActive: "1997–2006",
  },
  {
    id: "japancakes",
    name: "Japancakes",
    yearsActive: "1997–present",
    wikipediaUrl: "https://en.wikipedia.org/wiki/Japancakes",
  },
  {
    id: "nana-grizol",
    name: "Nana Grizol",
    yearsActive: "2007–present",
    wikipediaUrl: "https://en.wikipedia.org/wiki/Nana_Grizol",
  },
  {
    id: "the-sunshine-fix",
    name: "The Sunshine Fix",
    yearsActive: "2001–2003",
    wikipediaUrl: "https://en.wikipedia.org/wiki/The_Sunshine_Fix",
  },
  {
    id: "the-minders",
    name: "The Minders",
    yearsActive: "1992–present",
    wikipediaUrl: "https://en.wikipedia.org/wiki/The_Minders",
  },
  {
    id: "essex-green",
    name: "Essex Green",
    yearsActive: "1998–2006",
    wikipediaUrl: "https://en.wikipedia.org/wiki/Essex_Green",
  },
  {
    id: "i-am-the-world-trade-center",
    name: "I Am the World Trade Center",
    yearsActive: "1999–2005",
    wikipediaUrl: "https://en.wikipedia.org/wiki/I_Am_the_World_Trade_Center",
  },
  {
    id: "comet",
    name: "Comet",
    yearsActive: "1996–2001",
  },
  {
    id: "lil-capn-travis",
    name: "Lil' Cap'n Travis",
    yearsActive: "1996–2003",
  },
  {
    id: "summer-hymns",
    name: "Summer Hymns",
    yearsActive: "1998–2005",
  },
  {
    id: "the-marbles",
    name: "The Marbles",
    yearsActive: "1994–1999",
  },
  {
    id: "derek-almstead",
    name: "Derek Almstead",
    yearsActive: "1997–2003",
  },
  {
    id: "nesey-gallons",
    name: "Nesey Gallons",
    yearsActive: "1996–2001",
  },
  {
    id: "the-instruments",
    name: "The Instruments",
    yearsActive: "1997–2002",
  },
  {
    id: "laminated-cat",
    name: "Laminated Cat",
    yearsActive: "1997–2001",
  },
  {
    id: "half-handed-cloud",
    name: "Half-Handed Cloud",
    yearsActive: "2000–present",
    wikipediaUrl: "https://en.wikipedia.org/wiki/Half-Handed_Cloud",
  },
  {
    id: "black-swan-network",
    name: "Black Swan Network",
    yearsActive: "1996–2001",
  },
  {
    id: "synthetic-flying-machine",
    name: "Synthetic Flying Machine",
    yearsActive: "1992–1996",
  },
  {
    id: "cranberry-lifecycle",
    name: "Cranberry Lifecycle",
    yearsActive: "1990–1993",
  },
  {
    id: "elfin-saddle",
    name: "Elfin Saddle",
    yearsActive: "2005–2012",
    wikipediaUrl: "https://en.wikipedia.org/wiki/Elfin_Saddle",
  },
  {
    id: "the-late-bp-helium",
    name: "The Late B.P. Helium",
    yearsActive: "2004–2006",
  },
  {
    id: "jeff-mangum",
    name: "Jeff Mangum",
    yearsActive: "1989–present",
    wikipediaUrl: "https://en.wikipedia.org/wiki/Jeff_Mangum",
  },
  {
    id: "robert-schneider",
    name: "Robert Schneider",
    yearsActive: "1991–present",
    wikipediaUrl: "https://en.wikipedia.org/wiki/Robert_Schneider_(musician)",
  },
  {
    id: "kevin-barnes",
    name: "Kevin Barnes",
    yearsActive: "1996–present",
    wikipediaUrl: "https://en.wikipedia.org/wiki/Kevin_Barnes",
  },
  {
    id: "julian-koster",
    name: "Julian Koster",
    yearsActive: "1993–present",
    wikipediaUrl: "https://en.wikipedia.org/wiki/Julian_Koster",
  },
  {
    id: "will-cullen-hart",
    name: "Will Cullen Hart",
    yearsActive: "1989–2024",
    wikipediaUrl: "https://en.wikipedia.org/wiki/Will_Cullen_Hart",
  },
  {
    id: "bill-doss",
    name: "Bill Doss",
    yearsActive: "1989–2012",
    wikipediaUrl: "https://en.wikipedia.org/wiki/Bill_Doss",
  },
  {
    id: "andrew-rieger",
    name: "Andrew Rieger",
    yearsActive: "1994–present",
  },
  {
    id: "bryan-poole",
    name: "Bryan Poole",
    yearsActive: "1996–present",
  },
  {
    id: "laura-carter",
    name: "Laura Carter",
    yearsActive: "1994–present",
  },
  {
    id: "dixie-blood-moustache",
    name: "Dixie Blood Moustache",
    yearsActive: "1999–2002",
  },
  {
    id: "hieronymus-firebrain",
    name: "Hieronymus Firebrain",
    yearsActive: "1997–2000",
  },
  {
    id: "the-monarchs",
    name: "The Monarchs",
    yearsActive: "1996–1999",
  },
  {
    id: "neutral-milk-hotel-tribute",
    name: "Tall Dwarfs",
    yearsActive: "1981–2006",
    wikipediaUrl: "https://en.wikipedia.org/wiki/Tall_Dwarfs",
  },
  {
    id: "orange-twin-field-works",
    name: "Orange Twin Field Works",
    yearsActive: "2002–2010",
  },
];

export function getAllE6Artists(): E6Artist[] {
  return e6Artists.sort((a, b) => a.name.localeCompare(b.name));
}

export function getE6ArtistById(id: string): E6Artist | undefined {
  return e6Artists.find((a) => a.id === id);
}

export function searchE6Artists(query: string): E6Artist[] {
  const lowerQuery = query.toLowerCase();
  return e6Artists.filter((a) => a.name.toLowerCase().includes(lowerQuery));
}
