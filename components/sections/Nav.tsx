"use client";

import { useEffect, useState } from "react";
import { cn } from "@/lib/cn";
import { ThemeToggle } from "@/components/ui/ThemeToggle";
import resume from "@/content/resume.json";

const LINKS = [
  { href: "#about", label: "About" },
  { href: "#skills", label: "Skills" },
  { href: "#experience", label: "Experience" },
  { href: "#projects", label: "Projects" },
  { href: "#contact", label: "Contact" },
];

export function Nav() {
  const [scrolled, setScrolled] = useState(false);

  useEffect(() => {
    const onScroll = () => setScrolled(window.scrollY > 8);
    onScroll();
    window.addEventListener("scroll", onScroll, { passive: true });
    return () => window.removeEventListener("scroll", onScroll);
  }, []);

  const initials = resume.name
    .split(" ")
    .map((s) => s[0])
    .slice(0, 2)
    .join("");

  return (
    <header
      className={cn(
        "sticky top-0 z-30 w-full transition-all",
        scrolled
          ? "border-b border-slate-200/80 bg-white/70 backdrop-blur dark:border-slate-800/80 dark:bg-slate-950/70"
          : "bg-transparent",
      )}
    >
      <div className="container-prose flex h-16 items-center justify-between">
        <a
          href="#top"
          className="inline-flex items-center gap-2 font-display text-sm font-semibold tracking-tight"
          aria-label="Go to top"
        >
          <span className="inline-flex h-8 w-8 items-center justify-center rounded-lg bg-gradient-to-br from-brand-500 to-brand-700 text-white">
            {initials}
          </span>
          <span className="hidden sm:inline">{resume.name}</span>
        </a>

        <nav aria-label="Primary" className="hidden gap-1 md:flex">
          {LINKS.map((l) => (
            <a
              key={l.href}
              href={l.href}
              className="rounded-md px-3 py-1.5 text-sm text-slate-600 transition hover:bg-slate-100 hover:text-slate-900 dark:text-slate-300 dark:hover:bg-slate-800 dark:hover:text-white"
            >
              {l.label}
            </a>
          ))}
        </nav>

        <div className="flex items-center gap-2">
          <a
            href="/resume.pdf"
            target="_blank"
            rel="noopener noreferrer"
            className="hidden rounded-md border border-slate-200 px-3 py-1.5 text-sm text-slate-700 transition hover:border-brand-400 hover:text-brand-600 sm:inline-flex dark:border-slate-800 dark:text-slate-200 dark:hover:text-brand-400"
          >
            Resume
          </a>
          <ThemeToggle />
        </div>
      </div>
    </header>
  );
}
