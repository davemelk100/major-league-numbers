import { isYearQuestion } from "./trivia-utils";

export interface SlapAHamNumbersTriviaQuestion {
  id: number;
  question: string;
  options: string[];
  correctAnswer: number;
  explanation: string;
  category: "history" | "artists" | "releases" | "facts";
}

export const slapahamnumbersTriviaQuestions: SlapAHamNumbersTriviaQuestion[] = [
  {
    id: 1,
    question: "In what year was Slap-A-Ham Records founded?",
    options: ["1986","1989","1991","1995"],
    correctAnswer: 1,
    explanation: "Slap-A-Ham Records was founded in 1989 by Chris Dodge.",
    category: "history",
  },
  {
    id: 2,
    question: "Which genre is NOT commonly associated with Slap-A-Ham Records?",
    options: ["Grindcore","Jazz","Hardcore Punk","Powerviolence"],
    correctAnswer: 1,
    explanation: "Slap-A-Ham is known for hardcore punk, powerviolence, and grindcore, but not jazz.",
    category: "facts",
  },
  {
    id: 3,
    question: "Who was the founder of Slap-A-Ham Records?",
    options: ["Kurt Cobain","Chris Dodge","Jello Biafra","Dave Grohl"],
    correctAnswer: 1,
    explanation: "Chris Dodge founded the label in 1989.",
    category: "artists",
  },
  {
    id: 4,
    question: "When did Slap-A-Ham Records officially shut down?",
    options: ["1999","2001","2002","2000"],
    correctAnswer: 2,
    explanation: "The label was officially shut down in 2002.",
    category: "history",
  },
  {
    id: 5,
    question: "Which of these bands is associated with Slap-A-Ham Records?",
    options: ["Nirvana","Melvins","Green Day","Blink-182"],
    correctAnswer: 1,
    explanation: "Melvins is one of the notable bands associated with Slap-A-Ham Records.",
    category: "artists",
  },
  {
    id: 6,
    question: "What genre did Spazz primarily play?",
    options: ["Grindcore","Jazz","Pop","Folk"],
    correctAnswer: 0,
    explanation: "Spazz was known for their chaotic grindcore sound.",
    category: "facts",
  },
  {
    id: 7,
    question: "What city was Slap-A-Ham Records based in?",
    options: ["Los Angeles","Seattle","San Francisco","New York"],
    correctAnswer: 2,
    explanation: "Slap-A-Ham was based in San Francisco, USA.",
    category: "facts",
  },
  {
    id: 8,
    question: "Which album was released first?",
    options: ["Son of Bllleeeeaaauuurrrrgghhh!","Crush Kill Destroy","Bllleeeeaaauuurrrrgghhh! The Record","Sweatin’ to the Oldies"],
    correctAnswer: 2,
    explanation: "Bllleeeeaaauuurrrrgghhh! The Record was released in 1991, making it the earliest.",
    category: "releases",
  },
  {
    id: 9,
    question: "What was unique about the Bllleeeeaaauuurrrrgghhh! releases?",
    options: ["Only released on CD","Only released on vinyl","Double LP","Sold out immediately"],
    correctAnswer: 1,
    explanation: "The Bllleeeeaaauuurrrrgghhh! compilations were only released on 7\" vinyl.",
    category: "releases",
  },
  {
    id: 10,
    question: "In which year was 'Sweatin’ to the Oldies' released?",
    options: ["1995","1997","1999","2001"],
    correctAnswer: 1,
    explanation: "Spazz's album 'Sweatin’ to the Oldies' was released in 1997.",
    category: "releases",
  },
];

export function getDailySlapAHamNumbersTriviaQuestions(
  date?: Date,
): SlapAHamNumbersTriviaQuestion[] {
  const now = date || new Date();
  const pool = slapahamnumbersTriviaQuestions.filter((q) => !isYearQuestion(q));
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

export function getSlapAHamNumbersTodayStorageKey(date?: Date): string {
  const now = date || new Date();
  return `slap-a-ham-numbers-trivia-${now.getFullYear()}-${now.getMonth() + 1}-${now.getDate()}`;
}

export function getSlapAHamNumbersNextTriviaTime(): Date {
  const now = new Date();
  const tomorrow = new Date(now);
  tomorrow.setDate(tomorrow.getDate() + 1);
  tomorrow.setHours(0, 0, 0, 0);
  return tomorrow;
}
