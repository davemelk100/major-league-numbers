"use client"

import { useState, useEffect } from "react"
import Link from "next/link"
import Image from "next/image"
import dynamic from "next/dynamic"
import { ArrowLeft, Loader2, AlertCircle } from "lucide-react"
import { getTeamLogoUrl, getDefaultSeason, type TeamPostseasonHistory } from "@/lib/mlb-api"
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs"
import { SeasonSelector } from "@/components/season-selector"
import { Skeleton } from "@/components/ui/skeleton"

const RosterTable = dynamic(
  () =>
    import("@/components/roster-table").then((mod) => ({
      default: mod.RosterTable,
    })),
  {
    loading: () => <Skeleton className="h-64 w-full" />,
    ssr: false,
  },
)

const HistoricalChart = dynamic(
  () =>
    import("@/components/historical-chart").then((mod) => ({
      default: mod.HistoricalChart,
    })),
  {
    loading: () => <Skeleton className="h-80 w-full" />,
    ssr: false,
  },
)

const HistoricalTable = dynamic(
  () =>
    import("@/components/historical-table").then((mod) => ({
      default: mod.HistoricalTable,
    })),
  {
    loading: () => <Skeleton className="h-96 w-full" />,
    ssr: false,
  },
)

const TeamLogos = dynamic(
  () =>
    import("@/components/team-logos").then((mod) => ({
      default: mod.TeamLogos,
    })),
  {
    loading: () => <Skeleton className="h-48 w-full" />,
  },
)

interface TeamPageContentProps {
  teamId: number
  initialData: {
    team: any
    roster: any[]
    teamRecord: any
  }
}

export function TeamPageContent({ teamId, initialData }: TeamPageContentProps) {
  const defaultSeason = getDefaultSeason()
  const [season, setSeason] = useState(defaultSeason)
  const [team, setTeam] = useState(initialData?.team || null)
  const [roster, setRoster] = useState(initialData?.roster || [])
  const [teamRecord, setTeamRecord] = useState(initialData?.teamRecord || null)
  const [history, setHistory] = useState<any[]>([])
  const [postseasonHistory, setPostseasonHistory] = useState<TeamPostseasonHistory | null>(null)
  const [historyLoaded, setHistoryLoaded] = useState(false)
  const [historyLoading, setHistoryLoading] = useState(false)
  const [loading, setLoading] = useState(false)
  const [error, setError] = useState<string | null>(null)
  const [activeTab, setActiveTab] = useState("roster")

  // Fetch postseason history on mount (for stats cards)
  useEffect(() => {
    console.log("Fetching postseason history for team:", teamId)
    fetch(`/api/team/${teamId}/history`)
      .then((res) => {
        console.log("Postseason API response status:", res.status)
        return res.json()
      })
      .then((data) => {
        console.log("Postseason data received:", data.postseasonHistory)
        setPostseasonHistory(data.postseasonHistory || null)
      })
      .catch((err) => {
        console.error("Error fetching postseason history:", err)
      })
  }, [teamId])

  // Fetch full history when History tab is opened
  useEffect(() => {
    if (activeTab === "history" && !historyLoaded && !historyLoading) {
      setHistoryLoading(true)
      fetch(`/api/team/${teamId}/history`)
        .then((res) => res.json())
        .then((data) => {
          setHistory(data.history || [])
          setPostseasonHistory(data.postseasonHistory || null)
          setHistoryLoaded(true)
        })
        .catch((err) => {
          console.error("Error fetching history:", err)
        })
        .finally(() => {
          setHistoryLoading(false)
        })
    }
  }, [activeTab, teamId, historyLoaded, historyLoading])

  useEffect(() => {
    if (season === defaultSeason) {
      setTeam(initialData?.team || null)
      setRoster(initialData?.roster || [])
      setTeamRecord(initialData?.teamRecord || null)
      setError(null)
      return
    }

    const fetchData = async () => {
      setLoading(true)
      setError(null)
      try {
        const res = await fetch(`/api/team/${teamId}?season=${season}`)
        if (!res.ok) {
          throw new Error(`Failed to fetch: ${res.status}`)
        }
        const data = await res.json()
        setTeam(data.team || null)
        setRoster(data.roster || [])
        setTeamRecord(data.teamRecord || null)
      } catch (err) {
        console.error("Error fetching team data:", err)
        setError("Failed to load team data. Please try again.")
      } finally {
        setLoading(false)
      }
    }

    fetchData()
  }, [season, teamId, defaultSeason, initialData])

  if (!team) {
    return (
      <main className="container py-2">
        <Link
          href="/teams"
          className="inline-flex items-center gap-2 text-sm text-muted-foreground hover:text-foreground mb-6 transition-colors"
        >
          <ArrowLeft className="h-4 w-4" />
          Back to Teams
        </Link>
        <Card>
          <CardContent className="py-12 flex flex-col items-center gap-4">
            <AlertCircle className="h-12 w-12 text-muted-foreground" />
            <p className="text-muted-foreground text-center">
              {error || "Unable to load team data. The API may be temporarily unavailable."}
            </p>
          </CardContent>
        </Card>
      </main>
    )
  }

  const pitchers = roster.filter((p) => p.primaryPosition?.type === "Pitcher")
  const catchers = roster.filter((p) => p.primaryPosition?.abbreviation === "C")
  const infielders = roster.filter((p) => ["1B", "2B", "3B", "SS"].includes(p.primaryPosition?.abbreviation || ""))
  const outfielders = roster.filter((p) => ["LF", "CF", "RF", "OF"].includes(p.primaryPosition?.abbreviation || ""))
  const dh = roster.filter((p) => p.primaryPosition?.abbreviation === "DH")

  return (
    <main className="container py-2">
      <Link
        href="/teams"
        className="inline-flex items-center gap-2 text-sm text-muted-foreground hover:text-foreground mb-6 transition-colors"
      >
        <ArrowLeft className="h-4 w-4" />
        Back to Teams
      </Link>

      {error && (
        <Card className="mb-6 border-destructive">
          <CardContent className="py-4 flex items-center gap-2 text-destructive">
            <AlertCircle className="h-4 w-4" />
            {error}
          </CardContent>
        </Card>
      )}

      <div className="flex flex-col md:flex-row gap-6 mb-4">
        <div className="relative h-24 w-24 shrink-0">
          <Image
            src={getTeamLogoUrl(team.id) || "/placeholder.svg"}
            alt={`${team.name} logo`}
            fill
            className="object-contain"
            priority
          />
        </div>
        <div className="flex-1">
          <div className="mb-4 flex items-center gap-4">
            <h1 className="mb-0 shrink-0 whitespace-nowrap">{team.name}</h1>
            <SeasonSelector season={season} onSeasonChange={setSeason} />
            {loading && <Loader2 className="h-4 w-4 animate-spin text-muted-foreground" />}
          </div>
          <p className="text-muted-foreground mt-1">
            {team.league?.name} &middot; {team.division?.name}
          </p>
          <p className="text-sm text-muted-foreground mt-1">{team.locationName}</p>
        </div>
      </div>

      <div className="grid grid-cols-2 sm:grid-cols-4 gap-4 mb-4">
        {teamRecord ? (
          <>
            <Card>
              <CardHeader className="pb-2">
                <CardTitle className="text-sm font-medium text-muted-foreground">Record</CardTitle>
              </CardHeader>
              <CardContent>
                <p className="text-2xl font-bold">
                  {teamRecord.wins}-{teamRecord.losses}
                </p>
              </CardContent>
            </Card>
            <Card>
              <CardHeader className="pb-2">
                <CardTitle className="text-sm font-medium text-muted-foreground">Win %</CardTitle>
              </CardHeader>
              <CardContent>
                <p className="text-2xl font-bold">{teamRecord.winningPercentage}</p>
              </CardContent>
            </Card>
            <Card>
              <CardHeader className="pb-2">
                <CardTitle className="text-sm font-medium text-muted-foreground">Games Back</CardTitle>
              </CardHeader>
              <CardContent>
                <p className="text-2xl font-bold">{teamRecord.gamesBack || "-"}</p>
              </CardContent>
            </Card>
            <Card>
              <CardHeader className="pb-2">
                <CardTitle className="text-sm font-medium text-muted-foreground">Run Diff</CardTitle>
              </CardHeader>
              <CardContent>
                <p
                  className={`text-2xl font-bold ${teamRecord.runDifferential > 0
                      ? "text-green-500"
                      : teamRecord.runDifferential < 0
                        ? "text-red-500"
                        : ""
                    }`}
                >
                  {teamRecord.runDifferential > 0 ? "+" : ""}
                  {teamRecord.runDifferential}
                </p>
              </CardContent>
            </Card>
          </>
        ) : (
          <Card className="col-span-2 sm:col-span-4">
            <CardContent className="py-6 text-center text-muted-foreground">
              No standings data available for {season}
            </CardContent>
          </Card>
        )}
      </div>

      {/* Postseason History Stats */}
      <div className="grid grid-cols-2 sm:grid-cols-4 gap-4 mb-8">
        <Card>
          <CardHeader className="pb-2">
            <CardTitle className="text-sm font-medium text-muted-foreground">World Series</CardTitle>
          </CardHeader>
          <CardContent>
            <p className="text-2xl font-bold">
              {postseasonHistory ? postseasonHistory.worldSeriesWins : "-"}
            </p>
            {postseasonHistory && postseasonHistory.worldSeriesAppearances > 0 && (
              <p className="text-xs text-muted-foreground">
                {postseasonHistory.worldSeriesAppearances} appearance{postseasonHistory.worldSeriesAppearances !== 1 ? "s" : ""}
              </p>
            )}
          </CardContent>
        </Card>
        <Card>
          <CardHeader className="pb-2">
            <CardTitle className="text-sm font-medium text-muted-foreground">Pennants</CardTitle>
          </CardHeader>
          <CardContent>
            <p className="text-2xl font-bold">
              {postseasonHistory ? postseasonHistory.pennants : "-"}
            </p>
            <p className="text-xs text-muted-foreground">League titles</p>
          </CardContent>
        </Card>
        <Card>
          <CardHeader className="pb-2">
            <CardTitle className="text-sm font-medium text-muted-foreground">Playoff Apps</CardTitle>
          </CardHeader>
          <CardContent>
            <p className="text-2xl font-bold">
              {postseasonHistory ? postseasonHistory.playoffAppearances : "-"}
            </p>
            <p className="text-xs text-muted-foreground">Since 1995</p>
          </CardContent>
        </Card>
        <Card>
          <CardHeader className="pb-2">
            <CardTitle className="text-sm font-medium text-muted-foreground">Last Title</CardTitle>
          </CardHeader>
          <CardContent>
            <p className="text-2xl font-bold">
              {postseasonHistory?.appearances?.find(a => a.round === "World Series" && a.won)?.season || "-"}
            </p>
          </CardContent>
        </Card>
      </div>

      <Tabs defaultValue="roster" className="space-y-6" onValueChange={setActiveTab}>
        <TabsList>
          <TabsTrigger value="roster">{season} Roster</TabsTrigger>
          <TabsTrigger value="history">Historical Data (1960-Present)</TabsTrigger>
          <TabsTrigger value="logos">Logos</TabsTrigger>
        </TabsList>

        <TabsContent value="roster" className="space-y-8">
          <h2 className="font-league text-4xl font-bold">{season} Roster</h2>
          {roster.length > 0 ? (
            <div className="grid grid-cols-1 lg:grid-cols-2 gap-8">
              <RosterTable players={pitchers} title="Pitchers" />
              <div className="space-y-8">
                <RosterTable players={catchers} title="Catchers" />
                <RosterTable players={infielders} title="Infielders" />
                <RosterTable players={outfielders} title="Outfielders" />
                {dh.length > 0 && <RosterTable players={dh} title="Designated Hitters" />}
              </div>
            </div>
          ) : (
            <Card>
              <CardContent className="py-12 text-center text-muted-foreground">
                No roster data available for {season}
              </CardContent>
            </Card>
          )}
        </TabsContent>

        <TabsContent value="history" className="space-y-6">
          {historyLoading ? (
            <div className="space-y-6">
              <Skeleton className="h-80 w-full" />
              <Skeleton className="h-96 w-full" />
            </div>
          ) : history.length > 0 ? (
            <>
              <HistoricalChart data={history} teamName={team.name} />

              {/* Postseason Appearances */}
              {postseasonHistory && postseasonHistory.appearances.length > 0 && (
                <div className="space-y-4">
                  <h2 className="font-league text-4xl font-bold">Postseason History</h2>
                  <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
                    {postseasonHistory.appearances.map((appearance, idx) => (
                      <Card key={`${appearance.season}-${appearance.round}-${idx}`} className={appearance.won ? "border-green-500/50" : ""}>
                        <CardContent className="py-4">
                          <div className="flex justify-between items-start">
                            <div>
                              <p className="font-bold text-lg">{appearance.season}</p>
                              <p className="text-sm text-muted-foreground">{appearance.round}</p>
                            </div>
                            <div className="text-right">
                              <p className={`font-bold ${appearance.won ? "text-green-500" : "text-red-500"}`}>
                                {appearance.won ? "Won" : "Lost"} {appearance.result}
                              </p>
                              <p className="text-xs text-muted-foreground">vs {appearance.opponent}</p>
                            </div>
                          </div>
                        </CardContent>
                      </Card>
                    ))}
                  </div>
                </div>
              )}

              <HistoricalTable data={history} />
            </>
          ) : (
            <Card>
              <CardContent className="py-12 text-center text-muted-foreground">
                {historyLoaded ? "No historical data available for this team." : "Loading historical data..."}
              </CardContent>
            </Card>
          )}
        </TabsContent>

        <TabsContent value="logos">
          <TeamLogos teamId={team.id} teamName={team.name} />
        </TabsContent>
      </Tabs>
    </main>
  )
}
