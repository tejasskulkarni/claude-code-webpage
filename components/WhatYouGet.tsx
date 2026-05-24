import { Newspaper, Sparkles, Briefcase } from "lucide-react";

const items = [
  {
    icon: Newspaper,
    label: "Daily digest",
    description:
      "Five minutes of what moved in AI overnight — models, tools, papers, and hiring. Nothing filler.",
  },
  {
    icon: Sparkles,
    label: "Tool spotlights",
    description:
      "A hands-on look at one AI tool each week: what it does, what it costs, and whether it's worth your time.",
  },
  {
    icon: Briefcase,
    label: "Job board",
    description:
      "Curated AI roles from companies I've vetted, plus warm referrals to hiring managers I know personally.",
  },
] as const;

export default function WhatYouGet() {
  return (
    <section
      id="what-you-get"
      aria-labelledby="section-what-you-get"
      className="py-section-mobile md:py-section px-4 md:px-8 max-w-7xl mx-auto"
    >
      <h2
        id="section-what-you-get"
        className="font-display font-semibold text-h2-mobile md:text-h2 text-ink mb-12"
      >
        What you get
      </h2>

      <div className="grid grid-cols-1 md:grid-cols-3 gap-8 md:gap-12">
        {items.map(({ icon: Icon, label, description }) => (
          <div key={label}>
            <Icon size={28} className="text-accent mb-4" aria-hidden="true" />
            <h3 className="font-display font-semibold text-h3-mobile text-ink mb-2">{label}</h3>
            <p className="font-body text-body-mobile text-ink-muted">{description}</p>
          </div>
        ))}
      </div>
    </section>
  );
}
