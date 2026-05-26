import { NextResponse, type NextRequest } from "next/server";
import { authenticateApiKey, extractBearerToken } from "./auth";
import { checkRateLimit } from "./rate-limit";

export type PublicApiContext = {
  keyId: string;
  request: NextRequest;
};

export type PublicApiHandler = (
  ctx: PublicApiContext,
) => Promise<NextResponse> | NextResponse;

type Options = {
  // Seconds for the shared CDN cache. Routes opt out with `cache: 0`.
  cache?: number;
};

const ALLOWED_ORIGINS = (process.env.PUBLIC_API_ALLOWED_ORIGINS ?? "")
  .split(",")
  .map((o) => o.trim())
  .filter(Boolean);

function corsHeaders(origin: string | null): Record<string, string> {
  if (!origin) return {};
  if (!ALLOWED_ORIGINS.includes(origin)) return {};
  return {
    "Access-Control-Allow-Origin": origin,
    "Access-Control-Allow-Methods": "GET, OPTIONS",
    "Access-Control-Allow-Headers": "Authorization, Content-Type",
    "Access-Control-Max-Age": "86400",
    Vary: "Origin",
  };
}

function errorResponse(
  status: number,
  code: string,
  message: string,
  extra: Record<string, string> = {},
): NextResponse {
  return NextResponse.json(
    { error: { code, message } },
    { status, headers: extra },
  );
}

export function withPublicApi(
  handler: PublicApiHandler,
  options: Options = {},
) {
  return async function route(request: NextRequest): Promise<NextResponse> {
    const origin = request.headers.get("origin");
    const cors = corsHeaders(origin);

    if (request.method === "OPTIONS") {
      return new NextResponse(null, { status: 204, headers: cors });
    }

    const presented = extractBearerToken(request.headers.get("authorization"));
    const auth = authenticateApiKey(presented);
    if (!auth.ok) {
      return errorResponse(auth.status, auth.code, auth.message, cors);
    }

    const limit = await checkRateLimit(auth.keyId);

    if (!limit.ok && limit.reason === "unavailable") {
      return errorResponse(
        503,
        "rate_limiter_unavailable",
        "Rate limiting is temporarily unavailable. Try again shortly.",
        { ...cors, "Retry-After": "30" },
      );
    }

    const limitHeaders = {
      "X-RateLimit-Limit": String(limit.limit),
      "X-RateLimit-Remaining": String(limit.remaining),
      "X-RateLimit-Reset": String(limit.resetSeconds),
    };

    if (!limit.ok) {
      return errorResponse(429, "rate_limited", "Too many requests.", {
        ...cors,
        ...limitHeaders,
        "Retry-After": String(limit.resetSeconds),
      });
    }

    let response: NextResponse;
    try {
      response = await handler({ keyId: auth.keyId, request });
    } catch (err) {
      console.error("[public-api] handler error", {
        path: request.nextUrl.pathname,
        keyId: auth.keyId,
        err,
      });
      return errorResponse(500, "internal_error", "Unexpected server error.", {
        ...cors,
        ...limitHeaders,
      });
    }

    for (const [k, v] of Object.entries({ ...cors, ...limitHeaders })) {
      response.headers.set(k, v);
    }

    if (options.cache && options.cache > 0) {
      response.headers.set(
        "Cache-Control",
        `public, s-maxage=${options.cache}, stale-while-revalidate=${options.cache * 6}`,
      );
    }

    return response;
  };
}
