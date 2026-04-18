import activityImage from "../../assets/activity-image.png";
import backgroundTexture from "../../assets/background-texture.png";

/** Props for an individual stat displayed at the bottom of the card */
interface StatItemProps {
  /** Label text (e.g. "DURATION") */
  label: string;
  /** Value text in handwritten style (e.g. "02 Hrs") */
  value: string;
}

/** Props for the ActivityCard component */
export interface ActivityCardProps {
  /** The main activity name displayed in handwritten purple text */
  activityName?: string;
  /** Journey/program name */
  journeyTitle?: string;
  /** Week and day info */
  weekInfo?: string;
  /** Activity image source URL */
  imageSrc?: string;
  /** Alt text for the activity image */
  imageAlt?: string;
  /** Stat items at the bottom */
  stats?: StatItemProps[];
}

/**
 * A single stat item matching Figma layout:
 * Small-caps label with handwritten value beside it,
 * dashed line underneath.
 */
function StatBlock({ label, value }: StatItemProps) {
  return (
    <div className="flex-1 min-w-0 overflow-hidden">
      {/* Label + value inline */}
      <div className="flex items-end whitespace-nowrap">
        <span
          className="font-label font-bold uppercase text-black shrink-0"
          style={{ fontSize: "11px", letterSpacing: "0.2px", lineHeight: "1.8" }}
        >
          {label} :
        </span>
        <span
          className="font-handwritten font-bold text-accent-purple ml-0.5"
          style={{
            fontSize: "22px",
            letterSpacing: "-2px",
            lineHeight: "0.9",
          }}
        >
          {value}
        </span>
      </div>
      {/* Dashed underline */}
      <div className="w-full border-t border-dashed border-line-gray mt-0.5" />
    </div>
  );
}

/**
 * ActivityCard — A social share/story card displaying an activity achievement.
 * Matches the Figma design: Global Dev Handoff V2 2025, node 6632-3862.
 */
export function ActivityCard({
  activityName = "Swimming",
  journeyTitle = "CULT NINJA JOURNEY",
  weekInfo = "WEEK 1 / DAY 2",
  imageSrc = activityImage,
  imageAlt = "Person swimming in a pool",
  stats = [
    { label: "DURATION", value: "02 Hrs" },
    { label: "PERSONAL BEST", value: "10 Laps" },
  ],
}: ActivityCardProps) {
  return (
    <article
      className="relative w-full max-w-[375px] overflow-hidden bg-card-bg"
      style={{ aspectRatio: "576 / 1025" }}
      role="img"
      aria-label={`Activity achievement card: ${activityName}`}
    >
      {/* Background texture with linear-burn blend mode */}
      <img
        src={backgroundTexture}
        alt=""
        aria-hidden="true"
        className="pointer-events-none absolute inset-0 h-full w-full object-cover mix-blend-darken opacity-90"
      />

      {/* Card content */}
      <div className="relative z-10 flex h-full flex-col px-4 pt-5 pb-4">
        {/* Progress pill at top center */}
        <div className="mb-4 flex justify-center">
          <div
            className="h-[8px] w-[93px] rounded-full bg-white"
            style={{
              boxShadow: "inset 0 4px 4px rgba(0,0,0,0.25)",
            }}
            role="presentation"
          />
        </div>

        {/* Title: "I DID [activity] TODAY!" — tightly stacked like Figma */}
        <header className="mb-1">
          <div className="relative">
            <span
              className="block font-heading font-bold uppercase text-text-dark"
              style={{
                fontSize: "42px",
                lineHeight: "1.0",
                letterSpacing: "-3.4px",
              }}
            >
              I Did
            </span>
            <span
              className="block font-handwritten font-normal text-accent-purple"
              style={{
                fontSize: "52px",
                lineHeight: "0.75",
                letterSpacing: "-5.4px",
                marginTop: "-4px",
                marginBottom: "-2px",
              }}
            >
              {activityName}
            </span>
            <span
              className="block font-heading font-bold uppercase text-text-dark"
              style={{
                fontSize: "42px",
                lineHeight: "1.35",
                letterSpacing: "-3.4px",
              }}
            >
              Today!
            </span>
          </div>
        </header>

        {/* Dashed separator */}
        <div className="mb-1.5 w-full border-t border-dashed border-line-gray" />

        {/* Journey info row */}
        <div className="mb-2.5 flex items-center justify-between">
          <span
            className="font-heading font-medium uppercase text-text-dark"
            style={{ fontSize: "13px", letterSpacing: "2.6px" }}
          >
            {journeyTitle}
          </span>
          <span
            className="font-heading font-medium uppercase text-text-dark"
            style={{ fontSize: "13px", letterSpacing: "2.6px" }}
          >
            {weekInfo}
          </span>
        </div>

        {/* Activity image — fills remaining space */}
        <div className="mb-3 flex-1 min-h-0 overflow-hidden">
          <img
            src={imageSrc}
            alt={imageAlt}
            className="h-full w-full object-cover"
          />
        </div>

        {/* Stats row at bottom */}
        <div className="flex items-end gap-2">
          {stats.map((stat) => (
            <StatBlock key={stat.label} label={stat.label} value={stat.value} />
          ))}
        </div>
      </div>
    </article>
  );
}
