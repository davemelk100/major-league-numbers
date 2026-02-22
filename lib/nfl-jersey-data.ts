export interface JerseyQuestion {
  id: number;
  question: string;
  options: string[];
  correctAnswer: number;
  explanation: string;
}

export const nflJerseyQuestions: JerseyQuestion[] = [
  {
    id: 1,
    question: "What number did Tom Brady wear with the New England Patriots?",
    options: ["7", "10", "12", "14"],
    correctAnswer: 2,
    explanation: "Brady's #12 became synonymous with winning in New England, where he won six Super Bowls.",
  },
  {
    id: 2,
    question: "What number did Joe Montana wear with the San Francisco 49ers?",
    options: ["12", "7", "3", "16"],
    correctAnswer: 3,
    explanation: "Joe Cool wore #16 with the 49ers, winning four Super Bowls and three Super Bowl MVPs.",
  },
  {
    id: 3,
    question: "What number did Jerry Rice wear with the San Francisco 49ers?",
    options: ["84", "80", "88", "81"],
    correctAnswer: 1,
    explanation: "Rice's #80 was retired by the 49ers. He is the NFL's all-time leader in receptions, receiving yards, and receiving touchdowns.",
  },
  {
    id: 4,
    question: "What number did Walter Payton wear with the Chicago Bears?",
    options: ["22", "44", "34", "32"],
    correctAnswer: 2,
    explanation: "Sweetness' #34 was retired by the Bears. The NFL's Man of the Year award is named after him.",
  },
  {
    id: 5,
    question: "What number did Jim Brown wear with the Cleveland Browns?",
    options: ["44", "34", "32", "22"],
    correctAnswer: 2,
    explanation: "Jim Brown's #32 was retired by the Browns. Many consider him the greatest running back in NFL history.",
  },
  {
    id: 6,
    question: "What number did Joe Namath wear with the New York Jets?",
    options: ["7", "16", "12", "19"],
    correctAnswer: 2,
    explanation: "Broadway Joe's #12 was retired by the Jets after he guaranteed victory in Super Bowl III.",
  },
  {
    id: 7,
    question: "What number did Peyton Manning wear with the Indianapolis Colts?",
    options: ["12", "7", "18", "16"],
    correctAnswer: 2,
    explanation: "Manning's #18 was retired by the Colts. He won the Super Bowl XLI and is a five-time NFL MVP.",
  },
  {
    id: 8,
    question: "What number did Brett Favre wear with the Green Bay Packers?",
    options: ["12", "7", "4", "16"],
    correctAnswer: 2,
    explanation: "Favre's #4 was retired by the Packers. He holds the record for most consecutive starts by a quarterback (297).",
  },
  {
    id: 9,
    question: "What number did Lawrence Taylor wear with the New York Giants?",
    options: ["52", "56", "58", "55"],
    correctAnswer: 1,
    explanation: "LT's #56 was retired by the Giants. He revolutionized the linebacker position and won two Super Bowls.",
  },
  {
    id: 10,
    question: "What number did Barry Sanders wear with the Detroit Lions?",
    options: ["26", "34", "20", "21"],
    correctAnswer: 2,
    explanation: "Sanders' #20 was retired by the Lions. He rushed for 15,269 yards before his shocking retirement at age 30.",
  },
  {
    id: 11,
    question: "What number did Emmitt Smith wear with the Dallas Cowboys?",
    options: ["21", "22", "28", "34"],
    correctAnswer: 1,
    explanation: "Smith's #22 was retired by the Cowboys. He is the NFL's all-time leading rusher with 18,355 yards.",
  },
  {
    id: 12,
    question: "What number did Dan Marino wear with the Miami Dolphins?",
    options: ["12", "7", "13", "14"],
    correctAnswer: 2,
    explanation: "Marino's #13 was retired by the Dolphins. He threw for 48 touchdowns in 1984, a record that stood for 20 years.",
  },
  {
    id: 13,
    question: "What number did Johnny Unitas wear with the Baltimore Colts?",
    options: ["12", "7", "16", "19"],
    correctAnswer: 3,
    explanation: "Unitas' #19 was retired by the Colts. He held the record for consecutive games with a touchdown pass (47) for 52 years.",
  },
  {
    id: 14,
    question: "What number did Ray Lewis wear with the Baltimore Ravens?",
    options: ["51", "54", "52", "55"],
    correctAnswer: 2,
    explanation: "Lewis' #52 was retired by the Ravens. He won two Defensive Player of the Year awards and Super Bowl XXXV MVP.",
  },
  {
    id: 15,
    question: "What number did Deion Sanders wear with the Dallas Cowboys?",
    options: ["2", "24", "21", "8"],
    correctAnswer: 2,
    explanation: "Prime Time wore #21 with the Cowboys and is the only player to play in both a Super Bowl and a World Series.",
  },
  {
    id: 16,
    question: "What number did Dick Butkus wear with the Chicago Bears?",
    options: ["50", "51", "55", "58"],
    correctAnswer: 1,
    explanation: "Butkus' #51 was retired by the Bears. The award for the nation's best college linebacker is named after him.",
  },
  {
    id: 17,
    question: "What number did Reggie White wear with the Green Bay Packers?",
    options: ["92", "98", "91", "96"],
    correctAnswer: 0,
    explanation: "The Minister of Defense wore #92 with the Packers, helping them win Super Bowl XXXI.",
  },
  {
    id: 18,
    question: "What number did John Elway wear with the Denver Broncos?",
    options: ["12", "16", "7", "14"],
    correctAnswer: 2,
    explanation: "Elway's #7 was retired by the Broncos. He won back-to-back Super Bowls in his final two seasons.",
  },
  {
    id: 19,
    question: "What number did Terry Bradshaw wear with the Pittsburgh Steelers?",
    options: ["7", "14", "12", "16"],
    correctAnswer: 2,
    explanation: "Bradshaw's #12 was retired by the Steelers. He won four Super Bowls in six years.",
  },
  {
    id: 20,
    question: "What number did Randy Moss wear with the Minnesota Vikings?",
    options: ["18", "81", "84", "80"],
    correctAnswer: 2,
    explanation: "Moss wore #84 with the Vikings, where he caught 17 touchdowns as a rookie in 1998.",
  },
  {
    id: 21,
    question: "What number did Patrick Mahomes wear with the Kansas City Chiefs?",
    options: ["7", "5", "1", "15"],
    correctAnswer: 3,
    explanation: "Mahomes wears #15 with the Chiefs and has won multiple Super Bowls and MVP awards.",
  },
  {
    id: 22,
    question: "What number did Aaron Rodgers wear with the Green Bay Packers?",
    options: ["4", "8", "7", "12"],
    correctAnswer: 3,
    explanation: "Rodgers wore #12 with the Packers, winning Super Bowl XLV and four NFL MVP awards.",
  },
  {
    id: 23,
    question: "What number did Troy Aikman wear with the Dallas Cowboys?",
    options: ["12", "7", "8", "11"],
    correctAnswer: 2,
    explanation: "Aikman's #8 was retired by the Cowboys. He won three Super Bowls in four years in the 1990s.",
  },
  {
    id: 24,
    question: "What number did Ronnie Lott wear with the San Francisco 49ers?",
    options: ["24", "42", "8", "22"],
    correctAnswer: 1,
    explanation: "Lott wore #42 with the 49ers and was one of the hardest-hitting safeties in NFL history.",
  },
  {
    id: 25,
    question: "What number did Marshall Faulk wear with the St. Louis Rams?",
    options: ["22", "28", "34", "21"],
    correctAnswer: 1,
    explanation: "Faulk wore #28 with the Rams as part of 'The Greatest Show on Turf,' winning the 2000 MVP.",
  },
  {
    id: 26,
    question: "What number did Ed Reed wear with the Baltimore Ravens?",
    options: ["26", "24", "20", "29"],
    correctAnswer: 2,
    explanation: "Reed wore #20 with the Ravens and holds the NFL record for longest interception return (107 yards).",
  },
  {
    id: 27,
    question: "What number did Drew Brees wear with the New Orleans Saints?",
    options: ["12", "6", "9", "15"],
    correctAnswer: 2,
    explanation: "Brees' #9 was retired by the Saints. He led them to their only Super Bowl victory in Super Bowl XLIV.",
  },
  {
    id: 28,
    question: "What number did Adrian Peterson wear with the Minnesota Vikings?",
    options: ["21", "28", "26", "30"],
    correctAnswer: 1,
    explanation: "AD wore #28 with the Vikings and rushed for 2,097 yards in 2012, winning the MVP.",
  },
  {
    id: 29,
    question: "What number did Tony Gonzalez wear with the Kansas City Chiefs?",
    options: ["80", "82", "88", "85"],
    correctAnswer: 2,
    explanation: "Gonzalez wore #88 with the Chiefs, revolutionizing the tight end position with 14 Pro Bowl selections.",
  },
  {
    id: 30,
    question: "What number did Michael Strahan wear with the New York Giants?",
    options: ["92", "91", "97", "72"],
    correctAnswer: 0,
    explanation: "Strahan's #92 was retired by the Giants. He holds the single-season sack record with 22.5 in 2001.",
  },
  {
    id: 31,
    question: "What number did J.J. Watt wear with the Houston Texans?",
    options: ["90", "91", "99", "56"],
    correctAnswer: 2,
    explanation: "Watt wore #99 with the Texans and won three Defensive Player of the Year awards in four seasons.",
  },
  {
    id: 32,
    question: "What number did Rob Gronkowski wear with the New England Patriots?",
    options: ["81", "85", "87", "88"],
    correctAnswer: 2,
    explanation: "Gronk wore #87 with the Patriots, forming one of the most dominant QB-TE duos with Tom Brady.",
  },
  {
    id: 33,
    question: "What number did Devin Hester wear with the Chicago Bears?",
    options: ["17", "23", "84", "20"],
    correctAnswer: 1,
    explanation: "Hester wore #23 with the Bears and holds the NFL record for most return touchdowns (20).",
  },
  {
    id: 34,
    question: "What number did Derrick Thomas wear with the Kansas City Chiefs?",
    options: ["56", "58", "55", "50"],
    correctAnswer: 1,
    explanation: "Thomas' #58 was retired by the Chiefs. He recorded seven sacks in a single game in 1990.",
  },
  {
    id: 35,
    question: "What number did Calvin Johnson wear with the Detroit Lions?",
    options: ["80", "84", "81", "88"],
    correctAnswer: 2,
    explanation: "Megatron wore #81 with the Lions and set the single-season receiving yards record with 1,964 in 2012.",
  },
  {
    id: 36,
    question: "What number did Terrell Owens wear with the Philadelphia Eagles?",
    options: ["84", "80", "81", "88"],
    correctAnswer: 2,
    explanation: "TO wore #81 with the Eagles and famously played in Super Bowl XXXIX with a broken leg.",
  },
  {
    id: 37,
    question: "What number did Kurt Warner wear with the St. Louis Rams?",
    options: ["7", "16", "13", "12"],
    correctAnswer: 2,
    explanation: "Warner wore #13 with the Rams, going from grocery store clerk to Super Bowl MVP in 1999.",
  },
  {
    id: 38,
    question: "What number did Sean Taylor wear with the Washington Redskins?",
    options: ["36", "21", "24", "26"],
    correctAnswer: 1,
    explanation: "Taylor's #21 was retired by Washington. He was one of the most feared safeties before his tragic death in 2007.",
  },
  {
    id: 39,
    question: "What number did Mike Singletary wear with the Chicago Bears?",
    options: ["55", "56", "50", "58"],
    correctAnswer: 2,
    explanation: "Singletary's #50 was retired by the Bears. He was the heart of the legendary 1985 Bears defense.",
  },
  {
    id: 40,
    question: "What number did Gale Sayers wear with the Chicago Bears?",
    options: ["34", "40", "44", "22"],
    correctAnswer: 1,
    explanation: "Sayers' #40 was retired by the Bears. He scored six touchdowns in a single game as a rookie.",
  },
  {
    id: 41,
    question: "What number did Troy Polamalu wear with the Pittsburgh Steelers?",
    options: ["24", "43", "36", "21"],
    correctAnswer: 1,
    explanation: "Polamalu wore #43 with the Steelers, winning two Super Bowls and the 2010 Defensive Player of the Year.",
  },
  {
    id: 42,
    question: "What number did Aaron Donald wear with the Los Angeles Rams?",
    options: ["90", "93", "99", "91"],
    correctAnswer: 2,
    explanation: "Donald wore #99 with the Rams, winning three Defensive Player of the Year awards.",
  },
  {
    id: 43,
    question: "What number did Darrelle Revis wear with the New York Jets?",
    options: ["22", "20", "24", "28"],
    correctAnswer: 2,
    explanation: "Revis Island wore #24 with the Jets and was widely considered the best cornerback of his era.",
  },
  {
    id: 44,
    question: "What number did LaDainian Tomlinson wear with the San Diego Chargers?",
    options: ["28", "25", "21", "31"],
    correctAnswer: 2,
    explanation: "LT wore #21 with the Chargers and scored an NFL-record 31 touchdowns in 2006.",
  },
  {
    id: 45,
    question: "What number did Russell Wilson wear with the Seattle Seahawks?",
    options: ["12", "1", "3", "7"],
    correctAnswer: 2,
    explanation: "Wilson wore #3 with the Seahawks, winning Super Bowl XLVIII in his second season.",
  },
  {
    id: 46,
    question: "What number did Steve Young wear with the San Francisco 49ers?",
    options: ["16", "12", "7", "8"],
    correctAnswer: 3,
    explanation: "Young wore #8 with the 49ers, throwing a record six touchdowns in Super Bowl XXIX.",
  },
  {
    id: 47,
    question: "What number did Thurman Thomas wear with the Buffalo Bills?",
    options: ["22", "44", "34", "32"],
    correctAnswer: 2,
    explanation: "Thomas' #34 was retired by the Bills. He appeared in four consecutive Super Bowls.",
  },
  {
    id: 48,
    question: "What number did Rod Woodson wear with the Pittsburgh Steelers?",
    options: ["22", "26", "24", "21"],
    correctAnswer: 1,
    explanation: "Woodson wore #26 with the Steelers and finished his career with 71 interceptions.",
  },
  {
    id: 49,
    question: "What number did Marcus Allen wear with the Los Angeles Raiders?",
    options: ["33", "34", "32", "44"],
    correctAnswer: 2,
    explanation: "Allen wore #32 with the Raiders and won Super Bowl XVIII MVP with his iconic 74-yard touchdown run.",
  },
  {
    id: 50,
    question: "What number did Howie Long wear with the Los Angeles Raiders?",
    options: ["72", "78", "75", "70"],
    correctAnswer: 2,
    explanation: "Long's #75 was retired by the Raiders. He was an 8-time Pro Bowler and member of the 1983 Super Bowl champions.",
  },
  {
    id: 51,
    question: "What number did Bruce Smith wear with the Buffalo Bills?",
    options: ["77", "78", "72", "90"],
    correctAnswer: 1,
    explanation: "Smith wore #78 with the Bills and holds the NFL's all-time sack record with 200.",
  },
  {
    id: 52,
    question: "What number did Joe Greene wear with the Pittsburgh Steelers?",
    options: ["72", "75", "68", "78"],
    correctAnswer: 1,
    explanation: "Mean Joe Greene's #75 was retired by the Steelers. He won four Super Bowls as the anchor of the Steel Curtain.",
  },
  {
    id: 53,
    question: "What number did Earl Campbell wear with the Houston Oilers?",
    options: ["20", "34", "44", "32"],
    correctAnswer: 1,
    explanation: "The Tyler Rose wore #34 with the Oilers and won the Heisman, Rookie of the Year, and MVP in consecutive years.",
  },
  {
    id: 54,
    question: "What number did Eric Dickerson wear with the Los Angeles Rams?",
    options: ["34", "29", "28", "22"],
    correctAnswer: 1,
    explanation: "Dickerson wore #29 with the Rams and holds the single-season rushing record with 2,105 yards in 1984.",
  },
  {
    id: 55,
    question: "What number did Brian Urlacher wear with the Chicago Bears?",
    options: ["55", "51", "54", "50"],
    correctAnswer: 2,
    explanation: "Urlacher's #54 was retired by the Bears. He won the 2005 Defensive Player of the Year.",
  },
  {
    id: 56,
    question: "What number did Champ Bailey wear with the Denver Broncos?",
    options: ["21", "24", "20", "25"],
    correctAnswer: 1,
    explanation: "Bailey wore #24 with the Broncos and made 12 Pro Bowls, the most by a cornerback in NFL history.",
  },
  {
    id: 57,
    question: "What number did Tyreek Hill wear with the Kansas City Chiefs?",
    options: ["1", "10", "11", "3"],
    correctAnswer: 1,
    explanation: "The Cheetah wore #10 with the Chiefs, where his speed helped them win Super Bowl LIV.",
  },
  {
    id: 58,
    question: "What number did Travis Kelce wear with the Kansas City Chiefs?",
    options: ["80", "85", "87", "88"],
    correctAnswer: 2,
    explanation: "Kelce wears #87 with the Chiefs. He's the all-time leader in receiving yards by a tight end.",
  },
  {
    id: 59,
    question: "What number did Junior Seau wear with the San Diego Chargers?",
    options: ["58", "56", "55", "52"],
    correctAnswer: 2,
    explanation: "Seau's #55 was retired by the Chargers. He was a 12-time Pro Bowler and one of the greatest linebackers ever.",
  },
  {
    id: 60,
    question: "What number did Jack Lambert wear with the Pittsburgh Steelers?",
    options: ["55", "56", "58", "52"],
    correctAnswer: 2,
    explanation: "Lambert's #58 was retired by the Steelers. He anchored the Steel Curtain defense with his fierce, toothless intensity.",
  },
];

export function getDailyJerseyQuestions(date?: Date): JerseyQuestion[] {
  const now = date || new Date();
  const totalQuestions = nflJerseyQuestions.length;
  const questionsPerDay = 5;

  const getEpochDay = (d: Date) => {
    const utc = Date.UTC(d.getFullYear(), d.getMonth(), d.getDate());
    return Math.floor(utc / 86400000);
  };

  const shuffleQuestions = (seed: number) => {
    const shuffled = [...nflJerseyQuestions];
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
  const shuffled = shuffleQuestions(113);
  const startIndex = dayIndex * questionsPerDay;
  return shuffled.slice(startIndex, startIndex + questionsPerDay);
}

export function getJerseyTodayStorageKey(date?: Date): string {
  const now = date || new Date();
  return `nfl-jersey-${now.getFullYear()}-${now.getMonth() + 1}-${now.getDate()}`;
}
