import Link from "next/link";
import type { Metadata } from "next";

export const metadata: Metadata = {
  title: "Terms of Service — AI Daily",
  robots: { index: false, follow: false },
};

export default function TermsPage() {
  return (
    <main id="main" className="min-h-screen bg-paper px-4 md:px-8 py-section-mobile md:py-section">
      <div className="max-w-[720px] mx-auto">
        <p className="font-mono text-mono text-ink-muted tracking-widest uppercase mb-4">Legal</p>
        <h1 className="font-display font-semibold text-h1-mobile md:text-h2 text-ink mb-6">
          Terms of Service
        </h1>
        <p className="font-body text-body-mobile text-ink-muted mb-10">
          Coming soon. This page is a placeholder — the full terms of service will be published
          before launch.
        </p>
        <Link
          href="/"
          className="font-body text-sm text-accent underline hover:opacity-75 transition-opacity"
        >
          ← Back to home
        </Link>
      </div>
    </main>
  );
}
