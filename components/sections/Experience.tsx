import { SectionHeader } from "./SectionHeader";
import resume from "@/content/resume.json";

function formatRange(start: string | undefined, end: string) {
  const fmt = (s: string) => {
    if (!s || s === "present") return "Present";
    const [y, m] = s.split("-");
    const months = ["Jan", "Feb", "Mar", "Apr", "May", "Jun", "Jul", "Aug", "Sep", "Oct", "Nov", "Dec"];
    if (m) return `${months[parseInt(m, 10) - 1]} ${y}`;
    return y;
  };
  if (!start) return fmt(end);
  return `${fmt(start)} — ${fmt(end)}`;
}

export function Experience() {
  return (
    <section id="experience" aria-labelledby="experience-heading" className="py-20">
      <div className="container-prose">
        <SectionHeader
          eyebrow="Experience"
          title="Selected roles, most recent first."
          description="Tech Lead, Enterprise Architect, and Release Manager roles across federal, state, healthcare, and financial organizations."
        />

        <ol className="relative space-y-8 border-l border-slate-200 pl-6 dark:border-slate-800">
          {resume.experience.map((job, i) => (
            <li key={`${job.company}-${job.start}`} className="relative">
              <span
                aria-hidden
                className="absolute -left-[31px] top-1.5 flex h-4 w-4 items-center justify-center"
              >
                <span className="h-2.5 w-2.5 rounded-full bg-brand-500 ring-4 ring-white dark:ring-slate-950" />
              </span>

              <article className="card">
                <div className="flex flex-wrap items-baseline justify-between gap-2">
                  <h3 className="font-display text-lg font-semibold">{job.company}</h3>
                  <span className="text-xs font-medium text-slate-500 dark:text-slate-400">
                    {formatRange(job.start, job.end)}
                  </span>
                </div>
                <p className="mt-1 text-sm text-brand-700 dark:text-brand-400">
                  {job.role} <span className="text-slate-400">·</span>{" "}
                  <span className="text-slate-500 dark:text-slate-400">{job.location}</span>
                </p>

                {i < 6 && (
                  <ul className="mt-4 space-y-1.5 text-sm text-slate-700 dark:text-slate-300">
                    {job.highlights.slice(0, 4).map((h) => (
                      <li key={h} className="flex gap-2">
                        <span aria-hidden className="mt-2 inline-block h-1 w-1 shrink-0 rounded-full bg-brand-500" />
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
            </li>
          ))}
        </ol>

        <p className="mt-6 text-sm text-slate-500 dark:text-slate-400">
          For the full work history, see the{" "}
          <a href="/resume.pdf" target="_blank" rel="noopener noreferrer" className="link-underline text-brand-600 dark:text-brand-400">
            PDF resume
          </a>
          .
        </p>
      </div>
    </section>
  );
}
