"use client";

import { motion } from "framer-motion";
import { Building2 } from "lucide-react";
import { SectionHeader } from "./SectionHeader";
import resume from "@/content/resume.json";

export function Experience() {
  return (
    <section
      id="experience"
      aria-labelledby="experience-heading"
      className="relative py-24 sm:py-28"
    >
      <div
        aria-hidden
        className="pointer-events-none absolute right-0 top-40 h-96 w-96 rounded-full bg-grad-brand opacity-10 blur-3xl"
      />

      <div className="container-prose">
        <SectionHeader
          id="experience-heading"
          eyebrow="Experience"
          title="Engagements & roles."
          description="Tech Lead, Enterprise Architect, and Release Manager appointments across federal, state, healthcare, and financial organizations. Listed reverse-chronologically."
        />

        <ol className="relative space-y-10 pl-10 sm:pl-16">
          {/* gradient rail */}
          <span
            aria-hidden
            className="absolute bottom-0 left-3 top-2 w-[2px] bg-gradient-to-b from-brand-500 via-accent-500 to-pink-500/40 sm:left-6"
          />

          {resume.experience.map((job, i) => (
            <motion.li
              key={`${job.company}-${job.start}`}
              initial={{ opacity: 0, x: -16 }}
              whileInView={{ opacity: 1, x: 0 }}
              viewport={{ once: true, margin: "-80px" }}
              transition={{
                duration: 0.55,
                delay: Math.min(i * 0.04, 0.3),
                ease: [0.22, 1, 0.36, 1],
              }}
              className="relative"
            >
              {/* dot */}
              <span
                aria-hidden
                className="absolute top-3 -left-[34px] flex h-6 w-6 items-center justify-center sm:-left-[40px]"
              >
                <span className="absolute inset-0 animate-ping rounded-full bg-brand-500/40" />
                <span className="relative inline-flex h-3 w-3 rounded-full bg-grad-brand bg-gradient-to-br from-brand-500 to-accent-500 ring-4 ring-white dark:ring-[#050510]" />
              </span>

              <article className="card">
                <header className="flex items-baseline gap-2">
                  <Building2 className="h-4 w-4 text-brand-500" aria-hidden />
                  <h3 className="font-display text-lg font-semibold tracking-tight text-ink-900 dark:text-white">
                    {job.company}
                  </h3>
                </header>

                <p className="mt-1.5 text-sm">
                  <span className="gradient-text-static font-semibold">
                    {job.role}
                  </span>
                  <span className="ml-2 text-ink-500 dark:text-ink-400">
                    · {job.location}
                  </span>
                </p>

                {i < 6 && (
                  <ul className="mt-4 space-y-2 text-sm text-ink-700 dark:text-ink-300">
                    {job.highlights.slice(0, 4).map((h) => (
                      <li key={h} className="flex gap-2.5">
                        <span
                          aria-hidden
                          className="mt-2 inline-block h-1.5 w-1.5 shrink-0 rounded-full bg-gradient-to-br from-brand-500 to-accent-500"
                        />
                        <span>{h}</span>
                      </li>
                    ))}
                  </ul>
                )}

                {job.stack && (
                  <div className="mt-4 flex flex-wrap gap-1.5">
                    {job.stack.slice(0, 8).map((t) => (
                      <span key={t} className="chip text-[11px]">
                        {t}
                      </span>
                    ))}
                  </div>
                )}
              </article>
            </motion.li>
          ))}
        </ol>

        <p className="mt-8 pl-10 text-sm text-ink-500 sm:pl-16 dark:text-ink-400">
          The complete work history is available in the{" "}
          <a
            href="/resume.pdf"
            target="_blank"
            rel="noopener noreferrer"
            className="link-underline gradient-text-static font-semibold"
            aria-label="Download full résumé as PDF"
          >
            résumé (PDF)
          </a>
          .
        </p>
      </div>
    </section>
  );
}
