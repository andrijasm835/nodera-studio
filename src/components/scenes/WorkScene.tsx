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

      const hidden = { autoAlpha: 0 };
      gsap.set(".case-desktop", {
        clipPath: "inset(100% 0 0 0)",
        y: isMobile ? 44 : 72,
        scale: isMobile ? 0.95 : 0.92,
      });
      gsap.set(".yummi-hero", { autoAlpha: 1, clipPath: "inset(0 0 0% 0)" });
      gsap.set(".yummi-hero-bg, .yummi-hero-lockup", { clearProps: "transform" });
      gsap.set(".yummi-hero-prompt", { autoAlpha: 1, y: 0 });
      gsap.set(".yummi-transform, .yummi-details, .yummi-booking", { ...hidden, clipPath: "inset(0 0 0% 0)" });
      gsap.set(".yummi-transform-frame", { scale: 1, xPercent: 0, yPercent: 0 });
      gsap.set(".yummi-transform-image", { autoAlpha: 0, clipPath: "inset(0 0 0 100%)" });
      gsap.set(".yummi-transform-image-0", { autoAlpha: 1, clipPath: "inset(0 0 0 0%)" });
      gsap.set(".yummi-stage-copy", { autoAlpha: 0, y: 14 });
      gsap.set(".yummi-stage-copy-0", { autoAlpha: 1, y: 0 });
      gsap.set(".yummi-detail-a", { autoAlpha: 1, xPercent: -28, yPercent: 12, clipPath: "inset(0 100% 0 0)" });
      gsap.set(".yummi-detail-b", { autoAlpha: 0, xPercent: 20, yPercent: -10, clipPath: "polygon(0 0, 100% 0, 100% 0, 0 0)" });
      gsap.set(".yummi-detail-c", { autoAlpha: 0, yPercent: 30, scale: 0.95, clipPath: "circle(0% at 50% 50%)" });
      gsap.set(".yummi-detail-words, .yummi-detail-front", hidden);
      gsap.set(".yummi-detail-image", { scale: 1 });
      gsap.set(".yummi-mirror", { autoAlpha: 0.72, scale: 0.82 });
      gsap.set(".yummi-reflection, .yummi-booking-panel", hidden);
      gsap.set(".yummi-ready-top, .yummi-ready-bottom", { xPercent: 0 });
      gsap.set(".yummi-lipstick-line", { scaleX: 0 });
      gsap.set(".case-mobile", { autoAlpha: 0, x: 48, y: 24, scale: 0.86 });
      gsap.set(".case-mobile-photo", { scale: 1.08, yPercent: 0 });
      gsap.set(".case-mobile-booking", { autoAlpha: 0, yPercent: 12 });
      gsap.set(milestoneCopies, { autoAlpha: 0, y: 14 });
      gsap.set(milestoneCopies[0], { autoAlpha: 1, y: 0 });
      gsap.set(".case-stack", { autoAlpha: 0, y: 10 });

      const timeline = gsap.timeline({
        scrollTrigger: {
          trigger: scope.current,
          start: "top top",
          end: isMobile ? "+=220%" : "+=380%",
          scrub: isMobile ? 0.8 : 1,
          pin: true,
          anticipatePin: 1,
          invalidateOnRefresh: true,
        },
      });

      const showMilestone = (from: number, to: number, at: string) => {
        timeline
          .to(milestoneCopies[from], { autoAlpha: 0, y: -8, duration: 0.2 }, at)
          .to(milestoneCopies[to], { autoAlpha: 1, y: 0, duration: 0.3 }, `${at}+=0.12`);
      };

      timeline
        .addLabel("hero", 0)
        .to(".case-desktop", { clipPath: "inset(0% 0 0 0)", y: 0, scale: 1, duration: 0.7, ease: "power2.inOut" }, "hero+=0.05")
        .to(".yummi-hero-bg", { scale: 1.065, yPercent: -2, duration: 0.9, ease: "none" }, "hero+=0.2")
        .to(".yummi-hero-lockup", { yPercent: -5, duration: 0.9, ease: "none" }, "hero+=0.2")
        .to(".yummi-hero-prompt", { autoAlpha: 0, y: 6, duration: 0.25 }, "hero+=0.45")
        .addLabel("transform", 1.08)
        .to(".case-intro", { y: isMobile ? -18 : -24, scale: 0.985, opacity: isMobile ? 0.48 : 0.42, duration: 0.56, ease: "power1.inOut" }, "transform")
        .to(".yummi-transform", { autoAlpha: 1, duration: 0.22 }, "transform")
        .to(".yummi-hero", { clipPath: "inset(0 0 100% 0)", duration: 0.48, ease: "power2.inOut" }, "transform")
        .to(".yummi-transform-frame", { scale: 1.025, xPercent: -1, yPercent: 1.2, duration: 1.65, ease: "none" }, "transform+=0.38");

      if (isMobile) {
        timeline
          .to(".yummi-stage-copy-0", { autoAlpha: 0, y: -10, duration: 0.2 }, "transform+=0.72")
          .to(".yummi-transform-image-3", { autoAlpha: 1, clipPath: "inset(0 0 0 0%)", duration: 0.52, ease: "power1.inOut" }, "transform+=0.74")
          .to(".yummi-transform-image-0", { autoAlpha: 0, duration: 0.25 }, "transform+=1.02")
          .to(".yummi-stage-copy-3", { autoAlpha: 1, y: 0, duration: 0.28 }, "transform+=0.9")
          .addLabel("booking", 2.7)
          .to(".yummi-booking", { autoAlpha: 1, duration: 0.24 }, "booking")
          .to(".yummi-transform", { clipPath: "inset(0 100% 0 0)", duration: 0.46, ease: "power2.inOut" }, "booking")
          .to(".yummi-mirror", { autoAlpha: 1, scale: 1, duration: 0.55, ease: "power2.out" }, "booking+=0.18")
          .to(".yummi-reflection", { autoAlpha: 0.68, duration: 0.42 }, "booking+=0.22")
          .to(".yummi-booking-panel", { autoAlpha: 1, duration: 0.34 }, "booking+=0.48")
          .to(".yummi-lipstick-line", { scaleX: 1, duration: 0.4 }, "booking+=0.42")
          .addLabel("finish", 3.5)
          .to(".case-stack", { autoAlpha: 1, y: 0, duration: 0.3 }, "finish");

        showMilestone(0, 1, "transform+=0.42");
        showMilestone(1, 3, "booking+=0.46");
      } else {
        const stages = [
          { from: 0, to: 1, at: "transform+=0.58", inset: "inset(0 0 0 0%)" },
          { from: 1, to: 2, at: "transform+=1.3", inset: "inset(0 0 0 0%)" },
          { from: 2, to: 3, at: "transform+=2.02", inset: "inset(0 0 0 0%)" },
        ];

        stages.forEach(({ from, to, at, inset }) => {
          timeline
            .to(`.yummi-stage-copy-${from}`, { autoAlpha: 0, y: -10, duration: 0.18 }, at)
            .to(`.yummi-transform-image-${to}`, { autoAlpha: 1, clipPath: inset, duration: 0.42, ease: "power1.inOut" }, `${at}+=0.02`)
            .to(`.yummi-transform-image-${from}`, { autoAlpha: 0, duration: 0.2 }, `${at}+=0.24`)
            .to(`.yummi-stage-copy-${to}`, { autoAlpha: 1, y: 0, duration: 0.26 }, `${at}+=0.16`);
        });

        timeline
          .addLabel("details", 4.02)
          .to(".yummi-details", { autoAlpha: 1, duration: 0.22 }, "details")
          .to(".yummi-transform", { clipPath: "inset(0 100% 0 0)", duration: 0.48, ease: "power2.inOut" }, "details")
          .to(".yummi-detail-a", { xPercent: 0, yPercent: 0, clipPath: "inset(0 0% 0 0)", duration: 0.52 }, "details+=0.28")
          .to(".yummi-detail-words", { autoAlpha: 1, duration: 0.38 }, "details+=0.54")
          .to(".yummi-detail-b", { autoAlpha: 1, xPercent: 0, yPercent: 0, clipPath: "polygon(0 0, 100% 0, 88% 100%, 8% 100%)", duration: 0.48 }, "details+=0.76")
          .to(".yummi-detail-c", { autoAlpha: 1, yPercent: 0, scale: 1, clipPath: "circle(78% at 50% 50%)", duration: 0.48 }, "details+=0.88")
          .to(".yummi-detail-front", { autoAlpha: 1, yPercent: -5, duration: 0.3 }, "details+=1.02")
          .to(".yummi-detail-image", { scale: 1.04, duration: 0.72, ease: "none" }, "details+=1.08")
          .to(".case-mobile", { autoAlpha: 1, x: 0, y: 0, scale: 0.92, duration: 0.36 }, "details+=0.72")
          .to(".case-mobile-photo", { yPercent: -9, scale: 1.14, duration: 0.72, ease: "none" }, "details+=0.8")
          .to(".case-mobile-booking", { autoAlpha: 1, yPercent: 0, duration: 0.32 }, "details+=1.04")
          .addLabel("booking", 5.78)
          .to(".case-mobile", { autoAlpha: 0, x: 34, duration: 0.28 }, "booking")
          .to(".yummi-detail-a, .yummi-detail-b, .yummi-detail-words, .yummi-detail-front", { autoAlpha: 0, duration: 0.3 }, "booking")
          .to(".yummi-detail-c", { xPercent: 4, yPercent: -4, scale: 0.76, clipPath: "circle(50% at 50% 50%)", duration: 0.46, ease: "power2.inOut" }, "booking")
          .to(".yummi-booking", { autoAlpha: 1, duration: 0.24 }, "booking+=0.2")
          .to(".yummi-details", { clipPath: "inset(0 0 100% 0)", duration: 0.44, ease: "power2.inOut" }, "booking+=0.18")
          .to(".yummi-mirror", { autoAlpha: 1, scale: 1.04, duration: 0.58, ease: "power2.out" }, "booking+=0.34")
          .to(".yummi-reflection", { autoAlpha: 0.7, duration: 0.44 }, "booking+=0.38")
          .to(".yummi-booking-panel", { autoAlpha: 1, duration: 0.36 }, "booking+=0.64")
          .to(".yummi-lipstick-line", { scaleX: 1, duration: 0.42 }, "booking+=0.58")
          .addLabel("finish", 6.9)
          .to(".case-stack", { autoAlpha: 1, y: 0, duration: 0.32 }, "finish");

        showMilestone(0, 1, "transform+=0.42");
        showMilestone(1, 2, "details+=0.62");
        showMilestone(2, 3, "booking+=0.58");
      }

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

        <div className="case-desktop panel-shadow absolute left-[4%] top-[35%] z-[4] flex aspect-[16/10] w-[94%] flex-col overflow-hidden border border-white/20 bg-[#11110e] md:left-[22%] md:top-[16%] md:w-[75%]">
          <div className="flex h-7 shrink-0 items-center gap-2 border-b border-black/15 bg-[#e8e2d5] px-3 sm:h-8">
            <span className="h-2 w-2 bg-[#090907]" />
            <span className="h-2 w-2 border border-[#090907]/35" />
            <span className="ml-auto h-px w-24 bg-[#090907]/20" />
          </div>
          <div className="case-browser-viewport relative min-h-0 flex-1 overflow-hidden bg-[#eee8dc]">
            <YummiShowcase />
          </div>
        </div>

        <div className="case-mobile panel-shadow absolute bottom-[8%] right-[3%] z-10 aspect-[390/844] h-[40%] overflow-hidden border border-white/25 bg-[#201614] md:bottom-[7%] md:right-[3%] md:h-[50%]">
          <Image src="/work/yummi/demo/transform-final.jpg" alt="Yummi Art responsive makeup experience" fill sizes="(max-width: 767px) 38vw, 18vw" className="case-mobile-photo object-cover object-[50%_32%]" />
          <div className="case-mobile-booking absolute inset-x-[8%] bottom-[7%] z-10 border border-[#c5a56d]/70 bg-[#fff8ef]/95 px-2 py-3 text-center text-[#6f1d2a] shadow-lg">
            <p className="font-serif text-[clamp(0.75rem,2.2vw,1.4rem)] leading-[0.9]">ZAKAŽI SVOJ TERMIN</p>
            <div className="mt-2 h-px bg-[#6f1d2a]/25" />
            <p className="mt-2 text-[5px] font-bold tracking-[0.15em]">IZABERI USLUGU →</p>
          </div>
        </div>

        <div className="absolute bottom-4 left-0 z-20 h-[9.75rem] w-[78%] bg-[#090907]/94 pt-4 md:bottom-8 md:left-2 md:h-[10.5rem] md:w-[36%] md:pr-8">
          {featuredProject.milestones.map((milestone, index) => (
            <div className={`case-milestone-copy absolute inset-x-0 top-4 ${index === 0 ? "opacity-100" : "opacity-0"}`} key={milestone.id}>
              <p className="font-mono text-[10px] uppercase tracking-[0.2em] text-[var(--acid)]">{milestone.id} / {milestone.title}</p>
              <p className="mt-3 max-w-md text-sm leading-6 text-[#aaa59a]">{milestone.copy}</p>
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
