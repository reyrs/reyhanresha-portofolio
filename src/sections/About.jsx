import { useEffect, useRef } from "react";
import { about, profile } from "../data";
import { gsap, SplitText, reduceMotion } from "../lib/scroll";
import { spotlight } from "../lib/hooks";
import SectionLabel from "../components/SectionLabel";

export default function About() {
  const root = useRef(null);

  useEffect(() => {
    if (reduceMotion) return;
    const ctx = gsap.context(() => {
      const split = SplitText.create("[data-statement]", { type: "words" });
      gsap.fromTo(
        split.words,
        { color: "#d2d2d7" },
        {
          color: "#1d1d1f",
          ease: "none",
          stagger: 0.1,
          scrollTrigger: { trigger: "[data-statement]", start: "top 80%", end: "bottom 50%", scrub: true },
        },
      );

      gsap.from("[data-bento] > *", {
        y: 28,
        autoAlpha: 0,
        duration: 0.85,
        ease: "expo.out",
        stagger: 0.1,
        scrollTrigger: { trigger: "[data-bento]", start: "top 85%" },
      });

      gsap.utils.toArray("[data-count]").forEach((el) => {
        const target = Number(el.dataset.count);
        const n = { v: 0 };
        gsap.to(n, {
          v: target,
          duration: 1.6,
          ease: "power3.out",
          scrollTrigger: { trigger: el, start: "top 85%", once: true },
          onUpdate: () => (el.textContent = Math.round(n.v)),
        });
      });

      gsap.from("[data-stat]", {
        y: 24,
        autoAlpha: 0,
        duration: 0.9,
        ease: "expo.out",
        stagger: 0.08,
        scrollTrigger: { trigger: "[data-stats]", start: "top 85%" },
      });

      gsap.from("[data-edu] > *", {
        y: 20,
        autoAlpha: 0,
        duration: 0.9,
        ease: "expo.out",
        stagger: 0.06,
        scrollTrigger: { trigger: "[data-edu]", start: "top 85%" },
      });
    }, root);
    return () => ctx.revert();
  }, []);

  return (
    <section id="about" ref={root} data-shape="1" className="relative py-24 lg:py-36 bg-white">
      <div className="shell grid gap-y-16 lg:grid-cols-12">
        <div className="lg:col-span-8">
          <SectionLabel>About</SectionLabel>

          {/* Apple Signature Text Scrub Statement */}
          <p
            data-statement
            className="mt-8 text-[clamp(1.6rem,2.8vw,2.5rem)] font-medium leading-[1.32] text-[#d2d2d7] tracking-tight"
          >
            {about.statement}
          </p>

          {/* Apple 3-Pillar Engineering Bento Cards */}
          <div data-bento className="mt-14 grid gap-5 sm:grid-cols-3">
            {/* Pillar 1 */}
            <div
              onPointerMove={spotlight}
              className="apple-card hover:shadow-[0_20px_45px_rgba(0,0,0,0.08)] transition-all group"
            >
              <div className="apple-card-inner p-6 h-full flex flex-col justify-between bg-white">
                <div>
                  <div className="flex h-9 w-9 items-center justify-center rounded-xl bg-black text-white font-mono text-xs font-semibold shadow-sm">
                    &lt;/&gt;
                  </div>
                  <h3 className="mt-4 font-bold text-[#1d1d1f] text-base tracking-tight group-hover:text-black transition-colors">
                    Fullstack Web
                  </h3>
                  <p className="mt-2 text-xs text-[#6e6e73] leading-relaxed">
                    Web apps from database to interface with Next.js, React, Node.js, and Laravel, plus 3D and scroll-based interfaces with Three.js and GSAP.
                  </p>
                </div>
                <div className="mt-5 flex flex-wrap gap-1.5 pt-3 border-t border-black/[0.06]">
                  {["Next.js", "Three.js", "React", "Node.js"].map((t) => (
                    <span key={t} className="text-[10px] font-mono px-2 py-0.5 rounded-full bg-black/[0.04] text-[#1d1d1f] border border-black/[0.08]">
                      {t}
                    </span>
                  ))}
                </div>
              </div>
            </div>

            {/* Pillar 2 */}
            <div
              onPointerMove={spotlight}
              className="apple-card hover:shadow-[0_20px_45px_rgba(0,0,0,0.08)] transition-all group"
            >
              <div className="apple-card-inner p-6 h-full flex flex-col justify-between bg-white">
                <div>
                  <div className="flex h-9 w-9 items-center justify-center rounded-xl bg-black text-white font-mono text-xs font-bold shadow-sm">
                    AI
                  </div>
                  <h3 className="mt-4 font-bold text-[#1d1d1f] text-base tracking-tight group-hover:text-black transition-colors">
                    AI Integration
                  </h3>
                  <p className="mt-2 text-xs text-[#6e6e73] leading-relaxed">
                    AI agents connected to real systems, such as Claude with MetaTrader 5 through MCP and marketplace data for marketing teams.
                  </p>
                </div>
                <div className="mt-5 flex flex-wrap gap-1.5 pt-3 border-t border-black/[0.06]">
                  {["Claude MCP", "MT5", "Gemini API", "Python"].map((t) => (
                    <span key={t} className="text-[10px] font-mono px-2 py-0.5 rounded-full bg-black/[0.04] text-[#1d1d1f] border border-black/[0.08]">
                      {t}
                    </span>
                  ))}
                </div>
              </div>
            </div>

            {/* Pillar 3 */}
            <div
              onPointerMove={spotlight}
              className="apple-card hover:shadow-[0_20px_45px_rgba(0,0,0,0.08)] transition-all group"
            >
              <div className="apple-card-inner p-6 h-full flex flex-col justify-between bg-white">
                <div>
                  <div className="flex h-9 w-9 items-center justify-center rounded-xl bg-black text-white font-mono text-xs font-bold shadow-sm">
                    QA
                  </div>
                  <h3 className="mt-4 font-bold text-[#1d1d1f] text-base tracking-tight group-hover:text-black transition-colors">
                    Software Testing
                  </h3>
                  <p className="mt-2 text-xs text-[#6e6e73] leading-relaxed">
                    Manual, regression, and API testing from my internship at PT Bank UOB Indonesia, with JIRA for defect tracking and Postman for API checks.
                  </p>
                </div>
                <div className="mt-5 flex flex-wrap gap-1.5 pt-3 border-t border-black/[0.06]">
                  {["Regression", "JIRA", "Postman", "API Testing"].map((t) => (
                    <span key={t} className="text-[10px] font-mono px-2 py-0.5 rounded-full bg-black/[0.04] text-[#1d1d1f] border border-black/[0.08]">
                      {t}
                    </span>
                  ))}
                </div>
              </div>
            </div>
          </div>

          {/* Apple Metric Stat Cards */}
          <dl data-stats className="mt-14 grid gap-5 sm:grid-cols-2">
            {about.stats.map((s) => (
              <div
                key={s.label}
                data-stat
                className="apple-card"
              >
                <div className="apple-card-inner p-7 flex flex-col justify-between gap-6 h-full bg-white">
                  <dt className="text-sm font-normal text-[#6e6e73] leading-relaxed">{s.label}</dt>
                  <dd className="font-mono text-[clamp(2.6rem,4.4vw,3.6rem)] font-bold text-[#1d1d1f] leading-none tracking-tight tabular-nums flex items-baseline">
                    {s.prefix && <span className="text-black mr-1">{s.prefix}</span>}
                    <span data-count={s.value}>{reduceMotion ? s.value : 0}</span>
                    {s.suffix && <span className="text-black ml-1">{s.suffix}</span>}
                  </dd>
                </div>
              </div>
            ))}
          </dl>

          {/* Education Block */}
          <div data-edu className="apple-card mt-16">
            <div className="apple-card-inner p-7 sm:p-9 bg-white">
              <div className="flex flex-wrap items-center justify-between gap-2 border-b border-black/[0.08] pb-4 mb-6">
                <span className="font-mono text-xs uppercase tracking-wider text-[#86868b]">Education</span>
                <span className="font-mono text-xs font-semibold text-black bg-black/[0.05] px-3.5 py-1 rounded-full border border-black/10">
                  {about.education.period}
                </span>
              </div>
              <h3 className="text-xl sm:text-2xl font-bold text-[#1d1d1f] tracking-tight">{about.education.school}</h3>
              <p className="mt-1 text-base text-[#6e6e73] font-medium">{about.education.program}</p>
              <ul className="mt-6 space-y-3 text-[#6e6e73] text-[0.95rem]">
                {about.education.points.map((p) => (
                  <li key={p} className="flex gap-3">
                    <span aria-hidden="true" className="shrink-0 text-[#86868b]">–</span>
                    <span className="leading-relaxed">{p}</span>
                  </li>
                ))}
              </ul>
            </div>
          </div>
        </div>

        {/* Aside Engineering Quick-Specs Card */}
        <aside className="relative hidden lg:col-span-4 lg:col-start-9 lg:block">
          <div className="sticky top-[20vh] ml-auto w-72 apple-card">
            <div className="apple-card-inner p-6 bg-white">
              <div className="flex items-center justify-between border-b border-black/[0.08] pb-3 mb-4">
                <span className="font-mono text-xs font-semibold text-[#1d1d1f] uppercase tracking-wider">Profile Overview</span>
              </div>
              <dl className="space-y-4 font-mono text-xs leading-5 text-[#6e6e73]">
                <div className="flex justify-between items-baseline">
                  <dt className="text-[#86868b]">Name</dt>
                  <dd className="font-medium text-[#1d1d1f]">{profile.name}</dd>
                </div>
                <div className="flex justify-between items-baseline">
                  <dt className="text-[#86868b]">Role</dt>
                  <dd className="font-medium text-[#1d1d1f]">Fullstack / AI / SDET</dd>
                </div>
                <div className="flex justify-between items-baseline">
                  <dt className="text-[#86868b]">Education</dt>
                  <dd className="font-medium text-[#1d1d1f]">CCIT FT UI</dd>
                </div>
                <div className="flex justify-between items-baseline">
                  <dt className="text-[#86868b]">Location</dt>
                  <dd className="font-medium text-[#1d1d1f]">Tangerang Selatan</dd>
                </div>
                <div className="flex justify-between items-baseline">
                  <dt className="text-[#86868b]">Specialty</dt>
                  <dd className="font-medium text-[#1d1d1f]">AI Agents &amp; ERP</dd>
                </div>
                <div className="flex justify-between items-baseline pt-3 border-t border-black/[0.08]">
                  <dt className="text-[#86868b]">Availability</dt>
                  <dd className="font-semibold text-black">
                    Open to Hire
                  </dd>
                </div>
              </dl>
            </div>
          </div>
        </aside>
      </div>
    </section>
  );
}
