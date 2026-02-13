import type { Metadata } from "next";
import { Award } from "lucide-react";
import { getWGHOFByYear, getWGHOFYears, type WGHOFInductee } from "@/lib/pga-hof-data";

export const metadata: Metadata = {
  title: "World Golf Hall of Fame",
  description: "Browse World Golf Hall of Fame inductees by year.",
  alternates: {
    canonical: "/pga/hof",
  },
};

function InducteeCard({ inductee }: { inductee: WGHOFInductee }) {
  return (
    <div className="flex items-center gap-3 p-3 rounded-lg bg-background/50 border">
      <div className="flex-1 min-w-0">
        <p className="font-medium truncate">{inductee.name}</p>
        <p className="text-sm text-muted-foreground">
          {inductee.position} · {inductee.country}
        </p>
      </div>
    </div>
  );
}

export default function PGAHofPage() {
  const hofByYear = getWGHOFByYear();
  const years = getWGHOFYears();

  return (
    <div className="space-y-6">
      <div className="flex items-center gap-3">
        <Award className="h-8 w-8 text-primary" />
        <div>
          <h1 className="text-3xl font-bold">World Golf Hall of Fame</h1>
          <p className="text-muted-foreground">Inductees by year</p>
        </div>
      </div>

      <div className="space-y-8">
        {years.map((year) => {
          const inductees = hofByYear[year] || [];
          const players = inductees.filter((i) => i.position === "Player");
          const others = inductees.filter((i) => i.position !== "Player");

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
                    Contributors ({others.length})
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
