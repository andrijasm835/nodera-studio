"use client";

import { useRef } from "react";
import { services } from "@/content/site";
import { gsap, useGsapScene } from "@/lib/useGsapScene";

export function ServicesScene() {
  const scope = useRef<HTMLElement>(null);

  useGsapScene(scope, () => {
    const track = scope.current?.querySelector<HTMLElement>(".service-track");
    const viewport = scope.current?.querySelector<HTMLElement>(".service-viewport");
    const items = gsap.utils.toArray<HTMLElement>(".service-item", scope.current ?? undefined);

    if (!track || !viewport || items.length === 0) return;

    const getOffsetFor = (item: HTMLElement) => {
      const viewportCenter = viewport.clientHeight * 0.5;
      const itemCenter = item.offsetTop + item.offsetHeight * 0.5;
      return viewportCenter - itemCenter;
    };

    gsap.set(items, { opacity: 0.32 });
    gsap.set(items[0], { opacity: 1 });
    gsap.set(track, { y: getOffsetFor(items[0]) });

    const tl = gsap.timeline({
      scrollTrigger: {
        trigger: scope.current,
        start: "top top",
        end: `+=${items.length * 82}%`,
        scrub: 1,
        pin: true,
        anticipatePin: 1,
        invalidateOnRefresh: true,
      },
    });

    items.forEach((item, index) => {
      tl.to(track, { y: () => getOffsetFor(item), duration: 0.55, ease: "power1.inOut" }, index)
        .to(items, { opacity: 0.32, duration: 0.22, ease: "power1.out" }, index)
        .to(item, { opacity: 1, duration: 0.28, ease: "power1.out" }, index)
        .to(".service-orbit", { rotate: index * 34, scale: 1 + index * 0.025, duration: 0.55, ease: "power1.inOut" }, index);
    });

    return () => tl.kill();
  });

  return (
    <section id="services" ref={scope} className="scene overflow-hidden bg-[#f1eee5] px-4 py-24 text-[#090907] sm:px-6 lg:px-8">
      <div className="grid min-h-[calc(100svh-12rem)] gap-10 lg:grid-cols-[0.85fr_1.15fr] lg:items-center">
        <div>
          <p className="font-mono text-xs uppercase tracking-[0.32em] text-[#697530]">Services</p>
          <h2 className="mt-5 max-w-[9ch] text-[clamp(3.2rem,8vw,8.6rem)] font-semibold uppercase leading-[0.82] tracking-[-0.045em]">Not a template pipeline.</h2>
          <p className="mt-7 max-w-md text-lg leading-8 text-black/62">I build new websites, improve existing ones, and handle the technical work that keeps them moving.</p>
        </div>
        <div className="service-viewport relative h-[70svh] min-h-[520px] overflow-hidden border-l border-black/15 pl-5 sm:pl-8">
          <div className="service-orbit pointer-events-none absolute right-0 top-10 h-72 w-72 border border-black/15">
            <div className="absolute left-1/2 top-0 h-5 w-5 -translate-x-1/2 -translate-y-1/2 bg-[var(--acid)]" />
          </div>
          <div className="service-track space-y-20 py-[18svh] will-change-transform">
            {services.map((service) => (
              <article className="service-item grid min-h-[30svh] gap-4 will-change-opacity sm:grid-cols-[6rem_1fr]" key={service.id}>
                <p className="font-mono text-sm text-black/45">{service.id}</p>
                <div>
                  <h3 className="text-[clamp(2.2rem,6vw,5.8rem)] font-semibold uppercase leading-[0.86] tracking-[-0.04em]">{service.title}</h3>
                  <p className="mt-4 max-w-2xl text-xl leading-8">{service.short}</p>
                  <p className="mt-3 max-w-xl text-base leading-7 text-black/58">{service.detail}</p>
                </div>
              </article>
            ))}
          </div>
        </div>
      </div>
    </section>
  );
}
