"""
Target Extraction

Extracts entities from detected content containers, handling various
list patterns (ul/ol, tables, cards, plain links).
"""

from __future__ import annotations

import re
import logging
from dataclasses import dataclass, field
from typing import Optional
from urllib.parse import urljoin
from bs4 import Tag

from .architecture import SiteArchitecture

logger = logging.getLogger(__name__)


@dataclass
class ExtractedEntity:
    """Represents an extracted entity from the page."""

    name: str
    href: Optional[str] = None
    context: dict = field(default_factory=dict)

    def to_dict(self) -> dict:
        result = {"name": self.name}
        if self.href:
            result["href"] = self.href
        if self.context:
            result["context"] = self.context
        return result


@dataclass
class ExtractionResult:
    """Result of an entity extraction operation."""

    context: str
    kind: str
    items: list[ExtractedEntity]
    source_heading: Optional[str] = None

    def to_dict(self) -> dict:
        return {
            "context": self.context,
            "kind": self.kind,
            "source_heading": self.source_heading,
            "items": [item.to_dict() for item in self.items],
        }


class TargetExtractor:
    """
    Extracts entity targets from a page using the detected architecture.

    Supports extraction from:
    - Unordered/ordered lists (ul, ol)
    - Definition lists (dl)
    - Tables
    - Card/grid layouts
    - Plain link collections
    """

    def __init__(self, architecture: SiteArchitecture):
        self.arch = architecture
        self.base_url = architecture.base_url

    def _normalize_name(self, text: str) -> str:
        """Normalize an entity name."""
        # Remove common suffixes/annotations
        text = re.sub(r"\s*\([^)]*\)\s*$", "", text)  # Remove trailing parentheticals
        text = re.sub(r"\s*\[[^\]]*\]\s*", "", text)  # Remove bracketed refs
        text = re.sub(r"\s*[–—-]\s*$", "", text)  # Remove trailing dashes
        text = text.strip()
        return text

    def _resolve_url(self, href: Optional[str]) -> Optional[str]:
        """Resolve a relative URL to absolute."""
        if not href:
            return None
        if href.startswith(("http://", "https://", "//")):
            return href
        return urljoin(self.base_url, href)

    def _extract_from_list(self, container: Tag, nearby_heading: Optional[str] = None) -> list[ExtractedEntity]:
        """Extract entities from a ul/ol list."""
        entities = []
        items = container.find_all("li", recursive=False)

        for item in items:
            # Look for a primary link
            link = item.find("a")
            if link:
                name = self._normalize_name(link.get_text(strip=True))
                href = self._resolve_url(link.get("href"))
            else:
                name = self._normalize_name(item.get_text(strip=True))
                href = None

            if not name:
                continue

            entity = ExtractedEntity(
                name=name,
                href=href,
                context={
                    "nearby_heading": nearby_heading,
                    "source_type": "list_item",
                },
            )
            entities.append(entity)

        return entities

    def _extract_from_definition_list(self, container: Tag, nearby_heading: Optional[str] = None) -> list[ExtractedEntity]:
        """Extract entities from a dl (definition list)."""
        entities = []

        for dt in container.find_all("dt"):
            link = dt.find("a")
            if link:
                name = self._normalize_name(link.get_text(strip=True))
                href = self._resolve_url(link.get("href"))
            else:
                name = self._normalize_name(dt.get_text(strip=True))
                href = None

            if not name:
                continue

            # Get associated description
            dd = dt.find_next_sibling("dd")
            description = dd.get_text(strip=True) if dd else None

            entity = ExtractedEntity(
                name=name,
                href=href,
                context={
                    "nearby_heading": nearby_heading,
                    "source_type": "definition_list",
                    "description": description,
                },
            )
            entities.append(entity)

        return entities

    def _extract_from_table(self, container: Tag, nearby_heading: Optional[str] = None) -> list[ExtractedEntity]:
        """Extract entities from a table."""
        entities = []
        rows = container.find_all("tr")

        # Skip header row if present
        start_idx = 0
        if rows and rows[0].find("th"):
            start_idx = 1

        for row in rows[start_idx:]:
            cells = row.find_all(["td", "th"])
            if not cells:
                continue

            # Primary entity is usually in first cell
            first_cell = cells[0]
            link = first_cell.find("a")

            if link:
                name = self._normalize_name(link.get_text(strip=True))
                href = self._resolve_url(link.get("href"))
            else:
                name = self._normalize_name(first_cell.get_text(strip=True))
                href = None

            if not name:
                continue

            # Collect additional cell data
            extra_data = {}
            for i, cell in enumerate(cells[1:], start=1):
                cell_text = cell.get_text(strip=True)
                if cell_text:
                    extra_data[f"column_{i}"] = cell_text

            entity = ExtractedEntity(
                name=name,
                href=href,
                context={
                    "nearby_heading": nearby_heading,
                    "source_type": "table_row",
                    **extra_data,
                },
            )
            entities.append(entity)

        return entities

    def _extract_from_links(self, container: Tag, nearby_heading: Optional[str] = None) -> list[ExtractedEntity]:
        """Extract entities from a collection of links."""
        entities = []
        links = container.find_all("a")

        for link in links:
            name = self._normalize_name(link.get_text(strip=True))
            href = self._resolve_url(link.get("href"))

            if not name or len(name) < 2:
                continue

            # Skip common non-entity links
            if name.lower() in ("edit", "read more", "see also", "source", "citation needed"):
                continue

            entity = ExtractedEntity(
                name=name,
                href=href,
                context={
                    "nearby_heading": nearby_heading,
                    "source_type": "link",
                },
            )
            entities.append(entity)

        return entities

    def _extract_from_list_complete(self, container: Tag, nearby_heading: Optional[str] = None) -> list[ExtractedEntity]:
        """
        Extract entities from a ul/ol list, including items without links.

        This captures all list items, not just those with anchor tags.
        """
        entities = []
        items = container.find_all("li", recursive=False)

        for item in items:
            # Look for a primary link
            link = item.find("a")
            if link:
                name = self._normalize_name(link.get_text(strip=True))
                href = self._resolve_url(link.get("href"))
            else:
                # No link - use the text content
                name = self._normalize_name(item.get_text(strip=True))
                href = None

            if not name or len(name) < 2:
                continue

            entity = ExtractedEntity(
                name=name,
                href=href,
                context={
                    "nearby_heading": nearby_heading,
                    "source_type": "list_item",
                    "has_link": href is not None,
                },
            )
            entities.append(entity)

        return entities

    def _extract_from_container(self, container: Tag, nearby_heading: Optional[str] = None) -> list[ExtractedEntity]:
        """Extract entities from a container, auto-detecting the pattern."""
        pattern = self.arch.detect_list_pattern(container)

        # Check if container itself is a list
        if container.name in ["ul", "ol"]:
            return self._extract_from_list_complete(container, nearby_heading)

        if pattern == "unordered_list" or pattern == "ordered_list":
            ul = container.find(["ul", "ol"])
            if ul:
                return self._extract_from_list_complete(ul, nearby_heading)

        if pattern == "definition_list":
            dl = container.find("dl")
            if dl:
                return self._extract_from_definition_list(dl, nearby_heading)

        if pattern == "table":
            table = container.find("table")
            if table:
                return self._extract_from_table(table, nearby_heading)

        # Fallback to link extraction
        return self._extract_from_links(container, nearby_heading)

    def _deduplicate(self, entities: list[ExtractedEntity]) -> list[ExtractedEntity]:
        """Remove duplicate entities while preserving order."""
        seen_names = set()
        result = []

        for entity in entities:
            name_key = entity.name.lower()
            if name_key not in seen_names:
                seen_names.add(name_key)
                result.append(entity)

        return result

    def extract_by_heading(self, target_header: str) -> Optional[ExtractionResult]:
        """
        Extract entities from the section following a specific heading.

        Args:
            target_header: The heading text to locate.
        """
        heading = self.arch.find_heading(target_header)
        if not heading:
            logger.warning(f"Heading not found: {target_header}")
            return None

        heading_text = heading.get_text(strip=True)
        section = self.arch.get_section_after_heading(heading)

        if not section:
            logger.warning(f"No content section found after heading: {heading_text}")
            return None

        entities = self._extract_from_container(section, heading_text)
        entities = self._deduplicate(entities)

        return ExtractionResult(
            context=heading_text,
            kind=self.arch.detect_list_pattern(section),
            items=entities,
            source_heading=heading_text,
        )

    def extract_auto(self, target_kind: str = "list") -> Optional[ExtractionResult]:
        """
        Auto-detect and extract the most entity-list-like section.

        Args:
            target_kind: Hint for the type of list to look for.
        """
        entity_lists = self.arch.find_entity_lists(target_kind)

        if not entity_lists:
            logger.warning("No entity lists detected")
            return None

        # Use the first/best list
        best_list = entity_lists[0]

        # Try to find a nearby heading
        nearby_heading = None
        prev = best_list.find_previous(["h1", "h2", "h3", "h4", "h5", "h6"])
        if prev:
            nearby_heading = prev.get_text(strip=True)

        entities = self._extract_from_container(best_list, nearby_heading)
        entities = self._deduplicate(entities)

        return ExtractionResult(
            context=nearby_heading or "Auto-detected list",
            kind=self.arch.detect_list_pattern(best_list),
            items=entities,
            source_heading=nearby_heading,
        )

    def extract(
        self,
        target_header: Optional[str] = None,
        target_kind: str = "list",
    ) -> Optional[ExtractionResult]:
        """
        Main extraction method.

        Args:
            target_header: Optional heading to locate. If None, auto-detects.
            target_kind: Type of list structure to look for.
        """
        if target_header:
            return self.extract_by_heading(target_header)
        return self.extract_auto(target_kind)
