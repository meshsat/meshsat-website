#!/usr/bin/env bash
# Content gates for docs.meshsat.net.
#
# The docs had no gate at all while the Hugo site had verify-site.sh, which is
# how a sidebar entry pointing at a page that does not exist (/api/websocket)
# shipped and rendered a 404 link on every page of the site for months.
#
# Pure shell on purpose, same as verify-site.sh: the Hugo/Node runner images
# cannot be relied on for python, and a browser in a job that gates deploys is a
# flakiness risk. No network: external links are deliberately not checked,
# because a third-party outage that reddens the pipeline trains people to ignore
# it.
#
# Usage: scripts/verify-docs.sh [docs-dir]     (default: docs)
set -uo pipefail
D="${1:-docs}"
CFG="$D/.vitepress/config.ts"
FAIL=0
fail() { echo "  [FAIL] $*"; FAIL=1; }
pass() { echo "  [ok]   $*"; }

# Map a site path to the markdown file VitePress would render.
resolve() {
  case "$1" in
    */) echo "$D/${1#/}index.md" ;;
    *)  echo "$D/${1#/}.md" ;;
  esac
}

echo "=== 1. every nav and sidebar link resolves to a page ==="
[ -f "$CFG" ] || { fail "$CFG not found"; echo; echo "verify-docs: FAILED"; exit 1; }
N=0; BAD=0
while IFS= read -r link; do
  case "$link" in http*|"") continue ;; esac          # external links are not ours to police
  N=$((N+1))
  f=$(resolve "$link")
  [ -f "$f" ] || { fail "config link $link -> $f does not exist"; BAD=$((BAD+1)); }
done < <(grep -oE "link: '[^']*'" "$CFG" | sed "s/link: '//; s/'$//")
[ "$BAD" -eq 0 ] && pass "$N internal config links all resolve"

echo "=== 2. relative markdown links resolve ==="
N=0; BAD=0
while IFS= read -r src; do
  while IFS= read -r target; do
    case "$target" in http*|mailto:*|"#"*|"") continue ;; esac
    t="${target%%#*}"                                  # drop any anchor
    [ -z "$t" ] && continue
    case "$t" in
      /*) f=$(resolve "$t") ;;
      *)  d=$(dirname "$src"); f="$d/$t"
          case "$f" in */) f="${f}index.md" ;; esac
          [ -f "$f" ] || [ -f "${f%.md}.md" ] || f="${f}.md" ;;
    esac
    N=$((N+1))
    if [ ! -f "$f" ] && [ ! -f "${f%/}/index.md" ]; then
      fail "$src links to $target which resolves to no page"
      BAD=$((BAD+1))
    fi
  done < <(grep -oE '\]\([^)]+\)' "$src" | sed 's/^](//; s/)$//')
done < <(find "$D" -name '*.md' -not -path "*/node_modules/*" -not -path "*/.vitepress/dist/*")
[ "$BAD" -eq 0 ] && pass "$N internal markdown links all resolve"

echo "=== 3. no page claims the docs cover only one product ==="
# The Hub is a paid hosted product now. A line scoping the whole corpus to the
# Bridge sent every Hub reader away, and the homepage sold "no subscription"
# against a subscription we charge for.
if grep -rqi "no subscription" "$D" --include='*.md' 2>/dev/null; then
  fail "a page still markets 'no subscription' while the Hub is a paid service"
else
  pass "no 'no subscription' claim"
fi

echo
if [ "$FAIL" -eq 0 ]; then echo "verify-docs: PASSED"; else echo "verify-docs: FAILED"; fi
exit $FAIL
