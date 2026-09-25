import { useEffect, useRef, useState } from "react";
import { gsap, ScrollTrigger, scrollToTarget, reduceMotion } from "../lib/scroll";

export default function ScrollIndicator() {
  const btnRef = useRef(null);
  const [percent, setPercent] = useState(0);
  const [visible, setVisible] = useState(false);

  useEffect(() => {
    if (reduceMotion) return;

    const st = ScrollTrigger.create({
      start: 0,
      end: "max",
      onUpdate: (self) => {
        const p = Math.round(self.progress * 100);
        setPercent(p);
        if (self.scroll() > 240) {
          setVisible(true);
        } else {
          setVisible(false);
        }
      },
    });

    return () => st.kill();
  }, []);

  if (reduceMotion || !visible) return null;

  return (
    <button
      ref={btnRef}
      type="button"
      onClick={() => scrollToTarget("#top")}
      aria-label="Scroll back to top"
      className="fixed bottom-6 right-6 z-30 group flex items-center gap-2.5 rounded-full border border-black/10 bg-white/90 px-3 py-2 shadow-[0_8px_24px_rgba(0,0,0,0.08),0_1px_2px_rgba(0,0,0,0.04)] backdrop-blur-2xl transition-all duration-300 hover:border-black/30 hover:scale-105 active:scale-95 cursor-pointer text-[#1d1d1f]"
    >
      <div className="relative flex h-5 w-5 items-center justify-center">
        {/* SVG Progress Ring */}
        <svg className="h-5 w-5 -rotate-90 transform" viewBox="0 0 36 36">
          <path
            className="text-black/10"
            strokeWidth="3.5"
            stroke="currentColor"
            fill="none"
            d="M18 2.0845 a 15.9155 15.9155 0 0 1 0 31.831 a 15.9155 15.9155 0 0 1 0 -31.831"
          />
          <path
            className="text-black transition-all duration-150"
            strokeDasharray={`${percent}, 100`}
            strokeWidth="3.5"
            strokeLinecap="round"
            stroke="currentColor"
            fill="none"
            d="M18 2.0845 a 15.9155 15.9155 0 0 1 0 31.831 a 15.9155 15.9155 0 0 1 0 -31.831"
          />
        </svg>
        <span className="absolute text-[10px] text-black font-bold">
          ↑
        </span>
      </div>
      <span className="font-mono text-xs font-semibold text-[#1d1d1f] tabular-nums">
        {percent}%
      </span>
    </button>
  );
}
