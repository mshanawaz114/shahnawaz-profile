"use client";

import { motion } from "framer-motion";
import {
  Github,
  Linkedin,
  Mail,
  MessageCircle,
  ArrowUpRight,
} from "lucide-react";
import { SectionHeader } from "./SectionHeader";
import resume from "@/content/resume.json";
import { cn } from "@/lib/cn";

function openChat() {
  window.dispatchEvent(new Event("open-chat"));
}

type Card = {
  label: string;
  title: string;
  sub: string;
  icon: React.ReactNode;
  accent: string;
} & (
  | { href: string; external?: boolean; onClick?: undefined }
  | { onClick: () => void; href?: undefined; external?: undefined }
);

export function Contact() {
  const cards: Card[] = [
    {
      label: "Email",
      title: resume.email,
      sub: "Preferred for engagement inquiries",
      icon: <Mail className="h-5 w-5" aria-hidden />,
      href: `mailto:${resume.email}`,
      accent: "from-indigo-500 to-violet-500",
    },
    {
      label: "LinkedIn",
      title: "/in/shahnawaz-mohammed",
      sub: "Professional profile & references",
      icon: <Linkedin className="h-5 w-5" aria-hidden />,
      href: resume.social.linkedin,
      external: true,
      accent: "from-violet-500 to-fuchsia-500",
    },
    {
      label: "GitHub",
      title: "/mshanawaz114",
      sub: "Open-source contributions",
      icon: <Github className="h-5 w-5" aria-hidden />,
      href: resume.social.github,
      external: true,
      accent: "from-fuchsia-500 to-pink-500",
    },
    {
      label: "Resume Assistant",
      title: "Conversational Q&A",
      sub: "Ask detailed questions about scope and experience",
      icon: <MessageCircle className="h-5 w-5" aria-hidden />,
      onClick: openChat,
      accent: "from-pink-500 to-rose-500",
    },
  ];

  return (
    <section
      id="contact"
      aria-labelledby="contact-heading"
      className="relative py-24 sm:py-28"
    >
      <div
        aria-hidden
        className="pointer-events-none absolute inset-0 -z-10 overflow-hidden"
      >
        <div className="absolute left-1/2 top-1/2 h-[600px] w-[600px] -translate-x-1/2 -translate-y-1/2 rounded-full bg-grad-brand opacity-15 blur-3xl" />
      </div>

      <div className="container-prose">
        <SectionHeader
          id="contact-heading"
          eyebrow="Contact"
          title="Inquiries & engagement."
          description="For senior engineering, technical architecture, or release management engagements — full-time, contract, or fractional advisory — please reach out through any of the channels below."
          align="center"
        />

        <div className="grid gap-4 sm:grid-cols-2 lg:grid-cols-4">
          {cards.map((c, i) => (
            <motion.div
              key={c.label}
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true, margin: "-60px" }}
              transition={{
                duration: 0.55,
                delay: i * 0.06,
                ease: [0.22, 1, 0.36, 1],
              }}
              className="h-full"
            >
              <ContactCard card={c} />
            </motion.div>
          ))}
        </div>

        {/* Big CTA banner */}
        <motion.div
          initial={{ opacity: 0, y: 24 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true, margin: "-60px" }}
          transition={{ duration: 0.6, delay: 0.2, ease: [0.22, 1, 0.36, 1] }}
          className="relative mt-14"
        >
          <div className="grad-border">
            <div className="relative flex flex-col items-center gap-5 overflow-hidden rounded-[calc(1rem-1px)] bg-white/85 px-6 py-10 text-center backdrop-blur-xl sm:flex-row sm:justify-between sm:text-left dark:bg-[#0a0a18]/85">
              <div
                aria-hidden
                className="absolute inset-0 -z-10 grid-bg opacity-30 [mask-image:radial-gradient(ellipse_at_center,black,transparent_70%)]"
              />
              <div>
                <h3 className="font-display text-2xl font-bold tracking-tight text-ink-900 sm:text-3xl dark:text-white">
                  Considering an engagement?{" "}
                  <span className="gradient-text">Let&apos;s discuss it.</span>
                </h3>
                <p className="mt-2 max-w-xl text-sm text-ink-600 dark:text-ink-400">
                  Direct outreach via email is fastest. For preliminary
                  questions on scope, fit, or experience, the resume assistant
                  is available below.
                </p>
              </div>
              <button
                type="button"
                onClick={openChat}
                className="btn-primary shrink-0"
                aria-label="Open the resume assistant"
              >
                Open resume assistant
                <ArrowUpRight className="h-4 w-4" aria-hidden />
              </button>
            </div>
          </div>
        </motion.div>
      </div>
    </section>
  );
}

function ContactCard({ card }: { card: Card }) {
  const inner = (
    <>
      <div
        className={cn(
          "mb-4 inline-flex h-12 w-12 items-center justify-center rounded-2xl bg-gradient-to-br text-white shadow-glow",
          card.accent,
        )}
      >
        {card.icon}
      </div>
      <span className="font-mono text-[10px] font-semibold uppercase tracking-[0.18em] text-ink-500 dark:text-ink-400">
        {card.label}
      </span>
      <h3 className="mt-1 break-all font-display text-base font-semibold tracking-tight text-ink-900 dark:text-white">
        {card.title}
      </h3>
      <p className="mt-1 text-xs text-ink-600 dark:text-ink-400">{card.sub}</p>
      <ArrowUpRight className="mt-4 h-4 w-4 text-ink-400 transition-all group-hover:-translate-y-0.5 group-hover:translate-x-0.5 group-hover:text-brand-500" />
    </>
  );

  if (card.href) {
    return (
      <a
        href={card.href}
        {...(card.external && {
          target: "_blank",
          rel: "noopener noreferrer",
        })}
        className="card group flex h-full w-full flex-col items-start text-left"
      >
        {inner}
      </a>
    );
  }
  return (
    <button
      type="button"
      onClick={card.onClick}
      className="card group flex h-full w-full flex-col items-start text-left"
    >
      {inner}
    </button>
  );
}
