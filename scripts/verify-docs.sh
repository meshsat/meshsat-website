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
    # Images and other files are served from docs/public (absolute) or sit next to the page.
    case "$t" in
      *.png|*.jpg|*.jpeg|*.webp|*.svg|*.gif|*.pdf)
        case "$t" in
          /*) f="$D/public/${t#/}" ;;
          *)  f="$(dirname "$src")/$t" ;;
        esac
        N=$((N+1))
        if [ ! -f "$f" ]; then
          fail "$src links to $target, a file that does not exist"
          BAD=$((BAD+1))
        fi
        continue ;;
    esac
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

echo "=== 4. house style: em and en dashes in the docs (report; blocks once MESHSAT-1253 is done) ==="
# The site's gate has refused dashes since MESHSAT-853; the docs still carry
# them on six pages (MESHSAT-1253). Reported here so the number only goes down;
# switch DASH_BLOCKS to 1 when it reaches zero.
DASH_BLOCKS=0
DASHED=0
while IFS= read -r f; do
  N=$( { grep -o -e '—' -e '–' "$f" || true; } | wc -l | tr -d ' ' )
  if [ "$N" -gt 0 ]; then
    DASHED=$((DASHED+1))
    if [ "$DASH_BLOCKS" -eq 1 ]; then fail "$N em/en dash(es) in ${f#$D/}"; else echo "  [warn] $N em/en dash(es) in ${f#$D/}"; fi
  fi
done < <(find "$D" -name '*.md' -not -path "*/node_modules/*" -not -path "*/.vitepress/*" | sort)
[ "$DASHED" -eq 0 ] && pass "no em or en dashes in the docs"

echo "=== 5. every page is reachable from the navigation or another page (report) ==="
ORPHANS=0
while IFS= read -r f; do
  rel="/${f#$D/}"; rel="${rel%.md}"
  case "$rel" in /index) continue ;; esac
  short="${rel%/index}"
  if grep -qE "link: '($rel|$short/|$short|$rel\.html)'" "$CFG" 2>/dev/null; then continue; fi
  if grep -rqE "\]\(($rel|$short/|$short|$rel\.html)[)#]" "$D" --include='*.md' 2>/dev/null; then continue; fi
  echo "  [warn] ${f#$D/} is linked from no sidebar, nav or page"; ORPHANS=$((ORPHANS+1))
done < <(find "$D" -name '*.md' -not -path "*/node_modules/*" -not -path "*/.vitepress/*" | sort)
[ "$ORPHANS" -eq 0 ] && pass "every page is linked from somewhere"

echo "=== 6. pages with their own description (report) ==="
# A page without one ships the site's generic sentence as its meta description
# and social preview (MESHSAT-1614). Count only; add them page by page.
TOTAL=0; WITH=0
while IFS= read -r f; do
  TOTAL=$((TOTAL+1))
  if head -12 "$f" | grep -q '^description:'; then WITH=$((WITH+1)); fi
done < <(find "$D" -name '*.md' -not -path "*/node_modules/*" -not -path "*/.vitepress/*")
echo "  [info] $WITH of $TOTAL pages carry a description"

echo
if [ "$FAIL" -eq 0 ]; then echo "verify-docs: PASSED"; else echo "verify-docs: FAILED"; fi
exit $FAIL
