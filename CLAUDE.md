# CLAUDE.md

## Project Overview

This project uses React 19 with TypeScript and Tailwind CSS v4 (via `@tailwindcss/vite`), built with Vite 7. The design system is **Aurora** (from Figma file `jD7tZtVeQCMRlIHN7L8umI`), following Atomic Design methodology (Sub-Atoms > Atoms > Molecules > Organisms > Templates).

## Directory Structure

- `my-app/src/components/ui/` - Design system / UI primitives (buttons, inputs, cards, etc.)
- `my-app/src/components/` - Feature and composite components
- `my-app/src/assets/` - Image and media assets
- `my-app/public/` - Static public assets

## Aurora Design System — Design Tokens

All tokens are defined as CSS custom properties in `my-app/src/index.css` inside the `@theme` block (Tailwind v4 convention).

### Brand Colors
- `--color-curefit-yellow: #F5BC00` — primary brand yellow
- `--color-curefit-yellow-light: #FFDC18` — lighter yellow variant
- `--color-curefit-pink: #FF3278` — brand pink
- `--color-curefit-blue: #00BEFF` — brand blue
- `--color-curefit-green: #0FE498` — brand green

### Semantic Colors
- `--color-dark-primary: #1C1C1E` — primary dark surface
- `--color-dark-secondary: #2C2C2C` — secondary dark surface
- `--color-dark-ink: #141515` — deepest dark
- `--color-light-primary: #FFFFFF` — light surface
- `--color-status-positive: #4AB74A` — success
- `--color-status-negative: #B00020` — error
- `--color-status-alert: #F5BC00` — warning
- `--color-status-neutral: #00BEFF` — info

### Text Colors
- `--color-text-white: #FFFFFF` — primary text on dark
- `--color-text-2: #999CA0` — secondary/muted text (Trunks)
- `--color-white-60: rgba(255,255,255,0.6)` — low attention text
- `--color-white-40: rgba(255,255,255,0.4)` — mid attention text
- `--color-white-10: rgba(255,255,255,0.1)` — disabled/BG

### Surface / Background
- `--color-bg-dark: #1A1A1A` — app background
- `--color-bg-card: #1C1C1E` — card background
- `--color-bg-elevated: #2C2C2C` — elevated surface
- `--color-bg-surface: #232323` — secondary surface

### Gray Scale
- `--color-gray-50` (#F7F7F7) through `--color-gray-900` (#2C2C2C)

### Typography (Aurora uses Inter as primary font)
- `--font-primary` — Inter (all weights 100-900, primary UI font)
- `--font-display` — Bw Modelica SS01 (hero/display headings)
- `--font-mono` — Roboto Mono (code/data)
- `--font-bebas` — Bebas Neue (display/uppercase accents)
- `--font-heading` — Helvetica Neue (legacy heading)
- `--font-handwritten` — Caveat (script accent)
- `--font-label` — BenchNine (label/caps)

### Aurora Type Scale (Inter)
| Token | Size | Weight | Use |
|-------|------|--------|-----|
| H1 | 20px | 700 (Bold) | Section headings |
| H2 | 18px | 700 (Bold) | Sub-headings |
| H3 | 18px | 500 (Medium) | Sub-headings light |
| H4 | 16px | 700 (Bold) | Small headings |
| H5 | 50px | 900 (Black) | Hero display |
| H7 | 38px | 900 (Black) | Large display |
| H8 | 35px | 500 (Medium) | Medium display |
| H9 | 24px | 800 (ExtraBold) | Featured heading |
| H10 | 30px | 700 (Bold) | Large heading |
| P1 | 16px | 500 (Medium) | Body/captions |
| P2 | 16px | 400 (Regular) | Body |
| P3 | 14px | 700 (Bold) | Emphasis (not CTA) |
| P4 | 14px | 500 (Medium) | Captions |
| P5 | 14px | 400 (Regular) | Body small |
| P6 | 12px | 700 (Bold) | ALL CAPS labels |
| P8 | 12px | 400 (Regular) | Small text |
| P10 | 10px | 400 (Regular) | Micro text |
| Tag | 10px | 700 (Bold) | Tag text |
| CTA | 14px | 700 (Bold) | ALL CAPS CTA buttons |

### Border Radius Scale
- `--radius-xs: 4px` | `--radius-sm: 8px` | `--radius-md: 12px` | `--radius-lg: 16px`
- `--radius-xl: 20px` | `--radius-2xl: 30px` | `--radius-3xl: 40px` | `--radius-full: 1000px`

### Shadow Scale
- `--shadow-subtle` — 0px 2px 6px (cards)
- `--shadow-low` — 0px 4px 11px (low elevation)
- `--shadow-medium` — 0px 4px 14px (medium elevation)
- `--shadow-high` — 0px 13px 24px (high elevation)
- `--shadow-floating` — 0px 4px 25px (floating elements)
- `--shadow-modal` — 0px 14px 24px 3px (modals)
- `--shadow-divider` — 0px 1px 0px (hairline dividers)

### Token Usage Rules
- IMPORTANT: Never hardcode hex colors — always use Tailwind classes that reference the theme tokens (e.g., `text-text-white`, `bg-bg-card`, `text-curefit-yellow`, `border-gray-700`)
- IMPORTANT: Never hardcode font families — use `font-primary`, `font-display`, `font-bebas`, etc.
- IMPORTANT: Use the radius scale tokens — `rounded-[--radius-sm]`, `rounded-[--radius-md]`, etc.
- IMPORTANT: Use the shadow scale — `shadow-[--shadow-low]`, `shadow-[--shadow-medium]`, etc.
- Add new design tokens to the `@theme` block in `my-app/src/index.css`, not in a separate config file

### Extended Tokens (Enhancement Layer)

Added non-destructively from Global Dev Handoff V2. All existing Aurora tokens remain intact.

**Typography scale as CSS vars** — each token exposes size/weight/line-height/letter-spacing:
- Headings: `--text-h1-*` … `--text-h10-*` (incl. H5/H7/H8/H9/H10 display sizes)
- Body: `--text-p1-*` … `--text-p10-*`
- `--text-cta-*` for ALL-CAPS CTA buttons, `--text-tag-*` for tags
- Use via inline style or `@apply`-style composition: `style={{ fontSize: "var(--text-h1-size)", fontWeight: "var(--text-h1-weight)" }}`

**Spacing scale (5px rhythm):** `--spacing-1` (5px) through `--spacing-30` (150px). Key steps: 1=5, 2=10, 3=15, 4=20, 5=24, 6=30, 8=40, 10=50, 12=60, 16=80, 20=100, 30=150.

**Extended radius:** `--radius-2xs` (5), `--radius-card` (10), `--radius-chip` (15), `--radius-pill` (50), `--radius-avatar` (100) — added alongside existing xs-3xl.

**Backdrop blur:** `--blur-weak` (10px), `--blur-medium` (30px), `--blur-strong` (80px) — for glass/frosted surfaces.

**Motion tokens:**
- Duration: `--duration-fast` (120ms), `--duration-normal` (200ms), `--duration-slow` (320ms), `--duration-slower` (480ms)
- Easing: `--easing-in`, `--easing-out`, `--easing-default`, `--easing-spring`

**Z-index scale:** `--z-base` (0), `--z-dropdown` (100), `--z-sticky` (200), `--z-overlay` (300), `--z-modal` (400), `--z-toast` (500), `--z-tooltip` (600).

**Interactive state tokens:**
- `--state-disabled-opacity: 0.4`, `--state-disabled-bg`
- `--state-selected-bg`, `--state-pressed-bg`, `--state-hover-bg`

**Semantic color roles:**
- `--color-scrim` (modal backdrop), `--color-overlay` (image overlay)
- `--color-divider`, `--color-divider-light`
- `--color-focus-ring` — paired with `--shadow-focus` for keyboard focus

**Elevation system** (surface + shadow pairs):
- `--elevation-1-bg` / `--elevation-1-shadow` through `--elevation-4-*`
- `--elevation-modal-bg` / `--elevation-modal-shadow`

**Gradients:** `--gradient-aurora-sky` (yellow → blue 225°), `--gradient-fading-stroke`, `--gradient-purple-glow`, `--gradient-yellow-pink`, `--gradient-scrim-bottom`.

**New font:** `--font-handlee` (Handlee) — handwritten accent variant alongside existing Caveat.

## Agent Prompt Guide (Spotify-style Quick Reference)

Use this section when prompting an AI agent to build or modify components. It gives the agent a minimal, unambiguous vocabulary to reach for before inventing values.

### Color quick reference
- **Primary brand:** `text-curefit-yellow`, `bg-curefit-yellow`
- **Accents:** `curefit-pink`, `curefit-blue`, `curefit-green`
- **Surfaces (dark theme):** `bg-bg-dark` (app), `bg-bg-card` (cards), `bg-bg-elevated` (sheets)
- **Text on dark:** `text-text-white` (primary), `text-text-2` (muted), `text-white-60` (low), `text-white-40` (mid)
- **Status:** `text-status-positive` / `-negative` / `-alert` / `-neutral`
- **Dividers:** `border-[color:var(--color-divider)]` on dark, `border-[color:var(--color-divider-light)]` on light

### Typography quick reference
- **CTA button label:** `font-primary font-bold uppercase tracking-[1.4px] text-[14px]` → or use `var(--text-cta-*)`
- **Card title (H4):** `font-primary font-bold text-[16px]`
- **Section heading (H1):** `font-primary font-bold text-[20px]`
- **Hero display (H5/H7):** use `var(--text-h5-size)` / `var(--text-h7-size)` for 50/38px
- **Body:** `text-[16px] font-normal` (P2) / `font-medium` (P1)
- **Caption:** `text-[12px]` (P8) / `text-[10px]` (P10)
- **Tag label:** `text-[10px] font-bold uppercase tracking-[1px]`
- **Handwritten accent:** `font-handwritten` (Caveat) or `font-handlee`

### Component recipes

**Card** — `bg-bg-card rounded-[10px] p-4 shadow-[var(--shadow-subtle)]`
**Pill button** — `rounded-[50px] px-6 py-3 bg-curefit-yellow text-dark-primary font-bold uppercase tracking-[1.4px] text-[14px] transition-colors duration-[var(--duration-normal)]`
**Chip** — `rounded-[15px] px-3 py-1.5 bg-white-10 text-text-white text-[12px] font-medium`
**Modal scrim** — `fixed inset-0 bg-[color:var(--color-scrim)] backdrop-blur-[var(--blur-weak)] z-[var(--z-modal)]`
**Focus ring** — `focus-visible:outline-none focus-visible:shadow-[var(--shadow-focus)]`

### Example prompts

> "Build a Habit Card using Aurora tokens. Dark theme. Use `bg-bg-card`, `rounded-[var(--radius-card)]`, shadow-subtle. Title as H4 (`font-primary font-bold text-[16px]`), caption as P5 (`text-[14px] text-text-2`). Primary CTA as a pill button with `bg-curefit-yellow`, CTA typography, `transition-colors duration-[var(--duration-normal)] ease-[var(--easing-default)]`."

> "Create a bottom sheet modal. Scrim uses `var(--color-scrim)` with `var(--blur-weak)` backdrop blur. Sheet uses `bg-bg-elevated`, `rounded-t-[var(--radius-3xl)]`, `shadow-[var(--shadow-modal)]`, `z-[var(--z-modal)]`. Enter animation `var(--duration-slow) var(--easing-spring)`."

### Iteration checklist (before marking a component done)

1. No hardcoded hex colors — all colors reference `--color-*` tokens
2. No hardcoded font families — use `font-primary` / `font-handwritten` / `font-label` etc.
3. Radius values come from the scale (`--radius-*`)
4. Shadows come from the shadow scale (`--shadow-*`)
5. Transitions use `--duration-*` and `--easing-*` tokens
6. Z-index values come from the z scale
7. Focus states use `--shadow-focus` or `--color-focus-ring`
8. Disabled states use `--state-disabled-*`
9. Validated visually against the Figma source
10. Props typed with `{ComponentName}Props` interface, JSDoc on exported props

## Aurora Component Library (from Figma)

The Figma file contains 180+ component sets with 1,307 variants across these categories:

### Navigation & Layout
Bottom Nav Bar, Titlebar, Top Nav Tab Labels, In-Line Tabs, Filter Tabs, Page Headers, Widget Headers

### Buttons & Controls
Primary, Secondary, Tertiary, FAB, Circular Action, Toggle, Checkbox, Radio Button, Radio Tiles, Counter Card

### Cards (most common component type)
Big Image Card, Big Poster Card, Small/Medium/Circle Thumbnail Cards, Catalog Cards, Action Cards, Habit Cards, Membership Cards, Progress Cards, Stats Cards, SKU Cards

### Lists
Bullet ListView, Enclosed ListView, Icon/Medium/Small/Text-Only Thumbnail ListViews, List View Action Cards

### Carousels
Catalog, Circles, Fitness Stats, Image, Offers, Posters, Tall Catalog, Thumbnail Card, Timer/Offer

### Forms & Inputs
Text Input, Search Field, Number/OTP/Password/Phone Fields, Dropdown, Free Text

### Tags & Badges
Badge, Status Tags, Context Tags, Date Labels

### Progress & Stats
Continuous/Sleek/Discrete Progress Bars, Digital Timer, Pagination Dots, Stats Tiles, EnergyMeter

### Communication
Chat Bubble, Chat Input, Toast, Section Message, Testimonials

## Figma MCP Integration Rules

These rules define how to translate Figma inputs into code for this project and must be followed for every Figma-driven change.

### Figma File Reference
- **File key:** `jD7tZtVeQCMRlIHN7L8umI`
- **Name:** Aurora App Design System
- **Pages:** New? Start Here, Design Principles, Sub-Atoms (Tokens), Atoms, Molecules, Organisms, Templates, Haptic Feedback, Contextual Transition, Exceptions, Schemas, Processes

### Required Flow (do not skip)

1. Run `get_figma_data` first to fetch the structured representation for the exact node(s)
2. If the response is too large or truncated, re-fetch only the required node(s) with a specific `nodeId`
3. Only after you have the design data, download any assets with `download_figma_images` and start implementation
4. Translate the output into this project's conventions, styles, and framework
5. Validate against Figma for 1:1 look and behavior before marking complete

### Implementation Rules

- Treat the Figma MCP output as a representation of design and behavior, not as final code style
- Map Figma color style names to the project's CSS custom property tokens in `my-app/src/index.css`:
  - "White" / "Neutral/White" → `--color-text-white` / `--color-light-primary`
  - "Dark Ink" → `--color-dark-ink`
  - "Dark Primary" → `--color-dark-primary`
  - "Curefit Yellow" → `--color-curefit-yellow`
  - "Curefit Pink" → `--color-curefit-pink`
  - "Curefit Blue" / "Status Neutral" → `--color-curefit-blue` / `--color-status-neutral`
  - "Status Positive" → `--color-status-positive`
  - "Status Negative" / "Error Red" → `--color-status-negative`
  - "Light / Trunks / 100" / "Text 2" → `--color-text-2`
  - "Light / Bulma / 100" → `--color-dark-primary`
- IMPORTANT: Reuse existing components from `my-app/src/components/ui/` instead of duplicating functionality
- Use the project's color system, typography scale, and spacing tokens consistently
- Strive for 1:1 visual parity with the Figma design
- Validate the final UI against the Figma screenshot for both look and behavior

## Component Guidelines

- Place reusable UI primitives in `my-app/src/components/ui/`
- Place feature/page components in `my-app/src/components/`
- Reuse existing components before creating new ones
- All component props must have TypeScript interfaces using `{ComponentName}Props` suffix
- Use named exports: `export function ComponentName`
- Components should accept a `className` prop for composition where appropriate
- Use PascalCase for component names

## Styling

- Use Tailwind CSS utility classes for all styling
- This project uses Tailwind v4 — tokens are in `@theme` blocks in CSS, NOT in `tailwind.config.js`
- Map Figma design tokens to the CSS custom properties defined in `my-app/src/index.css`
- IMPORTANT: Avoid hardcoded color/spacing values — use Tailwind's theme scale
- Prefer Tailwind's built-in responsive prefixes (`sm:`, `md:`, `lg:`) for responsive layouts
- For precise typography control (letter-spacing, line-height), inline styles are acceptable when Tailwind classes don't provide exact values
- Mobile-first design (base width: 375px, dark theme)

## Asset Handling

- The Figma MCP server provides `download_figma_images` to fetch image and SVG assets
- IMPORTANT: If the Figma MCP server returns a localhost source for an image or SVG, use that source directly
- IMPORTANT: DO NOT import/add new icon packages — all assets should come from the Figma payload
- IMPORTANT: DO NOT use or create placeholders if a localhost source is provided
- Store downloaded assets in `my-app/src/assets/` or `my-app/public/` as appropriate

## Accessibility

- Follow WCAG 2.1 AA standards
- Use semantic HTML elements (`article`, `section`, `header`, etc.)
- Include `aria-label` and `aria-hidden` attributes where appropriate
- Use `sr-only` class for screen-reader-only text
- Ensure sufficient color contrast per Figma specs

## Code Quality

- TypeScript strict mode enabled
- No `any` types unless absolutely necessary
- Keep components composable and focused on a single responsibility
- Use JSDoc comments on exported component interfaces
- Use relative imports (no path aliases configured)
