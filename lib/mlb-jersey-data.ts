export interface JerseyQuestion {
  id: number;
  question: string;
  options: string[];
  correctAnswer: number;
  explanation: string;
}

export const mlbJerseyQuestions: JerseyQuestion[] = [
  {
    id: 1,
    question: "What number did Babe Ruth wear with the New York Yankees?",
    options: ["7", "3", "4", "9"],
    correctAnswer: 1,
    explanation: "Babe Ruth's #3 was the first number retired in Yankees history in 1948.",
  },
  {
    id: 2,
    question: "What number did Jackie Robinson wear with the Brooklyn Dodgers?",
    options: ["21", "42", "34", "8"],
    correctAnswer: 1,
    explanation: "Jackie Robinson's #42 was retired across all of MLB in 1997 — the first league-wide retirement in sports history.",
  },
  {
    id: 3,
    question: "What number did Derek Jeter wear with the New York Yankees?",
    options: ["13", "7", "2", "23"],
    correctAnswer: 2,
    explanation: "Jeter's #2 was retired by the Yankees in 2017 after his legendary 20-year career as their captain.",
  },
  {
    id: 4,
    question: "What number did Ken Griffey Jr. wear with the Seattle Mariners?",
    options: ["34", "24", "21", "11"],
    correctAnswer: 1,
    explanation: "Junior's #24 was retired by the Mariners. He was the first player elected to the Hall of Fame as a Mariner.",
  },
  {
    id: 5,
    question: "What number did Willie Mays wear with the San Francisco Giants?",
    options: ["44", "24", "25", "7"],
    correctAnswer: 1,
    explanation: "The Say Hey Kid's #24 was retired by the Giants. He hit 660 career home runs.",
  },
  {
    id: 6,
    question: "What number did Hank Aaron wear with the Atlanta Braves?",
    options: ["3", "21", "44", "25"],
    correctAnswer: 2,
    explanation: "Hammerin' Hank's #44 was retired by the Braves. He broke Babe Ruth's career home run record in 1974.",
  },
  {
    id: 7,
    question: "What number did Roberto Clemente wear with the Pittsburgh Pirates?",
    options: ["42", "21", "34", "8"],
    correctAnswer: 1,
    explanation: "Clemente's #21 was retired by the Pirates. MLB's annual humanitarian award bears his name.",
  },
  {
    id: 8,
    question: "What number did Ted Williams wear with the Boston Red Sox?",
    options: ["1", "8", "9", "14"],
    correctAnswer: 2,
    explanation: "The Splendid Splinter's #9 was retired by the Red Sox. He is the last player to hit .400 in a season (.406 in 1941).",
  },
  {
    id: 9,
    question: "What number did Mariano Rivera wear with the New York Yankees?",
    options: ["46", "42", "22", "31"],
    correctAnswer: 1,
    explanation: "Rivera was the last player to wear #42 in MLB, grandfathered in when Robinson's number was retired league-wide.",
  },
  {
    id: 10,
    question: "What number did Cal Ripken Jr. wear with the Baltimore Orioles?",
    options: ["5", "8", "21", "33"],
    correctAnswer: 1,
    explanation: "Ripken's #8 was retired by the Orioles. He played 2,632 consecutive games, breaking Lou Gehrig's record.",
  },
  {
    id: 11,
    question: "What number did Nolan Ryan wear with the Texas Rangers?",
    options: ["30", "34", "44", "24"],
    correctAnswer: 1,
    explanation: "Ryan's #34 was retired by the Rangers, Astros, and Angels — three different teams honoring the same player.",
  },
  {
    id: 12,
    question: "What number did Mickey Mantle wear with the New York Yankees?",
    options: ["3", "5", "7", "9"],
    correctAnswer: 2,
    explanation: "The Mick's #7 was retired by the Yankees in 1969. He hit 536 career home runs as a switch-hitter.",
  },
  {
    id: 13,
    question: "What number did Mike Trout wear with the Los Angeles Angels?",
    options: ["17", "24", "27", "1"],
    correctAnswer: 2,
    explanation: "Trout wears #27 with the Angels and has won three AL MVP awards.",
  },
  {
    id: 14,
    question: "What number did Pedro Martinez wear with the Boston Red Sox?",
    options: ["34", "45", "29", "31"],
    correctAnswer: 1,
    explanation: "Pedro's #45 was retired by the Red Sox. He posted one of the most dominant pitching stretches in history from 1997-2003.",
  },
  {
    id: 15,
    question: "What number did Greg Maddux wear with the Atlanta Braves?",
    options: ["47", "27", "31", "35"],
    correctAnswer: 2,
    explanation: "Maddux wore #31 with the Braves, winning four consecutive Cy Young Awards from 1992-1995.",
  },
  {
    id: 16,
    question: "What number did Tony Gwynn wear with the San Diego Padres?",
    options: ["5", "19", "23", "8"],
    correctAnswer: 1,
    explanation: "Mr. Padre's #19 was retired by the Padres. He won eight NL batting titles.",
  },
  {
    id: 17,
    question: "What number did Albert Pujols wear with the St. Louis Cardinals?",
    options: ["55", "4", "5", "25"],
    correctAnswer: 2,
    explanation: "Pujols wore #5 with the Cardinals, winning three NL MVP awards and two World Series titles.",
  },
  {
    id: 18,
    question: "What number did Randy Johnson wear with the Arizona Diamondbacks?",
    options: ["56", "51", "34", "45"],
    correctAnswer: 1,
    explanation: "The Big Unit wore #51 with the D-backs, winning four consecutive Cy Young Awards and the 2001 World Series co-MVP.",
  },
  {
    id: 19,
    question: "What number did Lou Gehrig wear with the New York Yankees?",
    options: ["3", "7", "4", "5"],
    correctAnswer: 2,
    explanation: "The Iron Horse's #4 was the first number permanently retired in MLB history in 1939.",
  },
  {
    id: 20,
    question: "What number did Joe DiMaggio wear with the New York Yankees?",
    options: ["7", "9", "5", "3"],
    correctAnswer: 2,
    explanation: "Joltin' Joe's #5 was retired by the Yankees. His 56-game hitting streak in 1941 remains an unbroken record.",
  },
  {
    id: 21,
    question: "What number did Sandy Koufax wear with the Los Angeles Dodgers?",
    options: ["22", "30", "32", "36"],
    correctAnswer: 2,
    explanation: "Koufax's #32 was retired by the Dodgers. He threw four no-hitters and retired at age 30 due to arthritis.",
  },
  {
    id: 22,
    question: "What number did Ichiro Suzuki wear with the Seattle Mariners?",
    options: ["31", "51", "17", "22"],
    correctAnswer: 1,
    explanation: "Ichiro's #51 was retired by the Mariners. He set the single-season hit record with 262 in 2004.",
  },
  {
    id: 23,
    question: "What number did Chipper Jones wear with the Atlanta Braves?",
    options: ["8", "5", "10", "21"],
    correctAnswer: 2,
    explanation: "Chipper's #10 was retired by the Braves. He was the 1999 NL MVP and a switch-hitting legend.",
  },
  {
    id: 24,
    question: "What number did David Ortiz wear with the Boston Red Sox?",
    options: ["24", "34", "9", "27"],
    correctAnswer: 1,
    explanation: "Big Papi's #34 was retired by the Red Sox. He was the 2013 World Series MVP and a beloved figure in Boston.",
  },
  {
    id: 25,
    question: "What number did Tom Seaver wear with the New York Mets?",
    options: ["31", "41", "36", "17"],
    correctAnswer: 1,
    explanation: "Tom Terrific's #41 was retired by the Mets. He won three Cy Young Awards and led the Miracle Mets to the 1969 title.",
  },
  {
    id: 26,
    question: "What number did Barry Bonds wear with the San Francisco Giants?",
    options: ["24", "7", "25", "42"],
    correctAnswer: 2,
    explanation: "Bonds wore #25 with the Giants, where he broke the single-season (73) and career (762) home run records.",
  },
  {
    id: 27,
    question: "What number did Ernie Banks wear with the Chicago Cubs?",
    options: ["23", "14", "8", "10"],
    correctAnswer: 1,
    explanation: "Mr. Cub's #14 was retired by the Cubs. He hit 512 career home runs and was known for saying 'Let's play two!'",
  },
  {
    id: 28,
    question: "What number did Brooks Robinson wear with the Baltimore Orioles?",
    options: ["20", "7", "5", "15"],
    correctAnswer: 2,
    explanation: "The Human Vacuum Cleaner's #5 was retired by the Orioles. He won 16 Gold Gloves at third base.",
  },
  {
    id: 29,
    question: "What number did Frank Robinson wear with the Baltimore Orioles?",
    options: ["24", "20", "33", "15"],
    correctAnswer: 1,
    explanation: "Frank Robinson's #20 was retired by the Orioles. He is the only player to win MVP in both leagues.",
  },
  {
    id: 30,
    question: "What number did Rickey Henderson wear with the Oakland Athletics?",
    options: ["35", "22", "24", "42"],
    correctAnswer: 2,
    explanation: "Henderson's #24 was retired by the A's. He holds the all-time records for stolen bases (1,406) and runs scored (2,295).",
  },
  {
    id: 31,
    question: "What number did Roger Clemens wear with the Boston Red Sox?",
    options: ["22", "21", "12", "45"],
    correctAnswer: 1,
    explanation: "The Rocket wore #21 with the Red Sox, winning three Cy Young Awards in Boston.",
  },
  {
    id: 32,
    question: "What number did Craig Biggio wear with the Houston Astros?",
    options: ["4", "7", "14", "22"],
    correctAnswer: 1,
    explanation: "Biggio's #7 was retired by the Astros. He spent all 20 seasons in Houston and had 3,060 career hits.",
  },
  {
    id: 33,
    question: "What number did Ivan Rodriguez wear with the Texas Rangers?",
    options: ["12", "7", "19", "27"],
    correctAnswer: 1,
    explanation: "Pudge's #7 was retired by the Rangers. He won 13 Gold Gloves and the 1999 AL MVP.",
  },
  {
    id: 34,
    question: "What number did Mike Piazza wear with the New York Mets?",
    options: ["25", "31", "33", "12"],
    correctAnswer: 1,
    explanation: "Piazza's #31 was retired by the Mets. He hit the famous post-9/11 home run on September 21, 2001.",
  },
  {
    id: 35,
    question: "What number did Reggie Jackson wear with the New York Yankees?",
    options: ["9", "24", "44", "34"],
    correctAnswer: 2,
    explanation: "Mr. October's #44 was retired by the Yankees after his three home runs in Game 6 of the 1977 World Series became legend.",
  },
  {
    id: 36,
    question: "What number did Ozzie Smith wear with the St. Louis Cardinals?",
    options: ["1", "11", "23", "13"],
    correctAnswer: 0,
    explanation: "The Wizard of Oz wore #1 with the Cardinals and revolutionized shortstop defense with 13 Gold Gloves.",
  },
  {
    id: 37,
    question: "What number did George Brett wear with the Kansas City Royals?",
    options: ["16", "5", "29", "3"],
    correctAnswer: 1,
    explanation: "Brett's #5 was retired by the Royals. He flirted with .400 in 1980, finishing at .390.",
  },
  {
    id: 38,
    question: "What number did Mike Schmidt wear with the Philadelphia Phillies?",
    options: ["10", "20", "7", "36"],
    correctAnswer: 1,
    explanation: "Schmidt's #20 was retired by the Phillies. He won three NL MVP awards and 10 Gold Gloves.",
  },
  {
    id: 39,
    question: "What number did Johnny Bench wear with the Cincinnati Reds?",
    options: ["7", "3", "5", "14"],
    correctAnswer: 2,
    explanation: "Bench's #5 was retired by the Reds. He is widely considered the greatest catcher in baseball history.",
  },
  {
    id: 40,
    question: "What number did Carl Yastrzemski wear with the Boston Red Sox?",
    options: ["14", "8", "1", "22"],
    correctAnswer: 1,
    explanation: "Yaz's #8 was retired by the Red Sox. He won the Triple Crown in 1967.",
  },
  {
    id: 41,
    question: "What number did Shohei Ohtani wear with the Los Angeles Angels?",
    options: ["11", "16", "17", "7"],
    correctAnswer: 2,
    explanation: "Ohtani wore #17 with the Angels, becoming the most dominant two-way player since Babe Ruth.",
  },
  {
    id: 42,
    question: "What number did Clayton Kershaw wear with the Los Angeles Dodgers?",
    options: ["21", "22", "32", "56"],
    correctAnswer: 1,
    explanation: "Kershaw wears #22 with the Dodgers. He won three Cy Young Awards and the 2014 NL MVP.",
  },
  {
    id: 43,
    question: "What number did Manny Ramirez wear with the Boston Red Sox?",
    options: ["99", "24", "55", "23"],
    correctAnswer: 1,
    explanation: "Manny wore #24 with the Red Sox and was a key part of their 2004 curse-breaking World Series victory.",
  },
  {
    id: 44,
    question: "What number did Alex Rodriguez wear with the New York Yankees?",
    options: ["3", "24", "13", "25"],
    correctAnswer: 2,
    explanation: "A-Rod wore #13 with the Yankees after #3 was retired for Babe Ruth. He hit 696 career home runs.",
  },
  {
    id: 45,
    question: "What number did Yogi Berra wear with the New York Yankees?",
    options: ["3", "8", "5", "7"],
    correctAnswer: 1,
    explanation: "Yogi's #8 was retired by the Yankees. He won 10 World Series championships as a player.",
  },
  {
    id: 46,
    question: "What number did Bob Gibson wear with the St. Louis Cardinals?",
    options: ["17", "45", "31", "22"],
    correctAnswer: 1,
    explanation: "Gibson's #45 was retired by the Cardinals. His 1.12 ERA in 1968 led to the lowering of the pitching mound.",
  },
  {
    id: 47,
    question: "What number did Stan Musial wear with the St. Louis Cardinals?",
    options: ["1", "6", "21", "14"],
    correctAnswer: 1,
    explanation: "Stan the Man's #6 was retired by the Cardinals. He won seven NL batting titles and three MVP awards.",
  },
  {
    id: 48,
    question: "What number did Warren Spahn wear with the Milwaukee Braves?",
    options: ["21", "36", "14", "44"],
    correctAnswer: 0,
    explanation: "Spahn's #21 was retired by the Braves. He won 363 games, the most by a left-handed pitcher in history.",
  },
  {
    id: 49,
    question: "What number did Roy Halladay wear with the Philadelphia Phillies?",
    options: ["32", "34", "22", "41"],
    correctAnswer: 1,
    explanation: "Doc Halladay's #34 was retired by the Phillies. He threw a perfect game and a postseason no-hitter in 2010.",
  },
  {
    id: 50,
    question: "What number did Vladimir Guerrero Jr. wear with the Toronto Blue Jays?",
    options: ["27", "14", "9", "24"],
    correctAnswer: 0,
    explanation: "Vlad Jr. wears #27 with the Blue Jays and won the 2021 AL home run title with 48.",
  },
  {
    id: 51,
    question: "What number did Fernando Valenzuela wear with the Los Angeles Dodgers?",
    options: ["11", "34", "56", "21"],
    correctAnswer: 1,
    explanation: "Valenzuela's #34 was retired by the Dodgers in 2023. He sparked 'Fernandomania' in 1981.",
  },
  {
    id: 52,
    question: "What number did Bob Feller wear with the Cleveland Indians?",
    options: ["19", "36", "12", "8"],
    correctAnswer: 0,
    explanation: "Rapid Robert's #19 was the first number retired by the Cleveland franchise.",
  },
  {
    id: 53,
    question: "What number did Andre Dawson wear with the Chicago Cubs?",
    options: ["10", "44", "8", "24"],
    correctAnswer: 2,
    explanation: "The Hawk wore #8 with the Cubs and won the 1987 NL MVP despite the team finishing last in their division.",
  },
  {
    id: 54,
    question: "What number did Kirby Puckett wear with the Minnesota Twins?",
    options: ["24", "28", "34", "14"],
    correctAnswer: 2,
    explanation: "Puckett's #34 was retired by the Twins. His Game 6 heroics in the 1991 World Series are unforgettable.",
  },
  {
    id: 55,
    question: "What number did Wade Boggs wear with the Boston Red Sox?",
    options: ["12", "26", "8", "5"],
    correctAnswer: 1,
    explanation: "Boggs wore #26 with the Red Sox and won five AL batting titles in Boston.",
  },
  {
    id: 56,
    question: "What number did Juan Soto wear with the Washington Nationals?",
    options: ["13", "22", "7", "19"],
    correctAnswer: 1,
    explanation: "Soto wore #22 with the Nationals, winning the 2019 World Series at just 20 years old.",
  },
  {
    id: 57,
    question: "What number did Mookie Betts wear with the Boston Red Sox?",
    options: ["27", "50", "2", "15"],
    correctAnswer: 1,
    explanation: "Betts wore #50 with the Red Sox, winning the 2018 AL MVP and World Series before joining the Dodgers.",
  },
  {
    id: 58,
    question: "What number did Whitey Ford wear with the New York Yankees?",
    options: ["22", "16", "32", "36"],
    correctAnswer: 1,
    explanation: "The Chairman of the Board's #16 was retired by the Yankees. He holds the record for most World Series wins by a pitcher.",
  },
  {
    id: 59,
    question: "What number did Dennis Eckersley wear with the Oakland Athletics?",
    options: ["43", "35", "50", "13"],
    correctAnswer: 0,
    explanation: "Eck wore #43 with the A's and was the 1992 AL MVP and Cy Young winner as a closer.",
  },
  {
    id: 60,
    question: "What number did Jim Thome wear with the Cleveland Indians?",
    options: ["15", "25", "55", "7"],
    correctAnswer: 1,
    explanation: "Thome wore #25 with Cleveland and hit 612 career home runs, 8th all-time.",
  },
];

export function getDailyJerseyQuestions(date?: Date): JerseyQuestion[] {
  const now = date || new Date();
  const totalQuestions = mlbJerseyQuestions.length;
  const questionsPerDay = 5;

  const getEpochDay = (d: Date) => {
    const utc = Date.UTC(d.getFullYear(), d.getMonth(), d.getDate());
    return Math.floor(utc / 86400000);
  };

  const shuffleQuestions = (seed: number) => {
    const shuffled = [...mlbJerseyQuestions];
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
  const shuffled = shuffleQuestions(97);
  const startIndex = dayIndex * questionsPerDay;
  return shuffled.slice(startIndex, startIndex + questionsPerDay);
}

export function getJerseyTodayStorageKey(date?: Date): string {
  const now = date || new Date();
  return `mlb-jersey-${now.getFullYear()}-${now.getMonth() + 1}-${now.getDate()}`;
}
