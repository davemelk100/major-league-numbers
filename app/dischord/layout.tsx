import { SiteLayout } from "@/components/music-site/site-layout";
import {
  createSiteMetadata,
  getMusicSiteById,
} from "@/lib/music-site";

const site = getMusicSiteById("dischord");

export const metadata = createSiteMetadata(site);

export default function DischordLayout({ children }: { children: React.ReactNode }) {
  return (
    <SiteLayout siteId={site.id}>{children}</SiteLayout>
  );
}
