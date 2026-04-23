"use client";

import { useEffect, useRef, useState } from "react";
import { AnimatePresence, motion } from "framer-motion";
import { MessageCircle, Send, Sparkles, X } from "lucide-react";
import { cn } from "@/lib/cn";

type Role = "user" | "assistant";
type Msg = { role: Role; content: string };

const STARTERS: string[] = [
  "Summarize Shahnawaz's core technical strengths.",
  "Describe his most recent engagement in detail.",
  "Which industries and clients has he worked with?",
  "List his certifications and credentials.",
];

export function ChatWidget() {
  const [open, setOpen] = useState(false);
  const [messages, setMessages] = useState<Msg[]>([]);
  const [input, setInput] = useState("");
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);
  const scrollRef = useRef<HTMLDivElement>(null);
  const inputRef = useRef<HTMLTextAreaElement>(null);

  useEffect(() => {
    function openChat() {
      setOpen(true);
    }
    window.addEventListener("open-chat", openChat);
    return () => window.removeEventListener("open-chat", openChat);
  }, []);

  useEffect(() => {
    scrollRef.current?.scrollTo({
      top: scrollRef.current.scrollHeight,
      behavior: "smooth",
    });
  }, [messages, loading]);

  useEffect(() => {
    if (open) setTimeout(() => inputRef.current?.focus(), 200);
  }, [open]);

  async function send(content: string) {
    const trimmed = content.trim().slice(0, 500);
    if (!trimmed || loading) return;

    const next: Msg[] = [...messages, { role: "user", content: trimmed }];
    setMessages(next);
    setInput("");
    setLoading(true);
    setError(null);

    try {
      const res = await fetch("/api/chat", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ messages: next }),
      });
      const data = (await res.json()) as { reply?: string; error?: string };
      if (!res.ok || data.error) {
        throw new Error(data.error ?? `HTTP ${res.status}`);
      }
      setMessages((prev) => [
        ...prev,
        { role: "assistant", content: data.reply ?? "" },
      ]);
    } catch (e) {
      const msg = e instanceof Error ? e.message : "Something went wrong.";
      setError(msg);
    } finally {
      setLoading(false);
    }
  }

  function onKeyDown(e: React.KeyboardEvent<HTMLTextAreaElement>) {
    if (e.key === "Enter" && !e.shiftKey) {
      e.preventDefault();
      send(input);
    }
  }

  return (
    <>
      {/* Floating launcher */}
      <button
        type="button"
        aria-label={open ? "Close résumé assistant" : "Open résumé assistant"}
        aria-expanded={open}
        aria-controls="resume-assistant-panel"
        onClick={() => setOpen((o) => !o)}
        className={cn(
          "group fixed bottom-6 right-6 z-50 inline-flex h-16 w-16 items-center justify-center rounded-full text-white transition-all duration-300",
          "shadow-[0_18px_50px_-12px_rgba(139,92,246,.6),0_8px_20px_-6px_rgba(217,70,239,.4)] hover:scale-105 hover:shadow-[0_24px_60px_-12px_rgba(139,92,246,.75),0_10px_24px_-6px_rgba(217,70,239,.55)]",
          "focus-visible:ring-4 focus-visible:ring-brand-400/50",
        )}
      >
        <span
          aria-hidden
          className="absolute inset-0 rounded-full bg-grad-brand bg-[length:200%_200%] animate-gradient"
        />
        {!open && (
          <span
            aria-hidden
            className="absolute inset-0 rounded-full bg-brand-500/40 animate-pulse-ring"
          />
        )}
        <span className="relative">
          {open ? (
            <X className="h-6 w-6" aria-hidden />
          ) : (
            <MessageCircle className="h-6 w-6" aria-hidden />
          )}
        </span>
      </button>

      {/* Panel */}
      <AnimatePresence>
        {open && (
          <motion.div
            id="resume-assistant-panel"
            role="dialog"
            aria-labelledby="chat-heading"
            aria-modal="false"
            initial={{ opacity: 0, y: 24, scale: 0.96 }}
            animate={{ opacity: 1, y: 0, scale: 1 }}
            exit={{ opacity: 0, y: 16, scale: 0.96 }}
            transition={{ duration: 0.28, ease: [0.22, 1, 0.36, 1] }}
            className="fixed bottom-28 right-4 z-50 flex h-[600px] max-h-[calc(100vh-9rem)] w-[calc(100vw-2rem)] max-w-[420px] flex-col overflow-hidden rounded-3xl"
          >
            {/* gradient border wrapper */}
            <div className="grad-border h-full">
              <div className="relative flex h-full flex-col overflow-hidden rounded-[calc(1.5rem-1px)] bg-white/95 backdrop-blur-xl dark:bg-[#08081a]/95">
                {/* header */}
                <header className="relative overflow-hidden">
                  <div
                    aria-hidden
                    className="absolute inset-0 bg-grad-brand bg-[length:200%_200%] animate-gradient opacity-95"
                  />
                  <div
                    aria-hidden
                    className="absolute inset-0 grid-bg opacity-15 [mask-image:linear-gradient(to_bottom,black,transparent)]"
                  />
                  <div className="relative flex items-center gap-3 px-4 py-4 text-white">
                    <div className="flex h-10 w-10 items-center justify-center rounded-full bg-white/20 backdrop-blur">
                      <Sparkles className="h-4 w-4" aria-hidden />
                    </div>
                    <div className="flex-1">
                      <h2
                        id="chat-heading"
                        className="font-display text-sm font-semibold tracking-tight"
                      >
                        Résumé Assistant
                      </h2>
                      <p className="text-[11px] text-white/85">
                        Conversational Q&amp;A grounded in the résumé
                      </p>
                    </div>
                    <button
                      type="button"
                      aria-label="Close chat"
                      onClick={() => setOpen(false)}
                      className="rounded-full p-1.5 text-white/85 transition hover:bg-white/15 hover:text-white"
                    >
                      <X className="h-4 w-4" aria-hidden />
                    </button>
                  </div>
                </header>

                {/* messages */}
                <div
                  ref={scrollRef}
                  role="log"
                  aria-live="polite"
                  aria-relevant="additions"
                  aria-label="Conversation transcript"
                  className="scroll-soft flex-1 space-y-3 overflow-y-auto bg-white/40 px-4 py-4 dark:bg-white/[0.02]"
                >
                  {messages.length === 0 && (
                    <div className="space-y-4">
                      <div className="flex items-start gap-2 rounded-2xl border border-brand-500/20 bg-grad-brand-soft p-3">
                        <Sparkles
                          className="mt-0.5 h-4 w-4 shrink-0 text-brand-600 dark:text-brand-300"
                          aria-hidden
                        />
                        <p className="text-[13px] leading-relaxed text-ink-700 dark:text-ink-200">
                          Welcome. This assistant answers questions about
                          Shahnawaz&apos;s experience, technical capabilities,
                          and engagements. Suggested prompts:
                        </p>
                      </div>
                      <div className="flex flex-wrap gap-2">
                        {STARTERS.map((q) => (
                          <button
                            key={q}
                            type="button"
                            onClick={() => send(q)}
                            className="rounded-full border border-ink-200/70 bg-white/70 px-3 py-1.5 text-[12px] text-ink-700 backdrop-blur transition hover:border-brand-400/70 hover:text-brand-700 dark:border-white/10 dark:bg-white/[0.04] dark:text-ink-300 dark:hover:border-brand-400/60 dark:hover:text-brand-300"
                          >
                            {q}
                          </button>
                        ))}
                      </div>
                    </div>
                  )}

                  {messages.map((m, i) => (
                    <Bubble key={i} role={m.role} content={m.content} />
                  ))}

                  {loading && <Typing />}

                  {error && (
                    <div className="rounded-xl border border-rose-300/60 bg-rose-50/80 px-3 py-2 text-xs text-rose-700 backdrop-blur dark:border-rose-900/60 dark:bg-rose-950/40 dark:text-rose-200">
                      {error}
                    </div>
                  )}
                </div>

                {/* input */}
                <form
                  onSubmit={(e) => {
                    e.preventDefault();
                    send(input);
                  }}
                  className="flex items-end gap-2 border-t border-ink-200/60 bg-white/85 px-3 py-3 backdrop-blur dark:border-white/5 dark:bg-[#08081a]/85"
                >
                  <textarea
                    ref={inputRef}
                    value={input}
                    onChange={(e) => setInput(e.target.value.slice(0, 500))}
                    onKeyDown={onKeyDown}
                    rows={1}
                    placeholder="Type a question…"
                    className="max-h-32 flex-1 resize-none rounded-xl border border-ink-200/70 bg-white px-3 py-2 text-sm text-ink-900 placeholder:text-ink-500 focus:border-brand-500 focus:outline-none focus:ring-2 focus:ring-brand-500/20 dark:border-white/10 dark:bg-white/[0.04] dark:text-ink-100 dark:placeholder:text-ink-400"
                    aria-label="Your question"
                  />
                  <button
                    type="submit"
                    disabled={loading || input.trim().length === 0}
                    aria-label="Send"
                    className="relative inline-flex h-10 w-10 items-center justify-center overflow-hidden rounded-xl text-white shadow-glow transition disabled:cursor-not-allowed disabled:opacity-40"
                  >
                    <span
                      aria-hidden
                      className="absolute inset-0 bg-grad-brand bg-[length:200%_200%] animate-gradient"
                    />
                    <Send className="relative h-4 w-4" aria-hidden />
                  </button>
                </form>
              </div>
            </div>
          </motion.div>
        )}
      </AnimatePresence>
    </>
  );
}

function Bubble({ role, content }: { role: Role; content: string }) {
  const isUser = role === "user";
  return (
    <motion.div
      initial={{ opacity: 0, y: 6 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.25 }}
      className={cn("flex w-full", isUser ? "justify-end" : "justify-start")}
    >
      {isUser ? (
        <div className="relative max-w-[85%] overflow-hidden rounded-2xl rounded-br-md px-3.5 py-2.5 text-sm leading-relaxed text-white shadow-glow">
          <span
            aria-hidden
            className="absolute inset-0 bg-grad-brand bg-[length:200%_200%] animate-gradient"
          />
          <span className="relative whitespace-pre-wrap">{content}</span>
        </div>
      ) : (
        <div className="max-w-[85%] whitespace-pre-wrap rounded-2xl rounded-bl-md border border-ink-200/70 bg-white px-3.5 py-2.5 text-sm leading-relaxed text-ink-800 shadow-sm dark:border-white/10 dark:bg-white/[0.04] dark:text-ink-100">
          {content}
        </div>
      )}
    </motion.div>
  );
}

function Typing() {
  return (
    <div className="flex justify-start">
      <div className="flex items-center gap-1 rounded-2xl rounded-bl-md border border-ink-200/70 bg-white px-3.5 py-2.5 dark:border-white/10 dark:bg-white/[0.04]">
        <span className="h-1.5 w-1.5 animate-bounce rounded-full bg-grad-brand bg-gradient-to-r from-brand-500 to-accent-500 [animation-delay:0s]" />
        <span className="h-1.5 w-1.5 animate-bounce rounded-full bg-grad-brand bg-gradient-to-r from-brand-500 to-accent-500 [animation-delay:0.15s]" />
        <span className="h-1.5 w-1.5 animate-bounce rounded-full bg-grad-brand bg-gradient-to-r from-brand-500 to-accent-500 [animation-delay:0.3s]" />
      </div>
    </div>
  );
}
