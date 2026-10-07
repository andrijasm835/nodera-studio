import { Navigation } from "@/components/navigation/Navigation";
import { AboutScene } from "@/components/scenes/AboutScene";
import { ContactScene } from "@/components/scenes/ContactScene";
import { ExistingSiteScene } from "@/components/scenes/ExistingSiteScene";
import { HeroScene } from "@/components/scenes/HeroScene";
import { ServicesScene } from "@/components/scenes/ServicesScene";
import { WorkScene } from "@/components/scenes/WorkScene";

export function StudioExperience() {
  return (
    <main>
      <Navigation />
      <HeroScene />
      <ServicesScene />
      <WorkScene />
      <ExistingSiteScene />
      <AboutScene />
      <ContactScene />
    </main>
  );
}
