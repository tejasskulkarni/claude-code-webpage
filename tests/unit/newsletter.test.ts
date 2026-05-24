import { describe, it, expect, vi, beforeEach, afterEach } from "vitest";
import { subscribeToNewsletter } from "@/lib/newsletter";

describe("subscribeToNewsletter", () => {
  beforeEach(() => {
    vi.stubGlobal("fetch", vi.fn());
    process.env["CONVERTKIT_API_KEY"] = "test-key";
    process.env["CONVERTKIT_FORM_ID"] = "12345";
  });

  afterEach(() => {
    vi.unstubAllGlobals();
    delete process.env["CONVERTKIT_API_KEY"];
    delete process.env["CONVERTKIT_FORM_ID"];
  });

  it("resolves with { ok: true } on successful subscribe", async () => {
    vi.mocked(fetch).mockResolvedValueOnce(
      new Response(JSON.stringify({ subscription: {} }), { status: 200 }),
    );
    const result = await subscribeToNewsletter("tejas@example.com");
    expect(result.ok).toBe(true);
  });

  it("resolves with { ok: false, reason: 'provider_rejected' } on ConvertKit 4xx", async () => {
    vi.mocked(fetch).mockResolvedValueOnce(
      new Response(JSON.stringify({ error: "bad" }), { status: 400 }),
    );
    const result = await subscribeToNewsletter("tejas@example.com");
    expect(result.ok).toBe(false);
    if (!result.ok) expect(result.reason).toBe("provider_rejected");
  });

  it("resolves with { ok: false, reason: 'network' } on network error", async () => {
    vi.mocked(fetch).mockRejectedValueOnce(new Error("network failure"));
    const result = await subscribeToNewsletter("tejas@example.com");
    expect(result.ok).toBe(false);
    if (!result.ok) expect(result.reason).toBe("network");
  });

  it("resolves with { ok: false, reason: 'misconfigured' } when no API key", async () => {
    delete process.env["CONVERTKIT_API_KEY"];
    const result = await subscribeToNewsletter("tejas@example.com");
    expect(result.ok).toBe(false);
    if (!result.ok) expect(result.reason).toBe("misconfigured");
  });
});
