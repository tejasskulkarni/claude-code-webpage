import type { Config } from "tailwindcss";
import { colors, fonts } from "./lib/tokens";

const config: Config = {
  content: ["./app/**/*.{ts,tsx}", "./components/**/*.{ts,tsx}", "./lib/**/*.{ts,tsx}"],
  theme: {
    extend: {
      colors: {
        paper: colors.paper,
        ink: colors.ink,
        "ink-muted": colors.inkMuted,
        accent: colors.accent,
        "accent-ink": colors.accentInk,
        rule: colors.rule,
      },
      fontFamily: {
        display: [fonts.display, "serif"],
        body: [fonts.body, "sans-serif"],
        mono: [fonts.mono, "monospace"],
      },
      fontSize: {
        h1: ["72px", { lineHeight: "1.05" }],
        "h1-mobile": ["40px", { lineHeight: "1.05" }],
        h2: ["48px", { lineHeight: "1.1" }],
        "h2-mobile": ["32px", { lineHeight: "1.1" }],
        h3: ["28px", { lineHeight: "1.2" }],
        "h3-mobile": ["22px", { lineHeight: "1.2" }],
        body: ["18px", { lineHeight: "1.55" }],
        "body-mobile": ["16px", { lineHeight: "1.55" }],
        small: ["14px", { lineHeight: "1.5" }],
        mono: ["14px", { lineHeight: "1.4" }],
      },
      spacing: {
        section: "120px",
        "section-mobile": "72px",
      },
    },
  },
  plugins: [],
};

export default config;
