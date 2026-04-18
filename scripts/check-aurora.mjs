#!/usr/bin/env node
/**
 * Aurora compliance check.
 *
 * Scans the reference app (my-app/src) for violations of aurora.policy.json.
 * Exits 1 on any finding so CI / pre-commit hooks can gate merges.
 *
 * Run:   node scripts/check-aurora.mjs
 *        npm run aurora:check
 *
 * Escape hatch: add `// ok:hex` at end of a line to intentionally allow a hex.
 *               add `// ok:font` to allow a font family literal on that line.
 */
import { readFileSync, readdirSync, statSync } from "node:fs";
import { join, extname } from "node:path";
import { fileURLToPath } from "node:url";

const ROOT = fileURLToPath(new URL("..", import.meta.url));
const policy = JSON.parse(readFileSync(join(ROOT, "aurora.policy.json"), "utf8"));

const SCAN_ROOTS = ["my-app/src"];
const SKIP_DIRS = new Set(["node_modules", "dist", "build", ".vite", "assets", "styles"]);
const EXT_OK = new Set([".tsx", ".ts", ".jsx", ".js", ".css", ".mdx"]);

function walk(dir, files = []) {
  const s = statSync(dir, { throwIfNoEntry: false });
  if (!s) return files;
  if (s.isFile()) { files.push(dir); return files; }
  if (!s.isDirectory()) return files;
  for (const name of readdirSync(dir)) {
    if (SKIP_DIRS.has(name)) continue;
    const p = join(dir, name);
    const st = statSync(p);
    if (st.isDirectory()) walk(p, files);
    else if (EXT_OK.has(extname(name))) files.push(p);
  }
  return files;
}

const files = SCAN_ROOTS.flatMap((d) => walk(join(ROOT, d)));

const violations = [];
const push = (file, line, code, msg) =>
  violations.push({ file: file.replace(ROOT + "/", ""), line, code, msg });

// Pre-compute hex → flag map so one line doesn't repeat reports
const forbiddenHex = new Set();
for (const family of Object.values(policy.forbidden_hex_families || {})) {
  for (const h of family) forbiddenHex.add(h.toLowerCase());
}

// Hex → rgb() helpers for catching rgb(244, 240, 230)-style cream bgs
const hexToRgbTriples = (hex) => {
  const h = hex.replace("#", "");
  return [parseInt(h.slice(0, 2), 16), parseInt(h.slice(2, 4), 16), parseInt(h.slice(4, 6), 16)];
};
const forbiddenRgb = [...forbiddenHex].map((hex) => hexToRgbTriples(hex));
const rgbMatchesForbidden = (r, g, b) =>
  forbiddenRgb.some(([fr, fg, fb]) => Math.abs(r - fr) <= 4 && Math.abs(g - fg) <= 4 && Math.abs(b - fb) <= 4);

for (const file of files) {
  const src = readFileSync(file, "utf8");
  const isCss = /\.css$/.test(file);
  const isComponent = /\.(t|j)sx?$/.test(file);

  src.split("\n").forEach((ln, i) => {
    const line = i + 1;
    const hasHexAllow = /\/\/\s*ok:hex/.test(ln) || /\/\*\s*ok:hex\s*\*\//.test(ln);
    const hasFontAllow = /\/\/\s*ok:font/.test(ln) || /\/\*\s*ok:font\s*\*\//.test(ln);

    // Forbidden fonts (imports or fontFamily literals)
    if (!hasFontAllow) {
      for (const f of policy.forbidden_fonts) {
        // Match as a whole word; 'Helvetica Neue' needs to match inside font stacks too
        const re = new RegExp(`\\b${f.replace(/[-/\\^$*+?.()|[\\]{}]/g, "\\$&")}\\b`);
        if (re.test(ln)) push(file, line, "FORBIDDEN_FONT", `uses "${f}"`);
      }
    }

    // Forbidden hex (any token in the banned families)
    if (!hasHexAllow) {
      const hexMatches = ln.match(/#[0-9A-Fa-f]{6}\b/g) || [];
      for (const h of hexMatches) {
        if (forbiddenHex.has(h.toLowerCase())) {
          push(file, line, "FORBIDDEN_HEX", `${h} is in a banned hex family (cream/purple/rogue-blue)`);
        }
      }

      // rgb()/rgba() close to a forbidden hex
      const rgbMatches = [...ln.matchAll(/rgba?\(\s*(\d+)\s*,\s*(\d+)\s*,\s*(\d+)/g)];
      for (const m of rgbMatches) {
        const [r, g, b] = [+m[1], +m[2], +m[3]];
        if (rgbMatchesForbidden(r, g, b))
          push(file, line, "FORBIDDEN_RGB", `rgb(${r},${g},${b}) matches banned hex family`);
      }
    }

    // Raw hex in TSX/JSX (components should use tokens)
    if (isComponent && !hasHexAllow) {
      const hex = ln.match(/#[0-9A-Fa-f]{6}\b/);
      if (hex) push(file, line, "RAW_HEX", `raw hex ${hex[0]} — use var(--color-*) token`);
    }

    // Brand-color bg on <button>  (check whole file for context, flag on line)
    if (isComponent) {
      for (const t of policy.cta.forbidden_bg_tokens) {
        if (ln.includes(`bg-${t.replace("color-", "")}`) && /<button|role=["']button/.test(src))
          push(file, line, "CTA_BRAND_BG", `bg-${t.replace("color-", "")} on a button — use .aurora-cta--*`);
      }
      // textTransform overrides on CTAs
      if (/textTransform\s*:\s*['"]none['"]/.test(ln))
        push(file, line, "CTA_CASE_OVERRIDE", "textTransform:'none' breaks the UPPERCASE rule");
    }

    // Card-bg pattern words
    const lower = ln.toLowerCase();
    for (const needle of policy.card.forbidden_bg_patterns || []) {
      if (lower.includes(needle.toLowerCase())) {
        // Skip obvious allow-listed words in CSS (only flag when used as a bg value)
        if (/background|bg|fill/.test(lower) || isComponent) {
          push(file, line, "CARD_FORBIDDEN_BG", `contains "${needle}" — cards must be glass (10%/60% white)`);
          break;
        }
      }
    }
  });

  // Whole-file check: if an agent imports a handwritten Google Font, catch it
  if (isCss) {
    for (const f of policy.forbidden_fonts) {
      const re = new RegExp(`family=${encodeURIComponent(f).replace(/%20/g, "\\+")}|family=${f.replace(/ /g, "\\+")}`, "i");
      if (re.test(src)) push(file, 0, "FORBIDDEN_FONT_IMPORT", `Google Fonts import references "${f}"`);
    }
  }
}

if (!violations.length) {
  console.log("✓ Aurora compliance: no violations found.");
  process.exit(0);
}

// Deduplicate
const seen = new Set();
const uniq = violations.filter((v) => {
  const k = `${v.file}:${v.line}:${v.code}:${v.msg}`;
  if (seen.has(k)) return false;
  seen.add(k);
  return true;
});

console.error(`✗ Aurora compliance: ${uniq.length} violation(s)\n`);
for (const v of uniq) {
  console.error(`  ${v.file}:${v.line}  [${v.code}]  ${v.msg}`);
}
console.error(`\nSee aurora.policy.json for rules, TOKENS.md for usage.`);
process.exit(1);
