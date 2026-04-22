import resume from "@/content/resume.json";

export function Footer() {
  const year = new Date().getFullYear();
  return (
    <footer className="border-t border-slate-200 py-8 dark:border-slate-800">
      <div className="container-prose flex flex-col items-center justify-between gap-3 text-sm text-slate-500 dark:text-slate-400 sm:flex-row">
        <p>© {year} {resume.name}. All rights reserved.</p>
        <p>
          Built with Next.js · Tailwind · Groq ·{" "}
          <a
            href={resume.social.github}
            target="_blank"
            rel="noopener noreferrer"
            className="link-underline text-brand-600 dark:text-brand-400"
          >
            Source
          </a>
        </p>
      </div>
    </footer>
  );
}
