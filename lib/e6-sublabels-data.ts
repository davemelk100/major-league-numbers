// Elephant 6 Related Labels and Projects

export interface E6SubLabel {
  name: string;
  description: string;
  years?: string;
  highlights: string[];
  url?: string;
}

export const e6SubLabels: E6SubLabel[] = [
  {
    name: "Pet Sounds Studio",
    description:
      "Robert Schneider's home recording studio in Denver, Colorado, named after the Beach Boys album. Central to the E6 sound, where many key albums were recorded and produced.",
    years: "1995–present",
    highlights: [
      "Neutral Milk Hotel – In the Aeroplane Over the Sea",
      "The Apples in Stereo – Fun Trick Noisemaker",
      "Elf Power – When the Red King Comes",
      "Olivia Tremor Control production work",
    ],
  },
  {
    name: "Cloud Recordings",
    description:
      "A record label and collective project closely associated with E6 members, focusing on experimental and lo-fi releases from the Athens scene.",
    years: "1996–2005",
    highlights: [
      "Various E6-adjacent releases",
      "Compilation albums",
      "Limited edition singles",
    ],
  },
  {
    name: "Orange Twin Records",
    description:
      "An independent record label based in Athens, Georgia, founded by Laura Carter and others in the E6 orbit. Also operates Orange Twin Conservation Community, a nature preserve and creative space.",
    years: "2001–present",
    highlights: [
      "Circulatory System releases",
      "Elf Power releases",
      "Orange Twin Field Recordings",
      "Conservation community and creative space",
    ],
    url: "https://orangetwin.com/",
  },
  {
    name: "Kindercore Records",
    description:
      "An Athens, Georgia-based independent label that released many E6-associated artists. Co-founded by Ryan Lewis, it was a key outlet for the Athens indie pop scene.",
    years: "1996–2005",
    highlights: [
      "of Montreal early releases",
      "Marshmallow Coast",
      "The Instruments",
      "I Am the World Trade Center",
    ],
  },
  {
    name: "Merge Records",
    description:
      "The Chapel Hill, North Carolina label that released Neutral Milk Hotel's albums. While not an E6 label, Merge was the primary distributor for NMH's landmark recordings.",
    years: "1989–present",
    highlights: [
      "Neutral Milk Hotel – On Avery Island",
      "Neutral Milk Hotel – In the Aeroplane Over the Sea",
      "Distribution of other E6 releases",
    ],
    url: "https://www.mergerecords.com/",
  },
];

export function getAllE6SubLabels(): E6SubLabel[] {
  return e6SubLabels;
}
