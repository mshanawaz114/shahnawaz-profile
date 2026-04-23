"use client";

import { motion } from "framer-motion";
import { Briefcase, MapPin, GraduationCap } from "lucide-react";
import { SectionHeader } from "./SectionHeader";
import resume from "@/content/resume.json";

const fadeUp = {
  initial: { opacity: 0, y: 18 },
  whileInView: { opacity: 1, y: 0 },
  viewport: { once: true, margin: "-80px" },
  transition: { duration: 0.55, ease: [0.22, 1, 0.36, 1] as const },
};

export function About() {
  const topEducation = resume.education[1] ?? resume.education[0];

  return (
    <section
      id="about"
      aria-labelledby="about-heading"
      className="relative py-24 sm:py-28"
    >
      <div className="container-prose relative">
        <SectionHeader
          id="about-heading"
          eyebrow="Profile"
          title="A senior architect's perspective on enterprise web."
          description="Fourteen years designing, building, and operating mission-critical content platforms across federal, state, healthcare, and financial sectors."
        />

        <div className="grid gap-8 lg:grid-cols-3">
          <motion.div
            {...fadeUp}
            className="space-y-5 text-base leading-relaxed text-ink-700 lg:col-span-2 dark:text-ink-300"
          >
            {resume.summary.slice(0, 4).map((p, i) => (
              <motion.p
                key={i}
                {...fadeUp}
                transition={{
                  duration: 0.55,
                  ease: [0.22, 1, 0.36, 1],
                  delay: i * 0.06,
                }}
                className="text-balance"
              >
                {p}
              </motion.p>
            ))}
          </motion.div>

          <aside className="space-y-4" aria-label="At a glance">
            <InfoCard
              icon={<Briefcase className="h-4 w-4" aria-hidden />}
              label="Current Engagement"
              delay={0.05}
            >
              {resume.experience[0].role} at{" "}
              <strong className="text-ink-900 dark:text-white">
                {resume.experience[0].company}
              </strong>
              .
            </InfoCard>

            <InfoCard
              icon={<MapPin className="h-4 w-4" aria-hidden />}
              label="Location"
              delay={0.15}
            >
              {resume.location}
            </InfoCard>

            <InfoCard
              icon={<GraduationCap className="h-4 w-4" aria-hidden />}
              label="Education"
              delay={0.25}
            >
              <span className="block">{topEducation.degree}</span>
              <span className="mt-0.5 block text-xs text-ink-500 dark:text-ink-400">
                {topEducation.school} · {topEducation.location}
              </span>
            </InfoCard>
          </aside>
        </div>
      </div>
    </section>
  );
}

function InfoCard({
  icon,
  label,
  children,
  delay = 0,
}: {
  icon: React.ReactNode;
  label: string;
  children: React.ReactNode;
  delay?: number;
}) {
  return (
    <motion.div
      initial={{ opacity: 0, y: 14 }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true, margin: "-60px" }}
      transition={{ duration: 0.5, delay, ease: [0.22, 1, 0.36, 1] }}
      className="card"
    >
      <div className="mb-2 flex items-center gap-2">
        <span className="inline-flex h-7 w-7 items-center justify-center rounded-lg bg-brand-500/10 text-brand-700 ring-1 ring-brand-500/20 dark:text-brand-300">
          {icon}
        </span>
        <span className="font-mono text-[10px] font-semibold uppercase tracking-[0.18em] text-ink-500 dark:text-ink-400">
          {label}
        </span>
      </div>
      <div className="text-sm leading-relaxed text-ink-700 dark:text-ink-200">
        {children}
      </div>
    </motion.div>
  );
}
