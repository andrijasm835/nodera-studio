"use client";

import Image from "next/image";
import { useRef } from "react";
import { featuredProject } from "@/content/site";
import { gsap, useGsapScene } from "@/lib/useGsapScene";

export function WorkScene() {
  const scope = useRef<HTMLElement>(null);

  useGsapScene(scope, () => {
    const mm = gsap.matchMedia();

    mm.add("(min-width: 768px)", () => {
      gsap.set(".case-desktop", { clipPath: "inset(100% 0 0 0)", y: 80, scale: 0.9 });
      gsap.set(".case-mobile", { autoAlpha: 0, x: 80, y: 38, scale: 0.88 });
      gsap.set(".case-detail", { autoAlpha: 0, y: 34 });

      const timeline = gsap.timeline({
        scrollTrigger: {
          trigger: scope.current,
          start: "top top",
          end: "+=310%",
          scrub: 1,
          pin: true,
          anticipatePin: 1,
          invalidateOnRefresh: true,
        },
      });

      timeline
        .to(".case-intro", { y: -24, opacity: 0.42, duration: 0.5, ease: "power1.inOut" }, 0)
        .to(".case-desktop", { clipPath: "inset(0% 0 0 0)", y: 0, scale: 1, duration: 0.9, ease: "power2.inOut" }, 0.08)
        .to(".case-desktop-image", { scale: 1.025, duration: 1.2, ease: "none" }, 0.22)
        .to(".case-desktop", { xPercent: -9, yPercent: -4, scale: 0.9, duration: 0.72, ease: "power2.inOut" }, 1.02)
        .to(".case-mobile", { autoAlpha: 1, x: 0, y: 0, scale: 1, duration: 0.68, ease: "power2.out" }, 1.12)
        .to(".case-detail", { autoAlpha: 1, y: 0, duration: 0.58, ease: "power2.out" }, 1.72)
        .to(".case-mobile-image", { yPercent: -2.5, duration: 0.65, ease: "none" }, 1.72);

      return () => timeline.kill();
    });

    mm.add("(max-width: 767px)", () => {
      gsap.set(".case-desktop", { clipPath: "inset(100% 0 0 0)", y: 44, scale: 0.94 });
      gsap.set(".case-mobile", { autoAlpha: 0, x: 38, y: 26, scale: 0.9 });
      gsap.set(".case-detail", { autoAlpha: 0, y: 24 });

      const timeline = gsap.timeline({
        scrollTrigger: {
          trigger: scope.current,
          start: "top top",
          end: "+=260%",
          scrub: 0.8,
          pin: true,
          anticipatePin: 1,
          invalidateOnRefresh: true,
        },
      });

      timeline
        .to(".case-intro", { y: -18, opacity: 0.28, duration: 0.42, ease: "power1.inOut" }, 0)
        .to(".case-desktop", { clipPath: "inset(0% 0 0 0)", y: 0, scale: 1, duration: 0.78, ease: "power2.inOut" }, 0.08)
        .to(".case-desktop", { xPercent: -7, yPercent: -5, scale: 0.92, duration: 0.58, ease: "power2.inOut" }, 0.9)
        .to(".case-mobile", { autoAlpha: 1, x: 0, y: 0, scale: 1, duration: 0.58, ease: "power2.out" }, 1)
        .to(".case-detail", { autoAlpha: 1, y: 0, duration: 0.5, ease: "power2.out" }, 1.52);

      return () => timeline.kill();
    });

    return () => mm.revert();
  });

  return (
    <section id="work" ref={scope} className="scene node-grid overflow-hidden bg-[#090907] px-4 py-20 [--node-grid-size:96px] [--node-line:rgba(241,238,229,0.04)] sm:px-6 lg:px-8">
      <div className="relative mx-auto h-[calc(100svh-10rem)] min-h-[620px] max-w-[1600px] overflow-hidden border-y border-white/12">
        <header className="case-intro absolute left-0 top-6 z-20 max-w-[42rem] sm:top-8 lg:left-2 lg:top-10">
          <p className="font-mono text-xs uppercase tracking-[0.32em] text-[var(--acid)]">Featured Work</p>
          <h2 className="mt-4 text-[clamp(3.6rem,10vw,9.5rem)] font-semibold uppercase leading-[0.8] tracking-[-0.05em]">{featuredProject.title}</h2>
          <div className="mt-5 flex gap-5 font-mono text-[10px] uppercase tracking-[0.2em] text-[#aaa59a] sm:text-xs">
            <span>{featuredProject.type}</span>
            <span>{featuredProject.year}</span>
          </div>
          <p className="mt-5 max-w-xl text-base leading-7 text-[#c7c2b6] sm:text-lg sm:leading-8">{featuredProject.description}</p>
        </header>

        <div className="case-desktop panel-shadow absolute left-[8%] top-[36%] z-[4] aspect-[16/10] w-[88%] overflow-hidden border border-white/20 bg-[#f1eee5] md:left-[27%] md:top-[17%] md:w-[68%]">
          <div className="flex h-7 items-center gap-2 border-b border-black/15 bg-[#e8e2d5] px-3 sm:h-8">
            <span className="h-2 w-2 bg-[#090907]" />
            <span className="h-2 w-2 border border-[#090907]/35" />
            <span className="ml-auto h-px w-24 bg-[#090907]/20" />
          </div>
          <div className="relative h-[calc(100%-1.75rem)] overflow-hidden sm:h-[calc(100%-2rem)]">
            <Image src={featuredProject.desktopImage} alt="Yummi Art desktop website" fill sizes="(max-width: 767px) 88vw, 68vw" className="case-desktop-image object-cover" priority />
          </div>
        </div>

        <div className="case-mobile panel-shadow absolute bottom-[7%] right-[5%] z-10 aspect-[390/844] h-[43%] overflow-hidden border border-white/25 bg-[#f1eee5] md:bottom-[8%] md:right-[5%] md:h-[55%]">
          <div className="relative h-full overflow-hidden">
            <Image src={featuredProject.mobileImage} alt="Yummi Art mobile website" fill sizes="(max-width: 767px) 20vw, 18vw" className="case-mobile-image object-cover" />
          </div>
        </div>

        <div className="case-detail absolute bottom-5 left-0 z-20 w-[72%] bg-[#090907]/92 pt-4 md:bottom-8 md:left-2 md:w-[40%] md:pr-8">
          <p className="max-w-md text-sm leading-6 text-[#c7c2b6] md:text-base md:leading-7">Responsive storytelling backed by live availability, booking and inquiry flows, admin scheduling, and transactional status emails.</p>
          <ul className="mt-4 flex flex-wrap gap-x-5 gap-y-2 border-t border-white/15 pt-4 font-mono text-[10px] uppercase tracking-[0.18em] text-[#f1eee5]">
            {featuredProject.technologies.map((technology) => <li key={technology}>{technology}</li>)}
          </ul>
          <ul className="mt-3 hidden grid-cols-2 gap-x-5 gap-y-2 text-xs text-[#aaa59a] md:grid">
            {featuredProject.capabilities.map((capability) => <li key={capability}>{capability}</li>)}
          </ul>
        </div>

        <div className="absolute bottom-0 right-0 h-3 w-24 bg-[var(--acid)]" />
        <div className="absolute right-0 top-0 font-mono text-[10px] uppercase tracking-[0.24em] text-white/45">01 / Case study</div>
      </div>
    </section>
  );
}
