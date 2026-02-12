import { e6Artists } from "@/lib/e6-artists-data";
import { e6Discography } from "@/lib/e6-discography-data";
import { e6SubLabels } from "@/lib/e6-sublabels-data";
import { e6TriviaQuestions } from "@/lib/e6-trivia-data";
import { e6Timeline } from "@/lib/e6-timeline-data";

export interface E6SourceDoc {
  id: string;
  title: string;
  text: string;
  sourceLabel: string;
  sourceUrl?: string;
}

const hardcodedDocs: E6SourceDoc[] = [
  {
    id: "e6-overview",
    title: "Elephant 6 Recording Company",
    text:
      "The Elephant 6 Recording Company is an American musical collective founded in 1991 by Robert Schneider, Bill Doss, and Will Cullen Hart in Ruston, Louisiana. The collective is known for its psychedelic pop, lo-fi, and experimental music. Key bands include Neutral Milk Hotel, The Olivia Tremor Control, The Apples in Stereo, of Montreal, and Elf Power. The collective is centered in Athens, Georgia.",
    sourceLabel: "Wikipedia",
    sourceUrl: "https://en.wikipedia.org/wiki/Elephant_6_Recording_Company",
  },
  {
    id: "e6-aeroplane",
    title: "In the Aeroplane Over the Sea",
    text:
      "In the Aeroplane Over the Sea is the second studio album by Neutral Milk Hotel, released in 1998 on Merge Records. It is widely regarded as one of the greatest indie rock albums of all time and the most acclaimed release associated with the Elephant 6 collective.",
    sourceLabel: "Wikipedia",
    sourceUrl: "https://en.wikipedia.org/wiki/In_the_Aeroplane_Over_the_Sea",
  },
  {
    id: "e6-pet-sounds",
    title: "Pet Sounds Studio",
    text:
      "Pet Sounds Studio in Denver, Colorado was a key recording facility for Elephant 6 artists. Founded by Robert Schneider, it served as a creative hub for many E6-adjacent recordings.",
    sourceLabel: "E6 history",
  },
];

const artistDocs: E6SourceDoc[] = e6Artists.map((a) => ({
  id: `artist-${a.id}`,
  title: a.name,
  text: `E6 artist: ${a.name}. Genre: ${a.genre || "indie/experimental"}. ${a.yearsActive ? `Active: ${a.yearsActive}.` : ""}`,
  sourceLabel: "E6 roster",
}));

const releaseDocs: E6SourceDoc[] = e6Discography.map((r) => ({
  id: `release-${r.catalogNumber}`,
  title: `${r.artist} – ${r.title}`,
  text: `Release: ${r.artist} – ${r.title}${r.year ? ` (${r.year})` : ""}. Catalog: E6-${r.catalogNumber}.`,
  sourceLabel: "E6 discography",
}));

const subLabelDocs: E6SourceDoc[] = e6SubLabels.map((sl) => ({
  id: `sublabel-${sl.name}`,
  title: sl.name,
  text: `Related label: ${sl.name}. ${sl.description} ${sl.highlights ? `Highlights: ${sl.highlights.join(", ")}.` : ""}`,
  sourceLabel: "E6 related labels",
  sourceUrl: sl.url,
}));

const triviaDocs: E6SourceDoc[] = e6TriviaQuestions.map((q) => ({
  id: `trivia-${q.id}`,
  title: `E6 Trivia: ${q.category}`,
  text: `Q: ${q.question} A: ${q.options[q.correctAnswer]}. ${q.explanation}`,
  sourceLabel: "E6 trivia",
}));

const timelineDocs: E6SourceDoc[] = e6Timeline.map((t) => ({
  id: `timeline-${t.year}`,
  title: `${t.year}: ${t.title}`,
  text: `${t.year} — ${t.title}. ${t.description}`,
  sourceLabel: "E6 timeline",
}));

const sourceDocs: E6SourceDoc[] = [
  ...hardcodedDocs,
  ...artistDocs,
  ...releaseDocs,
  ...subLabelDocs,
  ...triviaDocs,
  ...timelineDocs,
];

export function getE6SourceDocs(): E6SourceDoc[] {
  return sourceDocs;
}

function tokenize(input: string): string[] {
  return input
    .toLowerCase()
    .split(/[^a-z0-9]+/)
    .filter((token) => token.length > 2);
}

export function searchE6Sources(query: string, limit = 6): E6SourceDoc[] {
  const tokens = tokenize(query);
  if (tokens.length === 0) return [];

  const scored = sourceDocs
    .map((doc) => {
      const haystack = `${doc.title} ${doc.text}`.toLowerCase();
      const score = tokens.reduce(
        (total, token) => total + (haystack.includes(token) ? 1 : 0),
        0
      );
      return { doc, score };
    })
    .filter((item) => item.score > 0)
    .sort((a, b) => b.score - a.score)
    .slice(0, limit)
    .map((item) => item.doc);

  return scored;
}
