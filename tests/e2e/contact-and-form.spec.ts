import { test, expect } from "@playwright/test";

test("footer contact link is a valid mailto: URL", async ({ page }) => {
  await page.goto("/");
  const mailtoLink = page.locator('footer a[href^="mailto:"]');
  await expect(mailtoLink).toBeVisible();
  const href = await mailtoLink.getAttribute("href");
  expect(href).toMatch(/^mailto:.+@.+\..+/);
});

test("subscribe form rejects empty submissions", async ({ page }) => {
  await page.goto("/");
  // Button is disabled when empty — try submitting via form submit event directly
  const form = page.locator("form#subscribe-hero");
  await form.evaluate((f) => (f as HTMLFormElement).requestSubmit());
  await expect(page.locator("#subscribe-hero-error")).toContainText(/Enter your email/i);
});

test("subscribe form rejects malformed emails", async ({ page }) => {
  await page.goto("/");
  await page.locator("#subscribe-hero-input").fill("notanemail");
  await page
    .locator("form#subscribe-hero")
    .getByRole("button", { name: /Subscribe free/ })
    .click();
  await expect(page.locator("#subscribe-hero-error")).toContainText(/doesn't look like/i);
});

test("subscribe form rejects disposable-domain emails (mailinator.com)", async ({ page }) => {
  // Mock server to return what the real API would for a disposable domain
  await page.route("/api/subscribe", (route) =>
    route.fulfill({ status: 400, json: { ok: false, reason: "disposable" } }),
  );
  await page.goto("/");
  await page.locator("#subscribe-hero-input").fill("test@mailinator.com");
  await page
    .locator("form#subscribe-hero")
    .getByRole("button", { name: /Subscribe free/ })
    .click();
  // Server returns error; UI shows generic error message
  await expect(page.locator("#subscribe-hero-error")).toContainText(/Something went wrong/i);
});

test("honeypot-filled submit is silently dropped (mocked: route asserts honeypot received, returns 200, UI shows success but provider not called — verify via route assertion)", async ({
  page,
}) => {
  let capturedBody: Record<string, unknown> | null = null;
  let routeHandled = false;

  await page.route("/api/subscribe", async (route) => {
    const body = route.request().postDataJSON() as Record<string, unknown>;
    capturedBody = body;
    routeHandled = true;
    // Return success to simulate the silent-drop (UI sees 200)
    await route.fulfill({ json: { ok: true } });
  });

  await page.goto("/");

  // Fill honeypot field via JS (it's aria-hidden so normal fill won't work)
  await page.evaluate(() => {
    const honeypot = document.querySelector<HTMLInputElement>('input[name="website"]');
    if (honeypot) {
      const nativeInputValueSetter = Object.getOwnPropertyDescriptor(
        window.HTMLInputElement.prototype,
        "value",
      )?.set;
      nativeInputValueSetter?.call(honeypot, "bot-value");
      honeypot.dispatchEvent(new Event("input", { bubbles: true }));
    }
  });

  await page.locator("#subscribe-hero-input").fill("test@example.com");
  await page
    .locator("form#subscribe-hero")
    .getByRole("button", { name: /Subscribe free/ })
    .click();

  // UI shows success (from mocked 200)
  await expect(page.locator("#subscribe-hero[role='status']")).toBeVisible();

  // Verify the route received the honeypot value
  expect(routeHandled).toBe(true);
  expect(capturedBody?.["honeypot"]).toBeTruthy();
});
