"use client";

import { useEffect } from "react";
import Lenis from "lenis";
import gsap from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";

const SmoothScroll = ({ children }) => {
  useEffect(() => {
    gsap.registerPlugin(ScrollTrigger);

    const isTouch =
      typeof window !== "undefined" &&
      (window.matchMedia("(hover: none), (pointer: coarse)").matches ||
        window.innerWidth < 1024);

    const lenis = new Lenis({
      duration: isTouch ? 1.0 : 1.2,
      easing: (t) => Math.min(1, 1.001 - Math.pow(2, -10 * t)),
      orientation: 'vertical',
      gestureOrientation: 'vertical',
      smoothWheel: true,
      wheelMultiplier: 1.0,
      touchMultiplier: 1.5,
    });

    if (typeof window !== "undefined") {
      window.__lenis = lenis;
    }

    lenis.on("scroll", ScrollTrigger.update);

    gsap.ticker.add((time) => {
      lenis.raf(time * 1000);
    });

    gsap.ticker.lagSmoothing(0);

    return () => {
      lenis.destroy();
      if (typeof window !== "undefined") {
        if (window.__lenis === lenis) {
          delete window.__lenis;
        }
      }
    };
  }, []);

  return children;
};

export default SmoothScroll;
