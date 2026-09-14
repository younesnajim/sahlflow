"use client";

import { useCallback, useEffect, useRef, useState } from "react";
import { WhatsAppCta } from "./ui";
import { formatNumber } from "@/lib/format";
import type { SiteCopy } from "@/content/types";
import type { DemoScenario } from "@/lib/prompts";
import type { LeadCard as LeadCardData } from "@/lib/lead-card";

/**
 * A turn is either ordinary chat text or the closing lead-summary card. The
 * card is a separate kind rather than a formatted bubble because it is the
 * moment the demo has to land — it gets its own block in the transcript.
 */
type ChatMessage =
  | { id: number; kind: "text"; role: "user" | "assistant"; content: string }
  | { id: number; kind: "card"; role: "assistant"; card: LeadCardData };

type Status = "idle" | "sending" | "limited" | "error";

/** One id per browser tab; the server keys its message budget off this. */
function newSessionId(): string {
  if (typeof crypto !== "undefined" && "randomUUID" in crypto) return crypto.randomUUID();
  return `s-${Date.now()}-${Math.random().toString(36).slice(2)}`;
}

export function DemoWidget({ copy }: { copy: SiteCopy }) {
  const { demo } = copy;
  const [scenario, setScenario] = useState<DemoScenario>("clinic");
  const [messages, setMessages] = useState<ChatMessage[]>([
    { id: 0, kind: "text", role: "assistant", content: demo.opener.clinic },
  ]);
  const [draft, setDraft] = useState("");
  const [status, setStatus] = useState<Status>("idle");
  const [remaining, setRemaining] = useState<number | null>(null);

  const sessionRef = useRef<string>("");
  const scrollRef = useRef<HTMLDivElement>(null);
  const cardRef = useRef<HTMLDivElement>(null);
  const nextId = useRef(1);

  if (sessionRef.current === "") sessionRef.current = newSessionId();

  useEffect(() => {
    const el = scrollRef.current;
    if (!el) return;

    const card = cardRef.current;
    if (card) {
      // Align the card's top edge, not the transcript's bottom: a card with
      // long values can be taller than the viewport, and the header is the
      // part that must never be cut off.
      el.scrollTop +=
        card.getBoundingClientRect().top - el.getBoundingClientRect().top - 12;
      return;
    }
    el.scrollTop = el.scrollHeight;
  }, [messages, status]);

  /** Switching tabs starts the conversation over. */
  const switchScenario = useCallback(
    (next: DemoScenario) => {
      if (next === scenario) return;
      setScenario(next);
      nextId.current = 1;
      setMessages([
        { id: 0, kind: "text", role: "assistant", content: demo.opener[next] },
      ]);
      setDraft("");
      setStatus("idle");
      setRemaining(null);
      void fetch("/api/demo", {
        method: "POST",
        headers: { "content-type": "application/json" },
        body: JSON.stringify({
          sessionId: sessionRef.current,
          scenario: next,
          reset: true,
        }),
      }).catch(() => {
        /* resetting server state is best-effort; the UI has already reset */
      });
    },
    [scenario, demo.opener],
  );

  const send = useCallback(async () => {
    const text = draft.trim();
    if (!text || status === "sending" || status === "limited") return;

    setDraft("");
    setStatus("sending");
    setMessages((prev) => [
      ...prev,
      { id: nextId.current++, kind: "text", role: "user", content: text },
    ]);

    try {
      const res = await fetch("/api/demo", {
        method: "POST",
        headers: { "content-type": "application/json" },
        body: JSON.stringify({
          sessionId: sessionRef.current,
          scenario,
          message: text,
        }),
      });

      const data: unknown = await res.json().catch(() => null);
      const payload = (data ?? {}) as {
        reply?: string;
        card?: LeadCardData | null;
        remaining?: number;
        limited?: boolean;
      };

      if (res.status === 429 || payload.limited) {
        setStatus("limited");
        setRemaining(0);
        return;
      }

      const replyText = typeof payload.reply === "string" ? payload.reply.trim() : "";
      const card = payload.card ?? null;

      // A turn may be text, a card, or text followed by a card — but never
      // nothing at all.
      if (!res.ok || (!replyText && !card)) {
        setStatus("error");
        return;
      }

      setMessages((prev) => {
        const next = [...prev];
        if (replyText) {
          next.push({
            id: nextId.current++,
            kind: "text",
            role: "assistant",
            content: replyText,
          });
        }
        if (card) {
          next.push({ id: nextId.current++, kind: "card", role: "assistant", card });
        }
        return next;
      });

      if (typeof payload.remaining === "number") {
        setRemaining(payload.remaining);
        if (payload.remaining <= 0) setStatus("limited");
        else setStatus("idle");
      } else {
        setStatus("idle");
      }
    } catch {
      // Network failure, aborted request, malformed response — the visitor
      // sees one calm line, never a stack trace.
      setStatus("error");
    }
  }, [draft, scenario, status]);

  const locked = status === "limited";

  return (
    <div className="overflow-hidden rounded-card border border-line bg-surface shadow-sm">
      {/* header ------------------------------------------------------- */}
      <div className="flex items-center justify-between gap-3 border-b border-line bg-surface-muted px-4 py-3">
        <div className="min-w-0">
          <p className="text-h3 font-extrabold">{demo.title}</p>
          <p className="text-label text-muted">{demo.sub}</p>
        </div>
        <span className="shrink-0 rounded-full bg-amber/20 px-3 py-1 text-label font-bold text-ink">
          {demo.badge}
        </span>
      </div>

      {/* tabs --------------------------------------------------------- */}
      <div className="flex gap-2 border-b border-line px-4 py-3" role="tablist">
        {demo.tabs.map((tab) => {
          const active = tab.id === scenario;
          return (
            <button
              key={tab.id}
              type="button"
              role="tab"
              aria-selected={active}
              onClick={() => switchScenario(tab.id)}
              className={`rounded-full px-4 py-1.5 text-label font-bold transition-colors ${
                active
                  ? "bg-primary text-on-primary"
                  : "bg-surface-sunken text-muted hover:text-ink"
              }`}
            >
              {tab.label}
            </button>
          );
        })}
      </div>

      {/* transcript --------------------------------------------------- */}
      <div
        ref={scrollRef}
        className="flex h-88 flex-col gap-2.5 overflow-y-auto bg-surface-muted px-4 py-4"
        aria-live="polite"
      >
        {messages.map((m, i) =>
          m.kind === "card" ? (
            <LeadCardBlock
              key={m.id}
              card={m.card}
              title={demo.leadCardTitle}
              ref={i === messages.length - 1 ? cardRef : undefined}
            />
          ) : (
            <div
              key={m.id}
              className={`max-w-[85%] shrink-0 rounded-2xl px-3.5 py-2 text-body whitespace-pre-line ${
                m.role === "user"
                  ? "self-end bg-primary text-on-primary"
                  : "self-start bg-surface text-ink shadow-sm"
              }`}
            >
              {m.content}
            </div>
          ),
        )}

        {status === "sending" && (
          <div className="shrink-0 self-start rounded-2xl bg-surface px-3.5 py-2 text-body text-muted shadow-sm">
            {demo.thinking}
          </div>
        )}

        {status === "error" && (
          <div className="shrink-0 self-start rounded-2xl bg-amber/15 px-3.5 py-2 text-body text-ink">
            {demo.error}
          </div>
        )}
      </div>

      {/* composer, or the limit state -------------------------------- */}
      <div className="border-t border-line px-4 py-3">
        {locked ? (
          <div className="flex flex-col gap-3 text-center">
            <p className="text-h3 font-extrabold">{demo.limitTitle}</p>
            <WhatsAppCta
              label={demo.limitCta.label}
              source={demo.limitCta.source}
              locale={copy.locale}
              full
            />
          </div>
        ) : (
          <>
            <form
              onSubmit={(e) => {
                e.preventDefault();
                void send();
              }}
              className="flex items-center gap-2"
            >
              <input
                value={draft}
                onChange={(e) => setDraft(e.target.value)}
                placeholder={demo.placeholder}
                aria-label={demo.placeholder}
                disabled={status === "sending"}
                className="min-w-0 flex-1 rounded-full border border-line bg-surface px-4 py-2.5 text-body outline-none placeholder:text-muted focus:border-primary disabled:opacity-60"
              />
              <button
                type="submit"
                disabled={status === "sending" || draft.trim() === ""}
                className="shrink-0 rounded-full bg-primary px-5 py-2.5 text-body font-bold text-on-primary transition-colors hover:bg-primary-deep disabled:opacity-40"
              >
                {demo.send}
              </button>
            </form>
            {remaining !== null && remaining > 0 && (
              <p className="mt-2 text-label text-muted">
                {demo.remaining.replace("{n}", formatNumber(remaining, copy.locale))}
              </p>
            )}
          </>
        )}
      </div>
    </div>
  );
}

export default DemoWidget;

/* ───────────────────────── closing lead-summary card ───────────────────── */

/**
 * Deliberately not a chat bubble: full width, squared to the transcript, with
 * a labelled header and a footer strip. This is the artefact a broker is being
 * shown — it should read like a record, not like the agent talking.
 */
function LeadCardBlock({
  card,
  title,
  ref,
}: {
  card: LeadCardData;
  title: string;
  ref?: React.Ref<HTMLDivElement>;
}) {
  return (
    <div
      ref={ref}
      className="w-full shrink-0 overflow-hidden rounded-card border-2 border-primary bg-surface shadow-sm"
    >
      <div className="flex items-center gap-2 border-b border-line bg-primary px-4 py-2.5 text-on-primary">
        <CardGlyph />
        <p className="text-label font-extrabold">{title}</p>
      </div>

      {/* Two columns, label stacked over value: seven fields land in four
          rows, so the whole card is visible inside the transcript without
          scrolling — which is the entire point of it being a card. */}
      <dl className="grid grid-cols-2 gap-x-4 gap-y-2.5 px-4 py-3">
        {card.rows.map((row) => (
          <div key={row.label} className="min-w-0">
            <dt className="truncate text-label text-muted">{row.label}</dt>
            <dd className="text-body leading-snug font-bold">{row.value}</dd>
          </div>
        ))}
      </dl>

      {card.footer && (
        <p className="border-t border-line bg-tint/40 px-4 py-2.5 text-label font-bold text-on-tint">
          {card.footer}
        </p>
      )}
    </div>
  );
}

function CardGlyph() {
  return (
    <svg
      viewBox="0 0 20 20"
      className="size-4 shrink-0"
      fill="none"
      stroke="currentColor"
      strokeWidth="1.8"
      strokeLinecap="round"
      strokeLinejoin="round"
      aria-hidden="true"
    >
      <rect x="2.5" y="4" width="15" height="12" rx="2" />
      <path d="M6 8.5h3M6 12h6" />
    </svg>
  );
}
