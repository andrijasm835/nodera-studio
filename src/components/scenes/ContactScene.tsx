"use client";

import { useRef } from "react";
import { InquiryForm } from "@/components/contact/InquiryForm";
import { siteConfig } from "@/content/site";
import { gsap, useGsapScene } from "@/lib/useGsapScene";

export function ContactScene() {
  const scope = useRef<HTMLElement>(null);

  useGsapScene(scope, () => {
    const tl = gsap.timeline({
      scrollTrigger: {
        trigger: scope.current,
        start: "top 85%",
        end: "top top",
        scrub: 1,
        invalidateOnRefresh: true,
      },
    });
    tl.fromTo(".contact-wipe", { scaleX: 0 }, { scaleX: 1, transformOrigin: "left", ease: "none" }, 0)
      .fromTo(".contact-title", { yPercent: 24, opacity: 0.2 }, { yPercent: 0, opacity: 1, ease: "none" }, 0.1)
      .fromTo(".contact-rail", { xPercent: -38 }, { xPercent: 0, ease: "none" }, 0);
    return () => tl.kill();
  });

  return (
    <section id="contact" ref={scope} className="scene node-grid overflow-hidden bg-[#f1eee5] px-4 pb-8 pt-24 text-[#090907] [--node-grid-size:92px] [--node-line:rgba(9,9,7,0.08)] sm:px-6 sm:pt-28 lg:px-8 lg:pt-28">
      <div className="contact-wipe absolute left-0 top-0 h-2 w-full bg-[#090907]" />
      <div className="contact-rail whitespace-nowrap border-y border-black py-3 font-mono text-xs uppercase tracking-[0.32em]">
        Project inquiry / Websites / E-commerce / Maintenance / Features / Performance /
      </div>
      <div className="mt-8 grid gap-10 sm:mt-10 lg:grid-cols-[minmax(0,44fr)_minmax(0,56fr)] lg:gap-0">
        <div className="border-t border-black pt-6 lg:pr-10 xl:pr-14">
          <p className="font-mono text-xs uppercase tracking-[0.32em] text-black/55">Contact / {siteConfig.location}</p>
          <h2 className="contact-title mt-6 max-w-[11ch] text-[clamp(3.6rem,10.5vw,7.5rem)] font-semibold uppercase leading-[0.82] tracking-[-0.05em] lg:text-[clamp(3.6rem,6.2vw,7.5rem)]">Let’s build something worth visiting.</h2>
        </div>
        <div className="lg:pl-8 xl:pl-12">
          <div className="border border-black bg-[#f8f6ef] shadow-[8px_8px_0_rgba(9,9,7,0.14)]">
            <div className="flex h-10 items-center justify-between bg-[#090907] px-4 font-mono text-[9px] uppercase tracking-[0.24em] text-[#f1eee5]">
              <span>Project inquiry / Nodera</span>
              <span className="flex items-center gap-2">
                <span className="h-2 w-2 bg-[#c8ff3d]" aria-hidden="true" />
                Open / 01
              </span>
            </div>
            <div className="p-5 sm:p-7 lg:p-8">
              <InquiryForm />
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}
