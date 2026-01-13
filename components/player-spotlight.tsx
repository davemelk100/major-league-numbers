"use client";

import { useState, useEffect } from "react";
import { User } from "lucide-react";
import {
  getDailyPlayer,
  type SpotlightPlayer,
} from "@/lib/player-spotlight-data";
import { getPlayerHeadshotUrl } from "@/lib/mlb-api";
import Image from "next/image";
import Link from "next/link";

export function PlayerSpotlight() {
  const [player, setPlayer] = useState<SpotlightPlayer | null>(null);
  const [imageError, setImageError] = useState(false);

  useEffect(() => {
    setPlayer(getDailyPlayer());
  }, []);

  if (!player) return null;

  return (
    <div className="w-full h-full bg-muted/30 rounded-lg border p-4 space-y-4">
      <div className="flex items-center gap-2">
        <h2 className="font-league text-3xl font-semibold mr-4 text-primary uppercase tracking-wider">
          Daily Random Player
        </h2>
      </div>
      <div className="flex gap-6 items-center">
        <Link
          href={`/players/${player.id}`}
          className="shrink-0 group relative overflow-hidden rounded-xl"
        >
          {!imageError ? (
            <Image
              src={
                getPlayerHeadshotUrl(player.id, "large") || "/placeholder.svg"
              }
              alt={player.name}
              width={300}
              height={300}
              style={{ width: "auto", height: "300px" }}
              className="rounded-xl transition-transform group-hover:scale-105"
              onError={() => setImageError(true)}
            />
          ) : (
            <div className="w-[300px] h-[300px] bg-muted flex items-center justify-center rounded-xl">
              <User className="h-24 w-24 text-muted-foreground" />
            </div>
          )}
        </Link>
        <div className="space-y-3 flex-1 min-w-0">
          <div>
            <Link
              href={`/players/${player.id}`}
              className="text-2xl font-bold hover:underline decoration-primary decoration-2 underline-offset-4 block"
            >
              {player.name}
            </Link>
            <div className="flex flex-wrap gap-x-2 text-base text-muted-foreground mt-1">
              <span>{player.position}</span>
              <span>•</span>
              <span>{player.years}</span>
              {player.birthplace && (
                <>
                  <span>•</span>
                  <span>{player.birthplace}</span>
                </>
              )}
            </div>
          </div>

          {player.careerStats && (
            <div className="text-sm font-medium text-foreground bg-muted/50 px-3 py-2 rounded-lg">
              {player.careerStats}
            </div>
          )}

          <p className="text-sm text-muted-foreground leading-relaxed">
            {player.fact}
          </p>

          {player.highlights && player.highlights.length > 0 && (
            <div className="space-y-1">
              <span className="text-xs font-semibold text-primary uppercase tracking-wider">
                Career Highlights
              </span>
              <ul className="text-sm text-muted-foreground space-y-0.5">
                {player.highlights.map((highlight, index) => (
                  <li key={index} className="flex items-start gap-2">
                    <span className="text-primary">•</span>
                    <span>{highlight}</span>
                  </li>
                ))}
              </ul>
            </div>
          )}
        </div>
      </div>
    </div>
  );
}
