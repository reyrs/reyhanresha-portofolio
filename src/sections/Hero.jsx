import { useEffect, useLayoutEffect, useRef } from "react";
import { profile } from "../data";
import { gsap, SplitText, scrollToTarget, reduceMotion } from "../lib/scroll";
import { useJakartaTime, useMagnetic } from "../lib/hooks";
import Scramble from "../components/Scramble";
import { ArrowDown, Download } from "../components/Icons";

export default function Hero({ ready }) {
  const root = useRef(null);
  const time = useJakartaTime();
  const cta = useMagnetic(0.25);
  const cardRef = useMagnetic(0.15);

  useLayoutEffect(() => {
    if (reduceMotion) return;
    const ctx = gsap.context(() => {
      gsap.set("[data-hero-fade]", { autoAlpha: 0, y: 20 });
      gsap.set("[data-hero-card]", { autoAlpha: 0, scale: 0.95, y: 30 });
      gsap.set("h1", { autoAlpha: 0 });
    }, root);
    return () => ctx.revert();
  }, []);

  useEffect(() => {
    if (!ready || reduceMotion) return;
    const ctx = gsap.context(() => {
      gsap.set("h1", { autoAlpha: 1 });
      const split = SplitText.create("[data-hero-line]", { type: "words", mask: false });
      const tl = gsap.timeline({ defaults: { ease: "expo.out" }, onComplete: () => split.revert() });

      tl.from(split.words, { y: 35, autoAlpha: 0, duration: 1.0, stagger: 0.04 })
        .to("[data-hero-fade]", { autoAlpha: 1, y: 0, duration: 0.9, stagger: 0.06 }, 0.25)
        .to("[data-hero-card]", { autoAlpha: 1, scale: 1, y: 0, duration: 1.2, ease: "power3.out" }, 0.35);

      gsap.to("[data-hero-inner]", {
        yPercent: -10,
        autoAlpha: 0.3,
        ease: "none",
        scrollTrigger: { trigger: root.current, start: "top top", end: "bottom 20%", scrub: true },
      });
    }, root);
    return () => ctx.revert();
  }, [ready]);

  return (
    <section id="top" ref={root} className="relative flex min-h-[100dvh] flex-col justify-start pt-32 sm:pt-36 lg:pt-40 pb-16 lg:pb-24 bg-white" aria-label="Intro">
      <div data-hero-inner className="shell flex flex-1 flex-col justify-between">
        {/* Top Status & Timestamp Bar */}
        <div className="flex flex-wrap items-center justify-between gap-4 pb-6 sm:pb-8 border-b border-black/[0.08] mt-2 sm:mt-4 mb-8 sm:mb-12" data-hero-fade>
          <div className="inline-flex items-center gap-2.5 rounded-full border border-black/10 bg-black/[0.04] px-4 py-1.5 shadow-sm">
            <span className="relative flex h-2 w-2">
              <span className="absolute inline-flex h-full w-full animate-ping rounded-full bg-black opacity-40" />
              <span className="relative inline-flex h-2 w-2 rounded-full bg-black" />
            </span>
            <span className="font-mono text-xs font-semibold text-[#1d1d1f] tracking-wide uppercase">
              {profile.status}
            </span>
          </div>

          <div className="font-mono text-xs text-[#86868b] flex items-center gap-3">
            <span>{profile.location}</span>
            <span className="text-black/20">·</span>
            <span className="tabular-nums font-medium text-[#1d1d1f]">{time} WIB</span>
          </div>
        </div>

        {/* Main 2-Column Hero Grid */}
        <div className="grid gap-12 lg:grid-cols-12 lg:items-center">
          {/* Left Column: Clear High-Contrast Headline & Pitch */}
          <div className="lg:col-span-7">
            {/* Apple Micro Eyebrow */}
            <div className="mb-4 inline-flex items-center gap-2 rounded-full border border-black/[0.08] bg-black/[0.04] px-3.5 py-1 backdrop-blur-md shadow-sm" data-hero-fade>
              <span className="h-1.5 w-1.5 rounded-full bg-black shadow-[0_0_4px_rgba(0,0,0,0.3)]" />
              <span className="font-mono text-[11px] font-medium uppercase tracking-widest text-[#1d1d1f]">
                Fullstack · AI Agents · SDET Precision
              </span>
            </div>

            <h1 className="display text-[clamp(2.6rem,5.6vw,5.5rem)] text-[#1d1d1f] font-bold leading-[1.08] tracking-tight py-1">
              <span data-hero-line className="block apple-headline-gradient pb-1.5 pt-0.5">
                Reyhan Resha
              </span>
              <span data-hero-line className="block text-[#1d1d1f] pb-1.5">
                Sasmita<span className="text-black">.</span>
              </span>
            </h1>

            <p className="mt-6 max-w-[50ch] text-lg sm:text-xl leading-relaxed text-[#6e6e73]" data-hero-fade>
              Engineering <Scramble words={profile.builds} /> with Next.js, Three.js, and autonomous AI systems, hardened with the test rigor of an SDET at <strong className="font-semibold text-[#1d1d1f]">PT Bank UOB Indonesia</strong>.
            </p>

            {/* Apple Button-in-Button Action CTAs */}
            <div className="mt-10 flex flex-wrap items-center gap-4" data-hero-fade>
              <a
                ref={cta}
                href="#work"
                onClick={(e) => {
                  e.preventDefault();
                  scrollToTarget("#work");
                }}
                className="group btn btn-apple-primary px-6 py-2.5 rounded-full gap-3 shadow-md"
              >
                <span>Explore Projects</span>
                <span className="flex h-7 w-7 items-center justify-center rounded-full bg-white text-black text-xs transition-transform duration-300 group-hover:translate-y-0.5">
                  <ArrowDown />
                </span>
              </a>

              <a
                href={profile.cv}
                download="Reyhan_Resha_Sasmita_CV.pdf"
                className="btn btn-apple-ghost px-5 py-2.5 rounded-full gap-2.5"
              >
                <span>Download CV</span>
                <Download />
              </a>
            </div>

            {/* Apple Tech Focus Tag Strip */}
            <div className="mt-12 pt-8 border-t border-black/[0.08] flex flex-wrap items-center gap-2.5" data-hero-fade>
              <span className="font-mono text-xs uppercase tracking-wider text-[#86868b] mr-2">Core Focus:</span>
              {["Claude MCP", "Three.js", "Next.js", "React", "Python", "SDET QA"].map((tech) => (
                <span key={tech} className="tag text-[#1d1d1f] border-black/[0.08] bg-black/[0.04]">
                  {tech}
                </span>
              ))}
            </div>
          </div>

          {/* Right Column: Apple Double-Bezel Hardware Profile Card */}
          <div className="lg:col-span-5 flex justify-center lg:justify-end relative" data-hero-card>
            <div
              ref={cardRef}
              className="apple-card relative z-10 w-full max-w-[380px] sm:max-w-[400px] p-2 hover:shadow-[0_20px_50px_rgba(0,0,0,0.1)] transition-all duration-500"
            >
              <div className="apple-card-inner relative p-2 overflow-hidden bg-white">
                {/* Photo Frame Container */}
                <div className="relative aspect-[4/4.8] w-full overflow-hidden rounded-[20px] bg-[#f5f5f7] border border-black/[0.08]">
                  <img
                    src={profile.photo}
                    alt={profile.name}
                    className="h-full w-full object-cover object-top transition-transform duration-700 hover:scale-105"
                    onError={(e) => {
                      e.currentTarget.src = "/assets/hero-img.webp";
                    }}
                  />
                  {/* Subtle soft dark vignette */}
                  <div className="absolute inset-0 bg-gradient-to-t from-black/80 via-transparent to-transparent pointer-events-none" />

                  {/* Overlaid Badge */}
                  <div className="absolute bottom-4 left-4 right-4 text-white">
                    <p className="text-base font-semibold tracking-tight text-white">{profile.name}</p>
                    <p className="font-mono text-xs text-white/80">CCIT, Universitas Indonesia</p>
                  </div>
                </div>

                {/* Floating Chip 1: SDET Experience */}
                <div className="absolute -top-3 -right-3 sm:-right-4 rounded-2xl border border-black/10 bg-white/95 px-3.5 py-2 shadow-lg backdrop-blur-xl flex items-center gap-2.5">
                  <span className="flex h-7 w-7 items-center justify-center rounded-xl bg-black text-white text-xs">
                    🛡️
                  </span>
                  <div>
                    <p className="font-mono text-[9px] uppercase tracking-wider text-[#86868b]">Experience</p>
                    <p className="text-xs font-semibold text-[#1d1d1f]">SDET @ Bank UOB</p>
                  </div>
                </div>

                {/* Floating Chip 2: AI Agents & Three.js */}
                <div className="absolute -bottom-3 -left-3 sm:-left-4 rounded-2xl border border-black/10 bg-white/95 px-3.5 py-2 shadow-lg backdrop-blur-xl flex items-center gap-2.5">
                  <span className="flex h-7 w-7 items-center justify-center rounded-xl bg-black text-white text-xs font-mono">
                    ✦
                  </span>
                  <div>
                    <p className="font-mono text-[9px] uppercase tracking-wider text-[#86868b]">Specialization</p>
                    <p className="text-xs font-semibold text-[#1d1d1f]">Claude MCP &amp; Three.js</p>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>

        {/* Scroll Cue at Bottom */}
        <div className="mt-16 flex items-center justify-between gap-4 pt-6 border-t border-black/[0.08]" data-hero-fade>
          <span className="font-mono text-xs uppercase tracking-wider text-[#86868b] flex items-center gap-3">
            <span aria-hidden="true" className="relative block h-8 w-px overflow-hidden bg-black/20">
              <span
                className="absolute inset-0 bg-black"
                style={{ animation: "scroll-cue 2.2s cubic-bezier(0.65,0,0.35,1) infinite" }}
              />
            </span>
            Scroll to explore
          </span>
          <span className="font-mono text-xs text-[#86868b] hidden sm:block">
            Jakarta Time: {time} WIB
          </span>
        </div>
      </div>
    </section>
  );
}
