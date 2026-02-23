import { isYearQuestion } from "./trivia-utils";

export interface TouchGoRecordsTriviaQuestion {
  id: number;
  question: string;
  options: string[];
  correctAnswer: number;
  explanation: string;
  category: "history" | "artists" | "releases" | "facts";
}

export const touchgorecordsTriviaQuestions: TouchGoRecordsTriviaQuestion[] = [
  {
    id: 1,
    question: "Who founded Touch and Go Records?",
    options: ["Steve Albini", "Corey Rusk", "Ian MacKaye", "Greg Ginn"],
    correctAnswer: 1,
    explanation: "Corey Rusk, bassist of Necros, founded Touch and Go Records in 1981 after taking over Tesco Vee's fanzine.",
    category: "history",
  },
  {
    id: 2,
    question: "Which city became the permanent home of Touch and Go Records?",
    options: ["Detroit", "Chicago", "Minneapolis", "Louisville"],
    correctAnswer: 1,
    explanation: "Touch and Go moved to Chicago and has been based there since the mid-1980s.",
    category: "history",
  },
  {
    id: 3,
    question: "Which Steve Albini band released 'Songs About Fucking' on Touch and Go?",
    options: ["Shellac", "Rapeman", "Big Black", "Flour"],
    correctAnswer: 2,
    explanation: "Big Black released Songs About Fucking as their final album on Touch and Go in 1987.",
    category: "releases",
  },
  {
    id: 4,
    question: "What was Touch and Go originally before becoming a record label?",
    options: ["A recording studio", "A punk fanzine", "A record store", "A booking agency"],
    correctAnswer: 1,
    explanation: "Touch and Go started as a punk fanzine by Tesco Vee (of the Meatmen) before Corey Rusk turned it into a label.",
    category: "history",
  },
  {
    id: 5,
    question: "Which band's album 'Spiderland' is considered a foundational post-rock document?",
    options: ["Don Caballero", "Rodan", "Slint", "June of 44"],
    correctAnswer: 2,
    explanation: "Slint's Spiderland (1991) is widely regarded as one of the most influential albums ever made and a cornerstone of post-rock.",
    category: "releases",
  },
  {
    id: 6,
    question: "The Jesus Lizard's vocalist David Yow was previously in which Touch and Go band?",
    options: ["Big Black", "Scratch Acid", "Killdozer", "Tar"],
    correctAnswer: 1,
    explanation: "David Yow fronted Scratch Acid before forming The Jesus Lizard with bassist David Wm. Sims.",
    category: "artists",
  },
  {
    id: 7,
    question: "Which Jesus Lizard album is widely considered their masterpiece?",
    options: ["Head", "Goat", "Liar", "Down"],
    correctAnswer: 1,
    explanation: "Goat (1991), produced by Steve Albini, is widely considered The Jesus Lizard's finest work.",
    category: "releases",
  },
  {
    id: 8,
    question: "What was Corey Rusk's band before he ran Touch and Go full-time?",
    options: ["Negative Approach", "Necros", "Die Kreuzen", "Fix"],
    correctAnswer: 1,
    explanation: "Corey Rusk was the bassist of Necros, a Midwest hardcore band from Maumee, Ohio.",
    category: "artists",
  },
  {
    id: 9,
    question: "Which Touch and Go band featured a dual-bass guitar attack?",
    options: ["Shellac", "Girls Against Boys", "The Jesus Lizard", "Don Caballero"],
    correctAnswer: 1,
    explanation: "Girls Against Boys were known for their distinctive dual-bass guitar lineup.",
    category: "artists",
  },
  {
    id: 10,
    question: "Big Black's 'Atomizer' featured which song that became an underground anthem?",
    options: ["Passing Complexion", "Kerosene", "Jordan, Minnesota", "Bad Penny"],
    correctAnswer: 1,
    explanation: "'Kerosene' from Atomizer (1986) became one of Big Black's most iconic songs.",
    category: "releases",
  },
  {
    id: 11,
    question: "Touch and Go is famous for its policy regarding artist contracts. What was unique about it?",
    options: ["10-album deals", "No contracts — handshake deals only", "Artists paid the label", "Lifetime exclusivity"],
    correctAnswer: 1,
    explanation: "Touch and Go famously operated on handshake agreements with no binding contracts, splitting profits 50/50 with artists.",
    category: "facts",
  },
  {
    id: 12,
    question: "Which Butthole Surfers album opens with the song 'Sweat Loaf'?",
    options: ["Psychic... Powerless... Another Man's Sac", "Rembrandt Pussyhorse", "Locust Abortion Technician", "Hairway to Steven"],
    correctAnswer: 2,
    explanation: "Locust Abortion Technician (1987) opens with 'Sweat Loaf,' a warped take on Black Sabbath.",
    category: "releases",
  },
  {
    id: 13,
    question: "Which Pittsburgh band helped define the math rock genre on Touch and Go?",
    options: ["Rodan", "Don Caballero", "Shipping News", "Bastro"],
    correctAnswer: 1,
    explanation: "Don Caballero's complex polyrhythmic instrumentals helped define math rock as a genre.",
    category: "artists",
  },
  {
    id: 14,
    question: "Which Shellac album contains the song 'Prayer to God'?",
    options: ["At Action Park", "Terraform", "1000 Hurts", "Excellent Italian Greyhound"],
    correctAnswer: 2,
    explanation: "1000 Hurts (2000) contains 'Prayer to God,' one of Shellac's most intense and well-known songs.",
    category: "releases",
  },
  {
    id: 15,
    question: "Which Louisville band released the album 'Rusty' — their only record — on Touch and Go?",
    options: ["Slint", "Rodan", "June of 44", "Shipping News"],
    correctAnswer: 1,
    explanation: "Rodan released only one album, Rusty (1994), before disbanding and spawning multiple other projects.",
    category: "artists",
  },
  {
    id: 16,
    question: "What year did Touch and Go announce it would stop releasing new music?",
    options: ["2007", "2009", "2011", "2013"],
    correctAnswer: 1,
    explanation: "In February 2009, Touch and Go announced it would cease releasing new material and focus on its back catalog.",
    category: "history",
  },
  {
    id: 17,
    question: "Which band's 'Fever to Tell' was released on Touch and Go in 2003?",
    options: ["Blonde Redhead", "TV on the Radio", "Yeah Yeah Yeahs", "Enon"],
    correctAnswer: 2,
    explanation: "Yeah Yeah Yeahs released Fever to Tell on Touch and Go, featuring the hit single 'Maps.'",
    category: "releases",
  },
  {
    id: 18,
    question: "David Grubbs led which two successive Touch and Go projects?",
    options: ["Slint then Rodan", "Bastro then Gastr del Sol", "Scratch Acid then Jesus Lizard", "Flour then Arcwelder"],
    correctAnswer: 1,
    explanation: "David Grubbs led Bastro before forming Gastr del Sol with Jim O'Rourke.",
    category: "artists",
  },
  {
    id: 19,
    question: "Which Wisconsin band was known for dark humor and crushing sludge-rock on Touch and Go?",
    options: ["Arcwelder", "Killdozer", "Pegboy", "Tar"],
    correctAnswer: 1,
    explanation: "Killdozer from Wisconsin released numerous albums of darkly humorous, heavy sludge-rock on the label.",
    category: "artists",
  },
  {
    id: 20,
    question: "What is the name of Touch and Go's sister label?",
    options: ["Drag City", "Quarterstick", "Dischord", "Thrill Jockey"],
    correctAnswer: 1,
    explanation: "Quarterstick Records was Touch and Go's sister label, releasing music from bands like Shipping News and June of 44.",
    category: "facts",
  },
];

export function getDailyTouchGoRecordsTriviaQuestions(
  date?: Date,
): TouchGoRecordsTriviaQuestion[] {
  const now = date || new Date();
  const pool = touchgorecordsTriviaQuestions.filter((q) => !isYearQuestion(q));
  const totalQuestions = pool.length;
  const questionsPerDay = 5;

  const getEpochDay = (d: Date) => {
    const utc = Date.UTC(d.getFullYear(), d.getMonth(), d.getDate());
    return Math.floor(utc / 86400000);
  };

  const shuffleQuestions = (seed: number) => {
    const shuffled = [...pool];
    let currentSeed = seed;
    for (let i = shuffled.length - 1; i > 0; i -= 1) {
      currentSeed = (currentSeed * 16807) % 2147483647;
      const j = currentSeed % (i + 1);
      [shuffled[i], shuffled[j]] = [shuffled[j], shuffled[i]];
    }
    return shuffled;
  };

  const cycleLength = Math.floor(totalQuestions / questionsPerDay);
  if (cycleLength === 0) return pool.slice(0, questionsPerDay);
  const dayIndex = getEpochDay(now) % cycleLength;
  const startIndex = dayIndex * questionsPerDay;
  const shuffledQuestions = shuffleQuestions(386147);
  return shuffledQuestions.slice(startIndex, startIndex + questionsPerDay);
}

export function getTouchGoRecordsTodayStorageKey(date?: Date): string {
  const now = date || new Date();
  return `touch-go-records-trivia-${now.getFullYear()}-${now.getMonth() + 1}-${now.getDate()}`;
}

export function getTouchGoRecordsNextTriviaTime(): Date {
  const now = new Date();
  const tomorrow = new Date(now);
  tomorrow.setDate(tomorrow.getDate() + 1);
  tomorrow.setHours(0, 0, 0, 0);
  return tomorrow;
}
