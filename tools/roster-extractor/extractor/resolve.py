"""
Entity Resolver

Resolves additional information for extracted entities:
- Entity pages
- Representative images (OpenGraph, Twitter Card, content images)
"""

from __future__ import annotations

import re
import logging
import time
from dataclasses import dataclass
from typing import Optional
from urllib.parse import urljoin, urlparse

import requests
from bs4 import BeautifulSoup

from .targets import ExtractedEntity

logger = logging.getLogger(__name__)


@dataclass
class ResolvedImage:
    """Represents a resolved image for an entity."""

    url: str
    kind: str  # "og" | "twitter" | "content" | "infobox" | "none"
    alt: Optional[str] = None


class EntityResolver:
    """
    Resolves entity pages and extracts representative images.

    Uses generic web conventions:
    - OpenGraph image (og:image)
    - Twitter Card image (twitter:image)
    - First large image in main content
    - Infobox/profile images
    """

    def __init__(
        self,
        session: Optional[requests.Session] = None,
        user_agent: str = "RosterExtractor/1.0",
        timeout: int = 10,
        sleep_ms: int = 100,
    ):
        self.session = session or requests.Session()
        self.session.headers.update({"User-Agent": user_agent})
        self.timeout = timeout
        self.sleep_ms = sleep_ms

    def _fetch(self, url: str) -> Optional[str]:
        """Fetch a URL with retry logic."""
        max_retries = 3
        backoff = 1

        for attempt in range(max_retries):
            try:
                response = self.session.get(url, timeout=self.timeout)
                response.raise_for_status()
                return response.text
            except requests.RequestException as e:
                logger.warning(f"Fetch attempt {attempt + 1} failed for {url}: {e}")
                if attempt < max_retries - 1:
                    time.sleep(backoff)
                    backoff *= 2
                else:
                    return None

        return None

    def _extract_og_image(self, soup: BeautifulSoup) -> Optional[str]:
        """Extract OpenGraph image."""
        og_image = soup.find("meta", property="og:image")
        if og_image and og_image.get("content"):
            return og_image["content"]
        return None

    def _extract_twitter_image(self, soup: BeautifulSoup) -> Optional[str]:
        """Extract Twitter Card image."""
        twitter_image = soup.find("meta", attrs={"name": "twitter:image"})
        if twitter_image and twitter_image.get("content"):
            return twitter_image["content"]
        return None

    def _extract_infobox_image(self, soup: BeautifulSoup, base_url: str) -> Optional[str]:
        """Extract image from infobox/profile section (common on Wikipedia, etc.)."""
        # Look for common infobox patterns
        infobox_selectors = [
            ".infobox img",
            ".infobox-image img",
            "[class*='infobox'] img",
            ".vcard img",
            ".profile img",
            "[class*='profile'] img",
            ".artist-image img",
            ".band-image img",
        ]

        for selector in infobox_selectors:
            try:
                img = soup.select_one(selector)
                if img and img.get("src"):
                    src = img["src"]
                    # Skip tiny icons
                    width = img.get("width", "100")
                    try:
                        if int(width) < 50:
                            continue
                    except (ValueError, TypeError):
                        pass
                    return urljoin(base_url, src)
            except Exception:
                continue

        return None

    def _extract_content_image(self, soup: BeautifulSoup, base_url: str) -> Optional[str]:
        """Extract the first substantial image from main content."""
        # Look for main content area
        main_content = (
            soup.find("main")
            or soup.find("article")
            or soup.find(id="content")
            or soup.find(class_="content")
            or soup.body
        )

        if not main_content:
            return None

        # Find images with reasonable size
        for img in main_content.find_all("img"):
            src = img.get("src")
            if not src:
                continue

            # Skip common non-content images
            src_lower = src.lower()
            if any(skip in src_lower for skip in ["icon", "logo", "button", "arrow", "sprite", "1x1", "spacer"]):
                continue

            # Check dimensions if available
            width = img.get("width", "200")
            height = img.get("height", "200")
            try:
                if int(width) < 100 or int(height) < 100:
                    continue
            except (ValueError, TypeError):
                pass

            return urljoin(base_url, src)

        return None

    def _is_valid_image_url(self, url: str) -> bool:
        """Check if a URL looks like a valid image."""
        if not url:
            return False

        parsed = urlparse(url)
        if not parsed.scheme or not parsed.netloc:
            return False

        # Check for common image extensions
        path = parsed.path.lower()
        if any(path.endswith(ext) for ext in [".jpg", ".jpeg", ".png", ".gif", ".webp", ".svg"]):
            return True

        # Some CDNs don't use extensions
        if any(cdn in parsed.netloc for cdn in ["upload.wikimedia", "cloudinary", "imgix", "discogs", "spotify"]):
            return True

        return True  # Be permissive

    def resolve_image(self, entity_url: str) -> Optional[ResolvedImage]:
        """
        Resolve a representative image from an entity page.

        Priority:
        1. Infobox/profile image
        2. OpenGraph image
        3. Twitter Card image
        4. First content image
        """
        html = self._fetch(entity_url)
        if not html:
            return None

        soup = BeautifulSoup(html, "lxml")

        # Try infobox first (often has the best artist/band images)
        infobox_url = self._extract_infobox_image(soup, entity_url)
        if infobox_url and self._is_valid_image_url(infobox_url):
            return ResolvedImage(url=infobox_url, kind="infobox")

        # Try OpenGraph
        og_url = self._extract_og_image(soup)
        if og_url and self._is_valid_image_url(og_url):
            return ResolvedImage(url=og_url, kind="og")

        # Try Twitter Card
        twitter_url = self._extract_twitter_image(soup)
        if twitter_url and self._is_valid_image_url(twitter_url):
            return ResolvedImage(url=twitter_url, kind="twitter")

        # Try content image
        content_url = self._extract_content_image(soup, entity_url)
        if content_url and self._is_valid_image_url(content_url):
            return ResolvedImage(url=content_url, kind="content")

        return ResolvedImage(url="", kind="none")

    def resolve_entity(
        self,
        entity: ExtractedEntity,
        resolve_images: bool = True,
    ) -> dict:
        """
        Resolve additional information for an entity.

        Args:
            entity: The entity to resolve.
            resolve_images: Whether to attempt image resolution.
        """
        result = entity.to_dict()

        if not entity.href:
            if resolve_images:
                result["image_url"] = None
                result["image_kind"] = "none"
            return result

        result["entity_url"] = entity.href

        if resolve_images:
            if self.sleep_ms > 0:
                time.sleep(self.sleep_ms / 1000)

            image = self.resolve_image(entity.href)
            if image and image.url:
                result["image_url"] = image.url
                result["image_kind"] = image.kind
            else:
                result["image_url"] = None
                result["image_kind"] = "none"

        return result

    def resolve_all(
        self,
        entities: list[ExtractedEntity],
        resolve_images: bool = True,
        max_items: Optional[int] = None,
    ) -> list[dict]:
        """
        Resolve additional information for multiple entities.

        Args:
            entities: List of entities to resolve.
            resolve_images: Whether to attempt image resolution.
            max_items: Maximum number of entities to resolve (for testing).
        """
        items = entities[:max_items] if max_items else entities
        results = []

        for i, entity in enumerate(items):
            logger.info(f"Resolving {i + 1}/{len(items)}: {entity.name}")
            try:
                resolved = self.resolve_entity(entity, resolve_images)
                results.append(resolved)
            except Exception as e:
                logger.error(f"Failed to resolve {entity.name}: {e}")
                results.append(entity.to_dict())

        return results
