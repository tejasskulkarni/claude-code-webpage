import Image from "next/image";
import SubscribeForm from "@/components/ui/SubscribeForm";

export default function Hero() {
  return (
    <section
      aria-labelledby="section-hero"
      className="relative min-h-[80vh] lg:min-h-screen flex items-center px-4 md:px-8 py-section-mobile md:py-section max-w-7xl mx-auto"
    >
      <div className="w-full grid grid-cols-1 lg:grid-cols-5 gap-12 lg:gap-16 items-center">
        {/* Left column — 60% (3/5) */}
        <div className="lg:col-span-3">
          <p className="font-mono text-mono text-ink-muted tracking-widest uppercase mb-4">
            AI News · Daily · Free
          </p>

          {/* The ONLY h1 on the page */}
          <h1
            id="section-hero"
            className="font-display font-semibold text-h1-mobile md:text-h1 text-ink leading-[1.05] mb-6"
          >
            The AI stack, decoded daily.
          </h1>

          <p className="font-body text-body-mobile md:text-body text-ink-muted mb-8 max-w-lg">
            News, announcements, and the tools that actually matter — sent to your inbox every
            morning by Tejas Kulkarni. Free, always.
          </p>

          <SubscribeForm id="subscribe-hero" variant="hero" />

          {/* Trust strip */}
          <div className="mt-6">
            <p className="font-mono text-small text-ink-muted uppercase tracking-wider">
              As read at
            </p>
          </div>
        </div>

        {/* Right column — 40% (2/5) */}
        <div className="lg:col-span-2 relative hidden lg:block">
          <div className="relative aspect-[4/5] w-full overflow-hidden rounded-sm">
            {/* TODO: replace with real portrait */}
            <Image
              src="/images/portrait-hero.jpg"
              alt="Tejas Kulkarni"
              fill
              priority
              fetchPriority="high"
              sizes="(max-width: 1024px) 100vw, 40vw"
              className="object-cover"
            />
            {/* Warm grain overlay */}
            <div
              className="absolute inset-0 pointer-events-none"
              style={{
                backgroundImage:
                  "url(\"data:image/svg+xml,%3Csvg viewBox='0 0 200 200' xmlns='http://www.w3.org/2000/svg'%3E%3Cfilter id='noise'%3E%3CfeTurbulence type='fractalNoise' baseFrequency='0.65' numOctaves='3' stitchTiles='stitch'/%3E%3C/filter%3E%3Crect width='100%25' height='100%25' filter='url(%23noise)' opacity='0.08'/%3E%3C/svg%3E\")",
                backgroundSize: "200px 200px",
              }}
            />
          </div>
        </div>
      </div>
    </section>
  );
}
