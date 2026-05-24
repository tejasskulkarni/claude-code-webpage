import Image from "next/image";
import Reveal from "@/components/ui/Reveal";
import Button from "@/components/ui/Button";
import { stats } from "@/lib/stats";

const statsList = [
  { value: stats.subscribers, label: "readers" },
  { value: stats.issuesShipped, label: "issues shipped" },
  { value: stats.freeLessons, label: "free lessons" },
  { value: stats.referralsMade, label: "referrals made" },
] as const;

export default function About() {
  return (
    <section id="about" aria-labelledby="section-about" className="bg-white/[0.02]">
      <div className="py-section-mobile md:py-section px-4 md:px-8 max-w-7xl mx-auto">
        <div className="grid grid-cols-1 md:grid-cols-5 gap-12 md:gap-16 items-start">
          {/* Left: portrait (40%) */}
          <div className="md:col-span-2 relative aspect-[3/4] overflow-hidden rounded-sm hidden md:block">
            {/* TODO: replace with real portrait */}
            <Image
              src="/images/portrait-about.jpg"
              alt="Tejas Kulkarni"
              fill
              sizes="(max-width: 768px) 100vw, 40vw"
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

          {/* Right: copy (60%) */}
          <div className="md:col-span-3">
            <h2
              id="section-about"
              className="font-display font-semibold text-h2-mobile md:text-h2 text-ink mb-8"
            >
              Why I built AI Daily
            </h2>

            <div className="space-y-5 font-body text-body-mobile md:text-body text-ink-muted">
              <p>
                I&apos;m Tejas. I&apos;ve spent the last few years building with AI tools and
                writing about what works.
              </p>
              <p>
                Every morning I read roughly a hundred sources — papers, release notes, Discords,
                GitHub discussions, X threads. Most of it is noise. Some of it is the news your
                product, your team, or your career depends on.
              </p>
              <p>
                AI Daily is the filter. Five minutes, every weekday, of what actually matters and
                why.
              </p>
              <p>
                It&apos;s free because it should be. The courses and referrals are free for the same
                reason. If that&apos;s useful to you, the form&apos;s right down here ↓
              </p>
            </div>

            <div className="mt-6">
              <Button as="a" href="#subscribe-hero" variant="tertiary" size="md">
                Subscribe free →
              </Button>
            </div>

            {/* Stats row */}
            <Reveal className="mt-10 grid grid-cols-2 sm:grid-cols-4 gap-6 pt-8 border-t border-ink/20">
              {statsList.map(({ value, label }) => (
                <div key={label}>
                  <span className="font-display font-semibold text-h2-mobile md:text-h3 text-ink block">
                    {value}
                  </span>
                  <span className="font-mono text-mono text-ink-muted">{label}</span>
                </div>
              ))}
            </Reveal>
          </div>
        </div>
      </div>
    </section>
  );
}
