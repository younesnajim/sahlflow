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
 *  Returns canned replies so the chat interaction can be reviewed end to end.
 *  Session handling, the 5-per-session / 20-per-hour limits, the lead card
 *  parsing and the response contract below are all final — only the reply
 *  generation is fake.
 *
 *  To finish: replace `cannedReply()` with a gpt-4o-mini call (max_tokens 300,
 *  OPENAI_API_KEY, system prompt from SYSTEM_PROMPTS[scenario]) and feed its
 *  raw output through `parseReply` exactly as below. The real model follows
 *  LANGUAGE_MIRROR in the prompt, which makes `detectLanguage` here redundant —
 *  delete it along with the canned scripts.
 * ══════════════════════════════════════════════════════════════════════════
 */

export const runtime = "nodejs";
/** In-memory state means this route must never be statically cached. */
export const dynamic = "force-dynamic";

/* ──────────────────────────── language mirroring ────────────────────────── */

type ReplyLanguage = "ar" | "en";

/**
 * Arabic block, Supplement, Extended-A, and the presentation forms, as numeric
 * ranges rather than a character class of literal glyphs. A glyph range is easy
 * to corrupt silently in transit, and a broken one fails in the worst possible
 * direction here: it answers every Arabic speaker in English.
 */
const ARABIC_RANGES: readonly (readonly [number, number])[] = [
  [0x0600, 0x06ff],
  [0x0750, 0x077f],
  [0x08a0, 0x08ff],
  [0xfb50, 0xfdff],
  [0xfe70, 0xfeff],
];

/**
 * Stub-only stand-in for what the model does on its own. Any Arabic character
 * means the visitor is writing Arabic — but "3arabi bi-ahruf ingliziya" has no
 * Arabic characters, so it falls through to English here. The real agent gets
 * that case right from the prompt; the stub cannot.
 */
function detectLanguage(message: string): ReplyLanguage {
  for (const char of message) {
    const code = char.codePointAt(0)!;
    for (const [lo, hi] of ARABIC_RANGES) {
      if (code >= lo && code <= hi) return "ar";
    }
  }
  return "en";
}

/* ───────────────────────────── canned replies ───────────────────────────── */

/**
 * The brokerage script walks the qualification questions and closes on the
 * summary card, so the card can be seen rendering without a live model. The
 * <lead> block is written exactly as the real agent is instructed to write it,
 * with English field labels on the English track.
 */
const CANNED: Record<DemoScenario, Record<ReplyLanguage, string[]>> = {
  clinic: {
    ar: [
      "أكيد، الاستشارة ٣٠ دقيقة بـ ٢٠٠ درهم وتُخصم من أي علاج خلال ٣٠ يوم. عندي بكرة ٥:٣٠ العصر أو الخميس ٧ مساءً — أيهما أقرب لك؟",
      "الهايدرافيشل من ٦٥٠ درهم وتاخذ ٤٥ دقيقة. السعر النهائي يتحدد في الاستشارة حسب حالة البشرة.",
      "البوتوكس من ٧٠٠ درهم للمنطقة الواحدة. هذا يحتاج تقييم من الطبيبة — أحجز لك استشارة؟",
      "دوامنا السبت إلى الخميس ١٠ص–٩م، والجمعة ٢م–٩م. أقدر أثبت لك موعد الخميس ٧ مساءً؟",
      "تمام، بس أحتاج الاسم عشان أثبّت الحجز.",
    ],
    en: [
      "Of course — the 30-minute consultation is AED 200, and it comes off any treatment you book within 30 days. I have tomorrow at 5:30pm or Thursday at 7pm. Which suits you better?",
      "HydraFacial starts at AED 650 and takes 45 minutes. The final price is set at the consultation, depending on your skin.",
      "Botox starts at AED 700 per area. That one needs the doctor to assess it — shall I book you a consultation?",
      "We're open Saturday to Thursday, 10am–9pm, and Friday 2pm–9pm. Shall I hold Thursday at 7pm for you?",
      "Perfect — I just need your name to confirm the booking.",
    ],
  },
  brokerage: {
    ar: [
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
    en: [
      "Welcome. First things first — are you buying as an investment, or to live in?",
      "Good. What budget are you working with?",
      "Noted. Any particular area, or are you open?",
      "Understood. How much do you have available in cash at booking?",
      `Based on that, the two that fit best:

• JVC — 1 bed, AED 950,000, 60/40 plan, handover Q4 2028
• Dubai South — studio, AED 650,000, 1% monthly, handover Q1 2028

<lead>
Name: Abu Mohammed
Purpose: Investment
Budget: Up to AED 1,000,000
Area: Open — prefers JVC
Down payment: AED 200,000 in cash
Handover: Two-year handover acceptable
Location: Inside the UAE
</lead>

This reaches the team in the CRM within seconds.`,
    ],
  },
};

function cannedReply(
  scenario: DemoScenario,
  language: ReplyLanguage,
  turn: number,
): string {
  const list = CANNED[scenario][language];
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
    const raw = cannedReply(scenario, detectLanguage(message), turn);

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
