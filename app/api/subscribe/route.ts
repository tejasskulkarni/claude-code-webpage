import { NextRequest, NextResponse } from "next/server";
import { validateSubscribe } from "@/lib/validation";
import { subscribeToNewsletter } from "@/lib/newsletter";

export const runtime = "edge";

// Simple token-bucket rate limiter: 5 requests per 60 seconds per IP
const RATE_LIMIT = 5;
const WINDOW_MS = 60_000;
const ipBuckets = new Map<string, { count: number; resetAt: number }>();

function checkRateLimit(ip: string): boolean {
  const now = Date.now();
  const bucket = ipBuckets.get(ip);

  if (!bucket || now >= bucket.resetAt) {
    ipBuckets.set(ip, { count: 1, resetAt: now + WINDOW_MS });
    return true;
  }

  if (bucket.count >= RATE_LIMIT) {
    return false;
  }

  bucket.count++;
  return true;
}

export async function POST(request: NextRequest): Promise<NextResponse> {
  const ip =
    request.headers.get("x-forwarded-for") ?? request.headers.get("x-real-ip") ?? "unknown";

  if (!checkRateLimit(ip)) {
    return NextResponse.json({ ok: false, reason: "rate_limited" }, { status: 429 });
  }

  let body: unknown;
  try {
    body = await request.json();
  } catch {
    return NextResponse.json({ ok: false, reason: "invalid_body" }, { status: 400 });
  }

  const { email, honeypot } =
    typeof body === "object" && body !== null
      ? (body as { email?: string; honeypot?: string })
      : {};

  const validation = validateSubscribe({
    email: typeof email === "string" ? email : "",
    honeypot: typeof honeypot === "string" ? honeypot : "",
  });

  if (!validation.ok) {
    // Silent drop for honeypot — deceive bots
    if (validation.reason === "honeypot") {
      return NextResponse.json({ ok: true }, { status: 200 });
    }
    return NextResponse.json({ ok: false, reason: validation.reason }, { status: 400 });
  }

  const outcome = await subscribeToNewsletter(validation.email);

  if (!outcome.ok) {
    return NextResponse.json({ ok: false, reason: outcome.reason }, { status: 502 });
  }

  return NextResponse.json({ ok: true }, { status: 200 });
}
