#!/usr/bin/env bash
# Proves the linter catches the banned cream+purple card fixture.
# Copies the .sample fixture to a real .tsx, runs the check,
# asserts it exits non-zero, then cleans up.
set -u
cd "$(dirname "$0")/.."
FIX_SRC="scripts/fixtures/BannedCard.tsx.sample"
FIX_DST="my-app/src/components/__aurora_test__BannedCard.tsx"
cp "$FIX_SRC" "$FIX_DST"
trap 'rm -f "$FIX_DST"' EXIT
if node scripts/check-aurora.mjs >/tmp/aurora-lint-out 2>&1; then
  echo "✗ linter FAILED to catch banned card"
  cat /tmp/aurora-lint-out
  exit 1
fi
echo "✓ linter correctly rejected banned card fixture"
grep -E 'FORBIDDEN_HEX|FORBIDDEN_FONT|RAW_HEX|CARD_FORBIDDEN_BG|CTA_BRAND_BG|CTA_CASE_OVERRIDE|FORBIDDEN_RGB' /tmp/aurora-lint-out | head -15
