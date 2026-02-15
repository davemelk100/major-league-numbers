# AmRep Public API

REST API exposing the hand-curated Amphetamine Reptile Records catalog and artist data.

All endpoints are read-only (`GET`), return JSON, and include CORS (`Access-Control-Allow-Origin: *`) and cache headers (`Cache-Control: public, s-maxage=86400, stale-while-revalidate=604800`).

## Endpoints

### `GET /api/amrep/catalog`

Returns all releases with cover image URLs.

**Query parameters** (all optional):

| Param     | Description                          | Example             |
| --------- | ------------------------------------ | ------------------- |
| `artist`  | Filter by artist name (case-insensitive, partial match) | `?artist=Melvins`   |
| `year`    | Filter by release year               | `?year=1997`        |
| `section` | Filter by section (`US`, `Singles`)  | `?section=Singles`  |

**Response:**

```json
{
  "releases": [
    {
      "id": 1,
      "catalogNo": "001",
      "artist": "Cows",
      "title": "Peacetika",
      "year": 1991,
      "format": "CS",
      "section": "US",
      "imageUrl": "https://..."
    }
  ],
  "total": 290
}
```

### `GET /api/amrep/catalog/[id]`

Returns a single release by ID.

- **200** — release object (same shape as items in the catalog array)
- **400** — invalid ID
- **404** — release not found

### `GET /api/amrep/artists`

Returns all artists with image URLs.

**Response:**

```json
{
  "artists": [
    {
      "id": 25,
      "name": "Melvins",
      "description": "Noise rock band long associated with AmRep's roster.",
      "imageUrl": "https://..."
    }
  ],
  "total": 80
}
```

### `GET /api/amrep/artists/[id]`

Returns a single artist with image URL and their releases.

- **200** — artist object with a `releases` array
- **400** — invalid ID
- **404** — artist not found

**Response:**

```json
{
  "id": 25,
  "name": "Melvins",
  "description": "...",
  "imageUrl": "https://...",
  "releases": [
    {
      "id": 31,
      "catalogNo": "031",
      "title": "Prick",
      "year": 1994,
      "format": "LP",
      "section": "US",
      "imageUrl": "https://..."
    }
  ]
}
```

## Data Sources

All data is static and bundled at build time — no external API calls or database required.

| File                          | What it provides                |
| ----------------------------- | ------------------------------- |
| `lib/amrep-releases-data.ts`  | Release list and `getAmrepReleaseById()` |
| `lib/amrep-album-images.ts`   | Album cover URLs and `getAmrepAlbumImage()` |
| `lib/amrep-artists-data.ts`   | Artist list and `getAmrepArtistById()` |
| `lib/amrep-member-images.ts`  | Artist photo URLs (`AMREP_ARTIST_IMAGES`) |

## Examples

```bash
# Full catalog
curl localhost:3000/api/amrep/catalog | jq .total

# Filter by artist
curl localhost:3000/api/amrep/catalog?artist=Melvins | jq '.releases | length'

# Single release
curl localhost:3000/api/amrep/catalog/1 | jq .

# All artists
curl localhost:3000/api/amrep/artists | jq .total

# Single artist with releases
curl localhost:3000/api/amrep/artists/25 | jq .
```
