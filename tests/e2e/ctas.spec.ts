import { test, expect, type Page } from "@playwright/test";

function mockSubscribeSuccess(page: Page) {
  return page.route("/api/subscribe", (route) => route.fulfill({ json: { ok: true } }));
}

test("top-nav subscribe button is visible above the fold", async ({ page }) => {
  await page.setViewportSize({ width: 1440, height: 900 });
  await page.goto("/");
  const ctaLink = page.locator("header").getByRole("link", { name: "Subscribe free" });
  await expect(ctaLink).toBeVisible();
  const box = await ctaLink.boundingBox();
  expect(box).not.toBeNull();
  expect(box!.y + box!.height).toBeLessThan(900);
});

test("clicking it brings the hero form input into the viewport", async ({ page }) => {
  await page.setViewportSize({ width: 1440, height: 900 });
  await page.goto("/");
  await page.locator("header").getByRole("link", { name: "Subscribe free" }).click();
  await expect(page.locator("#subscribe-hero-input")).toBeInViewport();
});

test("submit is disabled when input is empty, enabled when valid", async ({ page }) => {
  await page.goto("/");
  const input = page.locator("#subscribe-hero-input");
  const submitBtn = page
    .locator("form#subscribe-hero")
    .getByRole("button", { name: /Subscribe free/ });

  // Empty: button is disabled
  await expect(submitBtn).toBeDisabled();

  // Valid email: button enabled
  await input.fill("test@example.com");
  await expect(submitBtn).toBeEnabled();

  // Cleared: disabled again
  await input.clear();
  await expect(submitBtn).toBeDisabled();
});

test("submitting an invalid email shows an inline error", async ({ page }) => {
  await page.goto("/");
  const input = page.locator("#subscribe-hero-input");
  await input.fill("notanemail");
  await page
    .locator("form#subscribe-hero")
    .getByRole("button", { name: /Subscribe free/ })
    .click();
  await expect(page.locator("#subscribe-hero-error")).toContainText(/doesn't look like/i);
});

test("submitting a valid email (mocked 200) replaces the form with a success state", async ({
  page,
}) => {
  await mockSubscribeSuccess(page);
  await page.goto("/");
  const input = page.locator("#subscribe-hero-input");
  await input.fill("test@example.com");
  await page
    .locator("form#subscribe-hero")
    .getByRole("button", { name: /Subscribe free/ })
    .click();
  await expect(page.locator("#subscribe-hero[role='status']")).toBeVisible();
  await expect(page.locator("#subscribe-hero")).toContainText(/You're in/);
});

test("newsletter offering card CTA scrolls to hero form", async ({ page }) => {
  await page.setViewportSize({ width: 1440, height: 900 });
  await page.goto("/");
  // The newsletter card CTA is "Subscribe free" linking to #subscribe-hero
  await page
    .locator("#newsletter")
    .getByRole("link", { name: /Subscribe free/ })
    .click();
  await expect(page.locator("#subscribe-hero-input")).toBeInViewport();
});

test("final CTA form submits successfully (mocked)", async ({ page }) => {
  await mockSubscribeSuccess(page);
  await page.goto("/");
  const input = page.locator("#subscribe-final-input");
  await input.fill("final@example.com");
  await page
    .locator("form#subscribe-final")
    .getByRole("button", { name: /Subscribe free/ })
    .click();
  await expect(page.locator("#subscribe-final[role='status']")).toBeVisible();
  await expect(page.locator("#subscribe-final")).toContainText(/You're in/);
});
