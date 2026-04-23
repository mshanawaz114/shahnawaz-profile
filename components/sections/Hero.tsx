"use client";

import { motion } from "framer-motion";
import { ArrowRight, Download, MapPin, Mail } from "lucide-react";
import resume from "@/content/resume.json";

function openChat() {
  window.dispatchEvent(new Event("open-chat"));
}

export function Hero() {
  const initials = resume.name
    .split(" ")
    .map((s) => s[0])
    .slice(0, 2)
    .join("");

  return (
    <section
      id="top"
      aria-labelledby="hero-heading"
      className="relative isolate overflow-hidden pb-24 pt-32 sm:pt-40 lg:pt-44"
    >
      {/* Restrained backdrop: subtle radial wash + faint grid */}
      <div aria-hidden className="pointer-events-none absolute inset-0 -z-10">
        <div className="absolute inset-0 bg-[radial-gradient(ellipse_at_top,rgba(139,92,246,0.18),transparent_55%)] dark:bg-[radial-gradient(ellipse_at_top,rgba(139,92,246,0.22),transparent_55%)]" />
        <div className="absolute inset-0 grid-bg opacity-30 [mask-image:radial-gradient(ellipse_at_center,black_25%,transparent_70%)]" />
      </div>

      <div className="container-prose relative">
        <motion.div
          initial={{ opacity: 0, y: 14 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6, ease: [0.22, 1, 0.36, 1] }}
          className="mx-auto max-w-3xl text-center"
        >
          {/* Monogram */}
          <div className="mb-8 flex justify-center">
            <div
              aria-hidden
              className="relative inline-flex h-24 w-24 items-center justify-center rounded-full"
            >
              <span className="absolute inset-0 rounded-full bg-grad-brand opacity-30 blur-xl" />
              <span className="absolute inset-0 rounded-full border border-brand-500/30 bg-white/70 backdrop-blur-xl dark:bg-white/[0.04]" />
              <span className="relative font-display text-2xl font-semibold tracking-tight text-ink-900 dark:text-white">
                {initials}
              </span>
            </div>
          </div>

          {/* Status */}
          <p className="mb-5 inline-flex items-center gap-2 rounded-full border border-brand-500/20 bg-brand-500/[0.06] px-3 py-1 text-xs font-medium uppercase tracking-[0.18em] text-brand-700 dark:bg-brand-500/[0.08] dark:text-brand-300">
            <span aria-hidden className="relative flex h-1.5 w-1.5">
              <span className="absolute inline-flex h-full w-full animate-ping rounded-full bg-brand-500 opacity-70" />
              <span className="relative inline-flex h-1.5 w-1.5 rounded-full bg-brand-500" />
            </span>
            Available for Senior, Staff &amp; Architect engagements
          </p>

          {/* Name */}
          <h1
            id="hero-heading"
            className="display-heading text-balance text-5xl leading-[1.05] sm:text-6xl lg:text-7xl"
          >
            <span className="block text-ink-900 dark:text-white">
              {resume.name}
            </span>
          </h1>

          {/* Title line */}
          <p className="mt-5 font-mono text-xs uppercase tracking-[0.28em] text-ink-500 dark:text-ink-400">
            <span className="gradient-text-static font-semibold">
              {resume.title.replace(/ · /g, "  ·  ")}
            </span>
          </p>

          {/* Tagline */}
          <p className="mx-auto mt-7 max-w-2xl text-balance text-lg leading-relaxed text-ink-700 dark:text-ink-300">
            {resume.tagline}
          </p>

          {/* Meta row */}
          <div className="mt-6 flex flex-wrap items-center justify-center gap-x-6 gap-y-2 text-sm text-ink-600 dark:text-ink-400">
            <span className="inline-flex items-center gap-1.5">
              <MapPin className="h-3.5 w-3.5" aria-hidden />
              {resume.location}
            </span>
            <a
              href={`mailto:${resume.email}`}
              className="inline-flex items-center gap-1.5 link-underline hover:text-brand-700 dark:hover:text-brand-300"
            >
              <Mail className="h-3.5 w-3.5" aria-hidden />
              {resume.email}
            </a>
          </div>

          {/* CTAs */}
          <div className="mt-10 flex flex-wrap items-center justify-center gap-3">
            <button type="button" onClick={openChat} className="btn-primary group">
              Engage the resume assistant
              <ArrowRight
                className="h-4 w-4 transition group-hover:translate-x-0.5"
                aria-hidden
              />
            </button>

            <a
              href="/resume.pdf"
              target="_blank"
              rel="noopener noreferrer"
              className="btn-secondary group"
              aria-label="Download résumé as PDF"
            >
              <Download className="h-4 w-4" aria-hidden />
              Download résumé (PDF)
            </a>
          </div>
        </motion.div>

        {/* Credentials strip */}
        <motion.dl
          initial={{ opacity: 0, y: 16 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.7, delay: 0.2, ease: [0.22, 1, 0.36, 1] }}
          className="mx-auto mt-20 grid max-w-3xl grid-cols-2 gap-px overflow-hidden rounded-2xl border border-ink-200/70 bg-ink-200/70 sm:grid-cols-4 dark:border-white/10 dark:bg-white/10"
        >
          <Stat value="14+" label="Years experience" />
          <Stat value="18" label="Engagements led" />
          <Stat value="6" label="Industry certifications" />
          <Stat value="WCAG 2.1" label="Accessibility champion" />
        </motion.dl>
      </div>
    </section>
  );
}

function Stat({ value, label }: { value: string; label: string }) {
  return (
    <div className="bg-white/85 px-5 py-6 text-center backdrop-blur dark:bg-[#08081a]/90">
      <dt className="font-display text-2xl font-bold text-ink-900 sm:text-3xl dark:text-white">
        {value}
      </dt>
      <dd className="mt-1 text-[11px] font-medium uppercase tracking-[0.16em] text-ink-500 dark:text-ink-400">
        {label}
      </dd>
    </div>
  );
}
