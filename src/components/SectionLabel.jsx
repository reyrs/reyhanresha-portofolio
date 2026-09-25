export default function SectionLabel({ children }) {
  return (
    <div className="inline-flex items-center gap-2 rounded-full border border-black/[0.08] bg-black/[0.04] px-3.5 py-1 text-[11px] font-mono font-medium uppercase tracking-widest text-[#1d1d1f] backdrop-blur-md shadow-sm">
      <span className="h-1.5 w-1.5 rounded-full bg-black shadow-[0_0_4px_rgba(0,0,0,0.3)]" />
      <span>{children}</span>
    </div>
  );
}
