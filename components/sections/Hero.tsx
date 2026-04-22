"use client";

import { motion } from "framer-motion";
import { ArrowRight, Download, Sparkles } from "lucide-react";
import resume from "@/content/resume.json";

function openChat() {
  window.dispatchEvent(new Event("open-chat"));
}

export function Hero() {
  return (
    <section
      id="top"
      aria-labelledby="hero-heading"
      className="relative overflow-hidden pb-20 pt-16 sm:pt-24"
    >
      {/* Decorative gradient blob */}
      <div
        aria-hidden
        className="pointer-events-none absolute inset-x-0 top-[-10%] -z-10 flex justify-center"
      >
        <div className="h-[520px] w-[520px] rounded-full bg-brand-500/20 blur-3xl dark:bg-brand-500/10" />
      </div>

      <div className="container-prose">
        <motion.div
          initial={{ opacity: 0, y: 12 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.5 }}
          className="max-w-3xl"
        >
          <p className="chip-brand mb-5">
            <Sparkles className="mr-1.5 h-3 w-3" aria-hidden />
            Open to Senior / Staff / Architect roles
          </p>

          <h1
            id="hero-heading"
            className="font-display text-4xl font-bold leading-tight tracking-tight sm:text-5xl lg:text-6xl"
          >
            Hi, I'm <span className="text-brand-600 dark:text-brand-400">{resume.name}</span>.
            <br className="hidden sm:block" /> {resume.title.split(" · ")[0]}.
          </h1>

          <p className="mt-5 max-w-2xl text-lg text-slate-600 dark:text-slate-300">
            {resume.tagline}
          </p>

          <div className="mt-8 flex flex-wrap items-center gap-3">
            <button
              type="button"
              onClick={openChat}
              className="group inline-flex items-center gap-2 rounded-full bg-brand-600 px-5 py-2.5 text-sm font-medium text-white shadow-lg shadow-brand-600/20 transition hover:bg-brand-500"
            >
              Ask me anything
              <ArrowRight className="h-4 w-4 transition group-hover:translate-x-0.5" aria-hidden />
            </button>

            <a
              href="/resume.pdf"
              target="_blank"
              rel="noopener noreferrer"
              className="inline-flex items-center gap-2 rounded-full border border-slate-300 bg-white px-5 py-2.5 text-sm font-medium text-slate-700 transition hover:border-brand-400 hover:text-brand-600 dark:border-slate-700 dark:bg-slate-900 dark:text-slate-200 dark:hover:text-brand-400"
            >
              <Download className="h-4 w-4" aria-hidden />
              Download resume
            </a>
          </div>

          {/* Quick stats */}
          <dl className="mt-12 grid max-w-xl grid-cols-3 gap-6 border-t border-slate-200 pt-6 dark:border-slate-800">
            <Stat value="14+" label="Years experience" />
            <Stat value="18+" label="Companies led" />
            <Stat value="6" label="Pro certifications" />
          </dl>
        </motion.div>
      </div>
    </section>
  );
}

function Stat({ value, label }: { value: string; label: string }) {
  return (
    <div>
      <dt className="font-display text-2xl font-bold text-brand-600 dark:text-brand-400 sm:text-3xl">
        {value}
      </dt>
      <dd className="mt-1 text-sm text-slate-600 dark:text-slate-400">{label}</dd>
    </div>
  );
}
