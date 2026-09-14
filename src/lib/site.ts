/** Absolute origin, needed for hreflang and OpenGraph URLs. */
export const SITE_URL =
  process.env.NEXT_PUBLIC_SITE_URL?.replace(/\/$/, "") || "https://sahlflow.com";

export const SITE_NAME = "Sahl Flow";

/** The /ar ↔ /en pair, declared once and used by both pages' metadata. */
export const ALTERNATES = {
  ar: "/ar",
  en: "/en",
} as const;

/**
 * Mirrors --color-primary in globals.css. Metadata can't read CSS custom
 * properties, so the one place a raw brand hex is allowed is here — never in
 * a component.
 */
export const BRAND_PRIMARY_HEX = "#128C4A";
