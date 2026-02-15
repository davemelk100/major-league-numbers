"use client";

import { useState } from "react";
import { Card, CardContent, CardHeader } from "@/components/ui/card";

interface Endpoint {
  method: "GET";
  path: string;
  description: string;
  params?: { name: string; type: string; description: string }[];
  responseExample: string;
  errorCodes?: { code: number; description: string }[];
}

const endpoints: Endpoint[] = [
  {
    method: "GET",
    path: "/api/amrep/catalog",
    description: "Returns all releases with cover image URLs.",
    params: [
      { name: "artist", type: "string", description: "Filter by artist name (case-insensitive, partial match)" },
      { name: "year", type: "number", description: "Filter by release year" },
      { name: "section", type: "string", description: 'Filter by section ("US" or "Singles")' },
    ],
    responseExample: `{
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
}`,
  },
  {
    method: "GET",
    path: "/api/amrep/catalog/[id]",
    description: "Returns a single release by ID with cover image URL.",
    responseExample: `{
  "id": 1,
  "catalogNo": "001",
  "artist": "Cows",
  "title": "Peacetika",
  "year": 1991,
  "format": "CS",
  "section": "US",
  "imageUrl": "https://..."
}`,
    errorCodes: [
      { code: 400, description: "Invalid release ID" },
      { code: 404, description: "Release not found" },
    ],
  },
  {
    method: "GET",
    path: "/api/amrep/artists",
    description: "Returns all artists with image URLs.",
    responseExample: `{
  "artists": [
    {
      "id": 25,
      "name": "Melvins",
      "description": "Noise rock band long associated with AmRep's roster.",
      "imageUrl": "https://..."
    }
  ],
  "total": 80
}`,
  },
  {
    method: "GET",
    path: "/api/amrep/artists/[id]",
    description: "Returns a single artist with image URL and their releases.",
    responseExample: `{
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
}`,
    errorCodes: [
      { code: 400, description: "Invalid artist ID" },
      { code: 404, description: "Artist not found" },
    ],
  },
];

function MethodBadge({ method }: { method: string }) {
  return (
    <span className="inline-block px-2 py-0.5 text-xs font-bold rounded bg-emerald-500/20 text-emerald-400 border border-emerald-500/30">
      {method}
    </span>
  );
}

function EndpointCard({ endpoint }: { endpoint: Endpoint }) {
  const [expanded, setExpanded] = useState(false);

  return (
    <Card className="py-0 overflow-hidden">
      <button
        type="button"
        className="w-full text-left px-6 py-4 flex items-center gap-3 hover:bg-muted/50 transition-colors cursor-pointer"
        onClick={() => setExpanded(!expanded)}
      >
        <MethodBadge method={endpoint.method} />
        <code className="text-sm font-mono flex-1">{endpoint.path}</code>
        <span className="text-xs text-muted-foreground hidden sm:block">
          {endpoint.description}
        </span>
        <svg
          className={`w-4 h-4 text-muted-foreground transition-transform ${expanded ? "rotate-180" : ""}`}
          fill="none"
          viewBox="0 0 24 24"
          stroke="currentColor"
        >
          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M19 9l-7 7-7-7" />
        </svg>
      </button>

      {expanded && (
        <CardContent className="border-t px-6 py-4 space-y-4">
          <p className="text-sm text-muted-foreground sm:hidden">
            {endpoint.description}
          </p>

          {endpoint.params && endpoint.params.length > 0 && (
            <div>
              <h4 className="text-xs font-semibold uppercase tracking-wide text-muted-foreground mb-2">
                Query Parameters
              </h4>
              <div className="space-y-2">
                {endpoint.params.map((p) => (
                  <div key={p.name} className="flex items-start gap-2 text-sm">
                    <code className="px-1.5 py-0.5 rounded bg-muted text-xs font-mono shrink-0">
                      {p.name}
                    </code>
                    <span className="text-xs text-muted-foreground shrink-0">
                      {p.type}
                    </span>
                    <span className="text-muted-foreground">{p.description}</span>
                  </div>
                ))}
              </div>
            </div>
          )}

          {endpoint.errorCodes && (
            <div>
              <h4 className="text-xs font-semibold uppercase tracking-wide text-muted-foreground mb-2">
                Error Codes
              </h4>
              <div className="space-y-1">
                {endpoint.errorCodes.map((e) => (
                  <div key={e.code} className="flex items-center gap-2 text-sm">
                    <code className="px-1.5 py-0.5 rounded bg-red-500/10 text-red-400 text-xs font-mono">
                      {e.code}
                    </code>
                    <span className="text-muted-foreground">{e.description}</span>
                  </div>
                ))}
              </div>
            </div>
          )}

          <div>
            <h4 className="text-xs font-semibold uppercase tracking-wide text-muted-foreground mb-2">
              Response
            </h4>
            <pre className="text-xs font-mono bg-muted/50 rounded-md p-4 overflow-x-auto">
              {endpoint.responseExample}
            </pre>
          </div>
        </CardContent>
      )}
    </Card>
  );
}

export function AmrepApiDocsContent() {
  return (
    <div className="container py-6">
      <h1 className="font-league mb-6">API</h1>
      <p className="text-muted-foreground mb-4">
        Public read-only JSON endpoints for the AmRep catalog and artist data.
        All responses include CORS headers and are cached for 24 hours.
      </p>
      <div className="flex flex-wrap gap-2 mb-8">
        <span className="text-xs px-2 py-1 rounded bg-muted text-muted-foreground">
          Base URL: <code className="font-mono">/api/amrep</code>
        </span>
        <span className="text-xs px-2 py-1 rounded bg-muted text-muted-foreground">
          CORS: <code className="font-mono">*</code>
        </span>
        <span className="text-xs px-2 py-1 rounded bg-muted text-muted-foreground">
          Cache: <code className="font-mono">s-maxage=86400</code>
        </span>
      </div>

      <div className="space-y-3">
        {endpoints.map((ep) => (
          <EndpointCard key={ep.path} endpoint={ep} />
        ))}
      </div>

      <Card className="py-6 mt-8">
        <CardHeader className="pb-4">
          <h2>Examples</h2>
        </CardHeader>
        <CardContent>
          <pre className="text-xs font-mono bg-muted/50 rounded-md p-4 overflow-x-auto whitespace-pre-wrap">{`# Full catalog
curl /api/amrep/catalog | jq .total

# Filter by artist
curl /api/amrep/catalog?artist=Melvins | jq '.releases | length'

# Single release
curl /api/amrep/catalog/1 | jq .

# All artists
curl /api/amrep/artists | jq .total

# Single artist with releases
curl /api/amrep/artists/25 | jq .`}</pre>
        </CardContent>
      </Card>
    </div>
  );
}
