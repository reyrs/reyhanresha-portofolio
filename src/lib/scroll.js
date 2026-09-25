import Lenis from "lenis";
import { gsap } from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";
import { SplitText } from "gsap/SplitText";

gsap.registerPlugin(ScrollTrigger, SplitText);

export const reduceMotion =
  typeof window !== "undefined" && window.matchMedia("(prefers-reduced-motion: reduce)").matches;

export const finePointer =
  typeof window !== "undefined" && window.matchMedia("(pointer: fine)").matches;

let lenis = null;

// Smooth scroll + ScrollTrigger jalan di satu ticker GSAP (satu requestAnimationFrame untuk semua)
export function initScroll() {
  if (reduceMotion || lenis) return lenis;
  lenis = new Lenis({
    lerp: 0.075,
    wheelMultiplier: 0.95,
    touchMultiplier: 1.5,
    smoothWheel: true,
  });
  lenis.on("scroll", ScrollTrigger.update);
  gsap.ticker.add(raf);
  gsap.ticker.lagSmoothing(0);
  return lenis;
}

function raf(time) {
  lenis?.raf(time * 1000);
}

export function destroyScroll() {
  gsap.ticker.remove(raf);
  lenis?.destroy();
  lenis = null;
}

export function getLenis() {
  return lenis;
}

export function scrollToTarget(target) {
  const el = typeof target === "string" ? document.querySelector(target) : target;
  if (!el) return;
  if (lenis) lenis.scrollTo(el, { duration: 1.4 });
  else el.scrollIntoView({ behavior: reduceMotion ? "auto" : "smooth" });
}

export function lockScroll(locked) {
  if (lenis) locked ? lenis.stop() : lenis.start();
  document.documentElement.classList.toggle("is-locked", locked);
}

export { gsap, ScrollTrigger, SplitText };
