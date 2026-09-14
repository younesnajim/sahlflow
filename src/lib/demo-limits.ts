/**
 * In-memory session + rate limiting for the live demo widget.
 * No database: state lives in the server process and is lost on restart,
 * which is exactly what a throwaway demo needs.
 *
 * Limits: 5 messages per session, 20 messages per hour per IP.
 */

export const MAX_MESSAGES_PER_SESSION = 8;
export const MAX_MESSAGES_PER_IP_PER_HOUR = 20;

/**
 * How many past messages are replayed to the model.
 *
 * At 8 messages per session the transcript reaches 16 entries, so this window
 * does truncate: by the last turn the model sees roughly the last five
 * exchanges. That matters because the brokerage agent builds its summary card
 * from answers given early in the conversation — see the note in the README.
 */
export const MAX_REPLAYED_MESSAGES = 10;

const SESSION_TTL_MS = 2 * 60 * 60 * 1000; // 2 hours
const IP_WINDOW_MS = 60 * 60 * 1000; // 1 hour

export interface DemoMessage {
  role: "user" | "assistant";
  content: string;
}

interface SessionRecord {
  used: number;
  lastSeen: number;
  /** Kept server-side so the client cannot rewrite the conversation. */
  history: DemoMessage[];
  scenario: string;
}

/**
 * Module-level maps survive between requests within one server process.
 * `globalThis` keeps them alive across hot reloads in development.
 */
const store = (() => {
  const g = globalThis as typeof globalThis & {
    __sahlflowDemoStore?: {
      sessions: Map<string, SessionRecord>;
      ipHits: Map<string, number[]>;
    };
  };
  g.__sahlflowDemoStore ??= { sessions: new Map(), ipHits: new Map() };
  return g.__sahlflowDemoStore;
})();

function sweep(now: number): void {
  for (const [id, s] of store.sessions) {
    if (now - s.lastSeen > SESSION_TTL_MS) store.sessions.delete(id);
  }
  for (const [ip, hits] of store.ipHits) {
    const kept = hits.filter((t) => now - t < IP_WINDOW_MS);
    if (kept.length === 0) store.ipHits.delete(ip);
    else store.ipHits.set(ip, kept);
  }
}

export type LimitReason = "session" | "ip";

export interface LimitDecision {
  allowed: boolean;
  reason?: LimitReason;
  /** Messages left in this session after the current one. */
  remaining: number;
}

/** Best-effort client IP behind EasyPanel / a reverse proxy. */
export function clientIp(headers: Headers): string {
  const forwarded = headers.get("x-forwarded-for");
  if (forwarded) return forwarded.split(",")[0]!.trim();
  return headers.get("x-real-ip")?.trim() || "unknown";
}

/**
 * Records one message against the session and the IP, and says whether it is
 * allowed. Call once per incoming user message, before hitting the model.
 */
export function consume(
  sessionId: string,
  ip: string,
  scenario: string,
): LimitDecision {
  const now = Date.now();
  sweep(now);

  const session = store.sessions.get(sessionId) ?? {
    used: 0,
    lastSeen: now,
    history: [],
    scenario,
  };

  // Switching tabs resets the conversation.
  if (session.scenario !== scenario) {
    session.scenario = scenario;
    session.history = [];
  }

  if (session.used >= MAX_MESSAGES_PER_SESSION) {
    session.lastSeen = now;
    store.sessions.set(sessionId, session);
    return { allowed: false, reason: "session", remaining: 0 };
  }

  const hits = (store.ipHits.get(ip) ?? []).filter((t) => now - t < IP_WINDOW_MS);
  if (hits.length >= MAX_MESSAGES_PER_IP_PER_HOUR) {
    return { allowed: false, reason: "ip", remaining: MAX_MESSAGES_PER_SESSION - session.used };
  }

  session.used += 1;
  session.lastSeen = now;
  store.sessions.set(sessionId, session);
  hits.push(now);
  store.ipHits.set(ip, hits);

  return { allowed: true, remaining: MAX_MESSAGES_PER_SESSION - session.used };
}

/** Server-held transcript for a session. */
export function history(sessionId: string): DemoMessage[] {
  return store.sessions.get(sessionId)?.history ?? [];
}

/** The tail of the transcript, oldest first, capped for replay to the model. */
export function recentHistory(sessionId: string): DemoMessage[] {
  return history(sessionId).slice(-MAX_REPLAYED_MESSAGES);
}

/**
 * Gives back one message's allowance after a failure that was ours, so a
 * visitor is not charged a turn for a reply they never received. The IP window
 * is refunded too; the visitor did not get to use it either.
 */
export function refund(sessionId: string, ip: string): void {
  const session = store.sessions.get(sessionId);
  if (session && session.used > 0) session.used -= 1;

  const hits = store.ipHits.get(ip);
  if (hits && hits.length > 0) {
    hits.pop();
    if (hits.length === 0) store.ipHits.delete(ip);
    else store.ipHits.set(ip, hits);
  }
}

export function appendHistory(sessionId: string, ...messages: DemoMessage[]): void {
  const session = store.sessions.get(sessionId);
  if (!session) return;
  session.history.push(...messages);
  session.lastSeen = Date.now();
}

/** Clears a conversation without giving back spent message allowance. */
export function resetConversation(sessionId: string, scenario: string): void {
  const session = store.sessions.get(sessionId);
  if (!session) return;
  session.history = [];
  session.scenario = scenario;
  session.lastSeen = Date.now();
}
