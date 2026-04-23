import { Github, Linkedin, Mail } from "lucide-react";
import resume from "@/content/resume.json";

export function Footer() {
  const year = new Date().getFullYear();
  const initials = resume.name
    .split(" ")
    .map((s) => s[0])
    .slice(0, 2)
    .join("");

  return (
    <footer
      role="contentinfo"
      className="relative mt-20 border-t border-ink-200/60 dark:border-white/5"
    >
      <div
        aria-hidden
        className="pointer-events-none absolute inset-x-0 -top-px h-px bg-gradient-to-r from-transparent via-brand-500/40 to-transparent"
      />

      <div className="container-prose py-12">
        <div className="flex flex-col items-center justify-between gap-6 sm:flex-row">
          <div className="flex items-center gap-3 font-display text-sm font-semibold">
            <span
              aria-hidden
              className="inline-flex h-8 w-8 items-center justify-center rounded-xl bg-grad-brand text-white"
            >
              {initials}
            </span>
            <span>
              <span className="text-ink-900 dark:text-white">{resume.name}</span>
              <span className="ml-2 font-normal text-ink-500 dark:text-ink-400">
                © {year} · All rights reserved
              </span>
            </span>
          </div>

          <nav aria-label="Social links" className="flex items-center gap-2">
            <a
              href={`mailto:${resume.email}`}
              aria-label={`Email ${resume.name}`}
              className="inline-flex h-9 w-9 items-center justify-center rounded-full border border-ink-200/70 bg-white/60 text-ink-600 backdrop-blur transition hover:border-brand-400/60 hover:text-brand-700 dark:border-white/10 dark:bg-white/[0.04] dark:text-ink-300 dark:hover:text-brand-300"
            >
              <Mail className="h-4 w-4" aria-hidden />
            </a>
            <a
              href={resume.social.linkedin}
              target="_blank"
              rel="noopener noreferrer"
              aria-label="LinkedIn profile (opens in a new tab)"
              className="inline-flex h-9 w-9 items-center justify-center rounded-full border border-ink-200/70 bg-white/60 text-ink-600 backdrop-blur transition hover:border-brand-400/60 hover:text-brand-700 dark:border-white/10 dark:bg-white/[0.04] dark:text-ink-300 dark:hover:text-brand-300"
            >
              <Linkedin className="h-4 w-4" aria-hidden />
            </a>
            <a
              href={resume.social.github}
              target="_blank"
              rel="noopener noreferrer"
              aria-label="GitHub profile (opens in a new tab)"
              className="inline-flex h-9 w-9 items-center justify-center rounded-full border border-ink-200/70 bg-white/60 text-ink-600 backdrop-blur transition hover:border-brand-400/60 hover:text-brand-700 dark:border-white/10 dark:bg-white/[0.04] dark:text-ink-300 dark:hover:text-brand-300"
            >
              <Github className="h-4 w-4" aria-hidden />
            </a>
          </nav>
        </div>

        <p className="mt-6 text-center font-mono text-[11px] uppercase tracking-[0.2em] text-ink-600 dark:text-ink-400">
          Designed &amp; engineered to{" "}
          <span className="gradient-text-static font-semibold">
            WCAG 2.1 AA &amp; Section 508
          </span>{" "}
          standards
        </p>
      </div>
    </footer>
  );
}
