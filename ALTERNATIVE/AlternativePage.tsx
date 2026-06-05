import { AltNavbar } from "./components/AltNavbar";
import { AltHero } from "./sections/AltHero";
import { AltLogoBar } from "./sections/AltLogoBar";
import { AgentRoster } from "./sections/AgentRoster";
import { AltHowItWorks } from "./sections/AltHowItWorks";
import { AltPowerUps } from "./sections/AltPowerUps";
import { AltForTeams } from "./sections/AltForTeams";
import { AltNumbers } from "./sections/AltNumbers";
import { AltFaq } from "./sections/AltFaq";
import { AltFinalCta } from "./sections/AltFinalCta";
import { AltFooter } from "./sections/AltFooter";

export function AlternativePage() {
  return (
    <div className="alt-scope min-h-screen">
      <AltNavbar />
      <AltHero />
      <AltLogoBar />
      <AgentRoster />
      <AltHowItWorks />
      <AltPowerUps />
      <AltForTeams />
      <AltNumbers />
      <AltFaq />
      <AltFinalCta />
      <AltFooter />
    </div>
  );
}
