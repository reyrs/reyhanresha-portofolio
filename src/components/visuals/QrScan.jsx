import { useEffect, useMemo, useState } from "react";
import { useInView } from "../../lib/hooks";
import { Check } from "../Icons";

// Ilustrasi absensi QR: garis laser memindai kode, log check-in bertambah (Apple Light Minimalist).
const SIZE = 21;
const PEOPLE = ["Dimas Pratama", "Rina Kartika", "Aldi Nugroho", "Salsabila Putri", "Fajar Hidayat", "Nadia Rahma"];

function makeModules() {
  let seed = 21;
  const rand = () => ((seed = (seed * 16807) % 2147483647) / 2147483647);
  const cells = [];
  const inFinder = (x, y) =>
    (x < 8 && y < 8) || (x > SIZE - 9 && y < 8) || (x < 8 && y > SIZE - 9);
  for (let y = 0; y < SIZE; y++) {
    for (let x = 0; x < SIZE; x++) {
      if (!inFinder(x, y) && rand() > 0.52) cells.push([x, y]);
    }
  }
  return cells;
}

function Finder({ x, y }) {
  return (
    <g transform={`translate(${x} ${y})`}>
      <rect x="0.5" y="0.5" width="6" height="6" fill="none" stroke="currentColor" />
      <rect x="2" y="2" width="3" height="3" fill="currentColor" />
    </g>
  );
}

export default function QrScan() {
  const [ref, inView] = useInView({ threshold: 0.3 });
  const modules = useMemo(makeModules, []);
  const [log, setLog] = useState([]);

  useEffect(() => {
    if (!inView) return;
    let n = 0;
    const add = () => {
      const minutes = 7 * 60 + 49 + n * 3;
      const time = `${String(Math.floor(minutes / 60)).padStart(2, "0")}:${String(minutes % 60).padStart(2, "0")}`;
      const name = PEOPLE[n % PEOPLE.length];
      const id = n;
      setLog((l) => [{ id, time, name }, ...l].slice(0, 4));
      n++;
    };
    add();
    const timer = setInterval(add, 2200);
    return () => clearInterval(timer);
  }, [inView]);

  return (
    <div
      ref={ref}
      className="absolute inset-0 grid grid-rows-[1fr_auto] gap-5 p-5 sm:grid-cols-[1fr_1fr] sm:grid-rows-1 sm:p-8"
      role="img"
      aria-label="Illustration of a QR attendance scanner logging staff check-ins"
    >
      <div className="flex items-center justify-center">
        <div className="hud relative aspect-square w-full max-w-[230px] p-4 rounded-2xl bg-white border border-black/10 shadow-xl">
          <svg viewBox={`0 0 ${SIZE} ${SIZE}`} className="h-full w-full text-black" shapeRendering="crispEdges">
            {modules.map(([x, y]) => (
              <rect key={`${x}-${y}`} x={x} y={y} width="1" height="1" fill="currentColor" opacity="0.9" />
            ))}
            <Finder x={0} y={0} />
            <Finder x={SIZE - 7} y={0} />
            <Finder x={0} y={SIZE - 7} />
          </svg>
          <span
            className="absolute inset-x-2 top-2 h-[12%] bg-gradient-to-b from-transparent to-black/30"
            style={{
              borderBottom: "2px solid #000000",
              filter: "drop-shadow(0 0 6px rgba(0,0,0,0.4))",
              animation: "scan 2.2s cubic-bezier(0.65,0,0.35,1) infinite alternate",
              animationPlayState: inView ? "running" : "paused",
            }}
          />
        </div>
      </div>
      <div className="flex flex-col justify-center gap-2.5 overflow-hidden">
        <p className="font-mono text-xs uppercase tracking-wider text-[#86868b] mb-1">Today · Live Verification</p>
        {log.map((row) => (
          <div key={row.id} className="chat-pop flex items-center gap-3 rounded-xl border border-black/[0.08] bg-[#f5f5f7] px-3.5 py-2.5 text-sm text-[#1d1d1f] shadow-xs">
            <span className="grid h-6 w-6 shrink-0 place-items-center rounded-full bg-black text-white">
              <Check />
            </span>
            <span className="truncate font-medium">{row.name}</span>
            <span className="ml-auto font-mono text-xs text-[#86868b] tabular-nums">{row.time}</span>
          </div>
        ))}
      </div>
    </div>
  );
}
