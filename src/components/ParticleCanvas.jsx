import { useEffect, useRef } from "react";
import { createParticleField } from "../gl/ParticleField";
import { gsap, ScrollTrigger, getLenis, reduceMotion } from "../lib/scroll";

// Canvas WebGL fixed di belakang semua konten. Bentuk partikel berganti mengikuti section
// yang punya atribut data-shape (About=1, Stack=2, Work=3, Experience=4, Contact=5).
export default function ParticleCanvas({ ready }) {
  const holder = useRef(null);
  const field = useRef(null);
  const readyRef = useRef(ready);
  const introStarted = useRef(false);

  const startIntro = () => {
    const f = field.current;
    if (!f || !readyRef.current || introStarted.current) return;
    introStarted.current = true;
    if (reduceMotion) {
      f.uniforms.uIntro.value = 1;
      return;
    }
    gsap.to(f.uniforms.uIntro, { value: 1, duration: 2.6, ease: "power2.out" });
  };

  useEffect(() => {
    readyRef.current = ready;
    startIntro();
  }, [ready]);

  useEffect(() => {
    // canvas dibuat di sini (bukan di JSX) supaya StrictMode/remount dapat konteks WebGL baru
    const canvas = document.createElement("canvas");
    canvas.className = "block h-full w-full";
    holder.current.appendChild(canvas);

    let disposed = false;
    let triggers = [];
    let dimTrigger = null;
    let tick = null;
    const onResize = () => field.current?.resize();

    createParticleField(canvas, { reduceMotion })
      .then((f) => {
        if (disposed) {
          f.destroy();
          return;
        }
        field.current = f;
        if (import.meta.env.DEV) window.__particles = f;
        triggers = [...document.querySelectorAll("[data-shape]")].map((el) =>
          ScrollTrigger.create({ trigger: el, start: "top 85%", end: "top 25%" }),
        );
        const dimEl = document.querySelector("[data-dim]");
        if (dimEl) dimTrigger = ScrollTrigger.create({ trigger: dimEl, start: "top 75%", end: "top 35%" });

        const baseAlpha = () => (window.innerWidth / window.innerHeight < 0.9 ? 0.55 : 1);
        tick = (_time, deltaMs) => {
          let morph = 0;
          for (const st of triggers) morph += st.progress;
          f.state.morph = morph;
          f.state.velocity = getLenis()?.velocity ?? 0;
          f.uniforms.uAlpha.value = baseAlpha() * (1 - (dimTrigger?.progress ?? 0) * 0.6);
          f.render(deltaMs / 1000);
        };
        gsap.ticker.add(tick);
        window.addEventListener("resize", onResize);
        holder.current?.classList.add("opacity-100");
        startIntro();
      })
      .catch(() => {
        // WebGL tidak tersedia: halaman tetap jalan tanpa partikel
        canvas.remove();
      });

    return () => {
      disposed = true;
      if (tick) gsap.ticker.remove(tick);
      triggers.forEach((t) => t.kill());
      dimTrigger?.kill();
      window.removeEventListener("resize", onResize);
      field.current?.destroy();
      field.current = null;
      introStarted.current = false;
      canvas.remove();
    };
  }, []);

  return (
    <div
      ref={holder}
      aria-hidden="true"
      className="pointer-events-none fixed inset-0 opacity-0 transition-opacity duration-1000"
      style={{ zIndex: "var(--z-canvas)" }}
    />
  );
}
