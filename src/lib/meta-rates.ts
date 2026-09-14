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
 *
 *  PRICING REGIME: this table is built for the rules that take effect on
 *  1 October 2026. Before that date service messages are free outright; from
 *  that date they are billable per message, with an allowance of 1,000 free per
 *  phone number per month. The site launches around the changeover, so the
 *  post-October reality is the one shown.
 * ────────────────────────────────────────────────────────────────────────────
 */

/** UAE dirham is pegged to the dollar at this rate. Used only for display. */
export const USD_TO_AED = 3.6725;

/**
 * The date the per-message service pricing below starts applying.
 * Kept as a constant so the copy and the table can't drift apart.
 */
export const PRICING_EFFECTIVE_FROM = "2026-10-01";

/**
 * Service (user-initiated) messages that are free each month, per phone number
 * — not per account, and not per WhatsApp Business Account.
 */
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
  // Billable from PRICING_EFFECTIVE_FROM, after the first
  // FREE_SERVICE_MESSAGES_PER_MONTH per number each month.
  { category: "service", usdPerMessage: 0.0088, verified: false },
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
