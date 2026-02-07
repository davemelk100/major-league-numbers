#!/usr/bin/env python3
"""
Roster Extractor CLI

A site-architecture-aware entity extraction tool that infers page structure
at runtime instead of relying on brittle hardcoded selectors.

Usage:
    python extractor_cli.py --url <seed_url> [options]

Examples:
    # Extract Revelation Records artists from Wikipedia
    python extractor_cli.py \\
        --url "https://en.wikipedia.org/wiki/Revelation_Records" \\
        --target-header "Artists" \\
        --out revelation_artists.json

    # Auto-detect entity list from a page
    python extractor_cli.py \\
        --url "https://example.com/artists" \\
        --target-kind list

    # With image resolution
    python extractor_cli.py \\
        --url "https://en.wikipedia.org/wiki/Revelation_Records" \\
        --target-header "Artists" \\
        --resolve-images \\
        --max-resolve 5
"""

from __future__ import annotations

import json
import logging
import sys
import time
from datetime import datetime, timezone
from typing import Optional

import click
import requests

from extractor import SiteArchitecture, TargetExtractor, EntityResolver

# Configure logging
logging.basicConfig(
    level=logging.INFO,
    format="%(asctime)s [%(levelname)s] %(message)s",
    datefmt="%Y-%m-%d %H:%M:%S",
)
logger = logging.getLogger(__name__)


def fetch_page(
    url: str,
    user_agent: str,
    timeout: int,
    max_retries: int = 3,
) -> Optional[str]:
    """Fetch a page with retry logic and exponential backoff."""
    session = requests.Session()
    session.headers.update({"User-Agent": user_agent})

    backoff = 1
    for attempt in range(max_retries):
        try:
            logger.info(f"Fetching: {url}")
            response = session.get(url, timeout=timeout)
            response.raise_for_status()
            return response.text
        except requests.RequestException as e:
            logger.warning(f"Fetch attempt {attempt + 1}/{max_retries} failed: {e}")
            if attempt < max_retries - 1:
                time.sleep(backoff)
                backoff *= 2
            else:
                logger.error(f"Failed to fetch {url} after {max_retries} attempts")
                return None

    return None


@click.command()
@click.option(
    "--url",
    required=True,
    help="Seed URL to extract entities from.",
)
@click.option(
    "--target-header",
    default=None,
    help="Heading text to locate (e.g., 'Artists'). If not provided, auto-detects.",
)
@click.option(
    "--target-kind",
    type=click.Choice(["list", "table", "links", "text"]),
    default="list",
    help="Type of list structure to look for.",
)
@click.option(
    "--resolve-images",
    is_flag=True,
    default=False,
    help="Resolve representative images for each entity.",
)
@click.option(
    "--max-resolve",
    type=int,
    default=None,
    help="Maximum number of entities to resolve (for testing).",
)
@click.option(
    "--out",
    default="output.json",
    help="Output file path.",
)
@click.option(
    "--user-agent",
    default="RosterExtractor/1.0 (https://github.com/example/roster-extractor)",
    help="User-Agent header for requests.",
)
@click.option(
    "--timeout",
    type=int,
    default=30,
    help="Request timeout in seconds.",
)
@click.option(
    "--sleep-ms",
    type=int,
    default=500,
    help="Delay between requests in milliseconds.",
)
@click.option(
    "--dry-run",
    is_flag=True,
    default=False,
    help="Analyze page structure without full extraction.",
)
@click.option(
    "--verbose",
    is_flag=True,
    default=False,
    help="Enable debug logging.",
)
def main(
    url: str,
    target_header: Optional[str],
    target_kind: str,
    resolve_images: bool,
    max_resolve: Optional[int],
    out: str,
    user_agent: str,
    timeout: int,
    sleep_ms: int,
    dry_run: bool,
    verbose: bool,
):
    """
    Extract entity rosters from web pages.

    This tool infers site structure at runtime to extract entities
    (artists, members, teams, etc.) from various page layouts.
    """
    if verbose:
        logging.getLogger().setLevel(logging.DEBUG)

    # Fetch the seed page
    html = fetch_page(url, user_agent, timeout)
    if not html:
        click.echo("Error: Failed to fetch the seed URL.", err=True)
        sys.exit(1)

    # Analyze site architecture
    logger.info("Analyzing site architecture...")
    arch = SiteArchitecture(html, url)
    fingerprint = arch.get_fingerprint()

    logger.info(f"Content container: {fingerprint.content_container_hint}")
    logger.info(f"Heading strategy: {fingerprint.heading_strategy}")
    logger.info(f"List pattern: {fingerprint.list_pattern}")
    logger.info(f"Detected sections: {fingerprint.detected_sections[:5]}")

    if dry_run:
        click.echo("\n=== Dry Run: Site Architecture ===")
        click.echo(json.dumps(fingerprint.to_dict(), indent=2))
        return

    # Extract targets
    logger.info("Extracting entities...")
    extractor = TargetExtractor(arch)
    result = extractor.extract(target_header, target_kind)

    if not result:
        click.echo("Error: No entities extracted.", err=True)
        sys.exit(1)

    logger.info(f"Extracted {len(result.items)} entities from '{result.context}'")

    # Resolve images if requested
    items = [item.to_dict() for item in result.items]
    if resolve_images and result.items:
        logger.info("Resolving entity images...")
        session = requests.Session()
        session.headers.update({"User-Agent": user_agent})

        resolver = EntityResolver(
            session=session,
            user_agent=user_agent,
            timeout=timeout,
            sleep_ms=sleep_ms,
        )

        items = resolver.resolve_all(
            result.items,
            resolve_images=True,
            max_items=max_resolve,
        )

    # Build output
    output = {
        "seed_url": url,
        "extracted_at": datetime.now(timezone.utc).isoformat(),
        "site_fingerprint": fingerprint.to_dict(),
        "targets": {
            "context": result.context,
            "kind": result.kind,
            "source_heading": result.source_heading,
            "items": items,
        },
    }

    # Write output
    with open(out, "w", encoding="utf-8") as f:
        json.dump(output, f, indent=2, ensure_ascii=False)

    logger.info(f"Output written to: {out}")
    click.echo(f"\nExtracted {len(items)} entities to {out}")


if __name__ == "__main__":
    main()
