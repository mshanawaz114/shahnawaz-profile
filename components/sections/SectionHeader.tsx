"use client";

import { motion } from "framer-motion";
import { cn } from "@/lib/cn";

export function SectionHeader({
  eyebrow,
  title,
  description,
  className,
  align = "left",
  id,
}: {
  eyebrow?: string;
  title: string;
  description?: string;
  className?: string;
  align?: "left" | "center";
  id?: string;
}) {
  return (
    <motion.div
      initial={{ opacity: 0, y: 18 }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true, margin: "-80px" }}
      transition={{ duration: 0.6, ease: [0.22, 1, 0.36, 1] }}
      className={cn(
        "mb-12 max-w-2xl",
        align === "center" && "mx-auto text-center",
        className,
      )}
    >
      {eyebrow && (
        <div
          className={cn(
            "mb-4 inline-flex items-center gap-2 rounded-full border border-brand-500/20 bg-grad-brand-soft px-3 py-1 backdrop-blur",
            align === "center" && "mx-auto",
          )}
        >
          <span className="h-1.5 w-1.5 rounded-full bg-grad-brand bg-gradient-to-r from-indigo-500 via-violet-500 to-fuchsia-500" />
          <span className="font-mono text-[11px] font-semibold uppercase tracking-[0.18em] gradient-text-static">
            {eyebrow}
          </span>
        </div>
      )}
      <h2 id={id} className="section-heading text-balance">
        <span className="text-ink-900 dark:text-white">{title}</span>
      </h2>
      {description && (
        <p className="mt-4 text-base leading-relaxed text-ink-600 dark:text-ink-400">
          {description}
        </p>
      )}
    </motion.div>
  );
}
