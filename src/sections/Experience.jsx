import { useEffect, useRef } from "react";
import { experience } from "../data";
import { gsap, ScrollTrigger, reduceMotion } from "../lib/scroll";
import SectionLabel from "../components/SectionLabel";

export default function Experience() {
  const root = useRef(null);

  useEffect(() => {
    if (reduceMotion) return;
    const ctx = gsap.context(() => {
      // Timeline line fills with black as user scrolls
      gsap.fromTo(
        "[data-line]",
        { scaleY: 0 },
        {
          scaleY: 1,
          ease: "none",
          scrollTrigger: { trigger: "[data-timeline]", start: "top 60%", end: "bottom 60%", scrub: true },
        },
      );

      gsap.utils.toArray("[data-job]").forEach((job) => {
        gsap.from(job.querySelectorAll("[data-job-part]"), {
          y: 30,
          autoAlpha: 0,
          duration: 0.9,
          ease: "expo.out",
          stagger: 0.05,
          scrollTrigger: { trigger: job, start: "top 80%" },
        });
        ScrollTrigger.create({ trigger: job, start: "top 60%", end: "max", toggleClass: "is-lit" });
      });
    }, root);
    return () => ctx.revert();
  }, []);

  return (
    <section id="experience" ref={root} data-shape="4" className="relative py-24 lg:py-36 bg-white">
      <div className="shell grid lg:grid-cols-12">
        <div className="lg:col-span-8">
          <SectionLabel>Career &amp; Engineering Roles</SectionLabel>
          <h2 className="display mt-8 text-[clamp(2.4rem,5.5vw,5rem)] font-bold text-[#1d1d1f]">
            Professional <span className="text-black italic">track record.</span>
          </h2>

          <ol data-timeline className="relative mt-16 pl-8 sm:pl-12">
            {/* Apple Minimalist Rail */}
            <span aria-hidden="true" className="absolute bottom-3 left-[3px] top-3 w-[2px] bg-black/10">
              <span data-line className="block h-full w-full origin-top bg-black" />
            </span>
            {experience.map((job) => (
              <li
                key={job.company + job.role}
                data-job
                className={`group relative pb-16 last:pb-0 ${reduceMotion ? "is-lit" : ""}`}
              >
                <span
                  aria-hidden="true"
                  className="absolute -left-8 top-1.5 h-2.5 w-2.5 rounded-full border-2 border-black/20 bg-white transition-all duration-300 group-[.is-lit]:scale-125 group-[.is-lit]:border-black group-[.is-lit]:bg-black sm:-left-12"
                />
                <div data-job-part className="inline-block">
                  <span className="font-mono text-xs font-semibold text-black bg-black/[0.05] px-3.5 py-0.5 rounded-full border border-black/10">
                    {job.period}
                  </span>
                </div>
                <h3
                  data-job-part
                  className="mt-3.5 text-[clamp(1.3rem,2.2vw,1.85rem)] font-bold leading-tight tracking-tight text-[#1d1d1f]"
                >
                  {job.role}
                </h3>
                <p data-job-part className="mt-1 text-sm sm:text-base font-medium text-[#6e6e73]">
                  {job.company} · {job.place}
                </p>
                <ul data-job-part className="mt-5 space-y-2.5 text-[#6e6e73] text-[0.92rem]">
                  {job.points.map((p) => (
                    <li key={p} className="flex max-w-[62ch] gap-3">
                      <span aria-hidden="true" className="mt-[0.65em] h-1.5 w-1.5 rounded-full bg-black shrink-0" />
                      <span>{p}</span>
                    </li>
                  ))}
                </ul>
                <ul data-job-part className="mt-6 flex flex-wrap gap-2" aria-label="Skills used">
                  {job.tags.map((t) => (
                    <li key={t} className="tag text-xs font-medium text-[#1d1d1f] bg-black/[0.04] border-black/[0.08]">
                      {t}
                    </li>
                  ))}
                </ul>
              </li>
            ))}
          </ol>
        </div>
      </div>
    </section>
  );
}
