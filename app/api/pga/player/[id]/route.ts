import { getPGAPlayer } from "@/lib/pga-api"
import { NextResponse } from "next/server"

export async function GET(
  _request: Request,
  { params }: { params: Promise<{ id: string }> }
) {
  const { id } = await params
  try {
    const player = await getPGAPlayer(id)
    return NextResponse.json(player)
  } catch (error) {
    console.error("Error fetching PGA player:", error)
    return NextResponse.json({ error: "Player not found" }, { status: 500 })
  }
}
