# Aurora Tokens — Agent Reference

> **Auto-generated.** Source of truth: `design-tokens/aurora.tokens.json`. Run `npm run tokens:build` to regenerate.

This file is written for AI coding agents (GitHub Codex, Cursor, Claude Code, Windsurf, etc.). Every token includes its value, *when to use it*, *when not to*, and a one-line example so an agent can pick the right token without inventing new ones.

## How agents should read this file

1. Find the token family that matches the intent (color → text-color, surface color, border color; spacing → padding, gap, margin).
2. Prefer **semantic** tokens (`color.surface.card-bg`) over **primitive** tokens (`color.curefit.yellow`) when building components.
3. If no semantic token fits, fall back to the primitive and consider proposing a new semantic alias.
4. Never hardcode a hex, px, or font-family literal — it's already in this file.

---

## Color — primitives (brand)

| Token | Value | Use when | Don't use for |
|---|---|---|---|
| `color.curefit.yellow` | `#F5BC00` | Primary CTA, active state, brand accents | Long-form text, large surfaces |
| `color.curefit.pink` | `#FF3278` | Secondary accents, badges | Long text, primary CTA |
| `color.curefit.blue` | `#00BEFF` | Informational accents, links on dark | Body backgrounds |
| `color.curefit.green` | `#0FE498` | Positive confirmations, progress | Error states |

Example: `className="bg-curefit-yellow text-dark-primary"` for a primary pill button.

## Color — surface semantics (prefer these for components)

| Token | Resolves to | Use for |
|---|---|---|
| `color.surface.app-bg` | `color.bg.dark` | Page / app container background |
| `color.surface.card-bg` | `color.bg.card` | Card surfaces on the dark app |
| `color.surface.sheet-bg` | `color.bg.elevated` | Bottom sheets, modals |
| `color.surface.action.primary` | `color.curefit.yellow` | Primary buttons, FABs |
| `color.surface.action.secondary` | `color.white-alpha.10` | Secondary buttons on dark |

Example: `<div class="bg-[var(--color-surface-card-bg)] rounded-[var(--radius-card)] p-4">`

## Color — text

| Token | Use when | Don't use for |
|---|---|---|
| `color.text.white` | Primary text on dark surfaces | Light surfaces |
| `color.text.muted` | Secondary / supporting copy (Trunks) | Primary headings |
| `color.text.dark` | Primary text on light surfaces | Dark surfaces |
| `color.white-alpha.60` | Low-attention metadata on dark | Anything requiring contrast AA |

## Typography — text styles

Use text-style tokens together as a group (size + weight + lh + ls) to match Aurora exactly:

- `text-style.h1` — section headings (20/700)
- `text-style.h4` — card titles (16/700)
- `text-style.h5` — hero display (50/900)
- `text-style.p1` / `text-style.p2` — body
- `text-style.p5` — caption
- `text-style.cta` — ALL-CAPS button label (14/700, tracking 1.4px)
- `text-style.tag` — tag label (10/700, tracking 1.0px)

Example (React):
```tsx
style={{
  fontSize: "var(--text-style-cta-size)",
  fontWeight: "var(--text-style-cta-weight)",
  letterSpacing: "var(--text-style-cta-ls)",
}}
```

## Radius

| Token | Value | Use for |
|---|---|---|
| `radius.card` | `10px` | Standard cards |
| `radius.chip` | `15px` | Chips, small toggles |
| `radius.md` | `12px` | Inputs, containers |
| `radius.pill` | `50px` | Pill buttons, segmented controls |
| `radius.3xl` | `40px` | Bottom sheet top edge |
| `radius.avatar` | `100px` | Circular avatars |

## Spacing (5px rhythm)

`spacing.1` (5) → `spacing.30` (150). Common choices: 2=10, 3=15, 4=20, 5=24, 6=30.

## Shadow & elevation

Prefer the `elevation.*` pairs (surface + shadow together) for cards/sheets/modals:

- `elevation.1` — resting card
- `elevation.2` — raised card
- `elevation.3` — floating panel
- `elevation.modal` — modal / dialog

## Motion

- `duration.fast` (120ms) — micro-interactions (hover, press)
- `duration.normal` (200ms) — standard transitions
- `duration.slow` (320ms) — entrances, emphasis
- `easing.default` — standard curve
- `easing.spring` — playful enters

## Z-index

Layer order: `z.base` (0) → `z.dropdown` (100) → `z.sticky` (200) → `z.overlay` (300) → `z.modal` (400) → `z.toast` (500) → `z.tooltip` (600).

---

## Anti-patterns (what agents should reject)

- Hardcoded hex: use `color.*` tokens.
- Hardcoded px radius: use `radius.*` tokens.
- Magic number spacing (e.g. `p-[7px]`): use the 5px rhythm from `spacing.*`.
- Ad-hoc transition timings (`transition-all duration-150`): use `duration.*` + `easing.*`.
- Inventing a new color: flag it; it probably maps to an existing token.

## Platform consumption

Every token in this file is available in:
- **Web/Tailwind:** already in `@theme` — use `bg-curefit-yellow`, etc.
- **iOS:** `Aurora.color.curefitYellow` (Swift).
- **Android XML:** `@color/curefit_yellow`.
- **Compose:** `AuroraTheme.color.curefitYellow`.
- **React Native / Node:** `import { color } from "@aurora/tokens"`.
- **Raw JSON (for anything else):** `dist/json/aurora.flat.json`.
