"use client";

import { useRef } from "react";
import { gsap, useGsapScene } from "@/lib/useGsapScene";

export function ExistingSiteScene() {
  const scope = useRef<HTMLElement>(null);

  useGsapScene(scope, () => {
    const tl = gsap.timeline({
      scrollTrigger: {
        trigger: scope.current,
        start: "top 70%",
        end: "bottom 30%",
        scrub: 1,
        invalidateOnRefresh: true,
      },
    });
    tl.fromTo(".existing-line", { scaleX: 0 }, { scaleX: 1, transformOrigin: "left", stagger: 0.1, ease: "power1.inOut" }, 0)
      .fromTo(".existing-copy", { y: 42, opacity: 0.15 }, { y: 0, opacity: 1, ease: "power1.out" }, 0.12);
    return () => tl.kill();
  });

  return (
    <section id="existing-site" ref={scope} className="scene node-grid flex items-center bg-[#c8ff5f] px-4 py-24 text-[#090907] [--node-grid-size:88px] [--node-line:rgba(9,9,7,0.09)] sm:px-6 sm:py-28 lg:px-8">
      <div className="mx-auto w-full max-w-[78rem]">
        <div className="mb-8 space-y-3">
          <div className="existing-line h-px bg-black" />
          <div className="existing-line h-px bg-black/55" />
          <div className="existing-line h-px bg-black/25" />
        </div>
        <div className="existing-copy grid gap-8 lg:grid-cols-[1.2fr_0.8fr] lg:items-end lg:gap-14">
          <h2 className="max-w-[9ch] text-[clamp(3.8rem,10vw,9.8rem)] font-semibold uppercase leading-[0.8] tracking-[-0.05em]">Already have a website?</h2>
          <p className="max-w-xl text-xl leading-8">I can improve what is already there: redesigns, performance work, custom features, fixes, integrations, and ongoing development without forcing a rebuild.</p>
        </div>
      </div>
    </section>
  );
}
