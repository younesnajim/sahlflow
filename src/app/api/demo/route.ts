import { NextResponse } from "next/server";
import {
  MAX_MESSAGES_PER_SESSION,
  appendHistory,
  clientIp,
  consume,
  resetConversation,
} from "@/lib/demo-limits";
import { DEMO_SCENARIOS, type DemoScenario } from "@/lib/prompts";

/**
 * ══════════════════════════════════════════════════════════════════════════
 *  STUB ENDPOINT — no model call yet.
 * ══════════════════════════════════════════════════════════════════════════
 *  Returns canned Arabic replies so the chat interaction can be reviewed end
 *  to end. Session handling, the 5-per-session / 20-per-hour limits, and the
 *  error contract below are final — only the reply generation is fake.
 *
 *  To finish: replace `cannedReply()` with a gpt-4o-mini call (max_tokens 300,
 *  OPENAI_API_KEY, system prompt from SYSTEM_PROMPTS[scenario]) and keep the
 *  surrounding response shapes exactly as they are.
 * ══════════════════════════════════════════════════════════════════════════
 */

export const runtime = "nodejs";
/** In-memory state means this route must never be statically cached. */
export const dynamic = "force-dynamic";

/* ───────────────────────────── canned replies ───────────────────────────── */

const CANNED: Record<DemoScenario, string[]> = {
  clinic: [
    "أكيد، عندنا موعد بكرة الساعة ٥ العصر وموعد ثاني الساعة ٧. أيهما يناسبك؟",
    "الكشف الأول ٢٥٠ درهم ويشمل الاستشارة. التنظيف ٣٥٠ درهم.",
    "دوامنا من ١٠ الصباح إلى ٩ مساءً، والجمعة من ٤ إلى ٩.",
    "تمام، سجّلت لك الموعد. بنرسل لك تأكيد قبلها بيوم.",
    "نعم، نستقبل التأمين. أرسل لي صورة البطاقة وأتأكد لك.",
  ],
  realestate: [
    "تمام، في مارينا عندنا غرفة وصالة من ٧٥ ألف سنوياً. تبي أرسل لك الصور؟",
    "الميزانية تحدد كثير — كم تفكر تخصص للإيجار السنوي؟",
    "عندنا وحدات جاهزة للسكن الفوري، وأخرى تسليم بعد شهرين.",
    "أقدر أرتب لك معاينة نهاية الأسبوع. السبت يناسبك؟",
    "العمولة ٥٪ من قيمة الإيجار السنوي، وتُدفع مرة واحدة.",
  ],
};

function cannedReply(scenario: DemoScenario, turn: number): string {
  const list = CANNED[scenario];
  return list[Math.min(turn, list.length - 1)]!;
}

/* ───────────────────────────────── route ────────────────────────────────── */

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

    const decision = consume(sessionId, clientIp(request.headers), scenario);
    if (!decision.allowed) {
      return NextResponse.json(
        { limited: true, reason: decision.reason, remaining: 0 },
        { status: 429 },
      );
    }

    const turn = MAX_MESSAGES_PER_SESSION - decision.remaining - 1;
    const reply = cannedReply(scenario, turn);

    appendHistory(
      sessionId,
      { role: "user", content: message },
      { role: "assistant", content: reply },
    );

    return NextResponse.json({ reply, remaining: decision.remaining });
  } catch {
    // Anything unexpected becomes one neutral JSON body. A visitor must never
    // see a stack trace.
    return NextResponse.json({ error: "demo_unavailable" }, { status: 500 });
  }
}
