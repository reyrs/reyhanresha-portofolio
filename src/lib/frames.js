// Loader untuk urutan frame animasi scroll. Frame pertama langsung dimuat (jadi poster),
// sisanya bertahap dari kasar ke rapat (tiap 16, 8, 4, 2, lalu 1 frame). Scrub sudah bisa
// jalan dengan frame terdekat walau belum semua file selesai diunduh.
export function createFrameLoader({ count, src, concurrency = 6, onLoad }) {
  const images = new Array(count).fill(null);
  const order = [];
  const queued = new Uint8Array(count);
  const push = (i) => {
    if (i >= 0 && i < count && !queued[i]) {
      queued[i] = 1;
      order.push(i);
    }
  };
  queued[0] = 1; // frame pertama dimuat terpisah di bawah
  push(count - 1);
  for (const step of [16, 8, 4, 2, 1]) for (let i = 0; i < count; i += step) push(i);

  let cursor = 0;
  let started = false;
  let cancelled = false;
  let loaded = 0;

  const load = (i) =>
    new Promise((resolve) => {
      const img = new Image();
      img.decoding = "async";
      img.src = src(i);
      img
        .decode()
        .then(() => {
          if (cancelled) return;
          images[i] = img;
          loaded += 1;
          onLoad?.(i, loaded / count);
        })
        .catch(() => {})
        .finally(resolve);
    });

  const worker = async () => {
    while (!cancelled && cursor < order.length) await load(order[cursor++]);
  };

  load(0);

  return {
    count,
    get: (i) => images[i],
    // frame terdekat yang sudah siap (dipakai selama frame persisnya belum terunduh)
    nearest(i) {
      if (images[i]) return i;
      for (let d = 1; d < count; d++) {
        if (images[i - d]) return i - d;
        if (images[i + d]) return i + d;
      }
      return -1;
    },
    start() {
      if (started || cancelled) return;
      started = true;
      for (let k = 0; k < concurrency; k++) worker();
    },
    destroy() {
      cancelled = true;
      images.fill(null);
    },
  };
}
