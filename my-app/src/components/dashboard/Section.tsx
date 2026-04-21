import type { ReactNode } from "react";

export function Section({
  title,
  eyebrow,
  description,
  children,
}: {
  title: string;
  eyebrow?: string;
  description?: string;
  children: ReactNode;
}) {
  return (
    <section className="mb-12">
      {eyebrow && (
        <div className="mb-2 text-[10px] font-bold uppercase tracking-[1px] text-[color:var(--color-text-2)]">
          {eyebrow}
        </div>
      )}
      <h2 className="mb-2 text-[20px] font-bold">{title}</h2>
      {description && (
        <p className="mb-6 max-w-[640px] text-[14px] text-[color:var(--color-text-2)]">
          {description}
        </p>
      )}
      {children}
    </section>
  );
}

export function Grid({
  cols = 4,
  children,
}: {
  cols?: 2 | 3 | 4 | 5 | 6;
  children: ReactNode;
}) {
  const map = { 2: "grid-cols-2", 3: "grid-cols-3", 4: "grid-cols-4", 5: "grid-cols-5", 6: "grid-cols-6" };
  return <div className={`grid gap-3 ${map[cols]}`}>{children}</div>;
}

export function Card({ children, className = "" }: { children: ReactNode; className?: string }) {
  return <div className={`aurora-card p-4 ${className}`}>{children}</div>;
}

export function Label({ children }: { children: ReactNode }) {
  return (
    <div className="text-[10px] font-bold uppercase tracking-[1px] text-[color:var(--color-text-2)]">
      {children}
    </div>
  );
}

export function Mono({ children }: { children: ReactNode }) {
  return (
    <code className="text-[12px] text-[color:var(--color-text-2)]" style={{ fontFamily: "var(--font-mono)" }}>
      {children}
    </code>
  );
}
