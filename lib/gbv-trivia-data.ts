export interface GbvTriviaQuestion {
  id: number;
  question: string;
  options: string[];
  correctAnswer: number;
  explanation: string;
  category: "history" | "albums" | "songs" | "members" | "facts";
}

export const gbvTriviaQuestions: GbvTriviaQuestion[] = [
  {
    id: 1,
    question: "Which Ohio city is Guided By Voices from?",
    options: ["Columbus", "Cleveland", "Dayton", "Cincinnati"],
    correctAnswer: 2,
    explanation: "Guided By Voices formed in Dayton, Ohio.",
    category: "history",
  },
  {
    id: 2,
    question: "Who is the primary songwriter for Guided By Voices?",
    options: ["Tobin Sprout", "Robert Pollard", "Kevin Fennell", "Mitch Mitchell"],
    correctAnswer: 1,
    explanation: "Robert Pollard is the band's primary songwriter.",
    category: "members",
  },
  {
    id: 3,
    question: "Which GBV album is often cited as their lo-fi breakthrough?",
    options: ["Alien Lanes", "Bee Thousand", "Mag Earwhig!", "Under the Bushes Under the Stars"],
    correctAnswer: 1,
    explanation: "Bee Thousand (1994) is widely viewed as their breakthrough album.",
    category: "albums",
  },
  {
    id: 4,
    question: "Which label released Alien Lanes?",
    options: ["Matador", "Sub Pop", "Merge", "Drag City"],
    correctAnswer: 0,
    explanation: "Alien Lanes was released by Matador in 1995.",
    category: "albums",
  },
  {
    id: 5,
    question: "Which song is one of GBV's best-known anthems?",
    options: ["Game of Pricks", "Hot Freaks", "Glad Girls", "Keep It in Motion"],
    correctAnswer: 0,
    explanation: "Game of Pricks is a signature GBV anthem.",
    category: "songs",
  },
  {
    id: 6,
    question: "What year was Bee Thousand released?",
    options: ["1992", "1993", "1994", "1995"],
    correctAnswer: 2,
    explanation: "Bee Thousand was released in 1994.",
    category: "albums",
  },
  {
    id: 7,
    question: "What is the approximate track count on Alien Lanes?",
    options: ["12", "18", "28", "36"],
    correctAnswer: 2,
    explanation: "Alien Lanes contains 28 tracks.",
    category: "albums",
  },
  {
    id: 8,
    question: "Which GBV album is known for the song 'My Valuable Hunting Knife'?",
    options: ["Vampire on Titus", "Propeller", "Bee Thousand", "Alien Lanes"],
    correctAnswer: 2,
    explanation: "'My Valuable Hunting Knife' appears on Bee Thousand.",
    category: "songs",
  },
  {
    id: 9,
    question: "Guided By Voices are known for what recording style?",
    options: ["High-budget studio polish", "Lo-fi DIY home recordings", "Live-only releases", "Electronic production"],
    correctAnswer: 1,
    explanation: "GBV's hallmark is lo-fi, DIY home recording aesthetics.",
    category: "facts",
  },
  {
    id: 10,
    question: "Which album marked GBV's first release on a major indie label?",
    options: ["Alien Lanes", "Propeller", "Mag Earwhig!", "Under the Bushes Under the Stars"],
    correctAnswer: 0,
    explanation: "Alien Lanes was the first GBV album on Matador Records.",
    category: "albums",
  },
  {
    id: 11,
    question: "Which member is commonly associated with co-writing early GBV songs?",
    options: ["Tobin Sprout", "Nate Farley", "Jim Macpherson", "Doug Gillard"],
    correctAnswer: 0,
    explanation: "Tobin Sprout co-wrote and sang on many early GBV tracks.",
    category: "members",
  },
  {
    id: 12,
    question: "Which GBV album title references an audio term?",
    options: ["Sandbox", "Propeller", "Half Smiles of the Decomposed", "Do the Collapse"],
    correctAnswer: 1,
    explanation: "Propeller references the audio term and the album's distinctive sound.",
    category: "albums",
  },
  {
    id: 13,
    question: "Which GBV album includes the song 'Echos Myron'?",
    options: ["Under the Bushes Under the Stars", "Alien Lanes", "Bee Thousand", "Mag Earwhig!"],
    correctAnswer: 1,
    explanation: "'Echos Myron' is on Alien Lanes.",
    category: "songs",
  },
  {
    id: 14,
    question: "Which GBV album is known for a polished, power-pop sound?",
    options: ["Mag Earwhig!", "Self-Inflicted Aerial Nostalgia", "Same Place the Fly Got Smashed", "Devil Between My Toes"],
    correctAnswer: 0,
    explanation: "Mag Earwhig! leans into a more polished, power-pop sound.",
    category: "albums",
  },
  {
    id: 15,
    question: "Which GBV song contains the line 'You are a wasted and useful'?",
    options: ["Shocker in Gloomtown", "Motor Away", "I Am a Tree", "A Salty Salute"],
    correctAnswer: 1,
    explanation: "The line appears in the song 'Motor Away'.",
    category: "songs",
  },
];

export function getDailyGbvTriviaQuestions(date?: Date): GbvTriviaQuestion[] {
  const now = date || new Date();
  const dateSeed =
    now.getFullYear() * 10000 + (now.getMonth() + 1) * 100 + now.getDate();

  const seededRandom = (seed: number): number => {
    const x = Math.sin(seed) * 10000;
    return x - Math.floor(x);
  };

  const totalQuestions = gbvTriviaQuestions.length;
  const selectedIndices: number[] = [];
  let seed = dateSeed;

  while (selectedIndices.length < 5) {
    seed = (seed * 16807) % 2147483647;
    const randomValue = seededRandom(seed);
    const index = Math.floor(randomValue * totalQuestions);

    if (!selectedIndices.includes(index)) {
      selectedIndices.push(index);
    }
  }

  return selectedIndices.map((i) => gbvTriviaQuestions[i]);
}

export function getGbvTodayStorageKey(date?: Date): string {
  const now = date || new Date();
  return `gbv-trivia-${now.getFullYear()}-${now.getMonth() + 1}-${now.getDate()}`;
}

export function getGbvNextTriviaTime(): Date {
  const now = new Date();
  const tomorrow = new Date(now);
  tomorrow.setDate(tomorrow.getDate() + 1);
  tomorrow.setHours(0, 0, 0, 0);
  return tomorrow;
}
