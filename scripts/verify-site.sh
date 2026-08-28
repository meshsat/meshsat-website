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

echo "=== 3. house style: no em or en dashes in rendered text ==="
for f in "$PUB/index.html" "$PUB"/{nl,de,fr,el}/index.html; do
  [ -f "$f" ] || continue
  N=$(python3 - "$f" <<'PY'
import re,sys,html
s=open(sys.argv[1],encoding='utf-8').read()
s=re.sub(r'<(script|style)[^>]*>.*?</\1>','',s,flags=re.S)
t=html.unescape(re.sub(r'<[^>]+>',' ',s))
print(t.count('—')+t.count('–'))
PY
)
  [ "$N" -eq 0 ] && pass "no em/en dashes in ${f#$PUB/}" \
    || fail "$N em/en dash(es) in ${f#$PUB/}"
done

echo "=== 4. i18n key parity ==="
# A key missing from one catalogue falls back to English SILENTLY, which is the
# worst failure mode on the site: it looks fine and is simply wrong.
if python3 - <<'PY'
import io,os,sys
d='site/i18n'
keys={f.split('.')[0]:{l.split(':')[0] for l in io.open(os.path.join(d,f),encoding='utf-8')
      if l and not l.startswith(' ') and ':' in l} for f in sorted(os.listdir(d))}
base=keys.get('en',set()); bad=False
for c,k in sorted(keys.items()):
    miss,extra=base-k,k-base
    if miss or extra:
        bad=True; print(f"  [FAIL] {c}: missing={sorted(miss)[:5]} extra={sorted(extra)[:5]}")
    else:
        print(f"  [ok]   {c}: {len(k)} keys match en")
sys.exit(1 if bad else 0)
PY
then :; else FAIL=1; fi

echo
if [ "$FAIL" -eq 0 ]; then echo "verify-site: PASSED"; else echo "verify-site: FAILED"; fi
exit $FAIL
