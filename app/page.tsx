import Hero from "@/components/Hero";
import WhatYouGet from "@/components/WhatYouGet";
import SectionDivider from "@/components/SectionDivider";

export default function Home() {
  return (
    <main id="main" className="bg-paper">
      <Hero />
      <SectionDivider />
      <WhatYouGet />
      <SectionDivider />
    </main>
  );
}
