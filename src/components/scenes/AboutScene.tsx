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

    if (!track || !viewport || steps.length === 0 || details.length === 0) return;

    const getOffsetFor = (step: HTMLElement) => {
      const targetLeft = viewport.clientWidth < 768 ? 0 : viewport.clientWidth * 0.12;
      return targetLeft - step.offsetLeft;
    };

    gsap.set(steps, { opacity: 0.26 });
    gsap.set(details, { autoAlpha: 0, y: 20 });
    gsap.set(steps[0], { opacity: 1 });
    gsap.set(details[0], { autoAlpha: 1, y: 0 });
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

      tl.to(track, { x: () => getOffsetFor(steps[stepIndex]), duration: 0.55, ease: "power1.inOut" }, transitionIndex)
        .to(steps, { opacity: 0.22, duration: 0.2 }, transitionIndex)
        .to(steps[stepIndex], { opacity: 1, duration: 0.24 }, transitionIndex)
        .to(details, { autoAlpha: 0, y: -18, duration: 0.18 }, transitionIndex)
        .to(details[stepIndex], { autoAlpha: 1, y: 0, duration: 0.24 }, transitionIndex + 0.1);
    });

    return () => tl.kill();
  });

  return (
    <section id="about" ref={scope} className="scene node-grid overflow-hidden px-4 py-24 [--node-grid-size:104px] [--node-line:rgba(241,238,229,0.035)] sm:px-6 lg:px-8">
      <div className="grid min-h-[calc(100svh-12rem)] content-between gap-12">
        <div className="grid gap-10 lg:grid-cols-[0.72fr_1.28fr] lg:gap-16">
          <div>
            <p className="font-mono text-xs uppercase tracking-[0.32em] text-[var(--acid)]">About / Process</p>
            <p className="mt-5 max-w-md text-xl leading-8 text-[#c4bfb4]">{siteConfig.name} is my independent web development studio for fast, polished websites and useful frontend systems.</p>
          </div>
          <div className="relative min-h-44">
            {process.map((step) => (
              <article className="process-detail absolute inset-0 max-w-2xl" key={step.id}>
                <p className="font-mono text-xs uppercase tracking-[0.24em] text-[#aaa59a]">{step.id} / {String(process.length).padStart(2, "0")}</p>
                <h3 className="mt-3 text-[clamp(3rem,7.4vw,7.2rem)] font-semibold uppercase leading-[0.84] tracking-[-0.045em]">{step.title}</h3>
                <p className="mt-5 max-w-xl text-lg leading-8 text-[#aaa59a]">{step.text}</p>
              </article>
            ))}
          </div>
        </div>
        <div className="process-viewport overflow-visible border-y border-white/15 py-6">
          <div className="process-track flex w-max gap-12 will-change-transform">
            {process.map((step) => (
              <span className="process-step text-[clamp(4rem,11vw,11.5rem)] font-semibold uppercase leading-none tracking-[-0.05em]" key={step.id}>{step.title}</span>
            ))}
          </div>
        </div>
        <p className="max-w-2xl text-lg leading-8 text-[#aaa59a]">New builds, existing websites, one feature, or ongoing support. I can join the project wherever the work starts.</p>
      </div>
    </section>
  );
}
