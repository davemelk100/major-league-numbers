"use client";

import { useState } from "react";
import { Button } from "@/components/ui/button";
import { Play, Pause } from "lucide-react";
import { usePathname } from "next/navigation";
import { getMusicSiteFromPathname } from "@/lib/music-site";

const decorativeRings = [
  { radius: 44, count: 20, dotSize: 3 },
  { radius: 40, count: 16, dotSize: 4 },
  { radius: 36, count: 14, dotSize: 3 },
  { radius: 32, count: 12, dotSize: 5 },
  { radius: 28, count: 10, dotSize: 3 },
  { radius: 24, count: 8, dotSize: 4 },
];

const grooves = Array.from({ length: 18 }, (_, i) => 20 + i * 3.4);

export function SpinContent() {
  const pathname = usePathname();
  const site = getMusicSiteFromPathname(pathname);
  const [isSpinning, setIsSpinning] = useState(true);
  const [speed, setSpeed] = useState<"33" | "45" | "78">("33");

  const getDuration = () => {
    switch (speed) {
      case "33":
        return 60 / 33.33;
      case "45":
        return 60 / 45;
      case "78":
        return 60 / 78;
    }
  };

  const isAmrep = site.id === "amrep";

  const labelGradient = isAmrep
    ? "from-amber-600 via-yellow-500 to-amber-700"
    : "from-red-700 via-red-600 to-red-800";
  const labelTextColor = isAmrep ? "text-black" : "text-white";
  const labelSubTextColor = isAmrep ? "text-black/60" : "text-white/70";

  return (
    <div className="container py-6">
      <h1 className="font-league mb-6">Spin</h1>

      <div className="flex flex-col items-center gap-8">
        <div className="relative">
          {/* Record */}
          <div
            className="relative w-[320px] h-[320px] sm:w-[400px] sm:h-[400px] md:w-[500px] md:h-[500px] rounded-full shadow-2xl overflow-hidden"
            style={{
              animation: `record-spin ${getDuration()}s linear infinite`,
              animationPlayState: isSpinning ? "running" : "paused",
            }}
          >
            {/* Vinyl surface */}
            <div className="absolute inset-0 rounded-full bg-zinc-950" />

            {/* Groove rings */}
            {grooves.map((size, i) => (
              <div
                key={`g-${i}`}
                className="absolute rounded-full"
                style={{
                  inset: `${(100 - size) / 2}%`,
                  border: `1px solid rgba(255, 255, 255, ${0.03 + (i % 3) * 0.02})`,
                }}
              />
            ))}

            {/* Decorative dot rings */}
            {decorativeRings.map((ring, ri) =>
              Array.from({ length: ring.count }, (_, i) => {
                const angle = ((i / ring.count) * 360 * Math.PI) / 180;
                const x = 50 + ring.radius * Math.sin(angle);
                const y = 50 - ring.radius * Math.cos(angle);
                const hue = isAmrep
                  ? 30 + ri * 8
                  : 240 + ri * 20;
                return (
                  <div
                    key={`d-${ri}-${i}`}
                    className="absolute rounded-full"
                    style={{
                      left: `${x}%`,
                      top: `${y}%`,
                      width: ring.dotSize,
                      height: ring.dotSize,
                      transform: "translate(-50%, -50%)",
                      backgroundColor: `hsl(${hue}, 30%, ${40 + (i % 3) * 8}%)`,
                      opacity: 0.6,
                    }}
                  />
                );
              })
            )}

            {/* Label */}
            <div
              className={`absolute inset-[35%] rounded-full bg-gradient-to-br ${labelGradient} flex items-center justify-center z-10`}
            >
              <div className="text-center">
                <div
                  className={`${labelTextColor} font-bold text-xs sm:text-sm md:text-base`}
                >
                  {site.shortName.toUpperCase()}
                </div>
                <div
                  className={`${labelSubTextColor} text-[8px] sm:text-[10px] md:text-xs`}
                >
                  {speed} RPM
                </div>
              </div>
            </div>

            {/* Center Hole */}
            <div className="absolute left-1/2 top-1/2 -translate-x-1/2 -translate-y-1/2 w-3 h-3 sm:w-4 sm:h-4 rounded-full bg-zinc-950 z-20 border border-zinc-700" />
          </div>

          {/* Shine effect */}
          <div className="absolute inset-0 rounded-full bg-gradient-to-tr from-transparent via-white/5 to-transparent pointer-events-none z-40" />
        </div>

        {/* Controls */}
        <div className="flex flex-col items-center gap-4">
          <Button
            variant="outline"
            size="lg"
            onClick={() => setIsSpinning(!isSpinning)}
            className="gap-2"
          >
            {isSpinning ? (
              <>
                <Pause className="h-4 w-4" /> Stop
              </>
            ) : (
              <>
                <Play className="h-4 w-4" /> Play
              </>
            )}
          </Button>

          <div className="flex gap-2">
            {(["33", "45", "78"] as const).map((rpm) => (
              <Button
                key={rpm}
                variant={speed === rpm ? "default" : "outline"}
                size="sm"
                onClick={() => setSpeed(rpm)}
              >
                {rpm} RPM
              </Button>
            ))}
          </div>

          <p className="text-sm text-muted-foreground text-center max-w-md">
            A zoetrope creates the illusion of motion by showing sequential
            animation frames through narrow slits as the disc spins.
          </p>
        </div>
      </div>
    </div>
  );
}
