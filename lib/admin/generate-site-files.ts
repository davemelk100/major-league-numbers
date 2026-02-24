import fs from "fs/promises";
import path from "path";
import type { GeneratedSiteData } from "./schemas";
import * as templates from "./file-templates";
import { downloadSiteImages } from "./download-site-images";
import { getFileFromGitHub } from "./github-commit";

interface WriteResult {
  path: string;
  success: boolean;
  error?: string;
}

export interface FileEntry {
  path: string;
  content: string;
}

interface GenerateOptions {
  siteId: string;
  siteType: "music" | "sports";
  data: GeneratedSiteData;
  logoPaths: string[];
  videoLinks: string[];
  /** When true, read existing files from GitHub instead of local fs */
  useGitHub?: boolean;
  githubToken?: string;
  githubOwner?: string;
  githubRepo?: string;
  githubBranch?: string;
  /** When true, skip downloading images (used in production) */
  skipImageDownload?: boolean;
}

function parseVideoLinks(links: string[]): Array<{ id: string; title: string }> {
  const results: Array<{ id: string; title: string }> = [];
  for (const line of links) {
    let title = "";
    let url = line;

    // Support "Title - URL" format
    const dashMatch = line.match(/^(.+?)\s*[-–—]\s*(https?:\/\/.+)$/);
    if (dashMatch) {
      title = dashMatch[1].trim();
      url = dashMatch[2].trim();
    }

    // Extract YouTube video ID
    let videoId: string | null = null;
    const watchMatch = url.match(/(?:youtube\.com\/watch\?.*v=|youtu\.be\/|youtube\.com\/embed\/)([a-zA-Z0-9_-]{11})/);
    if (watchMatch) {
      videoId = watchMatch[1];
    } else if (/^[a-zA-Z0-9_-]{11}$/.test(url.trim())) {
      videoId = url.trim();
    }

    if (videoId) {
      results.push({ id: videoId, title: title || `Video ${results.length + 1}` });
    }
  }
  return results;
}

/**
 * Read an existing file's content — from GitHub in production, from local fs in dev.
 */
async function readExistingFile(
  relativePath: string,
  opts: GenerateOptions,
): Promise<string | null> {
  if (opts.useGitHub) {
    return getFileFromGitHub(
      opts.githubOwner!,
      opts.githubRepo!,
      relativePath,
      opts.githubBranch!,
      opts.githubToken!,
    );
  }
  try {
    return await fs.readFile(path.join(process.cwd(), relativePath), "utf-8");
  } catch {
    return null;
  }
}

/**
 * Generate all site file contents in memory without writing to disk.
 * Returns an array of { path, content } entries for every file that should be created or modified.
 */
export async function generateSiteFileContents(
  opts: GenerateOptions,
): Promise<FileEntry[]> {
  const { siteId, siteType, data, logoPaths, videoLinks } = opts;
  const files: FileEntry[] = [];
  const { config, artists, releases, trivia, timeline, knowledge, recordFacts } = data;
  const siteName = config.name;
  const chatLabel = config.chatLabel;
  const constName = siteId.toUpperCase().replace(/-/g, "_");

  function add(filePath: string, content: string) {
    files.push({ path: filePath, content });
  }

  // ── Data files in lib/ ──────────────────────────────────────────────
  add(`lib/${siteId}-artists-data.ts`, templates.generateArtistsDataFile(siteId, artists));
  add(`lib/${siteId}-releases-data.ts`, templates.generateReleasesDataFile(siteId, releases));
  add(`lib/${siteId}-artist-images.ts`, templates.generateArtistImagesFile(siteId));
  add(`lib/${siteId}-release-images.ts`, templates.generateReleaseImagesFile(siteId));
  add(`lib/${siteId}-trivia-data.ts`, templates.generateTriviaDataFile(siteId, trivia));
  add(`lib/${siteId}-timeline-data.ts`, templates.generateTimelineDataFile(siteId, timeline));
  add(`lib/${siteId}-knowledge.ts`, templates.generateKnowledgeFile(siteId, knowledge));
  add(`lib/${siteId}-records-data.ts`, templates.generateRecordsDataFile(siteId, recordFacts));

  // ── Pages in app/[siteId]/ ──────────────────────────────────────────
  const appDir = `app/${siteId}`;
  add(`${appDir}/layout.tsx`, templates.generateLayoutFile(siteId));
  add(`${appDir}/page.tsx`, templates.generatePageFile(siteId, siteName));
  add(`${appDir}/loading.tsx`, templates.generateLoadingFile());
  add(`${appDir}/artists/page.tsx`, templates.generateArtistsPage(siteId, siteName));
  add(`${appDir}/artists/[id]/page.tsx`, templates.generateArtistDetailPage(siteId, siteName));
  add(`${appDir}/releases/page.tsx`, templates.generateReleasesPage(siteId, siteName));
  add(`${appDir}/releases/[id]/page.tsx`, templates.generateReleaseDetailPage(siteId, siteName));
  add(`${appDir}/ask/page.tsx`, templates.generateAskPage(siteId, siteName, chatLabel));
  add(`${appDir}/search/page.tsx`, templates.generateSearchPage(siteId, siteName));
  add(`${appDir}/timeline/page.tsx`, templates.generateTimelinePage(siteId, siteName));
  add(`${appDir}/sources/page.tsx`, templates.generateSourcesPage(siteId, siteName));
  add(`${appDir}/awards/page.tsx`, templates.generateAwardsPage(siteId, siteName));
  add(`${appDir}/side-projects/page.tsx`, templates.generateSideProjectsPage(siteId, siteName));
  add(`${appDir}/songs/page.tsx`, templates.generateSongsPage(siteId, siteName));
  add(`${appDir}/spin/page.tsx`, templates.generateSpinPage(siteId, siteName));
  add(`${appDir}/videos/page.tsx`, templates.generateVideosPage(siteId, siteName));

  // ── API routes ──────────────────────────────────────────────────────
  const systemPrompt = `You are an expert on ${siteName}. Answer questions about artists, releases, history, and milestones. Be concise and grounded in facts. If unsure, say so. Never generate media content.`;
  add(`app/api/${siteId}/ask/route.ts`, templates.generateAskRoute(siteId, siteName, systemPrompt));

  if (config.discogsLabelId) {
    add(`app/api/${siteId}/discogs/route.ts`, templates.generateDiscogsRoute(siteId, config.discogsLabelId));
  }

  // ── Site content components ─────────────────────────────────────────
  add(`components/${siteId}/${siteId}-dashboard-content.tsx`, templates.generateDashboardComponent(siteId, siteName, constName));
  add(`components/${siteId}/${siteId}-members-content.tsx`, templates.generateMembersContentComponent(siteId));
  add(`components/${siteId}/${siteId}-member-detail-content.tsx`, templates.generateMemberDetailContentComponent(siteId));
  add(`components/${siteId}/${siteId}-albums-content.tsx`, templates.generateAlbumsContentComponent(siteId));
  add(`components/${siteId}/${siteId}-album-detail-content.tsx`, templates.generateAlbumDetailContentComponent(siteId));

  // ── Update music-site.ts ────────────────────────────────────────────
  if (siteType === "music") {
    const musicSiteRaw = await readExistingFile("lib/music-site.ts", opts);
    if (musicSiteRaw) {
      let musicSiteContent = musicSiteRaw;

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

      if (!musicSiteContent.match(new RegExp(`\\b${constName}_SITE,`))) {
        const arrayEndMatch = musicSiteContent.match(/] as const;/);
        if (arrayEndMatch && arrayEndMatch.index !== undefined) {
          musicSiteContent =
            musicSiteContent.slice(0, arrayEndMatch.index) +
            `  ${constName}_SITE,\n` +
            musicSiteContent.slice(arrayEndMatch.index);
        }
      }

      add("lib/music-site.ts", musicSiteContent);
    }
  }

  // ── Update site-switcher.tsx ───────────────────────────────────────
  if (siteType === "music") {
    const switcherRaw = await readExistingFile("components/site-switcher.tsx", opts);
    if (switcherRaw) {
      let switcherContent = switcherRaw;

      if (!switcherContent.includes(`"/${siteId}"`)) {
        const logoPath = logoPaths[0] || `/images/${siteId}/logo.png`;
        const newEntry = `  { name: ${JSON.stringify(siteName)}, href: "/${siteId}", logo: ${JSON.stringify(logoPath)} },`;

        const musicSitesEnd = switcherContent.indexOf("];", switcherContent.indexOf("const musicSites"));
        if (musicSitesEnd !== -1) {
          switcherContent =
            switcherContent.slice(0, musicSitesEnd) +
            newEntry + "\n" +
            switcherContent.slice(musicSitesEnd);
        }
      }

      add("components/site-switcher.tsx", switcherContent);
    }
  }

  // ── Update home page (app/page.tsx) ──────────────────────────────
  if (siteType === "music") {
    const homeRaw = await readExistingFile("app/page.tsx", opts);
    if (homeRaw) {
      let homeContent = homeRaw;

      if (!homeContent.includes(`"/${siteId}"`)) {
        const logoPath = logoPaths[0] || `/images/${siteId}/logo.png`;
        const newEntry = `  {\n    name: ${JSON.stringify(siteName)},\n    href: "/${siteId}",\n    logo: ${JSON.stringify(logoPath)},\n    description: "Discography & catalog",\n  },`;

        const musicSitesStart = homeContent.indexOf("const musicSites");
        if (musicSitesStart !== -1) {
          const musicSitesEnd = homeContent.indexOf("];", musicSitesStart);
          if (musicSitesEnd !== -1) {
            homeContent =
              homeContent.slice(0, musicSitesEnd) +
              newEntry + "\n" +
              homeContent.slice(musicSitesEnd);
          }
        }
      }

      add("app/page.tsx", homeContent);
    }
  }

  // ── Append shell CSS (skip if already present) ─────────────────────
  {
    const cssRaw = await readExistingFile("app/globals.css", opts);
    if (cssRaw) {
      let cssContent = cssRaw;
      if (!cssContent.includes(`.${siteId}-shell`)) {
        const shellCss = templates.generateShellCss(siteId);
        cssContent += "\n" + shellCss + "\n";
      }
      add("app/globals.css", cssContent);
    }
  }

  // ── Register in site-daily-registry.ts ─────────────────────────────
  if (siteType === "music") {
    const registryRaw = await readExistingFile("lib/site-daily-registry.ts", opts);
    if (registryRaw) {
      let registryContent = registryRaw;

      const camel = siteId.replace(/-([a-z])/g, (_, c: string) => c.toUpperCase());
      const pascal = camel.charAt(0).toUpperCase() + camel.slice(1);

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

      const recordsImport =
        `import { getDaily${pascal}Record } from "@/lib/${siteId}-records-data";\n`;
      const albumImageImport =
        `import { getLocalAlbumImage as get${pascal}AlbumImage } from "@/lib/${siteId}-release-images";\n`;
      const recordsEntry =
        `  "${siteId}": {\n` +
        `    getDaily: getDaily${pascal}Record as (date?: Date) => RecordOfDay,\n` +
        `    getAlbumImage: get${pascal}AlbumImage,\n` +
        `  },\n`;

      if (!registryContent.includes(`${siteId}-trivia-data`)) {
        registryContent = registryContent.replace(
          `// ── Records imports`,
          `${triviaImport}\n// ── Records imports`,
        );
      }

      if (!registryContent.includes(`${siteId}-records-data`)) {
        registryContent = registryContent.replace(
          `// ── Album image imports`,
          `${recordsImport}\n// ── Album image imports`,
        );
      }

      if (!registryContent.includes(`${siteId}-release-images`)) {
        registryContent = registryContent.replace(
          `// ── Common types`,
          `${albumImageImport}\n// ── Common types`,
        );
      }

      if (!registryContent.includes(`"${siteId}": {\n    getDaily: getDaily${pascal}TriviaQuestions`)) {
        registryContent = registryContent.replace(
          `  // ── new-site-trivia ──`,
          `${triviaEntry}  // ── new-site-trivia ──`,
        );
      }

      if (!registryContent.includes(`"${siteId}": {\n    getDaily: getDaily${pascal}Record`)) {
        registryContent = registryContent.replace(
          `  // ── new-site-records ──`,
          `${recordsEntry}  // ── new-site-records ──`,
        );
      }

      add("lib/site-daily-registry.ts", registryContent);
    }
  }

  // ── Register in site-data-registry.ts ─────────────────────────────
  if (siteType === "music") {
    const dataRegRaw = await readExistingFile("lib/site-data-registry.ts", opts);
    if (dataRegRaw) {
      let dataReg = dataRegRaw;

      const bareId = siteId.replace(/-/g, "");
      const pascal = siteId
        .split("-")
        .map((s) => s.charAt(0).toUpperCase() + s.slice(1))
        .join("");

      if (!dataReg.includes(`${siteId}-artists-data`)) {
        const artistImport =
          `import { ${bareId}Artists } from "@/lib/${siteId}-artists-data";\n` +
          `import { ${constName}_ARTIST_IMAGES } from "@/lib/${siteId}-artist-images";\n`;
        dataReg = dataReg.replace(
          `// ── new-site-artists ──`,
          `${artistImport}// ── new-site-artists ──`,
        );
      }

      if (!dataReg.includes(`${siteId}-releases-data`)) {
        const releaseImport = `import { ${bareId}Releases } from "@/lib/${siteId}-releases-data";\n`;
        dataReg = dataReg.replace(
          `// ── new-site-releases ──`,
          `${releaseImport}// ── new-site-releases ──`,
        );
      }

      if (!dataReg.includes(`${siteId}-timeline-data`)) {
        const timelineImport = `import { ${bareId}Timeline } from "@/lib/${siteId}-timeline-data";\n`;
        dataReg = dataReg.replace(
          `// ── new-site-timeline ──`,
          `${timelineImport}// ── new-site-timeline ──`,
        );
      }

      if (!dataReg.includes(`${siteId}-release-images`)) {
        const albumImgImport = `import { getLocalAlbumImage as get${pascal}AlbumImage } from "@/lib/${siteId}-release-images";\n`;
        dataReg = dataReg.replace(
          `// ── new-site-albumimages ──`,
          `${albumImgImport}// ── new-site-albumimages ──`,
        );
      }

      if (!dataReg.includes(`"${siteId}": () => mapArtists(`)) {
        const artistEntry = `  "${siteId}": () => mapArtists(${bareId}Artists, ${constName}_ARTIST_IMAGES),\n`;
        dataReg = dataReg.replace(
          `  // ── new-site-artists-entry ──`,
          `${artistEntry}  // ── new-site-artists-entry ──`,
        );
      }

      if (!dataReg.includes(`"${siteId}": () =>\n    ${bareId}Releases`)) {
        const releaseEntry =
          `  "${siteId}": () =>\n` +
          `    ${bareId}Releases.map((r) => ({\n` +
          `      id: r.id,\n` +
          `      title: r.artist ? \`\${r.artist} — \${r.title}\` : r.title,\n` +
          `      artist: r.artist,\n` +
          `      year: r.year,\n` +
          `      format: r.format,\n` +
          `      catalogNo: r.catalogNo,\n` +
          `    })),\n`;
        dataReg = dataReg.replace(
          `  // ── new-site-releases-entry ──`,
          `${releaseEntry}  // ── new-site-releases-entry ──`,
        );
      }

      if (!dataReg.includes(`"${siteId}": () => mapTimeline(`)) {
        const timelineEntry = `  "${siteId}": () => mapTimeline(${bareId}Timeline),\n`;
        dataReg = dataReg.replace(
          `  // ── new-site-timeline-entry ──`,
          `${timelineEntry}  // ── new-site-timeline-entry ──`,
        );
      }

      if (!dataReg.includes(`"${siteId}": get${pascal}AlbumImage`)) {
        const albumImgEntry = `  "${siteId}": get${pascal}AlbumImage,\n`;
        dataReg = dataReg.replace(
          `  // ── new-site-albumimages-entry ──`,
          `${albumImgEntry}  // ── new-site-albumimages-entry ──`,
        );
      }

      add("lib/site-data-registry.ts", dataReg);
    }
  }

  // ── Register in site-registry.ts (slug mappings) ────────
  if (siteType === "music") {
    const slugRegRaw = await readExistingFile("lib/schemas/site-registry.ts", opts);
    if (slugRegRaw) {
      let slugReg = slugRegRaw;

      if (!slugReg.includes(`"${siteId}"`)) {
        const membersEnd = slugReg.indexOf("};", slugReg.indexOf("MEMBERS_ROUTE_SLUGS"));
        if (membersEnd !== -1) {
          slugReg =
            slugReg.slice(0, membersEnd) +
            `  "${siteId}": "artists",\n` +
            slugReg.slice(membersEnd);
        }

        const albumsEnd = slugReg.indexOf("};", slugReg.indexOf("ALBUMS_ROUTE_SLUGS"));
        if (albumsEnd !== -1) {
          slugReg =
            slugReg.slice(0, albumsEnd) +
            `  "${siteId}": "releases",\n` +
            slugReg.slice(albumsEnd);
        }
      }

      add("lib/schemas/site-registry.ts", slugReg);
    }
  }

  // ── Register videos in site-videos-content.tsx ─────────────────────
  if (siteType === "music" && videoLinks.length > 0) {
    const videosRaw = await readExistingFile("components/music-site/site-videos-content.tsx", opts);
    if (videosRaw) {
      let videosContent = videosRaw;

      if (!videosContent.includes(`"${siteId}":`)) {
        const parsedVideos = parseVideoLinks(videoLinks);

        if (parsedVideos.length > 0) {
          const camel = siteId.replace(/-([a-z])/g, (_: string, c: string) => c.toUpperCase());

          const videoEntries = parsedVideos
            .map((v) => `  {\n    id: ${JSON.stringify(v.id)},\n    title: ${JSON.stringify(v.title)},\n  },`)
            .join("\n");
          const videoArray = `const ${camel}Videos: Video[] = [\n${videoEntries}\n];\n`;

          videosContent = videosContent.replace(
            `const SITE_VIDEOS:`,
            `${videoArray}\n` + `const SITE_VIDEOS:`,
          );

          videosContent = videosContent.replace(
            `};

function getVideosForSite`,
            `  "${siteId}": ${camel}Videos,\n};

function getVideosForSite`,
          );
        }
      }

      add("components/music-site/site-videos-content.tsx", videosContent);
    }
  }

  return files;
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

/**
 * Generate site files and write them to disk (local dev mode).
 * Same behavior as before — now delegates to generateSiteFileContents() internally.
 */
export async function generateSiteFiles(
  siteId: string,
  siteType: "music" | "sports",
  data: GeneratedSiteData,
  logoPaths: string[],
  videoLinks: string[] = [],
): Promise<WriteResult[]> {
  const root = process.cwd();
  const results: WriteResult[] = [];

  // Generate all file contents in memory
  const files = await generateSiteFileContents({
    siteId,
    siteType,
    data,
    logoPaths,
    videoLinks,
    useGitHub: false,
  });

  // Write each file to disk
  for (const file of files) {
    const result = await writeFile(path.join(root, file.path), file.content);
    results.push(result);
  }

  // ── Download images and overwrite mapping files ─────────────────────
  try {
    const { config, artists, releases } = data;
    const { artistImages, releaseImages } = await downloadSiteImages(
      siteId,
      artists,
      releases,
      config.discogsLabelId,
    );

    if (Object.keys(artistImages).length > 0) {
      const result = await writeFile(
        path.join(root, `lib/${siteId}-artist-images.ts`),
        templates.generateArtistImagesFile(siteId, artistImages),
      );
      results.push(result);
    }
    if (Object.keys(releaseImages).length > 0) {
      const result = await writeFile(
        path.join(root, `lib/${siteId}-release-images.ts`),
        templates.generateReleaseImagesFile(siteId, releaseImages),
      );
      results.push(result);
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
