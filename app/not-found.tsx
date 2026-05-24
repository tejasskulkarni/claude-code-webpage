import Link from "next/link";

export default function NotFound() {
  return (
    <main className="flex min-h-screen flex-col items-center justify-center bg-paper px-4 text-center">
      <p className="font-mono text-mono text-ink-muted mb-4">404</p>
      <h1 className="font-display text-h2-mobile md:text-h2 text-ink mb-4">Page not found</h1>
      <p className="font-body text-body-mobile md:text-body text-ink-muted mb-8 max-w-md">
        The page you&apos;re looking for doesn&apos;t exist or has been moved.
      </p>
      <Link
        href="/"
        className="font-body text-sm text-accent underline hover:opacity-75 transition-opacity"
      >
        ← Back to home
      </Link>
    </main>
  );
}
