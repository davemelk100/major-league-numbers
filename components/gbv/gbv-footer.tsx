import Link from "next/link";
import Image from "next/image";

export function GbvFooter() {
  return (
    <footer className="bg-transparent py-6 mt-auto">
      <div className="container">
        <div className="flex flex-col md:flex-row items-center justify-between gap-4">
          <div className="flex items-center gap-2">
            <Image
              src="/chat-gbv-box.svg"
              alt="GBV"
              width={96}
              height={96}
              className="h-24 w-24 gbv-rune-white"
              loading="eager"
            />
          </div>
          <nav className="flex items-center gap-6 text-sm text-white">
            <Link
              href="/gbv/albums"
              className="transition-colors hover:underline hover:decoration-current"
            >
              Albums
            </Link>
            <Link
              href="/gbv/ask"
              className="transition-colors hover:underline hover:decoration-current"
            >
              Chat GBV
            </Link>
            <Link
              href="/gbv/members"
              className="transition-colors hover:underline hover:decoration-current"
            >
              Members
            </Link>
          </nav>
        </div>
        <div className="mt-4 text-xs text-white">
          <span className="mr-2">Sources:</span>
          <div className="flex flex-wrap gap-3">
            <a
              href="https://www.discogs.com/"
              target="_blank"
              rel="noreferrer"
              className="transition-colors hover:underline hover:decoration-current"
            >
              Discogs
            </a>
            <a
              href="https://www.ebay.com/"
              target="_blank"
              rel="noreferrer"
              className="transition-colors hover:underline hover:decoration-current"
            >
              eBay
            </a>
            <a
              href="https://www.gbvdb.com/"
              target="_blank"
              rel="noreferrer"
              className="transition-colors hover:underline hover:decoration-current"
            >
              GBVDB
            </a>
            <a
              href="https://musicbrainz.org/"
              target="_blank"
              rel="noreferrer"
              className="transition-colors hover:underline hover:decoration-current"
            >
              MusicBrainz
            </a>
            <a
              href="https://coverartarchive.org/"
              target="_blank"
              rel="noreferrer"
              className="transition-colors hover:underline hover:decoration-current"
            >
              Cover Art Archive
            </a>
            <a
              href="https://www.wikidata.org/"
              target="_blank"
              rel="noreferrer"
              className="transition-colors hover:underline hover:decoration-current"
            >
              Wikidata
            </a>
            <a
              href="https://commons.wikimedia.org/"
              target="_blank"
              rel="noreferrer"
              className="transition-colors hover:underline hover:decoration-current"
            >
              Wikimedia Commons
            </a>
          </div>
        </div>
      </div>
    </footer>
  );
}
