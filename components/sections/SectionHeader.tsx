import { cn } from "@/lib/cn";

export function SectionHeader({
  eyebrow,
  title,
  description,
  className,
}: {
  eyebrow?: string;
  title: string;
  description?: string;
  className?: string;
}) {
  return (
    <div className={cn("mb-10 max-w-2xl", className)}>
      {eyebrow && (
        <p className="mb-2 text-sm font-semibold uppercase tracking-wider text-brand-600 dark:text-brand-400">
          {eyebrow}
        </p>
      )}
      <h2 className="section-heading">{title}</h2>
      {description && (
        <p className="mt-3 text-base text-slate-600 dark:text-slate-400">
          {description}
        </p>
      )}
    </div>
  );
}
