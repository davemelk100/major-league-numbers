/**
 * Site registry: defines the minimum files every music site must have.
 * Used by the site-completeness tests.
 */

/** Route page files every site must provide (relative to app/{siteId}/) */
export const REQUIRED_ROUTES = [
  "page.tsx",
  "search/page.tsx",
] as const;

/**
 * Members/artists route — uses "members" for GBV, "artists" for all other sites.
 * Checked separately since the slug varies per site.
 */
export const MEMBERS_ROUTE_SLUGS: Record<string, string> = {
  gbv: "members",
  sg: "artists",
  amrep: "artists",
  rev: "artists",
  e6: "artists",
  "touch-go-records": "artists",
  "slap-a-ham-records": "artists",
  "slap-a-ham-numbers": "artists",
  "test-github-commit": "artists",
};

/**
 * Albums/releases route — uses "albums" for GBV, "releases" for label sites.
 * Checked separately since the slug varies per site.
 */
export const ALBUMS_ROUTE_SLUGS: Record<string, string> = {
  gbv: "albums",
  sg: "releases",
  amrep: "releases",
  rev: "releases",
  e6: "releases",
  "touch-go-records": "releases",
  "slap-a-ham-records": "releases",
  "slap-a-ham-numbers": "releases",
  "test-github-commit": "releases",
};

/** Component files every site must provide (relative to components/{siteId}/) */
export const REQUIRED_COMPONENTS = [
  "{siteId}-dashboard-content.tsx",
] as const;

/** Required site config fields checked at test time */
export const REQUIRED_CONFIG_FIELDS = [
  "id",
  "name",
  "shortName",
  "basePath",
  "navLabels",
  "seo",
  "searchPlaceholder",
  "logoSrc",
  "placeholderIconSrc",
  "images",
] as const;

/** Required image config fields checked at test time */
export const REQUIRED_IMAGE_CONFIG_FIELDS = [
  "fallbackIcon",
  "fit",
  "lookupStrategy",
  "invalidCacheValues",
] as const;
