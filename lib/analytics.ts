import { track } from "@vercel/analytics";

export const analytics = {
  subscribeSubmitted: () => track("subscribe_submitted"),
  subscribeSucceeded: () => track("subscribe_succeeded"),
  subscribeFailed: (reason: string) => track("subscribe_failed", { reason }),
  navLinkClicked: (section: string) => track("nav_link_clicked", { section }),
  videoVisible: () => track("video_visible"),
  videoPlay: () => track("video_play"),
  videoUnmute: () => track("video_unmute"),
  videoProgress: (pct: 25 | 50 | 75 | 100) => track("video_progress", { pct }),
  offeringClicked: (offering: "newsletter" | "courses" | "referrals") =>
    track("offering_clicked", { offering }),
  socialClicked: (platform: "instagram" | "x") => track("social_clicked", { platform }),
  faqOpened: (qid: string) => track("faq_opened", { qid }),
};
