import { Ratelimit } from "@upstash/ratelimit";
import { Redis } from "@upstash/redis";

export type RateLimitResult =
  | { ok: true; limit: number; remaining: number; resetSeconds: number }
  | {
      ok: false;
      reason: "exceeded";
      limit: number;
      remaining: number;
      resetSeconds: number;
    }
  | { ok: false; reason: "unavailable" };

const WINDOW = "1 m" as const;
const MAX_PER_WINDOW = 60;

// Upstash Redis on Vercel sets either UPSTASH_REDIS_REST_* (Marketplace) or
// KV_REST_API_* (legacy KV-style integration). Support both, lazily.
let cachedLimiter: Ratelimit | null | undefined;

function getLimiter(): Ratelimit | null {
  if (cachedLimiter !== undefined) return cachedLimiter;

  const url =
    process.env.UPSTASH_REDIS_REST_URL ?? process.env.KV_REST_API_URL;
  const token =
    process.env.UPSTASH_REDIS_REST_TOKEN ?? process.env.KV_REST_API_TOKEN;

  if (!url || !token) {
    cachedLimiter = null;
    return null;
  }

  cachedLimiter = new Ratelimit({
    redis: new Redis({ url, token }),
    limiter: Ratelimit.slidingWindow(MAX_PER_WINDOW, WINDOW),
    analytics: true,
    prefix: "mln:public-api",
  });
  return cachedLimiter;
}

export async function checkRateLimit(key: string): Promise<RateLimitResult> {
  const limiter = getLimiter();

  if (!limiter) {
    // Fail closed in production: without a durable limiter we cannot uphold
    // the documented quota, so refuse rather than silently allow.
    if (process.env.NODE_ENV === "production") {
      console.error(
        "[public-api] Upstash env vars are missing; rejecting requests.",
      );
      return { ok: false, reason: "unavailable" };
    }
    // Dev/test: allow through so local work isn't blocked.
    return {
      ok: true,
      limit: MAX_PER_WINDOW,
      remaining: MAX_PER_WINDOW,
      resetSeconds: 60,
    };
  }

  const result = await limiter.limit(key);
  const resetSeconds = Math.max(
    0,
    Math.ceil((result.reset - Date.now()) / 1000),
  );

  if (result.success) {
    return {
      ok: true,
      limit: result.limit,
      remaining: result.remaining,
      resetSeconds,
    };
  }
  return {
    ok: false,
    reason: "exceeded",
    limit: result.limit,
    remaining: result.remaining,
    resetSeconds,
  };
}
