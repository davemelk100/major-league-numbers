import { dischordArtists } from "@/lib/dischord-artists-data";
import { dischordReleases } from "@/lib/dischord-releases-data";
import { dischordTriviaQuestions } from "@/lib/dischord-trivia-data";
import { dischordTimeline } from "@/lib/dischord-timeline-data";

export interface DischordSourceDoc {
  id: string;
  title: string;
  text: string;
  sourceLabel: string;
  sourceUrl?: string;
}

const hardcodedDocs: DischordSourceDoc[] = [
  {
    id: "dischord-overview",
    title: "Dischord Records Overview",
    text: "Dischord Records is an independent record label founded in 1980 in Washington, D.C. by Ian MacKaye and Jeff Nelson, originally to release the Teen Idles' debut EP. The label has since released over 150 records, primarily by bands from the D.C. area. Dischord is known for its DIY ethos, fair pricing (historically $8 CDs / $10 LPs, post-paid), and refusal to sign contracts with artists — instead operating on handshake agreements. The label has been instrumental in shaping hardcore punk, post-hardcore, and emo, and remains one of the most respected independent labels in music history.",
    sourceLabel: "Dischord Records",
    sourceUrl: "https://www.dischord.com/",
  },
  {
    id: "dc-hardcore-scene",
    title: "The D.C. Hardcore Scene",
    text: "Washington, D.C.'s hardcore punk scene emerged in the early 1980s as one of the most vibrant and influential in the country. Centered around venues like the 9:30 Club and the Wilson Center, and fueled by labels like Dischord, the scene produced bands including Minor Threat, Bad Brains, Government Issue, Void, The Faith, and Scream. The D.C. scene was distinctive for its strong community bonds, all-ages shows, and the straight edge philosophy popularized by Minor Threat. By the mid-1980s, the scene evolved through 'Revolution Summer' into more melodic and emotionally expressive territory, giving birth to emo and post-hardcore.",
    sourceLabel: "Wikipedia",
    sourceUrl: "https://en.wikipedia.org/wiki/Washington,_D.C._hardcore",
  },
  {
    id: "diy-ethos",
    title: "Dischord's DIY Ethos",
    text: "Dischord Records has maintained a fiercely independent, do-it-yourself approach throughout its existence. The label has never signed a distribution deal with a major label, instead handling its own mail-order and working with independent distributors. Dischord operates without contracts — all artist relationships are based on trust and handshake agreements. The label maintains low, fixed pricing and has historically included postage in its prices ('post-paid'). Ian MacKaye has consistently refused to license Dischord music for commercial use in advertisements. The label's operations have been run out of a small number of locations, including the famous 'Dischord House' in Arlington, Virginia.",
    sourceLabel: "Dischord Records",
    sourceUrl: "https://www.dischord.com/",
  },
  {
    id: "revolution-summer",
    title: "Revolution Summer (1985)",
    text: "Revolution Summer was a creative movement within the Washington, D.C. punk scene in 1985. After the initial wave of D.C. hardcore began to stagnate, a group of musicians pushed for more artistic expression and emotional depth. Key bands included Rites of Spring (featuring Guy Picciotto), Embrace (featuring Ian MacKaye), Beefeater, Gray Matter, and Dag Nasty. The movement rejected hardcore's increasingly macho and violent tendencies in favor of introspective lyrics and melodic experimentation. Revolution Summer is widely considered the birth of 'emo' (emotional hardcore) and laid the groundwork for the post-hardcore genre that Fugazi would later perfect.",
    sourceLabel: "Wikipedia",
    sourceUrl: "https://en.wikipedia.org/wiki/Revolution_Summer",
  },
  {
    id: "fugazi-legacy",
    title: "Fugazi's Legacy",
    text: "Fugazi, formed in 1987, became Dischord's most iconic and commercially successful band. The group — Ian MacKaye, Guy Picciotto, Joe Lally, and Brendan Canty — released seven studio albums between 1989 and 2001, all on Dischord. Fugazi was known for their $5 door prices, all-ages shows, refusal to sell merchandise, and their anti-corporate stance. Their music blended hardcore punk, post-punk, reggae, and experimental rock, influencing countless bands across multiple genres. The band went on indefinite hiatus in 2003. Their live recordings have been archived on the Dischord website, with over 800 shows available for streaming.",
    sourceLabel: "Wikipedia",
    sourceUrl: "https://en.wikipedia.org/wiki/Fugazi",
  },
];

const artistDocs: DischordSourceDoc[] = dischordArtists.map((a) => ({
  id: `artist-${a.id}`,
  title: a.name,
  text: `Artist: ${a.name}. ${a.description || ""}`,
  sourceLabel: "Dischord roster",
}));

const releaseDocs: DischordSourceDoc[] = dischordReleases.map((r) => ({
  id: `release-${r.id}`,
  title: `${r.artist} – ${r.title}`,
  text: `Release: ${r.artist} – ${r.title}${r.year ? ` (${r.year})` : ""}. ${r.catalogNo ? `Catalog: ${r.catalogNo}.` : ""} ${r.format ? `Format: ${r.format}.` : ""} ${r.highlight || ""}`,
  sourceLabel: "Dischord discography",
}));

const triviaDocs: DischordSourceDoc[] = dischordTriviaQuestions.map((q) => ({
  id: `trivia-${q.id}`,
  title: `Trivia: ${q.category}`,
  text: `Q: ${q.question} A: ${q.options[q.correctAnswer]}. ${q.explanation}`,
  sourceLabel: "Dischord trivia",
}));

const timelineDocs: DischordSourceDoc[] = dischordTimeline.map((t) => ({
  id: `timeline-${t.year}`,
  title: `${t.year}: ${t.title}`,
  text: `${t.year} — ${t.title}. ${t.description}`,
  sourceLabel: "Dischord timeline",
}));

const sourceDocs: DischordSourceDoc[] = [
  ...hardcodedDocs,
  ...artistDocs,
  ...releaseDocs,
  ...triviaDocs,
  ...timelineDocs,
];

export function getDischordSourceDocs(): DischordSourceDoc[] {
  return sourceDocs;
}

function tokenize(input: string): string[] {
  return input
    .toLowerCase()
    .split(/[^a-z0-9]+/)
    .filter((token) => token.length > 2);
}

export function searchDischordSources(query: string, limit = 6): DischordSourceDoc[] {
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
