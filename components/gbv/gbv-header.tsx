import { GbvSearch } from "@/components/gbv/gbv-search";
import { SiteHeader } from "@/components/music-site/site-header";

export function GbvHeader() {
  return <SiteHeader SearchComponent={GbvSearch} />;
}
