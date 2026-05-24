import { externalLinks } from "@/lib/nav";

export default function CommunityCTA() {
  return (
    <section
      id="community"
      aria-labelledby="section-community"
      className="py-section-mobile md:py-section px-4 md:px-8 bg-accent"
    >
      <div className="max-w-3xl mx-auto text-center">
        <h2
          id="section-community"
          className="font-display font-semibold text-h2-mobile md:text-h2 text-accent-ink mb-4"
        >
          Join readers who ship
        </h2>
        <p className="font-body text-body-mobile md:text-body text-accent-ink/80 mb-8">
          A private community of AI builders, operators, and curious learners. Free to join.
        </p>
        <a
          href={externalLinks.community}
          target="_blank"
          rel="noopener noreferrer"
          className="inline-flex items-center justify-center h-12 px-6 font-body font-medium text-base text-accent-ink border border-accent-ink rounded hover:bg-accent-ink/10 transition-colors focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-accent-ink"
        >
          Join the community →
        </a>
      </div>
    </section>
  );
}
