import { externalLinks } from "@/lib/nav";
import Button from "@/components/ui/Button";
import OfferingTracker from "@/components/ui/OfferingTracker";

const offerings = [
  {
    num: "01",
    id: "newsletter",
    title: "The daily AI digest.",
    description:
      "Every weekday morning: the three or four things that actually moved in AI overnight. Takes five minutes. Free forever.",
    cta: (
      <Button as="a" href="#subscribe-hero" variant="primary" size="md">
        Subscribe free
      </Button>
    ),
    tracking: "newsletter" as const,
  },
  {
    num: "02",
    id: "courses",
    title: "Free, project-based AI courses.",
    description:
      "Hands-on courses that teach you to build with AI tools — from prompt engineering to RAG pipelines. No paywalls.",
    cta: (
      <OfferingTracker offering="courses" href={externalLinks.courses}>
        Browse courses →
      </OfferingTracker>
    ),
    tracking: "courses" as const,
  },
  {
    num: "03",
    id: "referrals",
    title: "Warm intros to AI roles.",
    description:
      "Fill out the form, describe your background. When there's a fit with a hiring manager I trust, I make a warm intro — no fees, no recruiters.",
    cta: (
      <OfferingTracker offering="referrals" href={externalLinks.referrals}>
        Get referred →
      </OfferingTracker>
    ),
    tracking: "referrals" as const,
  },
] as const;

export default function Offerings() {
  return (
    <section
      id="offerings"
      aria-labelledby="section-offerings"
      className="py-section-mobile md:py-section px-4 md:px-8 max-w-7xl mx-auto"
    >
      <h2
        id="section-offerings"
        className="font-display font-semibold text-h2-mobile md:text-h2 text-ink mb-12"
      >
        Three things, all free
      </h2>

      <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
        {offerings.map(({ num, id, title, description, cta }) => (
          <div key={id} id={id} className="flex flex-col border border-ink p-6 md:p-8">
            <span className="font-mono text-mono text-ink-muted mb-4">{num}</span>
            <h3 className="font-display font-semibold text-h3-mobile text-ink mb-3">{title}</h3>
            <p className="font-body text-body-mobile text-ink-muted mb-6 flex-1">{description}</p>
            <div>{cta}</div>
          </div>
        ))}
      </div>
    </section>
  );
}
