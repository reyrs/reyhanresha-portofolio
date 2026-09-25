import { useEffect, useRef, useState } from "react";
import { sections, profile } from "../data";
import { gsap, ScrollTrigger, scrollToTarget, lockScroll, reduceMotion } from "../lib/scroll";

export default function Nav() {
  const header = useRef(null);
  const progress = useRef(null);
  const menu = useRef(null);
  const menuButton = useRef(null);
  const [active, setActive] = useState(null);
  const [open, setOpen] = useState(false);

  useEffect(() => {
    const ctx = gsap.context(() => {
      // scroll progress line underneath header
      gsap.to(progress.current, {
        scaleX: 1,
        ease: "none",
        scrollTrigger: { start: 0, end: "max", scrub: 0.3 },
      });

      // header hide on scroll down, show on scroll up. Centering dipegang GSAP (xPercent), karena
      // tween transform GSAP menghapus `translate` dari class -translate-x-1/2 dan nav jadi bergeser.
      gsap.set(header.current, { xPercent: -50 });
      const hide = gsap.to(header.current, { yPercent: -110, duration: 0.45, ease: "power3.out", paused: true });
      ScrollTrigger.create({
        start: 0,
        end: "max",
        onUpdate: (self) => {
          if (self.direction === 1 && self.scroll() > 240) hide.play();
          else if (self.direction === -1) hide.reverse();
        },
      });

      sections.forEach(({ id }) => {
        ScrollTrigger.create({
          trigger: `#${id}`,
          start: "top 50%",
          end: "bottom 50%",
          onToggle: (self) => self.isActive && setActive(id),
          onLeaveBack: () => id === sections[0].id && setActive(null),
        });
      });
    });
    return () => ctx.revert();
  }, []);

  // mobile menu interaction
  useEffect(() => {
    if (!open) return;
    lockScroll(true);
    const links = menu.current.querySelectorAll("[data-menu-item]");
    const tween = reduceMotion
      ? null
      : gsap.from(links, { yPercent: 110, duration: 0.8, stagger: 0.05, ease: "expo.out" });
    links[0]?.focus();
    const onKey = (e) => e.key === "Escape" && setOpen(false);
    window.addEventListener("keydown", onKey);
    const trigger = menuButton.current;
    return () => {
      tween?.kill();
      lockScroll(false);
      window.removeEventListener("keydown", onKey);
      trigger?.focus();
    };
  }, [open]);

  const go = (e, id) => {
    e.preventDefault();
    setOpen(false);
    requestAnimationFrame(() => scrollToTarget(`#${id}`));
  };

  return (
    <>
      <header
        ref={header}
        data-shatter-fixed
        className="fixed top-4 left-1/2 -translate-x-1/2 w-[min(94vw,1080px)] rounded-full border border-black/[0.08] bg-white/80 backdrop-blur-2xl px-4 py-2 sm:px-5 sm:py-2.5 shadow-[0_10px_30px_rgba(0,0,0,0.06),0_1px_2px_rgba(0,0,0,0.04)] transition-all duration-300"
        style={{ zIndex: "var(--z-nav)" }}
      >
        <div className="flex items-center justify-between">
          {/* Apple Wordmark */}
          <a
            href="#top"
            onClick={(e) => go(e, "top")}
            className="flex items-center gap-2 text-[0.95rem] sm:text-base font-semibold tracking-tight text-[#1d1d1f] hover:text-black transition-colors shrink-0"
          >
            <span data-shatter="chars">Reyhan Resha</span>
            <span data-shatter="chars" className="hidden sm:inline font-mono text-xs text-[#86868b] font-normal">/dev</span>
          </a>

          {/* Desktop Links with Active Indicator Pill */}
          <nav aria-label="Main" className="hidden lg:block">
            <ul className="flex items-center gap-0.5 xl:gap-1 bg-black/[0.03] p-1 rounded-full border border-black/[0.04]">
              {sections.map(({ id, label }) => {
                const isActive = active === id;
                const displayLabel = id === "stack" ? "Stack" : id === "certs" ? "Certs" : label;
                return (
                  <li key={id}>
                    <a
                      href={`#${id}`}
                      onClick={(e) => go(e, id)}
                      data-shatter="chars"
                      aria-current={isActive ? "true" : undefined}
                      className={`relative font-mono text-[11px] uppercase tracking-wider flex min-h-[32px] items-center rounded-full px-2.5 xl:px-3.5 font-medium transition-all duration-300 ${
                        isActive
                          ? "text-white bg-black shadow-sm"
                          : "text-[#6e6e73] hover:text-[#1d1d1f] hover:bg-black/[0.04]"
                      }`}
                    >
                      {displayLabel}
                    </a>
                  </li>
                );
              })}
            </ul>
          </nav>

          {/* Right Action: Availability Status & Mobile Menu Toggle */}
          <div className="flex items-center gap-2.5 sm:gap-3 shrink-0">
            <a
              href="#contact"
              onClick={(e) => go(e, "contact")}
              data-shatter="block"
              className="hidden sm:inline-flex items-center gap-2 rounded-full border border-black/10 bg-black/[0.04] px-3.5 py-1 font-mono text-xs font-semibold text-[#1d1d1f] hover:bg-black hover:text-white transition-all duration-300 shadow-sm shrink-0"
            >
              <span>Available for Hire</span>
            </a>

            <button
              ref={menuButton}
              data-shatter="block"
              type="button"
              className="btn btn-apple-ghost min-h-[36px] px-3.5 text-xs font-mono uppercase tracking-wider lg:hidden rounded-full shrink-0"
              aria-expanded={open}
              aria-controls="mobile-menu"
              onClick={() => setOpen((v) => !v)}
            >
              {open ? "Close" : "Menu"}
            </button>
          </div>
        </div>

        {/* Embedded Discreet Progress Line */}
        <div className="absolute -bottom-px left-6 right-6 h-[1.5px] overflow-hidden rounded-full opacity-40">
          <span
            ref={progress}
            aria-hidden="true"
            className="block h-full w-full origin-left scale-x-0 bg-black"
          />
        </div>
      </header>

      {/* Apple-style Fullscreen Glass Curtain Mobile Overlay */}
      {open && (
        <div
          id="mobile-menu"
          ref={menu}
          className="fixed inset-0 flex flex-col justify-between bg-white/95 backdrop-blur-3xl px-8 pb-12 pt-28 lg:hidden text-[#1d1d1f]"
          style={{ zIndex: "var(--z-menu)" }}
        >
          <div className="flex justify-between items-center pb-6 border-b border-black/10">
            <span className="font-mono text-xs uppercase tracking-widest text-[#86868b]">Navigation</span>
            <button
              type="button"
              onClick={() => setOpen(false)}
              className="font-mono text-xs uppercase tracking-wider text-black font-semibold hover:underline"
            >
              [ Close ✕ ]
            </button>
          </div>

          <nav aria-label="Mobile">
            <ul className="space-y-4">
              {sections.map(({ id, label }) => (
                <li key={id} className="overflow-hidden">
                  <a
                    data-menu-item
                    href={`#${id}`}
                    onClick={(e) => go(e, id)}
                    className="block py-1.5 text-[clamp(2.2rem,8vw,3.4rem)] font-bold tracking-tight text-[#1d1d1f] hover:text-black transition-colors"
                  >
                    {label}
                  </a>
                </li>
              ))}
            </ul>
          </nav>

          <div className="pt-6 border-t border-black/10 flex flex-col gap-2">
            <span className="font-mono text-xs uppercase text-[#86868b]">Direct Contact</span>
            <a
              href={`mailto:${profile.email}`}
              className="font-mono text-sm font-medium text-black hover:underline transition-colors"
            >
              {profile.email}
            </a>
          </div>
        </div>
      )}
    </>
  );
}
