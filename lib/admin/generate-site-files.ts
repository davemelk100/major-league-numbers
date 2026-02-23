import fs from "fs/promises";
import path from "path";
import type { GeneratedSiteData } from "./schemas";
import * as templates from "./file-templates";

interface WriteResult {
  path: string;
  success: boolean;
  error?: string;
}

async function writeFile(filePath: string, content: string): Promise<WriteResult> {
  try {
    await fs.mkdir(path.dirname(filePath), { recursive: true });
    await fs.writeFile(filePath, content, "utf-8");
    return { path: filePath, success: true };
  } catch (error) {
    return {
      path: filePath,
      success: false,
      error: error instanceof Error ? error.message : "Unknown error",
    };
  }
}

export async function generateSiteFiles(
  siteId: string,
  siteType: "music" | "sports",
  data: GeneratedSiteData,
  logoPaths: string[],
): Promise<WriteResult[]> {
  const root = process.cwd();
  const results: WriteResult[] = [];

  const { config, artists, releases, trivia, timeline, knowledge, recordFacts } = data;
  const siteName = config.name;
  const chatLabel = config.chatLabel;

  // Helper to write and track
  async function write(relativePath: string, content: string) {
    const result = await writeFile(path.join(root, relativePath), content);
    results.push(result);
  }

  // ── Data files in lib/ ──────────────────────────────────────────────
  await write(`lib/${siteId}-artists-data.ts`, templates.generateArtistsDataFile(siteId, artists));
  await write(`lib/${siteId}-releases-data.ts`, templates.generateReleasesDataFile(siteId, releases));
  await write(`lib/${siteId}-artist-images.ts`, templates.generateArtistImagesFile(siteId));
  await write(`lib/${siteId}-release-images.ts`, templates.generateReleaseImagesFile(siteId));
  await write(`lib/${siteId}-trivia-data.ts`, templates.generateTriviaDataFile(siteId, trivia));
  await write(`lib/${siteId}-timeline-data.ts`, templates.generateTimelineDataFile(siteId, timeline));
  await write(
    `lib/${siteId}-knowledge.ts`,
    templates.generateKnowledgeFile(siteId, knowledge),
  );
  await write(`lib/${siteId}-records-data.ts`, templates.generateRecordsDataFile(siteId, recordFacts));

  // ── Pages in app/[siteId]/ ──────────────────────────────────────────
  const appDir = `app/${siteId}`;
  await write(`${appDir}/layout.tsx`, templates.generateLayoutFile(siteId));
  await write(`${appDir}/page.tsx`, templates.generatePageFile(siteId, siteName));
  await write(`${appDir}/loading.tsx`, templates.generateLoadingFile());
  await write(`${appDir}/artists/page.tsx`, templates.generateArtistsPage(siteId, siteName));
  await write(`${appDir}/artists/[id]/page.tsx`, templates.generateArtistDetailPage(siteId, siteName));
  await write(`${appDir}/releases/page.tsx`, templates.generateReleasesPage(siteId, siteName));
  await write(`${appDir}/releases/[id]/page.tsx`, templates.generateReleaseDetailPage(siteId, siteName));
  await write(`${appDir}/ask/page.tsx`, templates.generateAskPage(siteId, siteName, chatLabel));
  await write(`${appDir}/search/page.tsx`, templates.generateSearchPage(siteId, siteName));
  await write(`${appDir}/timeline/page.tsx`, templates.generateTimelinePage(siteId, siteName));
  await write(`${appDir}/sources/page.tsx`, templates.generateSourcesPage(siteId, siteName));
  await write(`${appDir}/awards/page.tsx`, templates.generateAwardsPage(siteId, siteName));
  await write(`${appDir}/side-projects/page.tsx`, templates.generateSideProjectsPage(siteId, siteName));
  await write(`${appDir}/songs/page.tsx`, templates.generateSongsPage(siteId, siteName));
  await write(`${appDir}/spin/page.tsx`, templates.generateSpinPage(siteId, siteName));
  await write(`${appDir}/videos/page.tsx`, templates.generateVideosPage(siteId, siteName));

  // ── API route ───────────────────────────────────────────────────────
  const systemPrompt = `You are an expert on ${siteName}. Answer questions about artists, releases, history, and milestones. Be concise and grounded in facts. If unsure, say so. Never generate media content.`;
  await write(`app/api/${siteId}/ask/route.ts`, templates.generateAskRoute(siteId, siteName, systemPrompt));

  // ── Site content components ─────────────────────────────────────────
  const constName = siteId.toUpperCase().replace(/-/g, "_");
  await write(
    `components/${siteId}/${siteId}-dashboard-content.tsx`,
    templates.generateDashboardComponent(siteId, siteName, constName),
  );
  await write(
    `components/${siteId}/${siteId}-members-content.tsx`,
    templates.generateMembersContentComponent(siteId),
  );
  await write(
    `components/${siteId}/${siteId}-member-detail-content.tsx`,
    templates.generateMemberDetailContentComponent(siteId),
  );
  await write(
    `components/${siteId}/${siteId}-albums-content.tsx`,
    templates.generateAlbumsContentComponent(siteId),
  );
  await write(
    `components/${siteId}/${siteId}-album-detail-content.tsx`,
    templates.generateAlbumDetailContentComponent(siteId),
  );

  // ── Update music-site.ts ────────────────────────────────────────────
  if (siteType === "music") {
    try {
      const musicSitePath = path.join(root, "lib/music-site.ts");
      let musicSiteContent = await fs.readFile(musicSitePath, "utf-8");

      // Add config block before MUSIC_SITES array
      const configBlock = templates.generateSiteConfigBlock(siteId, config, logoPaths);
      const sitesArrayMatch = musicSiteContent.match(/export const MUSIC_SITES = \[/);
      if (sitesArrayMatch && sitesArrayMatch.index !== undefined) {
        musicSiteContent =
          musicSiteContent.slice(0, sitesArrayMatch.index) +
          configBlock +
          "\n\n" +
          musicSiteContent.slice(sitesArrayMatch.index);
      }

      // Add to MUSIC_SITES array
      const arrayEndMatch = musicSiteContent.match(/] as const;/);
      if (arrayEndMatch && arrayEndMatch.index !== undefined) {
        musicSiteContent =
          musicSiteContent.slice(0, arrayEndMatch.index) +
          `  ${constName}_SITE,\n` +
          musicSiteContent.slice(arrayEndMatch.index);
      }

      await fs.writeFile(musicSitePath, musicSiteContent, "utf-8");
      results.push({ path: musicSitePath, success: true });
    } catch (error) {
      results.push({
        path: "lib/music-site.ts",
        success: false,
        error: error instanceof Error ? error.message : "Unknown error",
      });
    }
  }

  // ── Append shell CSS ────────────────────────────────────────────────
  try {
    const cssPath = path.join(root, "app/globals.css");
    let cssContent = await fs.readFile(cssPath, "utf-8");
    const shellCss = templates.generateShellCss(siteId);
    cssContent += "\n" + shellCss + "\n";
    await fs.writeFile(cssPath, cssContent, "utf-8");
    results.push({ path: cssPath, success: true });
  } catch (error) {
    results.push({
      path: "app/globals.css",
      success: false,
      error: error instanceof Error ? error.message : "Unknown error",
    });
  }

  return results;
}
