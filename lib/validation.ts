import { z } from "zod";

const DISPOSABLE_DOMAINS = new Set([
  "mailinator.com",
  "tempmail.com",
  "guerrillamail.com",
  "10minutemail.com",
  "discard.email",
]);

const emailSchema = z.string().email();

export type ValidationResult =
  | { ok: true; email: string }
  | { ok: false; reason: "empty" | "malformed" | "disposable" | "honeypot" };

export function validateSubscribe(input: { email: string; honeypot: string }): ValidationResult {
  if (input.honeypot.length > 0) {
    return { ok: false, reason: "honeypot" };
  }

  if (input.email.trim().length === 0) {
    return { ok: false, reason: "empty" };
  }

  const parsed = emailSchema.safeParse(input.email);
  if (!parsed.success) {
    return { ok: false, reason: "malformed" };
  }

  const domain = input.email.split("@")[1]?.toLowerCase() ?? "";
  if (DISPOSABLE_DOMAINS.has(domain)) {
    return { ok: false, reason: "disposable" };
  }

  return { ok: true, email: input.email };
}
