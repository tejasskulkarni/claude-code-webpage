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
    title: "Google's new anything-to-anything AI model is wild",
    summary:
      "Gemini Omni goes hands-on: multimodal AI that blurs the line between real and generated video.",
    url: "https://www.theverge.com/tech/936507/gemini-omni-hands-on-deepfake-ai-video",
  },
  {
    number: 364,
    date: "2026-05-23",
    title:
      "WWDC 2026: Apple registers new 'gen AI' web domain as Siri gears up for its biggest upgrade in years",
    summary:
      "Apple signals its biggest Siri overhaul yet ahead of WWDC 2026 with a new generative AI domain.",
    url: "https://www.livemint.com/technology/tech-news/wwdc-2026-apple-registers-new-gen-ai-web-domain-as-siri-gears-up-for-its-biggest-upgrade-in-years-11779584057825.html",
  },
  {
    number: 363,
    date: "2026-05-22",
    title: "We tried Google's AI glasses and they're almost there",
    summary:
      "Google's Android XR glasses overlay AI translation, navigation, and widgets directly into your view.",
    url: "https://techcrunch.com/2026/05/22/we-tried-googles-ai-glasses-and-theyre-almost-there/",
  },
];
