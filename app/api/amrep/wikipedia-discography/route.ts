import { NextResponse } from "next/server";
import { fetchAmrepWikipediaDiscography } from "@/lib/amrep-wikipedia-discography";

export const runtime = "nodejs";

export async function GET() {
  try {
    const data = await fetchAmrepWikipediaDiscography();
    return NextResponse.json(data, {
      headers: {
        "Cache-Control": "public, s-maxage=86400, stale-while-revalidate=604800",
      },
    });
  } catch (error) {
    const message = error instanceof Error ? error.message : "Unknown error";
    return NextResponse.json({ error: message }, { status: 500 });
  }
}
