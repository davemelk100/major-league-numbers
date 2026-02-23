import type {
  GeneratedArtist,
  GeneratedRelease,
  GeneratedTriviaQuestion,
  GeneratedTimelineItem,
  GeneratedKnowledgeDoc,
} from "./schemas";

function toConstName(siteId: string): string {
  return siteId.toUpperCase().replace(/-/g, "_");
}

function toPascalCase(siteId: string): string {
  return siteId
    .split("-")
    .map((s) => s.charAt(0).toUpperCase() + s.slice(1))
    .join("");
}

export function generateLayoutFile(siteId: string): string {
  return `import { SiteLayout } from "@/components/music-site/site-layout";
import {
  createSiteMetadata,
  getMusicSiteById,
} from "@/lib/music-site";

const site = getMusicSiteById("${siteId}");

export const metadata = createSiteMetadata(site);

export default function ${toPascalCase(siteId)}Layout({ children }: { children: React.ReactNode }) {
  return (
    <SiteLayout siteId={site.id}>{children}</SiteLayout>
  );
}
`;
}

export function generatePageFile(siteId: string, siteName: string): string {
  const pascal = toPascalCase(siteId);
  return `import type { Metadata } from "next";
import { ${pascal}DashboardContent } from "@/components/${siteId}/${siteId}-dashboard-content";

export const metadata: Metadata = {
  title: "${siteName}",
  description:
    "Explore ${siteName}: artist roster, releases, label history, and milestones.",
};

export const revalidate = 60;

export default function ${pascal}Page() {
  return <${pascal}DashboardContent />;
}
`;
}

export function generateLoadingFile(): string {
  return `import { PageLoader } from "@/components/page-loader";

export default function Loading() {
  return <PageLoader />;
}
`;
}

export function generateArtistsPage(siteId: string, siteName: string): string {
  const pascal = toPascalCase(siteId);
  return `import type { Metadata } from "next";
import { ${pascal}MembersContent } from "@/components/${siteId}/${siteId}-members-content";

export const metadata: Metadata = {
  title: "Artists",
  description: "Explore the ${siteName} artist roster.",
};

export default function ${pascal}MembersPage() {
  return <${pascal}MembersContent />;
}
`;
}

export function generateArtistDetailPage(siteId: string, siteName: string): string {
  const pascal = toPascalCase(siteId);
  return `import type { Metadata } from "next";
import { ${pascal}MemberDetailContent } from "@/components/${siteId}/${siteId}-member-detail-content";

interface PageProps {
  params: Promise<{ id: string }>;
}

export async function generateMetadata({
  params,
}: PageProps): Promise<Metadata> {
  const { id } = await params;
  return {
    title: \`Artist \${id}\`,
    description: "${siteName} artist details.",
  };
}

export default async function ${pascal}MemberDetailPage({ params }: PageProps) {
  const { id } = await params;
  return <${pascal}MemberDetailContent memberId={id} />;
}
`;
}

export function generateReleasesPage(siteId: string, siteName: string): string {
  const pascal = toPascalCase(siteId);
  return `import type { Metadata } from "next";
import { ${pascal}AlbumsContent } from "@/components/${siteId}/${siteId}-albums-content";

export const metadata: Metadata = {
  title: "Releases",
  description: "Browse releases from the ${siteName} catalog.",
};

export default function ${pascal}AlbumsPage() {
  return <${pascal}AlbumsContent />;
}
`;
}

export function generateReleaseDetailPage(siteId: string, siteName: string): string {
  const pascal = toPascalCase(siteId);
  return `import type { Metadata } from "next";
import { ${pascal}AlbumDetailContent } from "@/components/${siteId}/${siteId}-album-detail-content";

interface PageProps {
  params: Promise<{ id: string }>;
}

export async function generateMetadata({
  params,
}: PageProps): Promise<Metadata> {
  const { id } = await params;
  return {
    title: \`Release \${id}\`,
    description: "${siteName} release details.",
  };
}

export default async function ${pascal}AlbumDetailPage({ params }: PageProps) {
  const { id } = await params;
  return <${pascal}AlbumDetailContent albumId={id} />;
}
`;
}

export function generateAskPage(siteId: string, siteName: string, chatLabel: string): string {
  const pascal = toPascalCase(siteId);
  return `import type { Metadata } from "next";
import { GbvChatContent } from "@/components/amrep/amrep-chat-content";

export const metadata: Metadata = {
  title: "${chatLabel}",
  description: "Ask questions about ${siteName} and its artists.",
};

export default function ${pascal}AskPage() {
  return <GbvChatContent />;
}
`;
}

export function generateSearchPage(siteId: string, siteName: string): string {
  const pascal = toPascalCase(siteId);
  return `import type { Metadata } from "next";
import { SiteSearchContent } from "@/components/music-site/site-search-content";

export const metadata: Metadata = {
  title: "Search",
  description: "Search ${siteName} artists and releases.",
};

export default function ${pascal}SearchPage() {
  return <SiteSearchContent />;
}
`;
}

export function generateTimelinePage(siteId: string, siteName: string): string {
  const pascal = toPascalCase(siteId);
  return `import type { Metadata } from "next";
import { SiteTimelineContent } from "@/components/music-site/site-timeline-content";

export const metadata: Metadata = {
  title: "Timeline",
  description: "Key milestones in ${siteName} history.",
};

export default function ${pascal}TimelinePage() {
  return <SiteTimelineContent />;
}
`;
}

export function generateSourcesPage(siteId: string, siteName: string): string {
  const pascal = toPascalCase(siteId);
  return `import type { Metadata } from "next";
import { SiteSourcesContent } from "@/components/music-site/site-sources-content";

export const metadata: Metadata = {
  title: "Sources",
  description: "Data sources for the ${siteName} site.",
};

export default function ${pascal}SourcesPage() {
  return <SiteSourcesContent />;
}
`;
}

export function generateAwardsPage(siteId: string, siteName: string): string {
  const pascal = toPascalCase(siteId);
  return `import type { Metadata } from "next";
import { SiteAwardsContent } from "@/components/music-site/site-awards-content";

export const metadata: Metadata = {
  title: "Milestones",
  description: "Milestones and recognition for ${siteName}.",
};

export default function ${pascal}AwardsPage() {
  return <SiteAwardsContent />;
}
`;
}

export function generateSideProjectsPage(siteId: string, siteName: string): string {
  const pascal = toPascalCase(siteId);
  return `import type { Metadata } from "next";
import { SiteSideProjectsContent } from "@/components/music-site/site-side-projects-content";

export const metadata: Metadata = {
  title: "Side Projects",
  description: "${siteName} side projects and related labels.",
};

export default function ${pascal}SideProjectsPage() {
  return <SiteSideProjectsContent />;
}
`;
}

export function generateSongsPage(siteId: string, siteName: string): string {
  const pascal = toPascalCase(siteId);
  return `import type { Metadata } from "next";
import { GbvSongsContent } from "@/components/amrep/amrep-songs-content";

export const metadata: Metadata = {
  title: "Songs",
  description: "Tracks and song data from the ${siteName} catalog.",
};

export default function ${pascal}SongsPage() {
  return <GbvSongsContent />;
}
`;
}

export function generateSpinPage(siteId: string, siteName: string): string {
  const pascal = toPascalCase(siteId);
  return `import type { Metadata } from "next";
import { SpinContent } from "@/components/music-site/spin-content";

export const metadata: Metadata = {
  title: "Spin",
  description: "Spin a random item from the ${siteName} catalog.",
};

export default function ${pascal}SpinPage() {
  return <SpinContent />;
}
`;
}

export function generateVideosPage(siteId: string, siteName: string): string {
  const pascal = toPascalCase(siteId);
  return `import type { Metadata } from "next";
import { SiteVideosContent } from "@/components/music-site/site-videos-content";

export const metadata: Metadata = {
  title: "Videos",
  description: "Video highlights from the ${siteName} catalog.",
};

export default function ${pascal}VideosPage() {
  return <SiteVideosContent />;
}
`;
}

export function generateAskRoute(siteId: string, _siteName: string, systemPrompt: string): string {
  const pascal = toPascalCase(siteId);
  return `import { streamText } from "ai";
import { gateway } from "@ai-sdk/gateway";
import { openai } from "@ai-sdk/openai";
import { search${pascal}Sources, type ${pascal}SourceDoc } from "@/lib/${siteId}-knowledge";
import {
  MEDIA_GENERATION_BLOCK_RESPONSE,
  isDisallowedMediaRequest,
} from "@/lib/chat-guard";

export const maxDuration = 30;

const SYSTEM_PROMPT = ${JSON.stringify(systemPrompt)};

function getTextFromParts(parts: Array<{ type: string; text?: string }>): string {
  if (!parts || !Array.isArray(parts)) return "";
  return parts
    .filter((part) => part.type === "text" && part.text)
    .map((part) => part.text)
    .join("");
}

function formatSourceContext(sources: ${pascal}SourceDoc[]): string {
  if (sources.length === 0) return "No sources available.";

  return sources
    .map((source) => {
      const label = source.sourceLabel || "Source";
      const url = source.sourceUrl ? \` (\${source.sourceUrl})\` : "";
      return \`- \${label}\${url}\\n\${source.text}\`;
    })
    .join("\\n\\n");
}

export async function POST(req: Request) {
  try {
    const { messages } = await req.json();

    const coreMessages: Array<{ role: "user" | "assistant"; content: string }> =
      messages.map(
        (msg: {
          role: string;
          content?: string;
          parts?: Array<{ type: string; text?: string }>;
        }) => ({
          role: msg.role as "user" | "assistant",
          content: msg.content || getTextFromParts(msg.parts || []),
        })
      );

    const lastUserMessage = [...coreMessages]
      .reverse()
      .find((message) => message.role === "user")?.content ?? "";

    if (isDisallowedMediaRequest(lastUserMessage)) {
      return new Response(
        JSON.stringify({ error: MEDIA_GENERATION_BLOCK_RESPONSE }),
        { status: 403, headers: { "Content-Type": "application/json" } },
      );
    }

    const sources = search${pascal}Sources(lastUserMessage, 6);
    const sourceContext = formatSourceContext(sources);

    const model = process.env.OPENAI_API_KEY
      ? openai("gpt-4o-mini")
      : gateway("openai/gpt-4o-mini");

    const result = streamText({
      model,
      system: \`\${SYSTEM_PROMPT}\\n\\nSource context:\\n\${sourceContext}\`,
      messages: coreMessages,
    });

    return result.toUIMessageStreamResponse();
  } catch (error) {
    console.error("[${siteId.toUpperCase()}] API ask error:", error);
    return new Response(
      JSON.stringify({
        error: "Failed to process request",
        details: error instanceof Error ? error.message : "Unknown error",
      }),
      { status: 500, headers: { "Content-Type": "application/json" } }
    );
  }
}
`;
}

export function generateArtistsDataFile(siteId: string, artists: GeneratedArtist[]): string {
  const pascal = toPascalCase(siteId);
  const lines = artists.map((a) => {
    const desc = a.description ? `, description: ${JSON.stringify(a.description)}` : "";
    return `  { id: ${a.id}, name: ${JSON.stringify(a.name)}${desc} },`;
  });

  return `export interface ${pascal}Artist {
  id: number;
  name: string;
  description?: string;
}

export const ${siteId.replace(/-/g, "")}Artists: ${pascal}Artist[] = [
${lines.join("\n")}
];

export function get${pascal}ArtistById(id: number): ${pascal}Artist | undefined {
  return ${siteId.replace(/-/g, "")}Artists.find((artist) => artist.id === id);
}
`;
}

export function generateReleasesDataFile(siteId: string, releases: GeneratedRelease[]): string {
  const pascal = toPascalCase(siteId);
  const lines = releases.map((r) => {
    const parts: string[] = [`id: ${r.id}`, `title: ${JSON.stringify(r.title)}`, `artist: ${JSON.stringify(r.artist)}`];
    if (r.catalogNo) parts.push(`catalogNo: ${JSON.stringify(r.catalogNo)}`);
    if (r.year !== undefined && r.year !== null) parts.push(`year: ${r.year}`);
    if (r.format) parts.push(`format: ${JSON.stringify(r.format)}`);
    if (r.highlight) parts.push(`highlight: ${JSON.stringify(r.highlight)}`);
    return `  { ${parts.join(", ")} },`;
  });

  return `export interface ${pascal}Release {
  id: number;
  catalogNo?: string;
  title: string;
  artist: string;
  year?: number | null;
  format?: string | null;
  highlight?: string;
}

export const ${siteId.replace(/-/g, "")}Releases: ${pascal}Release[] = [
${lines.join("\n")}
];

export function get${pascal}ReleaseById(id: number): ${pascal}Release | undefined {
  return ${siteId.replace(/-/g, "")}Releases.find((release) => release.id === id);
}
`;
}

export function generateTriviaDataFile(siteId: string, trivia: GeneratedTriviaQuestion[]): string {
  const pascal = toPascalCase(siteId);
  const varName = `${siteId.replace(/-/g, "")}TriviaQuestions`;
  const lines = trivia.map((q) => {
    return `  {
    id: ${q.id},
    question: ${JSON.stringify(q.question)},
    options: ${JSON.stringify(q.options)},
    correctAnswer: ${q.correctAnswer},
    explanation: ${JSON.stringify(q.explanation)},
    category: ${JSON.stringify(q.category)},
  },`;
  });

  return `import { isYearQuestion } from "./trivia-utils";

export interface ${pascal}TriviaQuestion {
  id: number;
  question: string;
  options: string[];
  correctAnswer: number;
  explanation: string;
  category: "history" | "artists" | "releases" | "facts";
}

export const ${varName}: ${pascal}TriviaQuestion[] = [
${lines.join("\n")}
];

export function getDaily${pascal}TriviaQuestions(
  date?: Date,
): ${pascal}TriviaQuestion[] {
  const now = date || new Date();
  const pool = ${varName}.filter((q) => !isYearQuestion(q));
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

export function get${pascal}TodayStorageKey(date?: Date): string {
  const now = date || new Date();
  return \`${siteId}-trivia-\${now.getFullYear()}-\${now.getMonth() + 1}-\${now.getDate()}\`;
}

export function get${pascal}NextTriviaTime(): Date {
  const now = new Date();
  const tomorrow = new Date(now);
  tomorrow.setDate(tomorrow.getDate() + 1);
  tomorrow.setHours(0, 0, 0, 0);
  return tomorrow;
}
`;
}

export function generateTimelineDataFile(siteId: string, events: GeneratedTimelineItem[]): string {
  const pascal = toPascalCase(siteId);
  const lines = events.map((t) => {
    return `  {
    year: ${t.year},
    title: ${JSON.stringify(t.title)},
    description: ${JSON.stringify(t.description)},
  },`;
  });

  return `export interface ${pascal}TimelineItem {
  year: number;
  title: string;
  description: string;
}

export const ${siteId.replace(/-/g, "")}Timeline: ${pascal}TimelineItem[] = [
${lines.join("\n")}
];
`;
}

export function generateKnowledgeFile(siteId: string, docs: GeneratedKnowledgeDoc[]): string {
  const pascal = toPascalCase(siteId);
  const bareId = siteId.replace(/-/g, "");
  const hardcodedLines = docs.map((d) => {
    const parts = [
      `    id: ${JSON.stringify(d.id)}`,
      `    title: ${JSON.stringify(d.title)}`,
      `    text: ${JSON.stringify(d.text)}`,
      `    sourceLabel: ${JSON.stringify(d.sourceLabel)}`,
    ];
    if (d.sourceUrl) parts.push(`    sourceUrl: ${JSON.stringify(d.sourceUrl)}`);
    return `  {\n${parts.join(",\n")},\n  },`;
  });

  return `import { ${bareId}Artists } from "@/lib/${siteId}-artists-data";
import { ${bareId}Releases } from "@/lib/${siteId}-releases-data";
import { ${bareId}TriviaQuestions } from "@/lib/${siteId}-trivia-data";
import { ${bareId}Timeline } from "@/lib/${siteId}-timeline-data";

export interface ${pascal}SourceDoc {
  id: string;
  title: string;
  text: string;
  sourceLabel: string;
  sourceUrl?: string;
}

const hardcodedDocs: ${pascal}SourceDoc[] = [
${hardcodedLines.join("\n")}
];

const artistDocs: ${pascal}SourceDoc[] = ${bareId}Artists.map((a) => ({
  id: \`artist-\${a.id}\`,
  title: a.name,
  text: \`Artist: \${a.name}. \${a.description || ""}\`,
  sourceLabel: "${pascal} roster",
}));

const releaseDocs: ${pascal}SourceDoc[] = ${bareId}Releases.map((r) => ({
  id: \`release-\${r.id}\`,
  title: \`\${r.artist} – \${r.title}\`,
  text: \`Release: \${r.artist} – \${r.title}\${r.year ? \` (\${r.year})\` : ""}. \${r.catalogNo ? \`Catalog: \${r.catalogNo}.\` : ""} \${r.format ? \`Format: \${r.format}.\` : ""} \${r.highlight || ""}\`,
  sourceLabel: "${pascal} discography",
}));

const triviaDocs: ${pascal}SourceDoc[] = ${bareId}TriviaQuestions.map((q) => ({
  id: \`trivia-\${q.id}\`,
  title: \`Trivia: \${q.category}\`,
  text: \`Q: \${q.question} A: \${q.options[q.correctAnswer]}. \${q.explanation}\`,
  sourceLabel: "${pascal} trivia",
}));

const timelineDocs: ${pascal}SourceDoc[] = ${bareId}Timeline.map((t) => ({
  id: \`timeline-\${t.year}\`,
  title: \`\${t.year}: \${t.title}\`,
  text: \`\${t.year} — \${t.title}. \${t.description}\`,
  sourceLabel: "${pascal} timeline",
}));

const sourceDocs: ${pascal}SourceDoc[] = [
  ...hardcodedDocs,
  ...artistDocs,
  ...releaseDocs,
  ...triviaDocs,
  ...timelineDocs,
];

export function get${pascal}SourceDocs(): ${pascal}SourceDoc[] {
  return sourceDocs;
}

function tokenize(input: string): string[] {
  return input
    .toLowerCase()
    .split(/[^a-z0-9]+/)
    .filter((token) => token.length > 2);
}

export function search${pascal}Sources(query: string, limit = 6): ${pascal}SourceDoc[] {
  const tokens = tokenize(query);
  if (tokens.length === 0) return [];

  const scored = sourceDocs
    .map((doc) => {
      const haystack = \`\${doc.title} \${doc.text}\`.toLowerCase();
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
`;
}

export function generateRecordsDataFile(siteId: string, facts: Record<string, string>): string {
  const pascal = toPascalCase(siteId);
  const bareId = siteId.replace(/-/g, "");
  const factLines = Object.entries(facts).map(([key, value]) => {
    return `  ${JSON.stringify(key)}: ${JSON.stringify(value)},`;
  });

  return `import { ${bareId}Releases, type ${pascal}Release } from "./${siteId}-releases-data";

export interface ${pascal}RecordOfDay {
  id: number;
  title: string;
  artist: string;
  year: number;
  highlight: string;
  coverUrl?: string;
}

const ${bareId.toUpperCase()}_FACTS: Record<string, string> = {
${factLines.join("\n")}
};

function get${pascal}Fact(title: string): string | undefined {
  return ${bareId.toUpperCase()}_FACTS[title.toLowerCase()];
}

function toRecordOfDay(release: ${pascal}Release): ${pascal}RecordOfDay {
  const catalogLabel = release.catalogNo ? \`${pascal} \${release.catalogNo}\` : \`#\${release.id}\`;
  return {
    id: release.id,
    title: release.title,
    artist: release.artist,
    year: release.year ?? 0,
    highlight: get${pascal}Fact(release.title) || \`\${catalogLabel}, released in \${release.year ?? "unknown year"}.\`,
    coverUrl: undefined,
  };
}

export function getDaily${pascal}Record(date = new Date()): ${pascal}RecordOfDay {
  const dateString = \`\${date.getFullYear()}-\${date.getMonth() + 1}-\${date.getDate()}\`;

  let hash = 0;
  for (let i = 0; i < dateString.length; i++) {
    const char = dateString.charCodeAt(i);
    hash = (hash << 5) - hash + char;
    hash = hash | 0;
  }

  const index = Math.abs(hash) % ${bareId}Releases.length;
  return toRecordOfDay(${bareId}Releases[index]);
}
`;
}

export function generateArtistImagesFile(siteId: string, images?: Record<string, string>): string {
  const constName = siteId.toUpperCase().replace(/-/g, "_");
  if (images && Object.keys(images).length > 0) {
    const entries = Object.entries(images)
      .sort(([a], [b]) => a.localeCompare(b))
      .map(([id, url]) => `  "${id}": "${url}",`)
      .join("\n");
    return `export const ${constName}_ARTIST_IMAGES: Record<string, string> = {
${entries}
};
`;
  }
  return `export const ${constName}_ARTIST_IMAGES: Record<number, string> = {};
`;
}

export function generateReleaseImagesFile(siteId: string, images?: Record<number, string>): string {
  if (images && Object.keys(images).length > 0) {
    const entries = Object.entries(images)
      .sort(([a], [b]) => Number(a) - Number(b))
      .map(([id, url]) => `  ${id}: "${url}",`)
      .join("\n");
    return `export const localAlbumImages: Record<number, string> = {
${entries}
};

export function getLocalAlbumImage(catalogNumber: number): string | null {
  return localAlbumImages[catalogNumber] || null;
}
`;
  }
  return `export const localAlbumImages: Record<number, string> = {};

export function getLocalAlbumImage(catalogNumber: number): string | null {
  return localAlbumImages[catalogNumber] || null;
}
`;
}

export function generateDashboardComponent(siteId: string, _siteName: string, siteConstName: string): string {
  const pascal = toPascalCase(siteId);
  const bareId = siteId.replace(/-/g, "");
  return `"use client";

import { Card, CardContent } from "@/components/ui/card";
import { Loader2 } from "lucide-react";
import { TriviaPanel } from "@/components/music-site/trivia-panel";
import { RecordOfDayCard } from "@/components/music-site/record-of-day-card";
import { ArtistOfDayCard } from "@/components/music-site/artist-of-day-card";
import { SiteRemoteImage } from "@/components/music-site/site-remote-image";
import { ${siteConstName}_SITE } from "@/lib/music-site";
import {
  DashboardDailyRow,
  DashboardDescription,
} from "@/components/music-site/dashboard-sections";
import { useDashboardData } from "@/components/music-site/use-dashboard-data";
import { ${bareId}Artists } from "@/lib/${siteId}-artists-data";
import { ${siteId.toUpperCase().replace(/-/g, "_")}_ARTIST_IMAGES } from "@/lib/${siteId}-artist-images";

const ${bareId}ArtistsWithImages = ${bareId}Artists.map((a) => ({
  id: a.id,
  name: a.name,
  imageUrl: ${siteId.toUpperCase().replace(/-/g, "_")}_ARTIST_IMAGES[a.id],
}));

export function ${pascal}DashboardContent() {
  const {
    site,
    isLoading,
    error,
  } = useDashboardData();

  if (isLoading) {
    return (
      <div className="container py-2">
        <div className="flex flex-col items-center justify-center py-16 gap-4">
          <Loader2 className="h-8 w-8 animate-spin text-muted-foreground" />
          <p className="text-muted-foreground text-sm">
            Loading {site.shortName} data...
          </p>
        </div>
      </div>
    );
  }

  return (
    <div className="container py-2">
      <DashboardDescription text={site.description} />

      <DashboardDailyRow columns={3}>
        <TriviaPanel />
        <RecordOfDayCard
          site={site}
          RemoteImage={SiteRemoteImage}
          imageFit="contain"
          placeholderVariant="img"
          placeholderClassName="w-full h-auto opacity-30 p-4"
        />
        <ArtistOfDayCard
          artists={${bareId}ArtistsWithImages}
          site={site}
          RemoteImage={SiteRemoteImage}
        />
      </DashboardDailyRow>

      {error && (
        <Card className="mb-8 border-destructive">
          <CardContent className="p-4 text-destructive">{error}</CardContent>
        </Card>
      )}
    </div>
  );
}
`;
}

export function generateMembersContentComponent(siteId: string): string {
  const pascal = toPascalCase(siteId);
  const bareId = siteId.replace(/-/g, "");
  const constName = siteId.toUpperCase().replace(/-/g, "_");
  return `"use client";

import { useState } from "react";
import { Card, CardContent } from "@/components/ui/card";
import { Input } from "@/components/ui/input";
import { ${bareId}Artists } from "@/lib/${siteId}-artists-data";
import { ${constName}_ARTIST_IMAGES } from "@/lib/${siteId}-artist-images";
import Link from "next/link";
import { usePathname } from "next/navigation";
import { getMusicSiteFromPathname } from "@/lib/music-site";
import { MemberAvatar } from "@/components/music-site/member-avatar";
import { SitePlaceholderIcon } from "@/components/music-site/site-placeholder-icon";

export function ${pascal}MembersContent() {
  const pathname = usePathname();
  const site = getMusicSiteFromPathname(pathname);
  const [search, setSearch] = useState("");

  const filteredArtists = ${bareId}Artists.filter((artist) =>
    search === "" || artist.name.toLowerCase().includes(search.toLowerCase())
  );

  return (
    <div className="container py-6">
      <h1 className="font-league mb-6">{site.navLabels.members}</h1>

      <div className="mb-6">
        <Input
          placeholder="Search artists..."
          value={search}
          onChange={(e) => setSearch(e.target.value)}
          className="max-w-xs"
        />
      </div>

      <p className="text-sm text-muted-foreground mb-4">
        Showing {filteredArtists.length} of {${bareId}Artists.length} artists
      </p>

      <div className="grid gap-4 grid-cols-2 sm:grid-cols-3 md:grid-cols-4 lg:grid-cols-5 xl:grid-cols-6">
        {filteredArtists.map((artist) => {
          const localImage = ${constName}_ARTIST_IMAGES[artist.id] ?? null;
          return (
            <Link key={artist.id} href={\`\${site.basePath}/\${site.membersSlug}/\${artist.id}\`}>
              <Card className="hover:bg-muted/80 transition-colors cursor-pointer h-full">
                <CardContent className="p-3 text-center">
                  <MemberAvatar
                    name={artist.name}
                    localImageUrl={localImage}
                    site={site}
                    skipRemoteLookup={false}
                    renderPlaceholder={() => <SitePlaceholderIcon site={site} />}
                  />
                  <p className="text-sm font-medium">{artist.name}</p>
                </CardContent>
              </Card>
            </Link>
          );
        })}
      </div>
    </div>
  );
}
`;
}

export function generateMemberDetailContentComponent(siteId: string): string {
  const pascal = toPascalCase(siteId);
  const bareId = siteId.replace(/-/g, "");
  const constName = siteId.toUpperCase().replace(/-/g, "_");
  return `"use client";

import Link from "next/link";
import { Badge } from "@/components/ui/badge";
import { usePathname } from "next/navigation";
import { getMusicSiteFromPathname, ${constName}_SITE } from "@/lib/music-site";
import { get${pascal}ArtistById } from "@/lib/${siteId}-artists-data";
import { ${bareId}Releases } from "@/lib/${siteId}-releases-data";
import { ${constName}_ARTIST_IMAGES } from "@/lib/${siteId}-artist-images";
import { useMemberImage } from "@/components/music-site/use-member-image";
import { SiteRemoteImage } from "@/components/music-site/site-remote-image";
import { MemberDetailLayout } from "@/components/music-site/member-detail-layout";
import { MemberDetailLeft } from "@/components/music-site/member-detail-left";
import { MemberDetailRight } from "@/components/music-site/member-detail-right";
import { SitePlaceholderIcon } from "@/components/music-site/site-placeholder-icon";

export function ${pascal}MemberDetailContent({ memberId }: { memberId: string }) {
  const pathname = usePathname();
  const site = getMusicSiteFromPathname(pathname);
  const artist = get${pascal}ArtistById(Number(memberId));
  const artistName = artist?.name?.toLowerCase() ?? "";

  const releases = artist
    ? ${bareId}Releases.filter(
        (r) => r.artist.toLowerCase() === artist.name.toLowerCase()
      )
    : [];

  const localImage = ${constName}_ARTIST_IMAGES[Number(memberId)] ?? null;

  const { resolvedImageUrl } = useMemberImage({
    siteId: site.id,
    site,
    memberName: artist?.name,
    memberId,
    localImageUrl: localImage,
    skipRemoteLookup: false,
  });

  if (!artist) {
    return (
      <MemberDetailLayout
        site={site}
        backHref={\`\${site.basePath}/\${site.membersSlug}\`}
        backLabel={site.navLabels.members}
        leftContent={<SitePlaceholderIcon site={site} />}
        rightTitle="Releases"
        rightContent={
          <p className="text-sm text-muted-foreground">Artist not found.</p>
        }
      />
    );
  }

  const leftContent = (
    <MemberDetailLeft
      image={
        resolvedImageUrl ? (
          <SiteRemoteImage
            site={${constName}_SITE}
            src={resolvedImageUrl}
            alt={artist.name}
            width={300}
            height={300}
            className="w-full aspect-square object-contain"
            fallbackSrc={site.placeholderIconSrc}
            cacheKey={\`\${site.id}-member-image:\${artistName}\`}
            preferProxy
          />
        ) : (
          <SitePlaceholderIcon site={site} />
        )
      }
      name={artist.name}
      profile={artist.description}
    />
  );

  const rightContent = (
    <MemberDetailRight
      items={releases}
      emptyLabel="No releases found in catalog."
      emptyClassName="text-sm"
      containerClassName="space-y-2"
      renderItem={(release) => (
        <Link
          key={release.id}
          href={\`\${site.basePath}/\${site.albumsSlug}/\${release.id}\`}
          className="flex items-center justify-between border-b border-border pb-2 last:border-0 hover:bg-muted/80 -mx-2 px-2 py-1 rounded transition-colors"
        >
          <div>
            <p className="font-semibold text-sm">{release.title}</p>
            {release.catalogNo && (
              <p className="text-xs text-muted-foreground">{release.catalogNo}</p>
            )}
          </div>
          {release.year && <Badge variant="outline">{release.year}</Badge>}
        </Link>
      )}
    />
  );

  return (
    <MemberDetailLayout
      site={site}
      backHref={\`\${site.basePath}/\${site.membersSlug}\`}
      backLabel={site.navLabels.members}
      leftContent={leftContent}
      rightTitle={\`Releases (\${releases.length})\`}
      rightContent={rightContent}
    />
  );
}
`;
}

export function generateAlbumsContentComponent(siteId: string): string {
  const pascal = toPascalCase(siteId);
  const bareId = siteId.replace(/-/g, "");
  return `"use client";

import { useState, useMemo } from "react";
import { ${bareId}Releases } from "@/lib/${siteId}-releases-data";
import { getLocalAlbumImage } from "@/lib/${siteId}-release-images";
import { usePathname } from "next/navigation";
import { getMusicSiteFromPathname } from "@/lib/music-site";
import { SiteRemoteImage } from "@/components/music-site/site-remote-image";
import { AlbumGrid, type AlbumGridItem } from "@/components/music-site/album-grid";

type ${pascal}AlbumGridItem = AlbumGridItem & {
  artist: string;
};

export function ${pascal}AlbumsContent() {
  const pathname = usePathname();
  const site = getMusicSiteFromPathname(pathname);
  const [search, setSearch] = useState("");

  const albums: ${pascal}AlbumGridItem[] = useMemo(
    () =>
      ${bareId}Releases.map((r) => ({
        id: r.id,
        title: r.artist ? \`\${r.artist} — \${r.title}\` : r.title,
        year: r.year ?? 0,
        artist: r.artist,
      })),
    []
  );

  const filteredAlbums = useMemo(
    () =>
      albums.filter(
        (a) =>
          search === "" ||
          a.title.toLowerCase().includes(search.toLowerCase())
      ),
    [albums, search]
  );

  const getAlbumImage = (album: ${pascal}AlbumGridItem): string | null => {
    return getLocalAlbumImage(album.id);
  };

  return (
    <div className="container py-6">
      <h1 className="font-league mb-6">{site.navLabels.discography}</h1>

      <p className="text-sm text-muted-foreground mb-4">
        Showing {filteredAlbums.length} of {albums.length} releases
      </p>

      <AlbumGrid
        albums={filteredAlbums}
        site={site}
        getAlbumImage={getAlbumImage}
        getReleaseTypeLabel={() => "Album"}
        RemoteImage={SiteRemoteImage}
        linkBasePath={\`\${site.basePath}/\${site.albumsSlug}\`}
        cacheKeyPrefix="${siteId}-album-thumb"
        imageFit="contain"
        preferProxy={false}
      />
    </div>
  );
}
`;
}

export function generateAlbumDetailContentComponent(siteId: string): string {
  const pascal = toPascalCase(siteId);
  const constName = siteId.toUpperCase().replace(/-/g, "_");
  return `"use client";

import { useEffect, useState } from "react";
import { usePathname } from "next/navigation";
import { Loader2 } from "lucide-react";
import { getMusicSiteFromPathname, ${constName}_SITE } from "@/lib/music-site";
import { get${pascal}ReleaseById } from "@/lib/${siteId}-releases-data";
import { getLocalAlbumImage } from "@/lib/${siteId}-release-images";
import { SiteRemoteImage } from "@/components/music-site/site-remote-image";
import { AlbumDetailLayout } from "@/components/music-site/album-detail-layout";
import { AlbumDetailLeft } from "@/components/music-site/album-detail-left";
import { AlbumDetailTracklist } from "@/components/music-site/album-detail-tracklist";
import { SitePlaceholderIcon } from "@/components/music-site/site-placeholder-icon";

type Track = { position: string; title: string; duration: string };

export function ${pascal}AlbumDetailContent({ albumId }: { albumId: string }) {
  const pathname = usePathname();
  const site = getMusicSiteFromPathname(pathname);
  const release = get${pascal}ReleaseById(Number(albumId));
  const localImage = release ? getLocalAlbumImage(release.id) : null;

  const [tracklist, setTracklist] = useState<Track[] | null>(null);
  const [isTracklistLoading, setIsTracklistLoading] = useState(false);

  useEffect(() => {
    if (!release) return;
    let isActive = true;

    async function fetchDiscogsData() {
      setIsTracklistLoading(true);
      try {
        const params = new URLSearchParams({
          type: "resolve",
          artist: release!.artist,
          title: release!.title,
        });
        const res = await fetch(\`/api/${siteId}/discogs?\${params}\`);
        if (res.ok) {
          const data = await res.json();
          if (isActive && data.release?.tracklist) {
            setTracklist(data.release.tracklist);
          }
        }
      } catch {
        // data unavailable
      } finally {
        if (isActive) setIsTracklistLoading(false);
      }
    }

    fetchDiscogsData();
    return () => {
      isActive = false;
    };
  }, [release?.artist, release?.title]);

  if (!release) {
    return (
      <AlbumDetailLayout
        site={site}
        backHref={\`\${site.basePath}/\${site.albumsSlug}\`}
        backLabel={site.navLabels.discography}
        leftContent={
          <div className="w-full aspect-square bg-muted rounded-lg mb-4 flex items-center justify-center">
            <p className="text-muted-foreground text-sm">Release not found</p>
          </div>
        }
        rightTitle="Tracklist"
        rightContent={
          <p className="text-sm text-muted-foreground">
            No release found for ID {albumId}.
          </p>
        }
      />
    );
  }

  const leftContent = (
    <AlbumDetailLeft
      image={
        localImage ? (
          <SiteRemoteImage
            site={${constName}_SITE}
            src={localImage}
            alt={\`\${release.artist} - \${release.title}\`}
            width={300}
            height={300}
            className="w-full aspect-square rounded-lg object-contain"
            cacheKey={\`${siteId}-album-thumb:\${release.id}\`}
            preferProxy={false}
          />
        ) : (
          <SitePlaceholderIcon site={site} className="mb-4" />
        )
      }
      title={\`\${release.artist} — \${release.title}\`}
      badges={[
        ...(release.year ? [{ label: String(release.year), variant: "outline" as const }] : []),
        ...(release.format ? [{ label: release.format, variant: "outline" as const }] : []),
      ]}
      meta={[
        { label: "Artist", value: release.artist },
        ...(release.catalogNo ? [{ label: "Catalog", value: release.catalogNo }] : []),
      ]}
    />
  );

  const rightContent = isTracklistLoading ? (
    <div className="flex items-center gap-2 text-sm text-muted-foreground">
      <Loader2 className="h-4 w-4 animate-spin" />
      <span>Loading tracklist...</span>
    </div>
  ) : (
    <div className="space-y-4">
      {release.highlight && (
        <p className="text-sm text-muted-foreground">{release.highlight}</p>
      )}
      <AlbumDetailTracklist
        tracks={tracklist ?? undefined}
        variant="amrep"
        emptyLabel="Tracklist not available."
      />
    </div>
  );

  return (
    <AlbumDetailLayout
      site={site}
      backHref={\`\${site.basePath}/\${site.albumsSlug}\`}
      backLabel={site.navLabels.discography}
      leftContent={leftContent}
      rightTitle="Tracklist"
      rightContent={rightContent}
    />
  );
}
`;
}

export function generateDiscogsRoute(siteId: string, labelId: number): string {
  const constName = siteId.toUpperCase().replace(/-/g, "_");
  const userAgent = toPascalCase(siteId).replace(/([a-z])([A-Z])/g, "$1$2") + "/1.0";
  return `import { NextResponse } from "next/server";

export const runtime = "nodejs";

const DISCOGS_BASE_URL = "https://api.discogs.com";
const USER_AGENT = "${userAgent}";
const ${constName}_LABEL_ID = ${labelId};

const releaseCache = new Map<string, { data: any; timestamp: number }>();
const artistCache = new Map<string, { data: any; timestamp: number }>();
const CACHE_TTL = 24 * 60 * 60 * 1000;

let labelReleaseLookup: Map<string, number> | null = null;
let labelReleaseLookupTimestamp = 0;
const LOOKUP_TTL = 24 * 60 * 60 * 1000;

async function fetchFromDiscogs(endpoint: string) {
  const token = process.env.DISCOGS_USER_TOKEN || process.env.DISCOGS_TOKEN;
  const response = await fetch(\`\${DISCOGS_BASE_URL}\${endpoint}\`, {
    headers: {
      "User-Agent": USER_AGENT,
      ...(token ? { Authorization: \`Discogs token=\${token}\` } : {}),
    },
    next: { revalidate: 3600 },
  });

  if (!response.ok) {
    throw new Error(\`Discogs API error: \${response.status}\`);
  }

  return response.json();
}

function normalizeKey(artist: string, title: string): string {
  return \`\${artist}::\${title}\`
    .toLowerCase()
    .replace(/\\s*\\(\\d+\\)\\s*/g, "")
    .replace(/[^a-z0-9:]/g, "");
}

function sleep(ms: number) {
  return new Promise((resolve) => setTimeout(resolve, ms));
}

function addPageToLookup(lookup: Map<string, number>, data: any) {
  for (const r of data?.releases || []) {
    const key = normalizeKey(r.artist || "", r.title || "");
    if (key && !lookup.has(key)) {
      lookup.set(key, r.id);
    }
  }
}

async function getLabelReleaseLookup(): Promise<Map<string, number>> {
  if (
    labelReleaseLookup &&
    Date.now() - labelReleaseLookupTimestamp < LOOKUP_TTL
  ) {
    return labelReleaseLookup;
  }

  const lookup = new Map<string, number>();
  const maxPages = 25;
  const BATCH_SIZE = 5;

  try {
    const firstPage = await fetchFromDiscogs(
      \`/labels/\${${constName}_LABEL_ID}/releases?page=1&per_page=100&sort=year&sort_order=asc\`
    );
    addPageToLookup(lookup, firstPage);
    const totalPages = Math.min(firstPage?.pagination?.pages || 1, maxPages);

    for (let batchStart = 2; batchStart <= totalPages; batchStart += BATCH_SIZE) {
      const batchEnd = Math.min(batchStart + BATCH_SIZE - 1, totalPages);
      const pages = Array.from({ length: batchEnd - batchStart + 1 }, (_, i) => batchStart + i);
      const results = await Promise.all(
        pages.map((p) =>
          fetchFromDiscogs(
            \`/labels/\${${constName}_LABEL_ID}/releases?page=\${p}&per_page=100&sort=year&sort_order=asc\`
          ).catch(() => null)
        )
      );
      for (const data of results) {
        if (data) addPageToLookup(lookup, data);
      }
      if (batchEnd < totalPages) await sleep(300);
    }
  } catch {
    // keep what we have
  }

  if (lookup.size > 0) {
    labelReleaseLookup = lookup;
    labelReleaseLookupTimestamp = Date.now();
  }
  return lookup;
}

function pickCoverImage(data: any): string | undefined {
  const images = data.images;
  if (!Array.isArray(images) || images.length === 0) return undefined;
  const primary = images.find((img: any) => img.type === "primary");
  return primary?.uri || images[0]?.uri;
}

function buildReleaseResponse(data: any) {
  return {
    id: data.id,
    title: data.title || "",
    year: data.year,
    coverImage: pickCoverImage(data),
    tracklist: Array.isArray(data.tracklist)
      ? data.tracklist.map((track: any) => ({
          position: track.position,
          title: track.title,
          duration: track.duration,
        }))
      : undefined,
  };
}

export async function GET(request: Request) {
  const { searchParams } = new URL(request.url);
  const type = searchParams.get("type") || "resolve";
  const artist = searchParams.get("artist") || "";
  const title = searchParams.get("title") || "";

  try {
    if (type === "resolve") {
      if (!artist && !title) {
        return NextResponse.json({ release: null });
      }

      const cacheKey = normalizeKey(artist, title);
      const cached = releaseCache.get(cacheKey);
      if (cached && Date.now() - cached.timestamp < CACHE_TTL) {
        return NextResponse.json({ release: cached.data, cached: true });
      }

      const lookup = await getLabelReleaseLookup();
      let discogsId = lookup.get(cacheKey);

      // Fallback: search Discogs by artist + title when not found in label listing
      if (!discogsId) {
        try {
          const q = encodeURIComponent(\`\${artist} \${title}\`);
          const searchData = await fetchFromDiscogs(
            \`/database/search?q=\${q}&type=release&per_page=5\`
          );
          const results = searchData?.results || [];
          const match = results.find((r: any) => {
            const rKey = normalizeKey(
              (r.title || "").split(" - ")[0] || "",
              (r.title || "").split(" - ").slice(1).join(" - ") || ""
            );
            return rKey === cacheKey;
          }) || results[0];
          if (match?.id) {
            discogsId = match.id;
          }
        } catch {
          // search fallback failed
        }
      }

      if (!discogsId) {
        return NextResponse.json({ release: null });
      }

      const data = await fetchFromDiscogs(\`/releases/\${discogsId}\`);
      const release = buildReleaseResponse(data);

      releaseCache.set(cacheKey, { data: release, timestamp: Date.now() });
      return NextResponse.json({ release });
    }

    if (type === "artist") {
      const name = searchParams.get("name") || "";
      if (!name) {
        return NextResponse.json({ artist: null });
      }

      const cacheKey = name.toLowerCase().replace(/[^a-z0-9]/g, "");
      const cached = artistCache.get(cacheKey);
      if (cached && Date.now() - cached.timestamp < CACHE_TTL) {
        return NextResponse.json({ artist: cached.data, cached: true });
      }

      try {
        const q = encodeURIComponent(name);
        const searchData = await fetchFromDiscogs(
          \`/database/search?q=\${q}&type=artist&per_page=5\`
        );
        const results = searchData?.results || [];
        const match = results.find((r: any) =>
          r.title?.toLowerCase() === name.toLowerCase()
        ) || results[0];

        if (!match) {
          artistCache.set(cacheKey, { data: null, timestamp: Date.now() });
          return NextResponse.json({ artist: null });
        }

        const artistData = {
          id: match.id,
          name: match.title,
          imageUrl: match.cover_image && !match.cover_image.includes("spacer.gif")
            ? match.cover_image
            : undefined,
        };

        artistCache.set(cacheKey, { data: artistData, timestamp: Date.now() });
        return NextResponse.json({ artist: artistData });
      } catch {
        artistCache.set(cacheKey, { data: null, timestamp: Date.now() });
        return NextResponse.json({ artist: null });
      }
    }

    return NextResponse.json({ error: "Invalid type parameter" }, { status: 400 });
  } catch (error) {
    console.error("Discogs API error:", error);
    return NextResponse.json(
      { error: "Failed to fetch data from Discogs" },
      { status: 500 }
    );
  }
}
`;
}

export function generateSiteConfigBlock(siteId: string, config: {
  name: string;
  shortName: string;
  chatLabel: string;
  headerTitle: string;
  headerTextClass: string;
  shellClass: string;
  description: string;
  navLabels: { discography: string; members: string; sideProjects: string };
  membersSlug: string;
  albumsSlug: string;
  footerDisclaimer?: string;
  sources: Array<{ label: string; url: string }>;
  imageSources: Array<{ label: string; url: string }>;
  searchPlaceholder: string;
  seo: { title: string; description: string; keywords: string[] };
}, logoPaths: string[]): string {
  const constName = toConstName(siteId);
  const logoSrc = logoPaths[0] || `/${siteId}-logo.png`;
  const chatIconSrc = logoPaths[1] || logoPaths[0] || `/${siteId}-logo.png`;

  const sourcesStr = config.sources.map((s) => `    { label: ${JSON.stringify(s.label)}, url: ${JSON.stringify(s.url)} },`).join("\n");
  const imageSourcesStr = config.imageSources.map((s) => `    { label: ${JSON.stringify(s.label)}, url: ${JSON.stringify(s.url)} },`).join("\n");
  const keywordsStr = config.seo.keywords.map((k) => JSON.stringify(k)).join(", ");

  return `
export const ${constName}_SITE: MusicSiteConfig = {
  id: ${JSON.stringify(siteId)},
  name: ${JSON.stringify(config.name)},
  shortName: ${JSON.stringify(config.shortName)},
  basePath: "/${siteId}",
  chatLabel: ${JSON.stringify(config.chatLabel)},
  headerTitle: ${JSON.stringify(config.headerTitle)},
  headerTextClass: ${JSON.stringify(config.headerTextClass)},
  logoSrc: ${JSON.stringify(logoSrc)},
  chatIconSrc: ${JSON.stringify(chatIconSrc)},
  placeholderIconSrc: ${JSON.stringify(chatIconSrc)},
  shellClass: ${JSON.stringify(config.shellClass)},
  logoClassName: "h-auto w-[15%]",
  description: ${JSON.stringify(config.description)},
  navLabels: {
    discography: ${JSON.stringify(config.navLabels.discography)},
    members: ${JSON.stringify(config.navLabels.members)},
    sideProjects: ${JSON.stringify(config.navLabels.sideProjects)},
  },
  membersSlug: ${JSON.stringify(config.membersSlug)},
  albumsSlug: ${JSON.stringify(config.albumsSlug)},
  footerDisclaimer: ${JSON.stringify(config.footerDisclaimer || `All Content, Rights, Copyrights, etc. are the property of the respective owners. This is simply a fan site.`)},
  sources: [
${sourcesStr}
  ],
  imageSources: [
${imageSourcesStr}
  ],
  images: {
    fallbackIcon: ${JSON.stringify(chatIconSrc)},
    fit: "contain",
    lookupStrategy: "discogs",
    invalidCacheValues: [${JSON.stringify(chatIconSrc)}],
  },
  searchPlaceholder: ${JSON.stringify(config.searchPlaceholder)},
  seo: {
    title: ${JSON.stringify(config.seo.title)},
    titleTemplate: ${JSON.stringify(`%s | ${config.seo.title}`)},
    description: ${JSON.stringify(config.seo.description)},
    keywords: [${keywordsStr}],
    siteName: "Major League Numbers",
    ogImage: "https://majorleaguenumbers.com${logoSrc}",
    ogImageAlt: ${JSON.stringify(config.seo.title)},
    twitterImage: "https://majorleaguenumbers.com${logoSrc}",
  },
};`;
}

export function generateShellCss(siteId: string): string {
  const shellClass = `${siteId}-shell`;
  return `
  .${shellClass} {
    background-color: #f8f8f8;
  }`;
}
