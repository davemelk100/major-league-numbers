export interface JerseyQuestion {
  id: number;
  question: string;
  options: string[];
  correctAnswer: number;
  explanation: string;
}

export const nbaJerseyQuestions: JerseyQuestion[] = [
  {
    id: 1,
    question: "What number did Michael Jordan wear with the Chicago Bulls?",
    options: ["23", "45", "12", "33"],
    correctAnswer: 0,
    explanation: "Michael Jordan's #23 is the most iconic number in NBA history. The Bulls retired it twice.",
  },
  {
    id: 2,
    question: "What number did LeBron James wear with the Miami Heat?",
    options: ["23", "6", "32", "8"],
    correctAnswer: 1,
    explanation: "LeBron wore #6 with the Heat during his four seasons in Miami (2010-2014), winning two championships.",
  },
  {
    id: 3,
    question: "What number did Kobe Bryant wear during his final seasons with the Lakers?",
    options: ["8", "24", "33", "14"],
    correctAnswer: 1,
    explanation: "Kobe switched from #8 to #24 before the 2006-07 season. The Lakers retired both numbers.",
  },
  {
    id: 4,
    question: "What number did Magic Johnson wear with the Los Angeles Lakers?",
    options: ["12", "33", "32", "44"],
    correctAnswer: 2,
    explanation: "Magic Johnson's #32 was retired by the Lakers in 1992 after his legendary career running the Showtime offense.",
  },
  {
    id: 5,
    question: "What number did Larry Bird wear with the Boston Celtics?",
    options: ["7", "33", "32", "44"],
    correctAnswer: 1,
    explanation: "Larry Bird wore #33 throughout his entire career with the Celtics from 1979 to 1992.",
  },
  {
    id: 6,
    question: "What number did Shaquille O'Neal wear with the Los Angeles Lakers?",
    options: ["32", "36", "34", "33"],
    correctAnswer: 2,
    explanation: "Shaq wore #34 with the Lakers, winning three consecutive championships from 2000 to 2002.",
  },
  {
    id: 7,
    question: "What number did Tim Duncan wear with the San Antonio Spurs?",
    options: ["50", "21", "12", "32"],
    correctAnswer: 1,
    explanation: "Tim Duncan wore #21 for his entire 19-year career with the Spurs, winning five championships.",
  },
  {
    id: 8,
    question: "What number did Allen Iverson wear with the Philadelphia 76ers?",
    options: ["1", "3", "11", "23"],
    correctAnswer: 1,
    explanation: "Allen Iverson's #3 jersey was retired by the 76ers in 2014. He was the 2001 NBA MVP.",
  },
  {
    id: 9,
    question: "What number did Kareem Abdul-Jabbar wear with the Los Angeles Lakers?",
    options: ["34", "33", "32", "13"],
    correctAnswer: 1,
    explanation: "Kareem wore #33 with the Lakers, where he won five of his six MVP awards.",
  },
  {
    id: 10,
    question: "What number did Wilt Chamberlain wear with the Philadelphia 76ers?",
    options: ["100", "13", "33", "7"],
    correctAnswer: 1,
    explanation: "Wilt wore #13 with the 76ers, where he won the 1967 NBA championship.",
  },
  {
    id: 11,
    question: "What number did Stephen Curry wear with the Golden State Warriors?",
    options: ["35", "11", "30", "20"],
    correctAnswer: 2,
    explanation: "Steph Curry has worn #30 his entire career, leading the Warriors to four championships.",
  },
  {
    id: 12,
    question: "What number did Kevin Durant wear with the Oklahoma City Thunder?",
    options: ["7", "35", "30", "11"],
    correctAnswer: 1,
    explanation: "KD wore #35 with the Thunder, honoring his childhood AAU coach Charles Craig who was murdered at age 35.",
  },
  {
    id: 13,
    question: "What number did Dwyane Wade wear with the Miami Heat?",
    options: ["1", "9", "3", "20"],
    correctAnswer: 2,
    explanation: "D-Wade's #3 was retired by the Heat in a ceremony on February 22, 2020.",
  },
  {
    id: 14,
    question: "What number did Dirk Nowitzki wear with the Dallas Mavericks?",
    options: ["14", "7", "41", "21"],
    correctAnswer: 2,
    explanation: "Dirk wore #41 for all 21 seasons with Dallas, winning the 2011 NBA championship.",
  },
  {
    id: 15,
    question: "What number did Hakeem Olajuwon wear with the Houston Rockets?",
    options: ["33", "34", "7", "32"],
    correctAnswer: 1,
    explanation: "Hakeem's #34 was retired by the Rockets after he led them to back-to-back titles in 1994-95.",
  },
  {
    id: 16,
    question: "What number did Patrick Ewing wear with the New York Knicks?",
    options: ["32", "3", "33", "43"],
    correctAnswer: 2,
    explanation: "Patrick Ewing's #33 was retired by the Knicks in 2003 after his dominant career at MSG.",
  },
  {
    id: 17,
    question: "What number did Charles Barkley wear with the Phoenix Suns?",
    options: ["32", "4", "34", "14"],
    correctAnswer: 2,
    explanation: "Sir Charles wore #34 with the Suns, earning the 1993 MVP and leading them to the Finals.",
  },
  {
    id: 18,
    question: "What number did Dennis Rodman wear with the Chicago Bulls?",
    options: ["10", "73", "91", "70"],
    correctAnswer: 2,
    explanation: "Rodman chose the unconventional #91 with the Bulls, winning three titles from 1996-98.",
  },
  {
    id: 19,
    question: "What number did Scottie Pippen wear with the Chicago Bulls?",
    options: ["33", "5", "22", "44"],
    correctAnswer: 0,
    explanation: "Pippen's #33 was retired by the Bulls. He won six championships alongside Michael Jordan.",
  },
  {
    id: 20,
    question: "What number did Isiah Thomas wear with the Detroit Pistons?",
    options: ["1", "11", "10", "3"],
    correctAnswer: 1,
    explanation: "Isiah Thomas wore #11 with the Bad Boy Pistons, winning back-to-back championships in 1989-90.",
  },
  {
    id: 21,
    question: "What number did David Robinson wear with the San Antonio Spurs?",
    options: ["5", "50", "34", "44"],
    correctAnswer: 1,
    explanation: "The Admiral's #50 was retired by the Spurs. He won two championships and scored 71 points in a game.",
  },
  {
    id: 22,
    question: "What number did John Stockton wear with the Utah Jazz?",
    options: ["32", "1", "12", "10"],
    correctAnswer: 2,
    explanation: "Stockton's #12 was retired by the Jazz. He holds the all-time records for assists and steals.",
  },
  {
    id: 23,
    question: "What number did Karl Malone wear with the Utah Jazz?",
    options: ["11", "32", "14", "45"],
    correctAnswer: 1,
    explanation: "Karl Malone's #32 was retired by the Jazz. The Mailman is the second-leading scorer in NBA history.",
  },
  {
    id: 24,
    question: "What number did Russell Westbrook wear with the Oklahoma City Thunder?",
    options: ["4", "2", "0", "1"],
    correctAnswer: 2,
    explanation: "Westbrook wore #0 with the Thunder, where he won the 2017 MVP averaging a triple-double.",
  },
  {
    id: 25,
    question: "What number did James Harden wear with the Houston Rockets?",
    options: ["3", "13", "1", "7"],
    correctAnswer: 1,
    explanation: "Harden wore #13 with the Rockets, winning the 2018 MVP and averaging 36.1 PPG in 2018-19.",
  },
  {
    id: 26,
    question: "What number did Kawhi Leonard wear with the San Antonio Spurs?",
    options: ["15", "2", "3", "14"],
    correctAnswer: 1,
    explanation: "Kawhi wore #2 with the Spurs, winning the 2014 Finals MVP at age 22.",
  },
  {
    id: 27,
    question: "What number did Giannis Antetokounmpo wear with the Milwaukee Bucks?",
    options: ["13", "34", "21", "7"],
    correctAnswer: 1,
    explanation: "The Greek Freak wears #34 and led the Bucks to the 2021 NBA championship.",
  },
  {
    id: 28,
    question: "What number did Chris Paul wear with the New Orleans Hornets?",
    options: ["1", "3", "15", "7"],
    correctAnswer: 1,
    explanation: "CP3 wore #3 with the Hornets, earning Rookie of the Year in 2006 and finishing 2nd in MVP voting in 2008.",
  },
  {
    id: 29,
    question: "What number did Kevin Garnett wear with the Minnesota Timberwolves?",
    options: ["34", "5", "21", "15"],
    correctAnswer: 2,
    explanation: "KG wore #21 with the T-Wolves for 12 seasons, winning the 2004 MVP.",
  },
  {
    id: 30,
    question: "What number did Ray Allen wear with the Boston Celtics?",
    options: ["34", "20", "14", "8"],
    correctAnswer: 1,
    explanation: "Ray Allen wore #20 with the Celtics, helping them win the 2008 championship alongside Pierce and Garnett.",
  },
  {
    id: 31,
    question: "What number did Paul Pierce wear with the Boston Celtics?",
    options: ["34", "5", "20", "11"],
    correctAnswer: 0,
    explanation: "The Truth wore #34 for the Celtics and won the 2008 Finals MVP.",
  },
  {
    id: 32,
    question: "What number did Reggie Miller wear with the Indiana Pacers?",
    options: ["31", "8", "24", "11"],
    correctAnswer: 0,
    explanation: "Reggie Miller's #31 was retired by the Pacers. He was one of the greatest three-point shooters ever.",
  },
  {
    id: 33,
    question: "What number did Steve Nash wear with the Phoenix Suns?",
    options: ["10", "1", "13", "7"],
    correctAnswer: 2,
    explanation: "Nash wore #13 with the Suns, winning back-to-back MVPs in 2005 and 2006.",
  },
  {
    id: 34,
    question: "What number did Vince Carter wear with the Toronto Raptors?",
    options: ["1", "25", "15", "9"],
    correctAnswer: 2,
    explanation: "Vince Carter wore #15 with the Raptors and put on one of the greatest dunk contest performances ever in 2000.",
  },
  {
    id: 35,
    question: "What number did Tracy McGrady wear with the Orlando Magic?",
    options: ["3", "1", "11", "33"],
    correctAnswer: 1,
    explanation: "T-Mac wore #1 with the Magic, where he won back-to-back scoring titles in 2003 and 2004.",
  },
  {
    id: 36,
    question: "What number did Bill Russell wear with the Boston Celtics?",
    options: ["14", "6", "1", "32"],
    correctAnswer: 1,
    explanation: "Bill Russell's #6 was retired league-wide by the NBA in 2022. He won 11 championships with the Celtics.",
  },
  {
    id: 37,
    question: "What number did Julius Erving wear with the Philadelphia 76ers?",
    options: ["32", "6", "12", "3"],
    correctAnswer: 1,
    explanation: "Dr. J wore #6 with the 76ers, winning the 1983 NBA championship.",
  },
  {
    id: 38,
    question: "What number did Oscar Robertson wear with the Cincinnati Royals?",
    options: ["1", "14", "12", "22"],
    correctAnswer: 1,
    explanation: "The Big O wore #14 and was the first player to average a triple-double for an entire season.",
  },
  {
    id: 39,
    question: "What number did Jerry West wear with the Los Angeles Lakers?",
    options: ["24", "14", "44", "25"],
    correctAnswer: 2,
    explanation: "Jerry West's #44 was retired by the Lakers. He is widely believed to be the silhouette in the NBA logo.",
  },
  {
    id: 40,
    question: "What number did Walt Frazier wear with the New York Knicks?",
    options: ["22", "10", "15", "12"],
    correctAnswer: 1,
    explanation: "Clyde Frazier's #10 was retired by the Knicks after he led them to two championships.",
  },
  {
    id: 41,
    question: "What number did Dominique Wilkins wear with the Atlanta Hawks?",
    options: ["12", "21", "4", "9"],
    correctAnswer: 1,
    explanation: "The Human Highlight Film wore #21 with the Hawks and was one of the most electrifying dunkers ever.",
  },
  {
    id: 42,
    question: "What number did Carmelo Anthony wear with the Denver Nuggets?",
    options: ["7", "15", "22", "3"],
    correctAnswer: 1,
    explanation: "Melo wore #15 with the Nuggets from 2003 to 2011 before switching to #7 with the Knicks.",
  },
  {
    id: 43,
    question: "What number did Yao Ming wear with the Houston Rockets?",
    options: ["15", "13", "11", "7"],
    correctAnswer: 2,
    explanation: "Yao's #11 was retired by the Rockets. He was an 8-time All-Star and opened NBA's door to Chinese fans.",
  },
  {
    id: 44,
    question: "What number did Dikembe Mutombo wear with the Denver Nuggets?",
    options: ["33", "7", "55", "14"],
    correctAnswer: 2,
    explanation: "Mutombo wore #55 with the Nuggets and was famous for his finger-wag after blocking shots.",
  },
  {
    id: 45,
    question: "What number did Chris Webber wear with the Sacramento Kings?",
    options: ["2", "4", "23", "14"],
    correctAnswer: 1,
    explanation: "C-Webb wore #4 with the Kings during their exciting early-2000s era that nearly reached the Finals.",
  },
  {
    id: 46,
    question: "What number did Kyrie Irving wear with the Cleveland Cavaliers?",
    options: ["11", "1", "2", "23"],
    correctAnswer: 2,
    explanation: "Kyrie wore #2 with the Cavaliers, hitting the iconic Game 7 three-pointer in the 2016 Finals.",
  },
  {
    id: 47,
    question: "What number did Anthony Davis wear with the New Orleans Pelicans?",
    options: ["3", "1", "23", "32"],
    correctAnswer: 2,
    explanation: "AD wore #23 with the Pelicans before switching to #3 with the Lakers.",
  },
  {
    id: 48,
    question: "What number did Penny Hardaway wear with the Orlando Magic?",
    options: ["25", "10", "1", "3"],
    correctAnswer: 2,
    explanation: "Penny wore #1 with the Magic and alongside Shaq formed one of the most exciting duos in the '90s.",
  },
  {
    id: 49,
    question: "What number did Jason Kidd wear with the New Jersey Nets?",
    options: ["32", "2", "5", "11"],
    correctAnswer: 2,
    explanation: "J-Kidd wore #5 with the Nets, leading them to back-to-back Finals appearances in 2002-03.",
  },
  {
    id: 50,
    question: "What number did Dwight Howard wear with the Orlando Magic?",
    options: ["8", "39", "12", "1"],
    correctAnswer: 2,
    explanation: "Dwight wore #12 with the Magic, leading them to the 2009 NBA Finals.",
  },
  {
    id: 51,
    question: "What number did Clyde Drexler wear with the Portland Trail Blazers?",
    options: ["22", "32", "10", "14"],
    correctAnswer: 0,
    explanation: "Clyde the Glide's #22 was retired by the Blazers. He led Portland to two NBA Finals appearances.",
  },
  {
    id: 52,
    question: "What number did Gary Payton wear with the Seattle SuperSonics?",
    options: ["2", "20", "0", "12"],
    correctAnswer: 1,
    explanation: "The Glove wore #20 with the Sonics and is the only point guard to win Defensive Player of the Year.",
  },
  {
    id: 53,
    question: "What number did Alonzo Mourning wear with the Miami Heat?",
    options: ["3", "33", "42", "55"],
    correctAnswer: 1,
    explanation: "Zo's #33 was retired by the Heat. He won the 2006 championship and two Defensive Player of the Year awards.",
  },
  {
    id: 54,
    question: "What number did Kevin McHale wear with the Boston Celtics?",
    options: ["44", "32", "00", "11"],
    correctAnswer: 1,
    explanation: "McHale's #32 was retired by the Celtics. He was known for having the best post moves in NBA history.",
  },
  {
    id: 55,
    question: "What number did Elgin Baylor wear with the Los Angeles Lakers?",
    options: ["44", "22", "14", "33"],
    correctAnswer: 1,
    explanation: "Elgin Baylor's #22 was retired by the Lakers. He once scored 71 points in a single game.",
  },
  {
    id: 56,
    question: "What number did Pete Maravich wear with the New Orleans Jazz?",
    options: ["44", "7", "23", "11"],
    correctAnswer: 1,
    explanation: "Pistol Pete wore #7 with the Jazz and was one of the most creative ball-handlers in basketball history.",
  },
  {
    id: 57,
    question: "What number did Luka Doncic wear with the Dallas Mavericks?",
    options: ["3", "77", "7", "11"],
    correctAnswer: 1,
    explanation: "Luka wears #77 with the Mavs, an unusual number that he chose to honor his Slovenian roots.",
  },
  {
    id: 58,
    question: "What number did Nikola Jokic wear with the Denver Nuggets?",
    options: ["7", "15", "41", "34"],
    correctAnswer: 1,
    explanation: "Jokic wears #15 with the Nuggets. He won three consecutive MVPs and the 2023 NBA championship.",
  },
  {
    id: 59,
    question: "What number did Joel Embiid wear with the Philadelphia 76ers?",
    options: ["25", "21", "12", "34"],
    correctAnswer: 1,
    explanation: "Embiid wears #21 with the Sixers and won the 2023 NBA MVP award.",
  },
  {
    id: 60,
    question: "What number did Damian Lillard wear with the Portland Trail Blazers?",
    options: ["1", "7", "0", "30"],
    correctAnswer: 2,
    explanation: "Dame wore #0 with the Blazers, known for his clutch buzzer-beaters in the playoffs.",
  },
];

export function getDailyJerseyQuestions(date?: Date): JerseyQuestion[] {
  const now = date || new Date();
  const totalQuestions = nbaJerseyQuestions.length;
  const questionsPerDay = 5;

  const getEpochDay = (d: Date) => {
    const utc = Date.UTC(d.getFullYear(), d.getMonth(), d.getDate());
    return Math.floor(utc / 86400000);
  };

  const shuffleQuestions = (seed: number) => {
    const shuffled = [...nbaJerseyQuestions];
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
  const shuffled = shuffleQuestions(131);
  const startIndex = dayIndex * questionsPerDay;
  return shuffled.slice(startIndex, startIndex + questionsPerDay);
}

export function getJerseyTodayStorageKey(date?: Date): string {
  const now = date || new Date();
  return `nba-jersey-${now.getFullYear()}-${now.getMonth() + 1}-${now.getDate()}`;
}
