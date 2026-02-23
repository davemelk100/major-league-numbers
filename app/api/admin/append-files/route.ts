import { NextResponse } from "next/server";
import fs from "fs/promises";
import path from "path";
import * as templates from "@/lib/admin/file-templates";
import { downloadSiteImages } from "@/lib/admin/download-site-images";
import type {
  GeneratedArtist,
  GeneratedRelease,
  GeneratedTriviaQuestion,
  GeneratedTimelineItem,
} from "@/lib/admin/schemas";

export const maxDuration = 300;

const ADMIN_PASSCODE = "6231839";

function validatePasscode(request: Request): boolean {
  return request.headers.get("x-admin-passcode") === ADMIN_PASSCODE;
}

function extractArrayFromTs(content: string): string {
  // Extract content between the first [ and the matching ]
  const start = content.indexOf("[");
  const end = content.lastIndexOf("]");
  if (start === -1 || end === -1) return "[]";
  return content.slice(start, end + 1);
}

function getMaxId(content: string): number {
  const ids = [...content.matchAll(/id:\s*(\d+)/g)].map((m) =>
    parseInt(m[1], 10),
  );
  return ids.length > 0 ? Math.max(...ids) : 0;
}

export async function POST(request: Request) {
  if (!validatePasscode(request)) {
    return NextResponse.json({ error: "Unauthorized" }, { status: 401 });
  }

  try {
    const body = await request.json();
    const { siteId, newArtists, newReleases, newTrivia, newTimeline, discogsLabelId } = body;

    if (!siteId) {
      return NextResponse.json(
        { error: "siteId is required" },
        { status: 400 },
      );
    }

    const root = process.cwd();
    const results: Array<{
      path: string;
      success: boolean;
      error?: string;
      added?: number;
    }> = [];

    // Read existing data files to find max IDs
    let existingArtists: GeneratedArtist[] = [];
    let existingReleases: GeneratedRelease[] = [];
    let existingTrivia: GeneratedTriviaQuestion[] = [];
    let existingTimeline: GeneratedTimelineItem[] = [];

    try {
      const artistsContent = await fs.readFile(
        path.join(root, `lib/${siteId}-artists-data.ts`),
        "utf-8",
      );
      const maxArtistId = getMaxId(artistsContent);
      const artistNames = new Set(
        [...artistsContent.matchAll(/name:\s*"([^"]+)"/g)].map((m) =>
          m[1].toLowerCase(),
        ),
      );

      if (newArtists?.length) {
        let nextId = maxArtistId + 1;
        const artists: GeneratedArtist[] = [];
        for (const a of newArtists) {
          if (!artistNames.has(a.name.toLowerCase())) {
            artists.push({ id: nextId, name: a.name, description: a.description });
            nextId += 1;
          }
        }

        if (artists.length > 0) {
          // Read all existing artists, then regenerate full file
          const existingIds = [
            ...artistsContent.matchAll(
              /\{\s*id:\s*(\d+),\s*name:\s*"([^"]+)"(?:,\s*description:\s*"([^"]*)")?\s*\}/g,
            ),
          ].map((m) => ({
            id: parseInt(m[1], 10),
            name: m[2],
            description: m[3] || undefined,
          }));
          existingArtists = existingIds;
          const allArtists = [...existingIds, ...artists];
          const newContent = templates.generateArtistsDataFile(siteId, allArtists);
          await fs.writeFile(
            path.join(root, `lib/${siteId}-artists-data.ts`),
            newContent,
            "utf-8",
          );
          results.push({
            path: `lib/${siteId}-artists-data.ts`,
            success: true,
            added: artists.length,
          });
        }
      }
    } catch (error) {
      results.push({
        path: `lib/${siteId}-artists-data.ts`,
        success: false,
        error: error instanceof Error ? error.message : "File not found",
      });
    }

    try {
      const releasesContent = await fs.readFile(
        path.join(root, `lib/${siteId}-releases-data.ts`),
        "utf-8",
      );
      const maxReleaseId = getMaxId(releasesContent);

      if (newReleases?.length) {
        let nextId = maxReleaseId + 1;
        const releases: GeneratedRelease[] = newReleases.map(
          (r: Omit<GeneratedRelease, "id">) => ({
            ...r,
            id: nextId++,
          }),
        );

        // Parse existing releases simply by regex
        const existingIds = [
          ...releasesContent.matchAll(/id:\s*(\d+)/g),
        ].map((m) => parseInt(m[1], 10));

        // Regenerate file with all releases
        // For simplicity, append new release entries to the existing parsed releases
        const existingReleasesData: GeneratedRelease[] = [];
        const releaseRegex =
          /\{\s*id:\s*(\d+),\s*title:\s*"([^"]*)",\s*artist:\s*"([^"]*)"/g;
        let match;
        while ((match = releaseRegex.exec(releasesContent)) !== null) {
          existingReleasesData.push({
            id: parseInt(match[1], 10),
            title: match[2],
            artist: match[3],
          });
        }
        existingReleases = existingReleasesData;

        const allReleases = [...existingReleasesData, ...releases];
        const newContent = templates.generateReleasesDataFile(
          siteId,
          allReleases,
        );
        await fs.writeFile(
          path.join(root, `lib/${siteId}-releases-data.ts`),
          newContent,
          "utf-8",
        );
        results.push({
          path: `lib/${siteId}-releases-data.ts`,
          success: true,
          added: releases.length,
        });
      }
    } catch (error) {
      results.push({
        path: `lib/${siteId}-releases-data.ts`,
        success: false,
        error: error instanceof Error ? error.message : "File not found",
      });
    }

    if (newTrivia?.length) {
      try {
        const triviaContent = await fs.readFile(
          path.join(root, `lib/${siteId}-trivia-data.ts`),
          "utf-8",
        );
        const maxTriviaId = getMaxId(triviaContent);

        let nextId = maxTriviaId + 1;
        const trivia: GeneratedTriviaQuestion[] = newTrivia.map(
          (t: Omit<GeneratedTriviaQuestion, "id">) => ({
            ...t,
            id: nextId++,
          }),
        );

        // Parse existing trivia count for the result
        const existingCount = (
          triviaContent.match(/id:\s*\d+/g) || []
        ).length;

        // We need to regenerate the full trivia file
        // Extract existing trivia items (simplified approach)
        const existingTriviaItems: GeneratedTriviaQuestion[] = [];
        // Use the template to regenerate with all items
        const allTrivia = [...existingTriviaItems, ...trivia];
        // For a proper implementation, we append to the array inside the file
        // Find the last entry and insert before the closing ];
        const arrayEnd = triviaContent.lastIndexOf("];");
        if (arrayEnd !== -1) {
          const triviaEntries = trivia
            .map(
              (q) => `  {
    id: ${q.id},
    question: ${JSON.stringify(q.question)},
    options: ${JSON.stringify(q.options)},
    correctAnswer: ${q.correctAnswer},
    explanation: ${JSON.stringify(q.explanation)},
    category: ${JSON.stringify(q.category)},
  },`,
            )
            .join("\n");

          const newContent =
            triviaContent.slice(0, arrayEnd) +
            triviaEntries +
            "\n" +
            triviaContent.slice(arrayEnd);

          await fs.writeFile(
            path.join(root, `lib/${siteId}-trivia-data.ts`),
            newContent,
            "utf-8",
          );
          results.push({
            path: `lib/${siteId}-trivia-data.ts`,
            success: true,
            added: trivia.length,
          });
        }
      } catch (error) {
        results.push({
          path: `lib/${siteId}-trivia-data.ts`,
          success: false,
          error: error instanceof Error ? error.message : "File not found",
        });
      }
    }

    if (newTimeline?.length) {
      try {
        const timelineContent = await fs.readFile(
          path.join(root, `lib/${siteId}-timeline-data.ts`),
          "utf-8",
        );

        const timelineEntries = newTimeline
          .map(
            (t: GeneratedTimelineItem) => `  {
    year: ${t.year},
    title: ${JSON.stringify(t.title)},
    description: ${JSON.stringify(t.description)},
  },`,
          )
          .join("\n");

        const arrayEnd = timelineContent.lastIndexOf("];");
        if (arrayEnd !== -1) {
          const newContent =
            timelineContent.slice(0, arrayEnd) +
            timelineEntries +
            "\n" +
            timelineContent.slice(arrayEnd);

          await fs.writeFile(
            path.join(root, `lib/${siteId}-timeline-data.ts`),
            newContent,
            "utf-8",
          );
          results.push({
            path: `lib/${siteId}-timeline-data.ts`,
            success: true,
            added: newTimeline.length,
          });
        }
      } catch (error) {
        results.push({
          path: `lib/${siteId}-timeline-data.ts`,
          success: false,
          error: error instanceof Error ? error.message : "File not found",
        });
      }
    }

    // Download images for new artists/releases
    if (newArtists?.length || newReleases?.length) {
      try {
        const artistsForDownload: GeneratedArtist[] = (newArtists || []).map(
          (a: { name: string; description?: string }, i: number) => ({
            id: i + 1,
            name: a.name,
            description: a.description,
          }),
        );
        const releasesForDownload: GeneratedRelease[] = (
          newReleases || []
        ).map(
          (
            r: {
              title: string;
              artist: string;
              year?: number;
              format?: string;
            },
            i: number,
          ) => ({
            id: i + 1,
            title: r.title,
            artist: r.artist,
            year: r.year ?? null,
            format: r.format ?? null,
          }),
        );

        await downloadSiteImages(
          siteId,
          artistsForDownload,
          releasesForDownload,
          discogsLabelId,
        );
        results.push({ path: `public/images/${siteId}/`, success: true });
      } catch (error) {
        results.push({
          path: `public/images/${siteId}/`,
          success: false,
          error:
            error instanceof Error
              ? error.message
              : "Image download failed",
        });
      }
    }

    const successes = results.filter((r) => r.success);
    const failures = results.filter((r) => !r.success);

    return NextResponse.json({
      results,
      summary: {
        total: results.length,
        success: successes.length,
        failed: failures.length,
      },
    });
  } catch (error) {
    console.error("[ADMIN] Append files error:", error);
    return NextResponse.json(
      {
        error: "File append failed",
        details: error instanceof Error ? error.message : "Unknown error",
      },
      { status: 500 },
    );
  }
}
