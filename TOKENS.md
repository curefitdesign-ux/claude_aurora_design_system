# Aurora Tokens — Agent Reference

> **Auto-generated.** Source of truth: `design-tokens/aurora.tokens.json`. Run `npm run tokens:build` to regenerate.

This file is written for AI coding agents (GitHub Codex, Cursor, Claude Code, Windsurf, etc.). Every token includes its value, *when to use it*, *when not to*, and a one-line example so an agent can pick the right token without inventing new ones.

## How agents should read this file

1. Find the token family that matches the intent (color → text-color, surface color, border color; spacing → padding, gap, margin).
2. Prefer **semantic** tokens (`color.surface.card-bg`) over **primitive** tokens (`color.curefit.yellow`) when building components.
3. If no semantic token fits, fall back to the primitive and consider proposing a new semantic alias.
4. Never hardcode a hex, px, or font-family literal — it's already in this file.

---

## 🚨 CTA SYSTEM (strict — read this first)

**Source:** Figma Aurora App Design System — `jD7tZtVeQCMRlIHN7L8umI`, Buttons page.

**Rule:** interactive buttons use ONLY white (`#FFFFFF`) + coral (`#FF5942`) + white-glass. **Never yellow, blue, green, or true pink.**

### Four CTA components

| Component | Background | Text | Size | When to use |
|---|---|---|---|---|
| **Primary** | white `#FFFFFF` | coral `#FF5942` | min 120 / max 335 × 44 px | Highest-priority page action. Solid + outline variants. |
| **Secondary** | glass: white @ 20% opacity + 10px backdrop-blur | white `#FFFFFF` | min 120 × 40 px | SKU / banner buttons. Has booked / waitlist / waitlisted / full / negative states. |
| **Tertiary** | transparent (no container) | white `#FFFFFF` | 14px bold ALL CAPS, 0.5px tracking | Inline / ghost action. No background. |
| **Twins** | wraps two buttons | — | 50 or 40 px tall, 135 px min each | Double-choice row (e.g. "Save" / "Discard"). |

### Primary — solid vs. outline

| Variant | Background | Text | Border |
|---|---|---|---|
| Solid (default) | `cta.primary.bg` → white | `cta.primary.text` → coral | none |
| Outline | `cta.primary.outline.bg` → transparent | `cta.primary.outline.text` → coral | `cta.primary.outline.border` → white 1px |
| Disabled (solid) | `cta.primary.disabled.bg` → `bg-elevated` | `cta.primary.disabled.text` → white @ 40% | none |
| Disabled (outline) | transparent | white @ 40% | `cta.primary.disabled.outline-border` → white @ 20% |

### Secondary — state matrix

| State | Background | Text | Badge/Icon |
|---|---|---|---|
| Active | white @ 20% | white | — |
| Disabled | white @ 8% | white @ 40% | — |
| Booked | positive-tint (green @ 18%) | `status-positive` | ✓ checkmark |
| Waitlist (slots open) | gold-tint @ 18% | `gold` (#F7C744) | count badge + "JOIN WAITLIST" |
| Waitlisted | positive-tint | `status-positive` | count badge + "WAITLISTED" |
| Waitlist full | white @ 8% | white @ 40% | — |
| Negative | negative-tint (red @ 12%) | coral | — |

### Anti-patterns — reject these

- `bg-curefit-yellow` / `bg-curefit-blue` / `bg-curefit-pink` on a button — never. CTAs are white + coral only.
- Using `color.surface.action.primary` (yellow) for a button — deprecated for CTAs.
- Inventing a 5th CTA level — primary / secondary / tertiary / twins cover every case.
- Skipping the 10px backdrop-blur on secondary — the glass effect is part of the token.

### Example

```tsx
// Primary CTA (solid)
<button
  className="h-11 min-w-[120px] max-w-[335px] rounded-[8px] px-6
             bg-[var(--cta-primary-bg)] text-[var(--cta-primary-text)]
             font-bold uppercase tracking-[0.5px] text-[14px]
             shadow-[var(--cta-primary-shadow)]
             transition-colors duration-[var(--duration-normal)]
             hover:bg-[var(--cta-primary-bg-hover)]
             active:bg-[var(--cta-primary-bg-pressed)]">
  2 Items · Pay $24
</button>

// Secondary CTA (glass)
<button
  className="h-10 min-w-[120px] rounded-[8px] px-4
             bg-[var(--cta-secondary-bg)] backdrop-blur-[var(--cta-secondary-backdrop-blur)]
             text-[var(--cta-secondary-text)]
             font-bold uppercase tracking-[0.5px] text-[14px]">
  8:00 PM
</button>

// Tertiary CTA (plain text)
<button className="px-3 py-2 text-[14px] font-bold uppercase tracking-[0.5px] text-white">
  Tertiary CTA
</button>
```

## Color — primitives (brand)

These are **display** colors — use them for illustrations, charts, accents. They are explicitly forbidden in CTAs (see the rule above).

| Token | Value | Use when | Do NOT use for |
|---|---|---|---|
| `color.curefit.yellow` | `#F5BC00` | Backgrounds (aurora-bg blob), charts, highlights | **CTAs**, primary buttons |
| `color.curefit.pink` | `#FF3278` | **CTAs** (primary text, secondary bg, tertiary border), aurora-bg blob | Body text |
| `color.curefit.blue` | `#00BEFF` | Informational icons, links on dark, aurora-bg blob | **CTAs**, primary buttons |
| `color.curefit.green` | `#0FE498` | Positive confirmations, progress indicators | Error states |

## Color — surface semantics (prefer these for components)

| Token | Resolves to | Use for |
|---|---|---|
| `color.surface.app-bg` | `color.bg.dark` | Page / app container background |
| `color.surface.card-bg` | `color.bg.card` | Card surfaces on the dark app |
| `color.surface.sheet-bg` | `color.bg.elevated` | Bottom sheets, modals |
| `color.surface.action.primary` | `color.curefit.yellow` | ⚠️ **Deprecated for CTAs** — use `cta.primary.*` instead. Kept for legacy non-CTA brand surfaces. |
| `color.surface.action.secondary` | `color.white-alpha.10` | Secondary surface (not CTA) |

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

## Blur scale

Extended from the original weak/medium/strong. Use the named scale for new work; legacy aliases are preserved.

| Token | Value | Use for |
|---|---|---|
| `blur.xs` | `4px` | Subtle glass on tooltips |
| `blur.sm` | `10px` | Frosted modal scrim |
| `blur.md` | `30px` | Sheet / drawer backdrop |
| `blur.lg` | `80px` | Heavy frosted surface |
| `blur.xl` | `120px` | Distant glow |
| `blur.2xl` | `160px` | Aurora-bg mid intensity |
| `blur.3xl` | `200px` | Aurora-bg default |
| `blur.full` | `300px` | Aurora-bg maximum diffusion |
| `blur.weak` / `blur.medium` / `blur.strong` | aliases of `sm` / `md` / `lg` | Legacy, don't use for new work |

## Aurora animated background

Applied globally — every screen sits on top of three slow-drifting blurred blobs (pink, yellow, blue). Tokens:

| Token | Default | What it controls |
|---|---|---|
| `aurora-bg.blob-pink` | `#FF3278` | Top-left blob color |
| `aurora-bg.blob-yellow` | `#F5BC00` | Bottom-right blob color |
| `aurora-bg.blob-blue` | `#00BEFF` | Drifting-through blob color |
| `aurora-bg.blob-opacity` | `0.35` | Blob opacity — balance visibility vs. content contrast |
| `aurora-bg.blob-size` | `45vw` | Diameter (responsive) |
| `aurora-bg.blob-blur` | `200px` | Softness |
| `aurora-bg.duration-pink` | `24s` | Orbit period |
| `aurora-bg.duration-yellow` | `32s` | Orbit period |
| `aurora-bg.duration-blue` | `28s` | Orbit period |

Implementation lives in `my-app/src/index.css` (body::before, body::after, #root::before + three `@keyframes aurora-drift-*`). Respects `prefers-reduced-motion`.

To apply in a scoped container instead of globally:
```tsx
<div className="aurora-bg">
  <span className="aurora-bg-blob aurora-bg-blob--pink" />
  <span className="aurora-bg-blob aurora-bg-blob--yellow" />
  <span className="aurora-bg-blob aurora-bg-blob--blue" />
  {children}
</div>
```

---

## Anti-patterns (what agents should reject)

- **Yellow or blue in a CTA** — forbidden. CTAs are pink + white only (see CTA rule at top).
- Hardcoded hex: use `color.*` or `cta.*` tokens.
- Hardcoded px radius: use `radius.*` tokens.
- Magic number spacing (e.g. `p-[7px]`): use the 5px rhythm from `spacing.*`.
- Ad-hoc transition timings (`transition-all duration-150`): use `duration.*` + `easing.*`.
- Inventing a new color: flag it; it probably maps to an existing token.
- Using `color.surface.action.primary` (yellow) for a button — it's deprecated for CTAs.

## Platform consumption

Every token in this file is available in:
- **Web/Tailwind:** already in `@theme` — use `bg-curefit-yellow`, etc.
- **iOS:** `Aurora.color.curefitYellow` (Swift).
- **Android XML:** `@color/curefit_yellow`.
- **Compose:** `AuroraTheme.color.curefitYellow`.
- **React Native / Node:** `import { color } from "@aurora/tokens"`.
- **Raw JSON (for anything else):** `dist/json/aurora.flat.json`.
