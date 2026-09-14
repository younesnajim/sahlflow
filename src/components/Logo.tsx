import type { CSSProperties } from "react";

export type LogoVariant = "default" | "reversed";

export interface LogoProps {
  /**
   * `reversed` is the primary lockup: white bubble, primary-green text.
   * `default` is the green bubble with white سهل and tint FLOW.
   */
  variant?: LogoVariant;
  /** Rendered width in px. Below 40 the FLOW line is dropped. */
  width?: number;
  className?: string;
  /** Accessible name; pass null to mark the logo decorative. */
  title?: string | null;
}

/** Below this width FLOW is illegible, so the mark drops to سهل alone. */
export const LOGO_COMPACT_MAX_WIDTH = 40;

const ASPECT = 150 / 180;

/** Bubble path — shared by both the full and the compact mark. */
const BUBBLE_D =
  "M34 8h112a26 26 0 0 1 26 26v54a26 26 0 0 1-26 26H62l-30 28 4-28h-2A26 26 0 0 1 8 88V34A26 26 0 0 1 34 8Z";

/**
 * Compact geometry, tuned against rendered output rather than derived on paper.
 * سهل advances 2.575em, so at 54 it spans ~139 of the 164-unit bubble body —
 * filling it with an even margin — and a baseline of 77 centres it vertically.
 */
const COMPACT_FONT_SIZE = 54;
const COMPACT_BASELINE_Y = 77;

/**
 * `letter-spacing` adds a trailing space to the last glyph, and text-anchor
 * centres the advance box — which drags FLOW half a space off-centre. Nudging
 * the anchor by half the spacing puts the ink back on the bubble's axis.
 */
const FLOW_ANCHOR_X = 92.5;

export function Logo({
  variant = "reversed",
  width = 132,
  className,
  title = "سهل فلو",
}: LogoProps) {
  const reversed = variant === "reversed";
  const compact = width < LOGO_COMPACT_MAX_WIDTH;

  const bubbleFill = reversed ? "var(--color-on-primary)" : "var(--color-primary)";
  const wordFill = reversed ? "var(--color-primary)" : "var(--color-on-primary)";
  const flowFill = reversed ? "var(--color-primary)" : "var(--color-tint)";

  const style: CSSProperties = { width, height: width * ASPECT };

  return (
    <svg
      viewBox="0 0 180 150"
      style={style}
      className={className}
      role={title ? "img" : "presentation"}
      aria-label={title ?? undefined}
      aria-hidden={title ? undefined : true}
      focusable="false"
    >
      <path d={BUBBLE_D} fill={bubbleFill} />
      {compact ? (
        <text
          x="90"
          y={COMPACT_BASELINE_Y}
          textAnchor="middle"
          fontFamily="var(--font-sans)"
          fontSize={COMPACT_FONT_SIZE}
          fontWeight={800}
          fill={wordFill}
        >
          سهل
        </text>
      ) : (
        <>
          <text
            x="90"
            y="66"
            textAnchor="middle"
            fontFamily="var(--font-sans)"
            fontSize="46"
            fontWeight={800}
            fill={wordFill}
          >
            سهل
          </text>
          <text
            x={FLOW_ANCHOR_X}
            y="98"
            textAnchor="middle"
            fontFamily="var(--font-sans)"
            fontSize="20"
            fontWeight={500}
            letterSpacing="5"
            fill={flowFill}
          >
            FLOW
          </text>
        </>
      )}
    </svg>
  );
}

export default Logo;
