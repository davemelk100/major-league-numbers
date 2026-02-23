import { isYearQuestion } from "./trivia-utils";

export interface SlapAHamRecordsTriviaQuestion {
  id: number;
  question: string;
  options: string[];
  correctAnswer: number;
  explanation: string;
  category: "history" | "artists" | "releases" | "facts";
}

export const slapahamrecordsTriviaQuestions: SlapAHamRecordsTriviaQuestion[] = [
  {
    id: 1,
    question: "In what year was Slap-A-Ham Records founded?",
    options: ["1987","1989","1991","1993"],
    correctAnswer: 1,
    explanation: "Slap-A-Ham Records was founded in 1989 by Chris Dodge.",
    category: "history",
  },
  {
    id: 2,
    question: "Who was the founder of Slap-A-Ham Records?",
    options: ["Chuck D","Chris Dodge","Jello Biafra","Fat Mike"],
    correctAnswer: 1,
    explanation: "Chris Dodge was the founder and main operator of Slap-A-Ham Records.",
    category: "history",
  },
  {
    id: 3,
    question: "Which genre is NOT commonly associated with Slap-A-Ham Records?",
    options: ["Grindcore","Pop","Hardcore Punk","Powerviolence"],
    correctAnswer: 1,
    explanation: "Pop is not a genre associated with Slap-A-Ham Records, which focused on underground genres.",
    category: "facts",
  },
  {
    id: 4,
    question: "When did Slap-A-Ham Records officially shut down?",
    options: ["2000","2001","2002","2003"],
    correctAnswer: 2,
    explanation: "Slap-A-Ham Records shut down in 2002 after struggling with debt.",
    category: "history",
  },
  {
    id: 5,
    question: "Which artist released 'Sweatin’ to the Oldies'?",
    options: ["Melvins","Phobia","Spazz","Crossed Out"],
    correctAnswer: 2,
    explanation: "'Sweatin’ to the Oldies' was released by Spazz in 1997.",
    category: "releases",
  },
  {
    id: 6,
    question: "What type of vinyl format did 'Bllleeeeaaauuurrrrgghhh! A Music War' release?",
    options: ["12\"","10\"","7\"","LP"],
    correctAnswer: 2,
    explanation: "'Bllleeeeaaauuurrrrgghhh! A Music War' was released as a 7\" vinyl.",
    category: "releases",
  },
  {
    id: 7,
    question: "Which label logo charcteristics the Slap-A-Ham Records?",
    options: ["Black and white","Colorful","Green","Text only"],
    correctAnswer: 0,
    explanation: "Slap-A-Ham Records has a distinctive black and white logo.",
    category: "facts",
  },
  {
    id: 8,
    question: "Which band is associated with Slap-A-Ham Records and known for their socio-political lyrics?",
    options: ["Melvins","Capitalist Casualties","Spazz","Infest"],
    correctAnswer: 1,
    explanation: "Capitalist Casualties is known for their socio-political lyrics and associated with Slap-A-Ham Records.",
    category: "artists",
  },
  {
    id: 9,
    question: "What year was the compilation 'Bllleeeeaaauuurrrrgghhh!' released?",
    options: ["1991","1992","1993","1990"],
    correctAnswer: 0,
    explanation: "'Bllleeeeaaauuurrrrgghhh!' was released in 1991.",
    category: "releases",
  },
  {
    id: 10,
    question: "The founder Chris Dodge is also known for playing in which band?",
    options: ["Neanderthal","Infest","Spazz","All of the above"],
    correctAnswer: 3,
    explanation: "Chris Dodge was involved in multiple bands, including Neanderthal, Infest, and Spazz.",
    category: "artists",
  },
  {
    id: 11,
    question: "Which band released 'Love Canal / Someday' under Slap-A-Ham Records?",
    options: ["Hellnation","Neanderthal","Melvins","Crossed Out"],
    correctAnswer: 2,
    explanation: "'Love Canal / Someday' was released by the Melvins.",
    category: "releases",
  },
  {
    id: 12,
    question: "How many tracks were on the 'Sweatin’ to the Oldies' CD?",
    options: ["50","64","68","70"],
    correctAnswer: 1,
    explanation: "'Sweatin’ to the Oldies' features 64 tracks.",
    category: "releases",
  },
  {
    id: 13,
    question: "What year was 'Chaotic Noise' by Conga Fury released?",
    options: ["2000","2001","2002","2003"],
    correctAnswer: 2,
    explanation: "'Chaotic Noise' was released in 2002.",
    category: "releases",
  },
  {
    id: 14,
    question: "How many catalog # tracks does the 'Son of Bllleeeeaaauuurrrrgghhh!' compilation feature?",
    options: ["12","68","10","7"],
    correctAnswer: 1,
    explanation: "'Son of Bllleeeeaaauuurrrrgghhh!' features 68 tracks.",
    category: "releases",
  },
  {
    id: 15,
    question: "Which year did Slap-A-Ham Records release the compilation 'Short, Fast + Loud!, Volume I'?",
    options: ["1999","2000","2001","2002"],
    correctAnswer: 2,
    explanation: "'Short, Fast + Loud!, Volume I' was released in 2001.",
    category: "releases",
  },
  {
    id: 16,
    question: "Which band was not released by Slap A Ham?",
    options: ["Spazz","Melvins","Bad Religion","Phobia"],
    correctAnswer: 2,
    explanation: "Bad Religion was not released by Slap A Ham Records.",
    category: "artists",
  },
  {
    id: 17,
    question: "Which artist released a split EP with Crossed Out?",
    options: ["Capitalist Casualties","Man Is the Bastard","Melvins","Rupture"],
    correctAnswer: 1,
    explanation: "The split EP with Crossed Out was released by Man Is the Bastard.",
    category: "releases",
  },
  {
    id: 18,
    question: "What was a reason given for the closure of Slap-A-Ham Records?",
    options: ["Lack of artists","Debt","Legal issues","High distribution costs"],
    correctAnswer: 1,
    explanation: "The label shut down due to debt issues after 2002.",
    category: "history",
  },
  {
    id: 19,
    question: "Which band's release included a cover of 'War Parade'?",
    options: ["Phobia","Gasp","Noothgrush","Crossed Out"],
    correctAnswer: 0,
    explanation: "Phobia's release included a cover of 'War Parade'.",
    category: "releases",
  },
  {
    id: 20,
    question: "Which year did 'Dope and War' by Capitalist Casualties release?",
    options: ["1997","1998","1996","1995"],
    correctAnswer: 0,
    explanation: "'Dope and War' was released in 1997.",
    category: "releases",
  },
];

export function getDailySlapAHamRecordsTriviaQuestions(
  date?: Date,
): SlapAHamRecordsTriviaQuestion[] {
  const now = date || new Date();
  const pool = slapahamrecordsTriviaQuestions.filter((q) => !isYearQuestion(q));
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

export function getSlapAHamRecordsTodayStorageKey(date?: Date): string {
  const now = date || new Date();
  return `slap-a-ham-records-trivia-${now.getFullYear()}-${now.getMonth() + 1}-${now.getDate()}`;
}

export function getSlapAHamRecordsNextTriviaTime(): Date {
  const now = new Date();
  const tomorrow = new Date(now);
  tomorrow.setDate(tomorrow.getDate() + 1);
  tomorrow.setHours(0, 0, 0, 0);
  return tomorrow;
}
