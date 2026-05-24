"use client"; // analytics click tracking requires client context

import { analytics } from "@/lib/analytics";
import Button from "./Button";

interface OfferingTrackerProps {
  offering: "newsletter" | "courses" | "referrals";
  href: string;
  children: React.ReactNode;
}

export default function OfferingTracker({ offering, href, children }: OfferingTrackerProps) {
  return (
    <Button
      as="a"
      href={href}
      target="_blank"
      rel="noopener noreferrer"
      variant="secondary"
      size="md"
      onClick={() => analytics.offeringClicked(offering)}
    >
      {children}
    </Button>
  );
}
