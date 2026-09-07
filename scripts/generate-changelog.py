#!/usr/bin/env python3
"""Regenerate the /changelog/ pages of meshsat.net from GitLab commit history.

What it does
------------
For each product repository (see REPOS) it lists the tags, fetches the
conventional commits of every tag range and of the untagged work on main, and
rewrites the block between the markers

    <!-- generated:begin -->
    <!-- generated:end -->

in site/content/changelog/<key>.md. Everything outside the markers is
hand-written and left alone. Sections are newest first: "Unreleased" (main
since the last tag), then one section per tag. Only the commit types listed
per repo appear (feat, fix, perf by default); each bullet links the commit on
the public GitHub mirror, because GitLab is private.

Output is deterministic: a run with no upstream change rewrites nothing, so
the CI job that calls it makes no commit and triggers no deploy.

House rules enforced here
-------------------------
* Zero em or en dashes in the output (the site gate rejects them): " - " and
  " -- " style dashes in commit subjects become ": " or "-".
* YouTrack trailers like [MESHSAT-123] are stripped; bare ids inside a
  sentence are left alone.
* Markdown is escaped outside code spans (subjects contain "</div>", "*",
  "_" and "--flags"; goldmark runs with unsafe HTML and the typographer on,
  which would turn "--" into an en dash in the built HTML).
* No heading names a version that is not a real tag (MESHSAT-741).

Running it
----------
Local dry run on the runner (read-only, prints a unified diff):

    set -a; . ~/gitlab/products/cubeos/.env; set +a
    python3 scripts/generate-changelog.py --dry-run --check --verify-mirror

Real run: drop --dry-run. Exit codes: 0 ok, 1 API or mirror error, 2 --check
failed, 3 marker error in a content file.

In CI (job changelog:regenerate in .gitlab-ci.yml) the token comes from the
project variable CHANGELOG_READ_TOKEN (a Reporter group access token on the
top group "products", name meshsat-changelog-read, scope read_api). The push
uses CHANGELOG_PUSH_TOKEN (a Maintainer project access token on
meshsat-website, name meshsat-changelog-push, scope write_repository). Both
expire 2027-09-01. The job pushes with ci.skip and starts the deploy pipeline
itself with its job token (DEPLOY_RUN=1), because a pipeline created by the
bot user's push cannot pull the private hugo-runner image.

Rotation: create replacement tokens with the same names, update the two
project variables (masked + protected), start a pipeline on main with
CHANGELOG_RUN=1 and confirm it prints "no upstream change", then revoke the
old tokens. An expired token shows as a red nightly job with HTTP 401.

Environment: GITLAB_TOKEN (required), GITLAB_URL (optional), GITHUB_TOKEN
(optional, raises the GitHub API rate limit for --verify-mirror).
"""

import argparse
import difflib
import json
import os
import re
import sys
import time
import urllib.error
import urllib.parse
import urllib.request

GITLAB_URL = os.environ.get("GITLAB_URL", "https://gitlab.nuclearlighters.net").rstrip("/")
API = GITLAB_URL + "/api/v4"
GITHUB_API = "https://api.github.com"
REPO_ROOT = os.path.dirname(os.path.dirname(os.path.abspath(__file__)))

BEGIN = "<!-- generated:begin -->"
END = "<!-- generated:end -->"

# One entry per changelog tab. "types" is the ordered list of conventional
# commit types that appear on the public page; everything else is counted but
# not listed. "tag_pattern" selects which tags are release sections.
REPOS = [
    {
        "key": "bridge",
        "project": 27,
        "github": "meshsat/meshsat",
        "path": "site/content/changelog/bridge.md",
        "types": ["feat", "fix", "perf"],
        "tag_pattern": r"^v\d+\.\d+\.\d+$",
    },
    {
        "key": "hub",
        "project": 35,
        "github": "meshsat/meshsat-hub",
        "path": "site/content/changelog/hub.md",
        "types": ["feat", "fix", "perf"],
        "tag_pattern": r"^v\d+\.\d+\.\d+$",
    },
    {
        "key": "android",
        "project": 31,
        "github": "meshsat/meshsat-android",
        "path": "site/content/changelog/android.md",
        "types": ["feat", "fix", "perf"],
        "tag_pattern": r"^v\d+\.\d+\.\d+$",
    },
    {
        "key": "fieldkit",
        "project": 64,
        "github": "meshsat/meshsat-fieldkit",
        "path": "site/content/changelog/fieldkit.md",
        "types": ["feat", "fix", "perf"],
        "tag_pattern": r".*",
    },
]

TYPE_LABELS = {
    "feat": "Features",
    "fix": "Fixes",
    "perf": "Performance",
    "docs": "Documentation",
    "refactor": "Refactoring",
}

SKIP_PREFIXES = ("Merge ", "Revert ")
CONVENTIONAL = re.compile(r"^([a-z]+)(?:\(([^)]*)\))?!?: (.+)$")
SEMVER = re.compile(r"^v?(\d+)(?:\.(\d+))*$")
DASHES = re.compile("[‐-―−]")
TRACKER_TRAILER = re.compile(r"\s*\[[A-Z]+-\d+(?:[\s,/]+(?:[A-Z]+-)?\d+)*\]")
PR_TRAILER = re.compile(r"\s*\(#\d+\)")
MD_SPECIAL = re.compile(r"([\\*_\[\]<>~|&])")
FLAG_TOKEN = re.compile(r"(?<!\S)(--[A-Za-z][\w-]*)")


def log(msg):
    print(msg, file=sys.stderr)


class ApiError(Exception):
    pass


def http_json(url, headers, retries=3, timeout=30):
    """GET url, return (json, headers). Retries on network errors and 5xx."""
    last = None
    for attempt in range(retries):
        req = urllib.request.Request(url, headers=headers)
        try:
            with urllib.request.urlopen(req, timeout=timeout) as resp:
                return json.loads(resp.read().decode("utf-8")), dict(resp.headers)
        except urllib.error.HTTPError as exc:
            if exc.code in (401, 403, 404, 422):
                raise ApiError(f"HTTP {exc.code} for {url}") from None
            last = f"HTTP {exc.code} for {url}"
        except (urllib.error.URLError, TimeoutError, OSError) as exc:
            last = f"{exc} for {url}"
        time.sleep(2 * (2 ** attempt))
    raise ApiError(f"gave up after {retries} attempts: {last}")


def gitlab_get(token, path, params=None):
    query = "?" + urllib.parse.urlencode(params) if params else ""
    return http_json(API + path + query, {"PRIVATE-TOKEN": token})


def gitlab_paginate(token, path, params):
    items = []
    page = 1
    while True:
        chunk, _ = gitlab_get(token, path, dict(params, per_page=100, page=page))
        if not chunk:
            return items
        items.extend(chunk)
        page += 1


def semver_key(name):
    match = SEMVER.match(name)
    return tuple(int(part) for part in name.lstrip("v").split(".")) if match else None


def list_tags(token, repo):
    pattern = re.compile(repo["tag_pattern"])
    tags = []
    for tag in gitlab_paginate(token, f"/projects/{repo['project']}/repository/tags", {}):
        if not pattern.match(tag["name"]):
            continue
        commit = tag["commit"]
        tags.append({
            "name": tag["name"],
            "sha": commit["id"],
            "date": commit["committed_date"][:10],
        })
    if tags and all(semver_key(t["name"]) for t in tags):
        tags.sort(key=lambda t: semver_key(t["name"]))
    else:
        tags.sort(key=lambda t: (t["date"], t["name"]))
    return tags


def list_commits(token, repo, ref_range):
    return gitlab_paginate(
        token,
        f"/projects/{repo['project']}/repository/commits",
        {"ref_name": ref_range},
    )


def parse_subject(title):
    """Return (type, scope, description) or None for commits to ignore."""
    title = title.strip()
    if title.startswith(SKIP_PREFIXES):
        return None
    match = CONVENTIONAL.match(title)
    if not match:
        return ("other", None, title)
    ctype, scope, desc = match.group(1), match.group(2), match.group(3)
    if ctype == "chore":
        return None
    return (ctype, (scope or "").strip() or None, desc)


def apply_outside_code(text, func):
    """Apply func to the parts of text that are not inside backtick spans."""
    if text.count("`") % 2 == 1:
        text = text.replace("`", "\\`")
    parts = text.split("`")
    for i in range(0, len(parts), 2):
        parts[i] = func(parts[i])
    return "`".join(parts)


def escape_markdown(segment):
    segment = MD_SPECIAL.sub(r"\\\1", segment)
    segment = FLAG_TOKEN.sub(r"`\1`", segment)
    return segment


def collapse_double_hyphens(segment):
    return re.sub(r"-{2,}", "-", segment)


def clean_text(text):
    text = TRACKER_TRAILER.sub("", text)
    text = PR_TRAILER.sub("", text)
    text = re.sub(r"\s*[—―]\s*", ": ", text)
    text = re.sub(r"\s+–\s+", ": ", text)
    text = DASHES.sub("-", text)
    text = re.sub(r"\s+", " ", text).strip().rstrip(".").strip()
    text = apply_outside_code(text, escape_markdown)
    text = apply_outside_code(text, collapse_double_hyphens)
    # A bullet whose text starts like a list marker would nest a list.
    text = re.sub(r"^(\d+)([.)])(\s)", r"\1\\\2\3", text)
    text = re.sub(r"^([-+])(\s)", r"\\\1\2", text)
    return text


def render_bullet(repo, commit, scope, desc):
    sha = commit["id"]
    url = f"https://github.com/{repo['github']}/commit/{sha}"
    text = clean_text(desc)
    if scope:
        text = f"**{clean_text(scope)}**: {text}"
    return f"- {text} ([{sha[:8]}]({url}))"


def render_section(repo, heading, commits, empty_line):
    lines = [f"## {heading}", ""]
    grouped = {ctype: [] for ctype in repo["types"]}
    other = 0
    for commit in commits:
        parsed = parse_subject(commit["title"])
        if parsed is None:
            continue
        ctype, scope, desc = parsed
        if ctype in grouped:
            grouped[ctype].append(render_bullet(repo, commit, scope, desc))
        else:
            other += 1
    listed = sum(len(v) for v in grouped.values())
    if listed == 0:
        if commits:
            lines.append(f"No user-facing changes ({other} commits of other types).")
        else:
            lines.append(empty_line)
        lines.append("")
        return lines, 0
    for ctype in repo["types"]:
        if grouped[ctype]:
            lines.append(f"### {TYPE_LABELS.get(ctype, ctype.title())}")
            lines.append("")
            lines.extend(grouped[ctype])
            lines.append("")
    return lines, listed


def newest_listed_date(repo, commits):
    for commit in commits:
        parsed = parse_subject(commit["title"])
        if parsed and parsed[0] in repo["types"]:
            return commit["committed_date"][:10]
    return None


def generate_block(token, repo):
    tags = list_tags(token, repo)
    blocks = []
    summary = []

    last = tags[-1] if tags else None
    unreleased_range = f"{last['name']}..main" if last else "main"
    unreleased = list_commits(token, repo, unreleased_range)
    date = newest_listed_date(repo, unreleased)
    heading = f"Unreleased (main, last change {date})" if date else "Unreleased (main)"
    lines, count = render_section(repo, heading, unreleased, "No unreleased changes.")
    blocks.append(lines)
    summary.append(f"Unreleased {count} bullets / {len(unreleased)} commits")

    previous = None
    tag_blocks = []
    for tag in tags:
        ref_range = f"{previous['name']}..{tag['name']}" if previous else tag["name"]
        commits = list_commits(token, repo, ref_range)
        heading = f"{tag['name']} ({tag['date']})"
        if not commits and previous and previous["sha"] == tag["sha"]:
            lines = [f"## {heading}", "", f"Same sources as {previous['name']}.", ""]
            count = 0
        else:
            lines, count = render_section(repo, heading, commits, "No changes.")
        tag_blocks.append(lines)
        summary.append(f"{tag['name']} {count} bullets / {len(commits)} commits")
        previous = tag
    blocks.extend(reversed(tag_blocks))

    out = []
    for lines in blocks:
        out.extend(lines)
    while out and out[-1] == "":
        out.pop()
    log(f"{repo['key']}: " + "; ".join(summary))
    return "\n".join(out) + "\n"


def splice(content, block, path):
    begin = content.count(BEGIN)
    end = content.count(END)
    if begin != 1 or end != 1:
        raise SystemExit(f"{path}: expected exactly one begin and one end marker, found {begin}/{end}")
    head, rest = content.split(BEGIN, 1)
    _, tail = rest.split(END, 1)
    return f"{head}{BEGIN}\n{block}{END}{tail}"


def check_file(path):
    problems = []
    with open(path, encoding="utf-8") as handle:
        for number, line in enumerate(handle, 1):
            if DASHES.search(line):
                problems.append(f"{path}:{number}: em/en dash: {line.rstrip()}")
            if line.rstrip() == "---" or "<!--" in line:
                continue  # frontmatter fence and the generated:* markers
            stripped = apply_outside_code(line.rstrip("\n"), lambda s: s)
            outside = "".join(stripped.split("`")[0::2])
            if "--" in outside:
                problems.append(f"{path}:{number}: double hyphen outside code: {line.rstrip()}")
    return problems


def verify_mirror(token, repos):
    github_headers = {"Accept": "application/vnd.github+json", "User-Agent": "meshsat-changelog"}
    if os.environ.get("GITHUB_TOKEN"):
        github_headers["Authorization"] = "Bearer " + os.environ["GITHUB_TOKEN"]
    for repo in repos:
        gitlab_sha = gitlab_get(token, f"/projects/{repo['project']}/repository/branches/main")[0]["commit"]["id"]
        for attempt in range(12):
            github_sha = http_json(f"{GITHUB_API}/repos/{repo['github']}/branches/main", github_headers)[0]["commit"]["sha"]
            if github_sha == gitlab_sha:
                log(f"{repo['key']}: mirror in sync at {gitlab_sha[:8]}")
                break
            log(f"{repo['key']}: mirror lags (gitlab {gitlab_sha[:8]}, github {github_sha[:8]}), waiting")
            time.sleep(30)
        else:
            raise ApiError(f"{repo['key']}: GitHub mirror still behind GitLab after 6 minutes; refusing to write links that would 404")


def main():
    parser = argparse.ArgumentParser(description=__doc__.split("\n\n")[0])
    parser.add_argument("--dry-run", action="store_true", help="print a unified diff, write nothing")
    parser.add_argument("--check", action="store_true", help="after generating, fail on em/en dashes or double hyphens in the content files")
    parser.add_argument("--verify-mirror", action="store_true", help="refuse to run while a GitHub mirror is behind GitLab main")
    parser.add_argument("--only", action="append", help="limit to one repo key (repeatable)")
    parser.add_argument("--root", default=REPO_ROOT, help="repository root (default: parent of scripts/)")
    args = parser.parse_args()

    token = os.environ.get("GITLAB_TOKEN")
    if not token:
        log("GITLAB_TOKEN is not set")
        return 1
    repos = [r for r in REPOS if not args.only or r["key"] in args.only]
    if not repos:
        log("no repo matches --only")
        return 1

    try:
        if args.verify_mirror:
            verify_mirror(token, repos)
        changed = []
        for repo in repos:
            path = os.path.join(args.root, repo["path"])
            with open(path, encoding="utf-8") as handle:
                current = handle.read()
            block = generate_block(token, repo)
            updated = splice(current, block, path)
            if updated == current:
                log(f"{repo['key']}: unchanged")
                continue
            changed.append(repo["key"])
            if args.dry_run:
                sys.stdout.writelines(difflib.unified_diff(
                    current.splitlines(keepends=True), updated.splitlines(keepends=True),
                    fromfile=repo["path"], tofile=repo["path"] + " (generated)"))
            else:
                with open(path, "w", encoding="utf-8") as handle:
                    handle.write(updated)
                log(f"{repo['key']}: written")
    except ApiError as exc:
        log(f"error: {exc}")
        return 1

    if args.check and not args.dry_run:
        problems = []
        for repo in repos:
            problems.extend(check_file(os.path.join(args.root, repo["path"])))
        if problems:
            for problem in problems:
                log(problem)
            log(f"check failed: {len(problems)} problem(s)")
            return 2
        log("check passed: no em/en dashes, no double hyphens outside code")

    log("changed: " + (", ".join(changed) if changed else "nothing"))
    return 0


if __name__ == "__main__":
    sys.exit(main())
