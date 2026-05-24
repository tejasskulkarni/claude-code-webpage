export default function SkipLink() {
  return (
    <a
      href="#main"
      className="
        sr-only focus:not-sr-only focus:fixed focus:top-4 focus:left-4
        focus:z-50 focus:px-4 focus:py-2
        focus:bg-ink focus:text-accent-ink focus:font-body focus:text-sm
        focus:rounded focus:outline-none
      "
    >
      Skip to content
    </a>
  );
}
