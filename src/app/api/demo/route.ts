import { NextResponse } from "next/server";
import {
  appendHistory,
  clientIp,
  consume,
  recentHistory,
  refund,
  resetConversation,
} from "@/lib/demo-limits";
import { detectLanguage, languageDirective } from "@/lib/language";
import { parseReply } from "@/lib/lead-card";
import { ModelUnavailableError, completeChat, type ChatMessage } from "@/lib/openai";
import { DEMO_SCENARIOS, SYSTEM_PROMPTS, type DemoScenario } from "@/lib/prompts";

/**
 * Live demo endpoint.
 *
 * gpt-4o-mini, max_tokens 300, OPENAI_API_KEY. Limits are 5 messages per
 * session and 20 per hour per IP, held in memory with no database. The last
 * ten messages of the session transcript are replayed so the agent can follow
 * a multi-question flow — the brokerage agent qualifies across six questions
 * and would restart every turn without it.
 *
 * Whatever the model returns goes through `parseReply` unchanged; nothing here
 * edits the model's words.
 */

export const runtime = "nodejs";
/** In-memory state means this route must never be statically cached. */
export const dynamic = "force-dynamic";

interface DemoRequest {
  sessionId?: unknown;
  scenario?: unknown;
  message?: unknown;
  reset?: unknown;
}

function isScenario(value: unknown): value is DemoScenario {
  return typeof value === "string" && (DEMO_SCENARIOS as readonly string[]).includes(value);
}

export async function POST(request: Request) {
  let spent: { sessionId: string; ip: string } | null = null;

  try {
    const body = (await request.json().catch(() => ({}))) as DemoRequest;

    const sessionId = typeof body.sessionId === "string" ? body.sessionId.slice(0, 100) : "";
    const scenario: DemoScenario = isScenario(body.scenario) ? body.scenario : "clinic";

    if (!sessionId) {
      return NextResponse.json({ error: "bad_request" }, { status: 400 });
    }

    // Tab switch: clear the transcript, keep the spent allowance.
    if (body.reset === true) {
      resetConversation(sessionId, scenario);
      return NextResponse.json({ ok: true });
    }

    const message = typeof body.message === "string" ? body.message.trim().slice(0, 1000) : "";
    if (!message) {
      return NextResponse.json({ error: "bad_request" }, { status: 400 });
    }

    const ip = clientIp(request.headers);
    const decision = consume(sessionId, ip, scenario);
    if (!decision.allowed) {
      return NextResponse.json(
        { limited: true, reason: decision.reason, remaining: 0 },
        { status: 429 },
      );
    }
    spent = { sessionId, ip };

    // Read history after consume(), which clears it on a scenario switch, and
    // before appending this turn — the new message is added explicitly below.
    const replayed = recentHistory(sessionId);

    // Detect from the whole conversation, not just this message: "ok" or "yes"
    // carries no script, and one such reply would otherwise flip the language.
    const language = detectLanguage(
      [...replayed.filter((m) => m.role === "user").map((m) => m.content), message].join(" "),
    );

    const messages: ChatMessage[] = [
      { role: "system", content: SYSTEM_PROMPTS[scenario] },
      ...replayed.map((m): ChatMessage => ({ role: m.role, content: m.content })),
      { role: "user", content: message },
      // Last, where it carries the most weight.
      { role: "system", content: languageDirective(language) },
    ];

    const raw = await completeChat(messages);

    // Split the conversational text from the closing lead card, if any. The
    // transcript keeps the raw text, so the model sees its own output verbatim
    // on the next turn.
    const { text, card, trailing } = parseReply(raw);

    appendHistory(
      sessionId,
      { role: "user", content: message },
      { role: "assistant", content: raw },
    );

    return NextResponse.json({
      reply: text,
      card,
      trailing,
      remaining: decision.remaining,
    });
  } catch (error) {
    // The failure was ours, so give the turn back rather than charging the
    // visitor for a reply that never arrived.
    if (spent) refund(spent.sessionId, spent.ip);

    if (error instanceof ModelUnavailableError) {
      console.error(`[demo] ${error.message}`);
    } else {
      console.error("[demo] unexpected failure", error);
    }

    // One neutral body either way. A visitor must never see a stack trace.
    return NextResponse.json({ error: "demo_unavailable" }, { status: 500 });
  }
}
