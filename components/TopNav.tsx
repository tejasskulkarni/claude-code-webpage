"use client"; // needs scroll state and mobile menu toggle

import { useState, useEffect, useRef } from "react";
import Link from "next/link";
import { Menu, X } from "lucide-react";
import { navLinks, socialLinks } from "@/lib/nav";
import { analytics } from "@/lib/analytics";
import Button from "@/components/ui/Button";

export default function TopNav() {
  const [scrolled, setScrolled] = useState(false);
  const [menuOpen, setMenuOpen] = useState(false);
  const menuRef = useRef<HTMLDivElement>(null);
  const openButtonRef = useRef<HTMLButtonElement>(null);

  useEffect(() => {
    const onScroll = () => setScrolled(window.scrollY > 8);
    window.addEventListener("scroll", onScroll, { passive: true });
    return () => window.removeEventListener("scroll", onScroll);
  }, []);

  // Trap focus inside mobile menu
  useEffect(() => {
    if (!menuOpen) return;
    const menu = menuRef.current;
    if (!menu) return;

    const focusable = menu.querySelectorAll<HTMLElement>(
      'a, button, [tabindex]:not([tabindex="-1"])',
    );
    const first = focusable[0];
    const last = focusable[focusable.length - 1];

    const handleKeyDown = (e: KeyboardEvent) => {
      if (e.key === "Escape") {
        setMenuOpen(false);
        openButtonRef.current?.focus();
      }
      if (e.key === "Tab") {
        if (e.shiftKey) {
          if (document.activeElement === first) {
            e.preventDefault();
            last?.focus();
          }
        } else {
          if (document.activeElement === last) {
            e.preventDefault();
            first?.focus();
          }
        }
      }
    };

    document.addEventListener("keydown", handleKeyDown);
    first?.focus();
    return () => document.removeEventListener("keydown", handleKeyDown);
  }, [menuOpen]);

  const closeMenu = () => setMenuOpen(false);

  return (
    <header
      className={`sticky top-0 z-40 h-16 w-full transition-all duration-200 bg-paper ${
        scrolled ? "backdrop-blur-sm border-b border-ink/10" : ""
      }`}
    >
      <div className="mx-auto max-w-7xl px-4 md:px-8 h-full flex items-center justify-between">
        {/* Wordmark */}
        <Link
          href="/"
          className="font-display font-semibold text-sm tracking-tight uppercase text-ink hover:opacity-75 transition-opacity"
        >
          Tejas Kulkarni
        </Link>

        {/* Desktop nav */}
        <nav className="hidden md:flex items-center gap-8" aria-label="Main navigation">
          {navLinks.map((link) => (
            <a
              key={link.href}
              href={link.href}
              className="font-body text-sm text-ink hover:text-accent transition-colors"
              onClick={() => analytics.navLinkClicked(link.href.replace("#", ""))}
            >
              {link.label}
            </a>
          ))}
        </nav>

        {/* Desktop CTA */}
        <div className="hidden md:block">
          <Button as="a" href="#subscribe-hero" variant="primary" size="sm">
            Subscribe free
          </Button>
        </div>

        {/* Mobile hamburger */}
        <button
          ref={openButtonRef}
          className="md:hidden p-2 text-ink"
          aria-label="Open navigation menu"
          aria-expanded={menuOpen}
          aria-controls="mobile-menu"
          onClick={() => setMenuOpen(true)}
        >
          <Menu size={24} aria-hidden="true" />
        </button>
      </div>

      {/* Mobile menu overlay */}
      {menuOpen && (
        <div
          id="mobile-menu"
          ref={menuRef}
          role="dialog"
          aria-label="Navigation menu"
          aria-modal="true"
          className="fixed inset-0 z-50 bg-paper flex flex-col px-6 py-6"
        >
          <div className="flex items-center justify-between mb-10">
            <Link
              href="/"
              className="font-display font-semibold text-sm tracking-tight uppercase text-ink"
              onClick={closeMenu}
            >
              Tejas Kulkarni
            </Link>
            <button className="p-2 text-ink" aria-label="Close navigation menu" onClick={closeMenu}>
              <X size={24} aria-hidden="true" />
            </button>
          </div>

          <nav className="flex flex-col gap-6" aria-label="Mobile navigation">
            {navLinks.map((link) => (
              <a
                key={link.href}
                href={link.href}
                className="font-display text-h3-mobile text-ink hover:text-accent transition-colors"
                onClick={() => {
                  analytics.navLinkClicked(link.href.replace("#", ""));
                  closeMenu();
                }}
              >
                {link.label}
              </a>
            ))}
          </nav>

          <div className="mt-auto flex items-center gap-4 pt-8">
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
            <Button
              as="a"
              href="#subscribe-hero"
              variant="primary"
              size="sm"
              className="ml-auto"
              onClick={closeMenu}
            >
              Subscribe free
            </Button>
          </div>
        </div>
      )}
    </header>
  );
}
