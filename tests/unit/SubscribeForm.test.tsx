import { describe, it, expect, vi, beforeEach } from "vitest";
import { render, screen, waitFor } from "@testing-library/react";
import userEvent from "@testing-library/user-event";
import SubscribeForm from "@/components/ui/SubscribeForm";
import type { SubscribeOutcome } from "@/lib/newsletter";

describe("SubscribeForm", () => {
  it("renders an email input with an associated label", () => {
    render(<SubscribeForm id="test-form" variant="hero" />);
    expect(screen.getByLabelText(/email/i)).toBeInTheDocument();
    expect(screen.getByRole("textbox", { name: /email/i })).toHaveAttribute("type", "email");
  });

  it("shows empty-email error on submit with empty input", async () => {
    const user = userEvent.setup();
    render(<SubscribeForm id="test-form" variant="hero" />);
    await user.click(screen.getByRole("button", { name: /subscribe/i }));
    expect(screen.getByText("Enter your email.")).toBeInTheDocument();
  });

  it("shows malformed error on submit with 'foo'", async () => {
    const user = userEvent.setup();
    render(<SubscribeForm id="test-form" variant="hero" />);
    await user.type(screen.getByRole("textbox"), "foo");
    await user.click(screen.getByRole("button", { name: /subscribe/i }));
    expect(screen.getByText("That doesn't look like an email.")).toBeInTheDocument();
  });

  it("calls onSubmit with email and shows pending state when valid", async () => {
    const user = userEvent.setup();
    let resolve!: (v: SubscribeOutcome) => void;
    const onSubmit = vi.fn(
      () =>
        new Promise<SubscribeOutcome>((res) => {
          resolve = res;
        }),
    );
    render(<SubscribeForm id="test-form" variant="hero" onSubmit={onSubmit} />);
    await user.type(screen.getByRole("textbox"), "x@example.com");
    await user.click(screen.getByRole("button", { name: /subscribe/i }));
    expect(onSubmit).toHaveBeenCalledWith("x@example.com");
    expect(screen.getByRole("button", { name: /subscribing/i })).toBeDisabled();
    resolve({ ok: true });
  });

  it("shows success state and removes form on ok:true", async () => {
    const user = userEvent.setup();
    const onSubmit = vi.fn(async (): Promise<SubscribeOutcome> => ({ ok: true }));
    render(<SubscribeForm id="test-form" variant="hero" onSubmit={onSubmit} />);
    await user.type(screen.getByRole("textbox"), "x@example.com");
    await user.click(screen.getByRole("button", { name: /subscribe/i }));
    await waitFor(() =>
      expect(
        screen.getByText(/You're in. Check your inbox for the confirmation./i),
      ).toBeInTheDocument(),
    );
    expect(screen.queryByRole("textbox")).not.toBeInTheDocument();
  });

  it("shows provider error inline and keeps form submittable on ok:false provider_rejected", async () => {
    const user = userEvent.setup();
    const onSubmit = vi.fn(
      async (): Promise<SubscribeOutcome> => ({ ok: false, reason: "provider_rejected" }),
    );
    render(<SubscribeForm id="test-form" variant="hero" onSubmit={onSubmit} />);
    await user.type(screen.getByRole("textbox"), "x@example.com");
    await user.click(screen.getByRole("button", { name: /subscribe/i }));
    await waitFor(() =>
      expect(screen.getByText(/Something went wrong on our end. Try again\?/i)).toBeInTheDocument(),
    );
    expect(screen.getByRole("button", { name: /subscribe/i })).not.toBeDisabled();
  });

  it("honeypot input is aria-hidden, tabindex -1, and off-screen", () => {
    render(<SubscribeForm id="test-form" variant="hero" />);
    const honeypot = document.querySelector('input[name="website"]') as HTMLInputElement;
    expect(honeypot).toBeTruthy();
    expect(honeypot.getAttribute("aria-hidden")).toBe("true");
    expect(honeypot.getAttribute("tabindex")).toBe("-1");
    // off-screen via sr-only or absolute positioning
    const cls = honeypot.className;
    expect(cls.includes("sr-only") || cls.includes("absolute")).toBe(true);
  });
});
