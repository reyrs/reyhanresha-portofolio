import { useEffect, useLayoutEffect, useRef } from "react";
import { profile } from "../data";
import { gsap, SplitText, scrollToTarget, reduceMotion } from "../lib/scroll";
import { useJakartaTime, useMagnetic } from "../lib/hooks";
import Scramble from "../components/Scramble";
import { ArrowDown, Download } from "../components/Icons";
import InteractiveProfileCard from "../components/InteractiveProfileCard";

export default function Hero({ ready }) {
  const root = useRef(null);
  const time = useJakartaTime();
  const cta = useMagnetic(0.25);

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
          <span data-shatter="block" className="font-mono text-xs font-medium uppercase tracking-[0.14em] text-[#1d1d1f]">
            {profile.status}
          </span>

          <div data-shatter="block" className="font-mono text-xs text-[#86868b] flex items-center gap-3">
            <span>{profile.location}</span>
            <span className="text-black/20">·</span>
            <span className="tabular-nums font-medium text-[#1d1d1f]">{time} WIB</span>
          </div>
        </div>

        {/* Main 2-Column Hero Grid */}
        <div className="grid gap-12 lg:grid-cols-12 lg:items-center">
          {/* Left Column: Clear High-Contrast Headline & Pitch */}
          <div className="lg:col-span-7">
            <p className="mb-5 font-mono text-xs font-medium uppercase tracking-[0.14em] text-[#86868b]" data-hero-fade data-shatter="chars">
              Fullstack · AI Agents · SDET Precision
            </p>

            <h1 className="display text-[clamp(2.6rem,5.6vw,5.5rem)] text-[#1d1d1f] font-bold leading-[1.08] tracking-tight py-1">
              <span data-hero-line data-shatter="chars" className="block apple-headline-gradient pb-1.5 pt-0.5">
                Reyhan Resha
              </span>
              <span data-hero-line data-shatter="chars" className="block text-[#1d1d1f] pb-1.5">
                Sasmita<span className="text-black">.</span>
              </span>
            </h1>

            <p className="mt-6 max-w-[50ch] text-lg sm:text-xl leading-relaxed text-[#6e6e73]" data-hero-fade data-shatter="chars">
              Engineering <Scramble words={profile.builds} /> with Next.js, Three.js, and autonomous AI systems, hardened with the test rigor of an SDET at <strong className="font-semibold text-[#1d1d1f]">PT Bank UOB Indonesia</strong>.
            </p>

            {/* Apple Button-in-Button Action CTAs */}
            <div className="mt-10 flex flex-wrap items-center gap-4" data-hero-fade>
              <a
                ref={cta}
                data-shatter="block"
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
                data-shatter="block"
                download="Reyhan_Resha_Sasmita_CV.pdf"
                className="btn btn-apple-ghost px-5 py-2.5 rounded-full gap-2.5"
              >
                <span>Download CV</span>
                <Download />
              </a>
            </div>

            {/* Apple Tech Focus Tag Strip */}
            <div className="mt-12 pt-8 border-t border-black/[0.08] flex flex-wrap items-center gap-2.5" data-hero-fade>
              <span data-shatter="chars" className="font-mono text-xs uppercase tracking-wider text-[#86868b] mr-2">Core Focus:</span>
              {["Claude MCP", "Three.js", "Next.js", "React", "Python", "SDET QA"].map((tech) => (
                <span key={tech} data-shatter="block" className="tag text-[#1d1d1f] border-black/[0.08] bg-black/[0.04]">
                  {tech}
                </span>
              ))}
            </div>
          </div>

          {/* Right Column: Apple Hardware Profile Card with Interactive 3D Physics */}
          <div className="lg:col-span-5 flex justify-center lg:justify-end relative" data-hero-card>
            <InteractiveProfileCard />
          </div>
        </div>

        {/* Scroll Cue at Bottom */}
        <div className="mt-16 flex items-center justify-between gap-4 pt-6 border-t border-black/[0.08]" data-hero-fade>
          <span data-shatter="block" className="font-mono text-xs uppercase tracking-wider text-[#86868b] flex items-center gap-3">
            <span aria-hidden="true" className="relative block h-8 w-px overflow-hidden bg-black/20">
              <span
                className="absolute inset-0 bg-black"
                style={{ animation: "scroll-cue 2.2s cubic-bezier(0.65,0,0.35,1) infinite" }}
              />
            </span>
            Scroll to explore
          </span>
          <span data-shatter="block" className="font-mono text-xs text-[#86868b] hidden sm:block">
            Jakarta Time: {time} WIB
          </span>
        </div>
      </div>
    </section>
  );
}
