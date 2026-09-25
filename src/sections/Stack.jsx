import { Fragment, useEffect, useRef, useState } from "react";
import { stack, softSkills, qaSkills } from "../data";
import { gsap, ScrollTrigger, reduceMotion } from "../lib/scroll";
import SectionLabel from "../components/SectionLabel";

const rowA = stack.slice(0, 2).flatMap((g) => g.items.map((it) => it.name || it));
const rowB = stack.slice(2).flatMap((g) => g.items.map((it) => it.name || it));

function MarqueeRow({ items, outline, reverse }) {
  const content = [...items, ...items];
  return (
    <div className="overflow-hidden py-1">
      <div
        data-marquee
        data-reverse={reverse ? "" : undefined}
        className="flex w-max items-center whitespace-nowrap text-[clamp(2.4rem,6vw,5.5rem)] font-bold leading-tight tracking-tight text-[#1d1d1f]"
      >
        {content.map((item, i) => (
          <Fragment key={i}>
            <span className={outline ? "outline-text" : "text-[#1d1d1f]"}>{item}</span>
            <span className="mx-[0.4em] text-[0.65em] text-black select-none">✦</span>
          </Fragment>
        ))}
      </div>
    </div>
  );
}

export default function Stack() {
  const root = useRef(null);
  const [filter, setFilter] = useState("all");

  useEffect(() => {
    if (reduceMotion) return;
    const wrap = gsap.utils.wrap(-50, 0);
    const rows = [];
    let speed = 1;
    let target = 1;
    const tick = (_time, deltaMs) => {
      target += (1 - target) * 0.04;
      speed += (target - speed) * 0.1;
      for (const r of rows) {
        r.x = wrap(r.x + r.dir * speed * deltaMs * 0.0013);
        r.set(r.x);
      }
    };

    const ctx = gsap.context(() => {
      gsap.utils.toArray("[data-marquee]").forEach((el) => {
        const reverse = el.hasAttribute("data-reverse");
        rows.push({ dir: reverse ? 1 : -1, x: reverse ? -50 : 0, set: gsap.quickSetter(el, "xPercent") });
      });

      ScrollTrigger.create({
        trigger: root.current,
        start: "top bottom",
        end: "bottom top",
        onToggle: (self) => (self.isActive ? gsap.ticker.add(tick) : gsap.ticker.remove(tick)),
        onUpdate: (self) => {
          target = gsap.utils.clamp(-4, 5, 1 + self.getVelocity() / 350);
        },
      });

      gsap.from("[data-spec-card]", {
        y: 20,
        autoAlpha: 0,
        duration: 0.8,
        ease: "expo.out",
        stagger: 0.08,
        scrollTrigger: { trigger: "[data-spec]", start: "top 80%" },
      });
    }, root);

    return () => {
      gsap.ticker.remove(tick);
      ctx.revert();
    };
  }, []);

  const categories = [
    { id: "all", label: "All Systems" },
    { id: "ai", label: "AI & Agents", match: "AI Agents" },
    { id: "frontend", label: "3D & Web", match: "Frontend" },
    { id: "backend", label: "Backend", match: "Backend" },
    { id: "cloud", label: "Cloud & DB", match: "Database" },
    { id: "devops", label: "DevOps & QA", match: "DevOps" },
  ];

  const visibleGroups = stack.filter((g) => {
    if (filter === "all") return true;
    const currentCat = categories.find((c) => c.id === filter);
    return currentCat?.match ? g.group.includes(currentCat.match) : true;
  });

  return (
    <section id="stack" ref={root} data-shape="2" className="relative overflow-hidden py-24 lg:py-36 bg-white">
      <div className="shell">
        <SectionLabel>Architecture &amp; Tools</SectionLabel>
        <h2 className="display mt-8 max-w-[20ch] text-[clamp(2.4rem,4.8vw,4.5rem)] font-bold text-[#1d1d1f]">
          Engineered with precision. <span className="text-black italic">Every layer.</span>
        </h2>
      </div>

      {/* Smooth Marquee Showcase */}
      <div aria-hidden="true" className="mt-14 space-y-1.5 bg-black/[0.02] py-4 border-y border-black/[0.06]">
        <MarqueeRow items={rowA} />
        <MarqueeRow items={rowB} outline reverse />
      </div>

      {/* Apple-style Segmented Control (Pill Tabs) */}
      <div className="shell mt-14 flex items-center justify-start sm:justify-center overflow-x-auto pb-2 scrollbar-none">
        <div className="flex items-center gap-1.5 p-1.5 rounded-full border border-black/[0.08] bg-black/[0.03] backdrop-blur-xl">
          {categories.map((c) => (
            <button
              key={c.id}
              type="button"
              onClick={() => setFilter(c.id)}
              className={`font-mono text-xs px-4 py-1.5 rounded-full transition-all duration-300 whitespace-nowrap cursor-pointer ${
                filter === c.id
                  ? "bg-black text-white font-semibold shadow-sm"
                  : "text-[#6e6e73] hover:text-black hover:bg-black/[0.04]"
              }`}
            >
              {c.label}
            </button>
          ))}
        </div>
      </div>

      {/* Categorized Tech Grid with Real Logos */}
      <div className="shell mt-12 grid gap-10 lg:grid-cols-12" data-spec>
        <div className="lg:col-span-8 space-y-6">
          {visibleGroups.map((g) => (
            <div key={g.group} data-spec-card className="apple-card">
              <div className="apple-card-inner p-6 sm:p-7 bg-white">
                <div className="flex items-center justify-between border-b border-black/[0.08] pb-3 mb-5">
                  <span className="font-mono text-xs font-semibold uppercase tracking-wider text-[#1d1d1f]">
                    {g.group}
                  </span>
                  <span className="text-xs text-[#86868b] font-mono">{g.items.length} tools</span>
                </div>
                <div className="grid grid-cols-2 sm:grid-cols-4 gap-3">
                  {g.items.map((item) => (
                    <div
                      key={item.name}
                      className="flex items-center gap-3 rounded-xl border border-black/[0.07] bg-black/[0.02] px-3.5 py-2.5 transition-all hover:bg-black/[0.05] hover:border-black/20 hover:shadow-sm group"
                    >
                      {item.icon && (
                        <img
                          src={item.icon}
                          alt={item.name}
                          className="h-6 w-6 object-contain shrink-0 transition-transform group-hover:scale-110"
                          onError={(e) => {
                            e.currentTarget.style.display = "none";
                          }}
                        />
                      )}
                      <span className="text-sm font-medium text-[#1d1d1f] tracking-tight group-hover:text-black">
                        {item.name}
                      </span>
                    </div>
                  ))}
                </div>
              </div>
            </div>
          ))}
        </div>

        {/* SDET / QA Competencies & Core Mindset */}
        <div className="lg:col-span-4 space-y-6">
          <div className="apple-card">
            <div className="apple-card-inner p-6 sm:p-7 bg-white">
              <div className="flex items-center justify-between border-b border-black/[0.08] pb-3 mb-4">
                <h3 className="font-mono text-xs font-semibold uppercase tracking-wider text-[#1d1d1f]">
                  SDET &amp; QA Rigor
                </h3>
                <span className="font-mono text-[10px] uppercase font-bold text-black bg-black/[0.05] px-2.5 py-0.5 rounded-full border border-black/10">
                  UOB Tested
                </span>
              </div>
              <ul className="space-y-3">
                {qaSkills.map((q) => (
                  <li key={q} className="flex items-start gap-2.5 text-xs text-[#6e6e73] leading-relaxed">
                    <span className="mt-0.5 flex h-4 w-4 items-center justify-center rounded-full bg-black text-white text-[10px] shrink-0 font-bold">
                      ✓
                    </span>
                    <span>{q}</span>
                  </li>
                ))}
              </ul>
            </div>
          </div>

          <div className="apple-card">
            <div className="apple-card-inner p-6 sm:p-7 bg-white">
              <h3 className="font-mono text-xs font-semibold uppercase tracking-wider text-[#1d1d1f] border-b border-black/[0.08] pb-3 mb-4">
                Core Engineering Mindset
              </h3>
              <ul className="space-y-3">
                {softSkills.map((s) => (
                  <li key={s} className="flex items-start gap-2.5 text-xs text-[#6e6e73] leading-relaxed">
                    <span className="mt-0.5 flex h-4 w-4 items-center justify-center rounded-full bg-black text-white text-[10px] shrink-0 font-bold">
                      •
                    </span>
                    <span>{s}</span>
                  </li>
                ))}
              </ul>

              <div className="mt-6 pt-4 border-t border-black/[0.08]">
                <p className="text-[11px] text-[#86868b] leading-relaxed">
                  Synthesizing rapid fullstack velocity with the defensive zero-defect mindset of a banking test engineer.
                </p>
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}
