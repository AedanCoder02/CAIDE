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

  // Aurora color pairs: [lower edge, upper rays]. The sky cycles through them.
  void pair(int i, out vec3 lo, out vec3 hi) {
    if (i == 0) { lo = vec3(0.10, 1.00, 0.62); hi = vec3(0.49, 0.36, 1.00); }      // emerald -> violet
    else if (i == 1) { lo = vec3(0.13, 0.83, 0.98); hi = vec3(0.95, 0.25, 0.65); } // cyan -> magenta
    else if (i == 2) { lo = vec3(1.00, 0.62, 0.18); hi = vec3(0.98, 0.22, 0.42); } // gold -> rose
    else { lo = vec3(0.35, 0.55, 1.00); hi = vec3(0.10, 0.95, 0.75); }             // blue -> teal
  }

  // Current pair, cross-fading to the next every few seconds.
  void skyPair(float time, out vec3 lo, out vec3 hi) {
    float c = time / 7.0;
    int a = int(mod(floor(c), 4.0));
    int b = int(mod(floor(c) + 1.0, 4.0));
    float f = smoothstep(0.55, 1.0, fract(c));
    vec3 lo1; vec3 hi1; vec3 lo2; vec3 hi2;
    pair(a, lo1, hi1);
    pair(b, lo2, hi2);
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
    float t = uTime;

    vec3 lo; vec3 hi;
    skyPair(t, lo, hi);

    vec3 col = vec3(0.008, 0.01, 0.028);

    // Three ribbons of light. Each one is a folded line across the sky with
    // vertical rays rising from its lower edge, like a real aurora curtain.
    for (int i = 0; i < 3; i++) {
      float fi = float(i);
      float sp = 1.0 + fi * 0.35;
      // Slow large folds plus faster ripples travelling along the ribbon.
      float fold = fbm(vec2(p.x * 0.55 + t * 0.09 * sp + fi * 4.1, t * 0.05 + fi));
      float ripple = sin(p.x * (3.2 + fi) - t * (1.3 + fi * 0.4)) * 0.035
                   + sin(p.x * 7.0 + t * 2.1 + fi * 3.0) * 0.012;
      float base = 0.12 - fi * 0.2 + (fold - 0.5) * 0.9 + ripple;
      float d = p.y - base;

      // Rays: high-frequency vertical striations that shimmer sideways.
      float rx = p.x * (16.0 + fi * 6.0) + fold * 9.0 + t * (0.7 + fi * 0.25);
      float rays = fbm(vec2(rx, t * 0.6 + fi * 7.0));
      rays = smoothstep(0.25, 0.85, rays);
      float flicker = 0.75 + 0.25 * noise(vec2(rx * 0.3, t * 2.5));

      // Bright lower edge, long soft rays upward, quick fade below.
      float edge = exp(-pow(max(-d, 0.0) * 22.0, 2.0)) * exp(-max(d, 0.0) * 7.0);
      float curtain = smoothstep(-0.02, 0.02, d) * exp(-d * (2.2 + fi * 0.6));
      float glow = exp(-abs(d) * 4.0) * 0.25;

      float h = clamp(d * 2.2, 0.0, 1.0);
      vec3 c = mix(lo, hi, h);
      // Each ribbon slightly offset in hue so they never look identical.
      c = hueShift(c, fi * 0.55 + sin(t * 0.4 + fi) * 0.25);
      float k = (edge * 1.3 + curtain * rays * 1.1 + glow) * flicker;
      col += c * k * (1.0 - fi * 0.22);
    }

    // Faint stars, hidden where the aurora is bright.
    float star = step(0.9975, hash(floor(uv * uResolution / 2.0)));
    col += vec3(0.8, 0.85, 1.0) * star * (0.5 + 0.5 * sin(t * 3.0 + hash(floor(uv * 300.0)) * 6.28)) * 0.5;

    // Horizon glow in the current lower color.
    col += lo * 0.18 * exp(-pow((p.y + 0.55) * 2.4, 2.0));

    col *= smoothstep(1.6, 0.25, length(p * vec2(0.7, 1.0)));
    col = 1.0 - exp(-col * 1.6);
    col = mix(vec3(dot(col, vec3(0.299, 0.587, 0.114))), col, 1.3);
    col = pow(max(col, 0.0), vec3(1.12));
    col += (hash(uv * uResolution + t) - 0.5) * 0.02;

    gl_FragColor = vec4(col, 1.0);
  }
`;

function Aurora() {
  const { size } = useThree();

  const uniforms = useMemo(
    () => ({
      uTime: { value: 0 },
      uResolution: { value: new THREE.Vector2(size.width, size.height) },
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

export default function HeroScene() {
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
        <Aurora />
      </Canvas>
    </div>
  );
}
