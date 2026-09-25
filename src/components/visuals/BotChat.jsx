import { useEffect, useState } from "react";
import { useInView } from "../../lib/hooks";
import { Bell } from "../Icons";

// Ilustrasi percakapan dengan bot sinyal (Apple iMessage Light Minimalist).
const SCRIPT = [
  { at: 500, type: "user", text: "What's the gold analysis today?" },
  { at: 1300, type: "typing" },
  {
    at: 2700,
    type: "bot",
    text: "XAU/USD is holding above 3,931 support on the 1H. Bias stays bullish while candles close above it.",
  },
  { at: 4200, type: "signal" },
  { at: 6300, type: "alert" },
];
const LOOP_MS = 10000;

function Bubble({ from, children }) {
  return (
    <div className={`chat-pop flex ${from === "user" ? "justify-end" : "justify-start"}`}>
      <div
        className={`max-w-[84%] rounded-2xl px-4 py-2.5 text-[0.85rem] leading-snug shadow-xs ${
          from === "user"
            ? "rounded-br-sm bg-black text-white font-medium"
            : "rounded-bl-sm bg-[#f2f2f7] text-[#1d1d1f] border border-black/[0.04]"
        }`}
      >
        {children}
      </div>
    </div>
  );
}

export default function BotChat() {
  const [ref, inView] = useInView({ threshold: 0.3 });
  const [step, setStep] = useState(0);

  useEffect(() => {
    if (!inView) {
      setStep(0);
      return;
    }
    let timers = [];
    const run = () => {
      setStep(0);
      timers = SCRIPT.map((s, i) => setTimeout(() => setStep(i + 1), s.at));
      timers.push(setTimeout(run, LOOP_MS));
    };
    run();
    return () => timers.forEach(clearTimeout);
  }, [inView]);

  const shown = SCRIPT.slice(0, step).filter((s, i, arr) => s.type !== "typing" || i === arr.length - 1);

  return (
    <div ref={ref} className="absolute inset-0 flex items-center justify-center p-5 sm:p-8">
      <div
        className="flex h-full max-h-[440px] w-full max-w-[360px] flex-col overflow-hidden rounded-[24px] border border-black/10 bg-white shadow-xl"
        role="img"
        aria-label="Illustration of a Telegram chat where the bot answers a gold analysis question and posts a buy signal"
      >
        <div className="flex items-center gap-3 border-b border-black/[0.08] bg-[#f5f5f7] px-4 py-3">
          <span className="grid h-9 w-9 place-items-center rounded-full bg-black font-mono text-xs font-bold text-white shadow-sm">
            AG
          </span>
          <div className="leading-tight">
            <p className="text-sm font-semibold text-[#1d1d1f]">Alpha Signals</p>
            <p className="font-mono text-[0.68rem] text-black font-medium">bot · live</p>
          </div>
        </div>
        <div className="flex flex-1 flex-col justify-end gap-2.5 overflow-hidden p-4 bg-white">
          {shown.map((s) => {
            if (s.type === "user") return <Bubble key={s.at} from="user">{s.text}</Bubble>;
            if (s.type === "bot") return <Bubble key={s.at}>{s.text}</Bubble>;
            if (s.type === "typing")
              return (
                <Bubble key={s.at}>
                  <span className="flex gap-1 py-1">
                    {[0, 1, 2].map((d) => (
                      <span key={d} className="typing-dot h-1.5 w-1.5 rounded-full bg-[#86868b]" style={{ animationDelay: `${d * 150}ms` }} />
                    ))}
                  </span>
                </Bubble>
              );
            if (s.type === "signal")
              return (
                <Bubble key={s.at}>
                  <span className="block font-mono text-[0.75rem] leading-5">
                    <span className="font-bold text-black">SIGNAL · BUY XAU/USD</span>
                    <br />
                    Entry 3,936.0
                    <br />
                    TP&nbsp;&nbsp;&nbsp; 3,958.0
                    <br />
                    SL&nbsp;&nbsp;&nbsp; 3,927.0
                    <br />
                    R:R&nbsp;&nbsp; 1 : 2.4
                  </span>
                </Bubble>
              );
            return (
              <Bubble key={s.at}>
                <span className="flex items-center gap-2">
                  <Bell className="shrink-0 text-black" />
                  Price alert: XAU/USD reached 3,950.0
                </span>
              </Bubble>
            );
          })}
        </div>
        <div className="border-t border-black/[0.08] bg-[#f5f5f7] px-4 py-3 font-mono text-[0.72rem] text-[#86868b]">Message…</div>
      </div>
    </div>
  );
}
