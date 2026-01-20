"use client";

import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { Award, Star, Music, Trophy } from "lucide-react";

const criticalAcclaim = [
  {
    publication: "Pitchfork",
    accolade: "Bee Thousand rated 9.2/10",
    year: 1994,
  },
  {
    publication: "Rolling Stone",
    accolade: "Alien Lanes - 4 stars",
    year: 1995,
  },
  {
    publication: "NME",
    accolade: "Named one of the most important indie bands of the 90s",
    year: 1999,
  },
  {
    publication: "Spin",
    accolade: "Bee Thousand named one of the best albums of the 90s",
    year: 1999,
  },
  {
    publication: "Pitchfork",
    accolade: "Alien Lanes included in Top 100 Albums of the 1990s",
    year: 2003,
  },
];

const listAppearances = [
  "Rolling Stone's 500 Greatest Albums (Bee Thousand)",
  "Pitchfork's Top 100 Albums of the 1990s",
  "NME's Greatest Indie Albums Ever",
  "Spin's 100 Greatest Albums 1985-2005",
  "AllMusic's Essential Lo-Fi Albums",
];

const recognition = [
  {
    title: "Indie Rock Pioneers",
    description: "Credited with defining the lo-fi aesthetic in indie rock",
    icon: Star,
  },
  {
    title: "Prolific Output",
    description: "One of the most prolific bands in rock history with 30+ albums",
    icon: Music,
  },
  {
    title: "Critical Darlings",
    description: "Consistently praised by critics for songwriting excellence",
    icon: Award,
  },
  {
    title: "Cult Following",
    description: "Dedicated fanbase spanning four decades",
    icon: Trophy,
  },
];

export function GbvAwardsContent() {
  return (
    <main className="container py-6">
      <h1 className="font-league text-4xl font-semibold mb-6">Awards & Recognition</h1>

      {/* Recognition Cards */}
      <div className="grid gap-4 md:grid-cols-2 lg:grid-cols-4 mb-8">
        {recognition.map((item) => {
          const Icon = item.icon;
          return (
            <Card key={item.title}>
              <CardContent className="p-4 text-center">
                <div className="w-12 h-12 bg-primary/10 rounded-full mx-auto mb-3 flex items-center justify-center">
                  <Icon className="h-6 w-6 text-primary" />
                </div>
                <h3 className="font-semibold mb-1">{item.title}</h3>
                <p className="text-sm text-muted-foreground">{item.description}</p>
              </CardContent>
            </Card>
          );
        })}
      </div>

      <div className="grid gap-6 lg:grid-cols-2">
        {/* Critical Acclaim */}
        <Card>
          <CardHeader>
            <CardTitle>Critical Acclaim</CardTitle>
          </CardHeader>
          <CardContent>
            <div className="space-y-4">
              {criticalAcclaim.map((item, index) => (
                <div key={index} className="flex items-start justify-between border-b pb-3 last:border-0">
                  <div>
                    <p className="font-medium">{item.publication}</p>
                    <p className="text-sm text-muted-foreground">{item.accolade}</p>
                  </div>
                  <Badge variant="outline">{item.year}</Badge>
                </div>
              ))}
            </div>
          </CardContent>
        </Card>

        {/* List Appearances */}
        <Card>
          <CardHeader>
            <CardTitle>Best-Of List Appearances</CardTitle>
          </CardHeader>
          <CardContent>
            <ul className="space-y-3">
              {listAppearances.map((item, index) => (
                <li key={index} className="flex items-start gap-2">
                  <Trophy className="h-4 w-4 mt-1 text-yellow-500 flex-shrink-0" />
                  <span className="text-sm">{item}</span>
                </li>
              ))}
            </ul>
          </CardContent>
        </Card>
      </div>

      {/* Note */}
      <Card className="mt-6">
        <CardContent className="p-4">
          <p className="text-sm text-muted-foreground text-center">
            Note: Guided By Voices, while critically acclaimed, have received limited mainstream awards
            due to their independent status. Their recognition comes primarily from music critics,
            publications, and their dedicated cult following.
          </p>
        </CardContent>
      </Card>
    </main>
  );
}
