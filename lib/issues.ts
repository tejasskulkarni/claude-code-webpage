export type Issue = {
  number: number;
  date: string; // ISO yyyy-mm-dd
  title: string;
  summary: string; // ≤ 22 words
  url: string;
};

export const latestIssues: Issue[] = [
  {
    number: 365,
    date: "2026-05-24",
    title: "GPT-5 ships agentic tool-use, and what it changes for builders",
    summary:
      "OpenAI's new release reframes the integration layer. Here's what to retire from your stack and what to try this week.",
    url: "https://example.com/issues/365",
  },
  {
    number: 364,
    date: "2026-05-23",
    title: "Anthropic's new Claude memory: a cheat sheet",
    summary:
      "How persistent memory works, what it costs, and the prompt patterns that get the most out of it.",
    url: "https://example.com/issues/364",
  },
  {
    number: 363,
    date: "2026-05-22",
    title: "The open-source model that beat Gemini on math",
    summary:
      "A 70B model trained for $400k is topping leaderboards. We break down the training recipe and the catch.",
    url: "https://example.com/issues/363",
  },
];
