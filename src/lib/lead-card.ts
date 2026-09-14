/**
 * Parses the closing lead-summary card out of a model reply.
 *
 * The brokerage agent wraps its summary in <lead>…</lead> with one
 * `label: value` per line (see LEAD_CARD_PROTOCOL). Text before the block stays
 * an ordinary chat bubble. Text after it is usually the CRM sentence, which
 * becomes the card's footer — but the live model also puts its project
 * recommendations there, so anything too long to be a caption is handed back as
 * `trailing` and rendered as its own bubble instead of being cut off.
 *
 * Shared by the demo endpoint and the widget, so both agree on the shape.
 */

export interface LeadCardRow {
  label: string;
  value: string;
}

export interface LeadCard {
  rows: LeadCardRow[];
  /** A short closing line, e.g. the CRM sentence. */
  footer?: string;
}

export interface ParsedReply {
  /** Reply text before the card; empty when the whole reply was the card. */
  text: string;
  card: LeadCard | null;
  /** Text after the card that was too long to sit in the footer. */
  trailing: string;
}

const LEAD_BLOCK = /<lead>([\s\S]*?)<\/lead>/i;
/** A stray opening tag with no close — a truncated reply. */
const ORPHAN_TAG = /<\/?lead>/gi;

const MAX_ROWS = 12;
const MAX_FIELD = 120;
/** Longer than a caption: render it as a bubble rather than crop it. */
const MAX_FOOTER = 160;

/**
 * Values the model writes when it never learned the answer — it copies the
 * "..." straight out of the protocol example. An empty row is worse than a
 * missing one, so these are dropped.
 */
const PLACEHOLDER = /^(\.{2,}|…|-{1,}|_{2,}|n\/?a|غير محدد|لا يوجد)$/i;

function clean(value: string, limit = MAX_FIELD): string {
  return value.replace(/\s+/g, " ").trim().slice(0, limit);
}

/**
 * Splits a reply into its conversational part and, if present, a lead card.
 * A malformed or empty block degrades to plain text rather than an empty card.
 */
export function parseReply(reply: string): ParsedReply {
  const match = LEAD_BLOCK.exec(reply);
  if (!match) {
    // Truncated output can leave a dangling tag; never show it to a visitor.
    return { text: reply.replace(ORPHAN_TAG, "").trim(), card: null, trailing: "" };
  }

  const rows: LeadCardRow[] = [];
  for (const line of match[1]!.split("\n")) {
    const separator = line.indexOf(":");
    if (separator === -1) continue;

    const label = clean(line.slice(0, separator).replace(/^[-•*\s]+/, ""));
    const value = clean(line.slice(separator + 1));
    if (!label || !value || PLACEHOLDER.test(value)) continue;

    rows.push({ label, value });
    if (rows.length === MAX_ROWS) break;
  }

  const before = clean(reply.slice(0, match.index), 2000);
  const after = clean(reply.slice(match.index + match[0].length), 2000);

  if (rows.length === 0) {
    // The agent opened a card but wrote nothing usable in it.
    return {
      text: [before, after].filter(Boolean).join(" ").trim(),
      card: null,
      trailing: "",
    };
  }

  const footerFits = after.length > 0 && after.length <= MAX_FOOTER;

  return {
    text: before,
    card: { rows, footer: footerFits ? after : undefined },
    trailing: footerFits ? "" : after,
  };
}
