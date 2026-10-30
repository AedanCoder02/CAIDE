"use client";

import { useMemo, useRef } from "react";
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
  uniform vec3 uColorA;
  uniform vec3 uColorB;
  uniform vec3 uColorBg;

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
    float value = 0.0;
    float amplitude = 0.55;
    for (int i = 0; i < 5; i++) {
      value += amplitude * noise(p);
      p *= 2.05;
      amplitude *= 0.55;
    }
    return value;
  }

  void main() {
    vec2 uv = vUv;
    float aspect = uResolution.x / uResolution.y;
    vec2 p = (uv - 0.5) * vec2(aspect, 1.0);

    float t = uTime * 0.045;
    float n1 = fbm(p * 1.6 + vec2(t, -t * 0.7));
    float n2 = fbm(p * 2.4 - vec2(t * 0.5, t));
    float field = fbm(p * 1.1 + vec2(n1, n2) * 1.2 + t * 0.3);

    float dist = length(p + vec2(0.15, 0.08));
    float glow = smoothstep(1.1, 0.0, dist) * 0.9;

    vec3 col = uColorBg;
    col = mix(col, uColorA, clamp(field * 1.7, 0.0, 1.0));
    col = mix(col, uColorB, clamp(glow * n2 * 2.1, 0.0, 1.0));
    col += uColorA * glow * 0.35;

    float vignette = smoothstep(1.3, 0.3, length(p));
    col *= mix(0.75, 1.0, vignette);

    float grain = (hash(uv * uResolution.xy + uTime) - 0.5) * 0.03;
    col += grain;

    gl_FragColor = vec4(col, 1.0);
  }
`;

function GradientField() {
  const materialRef = useRef<THREE.ShaderMaterial>(null);
  const { size } = useThree();

  const uniforms = useMemo(
    () => ({
      uTime: { value: 0 },
      uResolution: { value: new THREE.Vector2(size.width, size.height) },
      uColorA: { value: new THREE.Color("#5b3bff") },
      uColorB: { value: new THREE.Color("#22d3ee") },
      uColorBg: { value: new THREE.Color("#05050a") },
    }),
    // eslint-disable-next-line react-hooks/exhaustive-deps -- uniforms object must stay referentially stable across resizes; size is applied via mutation in useFrame below
    []
  );

  useFrame((_state, delta) => {
    // eslint-disable-next-line react-hooks/immutability -- mutating a shader uniform value in place is the standard three.js/r3f pattern, not React state
    uniforms.uTime.value += delta;
    uniforms.uResolution.value.set(size.width, size.height);
  });

  return (
    <mesh frustumCulled={false}>
      <planeGeometry args={[2, 2]} />
      <shaderMaterial
        ref={materialRef}
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
  return (
    <Canvas
      orthographic
      camera={{ position: [0, 0, 1], zoom: 1 }}
      dpr={[1, 1.75]}
      frameloop="always"
      gl={{ antialias: false, powerPreference: "high-performance", preserveDrawingBuffer: true }}
    >
      <GradientField />
    </Canvas>
  );
}
