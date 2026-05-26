import { createHash, timingSafeEqual } from "node:crypto";

export type ApiKeyRecord = {
  id: string;
  hash: string;
};

function sha256(input: string): string {
  return createHash("sha256").update(input).digest("hex");
}

function loadAllowedKeys(): ApiKeyRecord[] {
  const raw = process.env.PUBLIC_API_KEYS?.trim();
  if (!raw) return [];

  return raw
    .split(",")
    .map((entry) => entry.trim())
    .filter(Boolean)
    .map((entry) => {
      const [id, hash] = entry.split(":");
      if (!id || !hash) {
        throw new Error(
          `PUBLIC_API_KEYS entry "${entry}" must be in "id:sha256hex" form`,
        );
      }
      return { id, hash: hash.toLowerCase() };
    });
}

export type AuthResult =
  | { ok: true; keyId: string }
  | { ok: false; status: 401 | 503; code: string; message: string };

export function authenticateApiKey(presented: string | null): AuthResult {
  if (!presented) {
    return {
      ok: false,
      status: 401,
      code: "missing_api_key",
      message: "Provide an API key via the Authorization: Bearer <key> header.",
    };
  }

  const allowed = loadAllowedKeys();
  if (allowed.length === 0) {
    return {
      ok: false,
      status: 503,
      code: "api_keys_not_configured",
      message: "PUBLIC_API_KEYS is not configured on the server.",
    };
  }

  const presentedHash = sha256(presented);
  const presentedBuf = Buffer.from(presentedHash, "hex");

  for (const record of allowed) {
    const recordBuf = Buffer.from(record.hash, "hex");
    if (
      recordBuf.length === presentedBuf.length &&
      timingSafeEqual(recordBuf, presentedBuf)
    ) {
      return { ok: true, keyId: record.id };
    }
  }

  return {
    ok: false,
    status: 401,
    code: "invalid_api_key",
    message: "The provided API key is not recognized.",
  };
}

export function extractBearerToken(authHeader: string | null): string | null {
  if (!authHeader) return null;
  const match = /^Bearer\s+(.+)$/i.exec(authHeader.trim());
  return match ? match[1].trim() : null;
}
