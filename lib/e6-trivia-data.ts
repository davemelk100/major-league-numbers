import { isYearQuestion } from "./trivia-utils";

export interface E6TriviaQuestion {
  id: number;
  question: string;
  options: string[];
  correctAnswer: number;
  explanation: string;
  category: "history" | "bands" | "releases" | "culture" | "facts";
}

export const e6TriviaQuestions: E6TriviaQuestion[] = [
  // ===== HISTORY =====
  {
    id: 1,
    question: "In what year was the Elephant 6 Recording Company founded?",
    options: ["1989", "1991", "1993", "1995"],
    correctAnswer: 1,
    explanation: "The Elephant 6 Recording Company was founded in 1991 by Robert Schneider, Jeff Mangum, Will Cullen Hart, and Bill Doss in Ruston, Louisiana.",
    category: "history",
  },
  {
    id: 2,
    question: "In which town was Elephant 6 originally founded?",
    options: ["Athens, Georgia", "Ruston, Louisiana", "Denver, Colorado", "Chapel Hill, North Carolina"],
    correctAnswer: 1,
    explanation: "Elephant 6 was founded in Ruston, Louisiana, where several founders attended Louisiana Tech University.",
    category: "history",
  },
  {
    id: 3,
    question: "Which city became the main hub for the Elephant 6 collective?",
    options: ["Denver, Colorado", "Portland, Oregon", "Athens, Georgia", "Austin, Texas"],
    correctAnswer: 2,
    explanation: "Athens, Georgia became the primary home base for the E6 collective, with many bands relocating there in the mid-1990s.",
    category: "history",
  },
  {
    id: 4,
    question: "Who is credited as the primary founder and producer of the Elephant 6 collective?",
    options: ["Jeff Mangum", "Robert Schneider", "Kevin Barnes", "Julian Koster"],
    correctAnswer: 1,
    explanation: "Robert Schneider of The Apples in Stereo is considered the primary founder, establishing Pet Sounds Studio and producing many E6 releases.",
    category: "history",
  },
  {
    id: 5,
    question: "What was the name of Robert Schneider's home studio central to E6?",
    options: ["Elephant Studio", "Pet Sounds Studio", "Orange Twin", "Cloud Recordings"],
    correctAnswer: 1,
    explanation: "Pet Sounds Studio, named after the Beach Boys album, was Robert Schneider's home studio where many E6 recordings were made.",
    category: "history",
  },
  {
    id: 6,
    question: "Which university did several E6 founders attend?",
    options: ["University of Georgia", "Louisiana Tech University", "Tulane University", "Georgia State University"],
    correctAnswer: 1,
    explanation: "Robert Schneider, Jeff Mangum, Will Cullen Hart, and Bill Doss all attended Louisiana Tech University in Ruston.",
    category: "history",
  },
  {
    id: 7,
    question: "Which Beach Boys album heavily influenced the E6 aesthetic?",
    options: ["Surfin' Safari", "Pet Sounds", "Sunflower", "Holland"],
    correctAnswer: 1,
    explanation: "Pet Sounds was a major influence on E6, inspiring Robert Schneider's studio name and the collective's approach to psychedelic pop production.",
    category: "history",
  },
  {
    id: 8,
    question: "The E6 logo features what animal?",
    options: ["A bear", "A rabbit", "An elephant", "A bird"],
    correctAnswer: 2,
    explanation: "The E6 logo features an elephant, which is part of the collective's name, the Elephant 6 Recording Company.",
    category: "history",
  },
  // ===== BANDS =====
  {
    id: 9,
    question: "Which E6 band released 'In the Aeroplane Over the Sea'?",
    options: ["The Apples in Stereo", "of Montreal", "Neutral Milk Hotel", "Elf Power"],
    correctAnswer: 2,
    explanation: "Neutral Milk Hotel released 'In the Aeroplane Over the Sea' in 1998, now considered one of the greatest indie rock albums.",
    category: "bands",
  },
  {
    id: 10,
    question: "Who is the frontman of Neutral Milk Hotel?",
    options: ["Robert Schneider", "Jeff Mangum", "Will Cullen Hart", "Kevin Barnes"],
    correctAnswer: 1,
    explanation: "Jeff Mangum is the singer, songwriter, and guitarist of Neutral Milk Hotel.",
    category: "bands",
  },
  {
    id: 11,
    question: "Which E6 band is fronted by Kevin Barnes?",
    options: ["The Music Tapes", "of Montreal", "Elf Power", "Beulah"],
    correctAnswer: 1,
    explanation: "Kevin Barnes is the frontman of of Montreal, the most prolific E6 band.",
    category: "bands",
  },
  {
    id: 12,
    question: "Will Cullen Hart and Bill Doss co-founded which E6 band?",
    options: ["Elf Power", "The Olivia Tremor Control", "The Gerbils", "Neutral Milk Hotel"],
    correctAnswer: 1,
    explanation: "Will Cullen Hart and Bill Doss co-founded The Olivia Tremor Control, one of the core E6 bands.",
    category: "bands",
  },
  {
    id: 13,
    question: "Which E6 artist is known for playing the singing saw?",
    options: ["Andrew Rieger", "Julian Koster", "Robert Schneider", "Bryan Poole"],
    correctAnswer: 1,
    explanation: "Julian Koster of The Music Tapes is famous for playing the singing saw and other unusual instruments.",
    category: "bands",
  },
  {
    id: 14,
    question: "Andrew Rieger is the frontman of which E6 band?",
    options: ["The Gerbils", "Elf Power", "Circulatory System", "Beulah"],
    correctAnswer: 1,
    explanation: "Andrew Rieger has led Elf Power since 1994, making it one of the longest-running E6 bands.",
    category: "bands",
  },
  {
    id: 15,
    question: "Circulatory System was a continuation of which E6 band?",
    options: ["Neutral Milk Hotel", "The Olivia Tremor Control", "The Apples in Stereo", "Secret Square"],
    correctAnswer: 1,
    explanation: "Will Cullen Hart formed Circulatory System after The Olivia Tremor Control's initial breakup in 2000.",
    category: "bands",
  },
  {
    id: 16,
    question: "Which E6-adjacent band from San Francisco released 'When Your Heartstrings Break'?",
    options: ["Essex Green", "Beulah", "The Minders", "Dressy Bessy"],
    correctAnswer: 1,
    explanation: "Beulah, from San Francisco, released 'When Your Heartstrings Break' in 1999, one of the best E6-associated albums.",
    category: "bands",
  },
  // ===== RELEASES =====
  {
    id: 17,
    question: "What is Neutral Milk Hotel's debut album?",
    options: ["Everything Is", "On Avery Island", "In the Aeroplane Over the Sea", "Beauty"],
    correctAnswer: 1,
    explanation: "'On Avery Island' was Neutral Milk Hotel's debut album, released in 1996 on Merge Records.",
    category: "releases",
  },
  {
    id: 18,
    question: "Which of Montreal album is often considered their breakthrough?",
    options: ["Cherry Peel", "The Gay Parade", "Satanic Panic in the Attic", "Hissing Fauna, Are You the Destroyer?"],
    correctAnswer: 3,
    explanation: "'Hissing Fauna, Are You the Destroyer?' (2007) was of Montreal's critical and commercial breakthrough.",
    category: "releases",
  },
  {
    id: 19,
    question: "What is the full title of The Olivia Tremor Control's debut album?",
    options: [
      "Black Foliage",
      "Music from the Unrealized Film Script, Dusk at Cubist Castle",
      "Cubist Castle",
      "The Giant Day",
    ],
    correctAnswer: 1,
    explanation: "OTC's debut was the double album 'Music from the Unrealized Film Script, Dusk at Cubist Castle' (1996).",
    category: "releases",
  },
  {
    id: 20,
    question: "What was The Apples in Stereo's first album?",
    options: ["Tone Soul Evolution", "Fun Trick Noisemaker", "Her Wallpaper Reverie", "The Discovery of a World Inside the Moone"],
    correctAnswer: 1,
    explanation: "'Fun Trick Noisemaker' (1995) was The Apples in Stereo's debut album.",
    category: "releases",
  },
  {
    id: 21,
    question: "'First Imaginary Symphony for Nomad' was released by which band?",
    options: ["Circulatory System", "The Music Tapes", "Major Organ and the Adding Machine", "The Sunshine Fix"],
    correctAnswer: 1,
    explanation: "The Music Tapes released 'First Imaginary Symphony for Nomad' in 1999.",
    category: "releases",
  },
  {
    id: 22,
    question: "Which E6 supergroup release featured contributions from many collective members?",
    options: ["Orange Twin Field Recordings", "Major Organ and the Adding Machine", "Holiday Surprise", "Circulatory System"],
    correctAnswer: 1,
    explanation: "'Major Organ and the Adding Machine' (2001) was an E6 supergroup project featuring Jeff Mangum, Julian Koster, Will Hart, and others.",
    category: "releases",
  },
  {
    id: 23,
    question: "Which album features the song 'Holland, 1945'?",
    options: ["On Avery Island", "In the Aeroplane Over the Sea", "Cherry Peel", "Fun Trick Noisemaker"],
    correctAnswer: 1,
    explanation: "'Holland, 1945' appears on Neutral Milk Hotel's 'In the Aeroplane Over the Sea'.",
    category: "releases",
  },
  {
    id: 24,
    question: "The Olivia Tremor Control's second album is called what?",
    options: ["Signal Morning", "Black Foliage: Animation Music Volume One", "Dusk at Cubist Castle", "The Giant Day"],
    correctAnswer: 1,
    explanation: "OTC's second album was 'Black Foliage: Animation Music Volume One' (1999).",
    category: "releases",
  },
  // ===== CULTURE =====
  {
    id: 25,
    question: "The E6 collective is often associated with which musical movement?",
    options: ["Grunge", "Britpop", "Lo-fi / indie pop", "Post-punk revival"],
    correctAnswer: 2,
    explanation: "Elephant 6 is closely associated with the lo-fi and indie pop movements of the 1990s, with psychedelic influences.",
    category: "culture",
  },
  {
    id: 26,
    question: "What record label released most Neutral Milk Hotel records?",
    options: ["Merge Records", "Matador Records", "Sub Pop", "Kill Rock Stars"],
    correctAnswer: 0,
    explanation: "Merge Records released both 'On Avery Island' and 'In the Aeroplane Over the Sea'.",
    category: "culture",
  },
  {
    id: 27,
    question: "The E6 aesthetic was heavily influenced by which decade's pop music?",
    options: ["1950s", "1960s", "1970s", "1980s"],
    correctAnswer: 1,
    explanation: "The E6 sound drew heavily from 1960s psychedelic pop, particularly The Beatles and The Beach Boys.",
    category: "culture",
  },
  {
    id: 28,
    question: "Which recording technique was central to the E6 philosophy?",
    options: ["Digital multitrack", "Lo-fi 4-track recording", "MIDI programming", "Live to tape"],
    correctAnswer: 1,
    explanation: "Lo-fi 4-track cassette recording was central to E6, with members championing DIY home recording.",
    category: "culture",
  },
  {
    id: 29,
    question: "Orange Twin Records, an E6-adjacent label, is based in which city?",
    options: ["Denver", "Athens", "Ruston", "Portland"],
    correctAnswer: 1,
    explanation: "Orange Twin Records is based in Athens, Georgia and was founded by Laura Carter and others in the E6 orbit.",
    category: "culture",
  },
  {
    id: 30,
    question: "The E6 Holiday Surprise tour was known for what?",
    options: ["Stadium shows", "Collaborative performances with many E6 members", "Electronic DJ sets", "Unplugged acoustic sets"],
    correctAnswer: 1,
    explanation: "The Holiday Surprise tours featured collaborative performances with many E6 members, including rare Jeff Mangum appearances.",
    category: "culture",
  },
  // ===== FACTS =====
  {
    id: 31,
    question: "Which E6 band has released the most albums?",
    options: ["Neutral Milk Hotel", "The Apples in Stereo", "of Montreal", "Elf Power"],
    correctAnswer: 2,
    explanation: "of Montreal has released the most albums of any E6 band, with over 15 studio albums.",
    category: "facts",
  },
  {
    id: 32,
    question: "Jeff Mangum largely retreated from public life after which year?",
    options: ["1996", "1998", "2000", "2003"],
    correctAnswer: 1,
    explanation: "After the release of 'In the Aeroplane Over the Sea' in 1998, Jeff Mangum withdrew from the music world for over a decade.",
    category: "facts",
  },
  {
    id: 33,
    question: "Bill Doss, co-founder of The Olivia Tremor Control, passed away in which year?",
    options: ["2008", "2010", "2012", "2015"],
    correctAnswer: 2,
    explanation: "Bill Doss passed away on July 30, 2012 at the age of 43.",
    category: "facts",
  },
  {
    id: 34,
    question: "Neutral Milk Hotel reunited for live shows in which year?",
    options: ["2010", "2011", "2013", "2015"],
    correctAnswer: 2,
    explanation: "Neutral Milk Hotel reunited in 2013 for a series of live performances after Jeff Mangum's long hiatus.",
    category: "facts",
  },
  {
    id: 35,
    question: "Robert Schneider holds a PhD in which field?",
    options: ["Music Theory", "Physics", "Mathematics", "Philosophy"],
    correctAnswer: 2,
    explanation: "Robert Schneider earned a PhD in Mathematics from Emory University, in addition to his music career.",
    category: "facts",
  },
  {
    id: 36,
    question: "Which E6 band's name references a line from a children's TV show?",
    options: ["Elf Power", "Dressy Bessy", "The Gerbils", "Chocolate USA"],
    correctAnswer: 1,
    explanation: "Dressy Bessy is named after a Hasbro doll and learning toy from the 1970s.",
    category: "facts",
  },
  {
    id: 37,
    question: "'In the Aeroplane Over the Sea' was partly inspired by the diary of whom?",
    options: ["Virginia Woolf", "Sylvia Plath", "Anne Frank", "Emily Dickinson"],
    correctAnswer: 2,
    explanation: "Jeff Mangum has said that 'In the Aeroplane Over the Sea' was partly inspired by the diary of Anne Frank.",
    category: "facts",
  },
  {
    id: 38,
    question: "Which E6 member produced 'In the Aeroplane Over the Sea'?",
    options: ["Bill Doss", "Robert Schneider", "Will Cullen Hart", "Jeff Mangum"],
    correctAnswer: 1,
    explanation: "Robert Schneider produced 'In the Aeroplane Over the Sea' at Pet Sounds Studio in Denver.",
    category: "facts",
  },
  {
    id: 39,
    question: "How many core founding members does E6 have?",
    options: ["Two", "Three", "Four", "Six"],
    correctAnswer: 2,
    explanation: "E6 has four core founders: Robert Schneider, Jeff Mangum, Will Cullen Hart, and Bill Doss.",
    category: "facts",
  },
  {
    id: 40,
    question: "The Apples in Stereo were originally based in which city?",
    options: ["Athens, Georgia", "Denver, Colorado", "Ruston, Louisiana", "New York City"],
    correctAnswer: 1,
    explanation: "The Apples in Stereo were originally based in Denver, Colorado, where Robert Schneider's Pet Sounds Studio was located.",
    category: "facts",
  },
];

export function getDailyE6TriviaQuestions(date?: Date): E6TriviaQuestion[] {
  const now = date || new Date();
  const pool = e6TriviaQuestions.filter((q) => !isYearQuestion(q));
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
  const shuffled = shuffleQuestions(42);
  const startIndex = dayIndex * questionsPerDay;
  return shuffled.slice(startIndex, startIndex + questionsPerDay);
}

export function getE6TodayStorageKey(date?: Date): string {
  const now = date || new Date();
  return `e6-trivia-${now.getFullYear()}-${now.getMonth() + 1}-${now.getDate()}`;
}

export function getE6NextTriviaTime(): Date {
  const now = new Date();
  const tomorrow = new Date(now);
  tomorrow.setDate(tomorrow.getDate() + 1);
  tomorrow.setHours(0, 0, 0, 0);
  return tomorrow;
}
