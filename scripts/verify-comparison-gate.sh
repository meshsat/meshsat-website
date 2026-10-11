#!/usr/bin/env bash
# The named comparison on shop.meshsat.net renders only when BOTH its switch
# (comparison_published in shop/hugo.yaml) and an approved review record
# (shop/data/comparison.yaml) allow it; the owner's corrective brief of
# 11 Oct 2026 (MESHSAT-1517). This builds the shop seven times from a scratch
# copy with a placeholder record (scripts/testdata/comparison-fixture.yaml)
# and checks that the section appears in exactly one of them, with only the
# verified rows. Needs hugo. Usage: scripts/verify-comparison-gate.sh
set -uo pipefail
ROOT="$(cd "$(dirname "$0")/.." && pwd)"
FIX="$ROOT/scripts/testdata/comparison-fixture.yaml"
WORK="$(mktemp -d)"
trap 'rm -rf "$WORK"' EXIT
FAIL=0
fail() { echo "  [FAIL] $*"; FAIL=1; }
pass() { echo "  [ok]   $*"; }

cp -r "$ROOT/shop" "$WORK/shop"
rm -rf "$WORK/shop/public" "$WORK/shop/resources" "$WORK/shop/data"
mkdir -p "$WORK/site/static/images" "$WORK/site/static/.well-known"
cp -r "$ROOT/site/static/fonts" "$WORK/site/static/fonts"
for f in images/meshsat-mark-dark.png images/meshsat-mark-light.png images/og-image.jpg images/video-poster.jpg favicon.svg apple-touch-icon.png .well-known/security.txt; do
  cp "$ROOT/site/static/$f" "$WORK/site/static/$f"
done
grep -q '^  comparison_published: "off"' "$WORK/shop/hugo.yaml" || fail "shop/hugo.yaml does not carry comparison_published: \"off\" (the default must be off)"

build() {
  local name="$1" switch="$2" filter="$3"
  rm -rf "$WORK/shop/data"
  sed -i "s/^  comparison_published: \".*\"/  comparison_published: \"$switch\"/" "$WORK/shop/hugo.yaml"
  if [ -n "$filter" ]; then
    mkdir -p "$WORK/shop/data"
    sed "$filter" "$FIX" > "$WORK/shop/data/comparison.yaml"
  fi
  if ! hugo -s "$WORK/shop" -d "$WORK/out-$name" > "$WORK/log-$name" 2>&1; then
    fail "$name: hugo failed: $(grep -i -m1 error "$WORK/log-$name")"
    return 1
  fi
}
absent() {
  local name="$1"
  [ -f "$WORK/out-$name/index.html" ] || return 0
  if grep -q 'team-setup-comparison' "$WORK/out-$name/index.html"; then fail "$name: the comparison section is in the build"
  else pass "$name: no comparison section"; fi
}
warned() {
  local name="$1"
  if grep -q 'nothing is published' "$WORK/log-$name"; then pass "$name: the build log says why"
  else fail "$name: no warning in the build log"; fi
}

echo "=== comparison gate: the section is absent unless the switch AND the record allow it ==="
build off-nodata off "" && absent off-nodata
build on-nodata on "" && { absent on-nodata; warned on-nodata; }
build on-pending on 's/^  status: approved/  status: pending/' && { absent on-pending; warned on-pending; }
build on-version on 's/approved_content_version: "fixture-1"/approved_content_version: "fixture-0"/' && { absent on-version; warned on-version; }
build on-expired on 's/valid_until: "2099-01-01"/valid_until: "2020-01-01"/' && { absent on-expired; warned on-expired; }
build off-approved off 'p;d' && absent off-approved
if build on-approved on 'p;d'; then
  H="$WORK/out-on-approved/index.html"
  if grep -q 'team-setup-comparison' "$H"; then pass "on-approved: the comparison section renders"; else fail "on-approved: the section did not render"; fi
  grep -q 'Example messenger' "$H" && pass "on-approved: the competitor name comes from the record" || fail "on-approved: competitor name missing"
  grep -q 'CONFLICTING-ROW-MARKER' "$H" && fail "on-approved: a row that is not verified rendered" || pass "on-approved: the conflicting row is left out"
  grep -q 'UNVERIFIED-SCENARIO-MARKER' "$H" && fail "on-approved: a scenario that is not verified rendered" || pass "on-approved: the unverified scenario is left out"
  for t in 'MeshSat costs less in this scenario.' 'MeshSat costs more in this scenario.' 'The two cost about the same in this scenario.'; do
    grep -q "$t" "$H" && pass "on-approved: outcome '$t'" || fail "on-approved: outcome sentence missing: $t"
  done
  grep -q 'planned regular price of €1.800' "$H" && pass "on-approved: the baseline comes from the record" || fail "on-approved: baseline missing"
  grep -q 'Fixture attribution line.' "$H" && pass "on-approved: the attribution line renders" || fail "on-approved: attribution missing"
fi
grep -q 'team-setup-comparison' "$WORK/out-off-nodata/index.html" 2>/dev/null && fail "default build carries the section"
echo
if [ "$FAIL" -eq 0 ]; then echo "verify-comparison-gate: PASSED"; else echo "verify-comparison-gate: FAILED"; fi
exit $FAIL
