import { Suspense } from "react"
import { DashboardContent } from "@/components/dashboard-content"
import { getLeaders, getStandings, getDefaultSeason } from "@/lib/mlb-api"
import { getMVPWinnersStatic, getCyYoungWinnersStatic } from "@/lib/awards-data"
import { Skeleton } from "@/components/ui/skeleton"
import { AlertCircle } from "lucide-react"
import { Alert, AlertDescription, AlertTitle } from "@/components/ui/alert"

export const revalidate = 3600

async function getDashboardData(season: number) {
  try {
    const [hrLeaders, avgLeaders, eraLeaders, kLeaders, standings] = await Promise.all([
      getLeaders("hitting", "homeRuns", season, 10),
      getLeaders("hitting", "battingAverage", season, 10),
      getLeaders("pitching", "earnedRunAverage", season, 10),
      getLeaders("pitching", "strikeouts", season, 10),
      getStandings(season),
    ])

    const mvpWinners = getMVPWinnersStatic()
    const cyYoungWinners = getCyYoungWinnersStatic()

    return { hrLeaders, avgLeaders, eraLeaders, kLeaders, standings, mvpWinners, cyYoungWinners, error: null }
  } catch (error) {
    console.error("Error fetching dashboard data:", error)
    const mvpWinners = getMVPWinnersStatic()
    const cyYoungWinners = getCyYoungWinnersStatic()
    return {
      hrLeaders: [],
      avgLeaders: [],
      eraLeaders: [],
      kLeaders: [],
      standings: [],
      mvpWinners,
      cyYoungWinners,
      error: "MLB Stats API is temporarily unavailable. Please try again later.",
    }
  }
}

function DashboardSkeleton() {
  return (
    <main className="container py-8">
      <div className="mb-8">
        <Skeleton className="h-9 w-80 mb-2" />
        <Skeleton className="h-5 w-96" />
      </div>
      <div className="grid gap-4 md:grid-cols-2 lg:grid-cols-4 mb-8">
        {[...Array(4)].map((_, i) => (
          <Skeleton key={i} className="h-32" />
        ))}
      </div>
    </main>
  )
}

function APIErrorMessage({ message }: { message: string }) {
  return (
    <main className="container py-8">
      <Alert variant="destructive" className="mb-8">
        <AlertCircle className="h-4 w-4" />
        <AlertTitle>Data Unavailable</AlertTitle>
        <AlertDescription>{message}</AlertDescription>
      </Alert>
    </main>
  )
}

export default async function DashboardPage() {
  const defaultSeason = getDefaultSeason()
  const initialData = await getDashboardData(defaultSeason)

  if (initialData.error && initialData.hrLeaders.length === 0) {
    return <APIErrorMessage message={initialData.error} />
  }

  return (
    <Suspense fallback={<DashboardSkeleton />}>
      <DashboardContent initialData={initialData} initialSeason={defaultSeason} />
    </Suspense>
  )
}
