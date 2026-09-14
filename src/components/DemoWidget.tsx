"use client";

import { useCallback, useEffect, useRef, useState } from "react";
import { WhatsAppCta } from "./ui";
import { formatNumber } from "@/lib/format";
import type { SiteCopy } from "@/content/types";
import type { DemoScenario } from "@/lib/prompts";

interface ChatMessage {
  id: number;
  role: "user" | "assistant";
  content: string;
}

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
    { id: 0, role: "assistant", content: demo.opener.clinic },
  ]);
  const [draft, setDraft] = useState("");
  const [status, setStatus] = useState<Status>("idle");
  const [remaining, setRemaining] = useState<number | null>(null);

  const sessionRef = useRef<string>("");
  const scrollRef = useRef<HTMLDivElement>(null);
  const nextId = useRef(1);

  if (sessionRef.current === "") sessionRef.current = newSessionId();

  useEffect(() => {
    const el = scrollRef.current;
    if (el) el.scrollTop = el.scrollHeight;
  }, [messages, status]);

  /** Switching tabs starts the conversation over. */
  const switchScenario = useCallback(
    (next: DemoScenario) => {
      if (next === scenario) return;
      setScenario(next);
      nextId.current = 1;
      setMessages([{ id: 0, role: "assistant", content: demo.opener[next] }]);
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
      { id: nextId.current++, role: "user", content: text },
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
        remaining?: number;
        limited?: boolean;
      };

      if (res.status === 429 || payload.limited) {
        setStatus("limited");
        setRemaining(0);
        return;
      }

      if (!res.ok || typeof payload.reply !== "string") {
        setStatus("error");
        return;
      }

      setMessages((prev) => [
        ...prev,
        { id: nextId.current++, role: "assistant", content: payload.reply! },
      ]);

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
        className="flex h-64 flex-col gap-2.5 overflow-y-auto bg-surface-muted px-4 py-4 sm:h-80"
        aria-live="polite"
      >
        {messages.map((m) => (
          <div
            key={m.id}
            className={`max-w-[85%] rounded-2xl px-3.5 py-2 text-body ${
              m.role === "user"
                ? "self-end bg-primary text-on-primary"
                : "self-start bg-surface text-ink shadow-sm"
            }`}
          >
            {m.content}
          </div>
        ))}

        {status === "sending" && (
          <div className="self-start rounded-2xl bg-surface px-3.5 py-2 text-body text-muted shadow-sm">
            {demo.thinking}
          </div>
        )}

        {status === "error" && (
          <div className="self-start rounded-2xl bg-amber/15 px-3.5 py-2 text-body text-ink">
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
