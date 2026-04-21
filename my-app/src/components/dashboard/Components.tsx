import { Section, Card, Grid, Mono, Label } from "./Section";

/* ============================================================
   Components — every element in the Aurora library, with variants.
   Sourced from styles/components/*.css + Figma Aurora App DS.
   ============================================================ */

export function Components() {
  return (
    <div>
      <Section
        eyebrow="Aurora"
        title="Components"
        description="Every component and its variants. CTA typography is baked into the .aurora-cta class (uppercase + 0.5px tracking + Inter 700) — you cannot skip the rule by forgetting a utility."
      >
        {/* CTA */}
        <SubSection title="Action · CTA" note=".aurora-cta + --primary / --secondary / --tertiary">
          <Card>
            <Label>Primary · Large (50px)</Label>
            <div className="mt-3 flex flex-wrap gap-3">
              <button className="aurora-cta aurora-cta--primary">Primary action</button>
              <button className="aurora-cta aurora-cta--primary" disabled>Disabled</button>
            </div>
          </Card>

          <Card className="mt-3">
            <Label>Primary · Small (40px)</Label>
            <div className="mt-3 flex flex-wrap gap-3">
              <button className="aurora-cta aurora-cta--primary aurora-cta--sm">Confirm</button>
            </div>
          </Card>

          <Card className="mt-3">
            <Label>Secondary · Glass</Label>
            <div className="mt-3 flex flex-wrap gap-3">
              <button className="aurora-cta aurora-cta--secondary">Secondary</button>
              <button className="aurora-cta aurora-cta--secondary is-booked">Success state</button>
              <button className="aurora-cta aurora-cta--secondary is-waitlist">Pending state</button>
              <button className="aurora-cta aurora-cta--secondary is-full">Unavailable</button>
              <button className="aurora-cta aurora-cta--secondary is-negative">Destructive</button>
              <button className="aurora-cta aurora-cta--secondary" disabled>Disabled</button>
            </div>
          </Card>

          <Card className="mt-3">
            <Label>Tertiary</Label>
            <div className="mt-3 flex flex-wrap gap-3">
              <button className="aurora-cta aurora-cta--tertiary">Tertiary</button>
              <button className="aurora-cta aurora-cta--tertiary aurora-cta--sm">Details</button>
              <button className="aurora-cta aurora-cta--tertiary" disabled>Disabled</button>
            </div>
          </Card>

          <Card className="mt-3">
            <Label>Twins · Two-CTA row (required for side-by-side CTAs)</Label>
            <div className="mt-3 aurora-cta-twins">
              <button className="aurora-cta aurora-cta--secondary">Cancel</button>
              <button className="aurora-cta aurora-cta--primary">Confirm</button>
            </div>
          </Card>
        </SubSection>

        {/* CARDS */}
        <SubSection title="Surface · Card" note=".aurora-card · 10%/60% white · 30–40px blur · reflective border">
          <Grid cols={2}>
            <Card>
              <Label>Media + Title Card</Label>
              <div className="mt-3 flex items-center gap-4">
                <div className="flex h-16 w-16 flex-col items-center justify-center rounded-[var(--radius-card)] bg-[var(--gradient-yellow-pink)]">
                  <div className="text-[20px] font-black leading-none">A</div>
                  <div className="mt-1 text-[9px] font-bold uppercase tracking-[1px]">Label</div>
                </div>
                <div className="min-w-0">
                  <div className="truncate text-[16px] font-bold">Card title</div>
                  <div className="text-[14px] text-[color:var(--color-text-2)]">Secondary line</div>
                </div>
              </div>
            </Card>

            <Card>
              <Label>Stat Card</Label>
              <div className="mt-3">
                <div className="text-[38px] font-black leading-none">128</div>
                <div className="mt-1 text-[12px] font-bold uppercase tracking-[1px] text-[color:var(--color-text-2)]">
                  Metric label
                </div>
              </div>
            </Card>
          </Grid>
        </SubSection>

        {/* CHIPS */}
        <SubSection title="Chip" note="--radius-chip (15px) · P8 12px medium">
          <Card>
            <div className="flex flex-wrap gap-2">
              {["Option A", "Option B", "Option C", "Option D", "Option E", "Option F"].map((c, i) => (
                <span
                  key={c}
                  className="rounded-[var(--radius-chip)] px-3 py-1.5 text-[12px] font-medium"
                  style={{
                    backgroundColor: i === 0 ? "var(--state-selected-bg)" : "var(--color-white-10)",
                    color: "var(--color-text-white)",
                  }}
                >
                  {c}
                </span>
              ))}
            </div>
          </Card>
        </SubSection>

        {/* TAGS */}
        <SubSection title="Tag" note="P6 / Tag · 10px bold uppercase · 1px tracking">
          <Card>
            <div className="flex flex-wrap items-center gap-3">
              <Tag color="var(--color-status-positive)">Active</Tag>
              <Tag color="var(--color-status-negative)">Expired</Tag>
              <Tag color="var(--color-status-alert)">Alert</Tag>
              <Tag color="var(--color-status-neutral)">Info</Tag>
              <Tag color="var(--color-curefit-pink)">Featured</Tag>
              <Tag color="var(--color-curefit-yellow)">Promo</Tag>
            </div>
          </Card>
        </SubSection>

        {/* INPUTS */}
        <SubSection title="Form · Input" note="Glass surface · Inter 16px regular">
          <Grid cols={2}>
            <Card>
              <Label>Text field</Label>
              <input
                type="text"
                placeholder="Placeholder text"
                className="mt-3 w-full rounded-[var(--radius-2xs)] bg-[color:var(--color-white-10)] px-4 py-3 text-[16px] outline-none focus-visible:shadow-[var(--shadow-focus)]"
                style={{ color: "var(--color-text-white)" }}
              />
            </Card>
            <Card>
              <Label>Search</Label>
              <div className="mt-3 flex items-center gap-2 rounded-[var(--radius-pill)] bg-[color:var(--color-white-10)] px-4 py-2.5">
                <span aria-hidden className="text-[color:var(--color-text-2)]">⌕</span>
                <input
                  type="text"
                  placeholder="Search"
                  className="w-full bg-transparent text-[14px] outline-none"
                  style={{ color: "var(--color-text-white)" }}
                />
              </div>
            </Card>
          </Grid>
        </SubSection>

        {/* PROGRESS */}
        <SubSection title="Progress · Continuous">
          <Card>
            <Label>Continuous bar · 72%</Label>
            <div className="mt-3 h-2 w-full overflow-hidden rounded-[var(--radius-full)] bg-[color:var(--color-white-10)]">
              <div className="h-full w-[72%] rounded-[var(--radius-full)] bg-[var(--gradient-yellow-pink)]" />
            </div>
            <div className="mt-2 text-[12px] text-[color:var(--color-text-2)]">
              <Mono>--radius-full · --gradient-yellow-pink</Mono>
            </div>
          </Card>
          <Card className="mt-3">
            <Label>Discrete · 4 / 7</Label>
            <div className="mt-3 flex gap-1.5">
              {[1, 2, 3, 4, 5, 6, 7].map((n) => (
                <div
                  key={n}
                  className="h-2 flex-1 rounded-[var(--radius-full)]"
                  style={{ background: n <= 4 ? "var(--gradient-yellow-pink)" : "var(--color-white-10)" }}
                />
              ))}
            </div>
          </Card>
        </SubSection>

        {/* BADGES */}
        <SubSection title="Badge · Energy indicator">
          <Grid cols={4}>
            {[
              ["Low", "var(--color-status-positive)"],
              ["Medium", "var(--color-status-alert)"],
              ["High", "var(--color-coral)"],
              ["Pro", "var(--gradient-yellow-pink)"],
            ].map(([label, fill]) => (
              <Card key={label}>
                <div
                  className="mx-auto mb-3 flex h-12 w-12 items-center justify-center rounded-[var(--radius-avatar)] text-[10px] font-bold uppercase tracking-[1px]"
                  style={{ background: fill, color: "var(--color-text-white)" }}
                >
                  {label === "Pro" ? "★" : label.slice(0, 2)}
                </div>
                <div className="text-center text-[14px] font-bold">{label}</div>
              </Card>
            ))}
          </Grid>
        </SubSection>

        {/* TOAST */}
        <SubSection title="Toast · Section message">
          <Card>
            <div className="flex items-center gap-3 rounded-[var(--radius-card)] p-3" style={{ background: "var(--color-white-10)" }}>
              <div
                className="flex h-6 w-6 shrink-0 items-center justify-center rounded-[var(--radius-avatar)]"
                style={{ background: "var(--color-status-positive)", color: "var(--color-text-white)" }}
              >
                ✓
              </div>
              <div className="text-[14px]">Action completed successfully</div>
            </div>
          </Card>
        </SubSection>
      </Section>
    </div>
  );
}

function SubSection({ title, note, children }: { title: string; note?: string; children: React.ReactNode }) {
  return (
    <div className="mb-10">
      <div className="mb-3 flex items-baseline gap-3">
        <h3 className="text-[16px] font-bold">{title}</h3>
        {note && <Mono>{note}</Mono>}
      </div>
      {children}
    </div>
  );
}

function Tag({ color, children }: { color: string; children: React.ReactNode }) {
  return (
    <span
      className="rounded-[var(--radius-xs)] px-2 py-1 text-[10px] font-bold uppercase tracking-[1px]"
      style={{ background: color, color: "var(--color-text-white)" }}
    >
      {children}
    </span>
  );
}
