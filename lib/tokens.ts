export const colors = {
  paper: "#FAF7F2",
  ink: "#111111",
  inkMuted: "#5A5A5A",
  accent: "#E54B2A",
  accentInk: "#FFFFFF",
  rule: "#111111",
} as const;

export const fonts = {
  display: "var(--font-fraunces)",
  body: "var(--font-inter)",
  mono: "var(--font-jetbrains)",
} as const;

export const type = {
  h1: { desktop: "72px", mobile: "40px", lineHeight: 1.05, weight: 600, family: "display" },
  h2: { desktop: "48px", mobile: "32px", lineHeight: 1.1, weight: 600, family: "display" },
  h3: { desktop: "28px", mobile: "22px", lineHeight: 1.2, weight: 600, family: "display" },
  body: { desktop: "18px", mobile: "16px", lineHeight: 1.55, weight: 400, family: "body" },
  small: { desktop: "14px", mobile: "14px", lineHeight: 1.5, weight: 400, family: "body" },
  mono: { desktop: "14px", mobile: "14px", lineHeight: 1.4, weight: 500, family: "mono" },
} as const;

export const space = { base: 8, sectionY: { desktop: 120, mobile: 72 } } as const;

export const motion = {
  ease: "cubic-bezier(0.16, 1, 0.3, 1)",
  reveal: { duration: 600, translateY: 24 },
  fade: { duration: 200 },
} as const;
