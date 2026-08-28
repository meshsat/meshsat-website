#!/usr/bin/env bash
# Content and correctness gates for meshsat.net.
#
# Added after get.meshsat.net was found serving an unrelated site for months
# (MESHSAT-724). The site was being tested for how it LOOKS in 40 theme/
# language/viewport combinations while nothing tested whether its own
# instructions work, or whether its claims still match the README.
#
# Usage: scripts/verify-site.sh [built-site-dir]   (default: site/public)
set -uo pipefail
PUB="${1:-site/public}"
FAIL=0
fail() { echo "  [FAIL] $*"; FAIL=1; }
pass() { echo "  [ok]   $*"; }

echo "=== 1. install.sh parses as shell ==="
if bash -n install/install.sh 2>/dev/null; then
  pass "install/install.sh is valid bash"
else
  fail "install/install.sh does not parse; the documented install path would break"
fi

echo "=== 2. honest status vocabulary ==="
# The README states nothing has been deployed to a real user. The site must not
# contradict that with 'Stable' badges. This drifted once already.
if [ -f "$PUB/index.html" ]; then
  N=$(grep -o '>Stable<' "$PUB/index.html" 2>/dev/null | wc -l | tr -d ' ')
  [ "$N" -eq 0 ] && pass "no 'Stable' badges" \
    || fail "$N 'Stable' badge(s); use the README's vocabulary instead"
else
  fail "$PUB/index.html not found; did the build run?"
fi

echo "=== 3. house style: no em or en dashes anywhere in the built HTML ==="
# Scans the RAW html, meta tags included. Tag-stripping would have hidden a stale
# og:title carrying both the old slogan and an em dash, which is exactly the class
# of bug this is meant to catch. No python here: the Hugo runner has none.
for f in "$PUB/index.html" "$PUB"/nl/index.html "$PUB"/de/index.html "$PUB"/fr/index.html "$PUB"/el/index.html; do
  [ -f "$f" ] || continue
  N=$( { grep -o -e '—' -e '–' "$f" || true; } | wc -l | tr -d ' ' )
  if [ "$N" -eq 0 ]; then pass "no em/en dashes in ${f#$PUB/}"
  else
    fail "$N em/en dash(es) in ${f#$PUB/}"
    { grep -o -e '.\{0,60\}—.\{0,40\}' -e '.\{0,60\}–.\{0,40\}' "$f" || true; } | head -3 | sed 's/^/         /'
  fi
done

echo "=== 4. i18n key parity ==="
# A key missing from one catalogue falls back to English SILENTLY: the page looks
# fine and is simply wrong. Pure shell, no python (the Hugo runner has none).
keys_of() { grep -v '^[[:space:]]' "$1" | grep ':' | cut -d: -f1 | sort -u; }
BASE=$(mktemp); keys_of site/i18n/en.yaml > "$BASE"
for f in site/i18n/*.yaml; do
  c=$(basename "$f" .yaml)
  CUR=$(mktemp); keys_of "$f" > "$CUR"
  MISS=$(comm -23 "$BASE" "$CUR" | tr '\n' ' ')
  EXTRA=$(comm -13 "$BASE" "$CUR" | tr '\n' ' ')
  if [ -z "$MISS" ] && [ -z "$EXTRA" ]; then
    pass "$c: $(wc -l < "$CUR" | tr -d ' ') keys match en"
  else
    fail "$c: missing=[$MISS] extra=[$EXTRA]"
  fi
  rm -f "$CUR"
done
rm -f "$BASE"

echo
if [ "$FAIL" -eq 0 ]; then echo "verify-site: PASSED"; else echo "verify-site: FAILED"; fi
exit $FAIL
