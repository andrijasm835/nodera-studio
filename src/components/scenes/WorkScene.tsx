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
    gsap.set(".work-info", { y: 18, autoAlpha: 0.45 });
    gsap.set(panels[0].querySelector(".work-info"), { y: 0, autoAlpha: 1 });
    gsap.set(".work-desktop", { y: 26, scale: 0.97, autoAlpha: 0 });
    gsap.set(".work-mobile", { y: 32, scale: 0.95, autoAlpha: 0 });
    gsap.set(".work-image", { scale: 1.035 });

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
      const start = index === 0 ? 0 : index * 1.15;

      if (index > 0) {
        tl.to(panels[index - 1], { yPercent: -72, autoAlpha: 0.2, scale: 0.96, duration: 0.62, ease: "power1.inOut" }, start - 0.58)
          .to(panel, { yPercent: 0, autoAlpha: 1, scale: 1, duration: 0.62, ease: "power1.inOut" }, start - 0.58);
      }

      tl.to(panel.querySelector(".work-info"), { y: 0, autoAlpha: 1, duration: 0.34, ease: "power2.out" }, start)
        .to(panel.querySelector(".work-desktop"), { y: 0, scale: 1, autoAlpha: 1, duration: 0.52, ease: "power2.out" }, start + 0.12)
        .to(panel.querySelector(".work-mobile"), { y: 0, scale: 1, autoAlpha: 1, duration: 0.46, ease: "power2.out" }, start + 0.25)
        .to(panel.querySelectorAll(".work-image"), { scale: 1, duration: 0.62, ease: "power1.out" }, start + 0.12);
    });

    return () => tl.kill();
  });

  return (
    <section id="work" ref={scope} className="scene node-grid overflow-hidden px-4 py-24 [--node-grid-size:96px] [--node-line:rgba(241,238,229,0.035)] sm:px-6 lg:px-8">
      <div className="mb-8 flex items-end justify-between gap-6">
        <div>
          <p className="font-mono text-xs uppercase tracking-[0.32em] text-[var(--acid)]">Selected work</p>
          <h2 className="mt-4 text-[clamp(3rem,9vw,9rem)] font-semibold uppercase leading-[0.82] tracking-[-0.05em]">Proof of craft</h2>
        </div>
        <p className="hidden max-w-sm text-right text-sm leading-6 text-[#aaa59a] md:block">Two recent builds with real motion systems, responsive UI, and practical business flows.</p>
      </div>
      <div className="relative h-[72svh] min-h-[580px] overflow-hidden">
        {projects.map((project) => (
          <article className="work-panel panel-shadow absolute inset-0 grid overflow-hidden bg-[#14140f] md:grid-cols-[0.9fr_1.1fr]" key={project.id}>
            <div className="work-info relative flex flex-col justify-between border border-white/12 p-5 sm:p-8">
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
                {project.liveUrl ? (
                  <a href={project.liveUrl} target="_blank" rel="noreferrer" className="mt-6 inline-block font-mono text-xs uppercase tracking-[0.22em]" style={{ color: project.accent }}>
                    View project ↗
                  </a>
                ) : null}
              </div>
            </div>
            <div className="node-field relative min-h-72 overflow-hidden border border-l-0 border-white/12 bg-[#0b0b08] p-5 [--node-color:var(--acid)] sm:p-8">
              <div className="absolute inset-0 bg-[radial-gradient(circle_at_74%_20%,rgba(200,255,95,0.08),transparent_22rem),linear-gradient(120deg,rgba(255,255,255,0.045),transparent_38%)]" />
              <div className="work-frame work-desktop absolute left-[7%] right-[11%] top-[12%] flex h-[58%] flex-col overflow-hidden border border-white/18 bg-[#f1eee5] shadow-[0_32px_90px_rgba(0,0,0,0.44)] sm:left-[8%] sm:right-[8%] sm:top-[13%] sm:h-[62%]">
                <div className="flex h-7 items-center gap-2 border-b border-black/15 bg-[#e8e2d5] px-3">
                  <span className="h-2 w-2 bg-[#090907]" />
                  <span className="h-2 w-2 border border-[#090907]/35" />
                  <span className="ml-auto h-px w-20 bg-[#090907]/20" />
                </div>
                <div className="relative min-h-0 flex-1">
                  {project.desktopImage ? (
                    <Image
                      src={project.desktopImage}
                      alt={`${project.title} desktop website preview`}
                      fill
                      sizes="(max-width: 767px) 86vw, 52vw"
                      className="work-image object-contain"
                      priority={project.id === "01"}
                    />
                  ) : null}
                </div>
              </div>
              {project.mobileImage ? (
                <div className="work-frame work-mobile absolute bottom-6 right-6 h-[46%] w-[25%] overflow-hidden border border-white/18 bg-[#111] shadow-2xl max-sm:h-[38%] max-sm:w-[34%]">
                  <Image
                    src={project.mobileImage}
                    alt={`${project.title} mobile website preview`}
                    fill
                    sizes="(max-width: 767px) 34vw, 18vw"
                    className="work-image object-contain"
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
