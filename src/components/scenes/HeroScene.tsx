"use client";

import { useRef } from "react";
import { gsap, useGsapScene } from "@/lib/useGsapScene";

export function HeroScene() {
  const scope = useRef<HTMLElement>(null);

  useGsapScene(scope, () => {
    const intro = gsap.timeline({ defaults: { ease: "power3.out" } });
    intro
      .fromTo(".hero-kicker", { autoAlpha: 0, y: 18 }, { autoAlpha: 1, y: 0, duration: 0.65 })
      .fromTo(".hero-line", { yPercent: 112, rotate: 3 }, { yPercent: 0, rotate: 0, duration: 0.9, stagger: 0.08 }, 0.12)
      .fromTo(".hero-copy", { autoAlpha: 0, y: 22 }, { autoAlpha: 1, y: 0, duration: 0.7 }, 0.62)
      .fromTo(".hero-surface", { autoAlpha: 0, y: 80, rotateX: 18 }, { autoAlpha: 1, y: 0, rotateX: 0, duration: 1, stagger: 0.08 }, 0.2);

    const scroll = gsap.timeline({
      scrollTrigger: {
        trigger: scope.current,
        start: "top top",
        end: "+=120%",
        scrub: 1,
        pin: true,
        anticipatePin: 1,
      },
    });
    scroll
      .to(".hero-title", { scale: 0.88, yPercent: -16, opacity: 0.36, ease: "none" }, 0)
      .to(".hero-surface-b", { xPercent: 6, yPercent: 12, rotate: 8, ease: "none" }, 0)
      .to(".hero-surface-c", { yPercent: -24, scale: 1.08, ease: "none" }, 0)
      .to(".hero-copy", { opacity: 0, y: -28, ease: "none" }, 0.3);

    return () => {
      intro.kill();
      scroll.kill();
    };
  });

  return (
    <section id="top" ref={scope} className="scene flex min-h-[100svh] items-end overflow-hidden px-4 pb-8 pt-28 sm:px-6 lg:px-8 lg:pb-10">
      <div className="node-grid absolute inset-0 bg-[radial-gradient(circle_at_62%_38%,rgba(111,220,255,0.1),transparent_24rem),radial-gradient(circle_at_20%_70%,rgba(200,255,95,0.1),transparent_22rem)] opacity-80 [--node-grid-size:88px] [--node-line:rgba(241,238,229,0.045)]" />

      <div
        className="identity-surface node-field panel-shadow absolute z-[2] min-w-44 border border-white/15 bg-[#f1eee5] p-4 text-[#090907] [--node-color:#090907] [transform:perspective(900px)_rotate(-6deg)]"
        style={{ right: "clamp(2rem, 8vw, 8rem)", top: "12svh", width: "clamp(11rem, 27vw, 27rem)", height: "clamp(15rem, 31svh, 24rem)" }}
      >
        <div className="absolute -left-4 top-1/3 h-px w-10 bg-[#c8ff5f]" />
        <div className="absolute -bottom-4 right-1/4 h-10 w-px bg-[#c8ff5f]" />
        <div className="grid h-full grid-rows-[0.6fr_1fr_0.58fr] gap-3">
          <div className="border-b border-black/18">
            <p className="font-mono text-[10px] uppercase tracking-[0.2em] opacity-55">Nodera / System</p>
          </div>
          <div className="grid grid-cols-[1.25fr_0.75fr] gap-3">
            <div className="bg-[#090907]" />
            <div className="node-grid border border-black/18 [--node-grid-size:22px] [--node-line:rgba(9,9,7,0.12)]" />
          </div>
          <div className="grid grid-cols-[0.8fr_0.8fr_1fr] gap-2">
            <span className="bg-[#c8ff5f]" />
            <span className="border border-black/18" />
            <span className="bg-[#090907]" />
          </div>
        </div>
      </div>

      <div className="hero-surface hero-surface-b node-field absolute bottom-[22svh] right-[18vw] z-[2] h-28 w-56 border border-[var(--acid)] bg-[#c8ff5f] p-4 text-[#090907] [--node-color:#090907] [transform:perspective(900px)_rotate(8deg)] max-sm:hidden">
        <p className="font-mono text-xs uppercase tracking-[0.18em]">Designed to launch clean. Built to keep moving.</p>
      </div>

      <div className="hero-surface hero-surface-c node-field absolute left-[7vw] top-[20svh] z-[2] hidden h-[34svh] w-[18vw] border border-white/10 bg-white/[0.035] [--node-color:#c8ff5f] backdrop-blur md:block">
        <div className="absolute inset-x-6 top-8 h-px bg-white/22" />
        <div className="absolute bottom-8 left-6 right-12 h-24 border border-white/12" />
      </div>

      <div className="relative z-10 w-full">
        <p className="hero-kicker mb-5 max-w-[20rem] font-mono text-xs uppercase tracking-[0.32em] text-[var(--acid)] max-sm:max-w-[17rem] max-sm:tracking-[0.22em]">Independent Web Development Studio</p>
        <h1 className="hero-title max-w-[14ch] overflow-hidden text-[clamp(4.25rem,12vw,12rem)] font-semibold uppercase leading-[0.78] tracking-[-0.04em] max-sm:text-[clamp(3rem,14vw,3.65rem)]">
          <span className="block overflow-hidden"><span className="hero-line block">Websites</span></span>
          <span className="block overflow-hidden"><span className="hero-line block">built to</span></span>
          <span className="block overflow-hidden font-serif font-normal italic normal-case tracking-[-0.03em]"><span className="hero-line block">perform.</span></span>
        </h1>
        <div className="hero-copy mt-8 grid gap-5 border-t border-white/15 pt-5 text-sm text-[#c7c2b6] sm:grid-cols-[1fr_1.1fr] lg:ml-auto lg:max-w-3xl">
          <p className="font-mono uppercase tracking-[0.18em] text-[#f1eee5]">Nodera Studio</p>
          <p className="max-w-xl text-base leading-7">Custom websites, e-commerce builds, feature work, and support for businesses that need the web to be faster, clearer, and easier to use.</p>
        </div>
      </div>
    </section>
  );
}
