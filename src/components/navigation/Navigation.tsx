"use client";

import { useEffect, useRef, type MouseEvent } from "react";
import { siteConfig } from "@/content/site";
import { gsap, useGsapScene } from "@/lib/useGsapScene";

export function Navigation() {
  const scope = useRef<HTMLElement>(null);

  const scrollToTop = (event: MouseEvent<HTMLAnchorElement>) => {
    event.preventDefault();
    const root = document.documentElement;
    const previousBehavior = root.style.scrollBehavior;

    root.style.scrollBehavior = "auto";
    window.scrollTo(0, 0);
    window.dispatchEvent(new Event("nodera:scroll-top"));
    requestAnimationFrame(() => {
      root.style.scrollBehavior = previousBehavior;
      window.history.replaceState(null, "", "#top");
    });
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
    <nav ref={scope} className="site-navigation fixed left-0 right-0 top-0 z-50 flex items-center justify-between px-4 py-4 text-[11px] uppercase tracking-[0.18em] text-[#f1eee5] mix-blend-difference sm:px-6 lg:px-8">
      <a href="#top" className="wordmark font-semibold" onClick={scrollToTop}>{siteConfig.shortName}</a>
      <div className="hidden gap-5 sm:flex">
        <a href="#work">Work</a>
        <a href="#services">Services</a>
        <a href="#about">About</a>
        <a href="#contact">Contact</a>
      </div>
      <a href={`mailto:${siteConfig.email}`} className="rounded-full border border-current px-3 py-2 text-[10px]">Inquiry</a>
    </nav>
  );
}
