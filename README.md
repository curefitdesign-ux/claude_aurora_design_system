# Claude Aurora Design System

The portable, AI-ready version of the **Aurora** design system (Curefit). Single source of truth → every platform.

## What's in here

```
.
├── design-tokens/
│   ├── aurora.tokens.json      # W3C DTCG source of truth
│   └── .baseline/              # frozen snapshot for drift detection
├── my-app/                     # reference React + Tailwind v4 app
│   └── src/
│       ├── index.css           # Aurora tokens in @theme block
│       └── components/ui/      # reference component implementations
├── TOKENS.md                   # agent-facing token reference
├── aurora.agent.yaml           # portable component recipes
├── aurora.flat.json            # 213 resolved tokens, flat key/value
└── CLAUDE.md                   # project conventions + Agent Prompt Guide
```

## Consuming Aurora from an AI agent (Codex, Cursor, Claude Code, Copilot)

Any agent looking at this repo picks up:

1. **`TOKENS.md`** — when to use each token, when not to, one-line examples.
2. **`aurora.agent.yaml`** — structured recipes (card, pill button, chip, modal…).
3. **`aurora.flat.json`** — machine-readable; 213 fully-resolved tokens.

Drop these three files at the root of any project that needs Aurora and AI suggestions will use the right tokens.

## Consuming Aurora from web

The reference implementation lives in `my-app/`:

```bash
cd my-app
npm install
npm run dev
```

Aurora tokens are in `src/index.css` inside the Tailwind v4 `@theme` block — use Tailwind utility classes (`bg-curefit-yellow`, `text-text-muted`, `rounded-[var(--radius-card)]`) directly.

## Non-destructive by design

This repo follows a single invariant: **no visual changes without explicit approval.**

- `design-tokens/.baseline/index.css.frozen` is the byte-exact ground truth.
- Any PR that regenerates `my-app/src/index.css` must produce a byte-identical diff against the baseline, or be tagged with an approved visual change.
- The guardrail workflow in `.github/workflows/` (optional) enforces this in CI.

## Platform adapters

Full multi-platform export (iOS Swift, Android XML + Compose, React Native, flat CSS, typed TS) is wired through [Style Dictionary](https://amzn.github.io/style-dictionary/). The config and template live in the `aurora-scale` skill — run when you need native outputs:

```bash
cd my-app
npm install --save-dev style-dictionary
# copy style-dictionary.config.mjs from the skill templates
npm run tokens:build
```

Generated outputs land in `my-app/dist/` for each platform.

## Principles

1. **One source of truth.** Everything derives from `design-tokens/aurora.tokens.json`.
2. **Three-tier tokens.** Primitive → Semantic → Component. Components consume semantic names; semantics alias primitives.
3. **Non-destructive.** Hex values never change silently. CI blocks drift.
4. **AI-first.** Every token and component has agent-readable intent docs.

## License

Internal Curefit project. Not for public distribution.
