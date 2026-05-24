import { latestIssues } from "@/lib/issues";
import { externalLinks } from "@/lib/nav";

function formatDate(iso: string): string {
  return new Date(iso).toLocaleDateString("en-US", {
    month: "short",
    day: "numeric",
    year: "numeric",
  });
}

export default function LatestIssues() {
  return (
    <section
      id="issues"
      aria-labelledby="section-issues"
      className="py-section-mobile md:py-section px-4 md:px-8 max-w-7xl mx-auto"
    >
      <div className="flex items-center justify-between mb-10">
        <h2
          id="section-issues"
          className="font-display font-semibold text-h2-mobile md:text-h2 text-ink"
        >
          This week&apos;s issues
        </h2>
        <a
          href={externalLinks.archive}
          target="_blank"
          rel="noopener noreferrer"
          className="font-body text-sm text-accent hover:opacity-75 transition-opacity"
        >
          See all →
        </a>
      </div>

      <div className="flex flex-col gap-0 divide-y divide-ink">
        {latestIssues.map((issue) => (
          <article key={issue.number} className="py-6 group">
            <div className="flex items-center gap-3 mb-2">
              <span className="font-mono text-mono text-ink-muted uppercase tracking-wider">
                {formatDate(issue.date)}
              </span>
              <span className="font-mono text-mono text-ink-muted">·</span>
              <span className="font-mono text-mono text-ink-muted">Issue #{issue.number}</span>
            </div>
            <h3 className="font-display font-semibold text-h3-mobile text-ink mb-2">
              {issue.title}
            </h3>
            <p className="font-body text-body-mobile text-ink-muted mb-3">{issue.summary}</p>
            <a
              href={issue.url}
              target="_blank"
              rel="noopener noreferrer"
              className="font-body text-sm text-accent inline-flex items-center gap-1 hover:opacity-75 transition-opacity"
            >
              Read issue
              <span className="transition-transform group-hover:translate-x-1" aria-hidden="true">
                →
              </span>
            </a>
          </article>
        ))}
      </div>
    </section>
  );
}
