import type { Metadata } from "next";
import { Star } from "lucide-react";
import { getMajorsByYear, getMajorYears, type MajorWinner } from "@/lib/pga-majors-data";

export const metadata: Metadata = {
  title: "Major Championships",
  description: "PGA major championship winners and history.",
  alternates: {
    canonical: "/pga/majors",
  },
};

const tournamentColors: Record<string, string> = {
  "Masters": "text-green-600 dark:text-green-400",
  "PGA Championship": "text-blue-600 dark:text-blue-400",
  "U.S. Open": "text-red-600 dark:text-red-400",
  "The Open Championship": "text-yellow-600 dark:text-yellow-400",
};

function MajorCard({ winner }: { winner: MajorWinner }) {
  return (
    <div className="flex items-center gap-3 p-3 rounded-lg bg-background/50 border">
      <div className="flex-1 min-w-0">
        <p className={`font-medium text-sm ${tournamentColors[winner.tournament] || ""}`}>
          {winner.tournament}
        </p>
        <p className="font-semibold">{winner.winner}</p>
        <p className="text-sm text-muted-foreground">
          {winner.country} · {winner.score}
        </p>
        <p className="text-xs text-muted-foreground">{winner.course}</p>
      </div>
    </div>
  );
}

export default function PGAMajorsPage() {
  const majorsByYear = getMajorsByYear();
  const years = getMajorYears();

  return (
    <div className="space-y-6">
      <div className="flex items-center gap-3">
        <Star className="h-8 w-8 text-primary" />
        <div>
          <h1 className="text-3xl font-bold">Major Championships</h1>
          <p className="text-muted-foreground">Masters, PGA Championship, U.S. Open, The Open Championship</p>
        </div>
      </div>

      <div className="space-y-8">
        {years.map((year) => {
          const winners = majorsByYear[year] || [];
          return (
            <div key={year} className="bg-muted/30 rounded-lg border p-4 sm:p-6">
              <h2 className="text-xl font-bold mb-4 text-primary">{year}</h2>
              <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-2">
                {winners.map((winner) => (
                  <MajorCard key={`${winner.year}-${winner.tournament}`} winner={winner} />
                ))}
              </div>
            </div>
          );
        })}
      </div>
    </div>
  );
}
