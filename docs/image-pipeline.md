# Image Pipeline

How artist photos, release cover art, and fallback images are resolved across all music sites.

## Overview

The image system uses a multi-layered approach: **local image → remote source → cache → fallback**. Each music site declares its image behavior through a config block, and shared components handle resolution, proxying, and caching automatically. No site-specific image logic lives in page-level code.

## Site Configuration

Every `MusicSiteConfig` in `lib/music-site.ts` includes an `images` block:

```ts
images: {
  fallbackIcon: string;           // Site icon shown when no image is found
  fit: "cover" | "contain";       // Default object-fit for images
  lookupStrategy: "wikimedia" | "discogs";  // How to find artist photos remotely
  lookupContext?: string;          // Disambiguation term for Wikidata searches
  invalidCacheValues: string[];    // Values that should not be treated as cached hits
}
```

| Site | `fallbackIcon` | `fit` | `lookupStrategy` | `lookupContext` |
|------|----------------|-------|-------------------|-----------------|
| GBV | `/chat-gbv-box.svg` | `cover` | `wikimedia` | `Guided By Voices` |
| AmRep | `/noise-bird.svg` | `contain` | `wikimedia` | `Amphetamine Reptile Records` |
| E6 | `/e6-logo.png` | `contain` | `discogs` | — |
| Rev | `/rev-icon.svg` | `contain` | `discogs` | — |
| SG | `/sg-logo.png` | `contain` | `wikimedia` | `Skin Graft Records` |

## Artist Image Resolution

Two components resolve artist images: `useMemberImage` (hook) and `MemberAvatar` (component with built-in resolution). Both follow the same fallback chain:

```
1. Local image          →  from per-site data file (e.g. /gbv-members/198683.jpg)
2. Discogs image        →  URL stored in data file (proxied through /api/images/proxy)
3. Fallback image       →  per-artist override from a fallback map
4. localStorage cache   →  previously resolved URL keyed by "{siteId}-member-image:{name}"
5. Remote lookup        →  API call based on lookupStrategy (see below)
6. Site fallback icon   →  the site's fallbackIcon from config
```

Steps 1–3 are synchronous (no network request). Step 4 checks the browser cache. Step 5 makes an API call only if nothing was found. Step 6 is the final fallback rendered by `MemberAvatar` when everything else fails.

### Lookup Strategies

**`wikimedia`** — Calls `/api/images/commons?name={name}&context={lookupContext}`. The API searches Wikidata for the artist, prioritizes results whose descriptions contain musician-related keywords, retrieves the P18 (image) claim, and returns a Wikimedia Commons `Special:FilePath` URL.

**`discogs`** — Calls `/api/{siteId}/discogs?type=artist&name={name}`. Uses the site's own Discogs API route to search for the artist and return their image URL.

### Key Files

- `components/music-site/use-member-image.tsx` — React hook returning `{ resolvedImageUrl }`
- `components/music-site/member-avatar.tsx` — Full avatar component with placeholder rendering

## Release Cover Art

Release/album images are resolved differently from artist images. The flow depends on whether a local image exists in the per-site data file.

### Resolution Flow

1. **Local image** — The page calls a `getAlbumImage()` function that checks the site's release image map (e.g. `lib/gbv-release-images.ts`). If a URL is found, it's passed directly to the image component.
2. **Remote lookup via Cover Art Archive** — If no local image exists, the `/api/images/cover-art` endpoint searches MusicBrainz for the release group, then fetches cover art from the Cover Art Archive. Results are cached both in-memory (server) and on disk (`public/image-cache/`).
3. **Fallback** — The site's `fallbackIcon` is displayed.

### Components

- `components/music-site/album-grid.tsx` — `AlbumGrid` renders a grid of releases. Accepts a `RemoteImage` component, `getAlbumImage` function, and optional `getLocalFallbackImage` for two-tier local fallbacks.
- `components/music-site/dashboard-sections.tsx` — `DashboardDiscographyGrid` renders a smaller release grid on dashboard pages using `SiteRemoteImage`.

## Components

### `RemoteImage`

The core image component in `components/music-site/remote-image.tsx`. Implements a state machine that tries multiple sources before giving up:

```
direct → proxy → localFallback → fallback
```

| State | Source | On Error |
|-------|--------|----------|
| `direct` | Original URL as-is | Try `proxy` |
| `proxy` | URL through `/api/images/proxy` | Try `localFallback` (if provided) or `fallback` |
| `localFallback` | A local file path (e.g. downloaded image) | Try `fallback` |
| `fallback` | Site's fallback icon | Call `onAllFailed` callback |

Additional behaviors:
- Checks `localStorage` for a cached URL on mount (via `cacheKey` prop)
- Writes successful loads back to `localStorage`
- Shows a pulse animation while loading
- Forces `object-contain` when in the fallback state
- Uses `referrerPolicy="no-referrer"` to avoid hotlink blocks

### `SiteRemoteImage`

A thin wrapper in `components/music-site/site-remote-image.tsx` that reads defaults from the site config:

- `fallbackSrc` → `site.images.fallbackIcon`
- `fit` → `site.images.fit`
- `invalidCacheValues` → `site.images.invalidCacheValues`

### `MemberAvatar`

In `components/music-site/member-avatar.tsx`. A self-contained artist image component that:
- Runs the full artist image resolution chain internally
- Renders a placeholder (site icon) while resolving or if no image is found
- Wraps `RemoteImage` for the final display
- Supports `skipImages` and `fallbackImages` maps for per-artist overrides

## API Routes

### `/api/images/proxy` (GET)

**File:** `app/api/images/proxy/route.ts`

CORS image proxy. Fetches remote images server-side and returns them with permissive headers.

- **Query params:** `url` (required) — the remote image URL
- **Domain allowlist:** Only proxies images from known domains (Discogs, Archive.org, Wikimedia, Bandcamp, etc.)
- **Response headers:** `Cache-Control: public, max-age=31536000, immutable`
- Sets appropriate `Referer` headers (Discogs-specific handling)

### `/api/images/commons` (GET)

**File:** `app/api/images/commons/route.ts`

Wikidata/Wikimedia Commons artist image lookup.

- **Query params:** `name` (required), `context` (optional disambiguation term)
- **Flow:**
  1. Search Wikidata for the name
  2. Prioritize results with musician-related descriptions
  3. Fetch the P18 (image) claim from the best match
  4. If no image found, retry with `"{name} {context}"` as the search term
- **Returns:** `{ imageUrl, sourceUrl }` or `{ imageUrl: null }`

### `/api/images/cover-art` (GET and POST)

**File:** `app/api/images/cover-art/route.ts`

MusicBrainz + Cover Art Archive lookup for release cover images.

- **GET query params:** `artist`, `album`, `mbid` (optional direct lookup), `year`, `primaryType`, `size`
- **POST body:** `{ albums: [...], useSmallThumbnails: boolean }` for batch lookups (max 12, rate-limited at 350ms between requests)
- **Flow:**
  1. Check in-memory cache (24h TTL)
  2. Search MusicBrainz for the release group (scored by type + year match)
  3. Fetch front cover from Cover Art Archive
  4. Cache the image to disk via `cacheRemoteImage()`
- **Returns:** `{ coverUrl, mbid, cached }`

## Caching Layers

| Layer | Location | TTL | Key Format | Used By |
|-------|----------|-----|------------|---------|
| localStorage | Client browser | Permanent (until cleared) | `{siteId}-member-image:{name}` | `useMemberImage`, `MemberAvatar`, `RemoteImage` |
| In-memory Map | Server process | 24 hours | `{artist}:{album}:{size}` | `/api/images/cover-art` |
| Disk cache | `public/image-cache/` | Permanent | `{prefix}-{sha256hash}.{ext}` | `lib/image-cache.ts` via cover-art API |

### `lib/image-cache.ts`

Server-side disk caching utility:
- Hashes the remote URL with SHA-256 to create a stable filename
- Checks for existing cached files before fetching
- Downloads the image and writes it to `public/image-cache/`
- Returns a local path like `/image-cache/gbv-cover-abc123.jpg`

### `lib/image-utils.ts`

Client-side URL utilities:
- `normalizeImageUrl()` — upgrades `http:` to `https:`, passes through local paths
- `isLocalImageUrl()` — checks if a URL starts with `/`
- `getProxiedImageUrl()` — wraps remote URLs with `/api/images/proxy?url=...`, passes through local paths

## Per-Site Data Files

Each site has up to two data files in `lib/`:

| File | Exports | Purpose |
|------|---------|---------|
| `lib/{site}-artist-images.ts` | `localMemberImages: Record<number, string>`, `getLocalMemberImage()` | Maps artist Discogs IDs to local file paths or remote URLs |
| `lib/{site}-release-images.ts` | `localAlbumImages: Record<number, string>`, `getLocalAlbumImage()` | Maps release IDs to local file paths or remote URLs |

Artist image files may also export a fallback map (e.g. `GBV_MEMBER_IMAGE_FALLBACKS`) for name-keyed overrides.

Current data files:
- `lib/gbv-artist-images.ts`, `lib/gbv-release-images.ts`
- `lib/amrep-artist-images.ts`, `lib/amrep-release-images.ts`

Sites without data files (E6, Rev, SG) rely entirely on remote lookup and the fallback chain.

## Adding a New Site

1. **Add an `images` block** to the site's `MusicSiteConfig` in `lib/music-site.ts`:
   - Choose a `fallbackIcon` (the site's logo/icon SVG or PNG)
   - Set `fit` (`"cover"` for photos, `"contain"` for logos/icons)
   - Pick a `lookupStrategy` (`"wikimedia"` for Wikidata/Commons, `"discogs"` for Discogs API)
   - Add `lookupContext` if using `"wikimedia"` (helps disambiguate common names)
   - Set `invalidCacheValues` to `[fallbackIcon]` so the fallback icon isn't cached as a "real" image

2. **Create data files** (optional, for pre-downloaded images):
   - `lib/{siteId}-artist-images.ts` exporting `localMemberImages` and `getLocalMemberImage()`
   - `lib/{siteId}-release-images.ts` exporting `localAlbumImages` and `getLocalAlbumImage()`

3. **Images resolve automatically** — `SiteRemoteImage`, `MemberAvatar`, and `useMemberImage` all read from the site config. No component changes needed.

4. **Add allowed domains** to `ALLOWED_DOMAINS` in `app/api/images/proxy/route.ts` if the site's images come from new external hosts.
