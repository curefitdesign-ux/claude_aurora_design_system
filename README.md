# Claude Aurora Design System

The portable, AI-ready version of the **Aurora** design system (Curefit). Single source of truth → every platform.

## What's in here

```
.
├── CLAUDE.md                        rules for AI coding agents
├── TOKENS.md                        token reference + CTA usage
├── aurora.policy.json               machine-readable allow/deny
├── aurora.agent.yaml                portable component recipes
├── aurora.flat.json                 flat key→value dump
├── design-tokens/
│   └── aurora.tokens.json           W3C DTCG source of truth
├── scripts/
│   └── check-aurora.mjs             compliance linter
└── my-app/                          reference React + Tailwind v4 app
    └── src/
        ├── index.css                imports all style layers in order
        └── styles/
            ├── tokens/              primitives · semantics · typography · spacing · motion
            ├── components/          cta · card · aurora-bg (tokens + utilities)
            └── themes/              white.css (.theme-white)
```

## How AI agents consume Aurora

Any agent (Codex, Cursor, Claude Code, Copilot) picks up:

1. **`CLAUDE.md`** — binding rules
2. **`TOKENS.md`** — token reference + CTA usage examples
3. **`aurora.policy.json`** — machine-readable allow/deny
4. **`aurora.agent.yaml`** — portable component recipes
5. **`aurora.flat.json`** — 213+ resolved tokens

Drop these five files + `design-tokens/` into any project and AI suggestions will use only Aurora tokens.

## How the web reference app consumes Aurora

```bash
cd my-app
npm install
npm run dev
npm run aurora:check      # gate on token compliance
```

Tokens live in `src/styles/tokens/` inside Tailwind v4 `@theme` blocks. Use the `.aurora-cta`, `.aurora-card`, `.aurora-bg` utility classes or reference the tokens directly via `var(--…)`.

## Themes

Default is dark. To switch to light:

```tsx
<body className="theme-white">…</body>
// or scope:
<section className="theme-white">…</section>
```

Brand colors, gradient, typography, spacing, aurora-bg blobs preserved in both. Only surfaces / text / overlays / shadows / CTA-primary flip.

## Enforcement

`.aurora-cta` forces uppercase + tracking + font-weight at the CSS layer — agents can't forget them by composing bespoke Tailwind. `npm run aurora:check` backstops the CSS with a lint over `components/` and `App.tsx`.

## Principles

1. **One source of truth.** Everything derives from `design-tokens/aurora.tokens.json` (mirrored to CSS custom properties).
2. **Three-tier tokens.** Primitive (`color.curefit.*`) → Semantic (`color.surface.*`, `color.text.*`) → Component (`cta.*`, `card.*`). Components consume utility classes or semantics, never primitives.
3. **Non-destructive.** Existing token values don't change silently. The linter gates violations.
4. **AI-first.** Every token has agent-readable intent docs + a machine-readable policy.

## License

Internal Curefit project. Not for public distribution.
