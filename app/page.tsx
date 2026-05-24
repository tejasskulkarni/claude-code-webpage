import Hero from "@/components/Hero";
import WhatYouGet from "@/components/WhatYouGet";
import LatestIssues from "@/components/LatestIssues";
import Offerings from "@/components/Offerings";
import About from "@/components/About";
import VideoSection from "@/components/VideoSection";
import Testimonials from "@/components/Testimonials";
import CommunityCTA from "@/components/CommunityCTA";
import FAQ from "@/components/FAQ";

export default function Home() {
  return (
    <main id="main" className="bg-paper">
      <Hero />
      <WhatYouGet />
      <LatestIssues />
      <Offerings />
      <About />
      <VideoSection />
      <Testimonials />
      <CommunityCTA />
      <FAQ />
    </main>
  );
}
