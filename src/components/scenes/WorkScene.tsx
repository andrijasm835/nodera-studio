"use client";

import Image from "next/image";
import { useRef } from "react";
import { projects } from "@/content/site";
import { gsap, useGsapScene } from "@/lib/useGsapScene";

export function WorkScene() {
  const scope = useRef<HTMLElement>(null);

  useGsapScene(scope, () => {
    const panels = gsap.utils.toArray<HTMLElement>(".work-panel", scope.current ?? undefined);
    gsap.set(panels, { yPercent: 110, autoAlpha: 0, scale: 1.02 });
    gsap.set(panels[0], { yPercent: 0, autoAlpha: 1, scale: 1 });
    gsap.set(".work-image", { scale: 1.05 });

    const tl = gsap.timeline({
      scrollTrigger: {
        trigger: scope.current,
        start: "top top",
        end: `+=${Math.max(1, panels.length - 1) * 115}%`,
        scrub: 1,
        pin: true,
        anticipatePin: 1,
      },
    });

    panels.forEach((panel, index) => {
      tl.to(panel.querySelectorAll(".work-image"), { scale: 1, duration: 0.9, ease: "power1.inOut" }, index);
    });

    for (let index = 1; index < panels.length; index += 1) {
      tl.to(panels[index - 1], { yPercent: -72, autoAlpha: 0.2, scale: 0.96, duration: 0.78, ease: "power1.inOut" }, index - 1)
        .to(panels[index], { yPercent: 0, autoAlpha: 1, scale: 1, duration: 0.78, ease: "power1.inOut" }, index - 1);
    }

    return () => tl.kill();
  });

  return (
    <section id="work" ref={scope} className="scene overflow-hidden px-4 py-24 sm:px-6 lg:px-8">
      <div className="mb-8 flex items-end justify-between gap-6">
        <div>
          <p className="font-mono text-xs uppercase tracking-[0.32em] text-[var(--acid)]">Selected work</p>
          <h2 className="mt-4 text-[clamp(3rem,9vw,9rem)] font-semibold uppercase leading-[0.82] tracking-[-0.05em]">Proof of craft</h2>
        </div>
        <p className="hidden max-w-sm text-right text-sm leading-6 text-[#aaa59a] md:block">Two recent builds, both shaped around motion, responsiveness, and a stronger business presence.</p>
      </div>
      <div className="relative h-[72svh] min-h-[580px] overflow-hidden">
        {projects.map((project) => (
          <article className="work-panel panel-shadow absolute inset-0 grid overflow-hidden bg-[#14140f] md:grid-cols-[0.9fr_1.1fr]" key={project.id}>
            <div className="relative flex flex-col justify-between border border-white/12 p-5 sm:p-8">
              <div className="flex justify-between font-mono text-xs uppercase tracking-[0.22em] text-[#aaa59a]">
                <span>{project.id}</span>
                <span>{project.year}</span>
              </div>
              <div>
                <p className="mb-4 font-mono text-xs uppercase tracking-[0.22em]" style={{ color: project.accent }}>{project.type}</p>
                <h3 className="max-w-[8ch] text-[clamp(3rem,9vw,8.5rem)] font-semibold uppercase leading-[0.78] tracking-[-0.055em]">{project.title}</h3>
              </div>
              <div>
                <p className="max-w-md text-lg leading-8 text-[#c7c2b6]">{project.description}</p>
                {project.technologies ? (
                  <ul className="mt-5 flex flex-wrap gap-2">
                    {project.technologies.map((technology) => (
                      <li className="border border-white/18 px-3 py-2 font-mono text-[10px] uppercase tracking-[0.18em] text-[#e8e3d7]" key={technology}>{technology}</li>
                    ))}
                  </ul>
                ) : null}
              </div>
            </div>
            <div className="relative min-h-72 overflow-hidden border border-l-0 border-white/12 bg-[#0b0b08]">
              {project.desktopImage ? (
                <Image
                  src={project.desktopImage}
                  alt={`${project.title} desktop website preview`}
                  fill
                  sizes="(max-width: 767px) 100vw, 58vw"
                  className="work-image object-cover opacity-90"
                  priority={project.id === "01"}
                />
              ) : null}
              <div className="absolute inset-0 bg-[linear-gradient(90deg,rgba(11,11,8,0.42),transparent_42%,rgba(11,11,8,0.2)),linear-gradient(180deg,transparent,rgba(11,11,8,0.44))]" />
              {project.mobileImage ? (
                <div className="absolute bottom-6 right-6 h-[54%] w-[28%] overflow-hidden border border-white/18 bg-[#111] shadow-2xl max-sm:h-[44%] max-sm:w-[34%]">
                  <Image
                    src={project.mobileImage}
                    alt={`${project.title} mobile website preview`}
                    fill
                    sizes="(max-width: 767px) 34vw, 18vw"
                    className="work-image object-cover"
                  />
                </div>
              ) : null}
              <div className="absolute left-6 top-6 font-mono text-xs uppercase tracking-[0.28em] text-white/62">{project.type}</div>
              <div className="absolute bottom-6 left-6 h-3 w-28" style={{ backgroundColor: project.accent }} />
            </div>
          </article>
        ))}
      </div>
    </section>
  );
}
