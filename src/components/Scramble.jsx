import { useEffect, useRef } from "react";
import { gsap, reduceMotion } from "../lib/scroll";

const GLYPHS = "01<>/_{}[]#$%&*+=";

// Kata yang berganti tiap beberapa detik dengan efek "decode" karakter acak.
// Screen reader membaca daftar lengkapnya lewat teks sr-only.
export default function Scramble({ words, interval = 2.8 }) {
  const el = useRef(null);

  useEffect(() => {
    if (reduceMotion || words.length < 2) return;
    let index = 0;
    let tween = null;

    const swap = (to) => {
      const from = el.current.textContent;
      const len = Math.max(from.length, to.length);
      const p = { v: 0 };
      tween = gsap.to(p, {
        v: 1,
        duration: 0.9,
        ease: "none",
        onUpdate: () => {
          let out = "";
          for (let i = 0; i < len; i++) {
            const settle = i / len;
            if (p.v > settle + 0.25) out += to[i] ?? "";
            else if (p.v > settle * 0.6) out += GLYPHS[(Math.random() * GLYPHS.length) | 0];
            else out += from[i] ?? "";
          }
          el.current.textContent = out;
        },
        onComplete: () => (el.current.textContent = to),
      });
    };

    const call = gsap.delayedCall(interval, function loop() {
      // jangan animasi kalau tab tidak aktif atau hero sudah lewat
      if (!document.hidden && el.current.getBoundingClientRect().bottom > 0) {
        index = (index + 1) % words.length;
        swap(words[index]);
      }
      call.restart(true);
    });

    return () => {
      call.kill();
      tween?.kill();
    };
  }, [words, interval]);

  return (
    <>
      <span className="sr-only">{words.join(", ")}</span>
      <span ref={el} aria-hidden="true" className="font-mono text-[0.92em] text-gold">
        {words[0]}
      </span>
    </>
  );
}
