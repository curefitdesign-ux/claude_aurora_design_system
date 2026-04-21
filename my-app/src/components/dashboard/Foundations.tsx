import { Section, Card, Grid, Mono } from "./Section";

/* ============================================================
   Foundations — every design-system token, visualized.
   Sourced from styles/tokens/*.css (primitives → semantics → scales).
   ============================================================ */

const BRAND = [
  ["curefit-yellow", "#F5BC00"],         // ok:hex
  ["curefit-yellow-light", "#FFDC18"],   // ok:hex
  ["curefit-pink", "#FF3278"],           // ok:hex
  ["curefit-blue", "#00BEFF"],           // ok:hex
  ["curefit-green", "#0FE498"],          // ok:hex
  ["coral", "#FF5942"],                  // ok:hex
  ["gold", "#F7C744"],                   // ok:hex
];

const SURFACE = [
  ["bg-dark", "var(--color-bg-dark)"],
  ["bg-card", "var(--color-bg-card)"],
  ["bg-card-solid", "var(--color-bg-card-solid)"],
  ["bg-elevated", "var(--color-bg-elevated)"],
  ["bg-surface", "var(--color-bg-surface)"],
];

const TEXT = [
  ["text-white", "var(--color-text-white)"],
  ["text-2", "var(--color-text-2)"],
  ["white-60", "var(--color-white-60)"],
  ["white-40", "var(--color-white-40)"],
  ["white-10", "var(--color-white-10)"],
];

const STATUS = [
  ["status-positive", "var(--color-status-positive)"],
  ["status-negative", "var(--color-status-negative)"],
  ["status-alert", "var(--color-status-alert)"],
  ["status-neutral", "var(--color-status-neutral)"],
];

const TYPE_SCALE = [
  ["H1", "20px", 700, "Section heading"],
  ["H2", "18px", 700, "Sub heading"],
  ["H3", "18px", 500, "Sub heading light"],
  ["H4", "16px", 700, "Small heading"],
  ["H5", "50px", 900, "Hero display"],
  ["H7", "38px", 900, "Large display"],
  ["H8", "35px", 500, "Medium display"],
  ["H9", "24px", 800, "Featured"],
  ["H10", "30px", 700, "Large heading"],
  ["P1", "16px", 500, "Body / medium"],
  ["P2", "16px", 400, "Body"],
  ["P4", "14px", 500, "Caption"],
  ["P5", "14px", 400, "Body small"],
  ["P6", "12px", 700, "All-caps label", true],
  ["P8", "12px", 400, "Small text"],
  ["P10", "10px", 400, "Micro"],
  ["CTA", "14px", 700, "CTA label", true],
] as const;

const SPACING = [
  ["1", 5], ["2", 10], ["3", 15], ["4", 20], ["5", 24], ["6", 30],
  ["8", 40], ["10", 50], ["12", 60], ["16", 80], ["20", 100], ["30", 150],
] as const;

const RADIUS = [
  ["xs", 4], ["2xs", 5], ["sm", 8], ["card", 10], ["md", 12], ["chip", 15],
  ["lg", 16], ["xl", 20], ["2xl", 30], ["3xl", 40], ["pill", 50], ["avatar", 100],
] as const;

const SHADOW = [
  ["subtle", "--shadow-subtle"],
  ["low", "--shadow-low"],
  ["medium", "--shadow-medium"],
  ["high", "--shadow-high"],
  ["floating", "--shadow-floating"],
  ["modal", "--shadow-modal"],
] as const;

const BLUR = [
  ["xs", 4], ["sm", 10], ["md", 30], ["lg", 80], ["xl", 120], ["2xl", 160], ["3xl", 200], ["full", 300],
] as const;

const MOTION_DURATION = [
  ["fast", 120], ["normal", 200], ["slow", 320], ["slower", 480],
] as const;

const MOTION_EASING = [
  ["in", "cubic-bezier(0.4, 0, 1, 1)"],
  ["out", "cubic-bezier(0, 0, 0.2, 1)"],
  ["default", "cubic-bezier(0.4, 0, 0.2, 1)"],
  ["spring", "cubic-bezier(0.175, 0.885, 0.32, 1.275)"],
] as const;

const Z = [
  ["base", 0], ["dropdown", 100], ["sticky", 200],
  ["overlay", 300], ["modal", 400], ["toast", 500], ["tooltip", 600],
] as const;

export function Foundations() {
  return (
    <div>
      <Section
        eyebrow="Aurora"
        title="Foundations"
        description="Every primitive and semantic token. Consume these via CSS custom properties (var(--color-*), var(--radius-*), etc.) — never hardcode."
      >
        {/* PALETTE */}
        <SubSection title="Palette · Brand">
          <Grid cols={4}>{BRAND.map(([name, hex]) => <Swatch key={name} name={name} value={hex} />)}</Grid>
        </SubSection>

        <SubSection title="Palette · Surface">
          <Grid cols={5}>{SURFACE.map(([name, val]) => <Swatch key={name} name={name} value={val} />)}</Grid>
        </SubSection>

        <SubSection title="Palette · Text">
          <Grid cols={5}>{TEXT.map(([name, val]) => <Swatch key={name} name={name} value={val} />)}</Grid>
        </SubSection>

        <SubSection title="Palette · Status">
          <Grid cols={4}>{STATUS.map(([name, val]) => <Swatch key={name} name={name} value={val} />)}</Grid>
        </SubSection>

        {/* TYPE */}
        <SubSection title="Type">
          <div className="flex flex-col gap-2">
            {TYPE_SCALE.map(([name, size, weight, note, caps]) => (
              <Card key={name}>
                <div className="flex items-baseline justify-between gap-4">
                  <div
                    style={{
                      fontFamily: "var(--font-primary)",
                      fontSize: size,
                      fontWeight: weight,
                      lineHeight: 1.1,
                      textTransform: caps ? "uppercase" : "none",
                      letterSpacing: caps ? "0.5px" : undefined,
                    }}
                  >
                    {name === "CTA" ? "Book a class" : "Aurora type scale"}
                  </div>
                  <div className="shrink-0 text-right">
                    <div className="text-[14px] font-bold">{name}</div>
                    <Mono>{size} · {weight} · {note}</Mono>
                  </div>
                </div>
              </Card>
            ))}
          </div>
        </SubSection>

        {/* SPACING */}
        <SubSection title="Spacing · 5px rhythm">
          <div className="flex flex-col gap-2">
            {SPACING.map(([name, px]) => (
              <Card key={name}>
                <div className="flex items-center gap-4">
                  <div className="w-16 shrink-0 text-[14px] font-bold">--spacing-{name}</div>
                  <div
                    className="h-3 rounded-[var(--radius-xs)] bg-[var(--gradient-yellow-pink)]"
                    style={{ width: `${px}px` }}
                  />
                  <Mono>{px}px</Mono>
                </div>
              </Card>
            ))}
          </div>
        </SubSection>

        {/* RADIUS */}
        <SubSection title="Radius">
          <Grid cols={6}>
            {RADIUS.map(([name, px]) => (
              <Card key={name}>
                <div
                  className="mx-auto mb-3 h-16 w-16 bg-[var(--gradient-yellow-pink)]"
                  style={{ borderRadius: `${px}px` }}
                />
                <div className="text-center text-[14px] font-bold">{name}</div>
                <div className="text-center"><Mono>{px}px</Mono></div>
              </Card>
            ))}
          </Grid>
        </SubSection>

        {/* SHADOW */}
        <SubSection title="Elevation · Shadow">
          <Grid cols={3}>
            {SHADOW.map(([name, token]) => (
              <Card key={name}>
                <div
                  className="mx-auto mb-3 h-20 w-full rounded-[var(--radius-card)] bg-[var(--color-bg-elevated)]"
                  style={{ boxShadow: `var(${token})` }}
                />
                <div className="text-center text-[14px] font-bold">{name}</div>
                <div className="text-center"><Mono>{token}</Mono></div>
              </Card>
            ))}
          </Grid>
        </SubSection>

        {/* BLUR */}
        <SubSection title="Backdrop blur">
          <Grid cols={4}>
            {BLUR.map(([name, px]) => (
              <Card key={name}>
                <div className="relative mb-3 h-20 overflow-hidden rounded-[var(--radius-card)]">
                  <div className="absolute inset-0 bg-[var(--gradient-aurora-sky)]" />
                  <div
                    className="absolute inset-x-0 bottom-0 h-1/2 bg-[color:var(--color-bg-card)]"
                    style={{ backdropFilter: `blur(${px}px)`, WebkitBackdropFilter: `blur(${px}px)` }}
                  />
                </div>
                <div className="text-center text-[14px] font-bold">blur-{name}</div>
                <div className="text-center"><Mono>{px}px</Mono></div>
              </Card>
            ))}
          </Grid>
        </SubSection>

        {/* MOTION */}
        <SubSection title="Motion · Duration">
          <Grid cols={2}>
            {MOTION_DURATION.map(([name, ms]) => (
              <Card key={name}>
                <div className="mb-2 text-[14px] font-bold">duration-{name}</div>
                <Mono>{ms}ms</Mono>
              </Card>
            ))}
          </Grid>
        </SubSection>

        <SubSection title="Motion · Easing">
          <Grid cols={2}>
            {MOTION_EASING.map(([name, curve]) => (
              <Card key={name}>
                <div className="mb-2 text-[14px] font-bold">ease-{name}</div>
                <Mono>{curve}</Mono>
              </Card>
            ))}
          </Grid>
        </SubSection>

        {/* Z */}
        <SubSection title="Layer · Z-index">
          <Grid cols={4}>
            {Z.map(([name, val]) => (
              <Card key={name}>
                <div className="mb-1 text-[14px] font-bold">z-{name}</div>
                <Mono>{val}</Mono>
              </Card>
            ))}
          </Grid>
        </SubSection>
      </Section>
    </div>
  );
}

function SubSection({ title, children }: { title: string; children: React.ReactNode }) {
  return (
    <div className="mb-8">
      <h3 className="mb-3 text-[16px] font-bold">{title}</h3>
      {children}
    </div>
  );
}

function Swatch({ name, value }: { name: string; value: string }) {
  return (
    <Card>
      <div
        className="mb-3 h-16 w-full rounded-[var(--radius-2xs)]"
        style={{ background: value.startsWith("var(") ? value : value }}
      />
      <div className="text-[13px] font-bold">{name}</div>
      <Mono>{value}</Mono>
    </Card>
  );
}
