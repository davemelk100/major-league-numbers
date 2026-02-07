"""
Site Architecture Detection

Infers the structure of a web page at runtime by analyzing:
- Content density and text patterns
- Heading hierarchy
- Repeated child structures (lists, tables, cards)
- Exclusion of navigation, footer, and sidebar patterns
"""

from __future__ import annotations

import re
import logging
from dataclasses import dataclass, field
from typing import Optional
from bs4 import BeautifulSoup, Tag

logger = logging.getLogger(__name__)


# Patterns that indicate non-content areas
EXCLUDED_ROLES = {"navigation", "banner", "contentinfo", "complementary", "search"}
EXCLUDED_CLASSES = re.compile(
    r"(nav|menu|sidebar|footer|header|breadcrumb|pagination|comment|ad-|advertisement|social|share|related)",
    re.IGNORECASE,
)
EXCLUDED_IDS = re.compile(
    r"(nav|menu|sidebar|footer|header|breadcrumb|pagination|comment|ad-|advertisement)",
    re.IGNORECASE,
)
EXCLUDED_TAGS = {"nav", "footer", "aside", "header"}


@dataclass
class ContentContainer:
    """Represents a detected content container in the page."""

    element: Tag
    text_density: float
    child_count: int
    list_density: float
    heading_count: int
    dom_path: str

    def score(self) -> float:
        """Calculate a heuristic score for content-likelihood."""
        return (
            self.text_density * 0.4
            + self.list_density * 0.3
            + min(self.heading_count / 5, 1.0) * 0.2
            + min(self.child_count / 20, 1.0) * 0.1
        )


@dataclass
class SiteFingerprint:
    """Captures detected patterns about the site's structure."""

    content_container_hint: str
    heading_strategy: str
    list_pattern: str
    detected_sections: list[str] = field(default_factory=list)

    def to_dict(self) -> dict:
        return {
            "content_container_hint": self.content_container_hint,
            "heading_strategy": self.heading_strategy,
            "list_pattern": self.list_pattern,
            "detected_sections": self.detected_sections,
        }


class SiteArchitecture:
    """
    Analyzes and infers the architecture of a web page.

    This class detects content containers, heading patterns, and list structures
    without relying on site-specific selectors.
    """

    def __init__(self, html: str, base_url: str):
        self.soup = BeautifulSoup(html, "lxml")
        self.base_url = base_url
        self._main_content: Optional[Tag] = None
        self._fingerprint: Optional[SiteFingerprint] = None

    def _is_excluded(self, element: Tag) -> bool:
        """Check if an element should be excluded from content analysis."""
        if element.name in EXCLUDED_TAGS:
            return True

        role = element.get("role", "")
        if role in EXCLUDED_ROLES:
            return True

        classes = " ".join(element.get("class", []))
        if EXCLUDED_CLASSES.search(classes):
            return True

        elem_id = element.get("id", "")
        if EXCLUDED_IDS.search(elem_id):
            return True

        return False

    def _get_dom_path(self, element: Tag, max_depth: int = 4) -> str:
        """Generate a simplified DOM path for an element."""
        parts = []
        current = element
        depth = 0

        while current and current.name and depth < max_depth:
            part = current.name
            if current.get("id"):
                part += f"#{current['id']}"
            elif current.get("class"):
                part += f".{current['class'][0]}"
            parts.append(part)
            current = current.parent
            depth += 1

        return " > ".join(reversed(parts))

    def _calculate_text_density(self, element: Tag) -> float:
        """Calculate text density (text length / total HTML length)."""
        text = element.get_text(strip=True)
        html = str(element)
        if len(html) == 0:
            return 0
        return len(text) / len(html)

    def _calculate_list_density(self, element: Tag) -> float:
        """Calculate density of list-like structures."""
        lists = element.find_all(["ul", "ol", "dl"])
        tables = element.find_all("table")
        cards = element.find_all(class_=re.compile(r"card|item|entry", re.IGNORECASE))

        total_children = len(list(element.descendants))
        if total_children == 0:
            return 0

        list_elements = sum(len(list(l.children)) for l in lists)
        table_rows = sum(len(t.find_all("tr")) for t in tables)
        card_count = len(cards)

        return min((list_elements + table_rows + card_count) / max(total_children, 1), 1.0)

    def _find_content_containers(self) -> list[ContentContainer]:
        """Find potential content container elements."""
        candidates = []

        # Look for semantic content containers
        for selector in ["main", "article", "[role='main']", "#content", ".content", "#main"]:
            for element in self.soup.select(selector):
                if not self._is_excluded(element):
                    candidates.append(element)

        # Also consider large divs with substantial content
        for div in self.soup.find_all("div"):
            if self._is_excluded(div):
                continue
            text = div.get_text(strip=True)
            if len(text) > 500:  # Minimum content threshold
                candidates.append(div)

        # Analyze each candidate
        containers = []
        for element in candidates:
            text_density = self._calculate_text_density(element)
            list_density = self._calculate_list_density(element)
            headings = element.find_all(["h1", "h2", "h3", "h4", "h5", "h6"])
            children = list(element.children)

            container = ContentContainer(
                element=element,
                text_density=text_density,
                child_count=len(children),
                list_density=list_density,
                heading_count=len(headings),
                dom_path=self._get_dom_path(element),
            )
            containers.append(container)

        # Sort by score
        containers.sort(key=lambda c: c.score(), reverse=True)
        return containers

    def get_main_content(self) -> Optional[Tag]:
        """Get the main content container of the page."""
        if self._main_content is not None:
            return self._main_content

        containers = self._find_content_containers()
        if containers:
            self._main_content = containers[0].element
            logger.debug(f"Main content detected: {containers[0].dom_path}")
        else:
            # Fallback to body
            self._main_content = self.soup.body

        return self._main_content

    def find_heading(self, target: str, fuzzy: bool = True) -> Optional[Tag]:
        """
        Find a heading element matching the target text.

        Args:
            target: The heading text to search for.
            fuzzy: If True, allows partial/fuzzy matching.
        """
        content = self.get_main_content()
        if not content:
            return None

        headings = content.find_all(["h1", "h2", "h3", "h4", "h5", "h6"])
        target_lower = target.lower().strip()

        # Exact match first
        for heading in headings:
            text = heading.get_text(strip=True).lower()
            if text == target_lower:
                return heading

        # Fuzzy match
        if fuzzy:
            for heading in headings:
                text = heading.get_text(strip=True).lower()
                if target_lower in text or text in target_lower:
                    return heading

        return None

    def get_section_after_heading(self, heading: Tag) -> Optional[Tag]:
        """
        Get the content section that follows a heading.

        Looks for the next sibling container or collects content until the next
        heading of equal or higher level. Handles wrapper elements (like Wikipedia's
        mw-heading divs) by looking at the parent's siblings.
        """
        heading_level = int(heading.name[1])
        collected = []

        # Start with the heading itself, but check if it's wrapped
        search_start = heading
        parent = heading.parent
        if parent and parent.name == "div" and "heading" in " ".join(parent.get("class", [])):
            # Heading is wrapped (e.g., Wikipedia's mw-heading div)
            search_start = parent

        # Check for following siblings
        for sibling in search_start.find_next_siblings():
            # Skip empty text nodes
            if not sibling.name:
                continue

            # Check if we've hit another heading
            if sibling.name and sibling.name[0] == "h" and len(sibling.name) == 2:
                sibling_level = int(sibling.name[1])
                if sibling_level <= heading_level:
                    break

            # Also check for wrapped headings (mw-heading div)
            if sibling.name == "div" and "heading" in " ".join(sibling.get("class", [])):
                inner_heading = sibling.find(["h1", "h2", "h3", "h4", "h5", "h6"])
                if inner_heading:
                    sibling_level = int(inner_heading.name[1])
                    if sibling_level <= heading_level:
                        break

            # Return immediately for list/table containers
            if sibling.name in ["ul", "ol", "dl", "table"]:
                return sibling

            # For divs, check if they contain lists
            if sibling.name == "div":
                inner_list = sibling.find(["ul", "ol", "dl", "table"])
                if inner_list:
                    return inner_list

            collected.append(sibling)

        # If we collected content, wrap it
        if collected:
            wrapper = self.soup.new_tag("div")
            for elem in collected:
                # Clone instead of extract to avoid modifying the original
                wrapper.append(elem)
            return wrapper

        return None

    def detect_list_pattern(self, container: Tag) -> str:
        """Detect the primary list pattern in a container."""
        ul_count = len(container.find_all("ul", recursive=False))
        ol_count = len(container.find_all("ol", recursive=False))
        dl_count = len(container.find_all("dl", recursive=False))
        table_count = len(container.find_all("table", recursive=False))

        # Check for card/grid patterns
        cards = container.find_all(class_=re.compile(r"card|item|entry|grid", re.IGNORECASE))
        card_count = len(cards)

        counts = {
            "unordered_list": ul_count,
            "ordered_list": ol_count,
            "definition_list": dl_count,
            "table": table_count,
            "cards": card_count,
        }

        if max(counts.values()) == 0:
            # Check for plain links
            links = container.find_all("a")
            if len(links) > 3:
                return "links"
            return "text"

        return max(counts, key=counts.get)

    def get_fingerprint(self) -> SiteFingerprint:
        """Generate a fingerprint of the site's architecture."""
        if self._fingerprint is not None:
            return self._fingerprint

        content = self.get_main_content()
        containers = self._find_content_containers()

        # Detect heading strategy
        headings = content.find_all(["h1", "h2", "h3", "h4", "h5", "h6"]) if content else []
        heading_levels = [int(h.name[1]) for h in headings]
        if heading_levels:
            most_common = max(set(heading_levels), key=heading_levels.count)
            heading_strategy = f"h{most_common}_primary"
        else:
            heading_strategy = "none"

        # Detect list pattern
        list_pattern = self.detect_list_pattern(content) if content else "unknown"

        # Collect section names
        sections = [h.get_text(strip=True) for h in headings[:10]]

        self._fingerprint = SiteFingerprint(
            content_container_hint=containers[0].dom_path if containers else "body",
            heading_strategy=heading_strategy,
            list_pattern=list_pattern,
            detected_sections=sections,
        )

        return self._fingerprint

    def find_entity_lists(self, target_kind: str = "list") -> list[Tag]:
        """
        Find elements that appear to contain entity lists.

        Args:
            target_kind: The type of list to look for (list, table, links, text).
        """
        content = self.get_main_content()
        if not content:
            return []

        results = []

        if target_kind in ("list", "links"):
            for ul in content.find_all(["ul", "ol"]):
                items = ul.find_all("li", recursive=False)
                if len(items) >= 3:  # Minimum items for a meaningful list
                    results.append(ul)

        if target_kind == "table":
            for table in content.find_all("table"):
                rows = table.find_all("tr")
                if len(rows) >= 3:
                    results.append(table)

        if target_kind == "links":
            # Also look for div containers with many links
            for div in content.find_all("div"):
                links = div.find_all("a", recursive=False)
                if len(links) >= 5:
                    results.append(div)

        return results
