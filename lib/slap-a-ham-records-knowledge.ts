import { slapahamrecordsArtists } from "@/lib/slap-a-ham-records-artists-data";
import { slapahamrecordsReleases } from "@/lib/slap-a-ham-records-releases-data";
import { slapahamrecordsTriviaQuestions } from "@/lib/slap-a-ham-records-trivia-data";
import { slapahamrecordsTimeline } from "@/lib/slap-a-ham-records-timeline-data";

export interface SlapAHamRecordsSourceDoc {
  id: string;
  title: string;
  text: string;
  sourceLabel: string;
  sourceUrl?: string;
}

const hardcodedDocs: SlapAHamRecordsSourceDoc[] = [
  {
    id: "overview",
    title: "Slap-A-Ham Records",
    text: "Slap-A-Ham Records was an independent record label founded in 1989, known for its hardcore punk and powerviolence genres until it ceased operations in 2002.",
    sourceLabel: "Wikipedia",
    sourceUrl: "https://en.wikipedia.org/wiki/Slap-a-Ham_Records",
  },
  {
    id: "history",
    title: "History of Slap-A-Ham Records",
    text: "The label was founded by Chris Dodge and had a significant impact on the underground music scene in the late 80s and 90s.",
    sourceLabel: "VICE",
    sourceUrl: "https://www.vice.com/en/article/spazz-chris-dodge-tankcrimes/",
  },
  {
    id: "discography",
    title: "Discography of Slap-A-Ham Records",
    text: "The label's discography featured a variety of influential artists and was noted for its experimental and aggressive music style.",
    sourceLabel: "Wikipedia",
    sourceUrl: "https://en.wikipedia.org/wiki/Slap-a-Ham_Records#Discography",
  },
  {
    id: "labelImpact",
    title: "Impact on Music Scene",
    text: "Slap-A-Ham Records was crucial in promoting the powerviolence and grindcore genres, influencing many subsequent bands.",
    sourceLabel: "La Mort d'une Moderniste",
    sourceUrl: "https://lamortdunemoderniste.wordpress.com/2017/05/04/record-label-profiles-slap-a-ham-records/",
  },
  {
    id: "artistCollaborations",
    title: "Artist Collaborations",
    text: "Many artists associated with Slap-A-Ham went on to have significant solo careers and collaborations outside of the label.",
    sourceLabel: "Interview",
    sourceUrl: "https://m3event.wordpress.com/2012/05/27/interview-slap-a-ham-records/",
  },
];

const artistDocs: SlapAHamRecordsSourceDoc[] = slapahamrecordsArtists.map((a) => ({
  id: `artist-${a.id}`,
  title: a.name,
  text: `Artist: ${a.name}. ${a.description || ""}`,
  sourceLabel: "SlapAHamRecords roster",
}));

const releaseDocs: SlapAHamRecordsSourceDoc[] = slapahamrecordsReleases.map((r) => ({
  id: `release-${r.id}`,
  title: `${r.artist} – ${r.title}`,
  text: `Release: ${r.artist} – ${r.title}${r.year ? ` (${r.year})` : ""}. ${r.catalogNo ? `Catalog: ${r.catalogNo}.` : ""} ${r.format ? `Format: ${r.format}.` : ""} ${r.highlight || ""}`,
  sourceLabel: "SlapAHamRecords discography",
}));

const triviaDocs: SlapAHamRecordsSourceDoc[] = slapahamrecordsTriviaQuestions.map((q) => ({
  id: `trivia-${q.id}`,
  title: `Trivia: ${q.category}`,
  text: `Q: ${q.question} A: ${q.options[q.correctAnswer]}. ${q.explanation}`,
  sourceLabel: "SlapAHamRecords trivia",
}));

const timelineDocs: SlapAHamRecordsSourceDoc[] = slapahamrecordsTimeline.map((t) => ({
  id: `timeline-${t.year}`,
  title: `${t.year}: ${t.title}`,
  text: `${t.year} — ${t.title}. ${t.description}`,
  sourceLabel: "SlapAHamRecords timeline",
}));

const sourceDocs: SlapAHamRecordsSourceDoc[] = [
  ...hardcodedDocs,
  ...artistDocs,
  ...releaseDocs,
  ...triviaDocs,
  ...timelineDocs,
];

export function getSlapAHamRecordsSourceDocs(): SlapAHamRecordsSourceDoc[] {
  return sourceDocs;
}

function tokenize(input: string): string[] {
  return input
    .toLowerCase()
    .split(/[^a-z0-9]+/)
    .filter((token) => token.length > 2);
}

export function searchSlapAHamRecordsSources(query: string, limit = 6): SlapAHamRecordsSourceDoc[] {
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
