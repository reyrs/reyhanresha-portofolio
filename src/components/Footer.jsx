import { profile } from "../data";
import { useJakartaTime } from "../lib/hooks";
import { scrollToTarget } from "../lib/scroll";
import { ArrowUp } from "./Icons";

export default function Footer() {
  const time = useJakartaTime();
  return (
    <footer className="relative border-t border-black/[0.08] bg-[#fbfbfd]/90 backdrop-blur-xl" style={{ zIndex: "var(--z-content)" }}>
      <div className="shell flex flex-col gap-4 py-8 font-mono text-xs text-[#6e6e73] sm:flex-row sm:items-center sm:justify-between">
        <span>© 2026 {profile.name}. All systems operational.</span>
        <span>
          {profile.location} · <span className="tabular-nums font-semibold text-[#1d1d1f]">{time}</span> WIB
        </span>
        <button
          type="button"
          onClick={() => scrollToTarget("#top")}
          className="ulink inline-flex min-h-[40px] items-center gap-2 self-start font-medium text-[#1d1d1f] hover:text-black sm:self-auto cursor-pointer transition-colors"
        >
          Back to top <ArrowUp />
        </button>
      </div>
    </footer>
  );
}
