import { useEffect, useRef } from "react";
import { gsap, finePointer, reduceMotion } from "../lib/scroll";

export default function CursorGlow() {
  const glowRef = useRef(null);

  useEffect(() => {
    if (!finePointer || reduceMotion) return;

    const el = glowRef.current;
    if (!el) return;

    // Use GSAP quickTo for 60fps/120fps hardware-accelerated inertia
    const xTo = gsap.quickTo(el, "x", { duration: 0.5, ease: "power3.out" });
    const yTo = gsap.quickTo(el, "y", { duration: 0.5, ease: "power3.out" });

    const handlePointerMove = (e) => {
      xTo(e.clientX);
      yTo(e.clientY);
      gsap.to(el, { opacity: 1, duration: 0.3, overwrite: "auto" });
    };

    const handlePointerLeave = () => {
      gsap.to(el, { opacity: 0, duration: 0.5, overwrite: "auto" });
    };

    window.addEventListener("pointermove", handlePointerMove, { passive: true });
    document.addEventListener("pointerleave", handlePointerLeave);

    return () => {
      window.removeEventListener("pointermove", handlePointerMove);
      document.removeEventListener("pointerleave", handlePointerLeave);
    };
  }, []);

  if (!finePointer || reduceMotion) return null;

  return (
    <div
      ref={glowRef}
      aria-hidden="true"
      className="pointer-events-none fixed top-0 left-0 -ml-44 -mt-44 h-88 w-88 rounded-full opacity-0 transition-opacity duration-300"
      style={{
        zIndex: 2,
        background: "radial-gradient(circle, rgba(0, 0, 0, 0.03) 0%, rgba(0, 0, 0, 0.01) 40%, transparent 70%)",
        willChange: "transform",
      }}
    />
  );
}
