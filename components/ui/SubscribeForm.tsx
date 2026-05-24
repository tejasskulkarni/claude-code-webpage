"use client"; // state, effects, and browser fetch

import { useState, useId } from "react";
import type { SubscribeOutcome } from "@/lib/newsletter";
import { analytics } from "@/lib/analytics";
import Button from "./Button";

async function defaultSubmit(email: string): Promise<SubscribeOutcome> {
  try {
    const res = await fetch("/api/subscribe", {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({ email, honeypot: "" }),
    });
    const data = (await res.json()) as SubscribeOutcome;
    return data;
  } catch {
    return { ok: false, reason: "network" };
  }
}

interface SubscribeFormProps {
  id: string;
  variant: "hero" | "final";
  onSubmit?: (email: string) => Promise<SubscribeOutcome>;
}

export default function SubscribeForm({
  id,
  variant,
  onSubmit = defaultSubmit,
}: SubscribeFormProps) {
  const [email, setEmail] = useState("");
  const [honeypot, setHoneypot] = useState("");
  const [error, setError] = useState("");
  const [pending, setPending] = useState(false);
  const [success, setSuccess] = useState(false);
  const uniqueId = useId();
  const helpId = `${id}-help`;
  const errorId = `${id}-error`;
  const labelId = `${id}-label-${uniqueId}`;

  async function handleSubmit(e: React.FormEvent) {
    e.preventDefault();

    const trimmed = email.trim();
    if (!trimmed) {
      setError("Enter your email.");
      return;
    }
    if (!/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(trimmed)) {
      setError("That doesn't look like an email.");
      return;
    }

    setError("");
    setPending(true);
    analytics.subscribeSubmitted();

    try {
      const result = await onSubmit(trimmed);
      if (result.ok) {
        analytics.subscribeSucceeded();
        setSuccess(true);
      } else {
        analytics.subscribeFailed(result.reason);
        setError("Something went wrong on our end. Try again?");
      }
    } finally {
      setPending(false);
    }
  }

  if (success) {
    return (
      <div role="status" className="text-center py-4">
        <p className="font-body text-body-mobile md:text-body text-ink">
          You&apos;re in. Check your inbox for the confirmation.
        </p>
      </div>
    );
  }

  return (
    <form onSubmit={handleSubmit} noValidate>
      {/* Honeypot — off-screen, aria-hidden, tabindex -1 to trap bots */}
      <input
        name="website"
        type="text"
        value={honeypot}
        onChange={(e) => setHoneypot(e.target.value)}
        aria-hidden="true"
        tabIndex={-1}
        className="sr-only absolute"
        autoComplete="off"
      />

      <div
        className={`flex gap-2 ${variant === "hero" ? "flex-col sm:flex-row" : "flex-col sm:flex-row"}`}
      >
        <div className="flex-1">
          <label id={labelId} htmlFor={`${id}-input`} className="sr-only">
            Email address
          </label>
          <input
            id={`${id}-input`}
            type="email"
            inputMode="email"
            autoComplete="email"
            required
            value={email}
            onChange={(e) => {
              setEmail(e.target.value);
              if (error) setError("");
            }}
            aria-describedby={`${helpId} ${errorId}`}
            aria-labelledby={labelId}
            placeholder="you@example.com"
            className="w-full h-12 px-4 border border-ink font-body text-sm bg-paper text-ink placeholder:text-ink-muted focus:outline-none focus:ring-2 focus:ring-accent focus:border-accent rounded"
          />
        </div>
        <Button
          type="submit"
          variant="primary"
          size="md"
          disabled={pending}
          className={variant === "hero" ? "sm:w-auto w-full" : "sm:w-auto w-full"}
        >
          {pending ? "Subscribing…" : "Subscribe free"}
        </Button>
      </div>

      <p id={helpId} className="mt-2 font-body text-small text-ink-muted">
        Join 12,000+ readers. Unsubscribe anytime.
      </p>
      <p id={errorId} aria-live="polite" className="mt-1 font-body text-small text-accent">
        {error}
      </p>
    </form>
  );
}
