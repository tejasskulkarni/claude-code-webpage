"use client"; // analytics onClick handlers on social links require client context

import Link from "next/link";
import { navLinks, socialLinks, externalLinks, contactEmail } from "@/lib/nav";
import { analytics } from "@/lib/analytics";

export function FinalCTA() {
  // Imported dynamically in Phase 4 once SubscribeForm exists
  // Rendered here as a placeholder until Phase 4
  return (
    <section
      id="final-cta"
      aria-labelledby="section-final-cta"
      className="py-section-mobile md:py-section px-4 md:px-8 max-w-3xl mx-auto text-center"
    >
      <h2 id="section-final-cta" className="font-display text-h2-mobile md:text-h2 text-ink mb-6">
        One last thing — get tomorrow&apos;s issue
      </h2>
      {/* SubscribeForm rendered here in Phase 4 */}
    </section>
  );
}

export default function Footer() {
  const year = new Date().getFullYear();

  return (
    <>
      <FinalCTA />
      <footer className="border-t border-ink bg-paper">
        <div className="mx-auto max-w-7xl px-4 md:px-8 py-12 md:py-16">
          <div className="grid grid-cols-1 md:grid-cols-3 gap-10 md:gap-8">
            {/* Column 1: Brand */}
            <div>
              <Link
                href="/"
                className="font-display font-semibold text-sm tracking-tight uppercase text-ink hover:opacity-75 transition-opacity"
              >
                Tejas Kulkarni
              </Link>
              <p className="mt-2 font-body text-small text-ink-muted">Daily AI news, decoded.</p>
              <p className="mt-4 font-body text-small text-ink-muted">© {year} Tejas Kulkarni</p>
            </div>

            {/* Column 2: Links */}
            <nav aria-label="Footer navigation">
              <ul className="space-y-3">
                {navLinks.map((link) => (
                  <li key={link.href}>
                    <a
                      href={link.href}
                      className="font-body text-sm text-ink hover:text-accent transition-colors"
                    >
                      {link.label}
                    </a>
                  </li>
                ))}
                <li>
                  <a
                    href={externalLinks.courses}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="font-body text-sm text-ink hover:text-accent transition-colors"
                  >
                    Courses
                  </a>
                </li>
                <li>
                  <a
                    href={externalLinks.referrals}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="font-body text-sm text-ink hover:text-accent transition-colors"
                  >
                    Referrals
                  </a>
                </li>
                <li>
                  <a
                    href={externalLinks.archive}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="font-body text-sm text-ink hover:text-accent transition-colors"
                  >
                    Archive
                  </a>
                </li>
              </ul>
            </nav>

            {/* Column 3: Social + Contact */}
            <div>
              <div className="flex items-center gap-4 mb-4">
                <a
                  href={socialLinks.instagram}
                  target="_blank"
                  rel="noopener noreferrer"
                  aria-label="Instagram"
                  className="text-ink hover:text-accent transition-colors"
                  onClick={() => analytics.socialClicked("instagram")}
                >
                  <svg
                    width="24"
                    height="24"
                    viewBox="0 0 24 24"
                    fill="none"
                    stroke="currentColor"
                    strokeWidth="2"
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    aria-hidden="true"
                  >
                    <rect width="20" height="20" x="2" y="2" rx="5" ry="5" />
                    <path d="M16 11.37A4 4 0 1 1 12.63 8 4 4 0 0 1 16 11.37z" />
                    <line x1="17.5" x2="17.51" y1="6.5" y2="6.5" />
                  </svg>
                </a>
                <a
                  href={socialLinks.x}
                  target="_blank"
                  rel="noopener noreferrer"
                  aria-label="X (Twitter)"
                  className="text-ink hover:text-accent transition-colors"
                  onClick={() => analytics.socialClicked("x")}
                >
                  <svg
                    width="24"
                    height="24"
                    viewBox="0 0 24 24"
                    fill="currentColor"
                    aria-hidden="true"
                  >
                    <path d="M18.244 2.25h3.308l-7.227 8.26 8.502 11.24H16.17l-4.714-6.231-5.401 6.231H2.746l7.73-8.835L1.254 2.25H8.08l4.253 5.622zm-1.161 17.52h1.833L7.084 4.126H5.117z" />
                  </svg>
                </a>
              </div>
              <a
                href={`mailto:${contactEmail}`}
                className="font-body text-sm text-ink hover:text-accent transition-colors"
              >
                {contactEmail}
              </a>
            </div>
          </div>

          {/* Bottom strip */}
          <div className="mt-10 pt-8 border-t border-ink/20 flex flex-wrap gap-4">
            <Link
              href="/privacy"
              className="font-body text-small text-ink-muted hover:text-accent transition-colors"
            >
              {/* TODO: privacy/terms pages */}
              Privacy
            </Link>
            <Link
              href="/terms"
              className="font-body text-small text-ink-muted hover:text-accent transition-colors"
            >
              {/* TODO: privacy/terms pages */}
              Terms
            </Link>
          </div>
        </div>
      </footer>
    </>
  );
}
