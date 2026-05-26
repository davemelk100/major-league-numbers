import { NextResponse } from "next/server";
import { z } from "zod";
import { withPublicApi } from "@/lib/api/with-public-api";
import { getAllPlayers, getDefaultSeason } from "@/lib/mlb-api";

const querySchema = z.object({
  season: z.coerce.number().int().min(1900).max(2100).optional(),
});

export const GET = withPublicApi(
  async ({ request }) => {
    const parsed = querySchema.safeParse(
      Object.fromEntries(request.nextUrl.searchParams),
    );
    if (!parsed.success) {
      return NextResponse.json(
        {
          error: {
            code: "invalid_query",
            message: parsed.error.issues[0]?.message ?? "Invalid query.",
          },
        },
        { status: 400 },
      );
    }

    const season = parsed.data.season ?? getDefaultSeason();
    const players = await getAllPlayers(season);

    return NextResponse.json({ season, players });
  },
  { cache: 300 },
);

export const OPTIONS = GET;
