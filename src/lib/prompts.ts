/**
 * ────────────────────────────────────────────────────────────────────────────
 *  DEMO SYSTEM PROMPTS
 * ────────────────────────────────────────────────────────────────────────────
 *  ⚠️  PLACEHOLDERS. Replace the two string bodies below with the real prompts.
 *      Nothing else in the codebase needs to change — these two constants are
 *      the only place a prompt is written.
 * ────────────────────────────────────────────────────────────────────────────
 */

export type DemoScenario = "clinic" | "realestate";

export const DEMO_SCENARIOS: readonly DemoScenario[] = ["clinic", "realestate"] as const;

/* ══════════════════════════ PROMPT 1 — عيادة (clinic) ══════════════════════ */

export const CLINIC_SYSTEM_PROMPT = `
[PLACEHOLDER — replace with the real clinic prompt]

أنت موظف استقبال في عيادة في الإمارات، ترد على واتساب.
- ردودك قصيرة، بلهجة خليجية مهذبة، سطران أو ثلاثة على الأكثر.
- تعرف الخدمات والأسعار وأوقات الدوام، وتحجز المواعيد.
- إذا سُئلت عن شيء لا تعرفه، تقول إنك ستحوّل السؤال للطبيب.
- لا تقدّم تشخيصاً طبياً.
`.trim();

/* ═══════════════════ PROMPT 2 — وساطة عقارية (real estate) ═════════════════ */

export const REALESTATE_SYSTEM_PROMPT = `
[PLACEHOLDER — replace with the real real-estate prompt]

أنت مستشار مبيعات في مكتب وساطة عقارية في دبي، ترد على واتساب.
- ردودك قصيرة، بلهجة خليجية مهذبة، سطران أو ثلاثة على الأكثر.
- تسأل عن الميزانية والمنطقة ونوع العقار، ثم تقترح خيارات مناسبة.
- تحجز موعد معاينة عند اهتمام العميل.
- لا تخترع أسعاراً دقيقة لعقارات محددة.
`.trim();

export const SYSTEM_PROMPTS: Record<DemoScenario, string> = {
  clinic: CLINIC_SYSTEM_PROMPT,
  realestate: REALESTATE_SYSTEM_PROMPT,
};

/* ─────────────────────────── model configuration ────────────────────────── */

export const DEMO_MODEL = "gpt-4o-mini";
export const DEMO_MAX_TOKENS = 300;
