import { useEffect, useRef } from "react";
import { buildProcess } from "../data";
import { gsap, SplitText, reduceMotion } from "../lib/scroll";
import { createFrameLoader } from "../lib/frames";

// Frame hasil gabungan 3 video (wireframe -> laptop -> code -> website) di public/assets/sequence.
// Mobile pakai set yang lebih kecil dan lebih sedikit frame supaya hemat kuota.
const SEQUENCES = {
  desktop: { dir: "d", count: 282, width: 1280, height: 720 },
  mobile: { dir: "m", count: 188, width: 960, height: 540 },
};
const STILLS = [1, 94, 188]; // frame set mobile untuk versi reduced motion
const pad = (n, len = 2) => String(n).padStart(len, "0");
const frameUrl = (dir, n) => `/assets/sequence/${dir}/f${pad(n, 3)}.webp`;

// Timeline pin berdurasi 10: frame jalan dari FRAME_AT selama FRAME_LEN, sisanya jeda di frame akhir
const FRAME_AT = 0.4;
const FRAME_LEN = 9.2;
const at = (f) => FRAME_AT + f * FRAME_LEN;

const { steps } = buildProcess;

function pickSequence() {
  const small = window.matchMedia("(max-width: 767px)").matches;
  return small || navigator.connection?.saveData ? SEQUENCES.mobile : SEQUENCES.desktop;
}

export default function Process() {
  const root = useRef(null);
  const stage = useRef(null);
  const canvasRef = useRef(null);

  useEffect(() => {
    if (reduceMotion) return;
    const seq = pickSequence();
    const canvas = canvasRef.current;
    const ctx2d = canvas.getContext("2d", { alpha: false });
    const state = { frame: 0 };
    const box = { x: 0, y: 0, w: 0, h: 0 };
    let fades = [];
    let drawnKey = "";
    let drawnIndex = -1;

    // Gambar frame di posisi scroll. Posisi di antara dua frame di-blend supaya scrub tetap halus.
    const render = () => {
      const base = Math.floor(state.frame);
      const mix = state.frame - base;
      const shown = loader.nearest(base);
      if (shown < 0) return;
      const next = shown === base && mix > 0.04 ? loader.get(base + 1) : null;
      const key = `${shown}:${next ? Math.round(mix * 24) : 0}`;
      if (key === drawnKey) return;
      drawnKey = key;
      drawnIndex = shown;
      ctx2d.globalAlpha = 1;
      ctx2d.fillStyle = "#000";
      ctx2d.fillRect(0, 0, canvas.width, canvas.height);
      ctx2d.drawImage(loader.get(shown), box.x, box.y, box.w, box.h);
      if (next) {
        ctx2d.globalAlpha = mix;
        ctx2d.drawImage(next, box.x, box.y, box.w, box.h);
      }
      ctx2d.globalAlpha = 1;
      for (const [fill, x, y, w, h] of fades) {
        ctx2d.fillStyle = fill;
        ctx2d.fillRect(x, y, w, h);
      }
    };

    // Tepi frame yang jatuh di dalam canvas di-feather ke hitam, supaya code yang menyentuh
    // tepi video tidak terlihat terpotong garis lurus.
    const buildFades = () => {
      fades = [];
      const edge = (x0, y0, x1, y1, rect) => {
        const g = ctx2d.createLinearGradient(x0, y0, x1, y1);
        g.addColorStop(0, "#000");
        g.addColorStop(1, "rgba(0,0,0,0)");
        fades.push([g, ...rect]);
      };
      if (box.y > 0.5) {
        const band = box.h * 0.14;
        const bottom = box.y + box.h;
        edge(0, box.y, 0, box.y + band, [0, box.y, canvas.width, band]);
        edge(0, bottom, 0, bottom - band, [0, bottom - band, canvas.width, band]);
      }
      if (box.x > 0.5) {
        const band = box.w * 0.08;
        const right = box.x + box.w;
        edge(box.x, 0, box.x + band, 0, [box.x, 0, band, canvas.height]);
        edge(right, 0, right - band, 0, [right - band, 0, band, canvas.height]);
      }
    };

    const loader = createFrameLoader({
      count: seq.count,
      src: (i) => frameUrl(seq.dir, i + 1),
      onLoad: (i) => {
        const target = Math.floor(state.frame);
        // gambar ulang kalau frame yang baru masuk lebih dekat ke posisi scroll daripada yang tampil
        if (drawnIndex < 0 || i === target + 1 || Math.abs(i - target) < Math.abs(drawnIndex - target)) {
          drawnKey = "";
          render();
        }
      },
    });

    const resize = () => {
      const w = stage.current.clientWidth;
      const h = stage.current.clientHeight;
      const dpr = Math.min(window.devicePixelRatio || 1, 2, Math.max(1, 1920 / w));
      canvas.width = Math.round(w * dpr);
      canvas.height = Math.round(h * dpr);
      // Background video hitam pekat, jadi sisa area canvas di luar frame menyatu. Landscape cukup
      // contain (objek tidak terlalu besar di belakang teks); portrait diperbesar supaya laptop
      // tidak kecil, tapi tidak sampai cover penuh yang bakal memotong laptop.
      const contain = Math.min(w / seq.width, h / seq.height);
      const scale = contain * (h > w ? 1.45 : 1) * dpr;
      box.w = seq.width * scale;
      box.h = seq.height * scale;
      box.x = (canvas.width - box.w) / 2;
      box.y = (canvas.height - box.h) * (h > w ? 0.36 : 0.5);
      ctx2d.imageSmoothingQuality = "high";
      buildFades();
      drawnKey = "";
      render();
    };
    const ro = new ResizeObserver(resize);
    ro.observe(stage.current);

    // frame pertama sudah dimuat duluan; sisanya menunggu halaman selesai load supaya tidak rebutan bandwidth
    const begin = () => loader.start();
    if (document.readyState === "complete") begin();
    else window.addEventListener("load", begin, { once: true });

    const ctx = gsap.context(() => {
      const stepEls = gsap.utils.toArray("[data-step]");
      const labels = gsap.utils.toArray("[data-progress-label]");
      const bars = gsap.utils.toArray("[data-progress-bar]");
      const parts = stepEls.map((el) => ({
        words: SplitText.create(el.querySelector("[data-step-title]"), { type: "words" }).words,
        rest: el.querySelectorAll("[data-step-fade]"),
      }));

      parts.forEach(({ words, rest }) => {
        gsap.set(words, { y: 34, autoAlpha: 0 });
        gsap.set(rest, { y: 16, autoAlpha: 0 });
      });
      gsap.set(labels, { opacity: 0.35 });
      gsap.set(labels[0], { opacity: 1 });
      gsap.set(bars, { scaleX: 0 });

      // d = pengali durasi, supaya reveal bisa dipadatkan di timeline yang pendek
      const reveal = (tl, i, pos, d = 1) => {
        const { words, rest } = parts[i];
        tl.to(words, { y: 0, autoAlpha: 1, duration: 0.55 * d, stagger: 0.05 * d, ease: "power3.out" }, pos).to(
          rest,
          { y: 0, autoAlpha: 1, duration: 0.5 * d, stagger: 0.08 * d, ease: "power2.out" },
          pos + 0.2 * d,
        );
      };
      const conceal = (tl, i, pos) => {
        const { words, rest } = parts[i];
        tl.to(words, { y: -24, autoAlpha: 0, duration: 0.45, stagger: 0.03, ease: "power2.in" }, pos).to(
          rest,
          { y: -12, autoAlpha: 0, duration: 0.35, ease: "power2.in" },
          pos,
        );
      };

      // Masuk: kartu hitam membesar jadi full-bleed saat naik ke atas layar, caption pertama muncul
      const entry = gsap.timeline({
        scrollTrigger: { trigger: root.current, start: "top bottom", end: "top top", scrub: true },
      });
      entry
        .fromTo(
          stage.current,
          { clipPath: "inset(0% 4% 0% 4% round 32px)" },
          { clipPath: "inset(0% 0% 0% 0% round 0px)", ease: "none", duration: 1 },
          0,
        )
        .fromTo(canvas, { scale: 1.18 }, { scale: 1, ease: "none", duration: 1 }, 0);
      reveal(entry, 0, 0.5, 0.62);

      // Pin: scroll menggerakkan frame, caption dan progress per scene ikut berganti
      const tl = gsap.timeline({
        defaults: { ease: "none" },
        scrollTrigger: {
          trigger: root.current,
          start: "top top",
          end: () => `+=${window.innerHeight * 3.6}`,
          pin: stage.current,
          scrub: 0.6,
          invalidateOnRefresh: true,
        },
      });
      tl.to(
        state,
        {
          frame: seq.count - 1,
          duration: FRAME_LEN,
          onUpdate: render,
        },
        FRAME_AT,
      );

      let from = 0;
      steps.forEach((step, i) => {
        tl.to(bars[i], { scaleX: 1, duration: (step.until - from) * FRAME_LEN }, at(from));
        if (i > 0) {
          tl.to(labels[i], { opacity: 1, duration: 0.3 }, at(from));
          reveal(tl, i, at(from) + 0.15);
        }
        if (i < steps.length - 1) {
          tl.to(labels[i], { opacity: 0.35, duration: 0.3 }, at(step.until));
          conceal(tl, i, at(step.until) - 0.75);
        }
        from = step.until;
      });
      tl.to({}, { duration: 10 - (FRAME_AT + FRAME_LEN) }, FRAME_AT + FRAME_LEN);

      // Keluar: kartu menyusut lagi saat section lewat ke atas
      gsap.fromTo(
        stage.current,
        { clipPath: "inset(0% 0% 0% 0% round 0px)" },
        {
          clipPath: "inset(0% 4% 0% 4% round 32px)",
          ease: "none",
          immediateRender: false,
          scrollTrigger: { trigger: root.current, start: "bottom bottom", end: "bottom top", scrub: true },
        },
      );
    }, root);

    return () => {
      ctx.revert();
      ro.disconnect();
      window.removeEventListener("load", begin);
      loader.destroy();
    };
  }, []);

  if (reduceMotion) {
    return (
      <section id="process" aria-labelledby="process-title" className="relative bg-black py-24 text-white">
        <div className="shell">
          <h2 id="process-title" className="font-mono text-xs font-medium uppercase tracking-[0.14em] text-white/50">
            {buildProcess.label}
          </h2>
          <ol className="mt-10 grid gap-12 lg:grid-cols-3">
            {steps.map((s, i) => (
              <li key={s.id}>
                <img
                  src={frameUrl(SEQUENCES.mobile.dir, STILLS[i])}
                  alt=""
                  loading="lazy"
                  className="aspect-video w-full rounded-2xl object-cover"
                />
                <p className="mt-6 font-mono text-xs uppercase tracking-[0.14em] text-white/50">{s.label}</p>
                <h3 className="mt-3 text-3xl font-semibold leading-tight tracking-tight">
                  <span className="text-[#86868b]">{s.lead} </span>
                  {s.key}
                </h3>
                <p className="mt-3 leading-relaxed text-white/60">{s.body}</p>
              </li>
            ))}
          </ol>
        </div>
      </section>
    );
  }

  return (
    <section id="process" ref={root} aria-labelledby="process-title" className="relative bg-white">
      <div ref={stage} className="relative h-[100svh] w-full overflow-hidden bg-black text-white">
        <canvas ref={canvasRef} aria-hidden="true" className="absolute inset-0 h-full w-full will-change-transform" />

        {/* scrim atas & bawah supaya teks tetap terbaca di atas frame yang terang */}
        <div aria-hidden="true" className="pointer-events-none absolute inset-x-0 top-0 h-40 bg-gradient-to-b from-black/80 to-transparent" />
        <div aria-hidden="true" className="pointer-events-none absolute inset-x-0 bottom-0 h-[58%] bg-gradient-to-t from-black via-black/70 to-transparent" />

        <div className="shell relative flex h-full flex-col justify-between pt-24 pb-20 sm:pt-28 sm:pb-24 lg:pb-16">
          <h2 id="process-title" className="font-mono text-xs font-medium uppercase tracking-[0.14em] text-white/50">
            {buildProcess.label}
          </h2>

          <div className="flex flex-col gap-8 lg:flex-row lg:items-end lg:justify-between lg:gap-16">
            <div className="grid">
              {steps.map((s) => (
                <div key={s.id} data-step className="max-w-[36rem] [grid-area:1/1]">
                  <h3
                    data-step-title
                    className="text-[clamp(2rem,5vw,4.6rem)] font-semibold leading-[1.08] tracking-[-0.03em]"
                  >
                    <span className="text-[#86868b]">{s.lead} </span>
                    <span className="text-white">{s.key}</span>
                  </h3>
                  <p
                    data-step-fade
                    className="mt-5 max-w-[42ch] text-[0.95rem] leading-relaxed text-white/60 sm:text-lg"
                  >
                    {s.body}
                  </p>
                </div>
              ))}
            </div>

            <ol aria-hidden="true" className="flex w-full gap-3 lg:w-[22rem] lg:shrink-0">
              {steps.map((s) => (
                <li key={s.id} className="flex-1">
                  <span data-progress-label className="font-mono text-[10px] uppercase tracking-widest text-white">
                    {s.label}
                  </span>
                  <span className="mt-2.5 block h-[2px] overflow-hidden rounded-full bg-white/15">
                    <span data-progress-bar className="block h-full origin-left bg-white" />
                  </span>
                </li>
              ))}
            </ol>
          </div>
        </div>
      </div>
    </section>
  );
}
