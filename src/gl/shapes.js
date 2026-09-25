// Generator bentuk partikel. Tiap fungsi mengisi Float32Array(count * 3) dengan posisi xyz
// di sekitar titik (0,0,0), kira-kira dalam radius 2.5 unit. Semua deterministik (seeded)
// supaya bentuknya sama tiap reload.

const TAU = Math.PI * 2;

function rng(seed) {
  let a = seed >>> 0;
  return () => {
    a = (a + 0x6d2b79f5) >>> 0;
    let t = a;
    t = Math.imul(t ^ (t >>> 15), t | 1);
    t ^= t + Math.imul(t ^ (t >>> 7), t | 61);
    return ((t ^ (t >>> 14)) >>> 0) / 4294967296;
  };
}

function gaussFrom(rand) {
  return () => {
    const u = 1 - rand();
    const v = rand();
    return Math.sqrt(-2 * Math.log(u)) * Math.cos(TAU * v);
  };
}

function rotateX(out, i, angle) {
  const y = out[i + 1];
  const z = out[i + 2];
  const c = Math.cos(angle);
  const s = Math.sin(angle);
  out[i + 1] = y * c - z * s;
  out[i + 2] = y * s + z * c;
}

// 0 — Hero: cincin partikel (orbit) + debu bintang di sekitarnya
export function ring(count) {
  const out = new Float32Array(count * 3);
  const rand = rng(11);
  const gauss = gaussFrom(rand);
  for (let n = 0; n < count; n++) {
    const i = n * 3;
    const pick = rand();
    const a = rand() * TAU;
    let r;
    let z;
    if (pick < 0.72) {
      // pita utama, tebal di tengah menipis ke luar
      r = 2.05 + gauss() * 0.07 * (1 + 2.5 * Math.pow(rand(), 3));
      z = gauss() * 0.06;
    } else if (pick < 0.9) {
      // serabut ke dalam
      r = 2.05 * (0.55 + Math.pow(rand(), 0.6) * 0.45);
      z = gauss() * 0.12;
    } else {
      // debu jauh
      r = 2.6 + rand() * 3.2;
      z = (rand() - 0.5) * 3;
    }
    out[i] = Math.cos(a) * r;
    out[i + 1] = Math.sin(a) * r;
    out[i + 2] = z;
    rotateX(out, i, 0.28);
  }
  return out;
}

// 1 — About: kepala + bahu gaya hologram, partikel dikumpulkan di garis kontur horizontal
export function bust(count) {
  const out = new Float32Array(count * 3);
  const rand = rng(23);
  const gauss = gaussFrom(rand);
  const step = 0.06;
  // profil lebar (x) dan tebal (z) per ketinggian y
  const profile = (y) => {
    if (y > 0.12) {
      const t = (y - 0.78) / 0.8;
      if (Math.abs(t) > 1) return null;
      const s = Math.sqrt(1 - t * t);
      const chin = y < 0.78 ? 1 - 0.2 * ((0.78 - y) / 0.8) : 1;
      return [0.6 * s * chin, 0.7 * s];
    }
    if (y > -0.34) return [0.26, 0.28];
    const t = (-0.34 - y) / 1.5;
    if (t > 1) return null;
    const rise = Math.sqrt(Math.min(1, t * 3.4));
    return [0.28 + 1.3 * rise, 0.32 + 0.34 * rise];
  };
  let n = 0;
  const core = Math.floor(count * 0.1);
  while (n < count) {
    const i = n * 3;
    if (n < core) {
      // inti bercahaya di dalam kepala
      out[i] = gauss() * 0.1;
      out[i + 1] = 0.8 + gauss() * 0.1;
      out[i + 2] = 0.12 + gauss() * 0.1;
      n++;
      continue;
    }
    const yRaw = -1.84 + rand() * 3.42;
    const y = Math.round(yRaw / step) * step;
    const p = profile(y);
    if (!p) continue;
    // buang sebagian titik di irisan kecil supaya kepadatan per garis rata
    if (rand() > (p[0] + 0.25) / 1.85) continue;
    const a = rand() * TAU;
    out[i] = Math.cos(a) * p[0];
    out[i + 1] = y + gauss() * 0.004;
    out[i + 2] = Math.sin(a) * p[1];
    rotateX(out, i, 0.16);
    n++;
  }
  return out;
}

// 2 — Stack: graf jaringan (node + garis) mengelilingi bola partikel
export function network(count) {
  const out = new Float32Array(count * 3);
  const rand = rng(37);
  const gauss = gaussFrom(rand);
  const nodes = [[0, 0, 0]];
  for (let k = 0; k < 6; k++) {
    const a = (k / 6) * TAU + 0.26;
    nodes.push([Math.cos(a) * 1.25, Math.sin(a) * 1.25, (rand() - 0.5) * 0.6]);
  }
  for (let k = 0; k < 12; k++) {
    const a = (k / 12) * TAU + 0.1;
    const r = 2.25 + (rand() - 0.5) * 0.3;
    nodes.push([Math.cos(a) * r, Math.sin(a) * r, (rand() - 0.5) * 1]);
  }
  const edges = [];
  for (let k = 1; k <= 6; k++) {
    edges.push([0, k]);
    edges.push([k, 7 + 2 * (k - 1)]);
    edges.push([k, 7 + 2 * (k - 1) + 1]);
    edges.push([k, (k % 6) + 1]);
  }
  for (let k = 0; k < 12; k++) edges.push([7 + k, 7 + ((k + 1) % 12)]);

  for (let n = 0; n < count; n++) {
    const i = n * 3;
    const pick = rand();
    if (pick < 0.26) {
      // bola di pusat: kulit bola + sedikit isi
      const x = gauss();
      const y = gauss();
      const z = gauss();
      const r = (0.55 * (rand() < 0.8 ? 1 : Math.cbrt(rand()))) / (Math.hypot(x, y, z) || 1);
      out[i] = x * r;
      out[i + 1] = y * r;
      out[i + 2] = z * r;
    } else if (pick < 0.44) {
      const nd = nodes[1 + Math.floor(rand() * (nodes.length - 1))];
      out[i] = nd[0] + gauss() * 0.05;
      out[i + 1] = nd[1] + gauss() * 0.05;
      out[i + 2] = nd[2] + gauss() * 0.05;
    } else if (pick < 0.92) {
      const e = edges[Math.floor(rand() * edges.length)];
      const a = nodes[e[0]];
      const b = nodes[e[1]];
      const t = rand();
      out[i] = a[0] + (b[0] - a[0]) * t + gauss() * 0.008;
      out[i + 1] = a[1] + (b[1] - a[1]) * t + gauss() * 0.008;
      out[i + 2] = a[2] + (b[2] - a[2]) * t + gauss() * 0.008;
    } else {
      out[i] = (rand() - 0.5) * 7;
      out[i + 1] = (rand() - 0.5) * 5;
      out[i + 2] = (rand() - 0.5) * 3;
    }
  }
  return out;
}

// 3 — Work: lantai grid titik (gelombang dianimasikan di shader)
export function wave(count) {
  const out = new Float32Array(count * 3);
  const rand = rng(41);
  const cols = Math.round(Math.sqrt(count * 1.9));
  const rows = Math.ceil(count / cols);
  for (let n = 0; n < count; n++) {
    const i = n * 3;
    const cx = n % cols;
    const rz = Math.floor(n / cols);
    out[i] = (cx / (cols - 1) - 0.5) * 11 + (rand() - 0.5) * 0.01;
    out[i + 1] = 0;
    out[i + 2] = -5 + (rz / Math.max(1, rows - 1)) * 7.2;
  }
  return out;
}

// 4 — Experience: pusaran jam pasir (tornado)
export function vortex(count) {
  const out = new Float32Array(count * 3);
  const rand = rng(53);
  const gauss = gaussFrom(rand);
  for (let n = 0; n < count; n++) {
    const i = n * 3;
    if (rand() < 0.1) {
      out[i] = (rand() - 0.5) * 5;
      out[i + 1] = (rand() - 0.5) * 5;
      out[i + 2] = (rand() - 0.5) * 3;
      continue;
    }
    const y = (rand() * 2 - 1) * 2.3;
    const r = Math.sqrt(0.05 + 0.32 * y * y) * (1 + gauss() * 0.05);
    const a = rand() * TAU;
    out[i] = Math.cos(a) * r;
    out[i + 1] = y;
    out[i + 2] = Math.sin(a) * r;
  }
  return out;
}

// 5 — Contact: tulisan (sampling piksel dari canvas 2D)
export function text(count, word = "hello", font = 'italic 400 220px "Instrument Serif", Georgia, serif') {
  const out = new Float32Array(count * 3);
  const rand = rng(67);
  const canvas = document.createElement("canvas");
  const ctx = canvas.getContext("2d", { willReadFrequently: true });
  ctx.font = font;
  const w = Math.ceil(ctx.measureText(word).width) + 40;
  const h = 300;
  canvas.width = w;
  canvas.height = h;
  ctx.font = font;
  ctx.fillStyle = "#fff";
  ctx.textBaseline = "middle";
  ctx.fillText(word, 20, h / 2);
  const data = ctx.getImageData(0, 0, w, h).data;
  const pts = [];
  for (let y = 0; y < h; y += 2) {
    for (let x = 0; x < w; x += 2) {
      if (data[(y * w + x) * 4 + 3] > 128) pts.push(x, y);
    }
  }
  const scale = 4.2 / w;
  if (!pts.length) return wave(count);
  for (let n = 0; n < count; n++) {
    const i = n * 3;
    const k = Math.floor(rand() * (pts.length / 2)) * 2;
    out[i] = (pts[k] - w / 2 + (rand() - 0.5) * 2) * scale;
    out[i + 1] = -(pts[k + 1] - h / 2 + (rand() - 0.5) * 2) * scale;
    out[i + 2] = (rand() - 0.5) * 0.12;
  }
  return out;
}

export const SHAPE_COUNT = 6;

export function buildShapes(count) {
  return [ring(count), bust(count), network(count), wave(count), vortex(count), text(count)];
}
