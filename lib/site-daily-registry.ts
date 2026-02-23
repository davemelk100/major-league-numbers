/**
 * Central registry for site-specific trivia and record-of-the-day data.
 *
 * Every generated data file is imported here so the shared components
 * (`trivia-panel.tsx`, `use-record-of-day.tsx`) can look up by `site.id`
 * instead of maintaining per-site if/else chains.
 */

// ── Trivia imports ──────────────────────────────────────────────────
import {
  getDailyGbvTriviaQuestions,
  getGbvTodayStorageKey,
} from "@/lib/gbv-trivia-data";
import {
  getDailyAmrepTriviaQuestions,
  getAmrepTodayStorageKey,
} from "@/lib/amrep-trivia-data";
import {
  getDailyRevTriviaQuestions,
  getRevTodayStorageKey,
} from "@/lib/rev-trivia-data";
import {
  getDailyE6TriviaQuestions,
  getE6TodayStorageKey,
} from "@/lib/e6-trivia-data";
import {
  getDailySgTriviaQuestions,
  getSgTodayStorageKey,
} from "@/lib/sg-trivia-data";
import {
  getDailyTouchGoRecordsTriviaQuestions,
  getTouchGoRecordsTodayStorageKey,
} from "@/lib/touch-go-records-trivia-data";
// ── Records imports ─────────────────────────────────────────────────
import { getDailyGbvRecord } from "@/lib/gbv-records-data";
import { getDailyAmrepRecord } from "@/lib/amrep-records-data";
import { getDailyRevRecord } from "@/lib/rev-records-data";
import { getDailyE6Record } from "@/lib/e6-records-data";
import { getDailySgRecord } from "@/lib/sg-records-data";
import { getDailyTouchGoRecordsRecord } from "@/lib/touch-go-records-records-data";
// ── Album image imports ─────────────────────────────────────────────
import { getLocalAlbumImage as getGbvAlbumImage } from "@/lib/gbv-release-images";
import { getAmrepAlbumImage } from "@/lib/amrep-release-images";
import { getLocalAlbumImage as getE6AlbumImage } from "@/lib/e6-release-images";
import { getLocalAlbumImage as getTouchGoAlbumImage } from "@/lib/touch-go-records-release-images";
// ── Common types ────────────────────────────────────────────────────
export interface TriviaQuestion {
  id: number;
  question: string;
  options: string[];
  correctAnswer: number;
  explanation: string;
  category: string;
}

export interface RecordOfDay {
  id?: number;
  catalogNumber?: number;
  title: string;
  artist?: string;
  year: number;
  highlight: string;
  coverUrl?: string;
  thumb?: string;
}

// ── Trivia registry ─────────────────────────────────────────────────
interface TriviaEntry {
  getDaily: (date?: Date) => TriviaQuestion[];
  getStorageKey: (date?: Date) => string;
}

const TRIVIA_REGISTRY: Record<string, TriviaEntry> = {
  gbv: {
    getDaily: getDailyGbvTriviaQuestions,
    getStorageKey: getGbvTodayStorageKey,
  },
  amrep: {
    getDaily: getDailyAmrepTriviaQuestions,
    getStorageKey: getAmrepTodayStorageKey,
  },
  rev: {
    getDaily: getDailyRevTriviaQuestions,
    getStorageKey: getRevTodayStorageKey,
  },
  e6: {
    getDaily: getDailyE6TriviaQuestions,
    getStorageKey: getE6TodayStorageKey,
  },
  sg: {
    getDaily: getDailySgTriviaQuestions,
    getStorageKey: getSgTodayStorageKey,
  },
  "touch-go-records": {
    getDaily: getDailyTouchGoRecordsTriviaQuestions,
    getStorageKey: getTouchGoRecordsTodayStorageKey,
  },
  // ── new-site-trivia ──
};

// ── Records registry ────────────────────────────────────────────────
interface RecordsEntry {
  getDaily: (date?: Date) => RecordOfDay;
  getAlbumImage?: (id: number) => string | null;
}

const RECORDS_REGISTRY: Record<string, RecordsEntry> = {
  gbv: {
    getDaily: getDailyGbvRecord as (date?: Date) => RecordOfDay,
    getAlbumImage: getGbvAlbumImage,
  },
  amrep: {
    getDaily: getDailyAmrepRecord as (date?: Date) => RecordOfDay,
    getAlbumImage: getAmrepAlbumImage,
  },
  rev: {
    getDaily: getDailyRevRecord as (date?: Date) => RecordOfDay,
  },
  e6: {
    getDaily: getDailyE6Record as (date?: Date) => RecordOfDay,
    getAlbumImage: getE6AlbumImage,
  },
  sg: {
    getDaily: getDailySgRecord as (date?: Date) => RecordOfDay,
  },
  "touch-go-records": {
    getDaily: getDailyTouchGoRecordsRecord as (date?: Date) => RecordOfDay,
    getAlbumImage: getTouchGoAlbumImage,
  },
  // ── new-site-records ──
};

// ── Lookup functions ────────────────────────────────────────────────

export function getSiteDailyTrivia(
  siteId: string,
  date?: Date,
): TriviaQuestion[] | null {
  return TRIVIA_REGISTRY[siteId]?.getDaily(date) ?? null;
}

export function getSiteTriviaStorageKey(
  siteId: string,
  date?: Date,
): string | null {
  return TRIVIA_REGISTRY[siteId]?.getStorageKey(date) ?? null;
}

export function getSiteDailyRecord(
  siteId: string,
  date?: Date,
): RecordOfDay | null {
  return RECORDS_REGISTRY[siteId]?.getDaily(date) ?? null;
}

export function getSiteAlbumImage(
  siteId: string,
  id: number,
): string | null {
  return RECORDS_REGISTRY[siteId]?.getAlbumImage?.(id) ?? null;
}
