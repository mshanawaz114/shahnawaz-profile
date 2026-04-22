import { SectionHeader } from "./SectionHeader";
import resume from "@/content/resume.json";

export function About() {
  return (
    <section id="about" aria-labelledby="about-heading" className="py-20">
      <div className="container-prose">
        <SectionHeader
          eyebrow="About"
          title="Fourteen years of shipping enterprise web platforms."
          description="Drupal specialist, full-stack engineer, and technical architect — with a track record across federal, state, healthcare, and financial organizations."
        />

        <div className="grid gap-8 lg:grid-cols-3">
          <div className="lg:col-span-2 space-y-5 text-base leading-relaxed text-slate-700 dark:text-slate-300">
            {resume.summary.slice(0, 3).map((p, i) => (
              <p key={i}>{p}</p>
            ))}
          </div>

          <aside className="space-y-4">
            <div className="card">
              <h3 className="font-display text-sm font-semibold uppercase tracking-wider text-slate-500 dark:text-slate-400">
                Currently
              </h3>
              <p className="mt-2 text-sm text-slate-800 dark:text-slate-200">
                Tech Lead at <strong>Federal Center for Medicaid &amp; Medicare (EPPE)</strong> — leading a high-traffic Drupal 10 portal for federal Medicaid operations.
              </p>
            </div>
            <div className="card">
              <h3 className="font-display text-sm font-semibold uppercase tracking-wider text-slate-500 dark:text-slate-400">
                Based in
              </h3>
              <p className="mt-2 text-sm text-slate-800 dark:text-slate-200">
                {resume.location}
              </p>
            </div>
            <div className="card">
              <h3 className="font-display text-sm font-semibold uppercase tracking-wider text-slate-500 dark:text-slate-400">
                Outside work
              </h3>
              <ul className="mt-2 space-y-1.5 text-sm text-slate-800 dark:text-slate-200">
                {resume.interests.map((i) => (
                  <li key={i}>· {i}</li>
                ))}
              </ul>
            </div>
          </aside>
        </div>
      </div>
    </section>
  );
}
