import { NextRequest, NextResponse } from "next/server";
import Groq from "groq-sdk";
import { buildSystemPrompt } from "@/lib/prompt";

export const runtime = "nodejs";
export const dynamic = "force-dynamic";

const PRIMARY_MODEL = process.env.GROQ_MODEL ?? "llama-3.3-70b-versatile";

// Try the user's preferred model first, then fall back through models that
// have been available on Groq in recent months. This makes the app resilient
// when Groq deprecates a model name.
const FALLBACK_MODELS = [
  "llama-3.3-70b-versatile",
  "llama-3.1-8b-instant",
  "llama-3.1-70b-versatile",
  "openai/gpt-oss-20b",
  "openai/gpt-oss-120b",
  "gemma2-9b-it",
];

const MAX_USER_CHARS = 500;
const MAX_HISTORY = 10;

// ─── Simple in-memory IP rate-limiter ───
type Bucket = { count: number; resetAt: number };
const buckets = new Map<string, Bucket>();
const LIMIT = 20;
const WINDOW_MS = 10 * 60 * 1000;

function rateLimit(ip: string): boolean {
  const now = Date.now();
  const b = buckets.get(ip);
  if (!b || now > b.resetAt) {
    buckets.set(ip, { count: 1, resetAt: now + WINDOW_MS });
    return true;
  }
  if (b.count >= LIMIT) return false;
  b.count++;
  return true;
}

type ChatMessage = { role: "user" | "assistant"; content: string };

function sanitize(messages: unknown): ChatMessage[] {
  if (!Array.isArray(messages)) return [];
  return messages
    .filter(
      (m): m is ChatMessage =>
        !!m &&
        typeof m === "object" &&
        (m as ChatMessage).role !== undefined &&
        ["user", "assistant"].includes((m as ChatMessage).role) &&
        typeof (m as ChatMessage).content === "string",
    )
    .slice(-MAX_HISTORY)
    .map((m) => ({
      role: m.role,
      content: m.content.slice(0, MAX_USER_CHARS),
    }));
}

function getErrorMessage(err: unknown): string {
  if (err instanceof Error) return err.message;
  if (typeof err === "string") return err;
  try {
    return JSON.stringify(err);
  } catch {
    return "Unknown error";
  }
}

export async function POST(req: NextRequest) {
  if (!process.env.GROQ_API_KEY) {
    return NextResponse.json(
      { error: "Server missing GROQ_API_KEY. Add it to .env.local or your Vercel env." },
      { status: 500 },
    );
  }

  const ip =
    req.headers.get("x-forwarded-for")?.split(",")[0]?.trim() ??
    req.headers.get("x-real-ip") ??
    "anon";

  if (!rateLimit(ip)) {
    return NextResponse.json(
      { error: "Too many requests. Please try again in a few minutes." },
      { status: 429 },
    );
  }

  let body: unknown;
  try {
    body = await req.json();
  } catch {
    return NextResponse.json({ error: "Invalid JSON body" }, { status: 400 });
  }

  const messages = sanitize((body as { messages?: unknown }).messages);
  if (messages.length === 0) {
    return NextResponse.json({ error: "messages is required" }, { status: 400 });
  }

  const groq = new Groq({ apiKey: process.env.GROQ_API_KEY });

  // Build the candidate model list: user-specified first, then fallbacks (deduped).
  const candidates = Array.from(new Set([PRIMARY_MODEL, ...FALLBACK_MODELS]));

  let lastErr: unknown = null;
  let lastModelTried = PRIMARY_MODEL;
  let authError = false;

  for (const model of candidates) {
    lastModelTried = model;
    try {
      const completion = await groq.chat.completions.create({
        model,
        temperature: 0.3,
        max_tokens: 512,
        messages: [
          { role: "system", content: buildSystemPrompt() },
          ...messages,
        ],
      });

      const reply = completion.choices[0]?.message?.content?.trim() ?? "";
      console.log(`[api/chat] ✓ model=${model} ip=${ip}`);
      return NextResponse.json({ reply, model });
    } catch (err) {
      lastErr = err;
      const msg = getErrorMessage(err).toLowerCase();
      console.warn(`[api/chat] ✗ model=${model} error=${getErrorMessage(err)}`);

      // 401/403 — auth error. No point trying other models.
      if (
        msg.includes("invalid api key") ||
        msg.includes("authentication") ||
        msg.includes("401") ||
        msg.includes("403")
      ) {
        authError = true;
        break;
      }

      // 429 — rate limit. Bail.
      if (msg.includes("429") || msg.includes("rate limit")) {
        break;
      }

      // 404 / model_not_found / decommissioned — try next candidate.
      if (
        msg.includes("404") ||
        msg.includes("model_not_found") ||
        msg.includes("does not exist") ||
        msg.includes("decommissioned") ||
        msg.includes("deprecated") ||
        msg.includes("not supported")
      ) {
        continue;
      }

      // Any other error — try the next model just in case.
      continue;
    }
  }

  // If we got here, every candidate failed.
  const detail = getErrorMessage(lastErr);
  console.error("[api/chat] all models failed; last error:", detail);

  if (authError) {
    return NextResponse.json(
      {
        error:
          "Groq rejected the API key. Check that GROQ_API_KEY in .env.local is correct and active.",
      },
      { status: 401 },
    );
  }

  return NextResponse.json(
    {
      error:
        process.env.NODE_ENV === "production"
          ? "Chat backend error. Please try again."
          : `Groq error (last model tried: ${lastModelTried}): ${detail}`,
      lastModelTried,
      hint:
        "Check the supported model list at https://console.groq.com/docs/models and set GROQ_MODEL in .env.local.",
    },
    { status: 502 },
  );
}
