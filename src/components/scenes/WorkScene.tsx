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
      const desktopScreens = gsap.utils.toArray<HTMLElement>(".case-screen");
      const mobileScreens = gsap.utils.toArray<HTMLElement>(".case-mobile-screen");
      const stageCopies = gsap.utils.toArray<HTMLElement>(".case-stage-copy");

      gsap.set(".case-desktop", { clipPath: "inset(100% 0 0 0)", y: 80, scale: 0.9 });
      gsap.set(".case-mobile", { autoAlpha: 0, x: 80, y: 38, scale: 0.88 });
      gsap.set(desktopScreens, { autoAlpha: 0, yPercent: 6 });
      gsap.set(desktopScreens[0], { autoAlpha: 1, yPercent: 0 });
      gsap.set(mobileScreens, { autoAlpha: 0, yPercent: 6 });
      gsap.set(mobileScreens[1], { autoAlpha: 1, yPercent: 0 });
      gsap.set(stageCopies, { autoAlpha: 0, y: 18 });
      gsap.set(stageCopies[0], { autoAlpha: 1, y: 0 });
      gsap.set(".case-stack", { autoAlpha: 0, y: 12 });

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
        .to(".case-intro", { y: -24, opacity: 0.62, duration: 0.5, ease: "power1.inOut" }, 0)
        .to(".case-desktop", { clipPath: "inset(0% 0 0 0)", y: 0, scale: 1, duration: 0.9, ease: "power2.inOut" }, 0.08)
        .to(desktopScreens[0], { autoAlpha: 0, yPercent: -4, duration: 0.38, ease: "power1.inOut" }, 0.92)
        .to(desktopScreens[1], { autoAlpha: 1, yPercent: 0, duration: 0.46, ease: "power1.inOut" }, 0.98)
        .to(stageCopies[0], { autoAlpha: 0, y: -12, duration: 0.28, ease: "power1.in" }, 0.92)
        .to(stageCopies[1], { autoAlpha: 1, y: 0, duration: 0.38, ease: "power2.out" }, 1.02)
        .to(".case-desktop", { xPercent: -9, yPercent: -4, scale: 0.9, duration: 0.72, ease: "power2.inOut" }, 1.02)
        .to(".case-mobile", { autoAlpha: 1, x: 0, y: 0, scale: 1, duration: 0.68, ease: "power2.out" }, 1.12)
        .to(desktopScreens[1], { autoAlpha: 0, yPercent: -4, duration: 0.38, ease: "power1.inOut" }, 1.76)
        .to(desktopScreens[2], { autoAlpha: 1, yPercent: 0, duration: 0.46, ease: "power1.inOut" }, 1.82)
        .to(mobileScreens[1], { autoAlpha: 0, yPercent: -4, duration: 0.34, ease: "power1.inOut" }, 1.76)
        .to(mobileScreens[2], { autoAlpha: 1, yPercent: 0, duration: 0.42, ease: "power1.inOut" }, 1.82)
        .to(stageCopies[1], { autoAlpha: 0, y: -12, duration: 0.28, ease: "power1.in" }, 1.76)
        .to(stageCopies[2], { autoAlpha: 1, y: 0, duration: 0.38, ease: "power2.out" }, 1.86)
        .to(".case-stack", { autoAlpha: 1, y: 0, duration: 0.38, ease: "power2.out" }, 2.02);

      return () => timeline.kill();
    });

    mm.add("(max-width: 767px)", () => {
      const desktopScreens = gsap.utils.toArray<HTMLElement>(".case-screen");
      const mobileScreens = gsap.utils.toArray<HTMLElement>(".case-mobile-screen");
      const stageCopies = gsap.utils.toArray<HTMLElement>(".case-stage-copy");

      gsap.set(".case-desktop", { clipPath: "inset(100% 0 0 0)", y: 44, scale: 0.94 });
      gsap.set(".case-mobile", { autoAlpha: 0, x: 38, y: 26, scale: 0.9 });
      gsap.set(desktopScreens, { autoAlpha: 0, yPercent: 6 });
      gsap.set(desktopScreens[0], { autoAlpha: 1, yPercent: 0 });
      gsap.set(mobileScreens, { autoAlpha: 0, yPercent: 6 });
      gsap.set(mobileScreens[1], { autoAlpha: 1, yPercent: 0 });
      gsap.set(stageCopies, { autoAlpha: 0, y: 16 });
      gsap.set(stageCopies[0], { autoAlpha: 1, y: 0 });
      gsap.set(".case-stack", { autoAlpha: 0, y: 10 });

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
        .to(".case-intro", { y: -18, opacity: 0.5, duration: 0.42, ease: "power1.inOut" }, 0)
        .to(".case-desktop", { clipPath: "inset(0% 0 0 0)", y: 0, scale: 1, duration: 0.78, ease: "power2.inOut" }, 0.08)
        .to(desktopScreens[0], { autoAlpha: 0, yPercent: -4, duration: 0.32, ease: "power1.inOut" }, 0.78)
        .to(desktopScreens[1], { autoAlpha: 1, yPercent: 0, duration: 0.4, ease: "power1.inOut" }, 0.84)
        .to(stageCopies[0], { autoAlpha: 0, y: -10, duration: 0.24, ease: "power1.in" }, 0.78)
        .to(stageCopies[1], { autoAlpha: 1, y: 0, duration: 0.32, ease: "power2.out" }, 0.88)
        .to(".case-desktop", { xPercent: -7, yPercent: -5, scale: 0.92, duration: 0.58, ease: "power2.inOut" }, 0.9)
        .to(".case-mobile", { autoAlpha: 1, x: 0, y: 0, scale: 1, duration: 0.58, ease: "power2.out" }, 1)
        .to(desktopScreens[1], { autoAlpha: 0, yPercent: -4, duration: 0.32, ease: "power1.inOut" }, 1.48)
        .to(desktopScreens[2], { autoAlpha: 1, yPercent: 0, duration: 0.4, ease: "power1.inOut" }, 1.54)
        .to(mobileScreens[1], { autoAlpha: 0, yPercent: -4, duration: 0.3, ease: "power1.inOut" }, 1.48)
        .to(mobileScreens[2], { autoAlpha: 1, yPercent: 0, duration: 0.36, ease: "power1.inOut" }, 1.54)
        .to(stageCopies[1], { autoAlpha: 0, y: -10, duration: 0.24, ease: "power1.in" }, 1.48)
        .to(stageCopies[2], { autoAlpha: 1, y: 0, duration: 0.32, ease: "power2.out" }, 1.58)
        .to(".case-stack", { autoAlpha: 1, y: 0, duration: 0.32, ease: "power2.out" }, 1.72);

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

        <div className="case-desktop panel-shadow absolute left-[8%] top-[36%] z-[4] flex aspect-[3/2] w-[88%] flex-col overflow-hidden border border-white/20 bg-[#11110e] md:left-[27%] md:top-[17%] md:w-[68%]">
          <div className="flex h-7 items-center gap-2 border-b border-black/15 bg-[#e8e2d5] px-3 sm:h-8">
            <span className="h-2 w-2 bg-[#090907]" />
            <span className="h-2 w-2 border border-[#090907]/35" />
            <span className="ml-auto h-px w-24 bg-[#090907]/20" />
          </div>
          <div className="relative min-h-0 flex-1 overflow-hidden">
            {featuredProject.stages.map((stage, index) => (
              <div className={`case-screen absolute inset-0 ${index === 0 ? "opacity-100" : "opacity-0"}`} key={stage.id}>
                <Image src={stage.desktopImage} alt={`Yummi Art ${stage.title.toLowerCase()} desktop view`} fill sizes="(max-width: 767px) 88vw, 68vw" className="object-contain" priority={index === 0} />
              </div>
            ))}
          </div>
        </div>

        <div className="case-mobile panel-shadow absolute bottom-[7%] right-[5%] z-10 aspect-[390/844] h-[43%] overflow-hidden border border-white/25 bg-[#f1eee5] md:bottom-[8%] md:right-[5%] md:h-[55%]">
          <div className="relative h-full overflow-hidden">
            {featuredProject.stages.map((stage, index) => (
              <div className={`case-mobile-screen absolute inset-0 ${index === 1 ? "opacity-100" : "opacity-0"}`} key={stage.id}>
                <Image src={stage.mobileImage} alt={`Yummi Art ${stage.title.toLowerCase()} mobile view`} fill sizes="(max-width: 767px) 35vw, 18vw" className="object-contain" />
              </div>
            ))}
          </div>
        </div>

        <div className="absolute bottom-5 left-0 z-20 h-[9.5rem] w-[72%] bg-[#090907]/92 pt-4 md:bottom-8 md:left-2 md:h-[11rem] md:w-[40%] md:pr-8">
          {featuredProject.stages.map((stage, index) => (
            <div className={`case-stage-copy absolute inset-x-0 top-4 ${index === 0 ? "opacity-100" : "opacity-0"}`} key={stage.id}>
              <p className="font-mono text-[10px] uppercase tracking-[0.2em] text-[var(--acid)]">{stage.id} / {stage.title}</p>
              <p className="mt-3 max-w-md text-sm leading-6 text-[#c7c2b6] md:text-base md:leading-7">{stage.copy}</p>
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
