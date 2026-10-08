"use client";

import { useRef } from "react";
import { siteConfig } from "@/content/site";
import { gsap, useGsapScene } from "@/lib/useGsapScene";

export function ContactScene() {
  const scope = useRef<HTMLElement>(null);

  useGsapScene(scope, () => {
    const tl = gsap.timeline({
      scrollTrigger: {
        trigger: scope.current,
        start: "top 85%",
        end: "top top",
        scrub: 1,
      },
    });
    tl.fromTo(".contact-wipe", { scaleX: 0 }, { scaleX: 1, transformOrigin: "left", ease: "none" }, 0)
      .fromTo(".contact-title", { yPercent: 24, opacity: 0.2 }, { yPercent: 0, opacity: 1, ease: "none" }, 0.1)
      .fromTo(".contact-rail", { xPercent: -38 }, { xPercent: 0, ease: "none" }, 0);
    return () => tl.kill();
  });

  return (
    <section id="contact" ref={scope} className="scene node-grid flex flex-col justify-between overflow-hidden bg-[#f1eee5] px-4 pb-8 pt-24 text-[#090907] [--node-grid-size:92px] [--node-line:rgba(9,9,7,0.08)] sm:px-6 sm:pt-28 lg:px-8 lg:pt-32">
      <div className="contact-wipe absolute left-0 top-0 h-2 w-full bg-[#090907]" />
      <div className="contact-rail whitespace-nowrap border-y border-black py-3 font-mono text-xs uppercase tracking-[0.32em]">
        Project inquiry / Websites / E-commerce / Maintenance / Features / Performance /
      </div>
      <div className="my-12 sm:my-16">
        <p className="font-mono text-xs uppercase tracking-[0.32em] text-black/55">Contact / {siteConfig.location}</p>
        <h2 className="contact-title mt-5 max-w-[11ch] text-[clamp(3.8rem,12vw,13.5rem)] font-semibold uppercase leading-[0.8] tracking-[-0.05em]">Let’s build something worth visiting.</h2>
      </div>
      <div className="grid gap-4 border-t border-black/20 pt-6 text-base sm:grid-cols-3 sm:gap-5 sm:text-lg">
        <a href={`mailto:${siteConfig.email}`}>{siteConfig.email}</a>
        <a href={siteConfig.instagram} target="_blank" rel="noreferrer">{siteConfig.instagramLabel}</a>
        <a href={`mailto:${siteConfig.email}?subject=Project%20inquiry`}>Start a project inquiry</a>
      </div>
    </section>
  );
}
