"use client";

import { useRef } from "react";
import { siteConfig } from "@/content/site";
import { gsap, useGsapScene } from "@/lib/useGsapScene";

export function Navigation() {
  const scope = useRef<HTMLElement>(null);

  useGsapScene(scope, () => {
    const tl = gsap.timeline({ delay: 0.25 });
    tl.fromTo(scope.current, { autoAlpha: 0, y: -14 }, { autoAlpha: 1, y: 0, duration: 0.7, ease: "power3.out" });
    return () => tl.kill();
  });

  return (
    <nav ref={scope} className="fixed left-0 right-0 top-0 z-50 flex items-center justify-between px-4 py-4 text-[11px] uppercase tracking-[0.18em] text-[#f1eee5] mix-blend-difference sm:px-6 lg:px-8">
      <a href="#top" className="wordmark font-semibold">{siteConfig.shortName}</a>
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
