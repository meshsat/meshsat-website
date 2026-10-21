#!/usr/bin/env bash
# Content and correctness gates for meshsat.net.
#
# Added after get.meshsat.net was found serving an unrelated site for months
# (MESHSAT-724). The site was being tested for how it LOOKS in 40 theme/
# language/viewport combinations while nothing tested whether its own
# instructions work, or whether its claims still match the README.
#
# Usage: scripts/verify-site.sh [built-site-dir]   (default: site/public)
#        The shop's checks moved with the shop into meshsat-shop (MESHSAT-1523).
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
# /security/ and its four translations are standalone pages like the changelog
# children, so they are named explicitly: the changelog tabs sat outside this
# scan and carried em dashes for months before anyone noticed.
# Since 21 Oct 2026 (MESHSAT-1615) the scan covers EVERY built page, so a new
# page can never sit outside it the way the changelog children once did.
CLEAN=0
while IFS= read -r f; do
  N=$( { grep -o -e '—' -e '–' "$f" || true; } | wc -l | tr -d ' ' )
  if [ "$N" -eq 0 ]; then CLEAN=$((CLEAN+1))
  else
    fail "$N em/en dash(es) in ${f#$PUB/}"
    { grep -o -e '.\{0,60\}—.\{0,40\}' -e '.\{0,60\}–.\{0,40\}' "$f" || true; } | head -3 | sed 's/^/         /'
  fi
done < <(find "$PUB" -name '*.html' | sort)
pass "$CLEAN page(s) without em or en dashes"


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

echo "=== 5. changelog tabs are generated and non-empty ==="
# The five product pages are rewritten by scripts/generate-changelog.py; an empty
# generated block (API failure, bad markers) must not reach production.
for t in bridge hub android ios fieldkit; do
  f="$PUB/changelog/$t/index.html"
  if [ ! -f "$f" ]; then fail "changelog/$t/index.html missing"; continue; fi
  N=$(grep -o '<h2' "$f" | wc -l | tr -d ' ')
  if [ "$N" -ge 1 ]; then pass "changelog/$t: $N section heading(s)"; else fail "changelog/$t: no section headings"; fi
done

echo "=== 6. MSC-3 translated concept framing ==="
for lang in en nl de fr el; do
  prefix="$lang/"; [ "$lang" = en ] && prefix=""
  IG="$PUB/${prefix}integrators/index.html"
  if [ ! -f "$IG" ]; then fail "${prefix}integrators/index.html missing"; continue; fi
  case "$lang" in
    en) notice='Research and development stage concept devices our team is testing.'; evaluation='Under evaluation'; amateur='Amateur radio only.'; encryption='No encryption.'; license='Licensed per site.' ;;
    nl) notice='Conceptapparaten in de onderzoeks- en ontwikkelingsfase die ons team test.'; evaluation='In evaluatie'; amateur='Uitsluitend amateurradio.'; encryption='Geen versleuteling.'; license='Vergunning per locatie.' ;;
    de) notice='Konzeptgeräte in der Forschungs- und Entwicklungsphase, die unser Team testet.'; evaluation='In Evaluierung'; amateur='Nur Amateurfunk.'; encryption='Keine Verschlüsselung.'; license='Standortbezogene Lizenz erforderlich.' ;;
    fr) notice='Des appareils conceptuels au stade de la recherche et du développement, testés par notre équipe.'; evaluation="En cours d'évaluation"; amateur='Radioamateur uniquement.'; encryption='Aucun chiffrement.'; license='Autorisation propre à chaque site.' ;;
    el) notice='Πρόκειται για συσκευές σε στάδιο έρευνας και ανάπτυξης'; evaluation='Υπό αξιολόγηση'; amateur='Μόνο για ραδιοερασιτεχνική χρήση.'; encryption='Χωρίς κρυπτογράφηση.'; license='Αδειοδότηση ανά τοποθεσία.' ;;
  esac
  for phrase in "$notice" 'FUTURE PLAN' "$evaluation" "$amateur" "$encryption" "$license"; do
    if ! grep -Fq "$phrase" "$IG"; then fail "$lang integrators: missing $phrase"; fi
  done
  if grep -Eiq '\b(available|ordered|planned)\b' "$IG"; then fail "$lang integrators: forbidden product-stage wording"; fi
  for alternate in en nl de fr el x-default; do
    alt_prefix="$alternate/"
    case "$alternate" in en|x-default) alt_prefix="" ;; esac
    if ! grep -Eq "<link[^>]+hreflang=[\"]?$alternate[\"]? href=[\"]?https://meshsat.net/${alt_prefix}integrators/" "$IG"; then
      fail "$lang integrators: missing $alternate alternate"
    fi
  done
  if grep -Eq 'groundcontrol-logo|sidnfonds-woordmerk|colophon-sidn' "$IG"; then fail "$lang integrators: support logos imply endorsement"; fi
  if grep -Eq '\big_[a-z0-9_]+\b' "$IG"; then fail "$lang integrators: unresolved translation key"; fi
  pass "$lang integrators: translated framing and alternate-page checks completed"
done

echo "=== 7. every root-relative link and source resolves to a built file ==="
# A href="/x/" or src="/images/y.webp" must exist in the build: a renamed image
# (immutable cache, new names on purpose) or a moved page otherwise ships as a
# 404 that only a crawler notices. Fragments and query strings are dropped;
# /x resolves as a file, a directory index or x.html. External URLs are not ours
# to police. Pure shell (MESHSAT-1615).
MISSING=0; CHECKED=0
TMP=$(mktemp)
grep -ohE '(href|src)=["'"'"']?/[^"'"'"' >#?]*' "$PUB"/*.html "$PUB"/*/*.html "$PUB"/*/*/*.html 2>/dev/null \
  | sed -E 's/^(href|src)=["'"'"']?//' | grep -v '^//' | sort -u > "$TMP"
while IFS= read -r u; do
  [ -z "$u" ] && continue
  CHECKED=$((CHECKED+1))
  p="$PUB/${u#/}"
  if [ -f "$p" ] || [ -f "$p/index.html" ] || [ -f "${p%/}.html" ]; then continue; fi
  fail "link target $u exists in no built file"; MISSING=$((MISSING+1))
done < "$TMP"
rm -f "$TMP"
[ "$MISSING" -eq 0 ] && pass "$CHECKED distinct internal targets all resolve"

echo "=== 8. every image carries an alt attribute ==="
# Hugo's minifier writes an empty alt as a bare attribute, so both forms count.
NOALT=$( { grep -ohE '<img [^>]*>' "$PUB"/*.html "$PUB"/*/*.html "$PUB"/*/*/*.html 2>/dev/null || true; } | grep -vE ' alt(=|>| )' | wc -l | tr -d ' ' )
if [ "$NOALT" -eq 0 ]; then pass "every <img> has an alt attribute"
else
  fail "$NOALT <img> element(s) without alt"
  { grep -ohE '<img [^>]*>' "$PUB"/*.html "$PUB"/*/*.html "$PUB"/*/*/*.html 2>/dev/null || true; } | grep -vE ' alt(=|>| )' | head -3 | sed 's/^/         /'
fi

echo
if [ "$FAIL" -eq 0 ]; then echo "verify-site: PASSED"; else echo "verify-site: FAILED"; fi
exit $FAIL
