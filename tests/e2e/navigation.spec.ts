import { test, expect } from "@playwright/test";

const anchorLinks = [
  { label: "Newsletter", href: "#newsletter", targetId: "newsletter" },
  { label: "Courses", href: "#courses", targetId: "courses" },
  { label: "About", href: "#about", targetId: "about" },
  { label: "FAQ", href: "#faq", targetId: "faq" },
] as const;

test("all nav anchor links scroll to their target section and update the URL hash", async ({
  page,
}) => {
  await page.setViewportSize({ width: 1440, height: 900 });
  await page.goto("/");

  for (const { label, href, targetId } of anchorLinks) {
    await page
      .getByRole("navigation", { name: "Main navigation" })
      .getByRole("link", { name: label })
      .click();
    await expect(page).toHaveURL(new RegExp(href));
    await expect(page.locator(`#${targetId}`)).toBeInViewport({ ratio: 0.1 });
  }
});

test("skip-to-content link appears on first Tab and moves focus to <main>", async ({ page }) => {
  await page.goto("/");
  // Tab once to reveal skip link
  await page.keyboard.press("Tab");
  const skipLink = page.getByRole("link", { name: /skip/i });
  await expect(skipLink).toBeVisible();

  // Activate the skip link
  await page.keyboard.press("Enter");
  const mainId = await page.evaluate(() => document.activeElement?.id);
  expect(mainId).toBe("main");
});

test("browser back restores scroll position after anchor navigation", async ({ page }) => {
  await page.setViewportSize({ width: 1440, height: 900 });
  await page.goto("/");

  // Navigate to FAQ
  await page
    .getByRole("navigation", { name: "Main navigation" })
    .getByRole("link", { name: "FAQ" })
    .click();
  await expect(page).toHaveURL("/#faq");
  const faqScrollY = await page.evaluate(() => window.scrollY);
  expect(faqScrollY).toBeGreaterThan(100);

  // Navigate to About
  await page
    .getByRole("navigation", { name: "Main navigation" })
    .getByRole("link", { name: "About" })
    .click();
  await expect(page).toHaveURL("/#about");

  // Go back
  await page.goBack();
  await expect(page).toHaveURL("/#faq");
  const restoredScrollY = await page.evaluate(() => window.scrollY);
  expect(Math.abs(restoredScrollY - faqScrollY)).toBeLessThan(100);
});
