"use client";

import { Github, Linkedin, Mail, MessageCircle } from "lucide-react";
import { SectionHeader } from "./SectionHeader";
import resume from "@/content/resume.json";

function openChat() {
  window.dispatchEvent(new Event("open-chat"));
}

export function Contact() {
  return (
    <section id="contact" aria-labelledby="contact-heading" className="py-20">
      <div className="container-prose">
        <SectionHeader
          eyebrow="Contact"
          title="Let's talk."
          description="Looking for a senior engineer or architect who ships — and mentors while doing it? I'm easy to reach."
        />

        <div className="grid gap-5 md:grid-cols-2">
          <a
            href={`mailto:${resume.email}`}
            className="card group flex items-start gap-4"
          >
            <span className="inline-flex h-10 w-10 shrink-0 items-center justify-center rounded-xl bg-brand-500/10 text-brand-600 dark:text-brand-400">
              <Mail className="h-5 w-5" aria-hidden />
            </span>
            <div>
              <h3 className="font-display font-semibold">Email</h3>
              <p className="mt-1 text-sm text-slate-600 dark:text-slate-400 group-hover:text-brand-600 dark:group-hover:text-brand-400">
                {resume.email}
              </p>
            </div>
          </a>

          <a
            href={resume.social.linkedin}
            target="_blank"
            rel="noopener noreferrer"
            className="card group flex items-start gap-4"
          >
            <span className="inline-flex h-10 w-10 shrink-0 items-center justify-center rounded-xl bg-brand-500/10 text-brand-600 dark:text-brand-400">
              <Linkedin className="h-5 w-5" aria-hidden />
            </span>
            <div>
              <h3 className="font-display font-semibold">LinkedIn</h3>
              <p className="mt-1 text-sm text-slate-600 dark:text-slate-400 group-hover:text-brand-600 dark:group-hover:text-brand-400">
                /in/shahnawaz-mohammed
              </p>
            </div>
          </a>

          <a
            href={resume.social.github}
            target="_blank"
            rel="noopener noreferrer"
            className="card group flex items-start gap-4"
          >
            <span className="inline-flex h-10 w-10 shrink-0 items-center justify-center rounded-xl bg-brand-500/10 text-brand-600 dark:text-brand-400">
              <Github className="h-5 w-5" aria-hidden />
            </span>
            <div>
              <h3 className="font-display font-semibold">GitHub</h3>
              <p className="mt-1 text-sm text-slate-600 dark:text-slate-400 group-hover:text-brand-600 dark:group-hover:text-brand-400">
                /mshanawaz114
              </p>
            </div>
          </a>

          <button
            type="button"
            onClick={openChat}
            className="card group flex items-start gap-4 text-left"
          >
            <span className="inline-flex h-10 w-10 shrink-0 items-center justify-center rounded-xl bg-brand-500/10 text-brand-600 dark:text-brand-400">
              <MessageCircle className="h-5 w-5" aria-hidden />
            </span>
            <div>
              <h3 className="font-display font-semibold">Chat with the AI</h3>
              <p className="mt-1 text-sm text-slate-600 dark:text-slate-400 group-hover:text-brand-600 dark:group-hover:text-brand-400">
                Ask the chatbot anything about my experience
              </p>
            </div>
          </button>
        </div>
      </div>
    </section>
  );
}
