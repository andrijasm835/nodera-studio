"use client";

import Image from "next/image";
import { useRef } from "react";
import { featuredProject } from "@/content/site";
import { gsap, useGsapScene } from "@/lib/useGsapScene";
import { YummiShowcase } from "@/components/scenes/YummiShowcase";

export function WorkScene() {
  const scope = useRef<HTMLElement>(null);

  useGsapScene(scope, () => {
    const mm = gsap.matchMedia();

    const buildTimeline = (isMobile: boolean) => {
      const milestoneCopies = gsap.utils.toArray<HTMLElement>(".case-milestone-copy", scope.current ?? undefined);

      if (milestoneCopies.length === 0) return;

      const milestoneTimes = isMobile ? [0.8, 1.68, 2.48] : [0.9, 1.82, 2.72];

      gsap.set(".case-desktop", {
        clipPath: "inset(100% 0 0 0)",
        y: isMobile ? 44 : 72,
        scale: isMobile ? 0.95 : 0.92,
      });
      gsap.set(".case-mobile", { autoAlpha: 0, x: isMobile ? 34 : 64, y: isMobile ? 24 : 34, scale: 0.9 });
      gsap.set(".case-mobile-photo", { scale: 1.08, yPercent: 0 });
      gsap.set(".case-mobile-booking", { autoAlpha: 0, yPercent: 12 });
      gsap.set(milestoneCopies, { autoAlpha: 0, y: 14 });
      gsap.set(milestoneCopies[0], { autoAlpha: 1, y: 0 });
      gsap.set(".case-stack", { autoAlpha: 0, y: 10 });
      gsap.set(".yummi-transform, .yummi-details, .yummi-booking", { autoAlpha: 0 });
      gsap.set(".yummi-stage-copy", { autoAlpha: 0, y: 16 });
      gsap.set(".yummi-stage-copy-0", { autoAlpha: 1, y: 0 });

      const timeline = gsap.timeline({
        scrollTrigger: {
          trigger: scope.current,
          start: "top top",
          end: isMobile ? "+=275%" : "+=380%",
          scrub: isMobile ? 0.8 : 1,
          pin: true,
          anticipatePin: 1,
          invalidateOnRefresh: true,
        },
      });

      timeline
        .to(".case-intro", { y: isMobile ? -16 : -20, opacity: isMobile ? 0.62 : 0.72, duration: 0.42, ease: "power1.inOut" }, 0)
        .to(".case-desktop", { clipPath: "inset(0% 0 0 0)", y: 0, scale: 1, duration: isMobile ? 0.68 : 0.78, ease: "power2.inOut" }, 0.05)
        .to(".yummi-hero-bg", { scale: 1.08, yPercent: -2.5, duration: 0.82, ease: "none" }, 0.18)
        .to(".yummi-hero-lockup", { scale: 1.045, yPercent: -7, duration: 0.78, ease: "power1.inOut" }, 0.18)
        .to(".yummi-hero-prompt", { autoAlpha: 0, y: 8, duration: 0.24 }, 0.24)
        .to(".yummi-transform", { autoAlpha: 1, duration: 0.34 }, 0.72)
        .to(".yummi-hero", { clipPath: "inset(0 0 100% 0)", duration: 0.46, ease: "power2.inOut" }, 0.72)
        .to(".yummi-transform-frame", { scale: 1.035, xPercent: -1.4, yPercent: 1.6, duration: 0.42, ease: "power1.inOut" }, 1.02)
        .to(".yummi-transform-image-1", { autoAlpha: 1, duration: 0.28 }, 1.02)
        .to(".yummi-transform-image-0", { autoAlpha: 0, duration: 0.22 }, 1.12)
        .to(".yummi-stage-copy-0", { autoAlpha: 0, y: -12, duration: 0.16 }, 1.0)
        .to(".yummi-stage-copy-1", { autoAlpha: 1, y: 0, duration: 0.22 }, 1.08)
        .to(".yummi-transform-frame", { scale: 1.04, xPercent: -1, yPercent: -2, duration: 0.4 }, 1.36)
        .to(".yummi-transform-image-2", { autoAlpha: 1, duration: 0.28 }, 1.36)
        .to(".yummi-transform-image-1", { autoAlpha: 0, duration: 0.22 }, 1.46)
        .to(".yummi-stage-copy-1", { autoAlpha: 0, y: -12, duration: 0.16 }, 1.34)
        .to(".yummi-stage-copy-2", { autoAlpha: 1, y: 0, duration: 0.22 }, 1.42)
        .to(".yummi-transform-image-3", { autoAlpha: 1, duration: 0.3 }, 1.66)
        .to(".yummi-transform-image-2", { autoAlpha: 0, duration: 0.22 }, 1.76)
        .to(".yummi-stage-copy-2", { autoAlpha: 0, y: -12, duration: 0.16 }, 1.64)
        .to(".yummi-stage-copy-3", { autoAlpha: 1, y: 0, duration: 0.22 }, 1.72)
        .to(".yummi-shimmer", { autoAlpha: 0.6, xPercent: 700, duration: 0.34 }, 1.72)
        .to(".yummi-details", { autoAlpha: 1, duration: 0.28 }, 1.88)
        .to(".yummi-transform", { clipPath: "inset(0 100% 0 0)", duration: 0.42, ease: "power2.inOut" }, 1.88)
        .to(".yummi-detail-a", { xPercent: 0, yPercent: 0, clipPath: "inset(0 0% 0 0)", duration: 0.54 }, 2.02)
        .fromTo(".yummi-detail-b", { xPercent: 30, yPercent: -14 }, { autoAlpha: 1, xPercent: 0, yPercent: 0, clipPath: "polygon(0 0, 100% 0, 88% 100%, 8% 100%)", duration: 0.54 }, 2.18)
        .fromTo(".yummi-detail-c", { yPercent: 40, scale: 0.94 }, { autoAlpha: 1, yPercent: 0, scale: 1, clipPath: "circle(78% at 50% 50%)", duration: 0.54 }, 2.4)
        .to(".yummi-detail-word-1", { xPercent: -18, yPercent: -8, duration: 0.7 }, 2.02)
        .to(".yummi-detail-word-2", { xPercent: 16, yPercent: 10, opacity: 0.42, duration: 0.64 }, 2.18)
        .to(".yummi-detail-word-3", { xPercent: -6, yPercent: -18, opacity: 0.38, duration: 0.6 }, 2.4)
        .to(".yummi-detail-front", { autoAlpha: 1, yPercent: -8, duration: 0.32 }, 2.5)
        .to(".yummi-detail-image", { scale: 1.055, duration: 0.56, ease: "none" }, 2.44)
        .to(".yummi-booking", { autoAlpha: 1, duration: 0.3 }, 2.86)
        .to(".yummi-details", { clipPath: "inset(0 0 100% 0)", duration: 0.42, ease: "power2.inOut" }, 2.86)
        .to(".yummi-mirror", { scale: 1.04, autoAlpha: 1, duration: 0.58, ease: "power2.out" }, 3.0)
        .to(".yummi-reflection", { autoAlpha: 0.72, scale: 1, duration: 0.48 }, 3.04)
        .to(".yummi-ready-top", { xPercent: -8, duration: 0.64 }, 2.94)
        .to(".yummi-ready-bottom", { xPercent: 9, duration: 0.64 }, 2.94)
        .to(".yummi-booking-panel", { autoAlpha: 1, scale: 1, duration: 0.38 }, 3.18)
        .to(".yummi-lipstick-line", { scaleX: 1, duration: 0.44 }, 3.08)
        .to(".yummi-mirror-shine", { xPercent: 300, duration: 0.44 }, 3.2)
        .to(".case-mobile", { autoAlpha: 1, x: 0, y: 0, scale: 1, duration: 0.38, ease: "power2.out" }, isMobile ? 1.85 : 2.12)
        .to(".case-mobile-photo", { yPercent: -12, scale: 1.16, duration: 0.62, ease: "none" }, isMobile ? 1.9 : 2.18)
        .to(".case-mobile-booking", { autoAlpha: 1, yPercent: 0, duration: 0.34 }, isMobile ? 2.18 : 2.46)
        .to(".case-mobile", { autoAlpha: 0, x: isMobile ? 24 : 42, y: -12, scale: 0.94, duration: 0.3 }, isMobile ? 2.76 : 3.08)
        .to(".case-stack", { autoAlpha: 1, y: 0, duration: 0.34, ease: "power2.out" }, isMobile ? 2.72 : 3.18);

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
            <YummiShowcase />
          </div>
        </div>

        <div className="case-mobile panel-shadow absolute bottom-[8%] right-[3%] z-10 aspect-[390/844] h-[40%] overflow-hidden border border-white/25 bg-[#201614] md:bottom-[7%] md:right-[3%] md:h-[54%]">
          <Image src="/work/yummi/demo/transform-final.jpg" alt="Yummi Art responsive makeup experience" fill sizes="(max-width: 767px) 38vw, 18vw" className="case-mobile-photo object-cover object-[50%_32%]" />
          <div className="case-mobile-booking absolute inset-x-[8%] bottom-[7%] z-10 border border-[#c5a56d]/70 bg-[#fff8ef]/95 px-2 py-3 text-center text-[#6f1d2a] shadow-lg">
            <p className="font-serif text-[clamp(0.75rem,2.2vw,1.4rem)] leading-[0.9]">ZAKAŽI SVOJ TERMIN</p>
            <div className="mt-2 h-px bg-[#6f1d2a]/25" />
            <p className="mt-2 text-[5px] font-bold tracking-[0.15em]">IZABERI USLUGU →</p>
          </div>
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
