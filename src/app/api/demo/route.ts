import { NextResponse } from "next/server";
import {
  MAX_MESSAGES_PER_SESSION,
  appendHistory,
  clientIp,
  consume,
  resetConversation,
} from "@/lib/demo-limits";
import { parseReply } from "@/lib/lead-card";
import { DEMO_SCENARIOS, type DemoScenario } from "@/lib/prompts";

/**
 * ══════════════════════════════════════════════════════════════════════════
 *  STUB ENDPOINT — no model call yet.
 * ══════════════════════════════════════════════════════════════════════════
 *  Returns canned Arabic replies so the chat interaction can be reviewed end
 *  to end. Session handling, the 5-per-session / 20-per-hour limits, the lead
 *  card parsing and the response contract below are all final — only the reply
 *  generation is fake.
 *
 *  To finish: replace `cannedReply()` with a gpt-4o-mini call (max_tokens 300,
 *  OPENAI_API_KEY, system prompt from SYSTEM_PROMPTS[scenario]) and feed its
 *  raw output through `parseReply` exactly as below. Nothing else changes.
 * ══════════════════════════════════════════════════════════════════════════
 */

export const runtime = "nodejs";
/** In-memory state means this route must never be statically cached. */
export const dynamic = "force-dynamic";

/* ───────────────────────────── canned replies ───────────────────────────── */

/**
 * The brokerage script walks the qualification questions and closes on the
 * summary card, so the card can be seen rendering without a live model. The
 * <lead> block is written exactly as the real agent is instructed to write it.
 */
const CANNED: Record<DemoScenario, string[]> = {
  clinic: [
    "أكيد، الاستشارة ٣٠ دقيقة بـ ٢٠٠ درهم وتُخصم من أي علاج خلال ٣٠ يوم. عندي بكرة ٥:٣٠ العصر أو الخميس ٧ مساءً — أيهما أقرب لك؟",
    "الهايدرافيشل من ٦٥٠ درهم وتاخذ ٤٥ دقيقة. السعر النهائي يتحدد في الاستشارة حسب حالة البشرة.",
    "البوتوكس من ٧٠٠ درهم للمنطقة الواحدة. هذا يحتاج تقييم من الطبيبة — أحجز لك استشارة؟",
    "دوامنا السبت إلى الخميس ١٠ص–٩م، والجمعة ٢م–٩م. أقدر أثبت لك موعد الخميس ٧ مساءً؟",
    "تمام، بس أحتاج الاسم عشان أثبّت الحجز.",
  ],
  brokerage: [
    "هلا فيك. أول شي — استثمار أم سكن؟",
    "ممتاز. كم الميزانية اللي تفكر فيها؟",
    "تمام. منطقة معينة تفضلها أم مفتوح على الخيارات؟",
    "واضح. كم متوفر نقداً عند الحجز؟",
    `على أساس كلامك، أنسب خيارين:

• JVC — غرفة وصالة، ٩٥٠,٠٠٠ درهم، خطة ٦٠/٤٠، تسليم Q4 2028
• دبي الجنوب — استوديو، ٦٥٠,٠٠٠ درهم، ١٪ شهرياً، تسليم Q1 2028

<lead>
الاسم: أبو محمد
الغرض: استثمار
الميزانية: حتى ١,٠٠٠,٠٠٠ درهم
المنطقة: مفتوح — يفضل JVC
الدفعة الأولى: ٢٠٠,٠٠٠ درهم نقداً
التسليم: تسليم بعد سنتين مقبول
الموقع: داخل الإمارات
</lead>

هذا ما سيصل للفريق في الـ CRM خلال ثوانٍ.`,
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
    const raw = cannedReply(scenario, turn);

    // Split the conversational text from the closing lead card, if any.
    const { text, card } = parseReply(raw);

    appendHistory(
      sessionId,
      { role: "user", content: message },
      { role: "assistant", content: raw },
    );

    return NextResponse.json({ reply: text, card, remaining: decision.remaining });
  } catch {
    // Anything unexpected becomes one neutral JSON body. A visitor must never
    // see a stack trace.
    return NextResponse.json({ error: "demo_unavailable" }, { status: 500 });
  }
}
