"use client";

import { motion } from "framer-motion";
import { Award } from "lucide-react";
import { SectionHeader } from "./SectionHeader";
import resume from "@/content/resume.json";

const ICONS: Record<string, string> = {
  CMS: "▣",
  "PHP Frameworks": "❮❯",
  Backend: "⌬",
  Frontend: "◈",
  Cloud: "☁",
  DevOps: "⚙",
  Architecture: "▲",
  Languages: "≡",
  Databases: "▤",
  Tools: "✦",
  Other: "✺",
};

export function Skills() {
  const groups = Object.entries(resume.skills) as [string, string[]][];

  return (
    <section
      id="skills"
      aria-labelledby="skills-heading"
      className="relative py-24 sm:py-28"
    >
      {/* layered background */}
      <div
        aria-hidden
        className="pointer-events-none absolute inset-0 -z-10 overflow-hidden"
      >
        <div className="absolute -left-20 top-1/4 h-72 w-72 rounded-full bg-brand-500/15 blur-3xl" />
        <div className="absolute -right-20 bottom-1/4 h-80 w-80 rounded-full bg-accent-500/15 blur-3xl" />
      </div>

      <div className="container-prose">
        <SectionHeader
          id="skills-heading"
          eyebrow="Capabilities"
          title="Technical competencies."
          description="Production-tested expertise spanning enterprise content platforms, full-stack engineering, cloud architecture, and release engineering."
        />

        <div className="grid gap-5 sm:grid-cols-2 lg:grid-cols-3">
          {groups.map(([group, items], idx) => (
            <motion.div
              key={group}
              initial={{ opacity: 0, y: 24 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true, margin: "-60px" }}
              transition={{
                duration: 0.55,
                delay: idx * 0.06,
                ease: [0.22, 1, 0.36, 1],
              }}
              className="card group"
            >
              <div className="mb-4 flex items-center gap-3">
                <span className="inline-flex h-10 w-10 items-center justify-center rounded-xl bg-grad-brand text-lg font-bold text-white shadow-glow">
                  {ICONS[group] ?? "◆"}
                </span>
                <h3 className="font-display text-base font-semibold tracking-tight text-ink-900 dark:text-white">
                  {group}
                </h3>
              </div>
              <div className="flex flex-wrap gap-1.5">
                {items.map((i) => (
                  <span key={i} className="chip">
                    {i}
                  </span>
                ))}
              </div>
            </motion.div>
          ))}
        </div>

        {/* Certifications */}
        <motion.div
          initial={{ opacity: 0, y: 18 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true, margin: "-80px" }}
          transition={{ duration: 0.6, ease: [0.22, 1, 0.36, 1] }}
          className="mt-14"
        >
          <div className="mb-5 flex items-center gap-2">
            <Award className="h-4 w-4 text-brand-500" aria-hidden />
            <h3 className="font-mono text-[11px] font-semibold uppercase tracking-[0.2em] text-ink-500 dark:text-ink-400">
              Certifications
            </h3>
          </div>
          <div className="flex flex-wrap gap-2">
            {resume.certifications.map((c) => (
              <span key={c.name} className="chip-brand">
                {c.id ? `${c.id} · ` : ""}
                {c.name}
              </span>
            ))}
          </div>
        </motion.div>
      </div>
    </section>
  );
}
