"use client";

import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { usePathname } from "next/navigation";
import { getMusicSiteFromPathname } from "@/lib/music-site";
import { getSiteSideProjects } from "@/lib/site-data-registry";

export function SiteSideProjectsContent() {
  const pathname = usePathname();
  const site = getMusicSiteFromPathname(pathname);
  const data = getSiteSideProjects(site.id);
  const title = site.navLabels.sideProjects;

  if (data.length === 0) {
    return (
      <div className="container py-6">
        <h1 className="font-league mb-4">{title}</h1>
        <p className="text-muted-foreground">No data available yet.</p>
      </div>
    );
  }

  return (
    <div className="container py-6">
      <div className="mb-6">
        <h1 className="font-league">{title}</h1>
      </div>

      <div className="grid gap-6 lg:grid-cols-2">
        {data.map((project) => (
          <Card key={project.name}>
            <CardHeader className="pt-6">
              <CardTitle>{project.name}</CardTitle>
            </CardHeader>
            <CardContent className="space-y-3 pb-6">
              {"years" in project && project.years && (
                <p className="text-sm text-muted-foreground">{project.years}</p>
              )}
              <p className="text-sm">{project.description}</p>
              {"highlights" in project && project.highlights && (
                <div>
                  <h3 className="text-sm font-semibold mb-2">Highlights</h3>
                  <ul className="space-y-2 text-sm">
                    {project.highlights.map((highlight: string) => (
                      <li key={`${project.name}-${highlight}`}>
                        <span className="text-muted-foreground">{highlight}</span>
                      </li>
                    ))}
                  </ul>
                </div>
              )}
              {"releases" in project && project.releases && (
                <div>
                  <h3 className="text-sm font-semibold mb-2">Discography</h3>
                  <ul className="space-y-2 text-sm">
                    {project.releases.map((release: { title: string; year: number }) => (
                      <li key={`${project.name}-${release.title}-${release.year}`}>
                        <span className="font-medium">{release.title}</span>{" "}
                        <span className="text-muted-foreground">({release.year})</span>
                      </li>
                    ))}
                  </ul>
                </div>
              )}
              {("url" in project && project.url) || ("discographyUrl" in project && project.discographyUrl) ? (
                <a
                  href={"url" in project ? project.url : "discographyUrl" in project ? project.discographyUrl : "#"}
                  target="_blank"
                  rel="noreferrer"
                  className="text-sm underline underline-offset-4"
                >
                  View more
                </a>
              ) : null}
            </CardContent>
          </Card>
        ))}
      </div>
    </div>
  );
}
