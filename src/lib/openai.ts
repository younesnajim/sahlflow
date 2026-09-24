import { DEMO_MAX_TOKENS, DEMO_MODEL } from "./prompts";

/**
 * Minimal OpenAI chat client for the demo widget.
 *
 * Deliberately a plain fetch rather than the SDK: this is one endpoint with one
 * model, and the Docker image is smaller without the dependency.
 */

export interface ChatMessage {
  role: "system" | "user" | "assistant";
  content: string;
}

/**
 * Overridable so the endpoint can be pointed at a gateway, a proxy, or a local
 * mock in tests. Defaults to OpenAI itself.
 */
const BASE_URL = (process.env.OPENAI_BASE_URL || "https://api.openai.com/v1").replace(/\/$/, "");
const ENDPOINT = `${BASE_URL}/chat/completions`;

/** A visitor is waiting on this, so fail fast rather than hang the widget. */
const TIMEOUT_MS = 20_000;

/**
 * The agent quotes prices and opening hours from its prompt. It should not be
 * inventive about them, so temperature sits well below the default.
 */

/** Why a completion could not be produced. Logged server-side, never sent out. */
export type ModelFailure =
  | "missing_api_key"
  | "http_error"
  | "timeout"
  | "empty_response"
  | "network_error";

export class ModelUnavailableError extends Error {
  constructor(
    readonly failure: ModelFailure,
    readonly detail?: string,
  ) {
    super(`model unavailable: ${failure}${detail ? ` (${detail})` : ""}`);
    this.name = "ModelUnavailableError";
  }
}

/**
 * Returns the assistant's raw text. The caller is responsible for parsing it —
 * nothing here inspects or rewrites what the model said.
 */
export async function completeChat(messages: ChatMessage[]): Promise<string> {
  const apiKey = process.env.OPENAI_API_KEY;
  if (!apiKey) throw new ModelUnavailableError("missing_api_key");

  const controller = new AbortController();
  const timer = setTimeout(() => controller.abort(), TIMEOUT_MS);

  let response: Response;
  try {
    response = await fetch(ENDPOINT, {
      method: "POST",
      headers: {
        "content-type": "application/json",
        authorization: `Bearer ${apiKey}`,
      },
      body: JSON.stringify({
        model: DEMO_MODEL,
        max_completion_tokens: DEMO_MAX_TOKENS,
        messages,
      }),
      signal: controller.signal,
      cache: "no-store",
    });
  } catch (error) {
    const aborted = error instanceof Error && error.name === "AbortError";
    throw new ModelUnavailableError(aborted ? "timeout" : "network_error");
  } finally {
    clearTimeout(timer);
  }

  if (!response.ok) {
    // Body may carry an OpenAI error message; useful in the server log only.
    const detail = await response.text().catch(() => "");
    throw new ModelUnavailableError("http_error", `${response.status} ${detail.slice(0, 200)}`);
  }

  const payload = (await response.json().catch(() => null)) as {
    choices?: { message?: { content?: string | null } }[];
  } | null;

  const content = payload?.choices?.[0]?.message?.content;
  if (typeof content !== "string" || content.trim() === "") {
    throw new ModelUnavailableError("empty_response");
  }

  return content;
}
