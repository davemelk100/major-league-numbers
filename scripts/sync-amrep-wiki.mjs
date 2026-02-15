import fs from "node:fs/promises";
import path from "node:path";

const WIKIPEDIA_PAGE = "Amphetamine_Reptile_Records_discography";
const MEDIAWIKI_API = "https://en.wikipedia.org/w/api.php";
const WIKIPEDIA_URL = `https://en.wikipedia.org/wiki/${WIKIPEDIA_PAGE}`;
const USER_AGENT = "MajorLeagueNumbers/1.0";

const DATA_DIR = path.join(process.cwd(), "data");
const DISCOGRAPHY_PATH = path.join(DATA_DIR, "amrep-discography.json");
const REVISION_PATH = path.join(DATA_DIR, "amrep-wiki-revision.json");

// --- HTML parsing (inlined from lib/amrep-wikipedia-discography.ts) ---

const htmlEntities = {
  "&amp;": "&",
  "&quot;": '"',
  "&#39;": "'",
  "&nbsp;": " ",
  "&ndash;": "-",
  "&mdash;": "-",
  "&lsquo;": "'",
  "&rsquo;": "'",
  "&ldquo;": '"',
  "&rdquo;": '"',
  "&hellip;": "...",
};

function decodeHtml(value) {
  return value.replace(
    /&[a-zA-Z0-9#]+;/g,
    (entity) => htmlEntities[entity] ?? entity
  );
}

function stripHtml(value) {
  return decodeHtml(
    value
      .replace(/<sup[^>]*>.*?<\/sup>/g, "")
      .replace(/<[^>]+>/g, "")
      .replace(/\[[0-9]+\]/g, "")
      .replace(/\s+/g, " ")
      .trim()
  );
}

function extractTableAfterHeading(html, headingId) {
  const headingIndex = html.indexOf(`id="${headingId}"`);
  if (headingIndex < 0) return null;
  // Look for the sortable wikitable (skip the legend/key table that precedes it)
  const sortableMarker = 'wikitable sortable';
  const tableStart = html.indexOf(sortableMarker, headingIndex);
  if (tableStart < 0) return null;
  // Back up to find the actual <table tag
  const tagStart = html.lastIndexOf("<table", tableStart);
  if (tagStart < 0) return null;
  const tableEnd = html.indexOf("</table>", tableStart);
  if (tableEnd < 0) return null;
  return html.slice(tagStart, tableEnd + "</table>".length);
}

function parseDiscographyTable(tableHtml) {
  const rows = tableHtml.split(/<\/tr>/i);
  const releases = [];

  // Track active rowspans per column: { value, remaining }
  // Columns: 0=No, 1=Year, 2=Artist, 3=Title, 4=Format
  const activeSpans = [null, null, null, null, null];

  for (const row of rows) {
    // Extract cells with their attributes
    const cellData = [];
    const cellRegex = /<t[dh]([^>]*)>([\s\S]*?)<\/t[dh]>/gi;
    let match;
    while ((match = cellRegex.exec(row))) {
      const attrs = match[1];
      const content = stripHtml(match[2]);
      const rowspanMatch = attrs.match(/rowspan="(\d+)"/);
      const rowspan = rowspanMatch ? Number(rowspanMatch[1]) : 1;
      cellData.push({ content, rowspan });
    }

    if (!cellData.length) continue;
    if (cellData[0].content.toLowerCase() === "no.") continue;

    // Reconstruct the full 5-column row by filling in rowspan gaps
    const fullRow = [];
    let cellIdx = 0;
    for (let col = 0; col < 5; col++) {
      if (activeSpans[col] && activeSpans[col].remaining > 0) {
        // This column is covered by a previous rowspan
        fullRow.push(activeSpans[col].value);
        activeSpans[col].remaining--;
      } else if (cellIdx < cellData.length) {
        // Use the next available cell
        const cell = cellData[cellIdx++];
        fullRow.push(cell.content);
        if (cell.rowspan > 1) {
          activeSpans[col] = { value: cell.content, remaining: cell.rowspan - 1 };
        } else {
          activeSpans[col] = null;
        }
      } else {
        fullRow.push(null);
      }
    }

    const [catalogNo, yearStr, artist, title, format] = fullRow;
    if (!catalogNo) continue;

    const year = /^\d{4}$/.test(yearStr || "") ? Number(yearStr) : null;

    releases.push({
      catalogNo,
      year,
      artist: artist || null,
      title: title || null,
      format: format || null,
    });
  }

  return releases;
}

// --- MediaWiki revision check ---

async function fetchLatestRevisionTimestamp() {
  const params = new URLSearchParams({
    action: "query",
    titles: WIKIPEDIA_PAGE,
    prop: "revisions",
    rvprop: "timestamp",
    rvlimit: "1",
    format: "json",
  });

  const res = await fetch(`${MEDIAWIKI_API}?${params}`, {
    headers: { "User-Agent": USER_AGENT },
  });

  if (!res.ok) {
    throw new Error(`MediaWiki API request failed: ${res.status}`);
  }

  const data = await res.json();
  const pages = data.query.pages;
  const page = Object.values(pages)[0];

  if (!page.revisions || !page.revisions.length) {
    throw new Error("No revisions found for Wikipedia page");
  }

  return page.revisions[0].timestamp;
}

// --- Wikipedia scrape ---

async function fetchWikipediaDiscography() {
  const res = await fetch(WIKIPEDIA_URL, {
    headers: { "User-Agent": USER_AGENT },
  });

  if (!res.ok) {
    throw new Error(`Wikipedia fetch failed: ${res.status}`);
  }

  const html = await res.text();
  const usTable = extractTableAfterHeading(html, "United_States_Discography");
  const singlesTable = extractTableAfterHeading(html, "Singles_Discography");

  return {
    usDiscography: usTable ? parseDiscographyTable(usTable) : [],
    singlesDiscography: singlesTable ? parseDiscographyTable(singlesTable) : [],
  };
}

// --- Diffing ---

function diffReleases(staticData, wikiData) {
  // Key by catalogNo + section to avoid cross-section false matches
  const makeKey = (catalogNo, section) => `${section}:${catalogNo}`;

  const staticByKey = new Map();
  for (const entry of staticData) {
    staticByKey.set(makeKey(entry.catalogNo, entry.section), entry);
  }

  const newReleases = [];
  const changed = [];

  for (const wiki of wikiData) {
    const key = makeKey(wiki.catalogNo, wiki.section);
    const existing = staticByKey.get(key);
    if (!existing) {
      newReleases.push(wiki);
      continue;
    }

    const fields = ["artist", "title", "year", "format"];
    const changes = [];
    for (const field of fields) {
      const staticVal = existing[field] ?? null;
      const wikiVal = wiki[field] ?? null;
      if (String(staticVal) !== String(wikiVal)) {
        changes.push({ field, from: staticVal, to: wikiVal });
      }
    }
    if (changes.length) {
      changed.push({ catalogNo: wiki.catalogNo, changes, section: wiki.section });
    }
  }

  const wikiKeys = new Set(wikiData.map((r) => makeKey(r.catalogNo, r.section)));
  const removed = staticData.filter(
    (s) => !wikiKeys.has(makeKey(s.catalogNo, s.section))
  );

  return { newReleases, changed, removed };
}

// --- Main ---

async function main() {
  // 1. Check latest revision
  console.log("Checking Wikipedia revision timestamp...");
  const latestRevision = await fetchLatestRevisionTimestamp();
  console.log(`Latest revision: ${latestRevision}`);

  // 2. Compare with stored revision
  let revisionData;
  try {
    const raw = await fs.readFile(REVISION_PATH, "utf-8");
    revisionData = JSON.parse(raw);
  } catch {
    revisionData = { lastRevision: null, lastChecked: null };
  }

  if (revisionData.lastRevision === latestRevision) {
    console.log("No changes since last check. Exiting.");
    return;
  }

  console.log(
    `Revision changed (was: ${revisionData.lastRevision ?? "never checked"}). Scraping...`
  );

  // 3. Scrape Wikipedia
  const { usDiscography, singlesDiscography } =
    await fetchWikipediaDiscography();
  console.log(
    `Parsed ${usDiscography.length} US releases, ${singlesDiscography.length} singles.`
  );

  // Tag with section
  const wikiReleases = [
    ...usDiscography.map((r) => ({ ...r, section: "US" })),
    ...singlesDiscography.map((r) => ({ ...r, section: "Singles" })),
  ];

  // 4. Load static data and diff
  const staticRaw = await fs.readFile(DISCOGRAPHY_PATH, "utf-8");
  const staticData = JSON.parse(staticRaw);

  const { newReleases, changed, removed } = diffReleases(
    staticData,
    wikiReleases
  );

  // 5. Report
  console.log("\n--- Diff Summary ---");
  console.log(`New releases:     ${newReleases.length}`);
  console.log(`Changed releases: ${changed.length}`);
  console.log(`Removed releases: ${removed.length}`);

  if (newReleases.length) {
    console.log("\nNew:");
    for (const r of newReleases) {
      console.log(
        `  [${r.section}] ${r.catalogNo} — ${r.artist} - ${r.title} (${r.year ?? "?"}, ${r.format ?? "?"})`
      );
    }
  }

  if (changed.length) {
    console.log("\nChanged:");
    for (const c of changed) {
      console.log(`  ${c.catalogNo}:`);
      for (const ch of c.changes) {
        console.log(`    ${ch.field}: "${ch.from}" → "${ch.to}"`);
      }
    }
  }

  if (removed.length) {
    console.log("\nRemoved from Wikipedia:");
    for (const r of removed) {
      console.log(`  ${r.catalogNo} — ${r.artist} - ${r.title}`);
    }
  }

  const hasChanges = newReleases.length || changed.length;
  if (!hasChanges) {
    console.log("\nNo actionable changes. Updating revision timestamp only.");
  } else {
    // 6. Apply changes to static data
    let maxId = Math.max(...staticData.map((e) => e.id));

    // Add new releases
    for (const r of newReleases) {
      maxId += 1;
      staticData.push({
        id: maxId,
        catalogNo: r.catalogNo,
        artist: r.artist,
        title: r.title,
        year: r.year,
        format: r.format,
        section: r.section,
      });
    }

    // Apply field changes
    for (const c of changed) {
      const entry = staticData.find(
        (e) => e.catalogNo === c.catalogNo && e.section === c.section
      );
      if (!entry) continue;
      for (const ch of c.changes) {
        entry[ch.field] = ch.to;
      }
    }

    await fs.writeFile(
      DISCOGRAPHY_PATH,
      JSON.stringify(staticData, null, 2) + "\n",
      "utf-8"
    );
    console.log("\nUpdated data/amrep-discography.json");
  }

  // 7. Update revision file
  const updatedRevision = {
    lastRevision: latestRevision,
    lastChecked: new Date().toISOString(),
  };
  await fs.writeFile(
    REVISION_PATH,
    JSON.stringify(updatedRevision, null, 2) + "\n",
    "utf-8"
  );
  console.log("Updated data/amrep-wiki-revision.json");
}

main().catch((err) => {
  console.error("Sync failed:", err);
  process.exit(1);
});
