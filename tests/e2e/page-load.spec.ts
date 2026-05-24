import { test, expect } from "@playwright/test";

test("page returns 200 and renders the H1 within 3 seconds", async ({ page }) => {
  const start = Date.now();
  const response = await page.goto("/");
  expect(response?.status()).toBe(200);
  await expect(page.locator("h1")).toBeVisible();
  expect(Date.now() - start).toBeLessThan(3000);
});

test("document title matches the spec", async ({ page }) => {
  await page.goto("/");
  await expect(page).toHaveTitle(/AI Daily/);
});

test("meta description is present and matches", async ({ page }) => {
  await page.goto("/");
  const content = await page.locator('meta[name="description"]').getAttribute("content");
  expect(content).toBeTruthy();
  expect(content).toMatch(/AI/i);
});

test("no console errors at load", async ({ page }) => {
  const errors: string[] = [];
  page.on("console", (msg) => {
    if (msg.type() === "error") errors.push(msg.text());
  });
  await page.goto("/", { waitUntil: "networkidle" });
  // Filter placeholder image/video 404s which are expected in dev
  const critical = errors.filter(
    (e) =>
      !e.includes("/images/") &&
      !e.includes("/poster.jpg") &&
      !e.includes("/intro.") &&
      !e.includes("/captions.vtt") &&
      !e.includes("404"),
  );
  expect(critical).toHaveLength(0);
});
