"use client";

import Image from "next/image";
import { useRef } from "react";
import { featuredProject } from "@/content/site";
import { gsap, useGsapScene } from "@/lib/useGsapScene";

export function WorkScene() {
  const scope = useRef<HTMLElement>(null);

  useGsapScene(scope, () => {
    const mm = gsap.matchMedia();

    const buildTimeline = (isMobile: boolean) => {
      const browserViewport = scope.current?.querySelector<HTMLElement>(".case-browser-viewport");
      const page = scope.current?.querySelector<HTMLElement>(".case-page");
      const milestoneCopies = gsap.utils.toArray<HTMLElement>(".case-milestone-copy", scope.current ?? undefined);

      if (!browserViewport || !page || milestoneCopies.length === 0) return;

      const getPageTravel = () => Math.max(0, page.offsetHeight - browserViewport.clientHeight);
      const milestoneTimes = isMobile ? [0.92, 1.48, 2.02] : [1.12, 1.82, 2.5];

      gsap.set(".case-desktop", {
        clipPath: "inset(100% 0 0 0)",
        y: isMobile ? 44 : 72,
        scale: isMobile ? 0.95 : 0.92,
      });
      gsap.set(page, { y: 0 });
      gsap.set(".case-mobile", { autoAlpha: 0, x: isMobile ? 34 : 64, y: isMobile ? 24 : 34, scale: 0.9 });
      gsap.set(milestoneCopies, { autoAlpha: 0, y: 14 });
      gsap.set(milestoneCopies[0], { autoAlpha: 1, y: 0 });
      gsap.set(".case-stack", { autoAlpha: 0, y: 10 });

      const timeline = gsap.timeline({
        scrollTrigger: {
          trigger: scope.current,
          start: "top top",
          end: isMobile ? "+=255%" : "+=360%",
          scrub: isMobile ? 0.8 : 1,
          pin: true,
          anticipatePin: 1,
          invalidateOnRefresh: true,
        },
      });

      timeline
        .to(".case-intro", { y: isMobile ? -16 : -20, opacity: isMobile ? 0.62 : 0.72, duration: 0.42, ease: "power1.inOut" }, 0)
        .to(".case-desktop", { clipPath: "inset(0% 0 0 0)", y: 0, scale: 1, duration: isMobile ? 0.68 : 0.78, ease: "power2.inOut" }, 0.05)
        .to(page, { y: () => -getPageTravel(), duration: isMobile ? 2.25 : 2.72, ease: "none" }, isMobile ? 0.42 : 0.5)
        .to(".case-mobile", { autoAlpha: 1, x: 0, y: 0, scale: 1, duration: 0.44, ease: "power2.out" }, isMobile ? 1.38 : 1.72)
        .to(".case-mobile", { autoAlpha: 0, x: isMobile ? 24 : 42, y: -12, scale: 0.94, duration: 0.34, ease: "power1.in" }, isMobile ? 2.18 : 2.68)
        .to(".case-stack", { autoAlpha: 1, y: 0, duration: 0.34, ease: "power2.out" }, isMobile ? 2.14 : 2.7);

      milestoneTimes.forEach((time, index) => {
        timeline
          .to(milestoneCopies[index], { autoAlpha: 0, y: -10, duration: 0.24, ease: "power1.in" }, time)
          .fromTo(
            milestoneCopies[index + 1],
            { autoAlpha: 0, y: 12 },
            { autoAlpha: 1, y: 0, duration: 0.34, ease: "power2.out", immediateRender: false },
            time + 0.08,
          );
      });

      return () => timeline.kill();
    };

    mm.add("(min-width: 768px)", () => buildTimeline(false));
    mm.add("(max-width: 767px)", () => buildTimeline(true));

    return () => mm.revert();
  });

  return (
    <section id="work" ref={scope} className="scene node-grid overflow-hidden bg-[#090907] px-4 py-16 [--node-grid-size:96px] [--node-line:rgba(241,238,229,0.04)] sm:px-6 sm:py-20 lg:px-8">
      <div className="relative mx-auto h-[calc(100svh-8rem)] min-h-[620px] max-w-[1600px] overflow-hidden border-y border-white/12 sm:h-[calc(100svh-10rem)]">
        <header className="case-intro absolute left-0 top-6 z-20 max-w-[42rem] sm:top-8 lg:left-2 lg:top-10">
          <p className="font-mono text-xs uppercase tracking-[0.32em] text-[var(--acid)]">Featured Work</p>
          <h2 className="mt-4 text-[clamp(3.6rem,10vw,9.5rem)] font-semibold uppercase leading-[0.8] tracking-[-0.05em]">{featuredProject.title}</h2>
          <div className="mt-5 flex gap-5 font-mono text-[10px] uppercase tracking-[0.2em] text-[#aaa59a] sm:text-xs">
            <span>{featuredProject.type}</span>
            <span>{featuredProject.year}</span>
          </div>
          <p className="mt-5 max-w-xl text-base leading-7 text-[#c7c2b6] sm:text-lg sm:leading-8">{featuredProject.description}</p>
        </header>

        <div className="case-desktop panel-shadow absolute left-[4%] top-[35%] z-[4] flex aspect-[16/10] w-[94%] flex-col overflow-hidden border border-white/20 bg-[#11110e] md:left-[25%] md:top-[17%] md:w-[72%]">
          <div className="flex h-7 shrink-0 items-center gap-2 border-b border-black/15 bg-[#e8e2d5] px-3 sm:h-8">
            <span className="h-2 w-2 bg-[#090907]" />
            <span className="h-2 w-2 border border-[#090907]/35" />
            <span className="ml-auto h-px w-24 bg-[#090907]/20" />
          </div>
          <div className="case-browser-viewport relative min-h-0 flex-1 overflow-hidden bg-[#eee8dc]">
            <Image
              src={featuredProject.fullDesktopImage}
              alt="Continuous view through the real Yummi Art website, from visual direction to booking"
              width={1440}
              height={6056}
              sizes="(max-width: 767px) 94vw, 72vw"
              className="case-page block h-auto w-full max-w-none will-change-transform"
              priority
              unoptimized
            />
          </div>
        </div>

        <div className="case-mobile panel-shadow absolute bottom-[8%] right-[3%] z-10 aspect-[500/701] h-[40%] overflow-hidden border border-white/25 bg-[#f1eee5] md:bottom-[7%] md:right-[3%] md:h-[54%]">
          <Image src={featuredProject.mobileImage} alt="Yummi Art booking experience on mobile" fill sizes="(max-width: 767px) 38vw, 18vw" className="object-cover object-top" />
        </div>

        <div className="absolute bottom-4 left-0 z-20 h-[9.75rem] w-[78%] bg-[#090907]/94 pt-4 md:bottom-8 md:left-2 md:h-[11rem] md:w-[38%] md:pr-8">
          {featuredProject.milestones.map((milestone, index) => (
            <div className={`case-milestone-copy absolute inset-x-0 top-4 ${index === 0 ? "opacity-100" : "opacity-0"}`} key={milestone.id}>
              <p className="font-mono text-[10px] uppercase tracking-[0.2em] text-[var(--acid)]">{milestone.id} / {milestone.title}</p>
              <p className="mt-3 max-w-md text-sm leading-6 text-[#c7c2b6] md:text-base md:leading-7">{milestone.copy}</p>
            </div>
          ))}
          <ul className="case-stack absolute bottom-0 left-0 flex flex-wrap gap-x-5 gap-y-2 border-t border-white/15 pt-3 font-mono text-[10px] uppercase tracking-[0.18em] text-[#f1eee5]">
            {featuredProject.technologies.map((technology) => <li key={technology}>{technology}</li>)}
          </ul>
        </div>

        <div className="absolute bottom-0 right-0 h-3 w-24 bg-[var(--acid)]" />
        <div className="absolute right-0 top-0 font-mono text-[10px] uppercase tracking-[0.24em] text-white/45">01 / Featured project</div>
      </div>
    </section>
  );
}
