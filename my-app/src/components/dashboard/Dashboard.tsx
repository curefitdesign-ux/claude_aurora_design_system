import { useState } from "react";
import { Foundations } from "./Foundations";
import { Components } from "./Components";

type View = "foundations" | "components";

/**
 * Aurora Dashboard — a structured gallery of every token, element, and
 * component in the design system. Follows an Airbnb DLS / Spotify Encore
 * style hierarchy: Foundations → Components → Themes.
 */
export function Dashboard() {
  const [view, setView] = useState<View>("foundations");
  const [theme, setTheme] = useState<"dark" | "white">("dark");

  // Apply theme class to <body> so all global tokens flip.
  if (typeof document !== "undefined") {
    document.body.classList.toggle("theme-white", theme === "white");
  }

  return (
    <div className="min-h-screen w-full text-[color:var(--color-text-white)]">
      {/* Top bar */}
      <header className="sticky top-0 z-[var(--z-sticky)] flex items-center justify-between px-5 py-4 backdrop-blur-[var(--blur-md)]">
        <div className="flex items-center gap-3">
          <div className="h-6 w-6 rounded-[var(--radius-2xs)] bg-[var(--gradient-yellow-pink)]" />
          <h1 className="text-[16px] font-bold tracking-[0.2px]">Aurora · Design System</h1>
        </div>
        <div className="flex items-center gap-2">
          <button
            className="aurora-cta aurora-cta--tertiary aurora-cta--sm"
            onClick={() => setTheme(theme === "dark" ? "white" : "dark")}
          >
            {theme === "dark" ? "Light" : "Dark"}
          </button>
        </div>
      </header>

      <div className="mx-auto grid max-w-[1280px] grid-cols-[200px_1fr] gap-8 px-5 pb-20">
        {/* Sidebar */}
        <nav className="sticky top-20 h-max">
          <SidebarGroup title="Navigate">
            <SidebarLink active={view === "foundations"} onClick={() => setView("foundations")}>
              Foundations
            </SidebarLink>
            <SidebarLink active={view === "components"} onClick={() => setView("components")}>
              Components
            </SidebarLink>
          </SidebarGroup>
        </nav>

        {/* Content */}
        <main className="min-w-0">{view === "foundations" ? <Foundations /> : <Components />}</main>
      </div>
    </div>
  );
}

function SidebarGroup({ title, children }: { title: string; children: React.ReactNode }) {
  return (
    <div className="mb-6">
      <div className="mb-2 text-[10px] font-bold uppercase tracking-[1px] text-[color:var(--color-text-2)]">
        {title}
      </div>
      <ul className="flex flex-col gap-1">{children}</ul>
    </div>
  );
}

function SidebarLink({
  active,
  onClick,
  children,
}: {
  active?: boolean;
  onClick?: () => void;
  children: React.ReactNode;
}) {
  return (
    <li>
      {/* nav pill, intentionally not a CTA */}
      <button /* ok:button */
        onClick={onClick}
        className={`w-full rounded-[var(--radius-2xs)] px-3 py-2 text-left text-[14px] font-medium transition-colors duration-[var(--duration-normal)] ${
          active
            ? "bg-[var(--state-selected-bg)] text-[color:var(--color-text-white)]"
            : "text-[color:var(--color-text-2)] hover:bg-[var(--state-hover-bg)]"
        }`}
      >
        {children}
      </button>
    </li>
  );
}
