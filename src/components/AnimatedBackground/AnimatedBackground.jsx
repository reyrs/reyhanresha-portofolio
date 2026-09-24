import { useEffect, useRef } from "react";
import { prefersReducedMotion } from "../../hooks/useInViewport";

const LINK_DIST = 120;
const LINK_DIST_SQ = LINK_DIST * LINK_DIST;
// Lines are drawn in a few opacity buckets so each bucket is one stroke() call
// instead of one stroke() per pair.
const ALPHA_BUCKETS = 4;

const AnimatedBackground = () => {
  const canvasRef = useRef(null);

  useEffect(() => {
    const canvas = canvasRef.current;
    if (!canvas) return;

    const ctx = canvas.getContext("2d", { alpha: true });
    const reduceMotion = prefersReducedMotion();
    let animationFrameId = null;
    let particles = [];
    let width = 0;
    let height = 0;

    const makeParticle = () => ({
      x: Math.random() * width,
      y: Math.random() * height,
      size: Math.random() * 2 + 0.5,
      speedX: Math.random() * 0.5 - 0.25,
      speedY: Math.random() * 0.5 - 0.25,
      color: `hsla(${Math.random() > 0.5 ? 45 : 35}, 100%, 50%, ${Math.random() * 0.5 + 0.1})`,
    });

    const setup = () => {
      width = window.innerWidth;
      height = window.innerHeight;
      canvas.width = width;
      canvas.height = height;
      // Fewer particles on small screens; pair checks grow with n^2
      const count = Math.min(60, Math.floor((width * height) / 25000));
      particles = Array.from({ length: count }, makeParticle);
    };

    const draw = () => {
      ctx.clearRect(0, 0, width, height);

      const buckets = Array.from({ length: ALPHA_BUCKETS }, () => []);
      for (let i = 0; i < particles.length; i++) {
        const a = particles[i];
        for (let j = i + 1; j < particles.length; j++) {
          const b = particles[j];
          const dx = a.x - b.x;
          const dy = a.y - b.y;
          const distSq = dx * dx + dy * dy;
          if (distSq < LINK_DIST_SQ) {
            const strength = 1 - Math.sqrt(distSq) / LINK_DIST;
            const bucket = Math.min(ALPHA_BUCKETS - 1, Math.floor(strength * ALPHA_BUCKETS));
            buckets[bucket].push(a.x, a.y, b.x, b.y);
          }
        }
      }

      ctx.lineWidth = 0.5;
      buckets.forEach((lines, k) => {
        if (!lines.length) return;
        ctx.strokeStyle = `rgba(255, 184, 0, ${(0.1 * (k + 0.5)) / ALPHA_BUCKETS})`;
        ctx.beginPath();
        for (let n = 0; n < lines.length; n += 4) {
          ctx.moveTo(lines[n], lines[n + 1]);
          ctx.lineTo(lines[n + 2], lines[n + 3]);
        }
        ctx.stroke();
      });

      for (const p of particles) {
        ctx.beginPath();
        ctx.arc(p.x, p.y, p.size, 0, Math.PI * 2);
        ctx.fillStyle = p.color;
        ctx.fill();
      }
    };

    const step = () => {
      for (const p of particles) {
        p.x += p.speedX;
        p.y += p.speedY;
        if (p.x > width) p.x = 0;
        else if (p.x < 0) p.x = width;
        if (p.y > height) p.y = 0;
        else if (p.y < 0) p.y = height;
      }
    };

    const loop = () => {
      step();
      draw();
      animationFrameId = requestAnimationFrame(loop);
    };

    const start = () => {
      if (reduceMotion) {
        draw();
        return;
      }
      if (animationFrameId === null) animationFrameId = requestAnimationFrame(loop);
    };

    const stop = () => {
      if (animationFrameId !== null) cancelAnimationFrame(animationFrameId);
      animationFrameId = null;
    };

    setup();
    start();

    let resizeTimer;
    const handleResize = () => {
      clearTimeout(resizeTimer);
      resizeTimer = setTimeout(() => {
        setup();
        if (reduceMotion) draw();
      }, 150);
    };

    const handleVisibility = () => {
      if (document.visibilityState === "visible") start();
      else stop();
    };

    window.addEventListener("resize", handleResize);
    document.addEventListener("visibilitychange", handleVisibility);

    return () => {
      stop();
      clearTimeout(resizeTimer);
      window.removeEventListener("resize", handleResize);
      document.removeEventListener("visibilitychange", handleVisibility);
    };
  }, []);

  return (
    <>
      <canvas
        ref={canvasRef}
        className="fixed inset-0 pointer-events-none z-0"
        style={{ opacity: 0.6 }}
      />
      {/* Gradient Overlay: radial gradients instead of blur filters, which are costly to repaint */}
      <div className="fixed inset-0 pointer-events-none z-0">
        <div
          className="absolute top-0 left-1/4 w-[36rem] h-[36rem] -translate-x-1/4 -translate-y-1/4"
          style={{ background: "radial-gradient(circle, rgba(245,158,11,0.10) 0%, transparent 65%)" }}
        />
        <div
          className="absolute bottom-1/4 right-1/4 w-[28rem] h-[28rem] translate-x-1/4 translate-y-1/4"
          style={{ background: "radial-gradient(circle, rgba(249,115,22,0.10) 0%, transparent 65%)" }}
        />
      </div>
    </>
  );
};

// Gradient Orb Component for Hero
export const GradientOrb = ({ className = "" }) => {
  return (
    <div className={`absolute pointer-events-none ${className}`}>
      <div
        className="w-[32rem] h-[32rem] animate-pulse motion-reduce:animate-none will-change-[opacity]"
        style={{ background: "radial-gradient(circle, rgba(245,158,11,0.18) 0%, rgba(249,115,22,0.08) 40%, transparent 70%)" }}
      />
    </div>
  );
};

export default AnimatedBackground;
