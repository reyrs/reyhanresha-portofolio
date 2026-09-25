import { useEffect, useMemo, useState } from "react";
import { useInView } from "../../lib/hooks";

// Ilustrasi chart XAU/USD (Apple Light Monochrome Minimal).
const W = 600;
const H = 400;
const PAD = { l: 24, r: 92, t: 56, b: 36 };
const N = 38;

function makeCandles() {
  let seed = 7;
  const rand = () => ((seed = (seed * 16807) % 2147483647) / 2147483647);
  let price = 3918;
  return Array.from({ length: N }, (_, i) => {
    const drift = i > 22 ? 1.1 : -0.15;
    const open = price;
    const close = open + (rand() - 0.47) * 9 + drift;
    const high = Math.max(open, close) + rand() * 4;
    const low = Math.min(open, close) - rand() * 4;
    price = close;
    return { open, close, high, low };
  });
}

const fmt = (v) => v.toLocaleString("en-US", { minimumFractionDigits: 1, maximumFractionDigits: 1 });

export default function GoldChart() {
  const [ref, inView] = useInView({ threshold: 0.3 });
  const candles = useMemo(makeCandles, []);
  const [last, setLast] = useState(candles[N - 1].close);

  useEffect(() => {
    if (!inView) return;
    const id = setInterval(() => setLast((p) => p + (Math.random() - 0.45) * 1.6), 1400);
    return () => clearInterval(id);
  }, [inView]);

  const all = candles.flatMap((c) => [c.high, c.low]);
  const min = Math.min(...all) - 6;
  const max = Math.max(...all) + 14;
  const y = (v) => PAD.t + ((max - v) / (max - min)) * (H - PAD.t - PAD.b);
  const step = (W - PAD.l - PAD.r) / N;
  const entry = 3936;
  const tp = 3958;
  const sl = 3927;
  const first = candles[0].open;
  const change = ((last - first) / first) * 100;
  const avg = candles
    .map((c, i) => {
      const slice = candles.slice(Math.max(0, i - 5), i + 1);
      const m = slice.reduce((s, k) => s + k.close, 0) / slice.length;
      return `${PAD.l + i * step + step / 2},${y(m)}`;
    })
    .join(" ");

  const levels = [
    { v: tp, label: "TP", color: "#000000" },
    { v: entry, label: "ENTRY", color: "#6e6e73" },
    { v: sl, label: "SL", color: "#ff3b30" },
  ];

  return (
    <div ref={ref} className={`chart absolute inset-0 ${inView ? "is-on" : ""}`}>
      <svg viewBox={`0 0 ${W} ${H}`} className="h-full w-full" role="img" aria-label="Illustration of a live XAU/USD candlestick chart with entry, take-profit and stop-loss levels">
        <text x={PAD.l} y={28} className="fill-[#1d1d1f] font-mono text-[13px] font-semibold">
          XAU/USD · 15m
        </text>
        <text x={PAD.l + 118} y={28} className={`font-mono text-[13px] font-semibold ${change >= 0 ? "fill-black" : "fill-[#ff3b30]"}`}>
          {change >= 0 ? "+" : ""}
          {change.toFixed(2)}%
        </text>
        <circle cx={W - 30} cy={24} r={4} className="blink fill-black" />
        <text x={W - 42} y={28} textAnchor="end" className="fill-[#86868b] font-mono text-[11px]">
          LIVE
        </text>

        {Array.from({ length: 5 }, (_, i) => {
          const v = min + ((max - min) * (i + 0.5)) / 5;
          return (
            <g key={i}>
              <line x1={PAD.l} x2={W - PAD.r + 8} y1={y(v)} y2={y(v)} stroke="rgba(0, 0, 0, 0.06)" />
              <text x={W - PAD.r + 14} y={y(v) + 4} className="fill-[#86868b] font-mono text-[10px]">
                {fmt(v)}
              </text>
            </g>
          );
        })}

        {candles.map((c, i) => {
          const isLast = i === N - 1;
          const close = isLast ? last : c.close;
          const up = close >= c.open;
          const x = PAD.l + i * step + step / 2;
          const top = y(Math.max(c.open, close));
          const bottom = y(Math.min(c.open, close));
          const strokeColor = up ? "#000000" : "#ff3b30";
          const fillColor = up ? "#000000" : "#ffffff";
          return (
            <g key={i} className="candle" style={{ transitionDelay: `${i * 22}ms` }}>
              <line x1={x} x2={x} y1={y(Math.max(c.high, close))} y2={y(Math.min(c.low, close))} stroke={strokeColor} />
              <rect
                x={x - step * 0.32}
                y={top}
                width={step * 0.64}
                height={Math.max(1.5, bottom - top)}
                rx={1}
                fill={fillColor}
                stroke={strokeColor}
              />
            </g>
          );
        })}

        <polyline points={avg} fill="none" stroke="rgba(0,0,0,0.3)" strokeWidth="1.25" strokeDasharray="2 2" pathLength="1" className="avg" />

        {levels.map((l) => (
          <g key={l.label} className="level">
            <line x1={PAD.l} x2={W - PAD.r + 8} y1={y(l.v)} y2={y(l.v)} stroke={l.color} strokeDasharray="4 5" strokeOpacity="0.8" />
            <text x={PAD.l + 4} y={y(l.v) - 6} fill={l.color} className="font-mono text-[10px] font-semibold">
              {l.label} {fmt(l.v)}
            </text>
          </g>
        ))}

        <g style={{ transform: `translateY(${y(last)}px)`, transition: "transform 0.5s cubic-bezier(0.16,1,0.3,1)" }}>
          <rect x={W - PAD.r + 8} y={-11} width={78} height={22} rx={6} fill="#000000" />
          <text x={W - PAD.r + 47} y={4} textAnchor="middle" className="fill-white font-mono text-[11px] font-bold">
            {fmt(last)}
          </text>
        </g>
      </svg>
    </div>
  );
}
