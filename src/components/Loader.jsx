import { useEffect, useRef, useState } from "react";
import { gsap, lockScroll } from "../lib/scroll";

// Intro singkat (~1.6 detik). Tidak menunggu aset apa pun, jadi tidak bisa "macet".
export default function Loader({ onDone }) {
  const root = useRef(null);
  const count = useRef(null);
  const bar = useRef(null);
  const [gone, setGone] = useState(false);

  useEffect(() => {
    lockScroll(true);
    const n = { v: 0 };
    const tl = gsap.timeline({
      onComplete: () => {
        lockScroll(false);
        setGone(true);
      },
    });
    tl.to(n, {
      v: 100,
      duration: 1.1,
      ease: "power2.inOut",
      onUpdate: () => {
        if (count.current) count.current.textContent = String(Math.round(n.v)).padStart(3, "0");
      },
    })
      .to(bar.current, { scaleX: 1, duration: 1.1, ease: "power2.inOut" }, 0)
      .to("[data-pl-fade]", { autoAlpha: 0, y: -12, duration: 0.35, stagger: 0.04 }, "+=0.05")
      .add(() => onDone?.(), "-=0.1")
      .to(root.current, { clipPath: "inset(0% 0% 100% 0%)", duration: 0.9, ease: "expo.inOut" }, "<");

    return () => {
      tl.kill();
      lockScroll(false);
    };
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  if (gone) return null;

  return (
    <div
      ref={root}
      className="fixed inset-0 flex flex-col justify-between bg-white p-6 sm:p-10 text-[#1d1d1f]"
      style={{ zIndex: "var(--z-loader)", clipPath: "inset(0% 0% 0% 0%)" }}
      aria-hidden="true"
    >
      <div className="flex justify-between font-mono text-xs uppercase tracking-widest text-[#86868b]" data-pl-fade>
        <span>Reyhan Resha Sasmita</span>
        <span>Portfolio / 2026</span>
      </div>
      <div className="flex items-end justify-between gap-6">
        <p className="text-[clamp(1.5rem,3.5vw,2.75rem)] font-medium text-[#6e6e73] tracking-tight" data-pl-fade>
          Loading system architecture<span className="text-black">…</span>
        </p>
        <span
          ref={count}
          className="font-mono text-[clamp(4rem,14vw,11rem)] font-bold text-[#1d1d1f] leading-none tracking-tighter tabular-nums"
          data-pl-fade
        >
          000
        </span>
      </div>
      <span
        ref={bar}
        className="absolute bottom-0 left-0 h-1 w-full origin-left scale-x-0 bg-black"
      />
    </div>
  );
}
