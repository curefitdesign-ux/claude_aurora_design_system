# Aurora Tokens — Agent Reference

> Source of truth: `design-tokens/aurora.tokens.json` (W3C DTCG) + `my-app/src/styles/**/*.css` (CSS custom properties).
> Policy: `aurora.policy.json` (machine-readable allow/deny).

This file is the canonical agent reference. Read it first. Then pick tokens, never invent hex, px, or font-family literals.

---

## File layout (start here)

```
design-tokens/aurora.tokens.json         W3C DTCG source of truth
aurora.policy.json                       Machine-readable allow/deny rules
aurora.agent.yaml                        Component recipes (platform-neutral)
aurora.flat.json                         Flat key→value dump (build output)
scripts/check-aurora.mjs                 Compliance linter (npm run aurora:check)

my-app/src/
├── index.css                            entry — imports all style layers
└── styles/
    ├── tokens/
    │   ├── primitives.css               Tier 1 — raw brand colors
    │   ├── semantics.css                Tier 2 — role aliases (surface/text/state)
    │   ├── typography.css               font families + type scale
    │   ├── spacing.css                  5px rhythm + radius + blur + z-index
    │   └── motion.css                   duration + easing
    ├── components/
    │   ├── cta.css                      CTA tokens + .aurora-cta utilities
    │   ├── card.css                     .aurora-card utility
    │   └── aurora-bg.css                drifting-blob background
    └── themes/
        └── white.css                    .theme-white light variant
```

## Tier policy (pick in this order)

1. **Component utility class** — `.aurora-cta--primary`, `.aurora-card`, `.aurora-bg`. Rules are baked into CSS (you can't forget `text-transform: uppercase` on a CTA).
2. **Semantic token** — `var(--color-bg-card)`, `var(--color-text-white)`, `var(--cta-primary-bg)`.
3. **Primitive token** — `var(--color-curefit-yellow)`. Only when no semantic fits.
4. **Never** — raw hex, raw px for radius, raw font-family.

---

## 🚨 CTA — strict

**4 levels. No 5th.** `primary` / `secondary` / `tertiary` / `twins`.

All CTAs must: Inter 700 · UPPERCASE · letter-spacing 0.5px.

These are enforced by `.aurora-cta` — use the utility class instead of raw Tailwind.

### Usage

```tsx
// Primary (50px tall, gradient text on dark / gradient bg on white)
<button className="aurora-cta aurora-cta--primary">book now</button>

// Primary small (40px)
<button className="aurora-cta aurora-cta--primary aurora-cta--sm">book now</button>

// Secondary (glass, SKU/banner buttons)
<button className="aurora-cta aurora-cta--secondary">8:00 pm</button>
<button className="aurora-cta aurora-cta--secondary is-booked">booked</button>
<button className="aurora-cta aurora-cta--secondary is-waitlist">join waitlist</button>

// Tertiary (plain label, no container)
<button className="aurora-cta aurora-cta--tertiary">view all</button>

// Twins (row of two)
<div className="aurora-cta-twins">
  <button className="aurora-cta aurora-cta--secondary">cancel</button>
  <button className="aurora-cta aurora-cta--primary">save</button>
</div>
```

Label text is lowercase in source; CSS forces uppercase. **Do not write `BOOK NOW` in JSX** — write `book now` and let the token transform it.

### Forbidden

- `bg-curefit-yellow` / `bg-curefit-blue` / `bg-curefit-green` / `bg-curefit-pink` on a button. CTAs never use brand primitives directly.
- Inventing a 5th level.
- Handwritten / non-Aurora fonts in CTA labels.
- Skipping `.aurora-cta` and composing bespoke Tailwind — that's how `text-transform: uppercase` gets lost.

---

## Colors

### Brand (primitives — tier 1)

| Token | Value | Use for |
|---|---|---|
| `--color-curefit-yellow` | `#F5BC00` | illustrations, charts, aurora-bg blob |
| `--color-curefit-pink`   | `#FF3278` | accents, aurora-bg blob |
| `--color-curefit-blue`   | `#00BEFF` | links on dark, info icons, focus ring, aurora-bg blob |
| `--color-curefit-green`  | `#0FE498` | positive confirms |
| `--color-coral`          | `#FF5942` | CTA accent (secondary negative-state text) |
| `--color-gold`           | `#F7C744` | waitlist badge |

### Semantic surfaces (tier 2 — prefer these)

| Token | Dark | White theme |
|---|---|---|
| `--color-bg-dark`        | `#1A1A1A` | `#FAFAFA` |
| `--color-bg-card`        | `rgba(255,255,255,0.10)` | `rgba(255,255,255,0.60)` |
| `--color-bg-card-solid`  | `#1C1C1E` | `#FFFFFF` |
| `--color-bg-elevated`    | `#2C2C2C` | `#FFFFFF` |
| `--color-bg-surface`     | `#232323` | `#F4F4F4` |

Cards get `30px` backdrop blur automatically (via `.aurora-card` or any `bg-bg-card` utility).

### Text

| Token | Dark | White theme |
|---|---|---|
| `--color-text-white` (primary) | `#FFFFFF` | `#1C1C1E` |
| `--color-text-2` (muted)       | `#999CA0` | `#555555` |

---

## Typography

Use the `--text-*-size/-weight/-lh/-ls` group (not solo values) to match Aurora exactly.

- Headings: `h1` (20/700) · `h2` (18/700) · `h4` (16/700) · `h5` (50/900 hero) · `h7` (38/900) · `h9` (24/800) · `h10` (30/700)
- Body: `p1` (16/500) · `p2` (16/400) · `p5` (14/400) · `p8` (12/400)
- `cta` (14/700, tracking 1.4px) — for ALL-CAPS CTA label (already in `.aurora-cta`)
- `tag` (10/700, tracking 1.0px)

**Fonts: Inter (primary), Bw Modelica SS01 (display), Roboto Mono (data), Bebas Neue (accent).** Nothing else. `Caveat` / `Handlee` / `BenchNine` / `Helvetica Neue` are forbidden by `aurora.policy.json`.

## Radius, spacing, blur

- Spacing: 5px rhythm — `--spacing-1` (5) through `--spacing-30` (150).
- Radius: `--radius-card` (10), `--radius-chip` (15), `--radius-pill` (50), `--radius-avatar` (100), + xs/sm/md/lg/xl.
- Blur: `--blur-xs` (4) → `--blur-full` (300). `aurora-bg` uses `--blur-3xl` (200). Card uses `30px` (medium).

## Motion

- Duration: `--duration-fast` (120ms), `--duration-normal` (200ms), `--duration-slow` (320ms).
- Easing: `--easing-default`, `--easing-spring`.

## Z-index

`base` (0) → `dropdown` (100) → `sticky` (200) → `overlay` (300) → `modal` (400) → `toast` (500) → `tooltip` (600).

## Aurora animated background

Global: `body::before` (pink), `body::after` (yellow), `#root::before` (blue) — three blurred blobs orbiting on `24s` / `32s` / `28s`. Opacity drops to 0.20 in `.theme-white`. Respects `prefers-reduced-motion`.

## White theme

```tsx
<body className="theme-white">…</body>
// or scope:
<section className="theme-white">…</section>
```

Flips surfaces + text + overlays + shadows + CTA primary (to gradient bg + white text). Brand colors, gradient, typography, spacing, z-index all stay.

---

## Compliance check

```bash
cd my-app && npm run aurora:check
```

Fails CI on:
- forbidden fonts in any component
- forbidden hex (`#F4F0E6`, `#7F5BFF`, `#3888FF`)
- raw hex in `.tsx/.jsx`
- `bg-curefit-*` on a `<button>`

Add `// ok:hex` to intentionally allow a raw hex on a specific line.

## Platform consumption

- **Web/Tailwind:** tokens exposed via `@theme` — use `bg-bg-card`, `text-text-white`, `rounded-[var(--radius-card)]`.
- **iOS / Android / Compose / React Native:** regenerate from `design-tokens/aurora.tokens.json` via Style Dictionary.
- **Any agent (raw):** `aurora.flat.json` + `aurora.policy.json`.
