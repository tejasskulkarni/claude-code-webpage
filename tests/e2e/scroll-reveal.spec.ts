import { test, expect, type Page } from "@playwright/test";

declare global {
  interface Window {
    __videoPlayCalled: boolean;
  }
}

/** Mocks HTMLVideoElement.play() to simulate successful playback and fire React event handlers. */
async function mockVideoPlayback(page: Page) {
  await page.addInitScript(() => {
    window.__videoPlayCalled = false;

    // Track paused state across the mocked prototype
    let _paused = true;

    // Override paused getter so video.paused returns false after play()
    Object.defineProperty(HTMLVideoElement.prototype, "paused", {
      get() {
        return _paused;
      },
      configurable: true,
    });

    // Override play to simulate playback without real video data
    HTMLVideoElement.prototype.play = function (this: HTMLVideoElement) {
      window.__videoPlayCalled = true;
      _paused = false;
      // Dispatch events React handlers listen to
      Promise.resolve().then(() => {
        this.dispatchEvent(new Event("canplay", { bubbles: true }));
        this.dispatchEvent(new Event("play", { bubbles: true }));
      });
      return Promise.resolve();
    };
  });
}

/** Scrolls so `ratio` (0-1) of the element with `selector` is visible in the viewport. */
async function scrollToRatio(page: Page, selector: string, ratio: number) {
  await page.evaluate(
    ({ sel, r }) => {
      const el = document.querySelector(sel);
      if (!el) return;
      const rect = el.getBoundingClientRect();
      const targetScroll = window.scrollY + rect.top - window.innerHeight + rect.height * r;
      window.scrollTo({ top: Math.max(0, targetScroll), behavior: "instant" });
    },
    { sel: selector, r: ratio },
  );
  // Allow IntersectionObserver to fire
  await page.waitForTimeout(100);
}

test("video section starts with opacity 0 and is below the fold", async ({ page }) => {
  await page.setViewportSize({ width: 1440, height: 900 });
  await page.goto("/");
  const videoSection = page.locator("#tour");

  // Check initial opacity class: should have opacity-0
  const hasOpacity0 = await videoSection.evaluate((el) => el.classList.contains("opacity-0"));
  expect(hasOpacity0).toBe(true);

  // Check it's below the viewport
  const box = await videoSection.boundingBox();
  const viewport = page.viewportSize()!;
  expect(box!.y).toBeGreaterThan(viewport.height);
});

test("scrolling so 40% of section is in view triggers fade-in to opacity 1 within 1 second", async ({
  page,
}) => {
  await page.setViewportSize({ width: 1440, height: 900 });
  await page.goto("/");
  const videoSection = page.locator("#tour");

  await scrollToRatio(page, "#tour", 0.4);

  // CSS transition is 600ms; wait up to 1s for opacity-100 class
  await expect(videoSection).toHaveClass(/opacity-100/, { timeout: 1000 });
});

test("scrolling so 60% is in view triggers video.play() (video.paused becomes false)", async ({
  page,
}) => {
  await page.setViewportSize({ width: 1440, height: 900 });
  await mockVideoPlayback(page);
  await page.goto("/");

  await scrollToRatio(page, "#tour", 0.6);

  // play() should have been called
  await expect
    .poll(() => page.evaluate(() => window.__videoPlayCalled), { timeout: 2000 })
    .toBe(true);

  // video.paused should be false
  const paused = await page.evaluate(() => document.querySelector("video")?.paused);
  expect(paused).toBe(false);
});

test("with prefers-reduced-motion: reduce, video does not autoplay and fade transition is skipped", async ({
  page,
}) => {
  await page.emulateMedia({ reducedMotion: "reduce" });
  await mockVideoPlayback(page);
  await page.setViewportSize({ width: 1440, height: 900 });
  await page.goto("/");

  await scrollToRatio(page, "#tour", 0.6);

  // Video should NOT have been asked to play
  const playCalled = await page.evaluate(() => window.__videoPlayCalled);
  expect(playCalled).toBe(false);

  // The section still becomes visible (opacity changes), but transition is ~0ms with reduced-motion
  const videoSection = page.locator("#tour");
  await expect(videoSection).toHaveClass(/opacity-100/, { timeout: 500 });
});

test("clicking the unmute pill sets video.muted to false and hides the pill", async ({ page }) => {
  await page.setViewportSize({ width: 1440, height: 900 });
  await mockVideoPlayback(page);
  await page.goto("/");

  // Scroll to trigger play (which makes the unmute pill appear)
  await scrollToRatio(page, "#tour", 0.6);

  // Wait for the unmute button to appear (showUnmute && muted && playing)
  const unmuteBtn = page.getByRole("button", { name: /Unmute/i });
  await expect(unmuteBtn).toBeVisible({ timeout: 2000 });

  // Click unmute
  await unmuteBtn.click();

  // Pill should be hidden
  await expect(unmuteBtn).not.toBeVisible();

  // Video muted should be false
  const muted = await page.evaluate(() => document.querySelector("video")?.muted);
  expect(muted).toBe(false);
});
