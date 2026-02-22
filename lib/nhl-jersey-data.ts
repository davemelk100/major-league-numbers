export interface JerseyQuestion {
  id: number;
  question: string;
  options: string[];
  correctAnswer: number;
  explanation: string;
}

export const nhlJerseyQuestions: JerseyQuestion[] = [
  {
    id: 1,
    question: "What number did Wayne Gretzky wear with the Edmonton Oilers?",
    options: ["9", "66", "99", "19"],
    correctAnswer: 2,
    explanation: "The Great One's #99 was retired league-wide by the NHL in 2000 — no player will ever wear it again.",
  },
  {
    id: 2,
    question: "What number did Mario Lemieux wear with the Pittsburgh Penguins?",
    options: ["99", "66", "68", "33"],
    correctAnswer: 1,
    explanation: "Super Mario's #66 was retired by the Penguins. He later became the team's owner.",
  },
  {
    id: 3,
    question: "What number did Bobby Orr wear with the Boston Bruins?",
    options: ["7", "2", "4", "9"],
    correctAnswer: 2,
    explanation: "Orr's #4 was retired by the Bruins. His flying goal in the 1970 Stanley Cup is one of hockey's most iconic images.",
  },
  {
    id: 4,
    question: "What number did Gordie Howe wear with the Detroit Red Wings?",
    options: ["7", "9", "4", "14"],
    correctAnswer: 1,
    explanation: "Mr. Hockey's #9 was retired by the Red Wings. He played professional hockey until he was 52 years old.",
  },
  {
    id: 5,
    question: "What number did Sidney Crosby wear with the Pittsburgh Penguins?",
    options: ["66", "97", "87", "71"],
    correctAnswer: 2,
    explanation: "Sid the Kid wears #87 (born 8/7/87) with the Penguins and has won three Stanley Cups.",
  },
  {
    id: 6,
    question: "What number did Alexander Ovechkin wear with the Washington Capitals?",
    options: ["87", "9", "8", "19"],
    correctAnswer: 2,
    explanation: "Ovi wears #8 with the Capitals and broke Wayne Gretzky's all-time goals record.",
  },
  {
    id: 7,
    question: "What number did Connor McDavid wear with the Edmonton Oilers?",
    options: ["29", "87", "97", "91"],
    correctAnswer: 2,
    explanation: "McDavid wears #97 with the Oilers. He is widely considered the fastest and most skilled player in the modern game.",
  },
  {
    id: 8,
    question: "What number did Patrick Roy wear with the Montreal Canadiens?",
    options: ["1", "30", "33", "39"],
    correctAnswer: 2,
    explanation: "St. Patrick wore #33 with the Canadiens, winning two Stanley Cups and two Conn Smythe trophies in Montreal.",
  },
  {
    id: 9,
    question: "What number did Martin Brodeur wear with the New Jersey Devils?",
    options: ["35", "29", "1", "30"],
    correctAnswer: 3,
    explanation: "Brodeur's #30 was retired by the Devils. He holds the NHL records for most wins (691) and shutouts (125).",
  },
  {
    id: 10,
    question: "What number did Mark Messier wear with the New York Rangers?",
    options: ["17", "99", "11", "9"],
    correctAnswer: 2,
    explanation: "Messier's #11 was retired by the Rangers after he guaranteed and delivered the 1994 Stanley Cup.",
  },
  {
    id: 11,
    question: "What number did Steve Yzerman wear with the Detroit Red Wings?",
    options: ["14", "7", "19", "9"],
    correctAnswer: 2,
    explanation: "The Captain's #19 was retired by the Red Wings. He led Detroit to three Stanley Cup championships.",
  },
  {
    id: 12,
    question: "What number did Jaromir Jagr wear with the Pittsburgh Penguins?",
    options: ["66", "68", "88", "44"],
    correctAnswer: 1,
    explanation: "Jagr chose #68 to honor the Prague Spring of 1968. He won two Stanley Cups with the Penguins.",
  },
  {
    id: 13,
    question: "What number did Ray Bourque wear with the Boston Bruins?",
    options: ["77", "7", "17", "27"],
    correctAnswer: 0,
    explanation: "Bourque's #77 was retired by the Bruins. He unselfishly switched from #7 when Phil Esposito's number was retired.",
  },
  {
    id: 14,
    question: "What number did Maurice Richard wear with the Montreal Canadiens?",
    options: ["7", "4", "9", "15"],
    correctAnswer: 2,
    explanation: "The Rocket's #9 was retired by the Canadiens. He was the first player to score 50 goals in 50 games.",
  },
  {
    id: 15,
    question: "What number did Jean Beliveau wear with the Montreal Canadiens?",
    options: ["9", "2", "4", "19"],
    correctAnswer: 2,
    explanation: "Le Gros Bill's #4 was retired by the Canadiens. He won 10 Stanley Cups as a player.",
  },
  {
    id: 16,
    question: "What number did Guy Lafleur wear with the Montreal Canadiens?",
    options: ["7", "9", "10", "4"],
    correctAnswer: 2,
    explanation: "The Flower's #10 was retired by the Canadiens. He won five straight Stanley Cups from 1973 to 1979.",
  },
  {
    id: 17,
    question: "What number did Pavel Bure wear with the Vancouver Canucks?",
    options: ["96", "10", "8", "7"],
    correctAnswer: 1,
    explanation: "The Russian Rocket wore #10 with the Canucks, dazzling fans with his incredible speed and goal-scoring.",
  },
  {
    id: 18,
    question: "What number did Nicklas Lidstrom wear with the Detroit Red Wings?",
    options: ["7", "2", "5", "19"],
    correctAnswer: 2,
    explanation: "Lidstrom's #5 was retired by the Red Wings. The Perfect Human won seven Norris Trophies.",
  },
  {
    id: 19,
    question: "What number did Joe Sakic wear with the Colorado Avalanche?",
    options: ["88", "91", "21", "19"],
    correctAnswer: 3,
    explanation: "Burnaby Joe's #19 was retired by the Avalanche. He won two Stanley Cups and the 2001 Conn Smythe Trophy.",
  },
  {
    id: 20,
    question: "What number did Peter Forsberg wear with the Colorado Avalanche?",
    options: ["91", "19", "21", "9"],
    correctAnswer: 2,
    explanation: "Foppa's #21 was retired by the Avalanche. He won two Stanley Cups and the 2003 Hart Trophy.",
  },
  {
    id: 21,
    question: "What number did Patrick Kane wear with the Chicago Blackhawks?",
    options: ["19", "88", "10", "29"],
    correctAnswer: 1,
    explanation: "Kane wore #88 with the Blackhawks, winning three Stanley Cups and the 2016 Hart Trophy.",
  },
  {
    id: 22,
    question: "What number did Jonathan Toews wear with the Chicago Blackhawks?",
    options: ["88", "7", "19", "91"],
    correctAnswer: 2,
    explanation: "Captain Serious' #19 was retired by the Blackhawks. He won three Stanley Cups and the 2010 Conn Smythe.",
  },
  {
    id: 23,
    question: "What number did Dominik Hasek wear with the Buffalo Sabres?",
    options: ["31", "35", "39", "1"],
    correctAnswer: 2,
    explanation: "The Dominator wore #39 with the Sabres, winning six Vezina Trophies and two Hart Trophies.",
  },
  {
    id: 24,
    question: "What number did Terry Sawchuk wear with the Detroit Red Wings?",
    options: ["30", "35", "1", "29"],
    correctAnswer: 2,
    explanation: "Sawchuk's #1 was retired by the Red Wings. He held the shutout record (103) for decades.",
  },
  {
    id: 25,
    question: "What number did Mike Bossy wear with the New York Islanders?",
    options: ["19", "22", "9", "77"],
    correctAnswer: 1,
    explanation: "Bossy's #22 was retired by the Islanders. He scored 50+ goals in nine consecutive seasons.",
  },
  {
    id: 26,
    question: "What number did Denis Potvin wear with the New York Islanders?",
    options: ["19", "7", "5", "2"],
    correctAnswer: 2,
    explanation: "Potvin's #5 was retired by the Islanders. He captained them to four consecutive Stanley Cups.",
  },
  {
    id: 27,
    question: "What number did Paul Coffey wear with the Edmonton Oilers?",
    options: ["77", "4", "9", "7"],
    correctAnswer: 3,
    explanation: "Coffey wore #7 with the Oilers, scoring 48 goals in 1985-86 — a record for defensemen.",
  },
  {
    id: 28,
    question: "What number did Teemu Selanne wear with the Anaheim Ducks?",
    options: ["13", "8", "9", "11"],
    correctAnswer: 1,
    explanation: "The Finnish Flash's #8 was retired by the Ducks. He scored 76 goals as a rookie in 1992-93.",
  },
  {
    id: 29,
    question: "What number did Mats Sundin wear with the Toronto Maple Leafs?",
    options: ["7", "91", "13", "19"],
    correctAnswer: 2,
    explanation: "Sundin's #13 was the first number officially retired by the Maple Leafs through the 'Honoured' program.",
  },
  {
    id: 30,
    question: "What number did Henrik Lundqvist wear with the New York Rangers?",
    options: ["1", "35", "30", "33"],
    correctAnswer: 2,
    explanation: "King Henrik's #30 was retired by the Rangers. He won the 2012 Vezina Trophy.",
  },
  {
    id: 31,
    question: "What number did Eric Lindros wear with the Philadelphia Flyers?",
    options: ["66", "88", "99", "91"],
    correctAnswer: 1,
    explanation: "Lindros wore #88 with the Flyers, winning the 1995 Hart Trophy as the NHL's most valuable player.",
  },
  {
    id: 32,
    question: "What number did Mark Recchi wear with the Pittsburgh Penguins?",
    options: ["11", "8", "22", "67"],
    correctAnswer: 1,
    explanation: "Recchi wore #8 with the Penguins in the early '90s, helping them win the 1991 Stanley Cup.",
  },
  {
    id: 33,
    question: "What number did Phil Esposito wear with the Boston Bruins?",
    options: ["77", "12", "9", "7"],
    correctAnswer: 3,
    explanation: "Esposito's #7 was retired by the Bruins. He scored an incredible 76 goals in the 1970-71 season.",
  },
  {
    id: 34,
    question: "What number did Chris Chelios wear with the Detroit Red Wings?",
    options: ["7", "24", "5", "2"],
    correctAnswer: 1,
    explanation: "Chelios wore #24 with the Red Wings and won the Stanley Cup in 2002 and 2008.",
  },
  {
    id: 35,
    question: "What number did Scott Niedermayer wear with the New Jersey Devils?",
    options: ["27", "5", "7", "2"],
    correctAnswer: 0,
    explanation: "Niedermayer's #27 was retired by the Devils. He won three Stanley Cups in New Jersey.",
  },
  {
    id: 36,
    question: "What number did Ron Francis wear with the Hartford Whalers?",
    options: ["9", "10", "14", "19"],
    correctAnswer: 1,
    explanation: "Francis' #10 was retired by the Whalers/Hurricanes franchise. He is second all-time in NHL assists.",
  },
  {
    id: 37,
    question: "What number did Cam Neely wear with the Boston Bruins?",
    options: ["77", "12", "8", "17"],
    correctAnswer: 2,
    explanation: "Neely's #8 was retired by the Bruins. He was one of the most feared power forwards in NHL history.",
  },
  {
    id: 38,
    question: "What number did Brendan Shanahan wear with the Detroit Red Wings?",
    options: ["19", "14", "8", "17"],
    correctAnswer: 1,
    explanation: "Shanahan wore #14 with the Red Wings, winning three Stanley Cups in Detroit.",
  },
  {
    id: 39,
    question: "What number did Marcel Dionne wear with the Los Angeles Kings?",
    options: ["22", "16", "9", "99"],
    correctAnswer: 1,
    explanation: "Dionne's #16 was retired by the Kings. He scored 550 goals with Los Angeles.",
  },
  {
    id: 40,
    question: "What number did Auston Matthews wear with the Toronto Maple Leafs?",
    options: ["91", "16", "88", "34"],
    correctAnswer: 3,
    explanation: "Matthews wears #34 with the Leafs. He scored 60+ goals in 2021-22 and won the Rocket Richard Trophy.",
  },
  {
    id: 41,
    question: "What number did Nathan MacKinnon wear with the Colorado Avalanche?",
    options: ["97", "91", "29", "88"],
    correctAnswer: 2,
    explanation: "MacKinnon wears #29 with the Avalanche. He won the 2022 Stanley Cup and Conn Smythe Trophy.",
  },
  {
    id: 42,
    question: "What number did Nikita Kucherov wear with the Tampa Bay Lightning?",
    options: ["86", "91", "98", "77"],
    correctAnswer: 0,
    explanation: "Kucherov wears #86 with the Lightning. He won the Hart Trophy in 2019 and two Stanley Cups.",
  },
  {
    id: 43,
    question: "What number did Leon Draisaitl wear with the Edmonton Oilers?",
    options: ["97", "91", "29", "14"],
    correctAnswer: 2,
    explanation: "Draisaitl wears #29 with the Oilers. He won the Hart Trophy and Art Ross Trophy in 2020.",
  },
  {
    id: 44,
    question: "What number did Bobby Hull wear with the Chicago Black Hawks?",
    options: ["7", "21", "16", "9"],
    correctAnswer: 3,
    explanation: "The Golden Jet's #9 was retired by the Blackhawks. He was the first player to score over 50 goals in a season twice.",
  },
  {
    id: 45,
    question: "What number did Stan Mikita wear with the Chicago Black Hawks?",
    options: ["7", "21", "9", "17"],
    correctAnswer: 1,
    explanation: "Mikita's #21 was retired by the Blackhawks. He won two Hart Trophies and two Art Ross Trophies.",
  },
  {
    id: 46,
    question: "What number did Larry Robinson wear with the Montreal Canadiens?",
    options: ["2", "19", "5", "17"],
    correctAnswer: 1,
    explanation: "Big Bird's #19 was retired by the Canadiens. He won six Stanley Cups and the 1977 Conn Smythe.",
  },
  {
    id: 47,
    question: "What number did Grant Fuhr wear with the Edmonton Oilers?",
    options: ["1", "35", "31", "30"],
    correctAnswer: 2,
    explanation: "Fuhr's #31 was retired by the Oilers. He won five Stanley Cups and the 1988 Vezina Trophy.",
  },
  {
    id: 48,
    question: "What number did Doug Gilmour wear with the Toronto Maple Leafs?",
    options: ["13", "93", "7", "19"],
    correctAnswer: 1,
    explanation: "Killer wore #93 with the Leafs. He led Toronto on a memorable 1993 playoff run.",
  },
  {
    id: 49,
    question: "What number did Jarome Iginla wear with the Calgary Flames?",
    options: ["24", "11", "14", "12"],
    correctAnswer: 3,
    explanation: "Iggy's #12 was retired by the Flames. He scored 525 career goals and won two Rocket Richard Trophies.",
  },
  {
    id: 50,
    question: "What number did Roberto Luongo wear with the Vancouver Canucks?",
    options: ["35", "30", "1", "39"],
    correctAnswer: 2,
    explanation: "Luongo wore #1 with the Canucks. He was a two-time Vezina finalist and an Olympic gold medalist.",
  },
  {
    id: 51,
    question: "What number did Sergei Fedorov wear with the Detroit Red Wings?",
    options: ["19", "13", "91", "11"],
    correctAnswer: 2,
    explanation: "Fedorov wore #91 with the Red Wings. He won three Stanley Cups and the 1994 Hart Trophy.",
  },
  {
    id: 52,
    question: "What number did Brett Hull wear with the St. Louis Blues?",
    options: ["22", "9", "16", "7"],
    correctAnswer: 2,
    explanation: "The Golden Brett's #16 was retired by the Blues. He scored 86 goals in the 1990-91 season.",
  },
  {
    id: 53,
    question: "What number did Luc Robitaille wear with the Los Angeles Kings?",
    options: ["17", "7", "20", "9"],
    correctAnswer: 2,
    explanation: "Lucky Luc's #20 was retired by the Kings. He is the highest-scoring left winger in NHL history.",
  },
  {
    id: 54,
    question: "What number did Bryan Trottier wear with the New York Islanders?",
    options: ["19", "7", "11", "9"],
    correctAnswer: 0,
    explanation: "Trottier's #19 was retired by the Islanders. He won four consecutive Stanley Cups from 1980 to 1983.",
  },
  {
    id: 55,
    question: "What number did Chris Pronger wear with the St. Louis Blues?",
    options: ["44", "20", "2", "55"],
    correctAnswer: 0,
    explanation: "Pronger wore #44 with the Blues. He won the 2000 Hart Trophy and Norris Trophy.",
  },
  {
    id: 56,
    question: "What number did Carey Price wear with the Montreal Canadiens?",
    options: ["33", "30", "39", "31"],
    correctAnswer: 3,
    explanation: "Price wears #31 with the Canadiens. He won the Hart Trophy and Vezina Trophy in 2015.",
  },
  {
    id: 57,
    question: "What number did Zdeno Chara wear with the Boston Bruins?",
    options: ["33", "77", "44", "3"],
    correctAnswer: 0,
    explanation: "Chara wore #33 with the Bruins. At 6'9\", he captained the Bruins to the 2011 Stanley Cup.",
  },
  {
    id: 58,
    question: "What number did Patrice Bergeron wear with the Boston Bruins?",
    options: ["73", "63", "37", "77"],
    correctAnswer: 2,
    explanation: "Bergeron's #37 was retired by the Bruins. He won five Selke Trophies as the NHL's best defensive forward.",
  },
  {
    id: 59,
    question: "What number did Cale Makar wear with the Colorado Avalanche?",
    options: ["5", "8", "44", "22"],
    correctAnswer: 1,
    explanation: "Makar wears #8 with the Avalanche. He won the Norris Trophy and Conn Smythe Trophy in 2022.",
  },
  {
    id: 60,
    question: "What number did Igor Larionov wear with the Detroit Red Wings?",
    options: ["13", "8", "91", "17"],
    correctAnswer: 1,
    explanation: "The Professor wore #8 with the Red Wings as part of the legendary Russian Five. He won three Stanley Cups.",
  },
];

export function getDailyJerseyQuestions(date?: Date): JerseyQuestion[] {
  const now = date || new Date();
  const totalQuestions = nhlJerseyQuestions.length;
  const questionsPerDay = 5;

  const getEpochDay = (d: Date) => {
    const utc = Date.UTC(d.getFullYear(), d.getMonth(), d.getDate());
    return Math.floor(utc / 86400000);
  };

  const shuffleQuestions = (seed: number) => {
    const shuffled = [...nhlJerseyQuestions];
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
  const shuffled = shuffleQuestions(149);
  const startIndex = dayIndex * questionsPerDay;
  return shuffled.slice(startIndex, startIndex + questionsPerDay);
}

export function getJerseyTodayStorageKey(date?: Date): string {
  const now = date || new Date();
  return `nhl-jersey-${now.getFullYear()}-${now.getMonth() + 1}-${now.getDate()}`;
}
