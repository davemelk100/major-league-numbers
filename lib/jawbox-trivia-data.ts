import { isYearQuestion } from "./trivia-utils";

export interface JawboxTriviaQuestion {
  id: number;
  question: string;
  options: string[];
  correctAnswer: number;
  explanation: string;
  category: "history" | "artists" | "releases" | "facts";
}

export const jawboxTriviaQuestions: JawboxTriviaQuestion[] = [
  {
    id: 1,
    question: "In what year was Jawbox formed?",
    options: ["1987","1989","1991","1993"],
    correctAnswer: 1,
    explanation: "Jawbox was formed in 1989 in Washington, D.C.",
    category: "history",
  },
  {
    id: 2,
    question: "Which label did Jawbox primarily release their albums on?",
    options: ["Warp Records","Dischord Records","Atlantic Records","Saddle Creek"],
    correctAnswer: 1,
    explanation: "Jawbox released albums on both Dischord Records and Atlantic Records.",
    category: "history",
  },
  {
    id: 3,
    question: "What is the title of Jawbox's debut album?",
    options: ["Novelty","For Your Own Special Sweetheart","Grippe","Jawbox"],
    correctAnswer: 2,
    explanation: "Jawbox's debut album is titled 'Grippe'.",
    category: "releases",
  },
  {
    id: 4,
    question: "Jawbox is a key part of which music scene?",
    options: ["Seattle Grunge","D.C. Punk","New York Hardcore","Los Angeles Rock"],
    correctAnswer: 1,
    explanation: "Jawbox was a key part of the D.C. punk scene.",
    category: "history",
  },
  {
    id: 5,
    question: "Who were the founding members of Jawbox?",
    options: ["J. Robbins and Zach Barocas","Kim Coletta and Bill Barbot","J. Robbins and Kim Coletta","Zach Barocas and Kim Coletta"],
    correctAnswer: 2,
    explanation: "Jawbox was founded by J. Robbins and Kim Coletta.",
    category: "artists",
  },
];

export function getDailyJawboxTriviaQuestions(
  date?: Date,
): JawboxTriviaQuestion[] {
  const now = date || new Date();
  const pool = jawboxTriviaQuestions.filter((q) => !isYearQuestion(q));
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

export function getJawboxTodayStorageKey(date?: Date): string {
  const now = date || new Date();
  return `jawbox-trivia-${now.getFullYear()}-${now.getMonth() + 1}-${now.getDate()}`;
}

export function getJawboxNextTriviaTime(): Date {
  const now = new Date();
  const tomorrow = new Date(now);
  tomorrow.setDate(tomorrow.getDate() + 1);
  tomorrow.setHours(0, 0, 0, 0);
  return tomorrow;
}
