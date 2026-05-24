import { describe, it, expect } from "vitest";
import { validateSubscribe } from "@/lib/validation";

describe("validateSubscribe", () => {
  it("returns invalid with reason 'empty' for empty string", () => {
    const result = validateSubscribe({ email: "", honeypot: "" });
    expect(result.ok).toBe(false);
    if (!result.ok) expect(result.reason).toBe("empty");
  });

  it("returns invalid with reason 'malformed' for 'foo'", () => {
    const result = validateSubscribe({ email: "foo", honeypot: "" });
    expect(result.ok).toBe(false);
    if (!result.ok) expect(result.reason).toBe("malformed");
  });

  it("returns invalid with reason 'malformed' for 'foo@'", () => {
    const result = validateSubscribe({ email: "foo@", honeypot: "" });
    expect(result.ok).toBe(false);
    if (!result.ok) expect(result.reason).toBe("malformed");
  });

  it("returns invalid with reason 'malformed' for 'foo@bar'", () => {
    const result = validateSubscribe({ email: "foo@bar", honeypot: "" });
    expect(result.ok).toBe(false);
    if (!result.ok) expect(result.reason).toBe("malformed");
  });

  it("returns invalid with reason 'disposable' for x@mailinator.com", () => {
    const result = validateSubscribe({ email: "x@mailinator.com", honeypot: "" });
    expect(result.ok).toBe(false);
    if (!result.ok) expect(result.reason).toBe("disposable");
  });

  it("returns invalid with reason 'disposable' for x@tempmail.com", () => {
    const result = validateSubscribe({ email: "x@tempmail.com", honeypot: "" });
    expect(result.ok).toBe(false);
    if (!result.ok) expect(result.reason).toBe("disposable");
  });

  it("returns invalid with reason 'disposable' for x@guerrillamail.com", () => {
    const result = validateSubscribe({ email: "x@guerrillamail.com", honeypot: "" });
    expect(result.ok).toBe(false);
    if (!result.ok) expect(result.reason).toBe("disposable");
  });

  it("returns valid for tejas@example.com", () => {
    const result = validateSubscribe({ email: "tejas@example.com", honeypot: "" });
    expect(result.ok).toBe(true);
    if (result.ok) expect(result.email).toBe("tejas@example.com");
  });

  it("returns invalid with reason 'honeypot' when honeypot is non-empty", () => {
    const result = validateSubscribe({ email: "tejas@example.com", honeypot: "bot" });
    expect(result.ok).toBe(false);
    if (!result.ok) expect(result.reason).toBe("honeypot");
  });
});
