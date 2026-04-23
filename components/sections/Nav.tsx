"use client";

import { useEffect, useState } from "react";
import { cn } from "@/lib/cn";
import { ThemeToggle } from "@/components/ui/ThemeToggle";
import resume from "@/content/resume.json";

const LINKS = [
  { href: "#about", label: "Profile" },
  { href: "#skills", label: "Capabilities" },
  { href: "#experience", label: "Experience" },
  { href: "#projects", label: "Engagements" },
  { href: "#contact", label: "Contact" },
];

export function Nav() {
  const [scrolled, setScrolled] = useState(false);
  const [progress, setProgress] = useState(0);
  const [active, setActive] = useState<string>("#about");
  const [mobileOpen, setMobileOpen] = useState(false);

  useEffect(() => {
    const onScroll = () => {
      const y = window.scrollY;
      setScrolled(y > 8);
      const h = document.documentElement.scrollHeight - window.innerHeight;
      setProgress(h > 0 ? Math.min(1, y / h) : 0);
    };
    onScroll();
    window.addEventListener("scroll", onScroll, { passive: true });
    return () => window.removeEventListener("scroll", onScroll);
  }, []);

  // scroll-spy for active section
  useEffect(() => {
    const ids = LINKS.map((l) => l.href.slice(1));
    const obs = new IntersectionObserver(
      (entries) => {
        entries
          .filter((e) => e.isIntersecting)
          .sort(
            (a, b) => b.intersectionRatio - a.intersectionRatio,
          )
          .forEach((e) => setActive(`#${e.target.id}`));
      },
      { rootMargin: "-40% 0px -55% 0px", threshold: [0.1, 0.3, 0.5] },
    );
    ids.forEach((id) => {
      const el = document.getElementById(id);
      if (el) obs.observe(el);
    });
    return () => obs.disconnect();
  }, []);

  const initials = resume.name
    .split(" ")
    .map((s) => s[0])
    .slice(0, 2)
    .join("");

  return (
    <header
      className={cn(
        "fixed inset-x-0 top-0 z-40 w-full transition-all duration-300",
        scrolled ? "py-2" : "py-3",
      )}
    >
      <div className="container-prose">
        <div
          className={cn(
            "flex h-14 items-center justify-between rounded-full px-3 pl-4 transition-all duration-300",
            scrolled
              ? "border border-white/40 bg-white/70 shadow-[0_8px_30px_-10px_rgba(15,23,42,0.18)] backdrop-blur-xl dark:border-white/10 dark:bg-[#0a0a18]/70 dark:shadow-[0_8px_30px_-10px_rgba(0,0,0,0.6)]"
              : "border border-transparent bg-transparent",
          )}
        >
          <a
            href="#top"
            aria-label="Go to top"
            className="group inline-flex items-center gap-2.5 font-display text-sm font-semibold tracking-tight"
          >
            <span className="relative inline-flex h-9 w-9 items-center justify-center overflow-hidden rounded-xl text-white shadow-glow">
              <span className="absolute inset-0 bg-grad-brand bg-[length:200%_200%] animate-gradient" />
              <span className="relative">{initials}</span>
            </span>
            <span className="hidden sm:inline">
              <span className="text-ink-900 dark:text-ink-50">{resume.name.split(" ")[0]}</span>{" "}
              <span className="gradient-text">Mohammed</span>
            </span>
          </a>

          <nav aria-label="Primary" className="hidden items-center gap-0.5 md:flex">
            {LINKS.map((l) => {
              const isActive = active === l.href;
              return (
                <a
                  key={l.href}
                  href={l.href}
                  className={cn(
                    "relative rounded-full px-3.5 py-1.5 text-sm transition",
                    isActive
                      ? "text-ink-900 dark:text-white"
                      : "text-ink-600 hover:text-ink-900 dark:text-ink-300 dark:hover:text-white",
                  )}
                >
                  {isActive && (
                    <span
                      aria-hidden
                      className="absolute inset-0 -z-10 rounded-full bg-grad-brand-soft ring-1 ring-brand-500/20 dark:ring-brand-400/30"
                    />
                  )}
                  {l.label}
                </a>
              );
            })}
          </nav>

          <div className="flex items-center gap-2">
            <a
              href="/resume.pdf"
              target="_blank"
              rel="noopener noreferrer"
              className="hidden rounded-full border border-ink-200/70 bg-white/60 px-3.5 py-1.5 text-sm font-medium text-ink-700 backdrop-blur transition hover:border-brand-400/60 hover:text-brand-700 sm:inline-flex dark:border-white/10 dark:bg-white/[0.04] dark:text-ink-200 dark:hover:border-brand-400/60 dark:hover:text-brand-300"
            >
              Resume
            </a>
            <ThemeToggle />
            <button
              type="button"
              aria-label="Toggle menu"
              onClick={() => setMobileOpen((o) => !o)}
              className="inline-flex h-9 w-9 items-center justify-center rounded-full border border-ink-200/70 bg-white/60 text-ink-700 backdrop-blur md:hidden dark:border-white/10 dark:bg-white/[0.04] dark:text-ink-200"
            >
              <svg
                xmlns="http://www.w3.org/2000/svg"
                viewBox="0 0 24 24"
                fill="none"
                stroke="currentColor"
                strokeWidth="2"
                className="h-4 w-4"
              >
                {mobileOpen ? (
                  <path d="M6 6l12 12M6 18L18 6" />
                ) : (
                  <path d="M4 7h16M4 12h16M4 17h16" />
                )}
              </svg>
            </button>
          </div>
        </div>

        {/* Mobile dropdown */}
        {mobileOpen && (
          <div className="mt-2 rounded-2xl border border-white/40 bg-white/85 p-2 shadow-xl backdrop-blur-xl md:hidden dark:border-white/10 dark:bg-[#0a0a18]/85">
            {LINKS.map((l) => (
              <a
                key={l.href}
                href={l.href}
                onClick={() => setMobileOpen(false)}
                className="block rounded-xl px-3 py-2 text-sm font-medium text-ink-700 transition hover:bg-grad-brand-soft hover:text-ink-900 dark:text-ink-200 dark:hover:text-white"
              >
                {l.label}
              </a>
            ))}
          </div>
        )}
      </div>

      {/* scroll progress bar */}
      <div className="absolute inset-x-0 bottom-0 h-px overflow-hidden">
        <div
          className="h-full bg-grad-brand transition-[width] duration-150"
          style={{ width: `${progress * 100}%` }}
        />
      </div>
    </header>
  );
}
