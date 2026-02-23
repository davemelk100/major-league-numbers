import { SiteLayout } from "@/components/music-site/site-layout";
import {
  createSiteMetadata,
  getMusicSiteById,
} from "@/lib/music-site";

const site = getMusicSiteById("slap-a-ham-numbers");

export const metadata = createSiteMetadata(site);

export default function SlapAHamNumbersLayout({ children }: { children: React.ReactNode }) {
  return (
    <SiteLayout siteId={site.id}>{children}</SiteLayout>
  );
}
