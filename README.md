# Major League Numbers

Sports stats and music encyclopedias — MLB, NHL, NFL, NBA, PGA, USPBL, GBV, AmRep, Revelation Records, Elephant 6, and Skin Graft Records.

**Live site:** https://majorleaguenumbers.com/

## Getting Started

```bash
npm install
npm run dev
```

The dev server runs at `http://localhost:3000`.

## Scripts


| Command | Description |
|---------|-------------|
| `npm run dev` | Start development server |
| `npm run build` | Production build |
| `npm start` | Run production server |
| `npm run lint` | Run ESLint |
| `npm run typecheck` | Run TypeScript validation |
| `npm test` | Run unit tests (Vitest) |
| `npm run test:watch` | Run tests in watch mode |
| `npm run test:e2e` | Run Playwright end-to-end tests |
| `npm run predeploy` | Pre-deployment gate: typecheck, lint, test, build, e2e |

## Tech Stack

- [Next.js](https://nextjs.org/) 16
- [React](https://react.dev/) 19
- [TypeScript](https://www.typescriptlang.org/)
- [Tailwind CSS](https://tailwindcss.com/)
- [Radix UI](https://www.radix-ui.com/)

## Public API

Read-only MLB endpoints under `/api/public/v1/*`, gated by Bearer-token auth and rate limited via Upstash Redis.

### Endpoints

| Method | Path | Query | Returns |
|--------|------|-------|---------|
| `GET` | `/api/public/v1/teams` | `season` (optional, integer) | `{ season, teams: Team[] }` |
| `GET` | `/api/public/v1/players` | `season` (optional, integer) | `{ season, players: Player[] }` |

`season` defaults to the current MLB default season when omitted.

### Authentication

Send the key in the `Authorization` header:

```bash
curl -H "Authorization: Bearer <key>" \
  https://majorleaguenumbers.com/api/public/v1/teams?season=2024
```

Missing key → `401 missing_api_key`. Wrong key → `401 invalid_api_key`.

### Rate limiting

60 requests per minute per key (sliding window). Every response includes:

- `X-RateLimit-Limit`
- `X-RateLimit-Remaining`
- `X-RateLimit-Reset` (seconds)

On exceed: `429 rate_limited` with `Retry-After`. If Redis is unavailable in production, requests fail closed with `503 rate_limiter_unavailable`.

### Errors

All errors share the shape `{ "error": { "code": "...", "message": "..." } }`:

| Status | Code | When |
|--------|------|------|
| `400` | `invalid_query` | Query params failed validation |
| `401` | `missing_api_key` | No `Authorization` header |
| `401` | `invalid_api_key` | Key not in allowlist |
| `429` | `rate_limited` | Quota exceeded |
| `500` | `internal_error` | Unhandled handler exception |
| `503` | `api_keys_not_configured` | `PUBLIC_API_KEYS` not set on server |
| `503` | `rate_limiter_unavailable` | Upstash unreachable in production |

### Caching

Successful responses set `Cache-Control: public, s-maxage=300, stale-while-revalidate=1800` so Vercel's CDN serves most traffic.

### Configuration

Required server-side env vars:

| Variable | Format | Purpose |
|----------|--------|---------|
| `PUBLIC_API_KEYS` | `id1:sha256hex,id2:sha256hex,...` | Allowlist of issued keys (store hashes, not raw keys) |
| `UPSTASH_REDIS_REST_URL` | URL | Upstash Redis REST endpoint (auto-set by the Vercel Marketplace integration) |
| `UPSTASH_REDIS_REST_TOKEN` | token | Upstash Redis REST token (same) |
| `PUBLIC_API_ALLOWED_ORIGINS` | comma-separated origins | Optional CORS allowlist for browser callers |

Generate a key and hash locally:

```bash
node -e 'const c=require("crypto");const k=c.randomBytes(32).toString("hex");console.log("key:",k,"\nhash:",c.createHash("sha256").update(k).digest("hex"))'
```

Give the key to the consumer; store only `id:hash` in `PUBLIC_API_KEYS`.
