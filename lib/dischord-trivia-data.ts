import { isYearQuestion } from "./trivia-utils";

export interface DischordTriviaQuestion {
  id: number;
  question: string;
  options: string[];
  correctAnswer: number;
  explanation: string;
  category: "history" | "artists" | "releases" | "facts";
}

export const dischordTriviaQuestions: DischordTriviaQuestion[] = [
  {
    id: 1,
    question: "What year was Dischord Records founded?",
    options: ["1978","1980","1982","1984"],
    correctAnswer: 1,
    explanation: "Dischord Records was founded in 1980 by Ian MacKaye and Jeff Nelson to release the Teen Idles' single 'Minor Disturbance.'",
    category: "history",
  },
  {
    id: 2,
    question: "Who co-founded Dischord Records with Ian MacKaye?",
    options: ["Guy Picciotto","Jeff Nelson","Henry Rollins","Brian Baker"],
    correctAnswer: 1,
    explanation: "Jeff Nelson, drummer of the Teen Idles and later Minor Threat, co-founded Dischord Records with Ian MacKaye.",
    category: "history",
  },
  {
    id: 3,
    question: "Which Dischord band is credited with pioneering the 'straight edge' movement?",
    options: ["Fugazi","Bad Brains","Minor Threat","Government Issue"],
    correctAnswer: 2,
    explanation: "Minor Threat's song 'Straight Edge' gave name to the movement promoting abstinence from drugs and alcohol.",
    category: "artists",
  },
  {
    id: 4,
    question: "What is the catalog number of the first Dischord release?",
    options: ["Dischord 1","Dischord 0","DIS-001","DC-1"],
    correctAnswer: 0,
    explanation: "The Teen Idles' 'Minor Disturbance' EP was released as Dischord 1 in 1980.",
    category: "releases",
  },
  {
    id: 5,
    question: "Which Fugazi album was their last studio release?",
    options: ["End Hits","Red Medicine","The Argument","Steady Diet of Nothing"],
    correctAnswer: 2,
    explanation: "The Argument, released in 2001, was Fugazi's seventh and final studio album.",
    category: "releases",
  },
  {
    id: 6,
    question: "Which Dischord band featured a young Dave Grohl on drums?",
    options: ["Dag Nasty","Void","Scream","Government Issue"],
    correctAnswer: 2,
    explanation: "Dave Grohl joined Scream as their drummer in 1986, before going on to Nirvana and the Foo Fighters.",
    category: "artists",
  },
  {
    id: 7,
    question: "What is Dischord Records' famously consistent pricing policy?",
    options: ["$5 for all releases","$8 CDs / $10 LPs post-paid","Pay what you want","Free digital downloads"],
    correctAnswer: 1,
    explanation: "Dischord has maintained a policy of affordable, fixed pricing — historically around $8 for CDs and $10 for LPs, post-paid (shipping included).",
    category: "facts",
  },
  {
    id: 8,
    question: "Which band is often credited as the first 'emo' band?",
    options: ["Embrace","Rites of Spring","Dag Nasty","Jawbox"],
    correctAnswer: 1,
    explanation: "Rites of Spring, fronted by Guy Picciotto, brought raw emotional expression to hardcore punk and are widely cited as the originators of emo.",
    category: "artists",
  },
  {
    id: 9,
    question: "What was the 'Revolution Summer' in D.C. punk?",
    options: ["A 1985 movement toward more artistic, emotional punk","A 1980 punk festival in Washington D.C.","Minor Threat's farewell tour","Fugazi's first national tour"],
    correctAnswer: 0,
    explanation: "Revolution Summer (1985) was a creative movement in the D.C. punk scene that embraced more melodic and emotionally expressive music, led by bands like Rites of Spring and Embrace.",
    category: "history",
  },
  {
    id: 10,
    question: "Where is Dischord Records headquartered?",
    options: ["New York City","Los Angeles","Arlington, Virginia","Baltimore, Maryland"],
    correctAnswer: 2,
    explanation: "Dischord Records has long been based in Arlington, Virginia, just across the Potomac from Washington, D.C. The label originally operated out of the 'Dischord House.'",
    category: "facts",
  },
];

export function getDailyDischordTriviaQuestions(
  date?: Date,
): DischordTriviaQuestion[] {
  const now = date || new Date();
  const pool = dischordTriviaQuestions.filter((q) => !isYearQuestion(q));
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

export function getDischordTodayStorageKey(date?: Date): string {
  const now = date || new Date();
  return `dischord-trivia-${now.getFullYear()}-${now.getMonth() + 1}-${now.getDate()}`;
}

export function getDischordNextTriviaTime(): Date {
  const now = new Date();
  const tomorrow = new Date(now);
  tomorrow.setDate(tomorrow.getDate() + 1);
  tomorrow.setHours(0, 0, 0, 0);
  return tomorrow;
}
