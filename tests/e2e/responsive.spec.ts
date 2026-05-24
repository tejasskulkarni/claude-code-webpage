import { test, expect } from "@playwright/test";

test("renders at 375x812 (mobile)", async ({ page }) => {
  await page.setViewportSize({ width: 375, height: 812 });
  await page.goto("/");
  await expect(page.locator("h1")).toBeVisible();
  await expect(page).toHaveScreenshot("above-fold-375x812.png", {
    clip: { x: 0, y: 0, width: 375, height: 812 },
    mask: [page.locator("video")],
  });
});

test("renders at 768x1024 (tablet)", async ({ page }) => {
  await page.setViewportSize({ width: 768, height: 1024 });
  await page.goto("/");
  await expect(page.locator("h1")).toBeVisible();
  await expect(page).toHaveScreenshot("above-fold-768x1024.png", {
    clip: { x: 0, y: 0, width: 768, height: 1024 },
    mask: [page.locator("video")],
  });
});

test("renders at 1440x900 (desktop)", async ({ page }) => {
  await page.setViewportSize({ width: 1440, height: 900 });
  await page.goto("/");
  await expect(page.locator("h1")).toBeVisible();
  await expect(page).toHaveScreenshot("above-fold-1440x900.png", {
    clip: { x: 0, y: 0, width: 1440, height: 900 },
    mask: [page.locator("video")],
  });
});

test("hamburger visible below 768px, inline links above 1024px", async ({ page }) => {
  // Mobile: hamburger button visible, desktop nav hidden
  await page.setViewportSize({ width: 375, height: 812 });
  await page.goto("/");
  await expect(page.getByRole("button", { name: "Open navigation menu" })).toBeVisible();
  await expect(page.getByRole("navigation", { name: "Main navigation" })).not.toBeVisible();

  // Desktop: inline nav visible, hamburger hidden
  await page.setViewportSize({ width: 1440, height: 900 });
  await expect(page.getByRole("navigation", { name: "Main navigation" })).toBeVisible();
  await expect(page.getByRole("button", { name: "Open navigation menu" })).not.toBeVisible();
});

test("hero is two-column at desktop, stacked at mobile", async ({ page }) => {
  // Desktop: portrait column visible (lg:col-span-2 has "hidden lg:block")
  await page.setViewportSize({ width: 1440, height: 900 });
  await page.goto("/");
  await expect(page.locator(".lg\\:col-span-2").first()).toBeVisible();

  // Mobile: portrait column hidden
  await page.setViewportSize({ width: 375, height: 812 });
  await expect(page.locator(".lg\\:col-span-2").first()).not.toBeVisible();
});
