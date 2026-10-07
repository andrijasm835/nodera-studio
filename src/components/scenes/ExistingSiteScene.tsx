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
      },
    });
    tl.fromTo(".existing-line", { scaleX: 0 }, { scaleX: 1, transformOrigin: "left", stagger: 0.12, ease: "none" }, 0)
      .fromTo(".existing-copy", { y: 50, opacity: 0 }, { y: 0, opacity: 1, ease: "none" }, 0.1);
    return () => tl.kill();
  });

  return (
    <section ref={scope} className="scene flex items-center bg-[#c8ff5f] px-4 py-28 text-[#090907] sm:px-6 lg:px-8">
      <div className="mx-auto w-full max-w-6xl">
        <div className="mb-8 space-y-3">
          <div className="existing-line h-px bg-black" />
          <div className="existing-line h-px bg-black/55" />
          <div className="existing-line h-px bg-black/25" />
        </div>
        <div className="existing-copy grid gap-8 lg:grid-cols-[1.15fr_0.85fr] lg:items-end">
          <h2 className="text-[clamp(3.8rem,11vw,11rem)] font-semibold uppercase leading-[0.78] tracking-[-0.055em]">Already have a website?</h2>
          <p className="max-w-xl text-xl leading-8">I can improve what is already there. Redesigns, performance work, custom features, fixes, integrations, and ongoing development without forcing a complete rebuild.</p>
        </div>
      </div>
    </section>
  );
}
