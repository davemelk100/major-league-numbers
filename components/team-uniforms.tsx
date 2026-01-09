"use client"

import { useState, useEffect } from "react"
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { Loader2, Shirt } from "lucide-react"

interface TeamUniformsProps {
  teamId: number
  teamName: string
  season: number
}

interface UniformData {
  gamePk: number
  gameDate: string
  homeTeam: {
    id: number
    name: string
  }
  awayTeam: {
    id: number
    name: string
  }
  uniforms?: {
    homeTeam?: {
      uniform?: {
        jersey: string
        pants: string
        helmet: string
        cap: string
      }
    }
    awayTeam?: {
      uniform?: {
        jersey: string
        pants: string
        helmet: string
        cap: string
      }
    }
  }
}

export function TeamUniforms({ teamId, teamName, season }: TeamUniformsProps) {
  const [uniforms, setUniforms] = useState<UniformData[]>([])
  const [loading, setLoading] = useState(true)
  const [error, setError] = useState<string | null>(null)

  useEffect(() => {
    const fetchUniforms = async () => {
      setLoading(true)
      setError(null)
      try {
        const res = await fetch(`/api/uniforms?teamId=${teamId}&season=${season}`)
        if (!res.ok) throw new Error("Failed to fetch")
        const data = await res.json()
        setUniforms(data.uniforms || [])
      } catch (err) {
        setError("Unable to load uniform data")
      } finally {
        setLoading(false)
      }
    }

    fetchUniforms()
  }, [teamId, season])

  if (loading) {
    return (
      <div className="flex items-center justify-center py-12">
        <Loader2 className="h-8 w-8 animate-spin text-muted-foreground" />
      </div>
    )
  }

  if (error) {
    return (
      <Card>
        <CardContent className="py-12 text-center text-muted-foreground">{error}</CardContent>
      </Card>
    )
  }

  if (uniforms.length === 0) {
    return (
      <Card>
        <CardContent className="py-12 text-center text-muted-foreground">
          No uniform data available for recent games.
        </CardContent>
      </Card>
    )
  }

  return (
    <div className="space-y-4">
      <p className="text-sm text-muted-foreground">Uniform data from recent {teamName} games</p>
      <div className="grid gap-4 md:grid-cols-2 lg:grid-cols-3">
        {uniforms.map((game) => {
          const isHome = game.homeTeam?.id === teamId
          const teamUniform = isHome ? game.uniforms?.homeTeam?.uniform : game.uniforms?.awayTeam?.uniform
          const opponent = isHome ? game.awayTeam : game.homeTeam

          return (
            <Card key={game.gamePk}>
              <CardHeader className="pb-2">
                <CardTitle className="text-sm font-medium flex items-center gap-2">
                  <Shirt className="h-4 w-4" />
                  {isHome ? "vs" : "@"} {opponent?.name}
                </CardTitle>
                <p className="text-xs text-muted-foreground">
                  {new Date(game.gameDate).toLocaleDateString("en-US", {
                    month: "short",
                    day: "numeric",
                    year: "numeric",
                  })}
                </p>
              </CardHeader>
              <CardContent>
                {teamUniform ? (
                  <div className="grid grid-cols-2 gap-2 text-sm">
                    <div>
                      <span className="text-muted-foreground">Jersey:</span>
                    </div>
                    <div className="font-medium">{teamUniform.jersey || "N/A"}</div>
                    <div>
                      <span className="text-muted-foreground">Pants:</span>
                    </div>
                    <div className="font-medium">{teamUniform.pants || "N/A"}</div>
                    <div>
                      <span className="text-muted-foreground">Cap:</span>
                    </div>
                    <div className="font-medium">{teamUniform.cap || "N/A"}</div>
                    <div>
                      <span className="text-muted-foreground">Helmet:</span>
                    </div>
                    <div className="font-medium">{teamUniform.helmet || "N/A"}</div>
                  </div>
                ) : (
                  <p className="text-sm text-muted-foreground">No uniform data available</p>
                )}
              </CardContent>
            </Card>
          )
        })}
      </div>
    </div>
  )
}
