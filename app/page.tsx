import Hero from "@/components/Hero";
import WhatYouGet from "@/components/WhatYouGet";
import LatestIssues from "@/components/LatestIssues";
import Offerings from "@/components/Offerings";
import About from "@/components/About";
import VideoSection from "@/components/VideoSection";
import Testimonials from "@/components/Testimonials";
import CommunityCTA from "@/components/CommunityCTA";
import FAQ from "@/components/FAQ";
import SectionDivider from "@/components/SectionDivider";

export default function Home() {
  return (
    <main id="main" className="bg-paper">
      <Hero />
      <SectionDivider />
      <WhatYouGet />
      <SectionDivider />
      <LatestIssues />
      <SectionDivider />
      <Offerings />
      <SectionDivider />
      <About />
      <SectionDivider />
      <VideoSection />
      <SectionDivider />
      <Testimonials />
      <SectionDivider />
      <CommunityCTA />
      <SectionDivider />
      <FAQ />
      <SectionDivider />
    </main>
  );
}
