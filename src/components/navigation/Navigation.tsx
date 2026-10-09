"use client";

import Image from "next/image";
import { FiInstagram } from "react-icons/fi";
import { useEffect, useRef, type MouseEvent } from "react";
import { useLanguage } from "@/components/i18n/LanguageProvider";
import { siteConfig, siteContent } from "@/content/site";
import { gsap, useGsapScene } from "@/lib/useGsapScene";

export function Navigation() {
  const scope = useRef<HTMLElement>(null);
  const { language, setLanguage } = useLanguage();
  const content = siteContent[language];

  const scrollToTop = (event: MouseEvent<HTMLAnchorElement>) => {
    event.preventDefault();
    const root = document.documentElement;
    const previousBehavior = root.style.scrollBehavior;

    root.style.scrollBehavior = "auto";
    window.history.replaceState(null, "", "#top");
    window.dispatchEvent(new Event("nodera:scroll-top"));
    window.scrollTo(0, 0);
    requestAnimationFrame(() => {
      window.scrollTo(0, 0);
      requestAnimationFrame(() => {
        root.style.scrollBehavior = previousBehavior;
      });
    });
  };

  const focusInquiry = () => {
    window.dispatchEvent(new Event("nodera:focus-inquiry"));
  };

  useGsapScene(scope, () => {
    const tl = gsap.timeline({ delay: 0.25 });
    tl.fromTo(scope.current, { autoAlpha: 0, y: -14 }, { autoAlpha: 1, y: 0, duration: 0.7, ease: "power3.out" });

    return () => tl.kill();
  });

  useEffect(() => {
    const navigation = scope.current;
    if (!navigation) return;

    let frame = 0;
    const syncSectionState = () => {
      cancelAnimationFrame(frame);
      frame = requestAnimationFrame(() => {
        const section = document
          .elementsFromPoint(window.innerWidth / 2, Math.min(48, window.innerHeight - 1))
          .map((element) => element.closest<HTMLElement>("section"))
          .find((element): element is HTMLElement => Boolean(element));
        const sectionId = section?.id;

        navigation.classList.toggle("is-light", sectionId === "services" || sectionId === "contact");
        navigation.classList.toggle("is-acid", sectionId === "existing-site");
        navigation.classList.toggle("is-contact", sectionId === "contact");
      });
    };

    syncSectionState();
    window.addEventListener("scroll", syncSectionState, { passive: true });
    window.addEventListener("resize", syncSectionState);

    return () => {
      cancelAnimationFrame(frame);
      window.removeEventListener("scroll", syncSectionState);
      window.removeEventListener("resize", syncSectionState);
    };
  }, []);

  return (
    <nav ref={scope} aria-label={content.navigation.label} className="site-navigation fixed left-0 right-0 top-0 z-50 flex items-center justify-between px-4 py-4 text-[11px] uppercase tracking-[0.18em] text-[#f1eee5] mix-blend-difference sm:px-6 lg:px-8">
      <a href="#top" className="brand-lockup flex items-center gap-2.5 font-semibold" onClick={scrollToTop} aria-label={content.navigation.backToTop}>
        <span className="brand-mark relative block h-7 w-7 shrink-0" aria-hidden="true">
          <Image src="/brand/nodera-emblem-light.png" alt="" fill sizes="28px" className="brand-mark-light object-contain" priority />
          <Image src="/brand/nodera-emblem.png" alt="" fill sizes="28px" className="brand-mark-dark object-contain" />
        </span>
        <span className="wordmark">{siteConfig.shortName}</span>
      </a>
      <div className="hidden gap-5 sm:flex">
        <a href="#work">{content.navigation.work}</a>
        <a href="#services">{content.navigation.services}</a>
        <a href="#about">{content.navigation.about}</a>
      </div>
      <div className="flex items-center gap-2 sm:gap-3">
        <div className="flex h-9 items-center rounded-full border border-current p-1" role="group" aria-label={content.navigation.language}>
          {(["sr", "en"] as const).map((option) => (
            <button
              key={option}
              type="button"
              onClick={() => setLanguage(option)}
              aria-pressed={language === option}
              className={`inline-flex h-7 min-w-10 items-center justify-center gap-1.5 rounded-full px-2 text-[9px] transition-colors sm:min-w-12 ${language === option ? "bg-[#f1eee5] text-[#090907]" : "opacity-55 hover:opacity-100"}`}
            >
              <span aria-hidden="true" className="text-[14px] leading-none sm:text-[15px]">{option === "sr" ? "🇷🇸" : "🇬🇧"}</span>
              <span>{option}</span>
            </button>
          ))}
        </div>
        <a
          href={siteConfig.instagram}
          target="_blank"
          rel="noopener noreferrer"
          aria-label={`Instagram — ${siteConfig.instagramLabel}`}
          title={siteConfig.instagramLabel}
          className="inline-flex h-8 w-8 items-center justify-center rounded-full border border-current transition-opacity hover:opacity-60"
        >
          <FiInstagram aria-hidden="true" size={15} />
        </a>
        <a href="#contact" onClick={focusInquiry} className="rounded-full border border-current px-3 py-2 text-[10px]">{content.navigation.inquiry}</a>
      </div>
    </nav>
  );
}
