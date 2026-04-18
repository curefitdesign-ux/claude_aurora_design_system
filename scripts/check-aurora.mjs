#!/usr/bin/env node
/**
 * Aurora compliance check.
 * Scans my-app/src/components for violations of aurora.policy.json.
 * Exits 1 on any finding so CI can gate merges.
 *
 * Run:  node scripts/check-aurora.mjs
 *       npm run aurora:check
 */
import { readFileSync, readdirSync, statSync } from "node:fs";
import { join, extname } from "node:path";
import { fileURLToPath } from "node:url";

const ROOT = fileURLToPath(new URL("..", import.meta.url));
const policy = JSON.parse(readFileSync(join(ROOT, "aurora.policy.json"), "utf8"));

const SCAN_DIRS = ["my-app/src/components", "my-app/src/App.tsx"];
const EXT_OK = new Set([".tsx", ".ts", ".jsx", ".js", ".css"]);

function walk(dir, files = []) {
  if (!statSync(dir, { throwIfNoEntry: false })) return files;
  const s = statSync(dir);
  if (s.isFile()) { files.push(dir); return files; }
  if (!s.isDirectory()) return files;
  for (const name of readdirSync(dir)) {
    const p = join(dir, name);
    const st = statSync(p);
    if (st.isDirectory()) walk(p, files);
    else if (EXT_OK.has(extname(name))) files.push(p);
  }
  return files;
}

const files = SCAN_DIRS.flatMap((d) => walk(join(ROOT, d)));

const violations = [];
const push = (file, line, code, msg) =>
  violations.push({ file: file.replace(ROOT + "/", ""), line, code, msg });

for (const file of files) {
  const src = readFileSync(file, "utf8");
  src.split("\n").forEach((ln, i) => {
    const line = i + 1;

    // Forbidden fonts
    for (const f of policy.forbidden_fonts) {
      if (ln.includes(f)) push(file, line, "FORBIDDEN_FONT", `uses "${f}"`);
    }

    // Forbidden hex
    for (const h of policy.forbidden_hex_in_components) {
      if (ln.toLowerCase().includes(h.toLowerCase()))
        push(file, line, "FORBIDDEN_HEX", `uses ${h}`);
    }

    // Raw hex in tsx/jsx (components should use tokens)
    if (/\.(t|j)sx?$/.test(file)) {
      const hex = ln.match(/#[0-9A-Fa-f]{6}\b/);
      if (hex && !ln.includes("// ok:hex")) {
        push(file, line, "RAW_HEX", `raw hex ${hex[0]} — use var(--color-*) token`);
      }
    }

    // Brand color used as CTA bg
    for (const t of policy.cta.forbidden_bg_tokens) {
      const re = new RegExp(`bg-${t.replace(/-/g, "-")}`);
      if (re.test(ln) && /<button|role=["']button/.test(src))
        push(file, line, "CTA_BRAND_BG", `bg-${t} on a button — use .aurora-cta--*`);
    }
  });
}

if (!violations.length) {
  console.log("✓ Aurora compliance: no violations found.");
  process.exit(0);
}

console.error(`✗ Aurora compliance: ${violations.length} violation(s)\n`);
for (const v of violations) {
  console.error(`  ${v.file}:${v.line}  [${v.code}]  ${v.msg}`);
}
process.exit(1);
