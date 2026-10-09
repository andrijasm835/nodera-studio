"use client";

import { useRef } from "react";
import { useLanguage } from "@/components/i18n/LanguageProvider";
import { siteContent } from "@/content/site";
import { gsap, useGsapScene } from "@/lib/useGsapScene";

export function ServicesScene() {
  const scope = useRef<HTMLElement>(null);
  const { language } = useLanguage();
  const { services, servicesIntro } = siteContent[language];

  useGsapScene(scope, () => {
    const isMobile = window.matchMedia("(max-width: 767px)").matches;
    const track = scope.current?.querySelector<HTMLElement>(".service-track");
    const viewport = scope.current?.querySelector<HTMLElement>(".service-viewport");
    const items = gsap.utils.toArray<HTMLElement>(".service-item", scope.current ?? undefined);

    if (!track || !viewport || items.length === 0) return;

    const getOffsetFor = (item: HTMLElement) => {
      const viewportCenter = viewport.clientHeight * 0.5;
      const itemCenter = item.offsetTop + item.offsetHeight * 0.5;
      return viewportCenter - itemCenter;
    };

    gsap.set(items, { opacity: 0.38 });
    gsap.set(items[0], { opacity: 1 });
    gsap.set(track, { y: getOffsetFor(items[0]) });

    const entrance = gsap.timeline({
      scrollTrigger: {
        trigger: scope.current,
        start: "top bottom",
        end: isMobile ? "top 60%" : "top 52%",
        scrub: 0.55,
        invalidateOnRefresh: true,
      },
    });

    entrance
      .fromTo(".services-content", { y: isMobile ? -56 : -92 }, { y: 0, duration: 0.64, ease: "power1.inOut" }, 0)
      .fromTo(".services-heading", { autoAlpha: 0 }, { autoAlpha: 1, duration: 0.5, ease: "power2.out" }, 0)
      .fromTo(".service-viewport", { autoAlpha: 0 }, { autoAlpha: 1, duration: 0.58, ease: "power2.out" }, 0.06);

    const tl = gsap.timeline({
      scrollTrigger: {
        trigger: scope.current,
        start: "top top",
        end: `+=${(items.length - 1) * (isMobile ? 78 : 74)}%`,
        scrub: isMobile ? 1.05 : 1,
        pin: true,
        anticipatePin: 1,
        invalidateOnRefresh: true,
      },
    });

    items.slice(1).forEach((item, transitionIndex) => {
      const itemIndex = transitionIndex + 1;

      tl.to(track, { y: () => getOffsetFor(item), duration: 0.55, ease: "power1.inOut" }, transitionIndex)
        .to(items, { opacity: 0.38, duration: 0.22, ease: "power1.out" }, transitionIndex)
        .to(item, { opacity: 1, duration: 0.28, ease: "power1.out" }, transitionIndex)
        .to(".service-orbit", { rotate: itemIndex * 34, scale: 1 + itemIndex * 0.025, duration: 0.55, ease: "power1.inOut" }, transitionIndex);
    });

    return () => {
      entrance.kill();
      tl.kill();
    };
  });

  return (
    <section id="services" ref={scope} className="scene overflow-hidden bg-[#f1eee5] px-4 py-10 text-[#090907] sm:px-6 md:py-24 lg:px-8">
      <div className="services-content grid min-h-[calc(100svh-5rem)] content-center gap-5 md:min-h-[calc(100svh-12rem)] md:gap-10 lg:grid-cols-[0.78fr_1.22fr] lg:items-center lg:gap-14">
        <div className="services-heading">
          <p className="font-mono text-xs uppercase tracking-[0.32em] text-[#64702d]">{servicesIntro.label}</p>
          <h2 className="mt-4 max-w-[10ch] text-[clamp(2.65rem,12vw,3.2rem)] font-semibold uppercase leading-[0.84] tracking-[-0.04em] md:mt-5 md:max-w-[9ch] md:text-[clamp(3.2rem,7.4vw,7.8rem)]">{servicesIntro.title}</h2>
          <p className="mt-4 max-w-md text-base leading-6 text-black/62 md:mt-7 md:text-lg md:leading-8">{servicesIntro.copy}</p>
        </div>
        <div className="service-viewport relative h-[52svh] min-h-[320px] overflow-hidden border-l border-black/15 pl-5 md:h-[68svh] md:min-h-[500px] md:pl-8">
          <div className="service-orbit pointer-events-none absolute right-0 top-10 h-72 w-72 border border-black/15">
            <div className="absolute left-1/2 top-0 h-5 w-5 -translate-x-1/2 -translate-y-1/2 bg-[var(--acid)]" />
          </div>
          <div className="service-track space-y-14 py-[14svh] will-change-transform md:space-y-20 md:py-[18svh]">
            {services.map((service) => (
              <article className="service-item grid min-h-[24svh] gap-3 will-change-opacity md:min-h-[30svh] md:grid-cols-[6rem_1fr] md:gap-4" key={service.id}>
                <p className="font-mono text-sm text-black/55">{service.id}</p>
                <div>
                  <h3 className="text-[clamp(2rem,10vw,2.75rem)] font-semibold uppercase leading-[0.86] tracking-[-0.04em] md:text-[clamp(2.2rem,6vw,5.8rem)]">{service.title}</h3>
                  <p className="mt-3 max-w-2xl text-lg leading-7 md:mt-4 md:text-xl md:leading-8">{service.short}</p>
                  <p className="mt-2 max-w-xl text-sm leading-6 text-black/58 md:mt-3 md:text-base md:leading-7">{service.detail}</p>
                </div>
              </article>
            ))}
          </div>
        </div>
      </div>
    </section>
  );
}
