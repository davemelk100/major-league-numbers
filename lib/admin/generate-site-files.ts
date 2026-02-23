import fs from "fs/promises";
import path from "path";
import type { GeneratedSiteData } from "./schemas";
import * as templates from "./file-templates";
import { downloadSiteImages } from "./download-site-images";

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

  // ── API routes ──────────────────────────────────────────────────────
  const systemPrompt = `You are an expert on ${siteName}. Answer questions about artists, releases, history, and milestones. Be concise and grounded in facts. If unsure, say so. Never generate media content.`;
  await write(`app/api/${siteId}/ask/route.ts`, templates.generateAskRoute(siteId, siteName, systemPrompt));

  if (config.discogsLabelId) {
    await write(
      `app/api/${siteId}/discogs/route.ts`,
      templates.generateDiscogsRoute(siteId, config.discogsLabelId),
    );
  }

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

      // Add config block before MUSIC_SITES array (skip if already present)
      if (!musicSiteContent.includes(`${constName}_SITE: MusicSiteConfig`)) {
        const configBlock = templates.generateSiteConfigBlock(siteId, config, logoPaths);
        const sitesArrayMatch = musicSiteContent.match(/export const MUSIC_SITES = \[/);
        if (sitesArrayMatch && sitesArrayMatch.index !== undefined) {
          musicSiteContent =
            musicSiteContent.slice(0, sitesArrayMatch.index) +
            configBlock +
            "\n\n" +
            musicSiteContent.slice(sitesArrayMatch.index);
        }
      }

      // Add to MUSIC_SITES array (skip if already present)
      if (!musicSiteContent.match(new RegExp(`\\b${constName}_SITE,`))) {
        const arrayEndMatch = musicSiteContent.match(/] as const;/);
        if (arrayEndMatch && arrayEndMatch.index !== undefined) {
          musicSiteContent =
            musicSiteContent.slice(0, arrayEndMatch.index) +
            `  ${constName}_SITE,\n` +
            musicSiteContent.slice(arrayEndMatch.index);
        }
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

  // ── Update site-switcher.tsx ───────────────────────────────────────
  if (siteType === "music") {
    try {
      const switcherPath = path.join(root, "components/site-switcher.tsx");
      let switcherContent = await fs.readFile(switcherPath, "utf-8");

      if (!switcherContent.includes(`"/${siteId}"`)) {
        const logoPath = logoPaths[0] || `/images/${siteId}/logo.png`;
        const newEntry = `  { name: ${JSON.stringify(siteName)}, href: "/${siteId}", logo: ${JSON.stringify(logoPath)} },`;

        // Insert before the closing ]; of musicSites array
        const musicSitesEnd = switcherContent.indexOf("];", switcherContent.indexOf("const musicSites"));
        if (musicSitesEnd !== -1) {
          switcherContent =
            switcherContent.slice(0, musicSitesEnd) +
            newEntry + "\n" +
            switcherContent.slice(musicSitesEnd);
        }

        await fs.writeFile(switcherPath, switcherContent, "utf-8");
      }
      results.push({ path: switcherPath, success: true });
    } catch (error) {
      results.push({
        path: "components/site-switcher.tsx",
        success: false,
        error: error instanceof Error ? error.message : "Unknown error",
      });
    }
  }

  // ── Append shell CSS (skip if already present) ─────────────────────
  try {
    const cssPath = path.join(root, "app/globals.css");
    let cssContent = await fs.readFile(cssPath, "utf-8");
    if (!cssContent.includes(`.${siteId}-shell`)) {
      const shellCss = templates.generateShellCss(siteId);
      cssContent += "\n" + shellCss + "\n";
      await fs.writeFile(cssPath, cssContent, "utf-8");
    }
    results.push({ path: cssPath, success: true });
  } catch (error) {
    results.push({
      path: "app/globals.css",
      success: false,
      error: error instanceof Error ? error.message : "Unknown error",
    });
  }

  // ── Register in site-daily-registry.ts ─────────────────────────────
  if (siteType === "music") {
    try {
      const registryPath = path.join(root, "lib/site-daily-registry.ts");
      let registryContent = await fs.readFile(registryPath, "utf-8");

      // Build camelCase function-name prefix from siteId
      const camel = siteId.replace(/-([a-z])/g, (_, c: string) => c.toUpperCase());
      const pascal = camel.charAt(0).toUpperCase() + camel.slice(1);

      // Trivia import + entry
      const triviaImport =
        `import {\n` +
        `  getDaily${pascal}TriviaQuestions,\n` +
        `  get${pascal}TodayStorageKey,\n` +
        `} from "@/lib/${siteId}-trivia-data";\n`;
      const triviaEntry =
        `  "${siteId}": {\n` +
        `    getDaily: getDaily${pascal}TriviaQuestions,\n` +
        `    getStorageKey: get${pascal}TodayStorageKey,\n` +
        `  },\n`;

      // Records import + entry
      const recordsImport =
        `import { getDaily${pascal}Record } from "@/lib/${siteId}-records-data";\n`;
      const albumImageImport =
        `import { getLocalAlbumImage as get${pascal}AlbumImage } from "@/lib/${siteId}-release-images";\n`;
      const recordsEntry =
        `  "${siteId}": {\n` +
        `    getDaily: getDaily${pascal}Record as (date?: Date) => RecordOfDay,\n` +
        `    getAlbumImage: get${pascal}AlbumImage,\n` +
        `  },\n`;

      // Insert trivia import before the trivia marker comment
      if (!registryContent.includes(`${siteId}-trivia-data`)) {
        registryContent = registryContent.replace(
          `// ── Records imports`,
          `${triviaImport}\n// ── Records imports`,
        );
      }

      // Insert records import before the album image imports
      if (!registryContent.includes(`${siteId}-records-data`)) {
        registryContent = registryContent.replace(
          `// ── Album image imports`,
          `${recordsImport}\n// ── Album image imports`,
        );
      }

      // Insert album image import before the common types
      if (!registryContent.includes(`${siteId}-release-images`)) {
        registryContent = registryContent.replace(
          `// ── Common types`,
          `${albumImageImport}\n// ── Common types`,
        );
      }

      // Insert trivia registry entry before the marker
      if (!registryContent.includes(`"${siteId}": {\n    getDaily: getDaily${pascal}TriviaQuestions`)) {
        registryContent = registryContent.replace(
          `  // ── new-site-trivia ──`,
          `${triviaEntry}  // ── new-site-trivia ──`,
        );
      }

      // Insert records registry entry before the marker
      if (!registryContent.includes(`"${siteId}": {\n    getDaily: getDaily${pascal}Record`)) {
        registryContent = registryContent.replace(
          `  // ── new-site-records ──`,
          `${recordsEntry}  // ── new-site-records ──`,
        );
      }

      await fs.writeFile(registryPath, registryContent, "utf-8");
      results.push({ path: registryPath, success: true });
    } catch (error) {
      results.push({
        path: "lib/site-daily-registry.ts",
        success: false,
        error: error instanceof Error ? error.message : "Unknown error",
      });
    }
  }

  // ── Download images and overwrite mapping files ─────────────────────
  try {
    const { artistImages, releaseImages } = await downloadSiteImages(
      siteId,
      artists,
      releases,
      config.discogsLabelId,
    );

    // Overwrite the initially-empty image mapping files with populated data
    if (Object.keys(artistImages).length > 0) {
      await write(
        `lib/${siteId}-artist-images.ts`,
        templates.generateArtistImagesFile(siteId, artistImages),
      );
    }
    if (Object.keys(releaseImages).length > 0) {
      await write(
        `lib/${siteId}-release-images.ts`,
        templates.generateReleaseImagesFile(siteId, releaseImages),
      );
    }

    results.push({
      path: `public/images/${siteId}/`,
      success: true,
    });
  } catch (error) {
    results.push({
      path: `public/images/${siteId}/`,
      success: false,
      error: error instanceof Error ? error.message : "Image download failed",
    });
  }

  return results;
}
