import { useEffect, useState } from "react";
import { useInView } from "../../lib/hooks";

// Ilustrasi panel admin CMS: baris halaman baru masuk, status berubah, toast "Saved".
const TITLES = ["Company history", "Services", "Careers", "Client list", "Contact", "News: new branch office", "Team"];
const START = [
  { id: -1, title: "Home", status: "Published", updated: "2 days ago" },
  { id: -2, title: "About us", status: "Published", updated: "5 days ago" },
  { id: -3, title: "Projects", status: "Draft", updated: "1 week ago" },
];

export default function CrudTable() {
  const [ref, inView] = useInView({ threshold: 0.3 });
  const [rows, setRows] = useState(START);
  const [toast, setToast] = useState(0);

  useEffect(() => {
    if (!inView) return;
    let n = 0;
    const timer = setInterval(() => {
      const row = { id: n, title: TITLES[n % TITLES.length], status: n % 3 === 1 ? "Draft" : "Published", updated: "just now" };
      setRows((r) => [row, ...r].slice(0, 5));
      setToast((t) => t + 1);
      n++;
    }, 2600);
    return () => clearInterval(timer);
  }, [inView]);

  return (
    <div
      ref={ref}
      className="absolute inset-0 flex p-5 sm:p-8"
      role="img"
      aria-label="Illustration of a Laravel admin panel where new company-profile pages are created and saved"
    >
      <div className="flex w-full overflow-hidden rounded-2xl border border-black/10 bg-white shadow-xl">
        <div className="hidden w-32 shrink-0 flex-col gap-1 border-r border-black/[0.08] bg-[#f5f5f7] p-3 font-mono text-[0.7rem] text-[#6e6e73] sm:flex">
          <p className="mb-2 font-semibold text-[#1d1d1f]">macOS App</p>
          {["Dashboard", "Pages", "Posts", "Users"].map((item) => (
            <span key={item} className={`rounded-lg px-2.5 py-1.5 transition-colors ${item === "Pages" ? "bg-black text-white font-medium" : "hover:text-[#1d1d1f]"}`}>
              {item}
            </span>
          ))}
        </div>
        <div className="relative flex-1 p-4 bg-white">
          <div className="mb-4 flex items-center justify-between">
            <p className="font-semibold text-[#1d1d1f] text-sm">Pages</p>
            <span className="rounded-full bg-black px-3 py-1 font-mono text-[0.68rem] font-bold text-white shadow-sm">+ New page</span>
          </div>
          <div className="grid grid-cols-[1fr_auto] gap-x-4 border-b border-black/[0.08] pb-2 font-mono text-[0.65rem] uppercase tracking-wider text-[#86868b] sm:grid-cols-[1fr_auto_auto]">
            <span>Title</span>
            <span>Status</span>
            <span className="hidden sm:block">Updated</span>
          </div>
          {rows.map((r) => (
            <div
              key={r.id}
              className={`grid grid-cols-[1fr_auto] items-center gap-x-4 border-b border-black/[0.05] py-2.5 text-[0.8rem] text-[#1d1d1f] sm:grid-cols-[1fr_auto_auto] ${
                r.id >= 0 ? "row-flash" : ""
              }`}
            >
              <span className="truncate font-medium">{r.title}</span>
              <span
                className={`rounded-full px-2 py-0.5 font-mono text-[0.62rem] font-semibold ${
                  r.status === "Published" ? "bg-black/[0.06] text-black border border-black/10" : "bg-black/[0.02] text-[#86868b] border border-black/[0.05]"
                }`}
              >
                {r.status}
              </span>
              <span className="hidden font-mono text-[0.68rem] text-[#86868b] sm:block">{r.updated}</span>
            </div>
          ))}
          {toast > 0 && (
            <span key={toast} className="toast absolute bottom-4 right-4 rounded-xl border border-black/10 bg-black px-3.5 py-1.5 font-mono text-[0.7rem] font-semibold text-white shadow-lg">
              ✓ Saved to cloud
            </span>
          )}
        </div>
      </div>
    </div>
  );
}
