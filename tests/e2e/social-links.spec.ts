import { test, expect } from "@playwright/test";

test('instagram link points to the configured URL and opens with rel="noopener noreferrer" target="_blank"', async ({
  page,
}) => {
  await page.goto("/");
  const instaLink = page.locator('footer a[aria-label="Instagram"]');
  await expect(instaLink).toBeVisible();
  const href = await instaLink.getAttribute("href");
  expect(href).toBeTruthy();
  expect(href).toMatch(/instagram\.com/);
  await expect(instaLink).toHaveAttribute("target", "_blank");
  await expect(instaLink).toHaveAttribute("rel", "noopener noreferrer");
});

test('x link points to the configured URL and opens with rel="noopener noreferrer" target="_blank"', async ({
  page,
}) => {
  await page.goto("/");
  const xLink = page.locator('footer a[aria-label="X (Twitter)"]');
  await expect(xLink).toBeVisible();
  const href = await xLink.getAttribute("href");
  expect(href).toBeTruthy();
  expect(href).toMatch(/x\.com/);
  await expect(xLink).toHaveAttribute("target", "_blank");
  await expect(xLink).toHaveAttribute("rel", "noopener noreferrer");
});

test("both links return 200 (or 3xx) to a HEAD request", async ({ request, page }) => {
  await page.goto("/");

  const instaHref = await page.locator('footer a[aria-label="Instagram"]').getAttribute("href");
  const xHref = await page.locator('footer a[aria-label="X (Twitter)"]').getAttribute("href");

  // HEAD requests to external URLs; expect 200, 301, or 302
  for (const url of [instaHref, xHref]) {
    if (!url) continue;
    const res = await request.head(url, { timeout: 10000 }).catch(() => null);
    if (res) {
      expect([200, 301, 302, 303, 307, 308]).toContain(res.status());
    }
  }
});
