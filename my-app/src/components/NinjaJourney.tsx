import backgroundStars from "../assets/ninja/background.png";
import containerArt from "../assets/ninja/container.png";

/**
 * NinjaJourney — A dark-themed gamified fitness journey page.
 * Displays an isometric 3D staircase with milestone levels.
 * Matches Figma: Ninja 10x, node 3081-7864 ("1. Day 504").
 */
export function NinjaJourney() {
  return (
    <section
      className="relative w-[375px] h-[812px] overflow-hidden bg-black"
      aria-label="Ninja 10x fitness journey — Day 504"
      role="img"
    >
      {/* Starry background — positioned to match Figma offset */}
      <img
        src={backgroundStars}
        alt=""
        aria-hidden="true"
        className="pointer-events-none absolute object-cover"
        style={{
          left: "-53px",
          top: "-40px",
          width: "491px",
          height: "1051px",
        }}
      />

      {/* 3D isometric staircase illustration with labels, lines, tiles, and badge */}
      <img
        src={containerArt}
        alt=""
        aria-hidden="true"
        className="absolute"
        style={{
          left: "-19px",
          top: "200px",
          width: "394px",
          height: "800px",
        }}
      />

      {/* Screen-reader-only milestone descriptions */}
      <div className="sr-only">
        <h2>Fitness Journey Milestones</h2>
        <ol>
          <li>Build Strength — Summit badge achieved</li>
          <li>Increase Stamina — Level 2</li>
          <li>Build Energy — In progress</li>
          <li>Conquer Will Power — Starting level</li>
        </ol>
      </div>
    </section>
  );
}
