import { Hero } from "@/components/sections/Hero";
import { LogoBar } from "@/components/sections/LogoBar";
import { Problem } from "@/components/sections/Problem";
import { Solution } from "@/components/sections/Solution";
import { FeatureGrid } from "@/components/sections/FeatureGrid";
import { BuiltForTeams } from "@/components/sections/BuiltForTeams";
import { TheNumbers } from "@/components/sections/TheNumbers";
import { MidPageCta } from "@/components/sections/MidPageCta";
import { Faq } from "@/components/sections/Faq";
import { FounderNote } from "@/components/sections/FounderNote";
import { WhyNow } from "@/components/sections/WhyNow";
import { FinalCta } from "@/components/sections/FinalCta";

export default function Home() {
  return (
    <>
      <Hero />
      <FounderNote />
      <Problem />
      <Solution />
      <FeatureGrid />
      <BuiltForTeams />
      <TheNumbers />
      <MidPageCta />
      <Faq />
      <LogoBar />
      <WhyNow />
      <FinalCta />
    </>
  );
}
