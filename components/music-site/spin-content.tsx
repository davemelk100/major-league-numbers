"use client";

import { useState } from "react";
import { Button } from "@/components/ui/button";
import { Play, Pause } from "lucide-react";
import { usePathname } from "next/navigation";
import { getMusicSiteFromPathname } from "@/lib/music-site";

// Zoetrope frames: 12 sequential frames of a bouncing ball
// Each frame has a different vertical offset to create the illusion of a bounce
const ZOETROPE_FRAMES = 12;
const ZOETROPE_RADIUS = 42; // % from center
const GREY_RING_RADIUS = 34; // % from center - inner ring
const bounceOffsets = Array.from({ length: ZOETROPE_FRAMES }, (_, i) => {
  const t = i / ZOETROPE_FRAMES;
  return Math.abs(Math.sin(t * Math.PI)) * 5;
});
// Grey ring: pulsing size effect - circles grow and shrink sequentially
const greySizes = Array.from({ length: ZOETROPE_FRAMES }, (_, i) => {
  const t = i / ZOETROPE_FRAMES;
  return 36 + Math.abs(Math.sin(t * Math.PI * 2)) * 34;
});

const grooves = Array.from({ length: 18 }, (_, i) => 20 + i * 3.4);

export function SpinContent() {
  const pathname = usePathname();
  const site = getMusicSiteFromPathname(pathname);
  const [isSpinning, setIsSpinning] = useState(true);
  const [speed, setSpeed] = useState<"33" | "45" | "78">("33");

  const isAmrep = site.id === "amrep";
  const isE6 = site.id === "e6";
  const spinClass = `animate-vinyl-spin-${speed}${isSpinning ? "" : " vinyl-paused"}`;

  const labelGradient = isE6
    ? "from-green-700 via-green-600 to-green-800"
    : isAmrep
      ? "from-amber-600 via-yellow-500 to-amber-700"
      : "from-red-700 via-red-600 to-red-800";
  const labelTextColor = isAmrep || isE6 ? "text-black" : "text-white";
  const labelSubTextColor = isAmrep || isE6 ? "text-black/60" : "text-white/70";
  const zoetropeColor = isE6 ? "#4c8c48" : isAmrep ? "#d4a017" : "#ef4444";

  return (
    <div className="container py-6">
      <h1 className="font-league mb-6">Spin</h1>

      <div className="flex flex-col items-center gap-8">
        <div className="relative">
          {/* Viewing slit overlay - stays fixed while disc spins */}
          <div className="absolute inset-0 z-30 pointer-events-none flex items-start justify-center">
            <div
              className="w-[2px] bg-white/40"
              style={{ height: "18%", marginTop: "1%" }}
            />
          </div>

          {/* Record */}
          <div
            className={`relative w-[320px] h-[320px] sm:w-[400px] sm:h-[400px] md:w-[500px] md:h-[500px] rounded-full shadow-2xl overflow-hidden ${spinClass}`}
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

            {/* Zoetrope animation frames - bouncing ball */}
            {bounceOffsets.map((offset, i) => {
              const angle = ((i / ZOETROPE_FRAMES) * 360 * Math.PI) / 180;
              const x = Math.round((50 + ZOETROPE_RADIUS * Math.sin(angle)) * 100) / 100;
              const y = Math.round((50 - ZOETROPE_RADIUS * Math.cos(angle) + offset) * 100) / 100;
              return (
                <div
                  key={`z-${i}`}
                  className="absolute rounded-full"
                  style={{
                    left: `${x}%`,
                    top: `${y}%`,
                    width: "40px",
                    height: "40px",
                    transform: "translate(-50%, -50%)",
                    backgroundColor: zoetropeColor,
                    boxShadow: `0 0 6px ${zoetropeColor}80`,
                  }}
                />
              );
            })}

            {/* Inner grey zoetrope ring - pulsing size */}
            {greySizes.map((size, i) => {
              const angle = ((i / ZOETROPE_FRAMES) * 360 * Math.PI) / 180;
              const x = Math.round((50 + GREY_RING_RADIUS * Math.sin(angle)) * 100) / 100;
              const y = Math.round((50 - GREY_RING_RADIUS * Math.cos(angle)) * 100) / 100;
              const s = Math.round(size * 100) / 100;
              return (
                <div
                  key={`zg-${i}`}
                  className="absolute rounded-full"
                  style={{
                    left: `${x}%`,
                    top: `${y}%`,
                    width: `${s}px`,
                    height: `${s}px`,
                    transform: "translate(-50%, -50%)",
                    backgroundColor: "#888",
                    boxShadow: "0 0 6px rgba(136,136,136,0.5)",
                  }}
                />
              );
            })}

            {/* Zoetrope slit marks between frames */}
            {Array.from({ length: ZOETROPE_FRAMES }, (_, i) => {
              const angle = (((i + 0.5) / ZOETROPE_FRAMES) * 360 * Math.PI) / 180;
              const innerR = 38;
              const outerR = 46;
              const x1 = Math.round((50 + innerR * Math.sin(angle)) * 100) / 100;
              const y1 = Math.round((50 - innerR * Math.cos(angle)) * 100) / 100;
              const x2 = Math.round((50 + outerR * Math.sin(angle)) * 100) / 100;
              const y2 = Math.round((50 - outerR * Math.cos(angle)) * 100) / 100;
              const dx = x2 - x1;
              const dy = y2 - y1;
              const len = Math.sqrt(dx * dx + dy * dy);
              const deg = Math.round((Math.atan2(dy, dx) * 180) / Math.PI * 100) / 100;
              return (
                <div
                  key={`s-${i}`}
                  className="absolute"
                  style={{
                    left: `${x1}%`,
                    top: `${y1}%`,
                    width: `${len}%`,
                    height: "1px",
                    transform: `rotate(${deg}deg)`,
                    transformOrigin: "0 0",
                    backgroundColor: "rgba(255,255,255,0.08)",
                  }}
                />
              );
            })}

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
            Watch the bouncing ball through the slit at the top.
            A zoetrope creates the illusion of motion by showing sequential
            frames through a narrow viewing slit as the disc spins.
          </p>
        </div>
      </div>
    </div>
  );
}
