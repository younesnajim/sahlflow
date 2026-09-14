/**
 * ────────────────────────────────────────────────────────────────────────────
 *  META WHATSAPP PRICING — UAE
 * ────────────────────────────────────────────────────────────────────────────
 *  ⚠️  UNVERIFIED PLACEHOLDER FIGURES. Every number below is a stand-in.
 *      Check each one against Meta's official pricing page before launch:
 *      https://developers.facebook.com/docs/whatsapp/pricing
 *
 *  These are Meta's charges, billed by Meta — Sahl Flow passes them through at
 *  cost. Nothing here is Sahl Flow revenue. The site copy must say so.
 *
 *  Meta bills per message (not per 24-hour conversation) since 1 July 2025.
 *  Rates are quoted in USD; the AED column is a conversion, not a Meta figure.
 * ────────────────────────────────────────────────────────────────────────────
 */

/** UAE dirham is pegged to the dollar at this rate. Used only for display. */
export const USD_TO_AED = 3.6725;

/** Service (user-initiated) messages that are free each month, per account. */
export const FREE_SERVICE_MESSAGES_PER_MONTH = 1000;

import { formatNumber } from "./format";
import type { Locale } from "./whatsapp";

export type RateCategory = "marketing" | "utility" | "authentication" | "service";

export interface MetaRate {
  category: RateCategory;
  /** Meta's published price per message, in USD. */
  usdPerMessage: number;
  /** true once the figure has been checked against Meta's page. */
  verified: boolean;
}

export const META_UAE_RATES: readonly MetaRate[] = [
  { category: "marketing", usdPerMessage: 0.034, verified: false },
  { category: "utility", usdPerMessage: 0.015, verified: false },
  { category: "authentication", usdPerMessage: 0.0135, verified: false },
  { category: "service", usdPerMessage: 0, verified: false },
] as const;

/** Convert a USD rate to AED for display. */
export function toAed(usd: number): number {
  return usd * USD_TO_AED;
}

/** Format an AED figure with the digits used by the active locale. */
export function formatAed(usd: number, locale: Locale): string {
  return formatNumber(toAed(usd), locale, {
    minimumFractionDigits: 3,
    maximumFractionDigits: 3,
  });
}

export function formatUsd(usd: number, locale: Locale): string {
  return formatNumber(usd, locale, {
    minimumFractionDigits: 4,
    maximumFractionDigits: 4,
  });
}
