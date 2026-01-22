"use client";

import { Card, CardContent, CardHeader } from "@/components/ui/card";

interface Source {
  name: string;
  url: string;
  description: string;
}

const dataSources: Source[] = [
  {
    name: "Discogs",
    url: "https://www.discogs.com/",
    description: "Music database for discography, album details, and release information.",
  },
  {
    name: "GBVDB",
    url: "https://www.gbvdb.com/",
    description: "Comprehensive Guided By Voices database with detailed discography and artist information.",
  },
  {
    name: "MusicBrainz",
    url: "https://musicbrainz.org/",
    description: "Open music encyclopedia for metadata, release groups, and recordings.",
  },
  {
    name: "Cover Art Archive",
    url: "https://coverartarchive.org/",
    description: "Free and open archive for album cover artwork.",
  },
  {
    name: "Wikidata",
    url: "https://www.wikidata.org/",
    description: "Free knowledge base with structured data about artists and albums.",
  },
  {
    name: "Wikimedia Commons",
    url: "https://commons.wikimedia.org/",
    description: "Collection of freely usable media files including band member photos.",
  },
];

const editorialSources: Source[] = [
  {
    name: "Pitchfork",
    url: "https://pitchfork.com/",
    description: "Music reviews and lists including their acclaimed Top 100 Albums of the 1990s.",
  },
  {
    name: "Rolling Stone",
    url: "https://www.rollingstone.com/",
    description: "Music journalism and their 500 Greatest Albums list featuring Bee Thousand.",
  },
  {
    name: "NME",
    url: "https://www.nme.com/",
    description: "Music publication featuring GBV in their Greatest Indie Albums Ever list.",
  },
  {
    name: "Spin",
    url: "https://www.spin.com/",
    description: "Music magazine with their 100 Greatest Albums 1985-2005 list.",
  },
  {
    name: "AllMusic",
    url: "https://www.allmusic.com/",
    description: "Music database and reviews including their Essential Lo-Fi Albums collection.",
  },
];

export function GbvSourcesContent() {
  return (
    <div className="container py-6">
      <h1 className="font-league mb-6">Sources</h1>
      <p className="text-muted-foreground mb-8">
        Data and content for Guided By Data is compiled from the following sources.
      </p>

      <div className="grid gap-6 lg:grid-cols-2">
        <Card className="py-6">
          <CardHeader className="pb-4">
            <h2>Data Sources</h2>
            <p className="text-sm text-muted-foreground">
              APIs and databases used for discography and artist information.
            </p>
          </CardHeader>
          <CardContent>
            <ul className="space-y-4">
              {dataSources.map((source) => (
                <li key={source.name}>
                  <a
                    href={source.url}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="font-medium hover:underline underline-offset-4"
                  >
                    {source.name}
                  </a>
                  <p className="text-sm text-muted-foreground mt-1">
                    {source.description}
                  </p>
                </li>
              ))}
            </ul>
          </CardContent>
        </Card>

        <Card className="py-6">
          <CardHeader className="pb-4">
            <h2>Editorial Sources</h2>
            <p className="text-sm text-muted-foreground">
              Publications referenced for awards, reviews, and critical acclaim.
            </p>
          </CardHeader>
          <CardContent>
            <ul className="space-y-4">
              {editorialSources.map((source) => (
                <li key={source.name}>
                  <a
                    href={source.url}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="font-medium hover:underline underline-offset-4"
                  >
                    {source.name}
                  </a>
                  <p className="text-sm text-muted-foreground mt-1">
                    {source.description}
                  </p>
                </li>
              ))}
            </ul>
          </CardContent>
        </Card>
      </div>
    </div>
  );
}
