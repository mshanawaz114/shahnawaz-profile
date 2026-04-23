"use client";

import { motion } from "framer-motion";
import { ChevronRight, ExternalLink } from "lucide-react";
import { useState } from "react";
import { SectionHeader } from "./SectionHeader";
import projects from "@/content/projects.json";
import { cn } from "@/lib/cn";

// soft accent gradient per card position so the grid feels rich
const ACCENTS = [
  "from-indigo-500 via-violet-500 to-fuchsia-500",
  "from-violet-500 via-fuchsia-500 to-pink-500",
  "from-cyan-500 via-blue-500 to-indigo-500",
  "from-fuchsia-500 via-pink-500 to-rose-500",
  "from-emerald-500 via-teal-500 to-cyan-500",
  "from-amber-500 via-orange-500 to-pink-500",
];

export function Projects() {
  return (
    <section
      id="projects"
      aria-labelledby="projects-heading"
      className="relative py-24 sm:py-28"
    >
      <div
        aria-hidden
        className="pointer-events-none absolute left-0 top-1/3 h-80 w-80 rounded-full bg-accent-500/15 blur-3xl"
      />

      <div className="container-prose">
        <SectionHeader
          id="projects-heading"
          eyebrow="Case Studies"
          title="Selected engagements."
          description="A representative cross-section of programmes delivered across federal, state, healthcare, and financial institutions."
        />

        <div className="grid gap-6 md:grid-cols-2">
          {projects.map((p, i) => (
            <ProjectCard key={p.slug} project={p} accent={ACCENTS[i % ACCENTS.length]} delay={i * 0.06} />
          ))}
        </div>
      </div>
    </section>
  );
}

type Project = (typeof projects)[number];

function ProjectCard({
  project,
  accent,
  delay,
}: {
  project: Project;
  accent: string;
  delay: number;
}) {
  const [open, setOpen] = useState(false);

  return (
    <motion.article
      initial={{ opacity: 0, y: 24 }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true, margin: "-60px" }}
      transition={{ duration: 0.6, delay, ease: [0.22, 1, 0.36, 1] }}
      className="group relative flex flex-col overflow-hidden rounded-2xl border border-ink-200/70 bg-white/70 p-6 backdrop-blur transition-all duration-300 hover:-translate-y-0.5 dark:border-white/5 dark:bg-white/[0.02]"
    >
      {/* gradient halo on hover */}
      <div
        aria-hidden
        className={cn(
          "pointer-events-none absolute -inset-px rounded-2xl bg-gradient-to-br opacity-0 transition-opacity duration-500 group-hover:opacity-100",
          accent,
        )}
        style={{
          padding: "1px",
          WebkitMask:
            "linear-gradient(#000 0 0) content-box, linear-gradient(#000 0 0)",
          WebkitMaskComposite: "xor",
          maskComposite: "exclude",
        }}
      />
      {/* subtle corner accent */}
      <div
        aria-hidden
        className={cn(
          "pointer-events-none absolute -right-10 -top-10 h-40 w-40 rounded-full bg-gradient-to-br opacity-20 blur-3xl transition-opacity duration-500 group-hover:opacity-40",
          accent,
        )}
      />

      <header className="relative">
        <div className="flex flex-wrap items-center justify-between gap-2">
          <span
            className={cn(
              "inline-flex items-center gap-1.5 rounded-full bg-gradient-to-r px-2.5 py-0.5 text-[10px] font-semibold uppercase tracking-wider text-white",
              accent,
            )}
          >
            <ExternalLink className="h-3 w-3" />
            {project.client}
          </span>
          <span className="font-mono text-[11px] uppercase tracking-wider text-ink-500 dark:text-ink-400">
            {project.period}
          </span>
        </div>

        <h3 className="mt-3 font-display text-xl font-bold tracking-tight text-ink-900 dark:text-white">
          {project.name}
        </h3>
      </header>

      <p className="relative mt-3 text-sm leading-relaxed text-ink-700 dark:text-ink-300">
        {project.headline}
      </p>

      <button
        type="button"
        onClick={() => setOpen((o) => !o)}
        className="relative mt-4 inline-flex w-fit items-center gap-1 text-sm font-semibold gradient-text-static hover:opacity-80"
        aria-expanded={open}
      >
        {open ? "Hide details" : "Read details"}
        <ChevronRight
          className={cn(
            "h-4 w-4 text-brand-500 transition-transform",
            open && "rotate-90",
          )}
        />
      </button>

      <motion.div
        initial={false}
        animate={{
          height: open ? "auto" : 0,
          opacity: open ? 1 : 0,
        }}
        transition={{ duration: 0.35, ease: [0.22, 1, 0.36, 1] }}
        className="relative overflow-hidden"
      >
        <div className="mt-4 space-y-4 text-sm">
          <div>
            <h4 className="font-mono text-[10px] font-semibold uppercase tracking-[0.18em] text-ink-500 dark:text-ink-400">
              Problem
            </h4>
            <p className="mt-1 text-ink-700 dark:text-ink-300">
              {project.problem}
            </p>
          </div>
          <div>
            <h4 className="font-mono text-[10px] font-semibold uppercase tracking-[0.18em] text-ink-500 dark:text-ink-400">
              Impact
            </h4>
            <ul className="mt-1.5 space-y-1.5 text-ink-700 dark:text-ink-300">
              {project.impact.map((x) => (
                <li key={x} className="flex gap-2">
                  <span
                    aria-hidden
                    className={cn(
                      "mt-2 inline-block h-1.5 w-1.5 shrink-0 rounded-full bg-gradient-to-br",
                      accent,
                    )}
                  />
                  <span>{x}</span>
                </li>
              ))}
            </ul>
          </div>
        </div>
      </motion.div>

      <footer className="relative mt-auto pt-5">
        <div className="flex flex-wrap gap-1.5">
          {project.stack.slice(0, 6).map((t) => (
            <span key={t} className="chip text-[11px]">
              {t}
            </span>
          ))}
        </div>
        {project.tags && (
          <div className="mt-2 flex flex-wrap gap-1.5">
            {project.tags.map((t) => (
              <span key={t} className="chip-brand text-[11px]">
                #{t}
              </span>
            ))}
          </div>
        )}
      </footer>
    </motion.article>
  );
}
