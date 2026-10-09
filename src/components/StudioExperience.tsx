"use client";

import { useLanguage } from "@/components/i18n/LanguageProvider";
import { Navigation } from "@/components/navigation/Navigation";
import { AboutScene } from "@/components/scenes/AboutScene";
import { ContactScene } from "@/components/scenes/ContactScene";
import { ExistingSiteScene } from "@/components/scenes/ExistingSiteScene";
import { HeroScene } from "@/components/scenes/HeroScene";
import { ServicesScene } from "@/components/scenes/ServicesScene";
import { WorkScene } from "@/components/scenes/WorkScene";
import { siteContent } from "@/content/site";

export function StudioExperience() {
  const { language } = useLanguage();
  const content = siteContent[language];

  return (
    <>
      <a href="#main-content" className="skip-link">{content.skipLink}</a>
      <Navigation />
      <main id="main-content">
        <HeroScene />
        <ServicesScene />
        <WorkScene />
        <ExistingSiteScene />
        <AboutScene />
        <ContactScene />
      </main>
    </>
  );
}
