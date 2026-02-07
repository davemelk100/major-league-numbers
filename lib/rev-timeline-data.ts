// Revelation Records Timeline

export interface RevTimelineEvent {
  year: number;
  title: string;
  description: string;
}

export const revTimeline: RevTimelineEvent[] = [
  {
    year: 1987,
    title: "Label Founded",
    description: "Jordan Cooper and Ray Cappo (Youth of Today) start Revelation Records in New Haven, CT to release Warzone's 'Lower East Side Crew' 7-inch.",
  },
  {
    year: 1987,
    title: "First Releases",
    description: "REV 1-3 released: Warzone, 'Together' compilation, and Sick of It All's debut EP.",
  },
  {
    year: 1988,
    title: "Youth Crew Explosion",
    description: "Gorilla Biscuits, Side By Side, Bold, and No For An Answer releases cement the youth crew sound.",
  },
  {
    year: 1988,
    title: "Ray Cappo Departs",
    description: "Ray Cappo leaves the business to focus on Shelter, though his albums remain on Revelation.",
  },
  {
    year: 1989,
    title: "Start Today",
    description: "Gorilla Biscuits release 'Start Today' (REV 12), becoming one of hardcore's most beloved albums.",
  },
  {
    year: 1989,
    title: "Judge Era",
    description: "Judge releases 'Bringin' It Down' (REV 15), a defining straight edge hardcore album.",
  },
  {
    year: 1990,
    title: "Expanding Sound",
    description: "Inside Out's 'No Spiritual Surrender' and Quicksand's debut signal Revelation's expanding musical palette.",
  },
  {
    year: 1990,
    title: "West Coast Connection",
    description: "Chain of Strength brings Orange County straight edge to the Revelation roster.",
  },
  {
    year: 1991,
    title: "Post-Hardcore Beginnings",
    description: "Into Another and Supertouch push beyond traditional hardcore boundaries.",
  },
  {
    year: 1993,
    title: "Diversification",
    description: "Iceburn, Farside, and other bands expand Revelation into progressive and melodic territory.",
  },
  {
    year: 1995,
    title: "Emo Emergence",
    description: "Texas Is the Reason signed, bridging hardcore and emotional/indie rock.",
  },
  {
    year: 1996,
    title: "In-Flight Program",
    description: "The landmark 'In-Flight Program' compilation (REV 50) showcases the label's diverse roster.",
  },
  {
    year: 1996,
    title: "Commercial Crossover",
    description: "CIV's 'Set Your Goals' and Sense Field's 'Building' achieve broader alternative rock success.",
  },
  {
    year: 1997,
    title: "Label Milestone",
    description: "Youth of Today reissues and retrospectives honor the label's legacy while new bands join.",
  },
  {
    year: 1998,
    title: "Metalcore Wave",
    description: "In My Eyes, Morning Again, and Damnation A.D. represent the heavier end of the roster.",
  },
  {
    year: 2000,
    title: "New Millennium",
    description: "Elliott, The Movielife, and The Explosion bring indie rock and punk influences.",
  },
  {
    year: 2002,
    title: "REV 100",
    description: "'Rarities' compilation celebrates the 100th release milestone.",
  },
  {
    year: 2003,
    title: "Shai Hulud",
    description: "'That Within Blood Ill-Tempered' becomes a defining metalcore release.",
  },
  {
    year: 2005,
    title: "Retrospectives",
    description: "Judge and Bold complete discographies released; 'Generations' compilation honors the legacy.",
  },
  {
    year: 2006,
    title: "Continued Growth",
    description: "Shook Ones and newer bands keep the hardcore spirit alive on Revelation.",
  },
  {
    year: 2010,
    title: "Modern Era",
    description: "Label continues releasing new hardcore and punk alongside classic reissues.",
  },
  {
    year: 2020,
    title: "Digital Expansion",
    description: "RevHQ expands online presence with streaming, digital releases, and direct-to-fan sales.",
  },
];

export function getAllRevTimelineEvents(): RevTimelineEvent[] {
  return revTimeline;
}
