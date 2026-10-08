"use client";

import { useRef } from "react";
import { process, siteConfig } from "@/content/site";
import { gsap, useGsapScene } from "@/lib/useGsapScene";

export function AboutScene() {
  const scope = useRef<HTMLElement>(null);

  useGsapScene(scope, () => {
    const isMobile = window.matchMedia("(max-width: 767px)").matches;
    const track = scope.current?.querySelector<HTMLElement>(".process-track");
    const viewport = scope.current?.querySelector<HTMLElement>(".process-viewport");
    const steps = gsap.utils.toArray<HTMLElement>(".process-step", scope.current ?? undefined);
    const details = gsap.utils.toArray<HTMLElement>(".process-detail", scope.current ?? undefined);
    const markers = gsap.utils.toArray<HTMLElement>(".process-marker", scope.current ?? undefined);

    if (!track || !viewport || steps.length === 0 || details.length === 0 || markers.length === 0) return;

    const getOffsetFor = (step: HTMLElement) => {
      const targetLeft = viewport.clientWidth < 768 ? viewport.clientWidth * 0.04 : viewport.clientWidth * 0.12;
      return targetLeft - step.offsetLeft;
    };

    gsap.set(steps, { opacity: 0.26 });
    gsap.set(details, { autoAlpha: 0, y: 16 });
    gsap.set(markers, { opacity: 0.28, scale: 0.72 });
    gsap.set(".process-progress-fill", { scaleX: 0, transformOrigin: "left center" });
    gsap.set(".process-progress-node", { left: "0%" });
    gsap.set(steps[0], { opacity: 1 });
    gsap.set(details[0], { autoAlpha: 1, y: 0 });
    gsap.set(markers[0], { opacity: 1, scale: 1 });
    gsap.set(track, { x: getOffsetFor(steps[0]) });

    const tl = gsap.timeline({
      scrollTrigger: {
        trigger: scope.current,
        start: "top top",
        end: `+=${(process.length - 1) * (isMobile ? 46 : 52)}%`,
        scrub: 1,
        pin: true,
        anticipatePin: 1,
        invalidateOnRefresh: true,
      },
    });

    process.slice(1).forEach((_, transitionIndex) => {
      const stepIndex = transitionIndex + 1;
      const progress = stepIndex / (process.length - 1);

      tl.to(track, { x: () => getOffsetFor(steps[stepIndex]), duration: 0.62, ease: "power1.inOut" }, transitionIndex)
        .to(steps, { opacity: 0.24, duration: 0.28, ease: "power1.out" }, transitionIndex)
        .to(steps[stepIndex], { opacity: 1, duration: 0.34, ease: "power1.out" }, transitionIndex + 0.1)
        .to(details[stepIndex - 1], { autoAlpha: 0, y: -12, duration: 0.28, ease: "power1.in" }, transitionIndex + 0.02)
        .fromTo(details[stepIndex], { autoAlpha: 0, y: 14 }, { autoAlpha: 1, y: 0, duration: 0.38, ease: "power2.out", immediateRender: false }, transitionIndex + 0.1)
        .to(".process-progress-fill", { scaleX: progress, duration: 0.58, ease: "power1.inOut" }, transitionIndex)
        .to(".process-progress-node", { left: `${progress * 100}%`, duration: 0.58, ease: "power1.inOut" }, transitionIndex)
        .to(markers, { opacity: 0.28, scale: 0.72, duration: 0.22 }, transitionIndex)
        .to(markers[stepIndex], { opacity: 1, scale: 1, duration: 0.28 }, transitionIndex + 0.12);
    });

    return () => tl.kill();
  });

  return (
    <section id="about" ref={scope} className="scene node-grid overflow-hidden px-4 py-16 [--node-grid-size:104px] [--node-line:rgba(241,238,229,0.045)] sm:px-6 sm:py-20 lg:px-8 lg:py-16">
      <div className="mx-auto grid min-h-[calc(100svh-8rem)] w-full min-w-0 max-w-[1600px] content-center gap-5 sm:min-h-[calc(100svh-10rem)] sm:gap-6 lg:min-h-[calc(100svh-8rem)]">
        <div className="grid min-w-0 gap-7 lg:grid-cols-[0.68fr_1.32fr] lg:items-start lg:gap-16">
          <div className="border-l border-white/15 pl-4 sm:pl-5">
            <p className="font-mono text-xs uppercase tracking-[0.32em] text-[var(--acid)]">About / Process</p>
            <p className="mt-4 max-w-md text-lg leading-7 text-[#c4bfb4] sm:text-xl sm:leading-8">{siteConfig.name} is my independent studio for custom web development, with close attention to quality across new builds and ongoing work.</p>
          </div>
          <div className="relative min-h-[12.5rem] min-w-0 border-l border-white/15 pl-5 sm:min-h-[13.5rem] sm:pl-7">
            <span className="absolute -left-1 top-0 h-2 w-2 bg-[var(--acid)]" aria-hidden="true" />
            {process.map((step) => (
              <article className="process-detail absolute inset-y-0 left-5 right-0 max-w-2xl sm:left-7" key={step.id}>
                <p className="font-mono text-[10px] uppercase tracking-[0.24em] text-[#aaa59a] sm:text-xs">Current step / {step.id}</p>
                <h3 className="mt-2 text-[clamp(2.75rem,6.6vw,6.4rem)] font-semibold uppercase leading-[0.84] tracking-[-0.04em]">{step.title}</h3>
                <p className="mt-3 max-w-xl text-base leading-7 text-[#aaa59a] sm:text-lg sm:leading-8">{step.text}</p>
              </article>
            ))}
          </div>
        </div>

        <div className="grid grid-cols-[auto_1fr_auto] items-center gap-3 font-mono text-[10px] uppercase tracking-[0.2em] text-[#77736a] sm:gap-5">
          <span>01</span>
          <div className="relative h-px bg-white/15">
            <div className="process-progress-fill absolute inset-y-0 left-0 w-full bg-[var(--acid)]" />
            <div className="process-progress-node absolute top-1/2 h-2.5 w-2.5 -translate-x-1/2 -translate-y-1/2 bg-[var(--acid)]" />
            <div className="absolute inset-0 flex items-center justify-between">
              {process.map((step) => <span className="process-marker h-1.5 w-1.5 bg-[#f1eee5]" key={step.id} />)}
            </div>
          </div>
          <span>06</span>
        </div>

        <div className="process-viewport w-full min-w-0 overflow-visible border-y border-white/15 py-4 sm:py-5">
          <div className="process-track flex w-max gap-10 will-change-transform sm:gap-12">
            {process.map((step) => (
              <span className="process-step text-[clamp(3.7rem,10vw,10.5rem)] font-semibold uppercase leading-none tracking-[-0.045em]" key={step.id}>{step.title}</span>
            ))}
          </div>
        </div>

        <div className="process-scope-line grid gap-2 border-l border-white/15 pl-4 sm:grid-cols-[10rem_1fr] sm:items-start sm:gap-6 sm:pl-5">
          <p className="font-mono text-[10px] uppercase tracking-[0.24em] text-[var(--acid)]">Flexible scope</p>
          <p className="max-w-2xl text-base leading-7 text-[#aaa59a] sm:text-lg sm:leading-8">New builds, existing websites, one feature, or ongoing support. I can join the project wherever the work starts.</p>
        </div>
      </div>
    </section>
  );
}
