import { SectionHeader } from "./SectionHeader";
import projects from "@/content/projects.json";

export function Projects() {
  return (
    <section
      id="projects"
      aria-labelledby="projects-heading"
      className="bg-slate-50/60 py-20 dark:bg-slate-900/30"
    >
      <div className="container-prose">
        <SectionHeader
          eyebrow="Projects"
          title="Selected work."
          description="Flagship initiatives I've led or been core to — across government, healthcare, and financial services."
        />

        <div className="grid gap-5 md:grid-cols-2">
          {projects.map((p) => (
            <article key={p.slug} className="card flex flex-col">
              <header>
                <div className="flex flex-wrap items-baseline justify-between gap-2">
                  <h3 className="font-display text-lg font-semibold">{p.name}</h3>
                  <span className="text-xs font-medium text-slate-500 dark:text-slate-400">
                    {p.period}
                  </span>
                </div>
                <p className="mt-1 text-sm text-brand-700 dark:text-brand-400">{p.client}</p>
              </header>

              <p className="mt-3 text-sm text-slate-700 dark:text-slate-300">{p.headline}</p>

              <details className="mt-3 text-sm">
                <summary className="cursor-pointer select-none text-brand-600 hover:underline dark:text-brand-400">
                  Read details
                </summary>
                <div className="mt-3 space-y-3 text-slate-700 dark:text-slate-300">
                  <div>
                    <h4 className="text-xs font-semibold uppercase tracking-wider text-slate-500 dark:text-slate-400">
                      Problem
                    </h4>
                    <p className="mt-1">{p.problem}</p>
                  </div>
                  <div>
                    <h4 className="text-xs font-semibold uppercase tracking-wider text-slate-500 dark:text-slate-400">
                      Impact
                    </h4>
                    <ul className="mt-1 space-y-1.5">
                      {p.impact.map((x) => (
                        <li key={x} className="flex gap-2">
                          <span aria-hidden className="mt-2 inline-block h-1 w-1 shrink-0 rounded-full bg-brand-500" />
                          <span>{x}</span>
                        </li>
                      ))}
                    </ul>
                  </div>
                </div>
              </details>

              <footer className="mt-auto pt-4">
                <div className="flex flex-wrap gap-1.5">
                  {p.stack.slice(0, 6).map((t) => (
                    <span key={t} className="chip text-[11px]">
                      {t}
                    </span>
                  ))}
                </div>
                {p.tags && (
                  <div className="mt-2 flex flex-wrap gap-1.5">
                    {p.tags.map((t) => (
                      <span key={t} className="chip-brand text-[11px]">
                        #{t}
                      </span>
                    ))}
                  </div>
                )}
              </footer>
            </article>
          ))}
        </div>
      </div>
    </section>
  );
}
