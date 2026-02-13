// Revelation Records Sub-Labels and Related Imprints

export interface RevSubLabel {
  name: string;
  description: string;
  years?: string;
  highlights: string[];
  url?: string;
}

export const revSubLabels: RevSubLabel[] = [
  {
    name: "Crisis Records",
    description:
      "European distribution arm that handled Revelation releases in the UK and Europe during the late 1980s and early 1990s.",
    years: "1988-1995",
    highlights: [
      "European pressings of Youth of Today",
      "UK distribution of Gorilla Biscuits",
      "Judge European releases",
    ],
  },
  {
    name: "Rev HQ",
    description:
      "Revelation's official online store and distribution platform, offering the complete catalog plus exclusive merchandise and limited pressings.",
    highlights: [
      "Exclusive color vinyl variants",
      "Limited edition box sets",
      "Official merchandise",
      "Pre-order bundles",
    ],
    url: "https://revhq.com/",
  },
  {
    name: "Revelation Classics",
    description:
      "Reissue series focusing on bringing classic out-of-print releases back into circulation with remastered audio and expanded artwork.",
    highlights: [
      "Judge - What It Meant: Complete Discography",
      "Bold - The Search: 1985-1989",
      "Shai Hulud - A Complete Retrospective",
      "Various Artists - Rarities compilation",
    ],
  },
  {
    name: "Equal Vision Records",
    description:
      "Founded by Ray Cappo (Youth of Today, Shelter) as a sister label. Initially worked closely with Revelation before becoming fully independent.",
    years: "1991-present",
    highlights: [
      "Originally distributed by Revelation",
      "Shelter early releases",
      "Became independent label",
      "Later signed Bane, Saves the Day",
    ],
    url: "https://www.equalvision.com/",
  },
  {
    name: "Supersoul Records",
    description:
      "Another Ray Cappo venture focused on Krishna-conscious hardcore and spiritual punk rock.",
    years: "1990s",
    highlights: [
      "108 releases",
      "Krishna-core focused",
      "Shelter related projects",
    ],
  },
];

export function getAllRevSubLabels(): RevSubLabel[] {
  return revSubLabels;
}
