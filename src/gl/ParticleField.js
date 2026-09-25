import { Renderer, Camera, Geometry, Program, Mesh } from "ogl";
import { buildShapes, SHAPE_COUNT } from "./shapes";

// Satu canvas, satu draw call. Semua bentuk disimpan sebagai attribute p0..p5, lalu vertex
// shader mencampur bentuk "from" -> "to" sesuai progress scroll. CPU cuma update uniform.

const vertex = /* glsl */ `
attribute vec3 p0;
attribute vec3 p1;
attribute vec3 p2;
attribute vec3 p3;
attribute vec3 p4;
attribute vec3 p5;
attribute vec4 aRand;

uniform mat4 modelViewMatrix;
uniform mat4 projectionMatrix;
uniform float uFrom;
uniform float uTo;
uniform float uT;
uniform vec4 uXformA; // xyz offset, w scale
uniform vec4 uXformB;
uniform float uTime;
uniform float uIntro;
uniform float uVel;
uniform float uPixel;
uniform float uAlpha;
uniform vec3 uMouse; // xy = posisi dunia, z = kekuatan
uniform vec3 uColA;
uniform vec3 uColB;
uniform vec3 uColC;

varying vec3 vColor;
varying float vAlpha;

vec3 shapePos(float i) {
  if (i < 0.5) return p0;
  if (i < 1.5) return p1;
  if (i < 2.5) return p2;
  if (i < 3.5) return p3;
  if (i < 4.5) return p4;
  return p5;
}

vec2 rot(vec2 v, float a) {
  float c = cos(a);
  float s = sin(a);
  return vec2(v.x * c - v.y * s, v.x * s + v.y * c);
}

// gerak khas tiap bentuk
vec3 animate(vec3 p, float i) {
  if (i < 0.5) {
    float r = length(p.xy);
    p.xy = rot(p.xy, uTime * (0.05 + 0.16 / (r + 0.4)));
    p.z += sin(r * 3.0 - uTime * 1.2) * 0.04;
  } else if (i < 1.5) {
    p.xz = rot(p.xz, sin(uTime * 0.35) * 0.45);
  } else if (i < 2.5) {
    p.xz = rot(p.xz, uTime * 0.12);
    p.yz = rot(p.yz, 0.25);
  } else if (i < 3.5) {
    p.y += sin(p.x * 0.8 + uTime * 0.9) * 0.24 + sin(p.z * 1.3 + uTime * 0.7) * 0.18
         + cos((p.x - p.z) * 0.45 - uTime * 0.5) * 0.2;
  } else if (i < 4.5) {
    float r = length(p.xz);
    p.xz = rot(p.xz, uTime * (0.15 + 0.35 / (r + 0.25)));
  } else {
    p.z += sin(p.x * 1.4 + uTime * 1.1) * 0.06;
    p.y += sin(p.x * 0.9 + uTime * 0.8) * 0.035;
  }
  return p;
}

void main() {
  vec3 a = animate(shapePos(uFrom), uFrom) * uXformA.w + uXformA.xyz;
  vec3 b = animate(shapePos(uTo), uTo) * uXformB.w + uXformB.xyz;

  // tiap partikel berangkat di waktu berbeda -> kesan kawanan, bukan morph kaku
  float t = clamp((uT - aRand.x * 0.4) / 0.6, 0.0, 1.0);
  t = t * t * (3.0 - 2.0 * t);
  vec3 pos = mix(a, b, t);

  // pusaran di tengah transisi
  float mid = sin(t * 3.14159);
  vec3 swirl = vec3(
    sin(pos.y * 1.7 + uTime + aRand.y * 6.28),
    cos(pos.x * 1.5 + uTime * 0.9 + aRand.z * 6.28),
    sin(pos.x * 1.3 + pos.y + aRand.w * 6.28)
  );
  pos += swirl * mid * (0.35 + aRand.w * 0.5);

  // scroll cepat bikin partikel sedikit buyar
  pos += (aRand.xyz - 0.5) * uVel * 0.5;

  // intro: meledak dari satu titik
  float it = clamp((uIntro - aRand.y * 0.45) / 0.55, 0.0, 1.0);
  it = 1.0 - pow(1.0 - it, 3.0);
  pos = mix(uXformA.xyz + (aRand.xyz - 0.5) * 0.08, pos, it);

  // kursor mendorong partikel
  vec2 dm = pos.xy - uMouse.xy;
  float dist = length(dm);
  float push = (1.0 - smoothstep(0.0, 1.1, dist)) * uMouse.z;
  pos.xy += (dm / (dist + 0.0001)) * push * 0.45;
  pos.z += push * 0.4;

  vec4 mv = modelViewMatrix * vec4(pos, 1.0);
  gl_Position = projectionMatrix * mv;
  gl_PointSize = uPixel * (0.55 + aRand.w * 1.3) * (6.0 / -mv.z);

  float tone = aRand.z * aRand.z;
  vColor = mix(mix(uColA, uColB, tone), uColC, step(0.93, aRand.w)) + push * 0.35;
  float depth = 1.0 - smoothstep(3.5, 14.0, -mv.z);
  vAlpha = (0.28 + aRand.y * 0.62) * depth * uAlpha * (0.2 + 0.8 * it);
}
`;

const fragment = /* glsl */ `
precision mediump float;
varying vec3 vColor;
varying float vAlpha;
void main() {
  vec2 c = gl_PointCoord - 0.5;
  float d = length(c);
  float a = 1.0 - smoothstep(0.0, 0.5, d);
  gl_FragColor = vec4(vColor, a * a * vAlpha);
}
`;

const hex = (h) => [1, 3, 5].map((i) => parseInt(h.slice(i, i + 2), 16) / 255);

// Posisi & skala tiap bentuk. Desktop: objek di kanan, teks di kiri. Mobile: tengah & redup.
function layoutFor(aspect) {
  const halfW = Math.tan((22.5 * Math.PI) / 180) * 6 * aspect;
  if (aspect < 0.9) {
    const s = Math.min(1, halfW / 2.3);
    return [
      [0, 0.3, 0, s],
      [0, 0, 0, s * 0.95],
      [0, 0, 0, s],
      [0, -0.6, 0, 1],
      [0, 0, 0, s],
      [0, 0.9, 0, s * 0.9],
    ];
  }
  const right = Math.min(halfW - 2.1, 2.6);
  return [
    [right * 0.75, 0.15, 0, 1],
    [right, -0.25, 0, 1.05],
    [right, 0, 0, 0.95],
    [0, -0.6, 0, 1],
    [right + 0.2, 0, 0, 1],
    [right * 0.7, 0.6, 0, 0.75],
  ];
}

export async function createParticleField(canvas, { reduceMotion = false } = {}) {
  const dpr = Math.min(window.devicePixelRatio || 1, 1.75);
  const renderer = new Renderer({
    canvas,
    dpr,
    alpha: true,
    depth: false,
    antialias: false,
    powerPreference: "high-performance",
  });
  const gl = renderer.gl;
  gl.clearColor(0, 0, 0, 0);

  const camera = new Camera(gl, { fov: 45, near: 0.1, far: 50 });
  camera.position.set(0, 0, 6);

  // font untuk bentuk "hello" harus sudah siap sebelum di-sample
  try {
    await document.fonts.load('italic 400 220px "Instrument Serif"');
  } catch {
    /* fallback ke Georgia */
  }

  const w = window.innerWidth;
  const cores = navigator.hardwareConcurrency || 4;
  let count = w >= 1280 ? 16000 : w >= 768 ? 10000 : 6000;
  if (cores <= 4) count = Math.round(count * 0.6);

  const shapes = buildShapes(count);
  const rand = new Float32Array(count * 4);
  for (let i = 0; i < rand.length; i++) rand[i] = Math.random();

  const attrs = { aRand: { size: 4, data: rand } };
  for (let i = 0; i < SHAPE_COUNT; i++) attrs[`p${i}`] = { size: 3, data: shapes[i] };
  const geometry = new Geometry(gl, attrs);

  const uniforms = {
    uFrom: { value: 0 },
    uTo: { value: 0 },
    uT: { value: 0 },
    uXformA: { value: [0, 0, 0, 1] },
    uXformB: { value: [0, 0, 0, 1] },
    uTime: { value: 0 },
    uIntro: { value: reduceMotion ? 1 : 0 },
    uVel: { value: 0 },
    uPixel: { value: 2 * dpr },
    uAlpha: { value: 0.18 },
    uMouse: { value: [99, 99, 0] },
    uColA: { value: hex("#111111") },
    uColB: { value: hex("#555555") },
    uColC: { value: hex("#888888") },
  };

  const program = new Program(gl, {
    vertex,
    fragment,
    uniforms,
    transparent: true,
    depthTest: false,
    depthWrite: false,
  });
  program.setBlendFunc(gl.SRC_ALPHA, gl.ONE_MINUS_SRC_ALPHA);

  const mesh = new Mesh(gl, { mode: gl.POINTS, geometry, program });
  // bentuk bergerak di shader, bounds CPU tidak akurat -> jangan di-cull
  mesh.frustumCulled = false;

  let layout = layoutFor(1);
  let aspect = 1;
  let halfH = Math.tan((22.5 * Math.PI) / 180) * 6;
  const resize = () => {
    renderer.setSize(window.innerWidth, window.innerHeight);
    aspect = window.innerWidth / window.innerHeight;
    camera.perspective({ aspect });
    layout = layoutFor(aspect);
    uniforms.uAlpha.value = aspect < 0.9 ? 0.14 : 0.22;
    uniforms.uPixel.value = (aspect < 0.9 ? 1.6 : 2) * dpr;
  };
  resize();

  const mouse = { x: 99, y: 99, tx: 99, ty: 99, strength: 0, target: 0 };
  const onPointer = (e) => {
    if (e.pointerType === "touch") return;
    const nx = (e.clientX / window.innerWidth) * 2 - 1;
    const ny = -(e.clientY / window.innerHeight) * 2 + 1;
    mouse.tx = nx * halfH * aspect;
    mouse.ty = ny * halfH;
    if (mouse.x === 99) {
      mouse.x = mouse.tx;
      mouse.y = mouse.ty;
    }
    mouse.target = 1;
  };
  const onLeave = () => (mouse.target = 0);
  if (!reduceMotion) {
    window.addEventListener("pointermove", onPointer, { passive: true });
    document.addEventListener("pointerleave", onLeave);
  }

  let lost = false;
  const onLost = (e) => {
    e.preventDefault();
    lost = true;
  };
  canvas.addEventListener("webglcontextlost", onLost);

  const state = { morph: 0, velocity: 0, time: 0 };

  function render(deltaSeconds) {
    if (lost) return;
    const dt = Math.min(deltaSeconds, 0.05);
    if (!reduceMotion) state.time += dt;

    const s = Math.max(0, Math.min(SHAPE_COUNT - 1, state.morph));
    const from = Math.floor(s);
    const to = Math.min(from + 1, SHAPE_COUNT - 1);
    uniforms.uFrom.value = from;
    uniforms.uTo.value = to;
    uniforms.uT.value = s - from;
    uniforms.uXformA.value = layout[from];
    uniforms.uXformB.value = layout[to];
    uniforms.uTime.value = state.time;

    const k = 1 - Math.pow(0.001, dt);
    uniforms.uVel.value += (Math.min(1, Math.abs(state.velocity) / 60) - uniforms.uVel.value) * k;
    mouse.x += (mouse.tx - mouse.x) * k * 0.6;
    mouse.y += (mouse.ty - mouse.y) * k * 0.6;
    mouse.strength += (mouse.target - mouse.strength) * k * 0.3;
    uniforms.uMouse.value = [mouse.x, mouse.y, mouse.strength];

    // parallax kamera tipis mengikuti kursor
    if (!reduceMotion && mouse.tx !== 99) {
      camera.position.x += ((mouse.tx / (halfH * aspect)) * 0.25 - camera.position.x) * k * 0.2;
      camera.position.y += ((mouse.ty / halfH) * 0.18 - camera.position.y) * k * 0.2;
      camera.lookAt([0, 0, 0]);
    }

    renderer.render({ scene: mesh, camera });
  }

  return {
    state,
    uniforms,
    render,
    resize,
    destroy() {
      window.removeEventListener("pointermove", onPointer);
      document.removeEventListener("pointerleave", onLeave);
      canvas.removeEventListener("webglcontextlost", onLost);
      geometry.remove();
      program.remove();
      gl.getExtension("WEBGL_lose_context")?.loseContext();
    },
  };
}
