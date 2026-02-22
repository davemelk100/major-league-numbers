import { z } from "zod";

export const sourceSchema = z.object({
  label: z.string(),
  url: z.string(),
});

export const musicSiteConfigSchema = z.object({
  id: z.string(),
  name: z.string(),
  shortName: z.string(),
  chatLabel: z.string(),
  headerTitle: z.string(),
  headerTextClass: z.string().default("text-black"),
  shellClass: z.string(),
  description: z.string(),
  navLabels: z.object({
    discography: z.string().default("Releases"),
    members: z.string().default("Artists"),
    sideProjects: z.string().default("Side Projects"),
  }),
  membersSlug: z.string().default("artists"),
  albumsSlug: z.string().default("releases"),
  footerDisclaimer: z.string().optional(),
  sources: z.array(sourceSchema).default([]),
  imageSources: z.array(sourceSchema).default([]),
  searchPlaceholder: z.string(),
  seo: z.object({
    title: z.string(),
    description: z.string(),
    keywords: z.array(z.string()).default([]),
  }),
});

export const artistSchema = z.object({
  id: z.number(),
  name: z.string(),
  description: z.string().optional(),
});

export const releaseSchema = z.object({
  id: z.number(),
  catalogNo: z.string().optional(),
  title: z.string(),
  artist: z.string(),
  year: z.number().nullable().optional(),
  format: z.string().nullable().optional(),
  highlight: z.string().optional(),
});

export const triviaQuestionSchema = z.object({
  id: z.number(),
  question: z.string(),
  options: z.array(z.string()).length(4),
  correctAnswer: z.number().min(0).max(3),
  explanation: z.string(),
  category: z.enum(["history", "artists", "releases", "facts"]),
});

export const timelineItemSchema = z.object({
  year: z.number(),
  title: z.string(),
  description: z.string(),
});

export const knowledgeDocSchema = z.object({
  id: z.string(),
  title: z.string(),
  text: z.string(),
  sourceLabel: z.string(),
  sourceUrl: z.string().optional(),
});

export const generatedSiteDataSchema = z.object({
  config: musicSiteConfigSchema,
  artists: z.array(artistSchema),
  releases: z.array(releaseSchema),
  trivia: z.array(triviaQuestionSchema),
  timeline: z.array(timelineItemSchema),
  knowledge: z.array(knowledgeDocSchema),
  recordFacts: z.record(z.string(), z.string()),
});

export type GeneratedSiteData = z.infer<typeof generatedSiteDataSchema>;
export type GeneratedArtist = z.infer<typeof artistSchema>;
export type GeneratedRelease = z.infer<typeof releaseSchema>;
export type GeneratedTriviaQuestion = z.infer<typeof triviaQuestionSchema>;
export type GeneratedTimelineItem = z.infer<typeof timelineItemSchema>;
export type GeneratedKnowledgeDoc = z.infer<typeof knowledgeDocSchema>;
