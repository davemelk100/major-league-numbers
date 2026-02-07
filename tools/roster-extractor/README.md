# Roster Extractor

A site-architecture-aware entity extraction tool that infers page structure at runtime instead of relying on brittle hardcoded selectors.

## Overview

This tool extracts entity rosters (artists, members, teams, catalogs, etc.) from web pages by:

1. **Analyzing site architecture** - Detects content containers, heading patterns, and list structures
2. **Extracting targets** - Pulls entities from lists, tables, or link collections
3. **Resolving images** (optional) - Fetches representative images via OpenGraph, Twitter Cards, or content analysis

## Installation

```bash
cd tools/roster-extractor
pip install -r requirements.txt
```

## Usage

### Basic Usage

```bash
python extractor_cli.py --url <seed_url> [options]
```

### Options

| Option | Description | Default |
|--------|-------------|---------|
| `--url` | Seed URL to extract entities from | Required |
| `--target-header` | Heading text to locate (e.g., "Artists") | Auto-detect |
| `--target-kind` | Type of list: `list`, `table`, `links`, `text` | `list` |
| `--resolve-images` | Resolve representative images for entities | `false` |
| `--max-resolve` | Limit entities for image resolution (testing) | None |
| `--out` | Output file path | `output.json` |
| `--user-agent` | User-Agent header for requests | RosterExtractor/1.0 |
| `--timeout` | Request timeout in seconds | 30 |
| `--sleep-ms` | Delay between requests in milliseconds | 500 |
| `--dry-run` | Analyze structure without full extraction | `false` |
| `--verbose` | Enable debug logging | `false` |

## Examples

### Revelation Records Artists

Extract artists from the Revelation Records Wikipedia page:

```bash
python extractor_cli.py \
    --url "https://en.wikipedia.org/wiki/Revelation_Records" \
    --target-header "Artists" \
    --out revelation_artists.json
```

### With Image Resolution

Resolve images for each artist (limited to 5 for testing):

```bash
python extractor_cli.py \
    --url "https://en.wikipedia.org/wiki/Revelation_Records" \
    --target-header "Artists" \
    --resolve-images \
    --max-resolve 5 \
    --out revelation_artists_with_images.json
```

### Another Record Label

The same tool works for other labels/rosters with similar structures:

```bash
# Amphetamine Reptile Records
python extractor_cli.py \
    --url "https://en.wikipedia.org/wiki/Amphetamine_Reptile_Records" \
    --target-header "Artists" \
    --out amrep_artists.json

# Sub Pop Records
python extractor_cli.py \
    --url "https://en.wikipedia.org/wiki/Sub_Pop" \
    --target-header "Notable artists" \
    --out subpop_artists.json
```

### Auto-Detection Mode

When you don't know the exact heading, let the tool auto-detect:

```bash
python extractor_cli.py \
    --url "https://example.com/roster" \
    --target-kind list \
    --out roster.json
```

### Dry Run / Structure Analysis

Analyze a page's structure without extracting:

```bash
python extractor_cli.py \
    --url "https://en.wikipedia.org/wiki/Revelation_Records" \
    --dry-run
```

Output:
```json
{
  "content_container_hint": "div#mw-content-text",
  "heading_strategy": "h2_primary",
  "list_pattern": "unordered_list",
  "detected_sections": ["History", "Artists", "Notable releases", "References"]
}
```

### Table-Based Rosters

For pages that use tables instead of lists:

```bash
python extractor_cli.py \
    --url "https://example.com/discography" \
    --target-kind table \
    --out discography.json
```

## Output Format

```json
{
  "seed_url": "https://en.wikipedia.org/wiki/Revelation_Records",
  "extracted_at": "2024-01-15T10:30:00Z",
  "site_fingerprint": {
    "content_container_hint": "div#mw-content-text",
    "heading_strategy": "h2_primary",
    "list_pattern": "unordered_list",
    "detected_sections": ["History", "Artists", "Notable releases"]
  },
  "targets": {
    "context": "Artists",
    "kind": "unordered_list",
    "source_heading": "Artists",
    "items": [
      {
        "name": "Youth of Today",
        "href": "https://en.wikipedia.org/wiki/Youth_of_Today",
        "context": {
          "nearby_heading": "Artists",
          "source_type": "list_item"
        }
      },
      {
        "name": "Gorilla Biscuits",
        "href": "https://en.wikipedia.org/wiki/Gorilla_Biscuits",
        "context": {
          "nearby_heading": "Artists",
          "source_type": "list_item"
        }
      }
    ]
  }
}
```

With `--resolve-images`, each item includes:

```json
{
  "name": "Youth of Today",
  "href": "https://en.wikipedia.org/wiki/Youth_of_Today",
  "entity_url": "https://en.wikipedia.org/wiki/Youth_of_Today",
  "image_url": "https://upload.wikimedia.org/wikipedia/en/...",
  "image_kind": "infobox",
  "context": { ... }
}
```

## Architecture

```
extractor/
├── __init__.py         # Package exports
├── architecture.py     # Site structure detection
├── targets.py          # Entity extraction
└── resolve.py          # Image resolution
```

### Key Design Principles

1. **No hardcoded selectors** - The tool infers structure from semantic patterns
2. **Pattern-based detection** - Uses text density, heading hierarchy, and repetition patterns
3. **Graceful degradation** - Falls back sensibly when patterns aren't detected
4. **Pluggable resolution** - Image resolution is optional and modular

## Extending

### Adding New List Patterns

Edit `architecture.py` to add detection for new patterns:

```python
def detect_list_pattern(self, container: Tag) -> str:
    # Add detection for custom patterns
    custom_cards = container.find_all(class_="my-custom-card")
    if len(custom_cards) > 3:
        return "custom_cards"
    # ... existing logic
```

### Custom Entity Extraction

Edit `targets.py` to handle new patterns:

```python
def _extract_from_custom_cards(self, container: Tag, nearby_heading: str) -> list[ExtractedEntity]:
    # Custom extraction logic
    pass
```

## Rate Limiting

The tool includes built-in rate limiting:

- `--sleep-ms 500` - 500ms between requests (default)
- `--timeout 30` - 30 second timeout per request
- Exponential backoff on failures (1s, 2s, 4s)

For production use against rate-limited sites, increase `--sleep-ms`:

```bash
python extractor_cli.py \
    --url "..." \
    --resolve-images \
    --sleep-ms 2000  # 2 seconds between requests
```

## Limitations

- **JavaScript-rendered content** - This tool works with server-rendered HTML only. For SPAs, consider using a headless browser.
- **Authentication** - No built-in auth support. For protected pages, pass cookies via a custom session.
- **Very dynamic structures** - Works best with consistent, semantic HTML.

## License

MIT
