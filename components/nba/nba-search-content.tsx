"use client";

import { useState, useEffect } from "react";
import { useSearchParams } from "next/navigation";
import Link from "next/link";
import Image from "next/image";
import { Card, CardContent } from "@/components/ui/card";
import { Input } from "@/components/ui/input";
import { Button } from "@/components/ui/button";
import { Search, Loader2 } from "lucide-react";
import { searchNBA, getPlayerHeadshotUrl, getTeamLogoUrl } from "@/lib/nba-api";

export function NBASearchContent() {
  const searchParams = useSearchParams();
  const initialQuery = searchParams.get("q") || "";

  const [query, setQuery] = useState(initialQuery);
  const [results, setResults] = useState<{ players: any[]; teams: any[] } | null>(null);
  const [loading, setLoading] = useState(false);

  useEffect(() => {
    if (initialQuery) {
      handleSearch(initialQuery);
    }
  }, [initialQuery]);

  async function handleSearch(q: string) {
    if (!q.trim()) return;
    setLoading(true);
    try {
      const data = await searchNBA(q);
      setResults(data);
    } catch (error) {
      console.error("Search error:", error);
      setResults({ players: [], teams: [] });
    } finally {
      setLoading(false);
    }
  }

  function onSubmit(e: React.FormEvent) {
    e.preventDefault();
    handleSearch(query);
  }

  return (
    <div className="container py-6">
      <h1 className="font-league mb-6">Search</h1>

      <form onSubmit={onSubmit} className="flex gap-2 mb-6 max-w-md">
        <Input
          type="text"
          placeholder="Search players or teams..."
          value={query}
          onChange={(e) => setQuery(e.target.value)}
        />
        <Button type="submit" disabled={loading}>
          {loading ? <Loader2 className="h-4 w-4 animate-spin" /> : <Search className="h-4 w-4" />}
        </Button>
      </form>

      {results && (
        <div className="space-y-8">
          {results.teams.length > 0 && (
            <div>
              <h2 className="text-lg font-semibold mb-3">Teams</h2>
              <div className="grid gap-3 grid-cols-2 sm:grid-cols-3 md:grid-cols-4">
                {results.teams.map((team) => (
                  <Link key={team.id} href={`/nba/teams/${team.id}`}>
                    <Card className="hover:bg-muted/50 transition-colors">
                      <CardContent className="p-3 flex items-center gap-3">
                        <Image
                          src={team.logoUrl || getTeamLogoUrl(team.abbreviation)}
                          alt={team.displayName}
                          width={32}
                          height={32}
                          unoptimized
                        />
                        <span className="text-sm font-medium">{team.displayName}</span>
                      </CardContent>
                    </Card>
                  </Link>
                ))}
              </div>
            </div>
          )}

          {results.players.length > 0 && (
            <div>
              <h2 className="text-lg font-semibold mb-3">Players</h2>
              <div className="grid gap-3 grid-cols-1 sm:grid-cols-2 md:grid-cols-3">
                {results.players.map((player) => (
                  <Link key={player.id} href={`/nba/players/${player.id}`}>
                    <Card className="hover:bg-muted/50 transition-colors">
                      <CardContent className="p-3 flex items-center gap-3">
                        <Image
                          src={player.headshot || getPlayerHeadshotUrl(player.id)}
                          alt={player.name}
                          width={40}
                          height={40}
                          className="rounded-full bg-muted"
                          unoptimized
                        />
                        <div className="min-w-0">
                          <p className="text-sm font-medium truncate">{player.name}</p>
                          <p className="text-xs text-muted-foreground">
                            {player.teamAbbrev} · {player.position}
                          </p>
                        </div>
                      </CardContent>
                    </Card>
                  </Link>
                ))}
              </div>
            </div>
          )}

          {results.teams.length === 0 && results.players.length === 0 && (
            <p className="text-muted-foreground">No results found for "{query}"</p>
          )}
        </div>
      )}
    </div>
  );
}
