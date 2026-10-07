"use client";

import { useEffect } from "react";
import Lenis from "lenis";
import { ScrollTrigger } from "@/lib/useGsapScene";

export function SmoothScroll() {
  useEffect(() => {
    if (window.matchMedia("(prefers-reduced-motion: reduce)").matches) return;

    const lenis = new Lenis({
      duration: 1.08,
      easing: (t) => Math.min(1, 1.001 - Math.pow(2, -10 * t)),
      smoothWheel: true,
      wheelMultiplier: 0.92,
      touchMultiplier: 1,
    });

    const raf = (time: number) => {
      lenis.raf(time);
    };

    lenis.on("scroll", ScrollTrigger.update);
    gsapTickerAdd(raf);

    return () => {
      lenis.off("scroll", ScrollTrigger.update);
      gsapTickerRemove(raf);
      lenis.destroy();
    };
  }, []);

  return null;
}

function gsapTickerAdd(callback: (time: number) => void) {
  import("@/lib/useGsapScene").then(({ gsap }) => {
    gsap.ticker.add(callback);
    gsap.ticker.lagSmoothing(0);
  });
}

function gsapTickerRemove(callback: (time: number) => void) {
  import("@/lib/useGsapScene").then(({ gsap }) => {
    gsap.ticker.remove(callback);
  });
}
