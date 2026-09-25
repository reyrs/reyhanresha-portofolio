import { gsap, SplitText } from "./scroll";

// Teks yang "ditabrak" kartu profil saat di-drag: huruf/elemen terpental keluar dari area kartu,
// berputar, lalu kembali ke tempatnya dengan pegas. Target ditandai:
//   data-shatter="chars"  -> dipecah per huruf (SplitText), tiap huruf terpental sendiri
//   data-shatter="block"  -> elemen terpental utuh (chip, tombol, teks yang isinya berubah-ubah)
// Target di dalam [data-shatter-fixed] (nav fixed) dihitung dengan koordinat viewport,
// sisanya koordinat dokumen supaya tetap benar walau halaman di-scroll.
// Gerakan ditulis ke properti CSS `translate`/`rotate`, jadi tidak bentrok dengan transform GSAP
// yang sudah ada di elemen (magnet tombol, animasi intro).

const SPRING = 0.035; // tarikan balik ke posisi asal
const DAMP = 0.88; // redaman kecepatan per frame
const SPIN_SPRING = 0.04;
const SPIN_DAMP = 0.86;
const REPEL = 0.6; // dorongan keluar selama masih di dalam area kartu
const PAD = 6;
const MAX_V = 45;

const clamp = (v, max) => (v > max ? max : v < -max ? -max : v);

export function createShatterField(getCollider) {
  const records = new Map(); // elemen target -> { split, items }
  let items = [];
  let active = false;
  let running = false;
  let quiet = 0;
  let last = null;

  const makeItem = (el, fixed, mass) => ({
    el,
    fixed,
    mass,
    hx: 0,
    hy: 0,
    hw: 0,
    hh: 0,
    x: 0,
    y: 0,
    r: 0,
    vx: 0,
    vy: 0,
    vr: 0,
    inside: false,
    moving: false,
  });

  // Pecah target yang belum dipecah (atau yang DOM-nya sudah diganti, misal oleh revert SplitText intro)
  const sync = () => {
    let dirty = false;
    for (const [el] of records) {
      if (!el.isConnected) {
        records.delete(el);
        dirty = true;
      }
    }
    for (const el of document.querySelectorAll("[data-shatter]")) {
      const rec = records.get(el);
      if (rec && rec.items.every((it) => it.el.isConnected)) continue;
      const fixed = !!el.closest("[data-shatter-fixed]");
      if (el.dataset.shatter === "block") {
        const r = el.getBoundingClientRect();
        const mass = Math.min(6, Math.max(1.5, (r.width * r.height) / 900));
        records.set(el, { split: null, items: [makeItem(el, fixed, mass)] });
      } else {
        // teks gradient (background-clip: text) tidak ikut terlihat kalau hurufnya di-transform,
        // jadi diganti warna solid sebelum dipecah
        const fill = getComputedStyle(el).webkitTextFillColor;
        if (fill === "transparent" || fill === "rgba(0, 0, 0, 0)") {
          el.style.background = "none";
          el.style.webkitTextFillColor = "currentColor";
        }
        const split = SplitText.create(el, {
          type: "words,chars",
          // Scramble (isi berubah terus) & teks sr-only jangan ikut dipecah
          ignore: ".sr-only, [aria-hidden='true']",
        });
        records.set(el, { split, items: split.chars.map((c) => makeItem(c, fixed, 1)) });
      }
      dirty = true;
    }
    if (dirty) items = [...records.values()].flatMap((r) => r.items);
  };

  // Posisi asal diukur ulang tiap drag dimulai (layout bisa berubah karena resize/scroll)
  const measure = () => {
    const sx = window.scrollX;
    const sy = window.scrollY;
    for (const it of items) {
      if (it.moving) continue;
      const r = it.el.getBoundingClientRect();
      it.hw = r.width / 2;
      it.hh = r.height / 2;
      it.hx = r.left + it.hw + (it.fixed ? 0 : sx);
      it.hy = r.top + it.hh + (it.fixed ? 0 : sy);
    }
  };

  const tick = (_time, deltaMs) => {
    const k = Math.min(deltaMs / 16.667, 3);
    const box = getCollider();
    const sx = window.scrollX;
    const sy = window.scrollY;

    // kecepatan kartu (koordinat dokumen, px per frame 60fps)
    let cvx = 0;
    let cvy = 0;
    if (box) {
      const cx = box.left + box.width / 2 + sx;
      const cy = box.top + box.height / 2 + sy;
      if (last) {
        cvx = (cx - last.x) / k;
        cvy = (cy - last.y) / k;
      }
      last = { x: cx, y: cy };
    }
    const speed = Math.hypot(cvx, cvy);
    const damp = Math.pow(DAMP, k);
    const spinDamp = Math.pow(SPIN_DAMP, k);
    let busy = false;

    for (const it of items) {
      if (box) {
        const ox = it.fixed ? 0 : sx;
        const oy = it.fixed ? 0 : sy;
        const pad = PAD + Math.min(it.hw, it.hh);
        const L = box.left + ox - pad;
        const R = box.right + ox + pad;
        const T = box.top + oy - pad;
        const B = box.bottom + oy + pad;
        const px = it.hx + it.x;
        const py = it.hy + it.y;

        if (px > L && px < R && py > T && py < B) {
          if (!it.inside) {
            // tabrakan pertama: lempar menjauh dari pusat kartu, ikut arah & kecepatan kartu
            let dx = px - (L + R) / 2;
            let dy = py - (T + B) / 2;
            const d = Math.hypot(dx, dy) || 1;
            dx /= d;
            dy /= d;
            const hit = (3 + speed * 0.9) / Math.sqrt(it.mass);
            it.vx += dx * hit + (cvx * 0.6) / it.mass;
            it.vy += dy * hit + (cvy * 0.6) / it.mass;
            it.vr += ((Math.random() - 0.5) * (10 + speed * 1.6)) / it.mass;
            it.inside = true;
          }
          // selama masih di dalam, dorong keluar lewat sisi terdekat
          const dl = px - L;
          const dr = R - px;
          const dt = py - T;
          const db = B - py;
          const depth = Math.min(dl, dr, dt, db);
          const push = (Math.min(depth, 60) * REPEL * k) / it.mass;
          if (depth === dl) it.vx -= push;
          else if (depth === dr) it.vx += push;
          else if (depth === dt) it.vy -= push;
          else it.vy += push;
          it.moving = true;
        } else {
          it.inside = false;
        }
      }
      if (!it.moving) continue;

      it.vx = clamp((it.vx - it.x * SPRING * k) * damp, MAX_V);
      it.vy = clamp((it.vy - it.y * SPRING * k) * damp, MAX_V);
      it.vr = clamp((it.vr - it.r * SPIN_SPRING * k) * spinDamp, MAX_V);
      it.x += it.vx * k;
      it.y += it.vy * k;
      it.r += it.vr * k;

      const settled =
        !it.inside &&
        Math.abs(it.x) < 0.25 &&
        Math.abs(it.y) < 0.25 &&
        Math.abs(it.r) < 0.25 &&
        Math.abs(it.vx) + Math.abs(it.vy) + Math.abs(it.vr) < 0.15;
      if (settled) {
        it.x = it.y = it.r = it.vx = it.vy = it.vr = 0;
        it.moving = false;
        it.el.style.translate = "";
        it.el.style.rotate = "";
      } else {
        busy = true;
        it.el.style.translate = `${it.x.toFixed(2)}px ${it.y.toFixed(2)}px`;
        it.el.style.rotate = `${it.r.toFixed(2)}deg`;
      }
    }

    // berhenti kalau tidak di-drag, kartu sudah diam, dan semua huruf sudah kembali
    quiet = !active && !busy && speed < 0.05 ? quiet + 1 : 0;
    if (quiet > 20) stop();
  };

  const start = () => {
    if (running) return;
    running = true;
    quiet = 0;
    gsap.ticker.add(tick);
  };

  const stop = () => {
    running = false;
    last = null;
    gsap.ticker.remove(tick);
  };

  return {
    begin() {
      sync();
      measure();
      active = true;
      start();
    },
    end() {
      active = false; // ticker jalan terus sampai kartu selesai memantul & huruf kembali
    },
    destroy() {
      stop();
      for (const it of items) {
        it.el.style.translate = "";
        it.el.style.rotate = "";
      }
      for (const [el, rec] of records) {
        rec.split?.revert();
        el.style.background = "";
        el.style.webkitTextFillColor = "";
      }
      records.clear();
      items = [];
    },
  };
}
