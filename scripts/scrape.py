#!/usr/bin/env python3
"""
General-purpose web scraper.

Usage:
    python3 scripts/scrape.py <url> [options]

Options:
    -o, --output FILE       Write JSON output to file (default: stdout)
    -m, --markdown FILE     Write markdown output to file
    --images-only           Only extract image URLs
    --selector SEL          CSS selector to scope extraction
    --no-markdown           Skip markdown conversion in JSON output
    --headers KEY=VAL       Extra request headers (repeatable)
    --timeout SECS          Request timeout in seconds (default: 30)

Examples:
    python3 scripts/scrape.py https://example.com
    python3 scripts/scrape.py https://example.com -o out.json -m out.md
    python3 scripts/scrape.py https://discogs.com/artist/83529 --selector ".body"
    python3 scripts/scrape.py https://example.com --images-only
"""

import argparse
import json
import sys
from urllib.parse import urljoin, urlparse

import requests
from bs4 import BeautifulSoup, Comment
from markdownify import markdownify as md


def fetch_page(url, headers=None, timeout=30):
    default_headers = {
        "User-Agent": "Mozilla/5.0 (Macintosh; Intel Mac OS X 10_15_7) "
                      "AppleWebKit/537.36 (KHTML, like Gecko) "
                      "Chrome/120.0.0.0 Safari/537.36",
        "Accept": "text/html,application/xhtml+xml,application/xml;q=0.9,*/*;q=0.8",
        "Accept-Language": "en-US,en;q=0.9",
    }
    if headers:
        default_headers.update(headers)

    resp = requests.get(url, headers=default_headers, timeout=timeout)
    resp.raise_for_status()
    return resp.text, resp.url


def extract_meta(soup, base_url):
    meta = {}

    title_tag = soup.find("title")
    if title_tag:
        meta["title"] = title_tag.get_text(strip=True)

    for tag in soup.find_all("meta"):
        name = tag.get("name", "") or tag.get("property", "")
        content = tag.get("content", "")
        if name and content:
            key = name.lower().replace(":", "_").replace(" ", "_")
            meta[key] = content

    canonical = soup.find("link", rel="canonical")
    if canonical and canonical.get("href"):
        meta["canonical_url"] = urljoin(base_url, canonical["href"])

    return meta


def extract_images(soup, base_url):
    images = []
    seen = set()
    for img in soup.find_all("img"):
        src = img.get("src") or img.get("data-src") or ""
        if not src:
            continue
        abs_url = urljoin(base_url, src)
        if abs_url in seen:
            continue
        seen.add(abs_url)
        entry = {"src": abs_url}
        alt = img.get("alt", "").strip()
        if alt:
            entry["alt"] = alt
        width = img.get("width")
        height = img.get("height")
        if width:
            entry["width"] = width
        if height:
            entry["height"] = height
        images.append(entry)
    return images


def extract_links(soup, base_url):
    links = []
    seen = set()
    for a in soup.find_all("a", href=True):
        href = a["href"]
        if href.startswith(("#", "javascript:", "mailto:")):
            continue
        abs_url = urljoin(base_url, href)
        if abs_url in seen:
            continue
        seen.add(abs_url)
        text = a.get_text(strip=True)
        entry = {"href": abs_url}
        if text:
            entry["text"] = text
        links.append(entry)
    return links


def extract_tables(soup):
    tables = []
    for table in soup.find_all("table"):
        rows = []
        for tr in table.find_all("tr"):
            cells = []
            for td in tr.find_all(["td", "th"]):
                cells.append(td.get_text(strip=True))
            if cells:
                rows.append(cells)
        if rows:
            tables.append(rows)
    return tables


def extract_headings(soup):
    headings = []
    for tag in soup.find_all(["h1", "h2", "h3", "h4", "h5", "h6"]):
        headings.append({
            "level": int(tag.name[1]),
            "text": tag.get_text(strip=True),
        })
    return headings


def clean_soup(soup):
    for element in soup.find_all(["script", "style", "noscript", "iframe"]):
        element.decompose()
    for comment in soup.find_all(string=lambda s: isinstance(s, Comment)):
        comment.extract()
    return soup


def to_markdown(soup):
    cleaned = clean_soup(soup.__copy__())
    body = cleaned.find("body") or cleaned
    return md(str(body), heading_style="ATX", strip=["img"]).strip()


def scrape(url, selector=None, images_only=False, include_markdown=True,
           extra_headers=None, timeout=30):
    html, final_url = fetch_page(url, headers=extra_headers, timeout=timeout)
    soup = BeautifulSoup(html, "html.parser")

    if selector:
        selected = soup.select_one(selector)
        if not selected:
            print(f"Warning: selector '{selector}' not found, using full page",
                  file=sys.stderr)
        else:
            soup = selected

    base_url = final_url

    if images_only:
        return {
            "url": base_url,
            "images": extract_images(soup, base_url),
        }

    result = {
        "url": base_url,
        "meta": extract_meta(soup, base_url),
        "headings": extract_headings(soup),
        "images": extract_images(soup, base_url),
        "links": extract_links(soup, base_url),
        "tables": extract_tables(soup),
        "text": soup.get_text(separator="\n", strip=True)[:50000],
    }

    if include_markdown:
        result["markdown"] = to_markdown(soup)

    return result


def parse_header(value):
    if "=" not in value:
        raise argparse.ArgumentTypeError(f"Invalid header format: {value}")
    key, val = value.split("=", 1)
    return key.strip(), val.strip()


def main():
    parser = argparse.ArgumentParser(description="General-purpose web scraper")
    parser.add_argument("url", help="URL to scrape")
    parser.add_argument("-o", "--output", help="JSON output file")
    parser.add_argument("-m", "--markdown", help="Markdown output file")
    parser.add_argument("--images-only", action="store_true",
                        help="Only extract image URLs")
    parser.add_argument("--selector", help="CSS selector to scope extraction")
    parser.add_argument("--no-markdown", action="store_true",
                        help="Skip markdown in JSON")
    parser.add_argument("--headers", action="append", type=parse_header,
                        metavar="KEY=VAL", help="Extra headers")
    parser.add_argument("--timeout", type=int, default=30,
                        help="Request timeout (seconds)")

    args = parser.parse_args()

    extra_headers = dict(args.headers) if args.headers else None

    result = scrape(
        url=args.url,
        selector=args.selector,
        images_only=args.images_only,
        include_markdown=not args.no_markdown,
        extra_headers=extra_headers,
        timeout=args.timeout,
    )

    json_out = json.dumps(result, indent=2, ensure_ascii=False)

    if args.output:
        with open(args.output, "w") as f:
            f.write(json_out)
        print(f"JSON written to {args.output}", file=sys.stderr)
    else:
        print(json_out)

    if args.markdown and "markdown" in result:
        with open(args.markdown, "w") as f:
            f.write(result["markdown"])
        print(f"Markdown written to {args.markdown}", file=sys.stderr)


if __name__ == "__main__":
    main()
