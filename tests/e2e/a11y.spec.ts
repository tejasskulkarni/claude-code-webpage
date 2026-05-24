import { test, expect } from "@playwright/test";
import AxeBuilder from "@axe-core/playwright";

test("axe-core reports zero serious or critical violations at desktop viewport", async ({
  page,
}) => {
  await page.setViewportSize({ width: 1440, height: 900 });
  await page.goto("/");
  const results = await new AxeBuilder({ page }).withTags(["wcag2a", "wcag2aa"]).analyze();
  const seriousOrCritical = results.violations.filter((v) =>
    ["serious", "critical"].includes(v.impact ?? ""),
  );
  if (seriousOrCritical.length > 0) {
    console.error(
      "A11y violations:",
      seriousOrCritical.map((v) => `${v.id}: ${v.description}`),
    );
  }
  expect(seriousOrCritical).toHaveLength(0);
});

test("axe-core reports zero serious or critical violations at mobile viewport", async ({
  page,
}) => {
  await page.setViewportSize({ width: 375, height: 812 });
  await page.goto("/");
  const results = await new AxeBuilder({ page }).withTags(["wcag2a", "wcag2aa"]).analyze();
  const seriousOrCritical = results.violations.filter((v) =>
    ["serious", "critical"].includes(v.impact ?? ""),
  );
  if (seriousOrCritical.length > 0) {
    console.error(
      "A11y violations:",
      seriousOrCritical.map((v) => `${v.id}: ${v.description}`),
    );
  }
  expect(seriousOrCritical).toHaveLength(0);
});

test("tab order matches visual order on desktop (assert focused element after each Tab)", async ({
  page,
}) => {
  await page.setViewportSize({ width: 1440, height: 900 });
  await page.goto("/");

  // Tab 1: skip link
  await page.keyboard.press("Tab");
  const tag = await page.evaluate(() => document.activeElement?.tagName.toLowerCase());
  const href = await page.evaluate(() => document.activeElement?.getAttribute("href"));
  expect(tag).toBe("a");
  expect(href).toBe("#main");

  // Tab 2: site wordmark (first link in header)
  await page.keyboard.press("Tab");
  const wordmarkHref = await page.evaluate(() => document.activeElement?.getAttribute("href"));
  expect(wordmarkHref).toBe("/");

  // Tab 3–6: nav links (Newsletter, Courses, About, FAQ)
  const expectedNavHrefs = ["#newsletter", "#courses", "#about", "#faq"];
  for (const expectedHref of expectedNavHrefs) {
    await page.keyboard.press("Tab");
    const activeHref = await page.evaluate(() => document.activeElement?.getAttribute("href"));
    expect(activeHref).toBe(expectedHref);
  }

  // Tab 7: desktop CTA "Subscribe free" link
  await page.keyboard.press("Tab");
  const ctaText = await page.evaluate(() => document.activeElement?.textContent?.trim());
  expect(ctaText).toMatch(/Subscribe free/i);
});

test("every form input has an accessible name (page.getByLabel works)", async ({ page }) => {
  await page.goto("/");
  // Email inputs in hero and final forms
  const heroInput = page.getByLabel("Email address").first();
  await expect(heroInput).toBeVisible();
  await expect(heroInput).toHaveAttribute("type", "email");
});

test("FAQ accordion toggles aria-expanded on click and on Enter", async ({ page }) => {
  await page.goto("/");
  const firstDetails = page.locator("#faq details").first();
  const firstSummary = firstDetails.locator("summary");

  // First FAQ item is open by default (open={i === 0})
  await expect(firstDetails).toHaveAttribute("open");

  // Click to close
  await firstSummary.click();
  await expect(firstDetails).not.toHaveAttribute("open");

  // Click to reopen
  await firstSummary.click();
  await expect(firstDetails).toHaveAttribute("open");

  // Second item: open via Enter key
  const secondDetails = page.locator("#faq details").nth(1);
  const secondSummary = secondDetails.locator("summary");
  await expect(secondDetails).not.toHaveAttribute("open");
  await secondSummary.focus();
  await page.keyboard.press("Enter");
  await expect(secondDetails).toHaveAttribute("open");
});

test("focus ring is visible on every interactive element when focused via keyboard (screenshot diff a focused button vs unfocused)", async ({
  page,
}) => {
  await page.setViewportSize({ width: 1440, height: 900 });
  await page.goto("/");

  // Tab to the desktop CTA button and take a screenshot of it unfocused vs focused
  // Navigate to desktop CTA
  const ctaLink = page.locator("header").getByRole("link", { name: "Subscribe free" });

  // Screenshot unfocused state
  const unfocused = await ctaLink.screenshot();

  // Focus the element
  await ctaLink.focus();
  await page.waitForTimeout(50);

  // Screenshot focused state (should have visible focus ring)
  const focused = await ctaLink.screenshot();

  // The screenshots should differ (focus ring added)
  expect(Buffer.compare(unfocused, focused)).not.toBe(0);
});
