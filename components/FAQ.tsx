"use client"; // needs analytics tracking on FAQ open events

import { ChevronDown } from "lucide-react";
import { faq } from "@/lib/faq";
import { analytics } from "@/lib/analytics";

export default function FAQ() {
  return (
    <section
      id="faq"
      aria-labelledby="section-faq"
      className="py-section-mobile md:py-section px-4 md:px-8 max-w-[720px] mx-auto"
    >
      <h2
        id="section-faq"
        className="font-display font-semibold text-h2-mobile md:text-h2 text-ink mb-10"
      >
        Questions, answered
      </h2>

      <div className="space-y-0 divide-y divide-ink/20">
        {faq.map((item, i) => (
          <details
            key={item.q}
            open={i === 0}
            className="group py-4"
            onToggle={(e) => {
              if ((e.currentTarget as HTMLDetailsElement).open) {
                analytics.faqOpened(String(i));
              }
            }}
          >
            <summary className="flex items-center justify-between cursor-pointer list-none gap-4 py-1 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-accent rounded">
              <h3 className="font-display font-semibold text-h3-mobile text-ink">{item.q}</h3>
              <ChevronDown
                size={20}
                className="flex-shrink-0 text-ink-muted transition-transform duration-200 group-open:rotate-180"
                aria-hidden="true"
              />
            </summary>
            <p className="mt-3 font-body text-body-mobile text-ink-muted pb-1">{item.a}</p>
          </details>
        ))}
      </div>
    </section>
  );
}
