"use client";

import { useEffect } from "react";
import Lenis from "lenis";
import { gsap, ScrollTrigger } from "@/lib/useGsapScene";

export function SmoothScroll() {
  useEffect(() => {
    if (window.matchMedia("(prefers-reduced-motion: reduce)").matches) return;

    const lenis = new Lenis({
      duration: 1.08,
      easing: (t) => Math.min(1, 1.001 - Math.pow(2, -10 * t)),
      smoothWheel: true,
      wheelMultiplier: 0.92,
      touchMultiplier: 1,
      anchors: true,
    });

    const updateScrollTrigger = () => ScrollTrigger.update();
    const scrollToTop = () => lenis.scrollTo(0, { immediate: true });
    const saveScrollPosition = () => {
      window.history.replaceState(
        { ...window.history.state, noderaScrollY: window.scrollY },
        "",
      );
    };
    const restoreScrollPosition = () => {
      const savedPosition = window.history.state?.noderaScrollY;
      if (typeof savedPosition !== "number" || savedPosition <= 0) return;

      requestAnimationFrame(() => {
        ScrollTrigger.refresh();
        lenis.scrollTo(savedPosition, { immediate: true });
      });
    };
    const raf = (time: number) => {
      lenis.raf(time * 1000);
    };

    lenis.on("scroll", updateScrollTrigger);
    window.addEventListener("nodera:scroll-top", scrollToTop);
    window.addEventListener("pagehide", saveScrollPosition);
    window.addEventListener("beforeunload", saveScrollPosition);
    if (document.readyState === "complete") {
      restoreScrollPosition();
    } else {
      window.addEventListener("load", restoreScrollPosition, { once: true });
    }
    gsap.ticker.add(raf);
    gsap.ticker.lagSmoothing(0);

    return () => {
      lenis.off("scroll", updateScrollTrigger);
      window.removeEventListener("nodera:scroll-top", scrollToTop);
      window.removeEventListener("pagehide", saveScrollPosition);
      window.removeEventListener("beforeunload", saveScrollPosition);
      window.removeEventListener("load", restoreScrollPosition);
      gsap.ticker.remove(raf);
      lenis.destroy();
    };
  }, []);

  return null;
}
