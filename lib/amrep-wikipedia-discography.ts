export type AmrepWikipediaRelease = {
  catalogNo: string;
  year?: number | null;
  artist?: string | null;
  title?: string | null;
  format?: string | null;
};

const WIKIPEDIA_URL =
  "https://en.wikipedia.org/wiki/Amphetamine_Reptile_Records_discography";

const htmlEntities: Record<string, string> = {
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

function decodeHtml(value: string): string {
  return value.replace(/&[a-zA-Z0-9#]+;/g, (entity) => htmlEntities[entity] ?? entity);
}

function stripHtml(value: string): string {
  return decodeHtml(
    value
      .replace(/<sup[^>]*>.*?<\/sup>/g, "")
      .replace(/<[^>]+>/g, "")
      .replace(/\[[0-9]+\]/g, "")
      .replace(/\s+/g, " ")
      .trim()
  );
}

function extractTableAfterHeading(html: string, headingText: string): string | null {
  const headingIndex = html.indexOf(headingText);
  if (headingIndex < 0) return null;
  const tableStart = html.indexOf("<table", headingIndex);
  if (tableStart < 0) return null;
  const tableEnd = html.indexOf("</table>", tableStart);
  if (tableEnd < 0) return null;
  return html.slice(tableStart, tableEnd + "</table>".length);
}

function parseDiscographyTable(tableHtml: string): AmrepWikipediaRelease[] {
  const rows = tableHtml.split(/<\/tr>/i);
  const releases: AmrepWikipediaRelease[] = [];

  for (const row of rows) {
    const cells = [];
    const cellRegex = /<t[dh][^>]*>([\s\S]*?)<\/t[dh]>/gi;
    let match: RegExpExecArray | null;
    while ((match = cellRegex.exec(row))) {
      cells.push(stripHtml(match[1]));
    }

    if (!cells.length) continue;
    if (cells[0].toLowerCase() === "no.") continue;

    const [no, col2, col3, col4, col5] = cells;
    const release: AmrepWikipediaRelease = {
      catalogNo: no,
      year: null,
      artist: null,
      title: null,
      format: null,
    };

    if (/^\d{4}$/.test(col2 || "")) {
      release.year = Number(col2);
      release.artist = col3 ?? null;
      release.title = col4 ?? null;
      release.format = col5 ?? null;
    } else {
      release.year = null;
      release.artist = col2 ?? null;
      release.title = col3 ?? null;
      release.format = col4 ?? null;
    }

    releases.push(release);
  }

  return releases;
}

export async function fetchAmrepWikipediaDiscography() {
  const response = await fetch(WIKIPEDIA_URL, {
    headers: { "User-Agent": "MajorLeagueNumbers/1.0" },
    next: { revalidate: 86400 },
  });

  if (!response.ok) {
    throw new Error(`Wikipedia fetch failed: ${response.status}`);
  }

  const html = await response.text();
  const usTable = extractTableAfterHeading(html, "United States Discography");
  const singlesTable = extractTableAfterHeading(html, "Singles Discography");

  return {
    source: WIKIPEDIA_URL,
    usDiscography: usTable ? parseDiscographyTable(usTable) : [],
    singlesDiscography: singlesTable ? parseDiscographyTable(singlesTable) : [],
  };
}
