"use client";

import { Card, CardContent } from "@/components/ui/card";

interface Video {
  id: string;
  title: string;
  description?: string;
}

const videos: Video[] = [
  {
    id: "jUjLDvrLDhg",
    title: "Guided By Voices - I Am A Scientist",
    description: "Music video for 'I Am A Scientist' from Bee Thousand (1994).",
  },
  {
    id: "ScR7x0m4Kxo",
    title: "Guided By Voices - Motor Away",
    description: "Music video for 'Motor Away' from Alien Lanes (1995).",
  },
  {
    id: "XZsi9uEOJLg",
    title: "Guided By Voices - Game of Pricks",
    description: "Music video for 'Game of Pricks' from Alien Lanes (1995).",
  },
  {
    id: "JRMobFKG-a4",
    title: "Guided By Voices - Echos Myron",
    description: "Music video for 'Echos Myron' from Bee Thousand (1994).",
  },
];

export function GbvVideosContent() {
  return (
    <div className="container py-6">
      <h1 className="font-league text-2xl font-semibold mb-2">Videos</h1>
      <p className="text-muted-foreground mb-8">
        Music videos and live performances from Guided By Voices.
      </p>

      <div className="grid gap-6 md:grid-cols-2">
        {videos.map((video) => (
          <Card key={video.id} className="overflow-hidden">
            <div className="aspect-video">
              <iframe
                src={`https://www.youtube-nocookie.com/embed/${video.id}`}
                title={video.title}
                allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture; web-share"
                allowFullScreen
                className="w-full h-full border-0"
                loading="lazy"
              />
            </div>
            <CardContent className="p-4">
              <h2 className="font-semibold">{video.title}</h2>
              {video.description && (
                <p className="text-sm text-muted-foreground mt-1">
                  {video.description}
                </p>
              )}
            </CardContent>
          </Card>
        ))}
      </div>
    </div>
  );
}
