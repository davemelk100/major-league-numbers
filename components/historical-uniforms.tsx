"use client";

import { useState } from "react";
import Image from "next/image";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { Badge } from "@/components/ui/badge";
import { Shirt, ImageOff } from "lucide-react";
import {
  getTeamUniforms,
  getUniformImagePath,
  hasUniformData,
  TEAM_ABBREV,
} from "@/lib/team-uniforms-data";

interface HistoricalUniformsProps {
  teamId: number;
  teamName: string;
}

const UNIFORM_TYPE_COLORS: Record<string, string> = {
  home: "bg-white text-black border",
  away: "bg-gray-500 text-white",
  alternate: "bg-blue-500 text-white",
  "city-connect": "bg-gradient-to-r from-purple-500 to-pink-500 text-white",
  throwback: "bg-amber-600 text-white",
};

export function HistoricalUniforms({ teamId, teamName }: HistoricalUniformsProps) {
  const uniformData = getTeamUniforms(teamId);
  const abbreviation = TEAM_ABBREV[teamId];
  const [imageErrors, setImageErrors] = useState<Set<string>>(new Set());

  if (!uniformData || !hasUniformData(teamId)) {
    return (
      <Card>
        <CardHeader>
          <CardTitle className="flex items-center gap-2">
            <Shirt className="h-5 w-5" />
            Historical Uniforms
          </CardTitle>
        </CardHeader>
        <CardContent className="py-8 text-center text-muted-foreground">
          <p>Historical uniform data for {teamName} is coming soon.</p>
          <p className="text-sm mt-2">
            We&apos;re building a collection of uniform images across different eras.
          </p>
        </CardContent>
      </Card>
    );
  }

  const handleImageError = (imageKey: string) => {
    setImageErrors((prev) => new Set(prev).add(imageKey));
  };

  return (
    <Card>
      <CardHeader>
        <CardTitle className="flex items-center gap-2">
          <Shirt className="h-5 w-5" />
          Historical Uniforms
        </CardTitle>
      </CardHeader>
      <CardContent>
        {uniformData.eras.length === 1 ? (
          // Single era - no tabs needed
          <div className="space-y-4">
            <div className="flex items-center gap-2 mb-4">
              <h3 className="font-semibold">{uniformData.eras[0].years}</h3>
            </div>
            <div className="grid grid-cols-2 sm:grid-cols-3 lg:grid-cols-4 gap-4">
              {uniformData.eras[0].uniforms.map((uniform) => {
                const imageKey = `${uniformData.eras[0].era}-${uniform.image}`;
                const imagePath = getUniformImagePath(abbreviation, uniform.image);
                const hasError = imageErrors.has(imageKey);

                return (
                  <div key={imageKey} className="flex flex-col gap-2">
                    <div className="relative aspect-[3/4] bg-muted rounded-lg overflow-hidden">
                      {hasError ? (
                        <div className="absolute inset-0 flex flex-col items-center justify-center text-muted-foreground">
                          <ImageOff className="h-8 w-8 mb-2" />
                          <span className="text-xs">Image coming soon</span>
                        </div>
                      ) : (
                        <Image
                          src={imagePath}
                          alt={`${teamName} ${uniform.label}`}
                          fill
                          className="object-contain p-2"
                          onError={() => handleImageError(imageKey)}
                        />
                      )}
                    </div>
                    <div className="space-y-1">
                      <div className="flex items-center gap-2">
                        <Badge
                          className={`text-xs ${UNIFORM_TYPE_COLORS[uniform.type] || "bg-gray-200"}`}
                        >
                          {uniform.type.replace("-", " ")}
                        </Badge>
                      </div>
                      <p className="text-sm font-medium">{uniform.label}</p>
                      {uniform.description && (
                        <p className="text-xs text-muted-foreground">{uniform.description}</p>
                      )}
                    </div>
                  </div>
                );
              })}
            </div>
          </div>
        ) : (
          // Multiple eras - use tabs
          <Tabs defaultValue={uniformData.eras[0].era} className="w-full">
            <TabsList className="mb-4">
              {uniformData.eras.map((era) => (
                <TabsTrigger key={era.era} value={era.era}>
                  {era.years}
                </TabsTrigger>
              ))}
            </TabsList>

            {uniformData.eras.map((era) => (
              <TabsContent key={era.era} value={era.era}>
                <div className="grid grid-cols-2 sm:grid-cols-3 lg:grid-cols-4 gap-4">
                  {era.uniforms.map((uniform) => {
                    const imageKey = `${era.era}-${uniform.image}`;
                    const imagePath = getUniformImagePath(abbreviation, uniform.image);
                    const hasError = imageErrors.has(imageKey);

                    return (
                      <div key={imageKey} className="flex flex-col gap-2">
                        <div className="relative aspect-[3/4] bg-muted rounded-lg overflow-hidden">
                          {hasError ? (
                            <div className="absolute inset-0 flex flex-col items-center justify-center text-muted-foreground">
                              <ImageOff className="h-8 w-8 mb-2" />
                              <span className="text-xs">Image coming soon</span>
                            </div>
                          ) : (
                            <Image
                              src={imagePath}
                              alt={`${teamName} ${uniform.label}`}
                              fill
                              className="object-contain p-2"
                              onError={() => handleImageError(imageKey)}
                            />
                          )}
                        </div>
                        <div className="space-y-1">
                          <div className="flex items-center gap-2">
                            <Badge
                              className={`text-xs ${UNIFORM_TYPE_COLORS[uniform.type] || "bg-gray-200"}`}
                            >
                              {uniform.type.replace("-", " ")}
                            </Badge>
                          </div>
                          <p className="text-sm font-medium">{uniform.label}</p>
                          {uniform.description && (
                            <p className="text-xs text-muted-foreground">{uniform.description}</p>
                          )}
                        </div>
                      </div>
                    );
                  })}
                </div>
              </TabsContent>
            ))}
          </Tabs>
        )}
      </CardContent>
    </Card>
  );
}
