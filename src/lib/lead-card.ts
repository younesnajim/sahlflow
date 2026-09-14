/**
 * Parses the closing lead-summary card out of a model reply.
 *
 * The brokerage agent wraps its summary in <lead>…</lead> with one
 * `label: value` per line (see LEAD_CARD_PROTOCOL). Everything before the block
 * stays an ordinary chat bubble; everything after it — the CRM sentence —
 * becomes the card's footer, so the card reads as one self-contained unit.
 *
 * Shared by the demo endpoint and the widget, so both agree on the shape.
 */

export interface LeadCardRow {
  label: string;
  value: string;
}

export interface LeadCard {
  rows: LeadCardRow[];
  /** The line the agent writes after the block, e.g. the CRM sentence. */
  footer?: string;
}

export interface ParsedReply {
  /** Reply text before the card; empty when the whole reply was the card. */
  text: string;
  card: LeadCard | null;
}

const LEAD_BLOCK = /<lead>([\s\S]*?)<\/lead>/i;
/** A stray opening tag with no close — a truncated reply. */
const ORPHAN_TAG = /<\/?lead>/gi;

const MAX_ROWS = 12;
const MAX_FIELD = 120;

function clean(value: string): string {
  return value.replace(/\s+/g, " ").trim().slice(0, MAX_FIELD);
}

/**
 * Splits a reply into its conversational part and, if present, a lead card.
 * A malformed or empty block degrades to plain text rather than an empty card.
 */
export function parseReply(reply: string): ParsedReply {
  const match = LEAD_BLOCK.exec(reply);
  if (!match) {
    // Truncated output can leave a dangling tag; never show it to a visitor.
    return { text: reply.replace(ORPHAN_TAG, "").trim(), card: null };
  }

  const rows: LeadCardRow[] = [];
  for (const line of match[1]!.split("\n")) {
    const separator = line.indexOf(":");
    if (separator === -1) continue;

    const label = clean(line.slice(0, separator).replace(/^[-•*\s]+/, ""));
    const value = clean(line.slice(separator + 1));
    if (!label || !value) continue;

    rows.push({ label, value });
    if (rows.length === MAX_ROWS) break;
  }

  const before = clean(reply.slice(0, match.index));
  const after = clean(reply.slice(match.index + match[0].length));

  if (rows.length === 0) {
    // The agent opened a card but wrote nothing usable in it.
    return { text: [before, after].filter(Boolean).join(" ").trim(), card: null };
  }

  return {
    text: before,
    card: { rows, footer: after || undefined },
  };
}
