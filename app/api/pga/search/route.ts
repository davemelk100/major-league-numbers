import { NextResponse } from "next/server"
import { searchPGA } from "@/lib/pga-api"

export async function GET(request: Request) {
  const { searchParams } = new URL(request.url)
  const query = searchParams.get("q") || ""

  if (query.length < 2) {
    return NextResponse.json({ players: [] })
  }

  try {
    const results = await searchPGA(query)
    return NextResponse.json(results)
  } catch (error) {
    console.error("Error searching PGA:", error)
    return NextResponse.json({ players: [] }, { status: 500 })
  }
}
