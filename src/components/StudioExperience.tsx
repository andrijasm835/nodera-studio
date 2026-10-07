"use client";

import { useRef } from "react";
import { process, projects, services } from "@/content/site";
import { gsap, useGsapScene } from "@/lib/useGsapScene";

export function StudioExperience() {
  return (
    <main>
      <Nav />
      <HeroScene />
      <ServicesScene />
      <WorkScene />
      <ExistingSiteScene />
      <ProcessAboutScene />
      <ContactScene />
    </main>
  );
}

function Nav() {
  const scope = useRef<HTMLElement>(null);

  useGsapScene(scope, () => {
    const tl = gsap.timeline({ delay: 0.25 });
    tl.fromTo(scope.current, { autoAlpha: 0, y: -14 }, { autoAlpha: 1, y: 0, duration: 0.7, ease: "power3.out" });
    return () => tl.kill();
  });

  return (
    <nav ref={scope} className="fixed left-0 right-0 top-0 z-50 flex items-center justify-between px-4 py-4 text-[11px] uppercase tracking-[0.18em] text-[#f1eee5] mix-blend-difference sm:px-6 lg:px-8">
      <a href="#top" className="wordmark font-semibold">NODERA</a>
      <div className="hidden gap-5 sm:flex">
        <a href="#work">Work</a>
        <a href="#services">Services</a>
        <a href="#about">About</a>
        <a href="#contact">Contact</a>
      </div>
      <a href="mailto:hello@noderastudio.com" className="rounded-full border border-current px-3 py-2 text-[10px]">Inquiry</a>
    </nav>
  );
}

function HeroScene() {
  const scope = useRef<HTMLElement>(null);

  useGsapScene(scope, () => {
    const intro = gsap.timeline({ defaults: { ease: "power3.out" } });
    intro
      .fromTo(".hero-kicker", { autoAlpha: 0, y: 18 }, { autoAlpha: 1, y: 0, duration: 0.65 })
      .fromTo(".hero-line", { yPercent: 112, rotate: 3 }, { yPercent: 0, rotate: 0, duration: 0.9, stagger: 0.08 }, 0.12)
      .fromTo(".hero-copy", { autoAlpha: 0, y: 22 }, { autoAlpha: 1, y: 0, duration: 0.7 }, 0.62)
      .fromTo(".hero-plane", { autoAlpha: 0, y: 80, rotateX: 18 }, { autoAlpha: 1, y: 0, rotateX: 0, duration: 1 }, 0.22);

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
      .to(".hero-plane-a", { xPercent: -22, yPercent: -18, rotate: -8, ease: "none" }, 0)
      .to(".hero-plane-b", { xPercent: 28, yPercent: 20, rotate: 10, ease: "none" }, 0)
      .to(".hero-plane-c", { yPercent: -26, scale: 1.08, ease: "none" }, 0)
      .to(".hero-copy", { opacity: 0, y: -28, ease: "none" }, 0.3);

    return () => {
      intro.kill();
      scroll.kill();
    };
  });

  return (
    <section id="top" ref={scope} className="scene flex min-h-[100svh] items-end overflow-hidden px-4 pb-8 pt-28 sm:px-6 lg:px-8 lg:pb-10">
      <div className="absolute inset-0 bg-[radial-gradient(circle_at_62%_38%,rgba(111,220,255,0.13),transparent_24rem),radial-gradient(circle_at_20%_70%,rgba(255,143,95,0.11),transparent_22rem)]" />
      <div className="hero-plane hero-plane-a panel-shadow absolute right-[8vw] top-[16svh] h-[28svh] w-[26vw] min-w-44 border border-white/15 bg-[#f1eee5] p-4 text-[#090907] [transform:perspective(900px)_rotate(-6deg)] max-sm:right-8 max-sm:top-[15svh] max-sm:h-[28svh] max-sm:min-w-0 max-sm:w-44">
        <p className="font-mono text-[10px] uppercase tracking-[0.2em] opacity-60">build.log</p>
        <div className="mt-8 space-y-2 font-mono text-xs">
          <p>performance: 98</p>
          <p>motion: intentional</p>
          <p>support: ongoing</p>
        </div>
      </div>
      <div className="hero-plane hero-plane-b absolute bottom-[22svh] right-[18vw] h-28 w-56 border border-[var(--acid)] bg-[#c8ff5f] p-4 text-[#090907] [transform:perspective(900px)_rotate(8deg)] max-sm:hidden">
        <p className="font-mono text-xs">custom websites / e-commerce / maintenance</p>
      </div>
      <div className="hero-plane hero-plane-c absolute left-[7vw] top-[20svh] hidden h-[34svh] w-[18vw] border border-white/10 bg-white/[0.035] backdrop-blur md:block" />
      <div className="relative z-10 w-full">
        <p className="hero-kicker mb-5 font-mono text-xs uppercase tracking-[0.32em] text-[var(--acid)]">Independent Web Development Studio</p>
        <h1 className="hero-title max-w-[14ch] overflow-hidden text-[clamp(4.25rem,14vw,15rem)] font-semibold uppercase leading-[0.78] tracking-[-0.04em] max-sm:text-[clamp(3.35rem,17vw,4.5rem)]">
          <span className="block overflow-hidden"><span className="hero-line block">Websites</span></span>
          <span className="block overflow-hidden"><span className="hero-line block">built to</span></span>
          <span className="block overflow-hidden font-serif font-normal italic normal-case tracking-[-0.03em]"><span className="hero-line block">perform.</span></span>
        </h1>
        <div className="hero-copy mt-8 grid gap-5 border-t border-white/15 pt-5 text-sm text-[#c7c2b6] sm:grid-cols-[1fr_1.1fr] lg:ml-auto lg:max-w-3xl">
          <p className="font-mono uppercase tracking-[0.18em] text-[#f1eee5]">Nodera Studio</p>
          <p className="max-w-xl text-base leading-7">Custom websites, e-commerce experiences, modifications, and ongoing development for businesses that want the web to feel sharper, faster, and more useful.</p>
        </div>
      </div>
    </section>
  );
}

function ServicesScene() {
  const scope = useRef<HTMLElement>(null);

  useGsapScene(scope, () => {
    const items = gsap.utils.toArray<HTMLElement>(".service-item");
    gsap.set(items, { opacity: 0.18 });
    gsap.set(items[0], { opacity: 1 });

    const tl = gsap.timeline({
      scrollTrigger: {
        trigger: scope.current,
        start: "top top",
        end: `+=${items.length * 78}%`,
        scrub: 1,
        pin: true,
        anticipatePin: 1,
      },
    });

    items.forEach((item, index) => {
      tl.to(item, { opacity: 1, y: 0, duration: 0.3 }, index)
        .to(".service-track", { yPercent: -index * 25, duration: 0.5, ease: "power1.inOut" }, index)
        .to(".service-orbit", { rotate: index * 32, scale: 1 + index * 0.025, duration: 0.5 }, index);
      if (index > 0) tl.to(items[index - 1], { opacity: 0.18, duration: 0.2 }, index);
    });

    return () => tl.kill();
  });

  return (
    <section id="services" ref={scope} className="scene overflow-hidden bg-[#f1eee5] px-4 py-24 text-[#090907] sm:px-6 lg:px-8">
      <div className="grid min-h-[calc(100svh-12rem)] gap-10 lg:grid-cols-[0.85fr_1.15fr] lg:items-center">
        <div>
          <p className="font-mono text-xs uppercase tracking-[0.32em] text-[#697530]">Services</p>
          <h2 className="mt-5 max-w-[9ch] text-[clamp(3.2rem,8vw,8.6rem)] font-semibold uppercase leading-[0.82] tracking-[-0.045em]">Not a template pipeline.</h2>
          <p className="mt-7 max-w-md text-lg leading-8 text-black/62">The work spans from complete builds to the careful improvements that make an existing website finally feel alive.</p>
        </div>
        <div className="relative h-[70svh] min-h-[520px] overflow-hidden border-l border-black/15 pl-5 sm:pl-8">
          <div className="service-orbit pointer-events-none absolute right-0 top-10 h-72 w-72 border border-black/15">
            <div className="absolute left-1/2 top-0 h-5 w-5 -translate-x-1/2 -translate-y-1/2 bg-[var(--acid)]" />
          </div>
          <div className="service-track space-y-20 pt-[18svh]">
            {services.map((service) => (
              <article className="service-item grid gap-4 will-change-transform sm:grid-cols-[6rem_1fr]" key={service.id}>
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

function WorkScene() {
  const scope = useRef<HTMLElement>(null);

  useGsapScene(scope, () => {
    const panels = gsap.utils.toArray<HTMLElement>(".work-panel");
    gsap.set(panels, { yPercent: 110, autoAlpha: 0 });
    gsap.set(panels[0], { yPercent: 0, autoAlpha: 1 });

    const tl = gsap.timeline({
      scrollTrigger: {
        trigger: scope.current,
        start: "top top",
        end: `+=${(panels.length - 1) * 105}%`,
        scrub: 1,
        pin: true,
        anticipatePin: 1,
      },
    });

    for (let index = 1; index < panels.length; index += 1) {
      tl.to(panels[index - 1], { yPercent: -80, autoAlpha: 0.24, scale: 0.96, duration: 0.75, ease: "power1.inOut" }, index - 1)
        .to(panels[index], { yPercent: 0, autoAlpha: 1, duration: 0.75, ease: "power1.inOut" }, index - 1);
    }

    return () => tl.kill();
  });

  return (
    <section id="work" ref={scope} className="scene overflow-hidden px-4 py-24 sm:px-6 lg:px-8">
      <div className="mb-8 flex items-end justify-between gap-6">
        <div>
          <p className="font-mono text-xs uppercase tracking-[0.32em] text-[var(--acid)]">Selected work</p>
          <h2 className="mt-4 text-[clamp(3rem,9vw,9rem)] font-semibold uppercase leading-[0.82] tracking-[-0.05em]">Case previews</h2>
        </div>
        <p className="hidden max-w-sm text-right text-sm leading-6 text-[#aaa59a] md:block">Placeholder projects for now, structured like real case studies so future work can drop in cleanly.</p>
      </div>
      <div className="relative h-[72svh] min-h-[560px] overflow-hidden">
        {projects.map((project, index) => (
          <article className="work-panel panel-shadow absolute inset-0 grid overflow-hidden bg-[#14140f] md:grid-cols-[0.95fr_1.05fr]" key={project.id}>
            <div className="relative flex flex-col justify-between border border-white/12 p-5 sm:p-8">
              <div className="flex justify-between font-mono text-xs uppercase tracking-[0.22em] text-[#aaa59a]">
                <span>{project.id}</span>
                <span>{project.year}</span>
              </div>
              <div>
                <p className="mb-4 font-mono text-xs uppercase tracking-[0.22em]" style={{ color: project.color }}>{project.type}</p>
                <h3 className="max-w-[8ch] text-[clamp(3rem,9vw,8.5rem)] font-semibold uppercase leading-[0.78] tracking-[-0.055em]">{project.title}</h3>
              </div>
              <p className="max-w-md text-lg leading-8 text-[#c7c2b6]">{project.description}</p>
            </div>
            <div className="relative min-h-72 overflow-hidden border border-l-0 border-white/12 bg-[#0b0b08]">
              <div className="absolute inset-[8%] border border-white/12" />
              <div className="absolute left-[10%] top-[12%] h-[54%] w-[62%] border border-white/16 bg-white/[0.045]" />
              <div className="absolute bottom-[14%] right-[10%] h-[38%] w-[48%] border" style={{ borderColor: project.color, backgroundColor: `${project.color}22` }} />
              <div className="absolute left-0 top-1/2 h-px w-full bg-white/15" />
              <div className="absolute left-1/2 top-0 h-full w-px bg-white/15" />
              <div className="absolute bottom-6 left-6 font-mono text-xs uppercase tracking-[0.28em] text-white/42">Image system / replace later</div>
              <div className="absolute right-8 top-8 h-24 w-24 rounded-full border border-white/15" style={{ backgroundColor: `${project.color}18` }} />
              <div className="absolute inset-0 bg-[linear-gradient(120deg,transparent,rgba(255,255,255,0.08),transparent)] opacity-50" style={{ transform: `translateX(${index * 18}%)` }} />
            </div>
          </article>
        ))}
      </div>
    </section>
  );
}

function ExistingSiteScene() {
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
          <p className="max-w-xl text-xl leading-8">I also maintain, improve, and extend existing websites. Small fixes, custom functionality, redesigns, performance work, and ongoing development all count as real studio work.</p>
        </div>
      </div>
    </section>
  );
}

function ProcessAboutScene() {
  return (
    <section id="about" className="px-4 py-28 sm:px-6 lg:px-8">
      <div className="grid gap-16 lg:grid-cols-[0.8fr_1.2fr]">
        <div>
          <p className="font-mono text-xs uppercase tracking-[0.32em] text-[var(--acid)]">About</p>
          <p className="mt-5 max-w-lg text-2xl leading-10 text-[#d8d3c8]">Nodera Studio is an independent development studio focused on fast, polished, carefully crafted digital experiences.</p>
        </div>
        <div>
          <div className="grid border-t border-white/15">
            {process.map((step, index) => (
              <div className="grid grid-cols-[4rem_1fr] border-b border-white/15 py-6" key={step}>
                <span className="font-mono text-xs text-[#aaa59a]">{String(index + 1).padStart(2, "0")}</span>
                <span className="text-[clamp(2rem,5vw,5rem)] font-semibold uppercase leading-none tracking-[-0.04em]">{step}</span>
              </div>
            ))}
          </div>
          <p className="mt-8 max-w-2xl text-lg leading-8 text-[#aaa59a]">Projects can start as a complete build, a store upgrade, a single difficult feature, or a steady support relationship. The common thread is clear direction, precise frontend work, and a website that feels better to use.</p>
        </div>
      </div>
    </section>
  );
}

function ContactScene() {
  const scope = useRef<HTMLElement>(null);

  useGsapScene(scope, () => {
    const tl = gsap.timeline({
      scrollTrigger: {
        trigger: scope.current,
        start: "top 80%",
        end: "top 20%",
        scrub: 1,
      },
    });
    tl.fromTo(".contact-title", { yPercent: 30, opacity: 0.2 }, { yPercent: 0, opacity: 1, ease: "none" })
      .fromTo(".contact-rail", { xPercent: -38 }, { xPercent: 0, ease: "none" }, 0);
    return () => tl.kill();
  });

  return (
    <section id="contact" ref={scope} className="scene flex flex-col justify-between overflow-hidden bg-[#f1eee5] px-4 py-8 text-[#090907] sm:px-6 lg:px-8">
      <div className="contact-rail whitespace-nowrap border-y border-black py-3 font-mono text-xs uppercase tracking-[0.32em]">
        Project inquiry / Custom websites / E-commerce / Maintenance / Feature development / Performance /
      </div>
      <div className="my-16">
        <p className="font-mono text-xs uppercase tracking-[0.32em] text-black/55">Contact</p>
        <h2 className="contact-title mt-5 max-w-[11ch] text-[clamp(4.2rem,13vw,15rem)] font-semibold uppercase leading-[0.78] tracking-[-0.06em]">Let’s build something worth visiting.</h2>
      </div>
      <div className="grid gap-5 border-t border-black/20 pt-6 text-lg sm:grid-cols-3">
        <a href="mailto:hello@noderastudio.com">hello@noderastudio.com</a>
        <a href="https://instagram.com/" target="_blank" rel="noreferrer">@noderastudio</a>
        <a href="mailto:hello@noderastudio.com?subject=Project%20inquiry">Start a project inquiry</a>
      </div>
    </section>
  );
}
