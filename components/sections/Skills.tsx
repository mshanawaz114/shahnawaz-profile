import { SectionHeader } from "./SectionHeader";
import resume from "@/content/resume.json";

export function Skills() {
  const groups = Object.entries(resume.skills) as [string, string[]][];

  return (
    <section
      id="skills"
      aria-labelledby="skills-heading"
      className="bg-slate-50/60 py-20 dark:bg-slate-900/30"
    >
      <div className="container-prose">
        <SectionHeader
          eyebrow="Skills"
          title="The stack I ship with."
          description="Fourteen years across CMS, backend, frontend, cloud, and DevOps — with deep Drupal, React, and Azure fluency."
        />

        <div className="grid gap-4 sm:grid-cols-2 lg:grid-cols-3">
          {groups.map(([group, items]) => (
            <div key={group} className="card">
              <h3 className="mb-3 font-display text-sm font-semibold uppercase tracking-wider text-brand-600 dark:text-brand-400">
                {group}
              </h3>
              <div className="flex flex-wrap gap-1.5">
                {items.map((i) => (
                  <span key={i} className="chip">
                    {i}
                  </span>
                ))}
              </div>
            </div>
          ))}
        </div>

        {/* Certifications row */}
        <div className="mt-10">
          <h3 className="mb-4 font-display text-sm font-semibold uppercase tracking-wider text-slate-500 dark:text-slate-400">
            Certifications
          </h3>
          <div className="flex flex-wrap gap-2">
            {resume.certifications.map((c) => (
              <span key={c.name} className="chip-brand">
                {c.id ? `${c.id} · ` : ""}
                {c.name}
              </span>
            ))}
          </div>
        </div>
      </div>
    </section>
  );
}
