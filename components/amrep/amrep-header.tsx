import { AmrepSearch } from "@/components/amrep/amrep-search";
import { SiteHeader } from "@/components/music-site/site-header";

export function AmrepHeader() {
  return <SiteHeader SearchComponent={AmrepSearch} />;
}

export { AmrepHeader as GbvHeader };
