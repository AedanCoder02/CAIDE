"use client";

import { useEffect, useMemo, useRef, useState } from "react";
import { Canvas, useFrame, useThree } from "@react-three/fiber";
import * as THREE from "three";

const vertexShader = /* glsl */ `
  varying vec2 vUv;
  void main() {
    vUv = uv;
    gl_Position = vec4(position.xy, 0.0, 1.0);
  }
`;

const fragmentShader = /* glsl */ `
  precision highp float;
  varying vec2 vUv;
  uniform float uTime;
  uniform vec2 uResolution;
  uniform float uVignette;

  float hash(vec2 p) {
    return fract(sin(dot(p, vec2(41.3, 289.1))) * 43758.5453);
  }

  float noise(vec2 p) {
    vec2 i = floor(p);
    vec2 f = fract(p);
    float a = hash(i);
    float b = hash(i + vec2(1.0, 0.0));
    float c = hash(i + vec2(0.0, 1.0));
    float d = hash(i + vec2(1.0, 1.0));
    vec2 u = f * f * (3.0 - 2.0 * f);
    return mix(a, b, u.x) + (c - a) * u.y * (1.0 - u.x) + (d - b) * u.x * u.y;
  }

  float fbm(vec2 p) {
    float v = 0.0;
    float a = 0.5;
    for (int i = 0; i < 5; i++) {
      v += a * noise(p);
      p *= 2.03;
      a *= 0.5;
    }
    return v;
  }

  // Aurora color pairs: [lower edge, upper rays]. The sky cycles through them,
  // mixing the green/teal night with the violet/magenta/blue one.
  void pair(int i, out vec3 lo, out vec3 hi) {
    if (i == 0) { lo = vec3(0.10, 1.00, 0.55); hi = vec3(0.20, 0.85, 1.00); }      // green -> cyan
    else if (i == 1) { lo = vec3(0.49, 0.36, 1.00); hi = vec3(0.93, 0.28, 0.60); } // violet -> magenta
    else if (i == 2) { lo = vec3(0.13, 0.83, 0.93); hi = vec3(0.49, 0.36, 1.00); } // cyan -> violet
    else if (i == 3) { lo = vec3(0.45, 1.00, 0.25); hi = vec3(0.95, 0.30, 0.70); } // lime -> pink
    else if (i == 4) { lo = vec3(0.25, 0.40, 1.00); hi = vec3(0.70, 0.30, 0.95); } // blue -> purple
    else { lo = vec3(0.06, 0.92, 0.75); hi = vec3(0.55, 0.40, 1.00); }             // teal -> lavender
  }

  // Current pair for a ribbon, cross-fading to the next every few seconds.
  void skyPair(float time, out vec3 lo, out vec3 hi) {
    float c = time / 4.5;
    float a = mod(floor(c), 6.0);
    float f = smoothstep(0.35, 1.0, fract(c));
    vec3 lo1; vec3 hi1; vec3 lo2; vec3 hi2;
    pair(int(a), lo1, hi1);
    pair(int(mod(a + 1.0, 6.0)), lo2, hi2);
    lo = mix(lo1, lo2, f);
    hi = mix(hi1, hi2, f);
  }

  // Rotate hue around the grey axis (YIQ space).
  vec3 hueShift(vec3 c, float a) {
    const mat3 toYIQ = mat3(0.299, 0.596, 0.211, 0.587, -0.274, -0.523, 0.114, -0.322, 0.312);
    const mat3 toRGB = mat3(1.0, 1.0, 1.0, 0.956, -0.272, -1.106, 0.621, -0.647, 1.703);
    vec3 yiq = toYIQ * c;
    float h = atan(yiq.z, yiq.y) + a;
    float ch = length(yiq.yz);
    return toRGB * vec3(yiq.x, ch * cos(h), ch * sin(h));
  }

  void main() {
    vec2 uv = vUv;
    float aspect = uResolution.x / uResolution.y;
    vec2 p = (uv - 0.5) * vec2(aspect, 1.0);
    // Motion runs 5x real time (time-lapse); colors cycle a little slower.
    float t = uTime * 5.0;
    float ct = uTime * 2.5;

    vec3 lo; vec3 hi;
    skyPair(ct, lo, hi);

    vec3 col = vec3(0.008, 0.01, 0.028);

    // Three ribbons of light, each a folded curtain with rays rising from its
    // lower edge. Folds travel sideways, the curtain sways, and bright waves
    // run along it, like a real aurora in a time-lapse.
    for (int i = 0; i < 3; i++) {
      float fi = float(i);
      float sp = 1.0 + fi * 0.3;
      vec3 rlo; vec3 rhi;
      skyPair(ct + fi * 6.0, rlo, rhi);   // each ribbon in a different phase of the cycle

      float fold = fbm(vec2(p.x * 0.7 - t * 0.32 * sp + fi * 4.1, t * 0.18 + fi));
      float sway = sin(t * 0.9 + fi * 2.3) * 0.08 + sin(t * 0.37 + fi) * 0.06;
      float ripple = sin(p.x * (3.0 + fi) - t * (2.6 + fi * 0.6)) * 0.05
                   + sin(p.x * 7.5 + t * 3.8 + fi * 3.0) * 0.018;
      float base = 0.14 - fi * 0.2 + (fold - 0.5) * 1.0 + ripple + sway;
      float d = p.y - base;

      // Rays: vertical striations that slide and shimmer.
      float rx = p.x * (15.0 + fi * 6.0) + fold * 10.0 - t * (2.2 + fi * 0.7);
      float rays = smoothstep(0.25, 0.85, fbm(vec2(rx, t * 1.4 + fi * 7.0)));
      float flicker = 0.7 + 0.3 * noise(vec2(rx * 0.3, t * 5.0));

      // Waves of brightness running along the ribbon.
      float wave = 0.55 + 0.45 * sin(p.x * 2.2 - t * (2.4 + fi * 0.5) + fold * 6.0);
      wave *= 0.7 + 0.3 * sin(p.x * 0.9 + t * 1.3 + fi * 2.0);

      float edge = exp(-pow(max(-d, 0.0) * 22.0, 2.0)) * exp(-max(d, 0.0) * 7.0);
      float curtain = smoothstep(-0.02, 0.02, d) * exp(-d * (2.0 + fi * 0.6));
      float glow = exp(-abs(d) * 4.0) * 0.25;

      vec3 c = mix(rlo, rhi, clamp(d * 2.2, 0.0, 1.0));
      float k = (edge * 1.3 + curtain * rays * 1.15 + glow) * flicker * (0.45 + 0.75 * wave);
      col += c * k * (1.0 - fi * 0.2);
    }

    // Whole-sky surge every few seconds.
    col *= 1.0 + 0.3 * pow(0.5 + 0.5 * sin(t * 0.8), 6.0);

    // Faint stars, hidden where the aurora is bright.
    float star = step(0.9975, hash(floor(uv * uResolution / 2.0)));
    col += vec3(0.8, 0.85, 1.0) * star * (0.5 + 0.5 * sin(t * 3.0 + hash(floor(uv * 300.0)) * 6.28)) * 0.5;

    // Horizon glow in the current lower color.
    col += lo * 0.18 * exp(-pow((p.y + 0.55) * 2.4, 2.0));

    col *= mix(1.0, smoothstep(1.6, 0.25, length(p * vec2(0.7, 1.0))), uVignette);
    col = 1.0 - exp(-col * 1.6);
    col = mix(vec3(dot(col, vec3(0.299, 0.587, 0.114))), col, 1.3);
    col = pow(max(col, 0.0), vec3(1.12));
    col += (hash(uv * uResolution + t) - 0.5) * 0.02;

    gl_FragColor = vec4(col, 1.0);
  }
`;

function Aurora({ vignette }: { vignette: number }) {
  const { size } = useThree();

  const uniforms = useMemo(
    () => ({
      uTime: { value: 0 },
      uResolution: { value: new THREE.Vector2(size.width, size.height) },
      uVignette: { value: vignette },
    }),
    // eslint-disable-next-line react-hooks/exhaustive-deps -- uniforms object must stay referentially stable; size is applied via mutation in useFrame
    []
  );

  /* eslint-disable react-hooks/immutability -- mutating shader uniform values in place is the standard three.js/r3f pattern, not React state */
  useFrame((_state, delta) => {
    uniforms.uTime.value += Math.min(delta, 0.1);
    uniforms.uResolution.value.set(size.width, size.height);
  });
  /* eslint-enable react-hooks/immutability */

  return (
    <mesh frustumCulled={false}>
      <planeGeometry args={[2, 2]} />
      <shaderMaterial
        vertexShader={vertexShader}
        fragmentShader={fragmentShader}
        uniforms={uniforms}
        depthTest={false}
        depthWrite={false}
      />
    </mesh>
  );
}

// vignette: 1 darkens the edges (hero), 0 keeps the whole frame lit (footer wordmark).
export default function HeroScene({ vignette = 1 }: { vignette?: number }) {
  const wrapRef = useRef<HTMLDivElement>(null);
  const [visible, setVisible] = useState(true);

  useEffect(() => {
    const el = wrapRef.current;
    if (!el) return;
    const io = new IntersectionObserver(([entry]) => setVisible(entry.isIntersecting));
    io.observe(el);
    return () => io.disconnect();
  }, []);

  return (
    <div ref={wrapRef} className="absolute inset-0">
      <Canvas
        orthographic
        camera={{ position: [0, 0, 1], zoom: 1 }}
        dpr={[1, 1.5]}
        frameloop={visible ? "always" : "never"}
        gl={{ antialias: false, powerPreference: "high-performance", preserveDrawingBuffer: true }}
      >
        <Aurora vignette={vignette} />
      </Canvas>
    </div>
  );
}
