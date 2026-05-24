import { testimonials } from "@/lib/testimonials";

export default function Testimonials() {
  return (
    <section id="readers" aria-labelledby="section-readers" className="bg-white/[0.02]">
      <div className="py-section-mobile md:py-section px-4 md:px-8 max-w-7xl mx-auto">
        <h2
          id="section-readers"
          className="font-display font-semibold text-h2-mobile md:text-h2 text-ink mb-10"
        >
          What readers say
        </h2>

        {/* Desktop: 3-column grid; Mobile: horizontal scroll-snap carousel */}
        <div className="flex md:grid md:grid-cols-3 gap-6 overflow-x-auto snap-x snap-mandatory scroll-smooth pb-4 md:overflow-visible md:pb-0 -mx-4 px-4 md:mx-0 md:px-0">
          {testimonials.map((t) => (
            <article
              key={t.name}
              className="flex-shrink-0 w-[80vw] sm:w-[70vw] md:w-auto snap-center bg-white/[0.04] border border-ink/10 rounded-2xl p-6 md:p-8 flex flex-col"
            >
              <span
                className="font-display text-[4rem] leading-none text-accent mb-4 select-none"
                aria-hidden="true"
              >
                &ldquo;
              </span>
              <blockquote className="font-display text-h3-mobile text-ink mb-6 flex-1">
                {t.quote}
              </blockquote>
              <footer>
                <p className="font-body font-semibold text-sm text-ink">{t.name}</p>
                <p className="font-mono text-mono text-ink-muted">{t.role}</p>
              </footer>
            </article>
          ))}
        </div>
      </div>
    </section>
  );
}
