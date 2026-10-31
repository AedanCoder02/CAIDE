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

  vec3 palette(float t) {
    vec3 violet = vec3(0.486, 0.361, 1.0);
    vec3 cyan = vec3(0.133, 0.827, 0.933);
    vec3 magenta = vec3(0.925, 0.282, 0.6);
    t = fract(t);
    if (t < 0.333) return mix(violet, cyan, t / 0.333);
    if (t < 0.666) return mix(cyan, magenta, (t - 0.333) / 0.333);
    return mix(magenta, violet, (t - 0.666) / 0.334);
  }

  void main() {
    vec2 uv = vUv;
    float aspect = uResolution.x / uResolution.y;
    vec2 p = (uv - 0.5) * vec2(aspect, 1.0);
    float t = uTime * 0.16;

    vec3 col = vec3(0.012, 0.012, 0.03);

    // Three aurora curtains drifting and folding over each other.
    for (int i = 0; i < 3; i++) {
      float fi = float(i);
      float warp = fbm(vec2(p.x * 1.1 + t * (0.55 + fi * 0.25), fi * 3.7 + t * 0.35));
      float y = p.y - (0.22 - fi * 0.2)
        - (warp - 0.5) * 0.85
        - sin(p.x * 1.8 + t * 1.6 + fi * 2.1) * 0.09;
      float band = exp(-pow(y * (4.2 + fi * 1.8), 2.0));
      float curtain = smoothstep(0.0, 0.35, y + 0.35) * exp(-max(y, 0.0) * 2.5);
      float streaks = 0.45 + 0.55 * fbm(vec2(p.x * 11.0 + t * 2.4 + fi * 5.0, y * 2.0));
      vec3 c = palette(fi * 0.33 + p.x * 0.12 + t * 0.08);
      col += c * (band * 0.9 + curtain * 0.25) * streaks * (0.75 - fi * 0.15);
    }

    // Light shafts falling from above.
    float shafts = pow(fbm(vec2(p.x * 2.6 - t * 0.4, t * 0.15)), 3.0);
    col += vec3(0.38, 0.32, 0.95) * shafts * smoothstep(-0.7, 0.6, p.y) * 0.55;

    // Low horizon glow.
    col += vec3(0.28, 0.12, 0.62) * exp(-pow((p.y + 0.6) * 2.6, 2.0)) * 0.55;

    // Occasional bright pulse travelling along the main curtain.
    float pulse = exp(-pow((p.x - mod(t * 1.4, aspect * 1.6) + aspect * 0.8) * 2.2, 2.0));
    col += vec3(0.6, 0.9, 1.0) * pulse * exp(-pow((p.y - 0.18) * 5.0, 2.0)) * 0.35;

    col *= smoothstep(1.45, 0.25, length(p * vec2(0.75, 1.0)));
    col = 1.0 - exp(-col * 1.5);
    col += (hash(uv * uResolution + uTime) - 0.5) * 0.022;

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
