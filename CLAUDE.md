# CLAUDE.md — Aurora design system rules

This repo is a **design-system contract** for AI coding agents. Read this file first, then `TOKENS.md`, then `aurora.policy.json`. The rules here are binding.

## Source of truth (in priority order)

1. **Figma Aurora App DS** — `jD7tZtVeQCMRlIHN7L8umI`
2. **Figma Aurora Web DS** — `2ltwLvqwn6hSKN15ZR9gxB`
3. `design-tokens/aurora.tokens.json` — W3C DTCG mirror of Figma
4. `my-app/src/styles/**` — CSS custom properties (compiled token layer)
5. `aurora.policy.json` — machine-readable allow/deny (what lint enforces)

If a Figma node says one thing and any file here says another, Figma wins. File an update to the token layer, don't hack around it.

## Repo layout

```
.
├── CLAUDE.md                          this file — rules for agents
├── TOKENS.md                          token reference + CTA usage examples
├── README.md                          human-facing overview
├── aurora.policy.json                 machine-readable policy
├── aurora.agent.yaml                  portable component recipes
├── aurora.flat.json                   resolved key→value dump
├── design-tokens/
│   └── aurora.tokens.json             W3C DTCG tokens
├── scripts/
│   └── check-aurora.mjs               compliance linter
└── my-app/                            reference React + Tailwind v4 app
    └── src/
        ├── index.css                  entry — imports style layers in order
        ├── styles/
        │   ├── tokens/                primitives, semantics, typography, spacing, motion
        │   ├── components/            cta, card, aurora-bg (tokens + utilities)
        │   └── themes/                white.css (.theme-white override)
        ├── App.tsx
        └── components/                reference components (must pass lint)
```

## Non-negotiable rules

### 1. Components consume utility classes or semantic tokens. Never raw hex.
```tsx
// ✅
<div className="aurora-card p-[var(--spacing-4)]" />
<button className="aurora-cta aurora-cta--primary">book now</button>

// ❌
<button style={{ background: "#FFFFFF", color: "#FF5942", textTransform: "uppercase" }}>BOOK NOW</button>
<div style={{ background: "#F4F0E6" }} />
```

### 2. CTAs use `.aurora-cta` utility classes
The four levels — `primary`, `secondary`, `tertiary`, `twins` — are in `styles/components/cta.css`. The utility class bakes in: Inter · 700 · UPPERCASE · 0.5px tracking · correct bg/text/height/blur/radius.

**Write labels in lowercase.** CSS forces uppercase. `<button>book now</button>` renders "BOOK NOW".

Forbidden on buttons: `bg-curefit-yellow`, `bg-curefit-blue`, `bg-curefit-green`, `bg-curefit-pink`.

### 3. Fonts: Aurora stack only
Allowed: **Inter** (primary), **Bw Modelica SS01** (display), **Roboto Mono** (data), **Bebas Neue** (accent).
Forbidden: Caveat, Handlee, BenchNine, Helvetica Neue, Segoe Script, Comic Sans, Arial Narrow.

### 4. Cards: glass by default
`.aurora-card` = 10% translucent white + 30px backdrop blur + `--radius-card` (10px). For opaque, use `bg-[var(--color-bg-card-solid)]` explicitly.

### 5. Spacing: 5px rhythm only
Use `--spacing-1..30`. No `p-[7px]`, no `gap-[13px]`.

### 6. Radius: from the scale
`--radius-xs/sm/card/md/chip/lg/xl/2xl/3xl/pill/avatar/full`. No `rounded-[11px]`.

### 7. Motion: tokens only
`transition: X var(--duration-normal) var(--easing-default)`. No `duration-150`, no ad-hoc bezier.

### 8. Dual theme
Default (dark) applies automatically. Apply `.theme-white` on `<body>` or any container to switch. Both themes preserve the brand palette — only surfaces/text/overlays/shadows/CTA-primary flip.

## Linting

```bash
cd my-app && npm run aurora:check
```

This scans `components/` and `App.tsx` for:
- Forbidden fonts
- Forbidden hex (cream `#F4F0E6`, purple `#7F5BFF`, rogue blue `#3888FF`)
- Raw hex in TSX/JSX (flag: use a token instead)
- `bg-curefit-*` on `<button>`

Run on every change. CI should gate merges on exit code 0.

## Figma MCP workflow

When asked to implement a Figma design:

1. `get_figma_data` for the exact node(s). Don't trust a screenshot — trust the structured payload.
2. Map every color / font / radius / spacing to an existing token. If no token fits, propose adding one before implementing.
3. Reuse `.aurora-*` utilities for cards and CTAs. Compose new components from tokens, never bespoke CSS.
4. Download raster assets with `download_figma_images`. Never invent icons or import icon packages — all assets come from Figma.
5. Validate 1:1 against Figma + run `npm run aurora:check` before handing back.

## What not to do

- Don't reference any off-brand card (cream bg, purple handwriting, handwritten accent names, oversized Helvetica-Neue display stacks). The token layer explicitly forbids the hex / fonts that enable such cards.
- Don't add a 5th CTA level. Don't invent a new font family. Don't add purple accents.
- Don't hardcode. If you catch yourself typing `#` followed by 6 chars, stop — find the token.
