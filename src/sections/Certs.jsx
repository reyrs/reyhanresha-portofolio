import { useEffect, useRef } from "react";
import { certifications } from "../data";
import { gsap, reduceMotion } from "../lib/scroll";
import SectionLabel from "../components/SectionLabel";

export default function Certs() {
  const root = useRef(null);

  useEffect(() => {
    if (reduceMotion) return;
    const ctx = gsap.context(() => {
      gsap.from("[data-cert]", {
        clipPath: "inset(0% 0% 100% 0%)",
        y: 20,
        duration: 0.9,
        ease: "expo.out",
        stagger: 0.06,
        scrollTrigger: { trigger: "[data-certs]", start: "top 80%" },
      });
    }, root);
    return () => ctx.revert();
  }, []);

  return (
    <section id="certs" ref={root} className="relative py-24 lg:py-32 bg-white">
      <div className="shell grid lg:grid-cols-12">
        <div className="lg:col-span-8">
          <SectionLabel>Certifications &amp; Accreditations</SectionLabel>
          <h2 className="display mt-8 text-[clamp(2.3rem,5vw,4.8rem)] font-bold text-[#1d1d1f]">
            Validated <span className="text-black italic">credentials.</span>
          </h2>
          <ul data-certs className="mt-14 border-t border-black/[0.08]">
            {certifications.map((c) => (
              <li
                key={c.title}
                data-cert
                className="group relative isolate grid grid-cols-[3.5rem_1fr] items-baseline gap-x-4 gap-y-1 overflow-hidden border-b border-black/[0.08] py-5 sm:grid-cols-[4.5rem_1fr_auto] transition-colors"
              >
                <span
                  aria-hidden="true"
                  className="absolute inset-0 -z-10 origin-left scale-x-0 bg-black/[0.03] transition-transform duration-500 ease-[var(--ease-out-expo)] group-hover:scale-x-100"
                />
                <span className="font-mono text-xs font-semibold text-black tabular-nums">{c.year}</span>
                <span className="text-base sm:text-lg font-semibold text-[#1d1d1f] leading-snug tracking-tight transition-all duration-300 group-hover:translate-x-1.5 group-hover:text-black">
                  {c.title}
                </span>
                <span className="col-start-2 font-mono text-xs font-medium text-[#6e6e73] sm:col-start-auto">
                  {c.issuer}
                </span>
              </li>
            ))}
          </ul>
        </div>
      </div>
    </section>
  );
}
