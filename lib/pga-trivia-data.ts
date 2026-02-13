import { isYearQuestion } from "./trivia-utils";

export interface PGATriviaQuestion {
  id: number;
  question: string;
  options: string[];
  correctAnswer: number;
  explanation: string;
  category: "history" | "majors" | "records" | "players" | "courses";
}

export const pgaTriviaQuestions: PGATriviaQuestion[] = [
  // ===== HISTORY =====
  {
    id: 1,
    question: "In what year was the PGA Tour officially established?",
    options: ["1916", "1929", "1934", "1968"],
    correctAnswer: 1,
    explanation: "The PGA Tour was established in 1929 when touring professionals split from the PGA of America to form their own tournament circuit.",
    category: "history",
  },
  {
    id: 2,
    question: "What is the FedEx Cup?",
    options: ["A team event", "The season-long points competition", "A major championship", "A charity tournament"],
    correctAnswer: 1,
    explanation: "The FedEx Cup is the PGA Tour's season-long points competition, introduced in 2007, culminating in the Tour Championship.",
    category: "history",
  },
  {
    id: 3,
    question: "Which golfer is known as 'The Golden Bear'?",
    options: ["Arnold Palmer", "Jack Nicklaus", "Gary Player", "Tom Watson"],
    correctAnswer: 1,
    explanation: "Jack Nicklaus earned the nickname 'The Golden Bear' and is widely considered the greatest golfer of all time with 18 major championships.",
    category: "players",
  },
  {
    id: 4,
    question: "How many major championships are there in men's professional golf?",
    options: ["3", "4", "5", "6"],
    correctAnswer: 1,
    explanation: "There are four major championships: The Masters, the PGA Championship, the U.S. Open, and The Open Championship (British Open).",
    category: "majors",
  },
  {
    id: 5,
    question: "Which course hosts The Masters every year?",
    options: ["Pebble Beach", "Augusta National", "St Andrews", "Pinehurst"],
    correctAnswer: 1,
    explanation: "Augusta National Golf Club in Augusta, Georgia has hosted The Masters Tournament every year since its inception in 1934.",
    category: "courses",
  },
  // ===== MAJORS =====
  {
    id: 6,
    question: "Who holds the record for the most Masters victories?",
    options: ["Tiger Woods", "Jack Nicklaus", "Arnold Palmer", "Ben Hogan"],
    correctAnswer: 1,
    explanation: "Jack Nicklaus won The Masters a record six times (1963, 1965, 1966, 1972, 1975, 1986).",
    category: "majors",
  },
  {
    id: 7,
    question: "What is the 'Green Jacket'?",
    options: ["A PGA Tour uniform", "The prize for winning The Masters", "A Ryder Cup tradition", "An honorary membership"],
    correctAnswer: 1,
    explanation: "The Green Jacket is the iconic prize awarded to the winner of The Masters Tournament at Augusta National.",
    category: "majors",
  },
  {
    id: 8,
    question: "Which major championship is played on a links course?",
    options: ["The Masters", "U.S. Open", "PGA Championship", "The Open Championship"],
    correctAnswer: 3,
    explanation: "The Open Championship (British Open) is played on links courses in the UK, featuring seaside terrain, deep bunkers, and wind.",
    category: "majors",
  },
  {
    id: 9,
    question: "Who was the youngest golfer to win all four major championships?",
    options: ["Jack Nicklaus", "Tiger Woods", "Bobby Jones", "Rory McIlroy"],
    correctAnswer: 1,
    explanation: "Tiger Woods completed the career Grand Slam at age 24 when he won the 2000 Open Championship.",
    category: "majors",
  },
  {
    id: 10,
    question: "What is the 'Tiger Slam'?",
    options: ["Winning all four majors in one calendar year", "Holding all four major trophies at once", "Winning 5 consecutive tournaments", "A hole-in-one on a par 4"],
    correctAnswer: 1,
    explanation: "The 'Tiger Slam' refers to Tiger Woods holding all four major championship trophies simultaneously (2000-2001), though not in the same calendar year.",
    category: "majors",
  },
  // ===== RECORDS =====
  {
    id: 11,
    question: "Who holds the record for most PGA Tour victories?",
    options: ["Jack Nicklaus", "Tiger Woods", "Sam Snead", "Ben Hogan"],
    correctAnswer: 2,
    explanation: "Sam Snead holds the record with 82 PGA Tour victories, tied with Tiger Woods.",
    category: "records",
  },
  {
    id: 12,
    question: "What is the lowest 72-hole score in major championship history?",
    options: ["261", "264", "267", "270"],
    correctAnswer: 1,
    explanation: "The lowest 72-hole score in major championship history is 264, shot by multiple players.",
    category: "records",
  },
  {
    id: 13,
    question: "Who hit 'The Shot Heard Round the World' at the 2005 Masters?",
    options: ["Phil Mickelson", "Tiger Woods", "Vijay Singh", "Ernie Els"],
    correctAnswer: 1,
    explanation: "Tiger Woods chipped in on the 16th hole at Augusta in 2005, with the ball famously pausing on the lip before dropping in.",
    category: "records",
  },
  {
    id: 14,
    question: "What is an albatross (double eagle) in golf?",
    options: ["One under par", "Two under par", "Three under par", "Four under par"],
    correctAnswer: 2,
    explanation: "An albatross, also known as a double eagle, is three under par on a single hole (e.g., a 2 on a par 5).",
    category: "records",
  },
  {
    id: 15,
    question: "Who holds the record for the lowest single-round score on the PGA Tour?",
    options: ["Jim Furyk (58)", "Brandt Snedeker (59)", "David Duval (59)", "Al Geiberger (59)"],
    correctAnswer: 0,
    explanation: "Jim Furyk shot a 58 at the 2016 Travelers Championship, the lowest round in PGA Tour history.",
    category: "records",
  },
  // ===== PLAYERS =====
  {
    id: 16,
    question: "Which golfer is known as 'The King'?",
    options: ["Jack Nicklaus", "Arnold Palmer", "Ben Hogan", "Bobby Jones"],
    correctAnswer: 1,
    explanation: "Arnold Palmer was known as 'The King' for his charismatic personality and role in popularizing golf through television.",
    category: "players",
  },
  {
    id: 17,
    question: "How many major championships has Tiger Woods won?",
    options: ["14", "15", "16", "18"],
    correctAnswer: 1,
    explanation: "Tiger Woods has won 15 major championships, second only to Jack Nicklaus's 18.",
    category: "players",
  },
  {
    id: 18,
    question: "Which country is Rory McIlroy from?",
    options: ["England", "Scotland", "Northern Ireland", "Republic of Ireland"],
    correctAnswer: 2,
    explanation: "Rory McIlroy is from Holywood, Northern Ireland. He has won four major championships.",
    category: "players",
  },
  {
    id: 19,
    question: "Who won the 2023 Masters Tournament?",
    options: ["Scottie Scheffler", "Jon Rahm", "Rory McIlroy", "Brooks Koepka"],
    correctAnswer: 1,
    explanation: "Jon Rahm won the 2023 Masters Tournament at Augusta National with a score of 12-under par.",
    category: "players",
  },
  {
    id: 20,
    question: "Which golfer was known for his 'Big Three' rivalry with Nicklaus and Player?",
    options: ["Ben Hogan", "Arnold Palmer", "Sam Snead", "Tom Watson"],
    correctAnswer: 1,
    explanation: "Arnold Palmer, Jack Nicklaus, and Gary Player were known as golf's 'Big Three' in the 1960s.",
    category: "players",
  },
  // ===== COURSES =====
  {
    id: 21,
    question: "What is 'Amen Corner' at Augusta National?",
    options: ["Holes 1-3", "Holes 7-9", "Holes 11-13", "Holes 16-18"],
    correctAnswer: 2,
    explanation: "Amen Corner refers to holes 11, 12, and 13 at Augusta National, named by Sports Illustrated's Herbert Warren Wind in 1958.",
    category: "courses",
  },
  {
    id: 22,
    question: "Which course is known as 'The Home of Golf'?",
    options: ["Augusta National", "Pebble Beach", "St Andrews Old Course", "Royal Liverpool"],
    correctAnswer: 2,
    explanation: "The Old Course at St Andrews in Scotland is known as 'The Home of Golf' and has been played since the 15th century.",
    category: "courses",
  },
  {
    id: 23,
    question: "What is the signature hole at TPC Sawgrass?",
    options: ["The 12th hole", "The 15th hole", "The 17th hole (Island Green)", "The 18th hole"],
    correctAnswer: 2,
    explanation: "The 17th hole at TPC Sawgrass features the famous island green, one of the most iconic holes in golf.",
    category: "courses",
  },
  {
    id: 24,
    question: "What is the Ryder Cup?",
    options: ["A PGA Tour event", "A biennial team competition between USA and Europe", "A senior tour event", "A charity match"],
    correctAnswer: 1,
    explanation: "The Ryder Cup is a biennial team golf competition between the United States and Europe, one of the sport's most prestigious events.",
    category: "history",
  },
  {
    id: 25,
    question: "What does 'par' mean in golf?",
    options: ["The minimum strokes for a hole", "The expected number of strokes for an expert golfer", "One under the expected score", "The average score of all players"],
    correctAnswer: 1,
    explanation: "Par is the predetermined number of strokes that an expert golfer should require to complete a hole.",
    category: "history",
  },
  {
    id: 26,
    question: "Who was the first golfer to earn $1 million in a single PGA Tour season?",
    options: ["Jack Nicklaus", "Tom Watson", "Curtis Strange", "Arnold Palmer"],
    correctAnswer: 2,
    explanation: "Curtis Strange was the first golfer to earn over $1 million in a single PGA Tour season in 1988.",
    category: "records",
  },
  {
    id: 27,
    question: "What is a 'bogey' in golf?",
    options: ["One under par", "Even par", "One over par", "Two over par"],
    correctAnswer: 2,
    explanation: "A bogey is a score of one over par on a hole. A double bogey is two over, and a triple bogey is three over.",
    category: "history",
  },
  {
    id: 28,
    question: "Which golfer has the most Ryder Cup appearances for the United States?",
    options: ["Tiger Woods", "Phil Mickelson", "Jack Nicklaus", "Arnold Palmer"],
    correctAnswer: 1,
    explanation: "Phil Mickelson holds the record for most U.S. Ryder Cup appearances with 13 (1995-2023).",
    category: "players",
  },
  {
    id: 29,
    question: "What is the 'cut' in a golf tournament?",
    options: ["The final round", "A penalty stroke", "The elimination point after two rounds", "A type of golf shot"],
    correctAnswer: 2,
    explanation: "The cut is the score threshold after the first two rounds that determines which players continue to the weekend rounds.",
    category: "history",
  },
  {
    id: 30,
    question: "Which golfer won the most consecutive PGA Tour events?",
    options: ["Tiger Woods (7)", "Ben Hogan (5)", "Byron Nelson (11)", "Jack Nicklaus (6)"],
    correctAnswer: 2,
    explanation: "Byron Nelson won 11 consecutive PGA Tour events in 1945, a record considered virtually unbreakable.",
    category: "records",
  },
];

export function getDailyPGATriviaQuestions(date?: Date): PGATriviaQuestion[] {
  const now = date || new Date();
  const pool = pgaTriviaQuestions.filter((q) => !isYearQuestion(q));
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
  const epochDay = getEpochDay(now);
  const dayIndex = epochDay % cycleLength;
  const shuffled = shuffleQuestions(67); // different seed than NFL
  const startIndex = dayIndex * questionsPerDay;
  return shuffled.slice(startIndex, startIndex + questionsPerDay);
}

export function getPGATodayStorageKey(date?: Date): string {
  const now = date || new Date();
  return `pga-trivia-${now.getFullYear()}-${now.getMonth() + 1}-${now.getDate()}`;
}
