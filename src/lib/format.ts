import type { Locale } from "./whatsapp";

/**
 * The whole page uses Western digits (990، 1,990، 2026) — the prices were
 * already written that way, so generated numbers (step numbers, the demo's
 * message counter) follow them. Use "ar-AE-u-nu-arab" here to move generated
 * numbers to Arabic-Indic digits instead.
 */
export const NUMBER_LOCALE: Record<Locale, string> = {
  ar: "ar-AE-u-nu-latn",
  en: "en-AE",
};

export function formatNumber(
  value: number,
  locale: Locale,
  options?: Intl.NumberFormatOptions,
): string {
  return new Intl.NumberFormat(NUMBER_LOCALE[locale], options).format(value);
}
