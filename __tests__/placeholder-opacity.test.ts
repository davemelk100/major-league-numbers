import { describe, it, expect } from "vitest";
import fs from "fs";
import path from "path";
import { MUSIC_SITES } from "@/lib/music-site";

const ROOT = path.resolve(__dirname, "..");

describe("Placeholder opacity", () => {
  describe("SitePlaceholderIcon", () => {
    const filePath = path.join(
      ROOT,
      "components",
      "music-site",
      "site-placeholder-icon.tsx"
    );
    const content = fs.readFileSync(filePath, "utf-8");

    it("uses inline style opacity 0.2", () => {
      expect(content).toContain("style={{ opacity: 0.2 }}");
    });

    it("does not rely on Tailwind opacity class (cascade layer issue)", () => {
      expect(content).not.toMatch(/className=.*opacity-20/);
    });
  });

  describe("Shared AlbumGrid uses SitePlaceholderIcon", () => {
    const filePath = path.join(ROOT, "components", "music-site", "album-grid.tsx");
    if (fs.existsSync(filePath)) {
      const content = fs.readFileSync(filePath, "utf-8");
      it("imports SitePlaceholderIcon", () => {
        expect(content).toContain("SitePlaceholderIcon");
      });
    }
  });

  describe("All music site components use SitePlaceholderIcon for placeholders", () => {
    const PLACEHOLDER_COMPONENTS = [
      "{siteId}-albums-content.tsx",
      "{siteId}-album-detail-content.tsx",
      "{siteId}-members-content.tsx",
      "{siteId}-member-detail-content.tsx",
    ];

    for (const site of MUSIC_SITES) {
      describe(site.shortName, () => {
        for (const template of PLACEHOLDER_COMPONENTS) {
          const fileName = template.replace(/\{siteId\}/g, site.id);
          const filePath = path.join(ROOT, "components", site.id, fileName);

          if (!fs.existsSync(filePath)) continue;

          it(`${fileName} uses SitePlaceholderIcon (directly or via shared component)`, () => {
            const content = fs.readFileSync(filePath, "utf-8");
            // Files may delegate to shared AlbumGrid which uses SitePlaceholderIcon
            const usesSitePlaceholder = content.includes("SitePlaceholderIcon");
            const delegatesToAlbumGrid = content.includes("AlbumGrid");
            expect(
              usesSitePlaceholder || delegatesToAlbumGrid,
              `${fileName} should use SitePlaceholderIcon or delegate to a shared component that does`
            ).toBe(true);
          });
        }
      });
    }
  });
});
