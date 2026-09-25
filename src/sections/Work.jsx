import { useEffect, useRef } from "react";
import { projects } from "../data";
import { gsap, reduceMotion } from "../lib/scroll";
import { spotlight } from "../lib/hooks";
import SectionLabel from "../components/SectionLabel";
import { ArrowRight, ArrowUpRight } from "../components/Icons";
import GoldChart from "../components/visuals/GoldChart";
import BotChat from "../components/visuals/BotChat";
import QrScan from "../components/visuals/QrScan";
import CrudTable from "../components/visuals/CrudTable";

const visuals = { chart: GoldChart, chat: BotChat, qr: QrScan, crud: CrudTable };
const horizontal = !reduceMotion;

function ProjectPanel({ project }) {
  const Visual = visuals[project.visual];
  return (
    <article
      data-panel
      onPointerMove={spotlight}
      className={`apple-card shrink-0 transition-all duration-500 hover:shadow-[0_20px_50px_rgba(0,0,0,0.1)] ${
        horizontal ? "lg:h-[76dvh] lg:w-[min(80vw,1180px)]" : ""
      }`}
    >
      <div className="apple-card-inner h-full grid lg:grid-cols-[1.1fr_1fr] overflow-hidden bg-white">
        {/* Left Column: Visual Showcase (Browser window with real screenshot / interactive SVG) */}
        <div className="relative min-h-[340px] sm:min-h-[400px] overflow-hidden border-b border-black/[0.08] bg-[#f5f5f7] p-4 sm:p-6 lg:border-b-0 lg:border-r border-black/[0.08] flex items-center justify-center">
          {project.image ? (
            <a
              href={project.demo || project.repo || "#"}
              target="_blank"
              rel="noreferrer"
              className="group/card w-full h-full max-h-[480px] rounded-2xl overflow-hidden border border-black/10 bg-white shadow-xl flex flex-col transition-all duration-500 hover:scale-[1.015] hover:border-black/30 block relative cursor-pointer"
            >
              {/* Apple-style Light Safari Browser Navigation Bar */}
              <div className="flex items-center gap-2 px-3.5 py-2.5 border-b border-black/[0.06] bg-[#ebebed]">
                <span className="h-2.5 w-2.5 rounded-full bg-black/20" />
                <span className="h-2.5 w-2.5 rounded-full bg-black/20" />
                <span className="h-2.5 w-2.5 rounded-full bg-black/20" />
                <div className="ml-2 flex-1 rounded-md bg-white px-2.5 py-0.5 font-mono text-[11px] text-[#6e6e73] border border-black/[0.06] truncate flex items-center justify-between shadow-xs">
                  <span className="truncate">
                    {project.demo ? project.demo.replace(/^https?:\/\//, "").replace(/\/$/, "") : `https://${project.id}.live`}
                  </span>
                  <span className="text-[10px] text-black font-semibold group-hover/card:underline ml-2 shrink-0">
                    Live ↗
                  </span>
                </div>
              </div>
              {/* Screenshot */}
              <div className="relative flex-1 overflow-hidden bg-[#fafafa]">
                <img
                  src={project.image}
                  alt={project.title}
                  className="w-full h-full object-cover object-top transition-transform duration-700 group-hover/card:scale-105"
                  onError={(e) => {
                    e.currentTarget.style.display = "none";
                  }}
                />
                <div className="absolute inset-0 bg-black/0 transition-colors group-hover/card:bg-black/5 pointer-events-none" />
              </div>
            </a>
          ) : (
            <div data-visual className="absolute inset-0">
              <Visual />
            </div>
          )}
        </div>

        {/* Right Column: Project Context & Metadata */}
        <div data-panel-text className="flex flex-col justify-between gap-8 p-6 sm:p-10 lg:p-12 bg-white">
          <div>
            <div className="flex items-center gap-2">
              <span className="font-mono text-xs font-semibold text-black bg-black/[0.05] px-3.5 py-0.5 rounded-full border border-black/10">
                {project.kind}
              </span>
              <span className="font-mono text-xs text-[#86868b]">· {project.year}</span>
            </div>

            <h3 className="mt-4 text-[clamp(1.8rem,3vw,2.75rem)] font-bold leading-tight tracking-tight text-[#1d1d1f]">
              {project.title}
            </h3>
            <p className="mt-4 max-w-[46ch] leading-relaxed text-[#6e6e73] text-base">
              {project.summary}
            </p>
            <ul className="mt-6 space-y-2.5">
              {project.points.map((p) => (
                <li key={p} className="flex gap-3 text-[0.92rem] text-[#6e6e73]">
                  <span aria-hidden="true" className="shrink-0 text-[#86868b]">–</span>
                  <span>{p}</span>
                </li>
              ))}
            </ul>
          </div>

          <div className="flex flex-wrap items-center justify-between gap-4 pt-6 border-t border-black/[0.08]">
            <ul className="flex flex-wrap gap-2" aria-label="Tech used">
              {project.tech.map((t) => (
                <li key={t} className="tag text-xs font-medium text-[#1d1d1f] bg-black/[0.04] border-black/[0.08]">
                  {t}
                </li>
              ))}
            </ul>
            <div className="flex items-center gap-3">
              {project.demo && (
                <a
                  href={project.demo}
                  target="_blank"
                  rel="noreferrer"
                  className="btn btn-apple-primary text-xs font-semibold py-1.5 px-4 rounded-full"
                >
                  <span>Live Demo</span>
                  <ArrowUpRight />
                </a>
              )}
              {project.repo && (
                <a
                  href={project.repo}
                  target="_blank"
                  rel="noreferrer"
                  className="btn btn-apple-ghost text-xs font-mono py-1.5 px-3.5 rounded-full text-[#6e6e73] hover:text-black"
                >
                  <span>GitHub</span>
                  <ArrowUpRight />
                </a>
              )}
            </div>
          </div>
        </div>
      </div>
    </article>
  );
}

export default function Work() {
  const root = useRef(null);
  const track = useRef(null);
  const bar = useRef(null);

  useEffect(() => {
    if (reduceMotion) return;
    const ctx = gsap.context(() => {
      const mm = gsap.matchMedia();

      // Desktop horizontal pinning
      mm.add("(min-width: 1024px)", () => {
        const distance = () => track.current.scrollWidth - window.innerWidth;
        const panels = gsap.utils.toArray("[data-panel]");
        const slide = gsap.to(track.current, {
          x: () => -distance(),
          ease: "none",
          scrollTrigger: {
            trigger: root.current,
            pin: true,
            scrub: 0.8,
            start: "top top",
            end: () => `+=${distance()}`,
            invalidateOnRefresh: true,
            onUpdate: (self) => {
              gsap.set(bar.current, { scaleX: self.progress });
            },
          },
        });

        panels.forEach((panel) => {
          gsap.from(panel.querySelectorAll("[data-panel-text] > div > *"), {
            y: 30,
            autoAlpha: 0,
            duration: 0.9,
            ease: "expo.out",
            stagger: 0.05,
            scrollTrigger: { trigger: panel, containerAnimation: slide, start: "left 75%", toggleActions: "play none none reverse" },
          });
        });
      });

      // Mobile/tablet vertical stack
      mm.add("(max-width: 1023px)", () => {
        gsap.utils.toArray("[data-panel]").forEach((panel) => {
          gsap.from(panel, {
            y: 40,
            autoAlpha: 0,
            duration: 0.9,
            ease: "expo.out",
            scrollTrigger: { trigger: panel, start: "top 88%" },
          });
        });
      });
    }, root);
    return () => ctx.revert();
  }, []);

  return (
    <section id="work" ref={root} data-shape="3" className={`relative bg-white ${horizontal ? "lg:h-[100dvh] lg:overflow-hidden" : ""}`}>
      <div
        ref={track}
        className={`shell flex flex-col gap-8 py-20 lg:py-[14vh] ${
          horizontal ? "lg:h-full lg:w-max lg:max-w-none lg:flex-row lg:items-center lg:gap-[3.5vw] lg:px-[6vw] lg:py-0" : ""
        }`}
      >
        <header className={`shrink-0 ${horizontal ? "lg:w-[32vw] lg:min-w-[340px]" : ""}`}>
          <SectionLabel>Featured Work</SectionLabel>
          <h2 className="display mt-8 text-[clamp(2.2rem,4.8vw,4.5rem)] font-bold text-[#1d1d1f]">
            Systems I&apos;ve <span className="text-black italic">shipped.</span>
          </h2>
          <p className="mt-5 max-w-[38ch] text-[#6e6e73] leading-relaxed">
            Real-world production platforms spanning algorithmic trading systems, autonomous AI agent pipelines, and banking-grade software.
          </p>
          <p className={`font-mono text-xs uppercase tracking-wider text-[#86868b] mt-10 hidden items-center gap-2 ${horizontal ? "lg:flex" : ""}`}>
            Scroll to explore projects <ArrowRight />
          </p>
        </header>

        {projects.map((p) => (
          <ProjectPanel key={p.id} project={p} />
        ))}

        <div className={`shrink-0 py-10 ${horizontal ? "lg:w-[26vw] lg:py-0" : ""}`}>
          <p className="font-mono text-xs uppercase tracking-wider text-[#86868b]">Open Source</p>
          <p className="mt-4 text-[clamp(1.5rem,2.4vw,2.2rem)] font-bold text-[#1d1d1f] leading-tight">
            More experimental tools &amp; open source repositories.
          </p>
          <a
            href="https://github.com/reyrs"
            target="_blank"
            rel="noreferrer"
            className="btn btn-apple-ghost mt-6 rounded-full"
          >
            <span>github.com/reyrs</span>
            <ArrowUpRight />
          </a>
        </div>
      </div>

      {horizontal && (
        <div aria-hidden="true" className="shell pointer-events-none absolute inset-x-0 bottom-6 hidden items-center gap-6 lg:flex">
          <span className="relative h-1 flex-1 rounded-full bg-black/10 overflow-hidden">
            <span ref={bar} className="absolute inset-0 origin-left scale-x-0 bg-black rounded-full" />
          </span>
        </div>
      )}
    </section>
  );
}
