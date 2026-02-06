import type { Metadata } from "next";
import { Award } from "lucide-react";
import { getNBAHOFByYear, getNBAHOFYears, type NBAHOFInductee } from "@/lib/nba-hof-data";

export const metadata: Metadata = {
  title: "Basketball Hall of Fame",
  description: "Browse Naismith Memorial Basketball Hall of Fame inductees by year.",
  alternates: {
    canonical: "/nba/hof",
  },
};

function InducteeCard({ inductee }: { inductee: NBAHOFInductee }) {
  return (
    <div className="flex items-center gap-3 p-3 rounded-lg bg-background/50 border">
      <div className="flex-1 min-w-0">
        <p className="font-medium truncate">{inductee.name}</p>
        <p className="text-sm text-muted-foreground">
          {inductee.position || inductee.category}
          {inductee.teams && ` · ${inductee.teams}`}
        </p>
      </div>
    </div>
  );
}

export default function NBAHofPage() {
  const hofByYear = getNBAHOFByYear();
  const years = getNBAHOFYears();

  return (
    <div className="container py-6 space-y-6">
      <div className="flex items-center gap-3">
        <Award className="h-8 w-8 text-primary" />
        <div>
          <h1 className="font-league">Basketball Hall of Fame</h1>
          <p className="text-muted-foreground">Naismith Memorial Basketball Hall of Fame inductees</p>
        </div>
      </div>

      <div className="space-y-8">
        {years.map((year) => {
          const inductees = hofByYear[year] || [];
          // Separate players from coaches/contributors
          const players = inductees.filter((i) => i.category === "Player");
          const others = inductees.filter((i) => i.category !== "Player");

          return (
            <div key={year} className="bg-muted/30 rounded-lg border p-4 sm:p-6">
              <h2 className="text-xl font-bold mb-4 text-primary">{year}</h2>

              {players.length > 0 && (
                <div className="mb-4">
                  <h3 className="text-sm font-medium text-muted-foreground mb-2 uppercase tracking-wide">
                    Players ({players.length})
                  </h3>
                  <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-2">
                    {players.map((inductee) => (
                      <InducteeCard key={inductee.name} inductee={inductee} />
                    ))}
                  </div>
                </div>
              )}

              {others.length > 0 && (
                <div>
                  <h3 className="text-sm font-medium text-muted-foreground mb-2 uppercase tracking-wide">
                    Coaches & Contributors ({others.length})
                  </h3>
                  <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-2">
                    {others.map((inductee) => (
                      <InducteeCard key={inductee.name} inductee={inductee} />
                    ))}
                  </div>
                </div>
              )}
            </div>
          );
        })}
      </div>
    </div>
  );
}
