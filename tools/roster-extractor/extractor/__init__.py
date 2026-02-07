"""
Roster Extractor - A site-architecture-aware entity extraction tool.

Designed to extract entity rosters (artists, members, teams, etc.) from
web pages by inferring site structure at runtime rather than relying on
brittle hardcoded selectors.
"""

from .architecture import SiteArchitecture
from .targets import TargetExtractor
from .resolve import EntityResolver

__all__ = ["SiteArchitecture", "TargetExtractor", "EntityResolver"]
