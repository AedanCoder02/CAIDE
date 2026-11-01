"use client";

import { useEffect, useMemo, useRef, useState } from "react";
import gsap from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";
import { useGSAP } from "@gsap/react";
import Particles from "./Particles";
import { useT } from "@/i18n/LangProvider";

gsap.registerPlugin(ScrollTrigger);

type Node = { id: string; x: number; y: number; label: string; sub: string };
type Stat = { label: string; value: number; suffix?: string; decimals?: number; live?: number };
type Step = { title: string; body: string; out: string[] };
type Discipline = {
  key: string;
  name: string;
  tagline: string;
  title: string;
  desc: string;
  color: string;
  nodes: Node[];
  edges: [string, string][];
  stats: Stat[];
  rings?: boolean;
  log: string[];
  plan: Step[];
};
// Layout and figures only; every visible word comes from the dictionary.
type Base = Omit<Discipline, "name" | "tagline" | "title" | "desc" | "log" | "plan" | "nodes" | "stats"> & {
  nodes: Omit<Node, "label" | "sub">[];
  stats: Omit<Stat, "label">[];
};

const BASE: Base[] = [
  {
    key: "website",
    color: "#7c5cff",
    nodes: [
      { id: "idea", x: 8, y: 50 },
      { id: "brand", x: 29, y: 22 },
      { id: "content", x: 29, y: 78 },
      { id: "site", x: 52, y: 50 },
      { id: "google", x: 73, y: 50 },
      { id: "call", x: 92, y: 24 },
      { id: "book", x: 92, y: 76 },
    ],
    edges: [
      ["idea", "brand"],
      ["idea", "content"],
      ["brand", "site"],
      ["content", "site"],
      ["site", "google"],
      ["google", "call"],
      ["google", "book"],
    ],
    rings: true,
    stats: [
      { value: 100 },
      { value: 100 },
      { value: 100 },
      { value: 100 },
    ],
  },
  {
    key: "bookings",
    color: "#22d3ee",
    nodes: [
      { id: "cust", x: 8, y: 50 },
      { id: "page", x: 27, y: 50 },
      { id: "cal", x: 47, y: 50 },
      { id: "wa", x: 70, y: 18 },
      { id: "staff", x: 70, y: 50 },
      { id: "remind", x: 70, y: 82 },
      { id: "review", x: 92, y: 50 },
    ],
    edges: [
      ["cust", "page"],
      ["page", "cal"],
      ["cal", "wa"],
      ["cal", "staff"],
      ["cal", "remind"],
      ["wa", "review"],
      ["staff", "review"],
      ["remind", "review"],
    ],
    stats: [
      { value: 48, live: 1 },
      { value: 37, suffix: "%" },
      { value: 2.1, suffix: "%", decimals: 1 },
    ],
  },
  {
    key: "assistant",
    color: "#ec4899",
    nodes: [
      { id: "core", x: 50, y: 50 },
      { id: "wa", x: 12, y: 20 },
      { id: "ig", x: 12, y: 80 },
      { id: "web", x: 50, y: 12 },
      { id: "book", x: 88, y: 20 },
      { id: "staff", x: 88, y: 80 },
      { id: "faq", x: 50, y: 88 },
    ],
    edges: [
      ["wa", "core"],
      ["ig", "core"],
      ["web", "core"],
      ["faq", "core"],
      ["core", "book"],
      ["core", "staff"],
    ],
    stats: [
      { value: 312, live: 1 },
      { value: 4, suffix: "s" },
      { value: 6, suffix: "%" },
    ],
  },
  {
    key: "automations",
    color: "#10b981",
    nodes: [
      { id: "in", x: 8, y: 50 },
      { id: "check", x: 27, y: 50 },
      { id: "ai", x: 47, y: 50 },
      { id: "inv", x: 70, y: 18 },
      { id: "sheet", x: 70, y: 50 },
      { id: "alert", x: 70, y: 82 },
      { id: "done", x: 92, y: 50 },
    ],
    edges: [
      ["in", "check"],
      ["check", "ai"],
      ["ai", "inv"],
      ["ai", "sheet"],
      ["ai", "alert"],
      ["inv", "done"],
      ["sheet", "done"],
      ["alert", "done"],
    ],
    stats: [
      { value: 1284, live: 1 },
      { value: 31 },
      { value: 0 },
    ],
  },
  {
    key: "apps",
    color: "#f59e0b",
    nodes: [
      { id: "idea", x: 8, y: 50 },
      { id: "design", x: 25, y: 50 },
      { id: "app", x: 42, y: 50 },
      { id: "order", x: 60, y: 22 },
      { id: "points", x: 60, y: 78 },
      { id: "you", x: 78, y: 50 },
      { id: "news", x: 94, y: 50 },
    ],
    edges: [
      ["idea", "design"],
      ["design", "app"],
      ["app", "order"],
      ["app", "points"],
      ["order", "you"],
      ["points", "you"],
      ["you", "news"],
    ],
    stats: [
      { value: 2140, live: 1 },
      { value: 38, suffix: "%" },
      { value: 61, suffix: "%" },
    ],
  },
];

const AUTO_MS = 11000;

function curve(a: Node, b: Node, vertical: boolean) {
  if (vertical) {
    const my = (a.y + b.y) / 2;
    return `M ${a.x} ${a.y} C ${a.x} ${my}, ${b.x} ${my}, ${b.x} ${b.y}`;
  }
  const mx = (a.x + b.x) / 2;
  return `M ${a.x} ${a.y} C ${mx} ${a.y}, ${mx} ${b.y}, ${b.x} ${b.y}`;
}

function depths(d: Discipline) {
  const depth: Record<string, number> = {};
  const incoming = new Set(d.edges.map(([, to]) => to));
  const queue = d.nodes.filter((n) => !incoming.has(n.id)).map((n) => n.id);
  queue.forEach((id) => (depth[id] = 0));
  while (queue.length) {
    const id = queue.shift()!;
    d.edges.forEach(([from, to]) => {
      if (from === id && depth[to] === undefined) {
        depth[to] = depth[id] + 1;
        queue.push(to);
      }
    });
  }
  return depth;
}

const fmt = (v: number, decimals = 0) =>
  v.toLocaleString("en-US", { minimumFractionDigits: decimals, maximumFractionDigits: decimals });

export default function Systems() {
  const sectionRef = useRef<HTMLDivElement>(null);
  const stageRef = useRef<HTMLDivElement>(null);
  const tlRef = useRef<gsap.core.Timeline | null>(null);
  const [idx, setIdx] = useState(0);
  const [view, setView] = useState<"live" | "plan">("live");
  const [auto, setAuto] = useState(true);
  const [visible, setVisible] = useState(false);
  const [lines, setLines] = useState<{ id: number; k: string; t: string; text: string }[]>([]);
  const lineId = useRef(0);
  const graphRef = useRef<HTMLDivElement>(null);
  const [box, setBox] = useState({ w: 1000, h: 400 });

  useEffect(() => {
    const el = graphRef.current;
    if (!el) return;
    const ro = new ResizeObserver(([e]) => setBox({ w: e.contentRect.width, h: e.contentRect.height }));
    ro.observe(el);
    return () => ro.disconnect();
  }, [view]);
  const tr = useT().systems;
  const DISCIPLINES = useMemo<Discipline[]>(
    () =>
      BASE.map((b, i) => {
        const x = tr.items[i];
        return {
          ...b,
          name: x.name,
          tagline: x.tagline,
          title: x.title,
          desc: x.desc,
          log: x.log,
          plan: x.plan,
          nodes: b.nodes.map((n, j) => ({ ...n, label: x.nodes[j][0], sub: x.nodes[j][1] })),
          stats: b.stats.map((st, j) => ({ ...st, label: x.stats[j] })),
        };
      }),
    [tr]
  );
  const d = DISCIPLINES[idx];

  // Run everything only while the section is on screen.
  useEffect(() => {
    const el = sectionRef.current;
    if (!el) return;
    const io = new IntersectionObserver(([e]) => setVisible(e.isIntersecting), { threshold: 0.15 });
    io.observe(el);
    return () => io.disconnect();
  }, []);

  useEffect(() => {
    const tl = tlRef.current;
    if (!tl) return;
    if (visible) tl.play();
    else tl.pause();
  }, [visible, idx, view]);

  // Auto-advance until the visitor picks something.
  useEffect(() => {
    if (!auto || !visible) return;
    const t = window.setTimeout(() => setIdx((i) => (i + 1) % BASE.length), AUTO_MS);
    return () => window.clearTimeout(t);
  }, [auto, visible, idx]);

  // Streaming log + live counters.
  useEffect(() => {
    if (!visible) return;
    let n = 0;
    const push = () => {
      const now = new Date();
      const t = now.toTimeString().slice(0, 8);
      const text = d.log[n % d.log.length];
      n++;
      lineId.current++;
      const id = lineId.current;
      setLines((prev) => [...prev.filter((l) => l.k === d.key).slice(-4), { id, k: d.key, t, text }]);
      stageRef.current?.querySelectorAll<HTMLElement>("[data-live]").forEach((el) => {
        const step = Number(el.dataset.live);
        const cur = Number(el.dataset.val);
        const next = cur + Math.ceil(Math.random() * step);
        el.dataset.val = String(next);
        el.textContent = fmt(next, Number(el.dataset.dec || 0)) + (el.dataset.suf || "");
      });
    };
    push();
    const iv = window.setInterval(push, 1500);
    return () => window.clearInterval(iv);
  }, [visible, d]);

  useGSAP(
    () => {
      const reduced = window.matchMedia("(prefers-reduced-motion: reduce)").matches;
      const stage = stageRef.current;
      if (!stage) return;

      // Stats count up on every switch.
      stage.querySelectorAll<HTMLElement>("[data-count]").forEach((el) => {
        const target = Number(el.dataset.count);
        const dec = Number(el.dataset.dec || 0);
        const suf = el.dataset.suf || "";
        const o = { v: reduced ? target : 0 };
        el.dataset.val = String(target);
        gsap.to(o, {
          v: target,
          duration: reduced ? 0 : 1.4,
          ease: "power3.out",
          onUpdate: () => (el.textContent = fmt(o.v, dec) + suf),
        });
      });
      stage.querySelectorAll<SVGCircleElement>(".ring-arc").forEach((c) => {
        gsap.fromTo(c, { strokeDashoffset: 100 }, { strokeDashoffset: 0, duration: reduced ? 0 : 1.6, ease: "power3.out" });
      });

      if (reduced) return;

      gsap.from(stage.querySelectorAll(".sys-in"), {
        opacity: 0,
        y: 14,
        duration: 0.6,
        ease: "expo.out",
        stagger: 0.04,
      });

      const tl = gsap.timeline({ repeat: -1, repeatDelay: 0.8, paused: !visible });
      if (view === "live") {
        const depth = depths(d);
        const STEP = 0.85;
        d.edges.forEach(([from, to]) => {
          const pkt = stage.querySelector(`[data-pkt="${from}-${to}"]`);
          const at = depth[from] * STEP;
          tl.fromTo(pkt, { strokeDashoffset: 16 }, { strokeDashoffset: -101, duration: STEP, ease: "power1.inOut" }, at);
        });
        d.nodes.forEach((n) => {
          const ring = stage.querySelector(`[data-node="${n.id}"] .node-pulse`);
          const at = depth[n.id] * STEP;
          tl.fromTo(ring, { scale: 0.85, opacity: 0.9 }, { scale: 1.5, opacity: 0, duration: 0.9, ease: "power2.out" }, at);
        });
      } else {
        const steps = stage.querySelectorAll<HTMLElement>(".plan-step");
        const bar = stage.querySelector(".plan-bar");
        tl.set(steps, { attr: { "data-on": "false" } });
        tl.set(bar, { scaleX: 0 });
        steps.forEach((s, i) => {
          tl.set(s, { attr: { "data-on": "true" } }, i * 1.6);
          tl.to(bar, { scaleX: (i + 1) / steps.length, duration: 1.2, ease: "power2.inOut" }, i * 1.6);
        });
        tl.to({}, { duration: 1.6 });
      }
      tlRef.current = tl;
      return () => {
        tl.kill();
        tlRef.current = null;
      };
    },
    { scope: sectionRef, dependencies: [idx, view], revertOnUpdate: true }
  );

  useGSAP(
    () => {
      if (window.matchMedia("(prefers-reduced-motion: reduce)").matches) return;
      gsap.from(".sys-head", {
        opacity: 0,
        y: 30,
        duration: 0.9,
        ease: "expo.out",
        stagger: 0.08,
        scrollTrigger: { trigger: sectionRef.current, start: "top 75%", once: true },
      });
      gsap.from(".sys-console", {
        opacity: 0,
        y: 60,
        scale: 0.97,
        duration: 1.2,
        ease: "expo.out",
        scrollTrigger: { trigger: ".sys-console", start: "top 85%", once: true },
      });
    },
    { scope: sectionRef }
  );

  const pick = (i: number) => {
    setAuto(false);
    setIdx(i);
  };

  const shown = lines.filter((l) => l.k === d.key);
  // Narrow screens flow top to bottom instead of left to right.
  const vertical = box.w < 640;
  const px = (n: Node) => (vertical ? n.y : n.x);
  const py = (n: Node) => (vertical ? n.x : n.y);
  const sx = (n: Node) => (px(n) / 100) * box.w;
  const sy = (n: Node) => (py(n) / 100) * box.h;
  const nodeMap = Object.fromEntries(d.nodes.map((n) => [n.id, { ...n, x: sx(n), y: sy(n) }]));

  return (
    <section
      id="systems"
      ref={sectionRef}
      data-running={visible}
      className="relative overflow-hidden bg-[#03101a] py-20 lg:flex lg:min-h-screen lg:flex-col lg:justify-center lg:py-16"
    >
      <div aria-hidden className="line-grid pointer-events-none absolute inset-0 opacity-60 [mask-image:linear-gradient(to_bottom,transparent,#000_25%,#000_75%,transparent)]" />
      <div
        aria-hidden
        className="pointer-events-none absolute left-1/2 top-1/2 h-[36rem] w-[90rem] -translate-x-1/2 -translate-y-1/2 blur-3xl transition-[background] duration-1000"
        style={{ background: `radial-gradient(ellipse, ${d.color}2e, transparent 65%)` }}
      />
      <Particles colors={["#22d3ee", "#67e8f9", "#ffffff"]} mode="rise" density={0.4} speed={0.3} size={[0.5, 1.6]} />

      <div className="wrap relative w-full">
        <div className="flex flex-col gap-5 lg:flex-row lg:items-end lg:justify-between">
          <div>
            <span className="sys-head font-mono text-xs uppercase tracking-[0.3em] text-accent-2">{tr.eyebrow}</span>
            <h2 className="sys-head mt-3 text-4xl font-semibold tracking-tight sm:text-6xl">
              {tr.h2[0]} <span className="text-shimmer">{tr.h2[1]}</span>
            </h2>
          </div>
          <p className="sys-head max-w-md text-fg/60">
            {tr.blurb}
          </p>
        </div>

        <div
          className="sys-console beam-border mt-10 rounded-[1.75rem]"
          style={{ ["--beam-color" as string]: d.color, ["--beam-speed" as string]: "10s" }}
        >
          <div className="overflow-hidden rounded-[1.75rem] border border-white/[0.08] bg-[#050d16]/90 backdrop-blur-xl">
            {/* Title bar */}
            <div className="flex items-center gap-3 border-b border-white/[0.07] px-5 py-3">
              <span className="h-2.5 w-2.5 rounded-full bg-[#ff5f57]" />
              <span className="h-2.5 w-2.5 rounded-full bg-[#febc2e]" />
              <span className="h-2.5 w-2.5 rounded-full bg-[#28c840]" />
              <span className="ml-3 flex-1 truncate text-center font-mono text-[0.6875rem] uppercase tracking-[0.25em] text-fg/40">
                caide · {d.name}
              </span>
              <span className="flex items-center gap-2 font-mono text-[0.6875rem] text-fg/60">
                <span className="relative flex h-2 w-2">
                  <span className="absolute inline-flex h-full w-full animate-ping rounded-full opacity-70" style={{ background: d.color }} />
                  <span className="relative inline-flex h-2 w-2 rounded-full" style={{ background: d.color }} />
                </span>
                {tr.liveTag}
              </span>
            </div>

            <div className="grid grid-cols-1 lg:grid-cols-[260px_minmax(0,1fr)] xl:grid-cols-[18.75rem_minmax(0,1fr)]">
              {/* Sidebar */}
              <aside className="min-w-0 border-b border-white/[0.07] p-4 lg:border-b-0 lg:border-r lg:p-5">
                <p className="hidden font-mono text-[0.625rem] uppercase tracking-[0.3em] text-fg/35 lg:block">{tr.need}</p>
                <div role="tablist" aria-label={tr.need} className="-mx-1 flex gap-2 overflow-x-auto px-1 pb-1 lg:mt-4 lg:flex-col lg:overflow-visible">
                  {DISCIPLINES.map((x, i) => {
                    const on = i === idx;
                    return (
                      <button
                        key={x.key}
                        role="tab"
                        aria-selected={on}
                        onClick={() => pick(i)}
                        className={`group relative shrink-0 overflow-hidden rounded-xl border px-3.5 py-2.5 text-left transition-colors duration-300 lg:py-3 ${
                          on ? "border-white/15 bg-white/[0.06]" : "border-transparent hover:bg-white/[0.03]"
                        }`}
                      >
                        <span className="flex items-center gap-2.5">
                          <span
                            className="h-2 w-2 rounded-full transition-shadow duration-300"
                            style={{ background: x.color, boxShadow: on ? `0 0 12px ${x.color}` : "none" }}
                          />
                          <span className={`text-sm font-semibold ${on ? "text-fg" : "text-fg/60"}`}>{x.name}</span>
                        </span>
                        <span className="mt-1 hidden pl-[1.125rem] text-xs text-fg/40 lg:block">{x.tagline}</span>
                        {on && auto && visible && (
                          <span
                            key={`${x.key}-bar`}
                            className="sys-timer absolute inset-x-0 bottom-0 h-px origin-left"
                            style={{ background: x.color, animationDuration: `${AUTO_MS}ms` }}
                          />
                        )}
                      </button>
                    );
                  })}
                </div>

                <p className="mt-6 hidden font-mono text-[0.625rem] uppercase tracking-[0.3em] text-fg/35 lg:block">{tr.view}</p>
                <div className="mt-3 flex gap-1 rounded-full border border-white/10 p-1 lg:mt-3">
                  {(["live", "plan"] as const).map((v) => (
                    <button
                      key={v}
                      aria-pressed={view === v}
                      onClick={() => setView(v)}
                      className={`flex-1 rounded-full px-3 py-1.5 text-xs font-semibold transition-colors duration-300 ${
                        view === v ? "bg-fg text-bg" : "text-fg/55 hover:text-fg"
                      }`}
                    >
                      {v === "live" ? tr.live : tr.plan}
                    </button>
                  ))}
                </div>
                <p className="mt-6 hidden text-[0.6875rem] leading-relaxed text-fg/30 lg:block">
                  {tr.note}
                </p>
              </aside>

              {/* Stage */}
              <div ref={stageRef} className="min-w-0 p-5 sm:p-7">
                <div className="flex flex-col gap-2 sm:flex-row sm:items-end sm:justify-between">
                  <div>
                    <p className="sys-in font-mono text-[0.6875rem] uppercase tracking-[0.25em]" style={{ color: d.color }}>
                      {d.name} · {view === "live" ? tr.live : tr.plan}
                    </p>
                    <h3 className="sys-in mt-2 text-2xl font-semibold tracking-tight sm:text-3xl">{d.title}</h3>
                  </div>
                  <p className="sys-in max-w-md text-sm text-fg/55">{d.desc}</p>
                </div>

                {view === "live" ? (
                  <div ref={graphRef} className="relative mt-6 h-[30rem] rounded-2xl border border-white/[0.06] bg-black/30 md:h-[clamp(260px,34vh,400px)]">
                    <div aria-hidden className="dot-grid absolute inset-0 rounded-2xl opacity-60" />
                    <svg viewBox={`0 0 ${box.w} ${box.h}`} className="absolute inset-0 h-full w-full overflow-visible" aria-hidden>
                      {d.edges.map(([a, b]) => {
                        const path = curve(nodeMap[a], nodeMap[b], vertical);
                        return (
                          <g key={`${a}-${b}`}>
                            <path d={path} fill="none" stroke={d.color} strokeOpacity={0.22} strokeWidth={1.25} />
                            <path
                              data-pkt={`${a}-${b}`}
                              d={path}
                              pathLength={100}
                              fill="none"
                              stroke={d.color}
                              strokeWidth={3}
                              strokeLinecap="round"
                              strokeDasharray="14 200"
                              strokeDashoffset={16}
                              style={{ filter: `drop-shadow(0 0 4px ${d.color})` }}
                            />
                          </g>
                        );
                      })}
                    </svg>
                    {d.nodes.map((n) => (
                      <div
                        key={n.id}
                        data-node={n.id}
                        className="absolute -translate-x-1/2 -translate-y-1/2"
                        style={{ left: `${px(n)}%`, top: `${py(n)}%` }}
                      >
                        <div className="sys-in relative">
                          <span
                            className="node-pulse pointer-events-none absolute inset-0 rounded-xl border-2 opacity-0"
                            style={{ borderColor: d.color }}
                          />
                          <div
                            className="relative whitespace-nowrap rounded-xl border bg-[#07121c] px-2 py-1.5 text-center sm:px-3.5 sm:py-2"
                            style={{ borderColor: `${d.color}55`, boxShadow: `0 0 24px -6px ${d.color}66` }}
                          >
                            <p className="text-[0.625rem] font-semibold sm:text-sm">{n.label}</p>
                            <p className="hidden font-mono text-[0.625rem] text-fg/45 sm:block">{n.sub}</p>
                          </div>
                        </div>
                      </div>
                    ))}
                  </div>
                ) : (
                  <div className="relative mt-6 rounded-2xl border border-white/[0.06] bg-black/30 p-5 sm:h-[clamp(260px,34vh,400px)] sm:p-7">
                    <div className="relative h-px w-full bg-white/10">
                      <div
                        className="plan-bar absolute inset-0 origin-left scale-x-0"
                        style={{ background: `linear-gradient(90deg, ${d.color}, #ffffff)`, boxShadow: `0 0 14px ${d.color}` }}
                      />
                    </div>
                    <div className="mt-6 grid gap-3 sm:grid-cols-2 xl:grid-cols-4">
                      {d.plan.map((s, i) => (
                        <div
                          key={i}
                          data-on="false"
                          className="plan-step sys-in group rounded-xl border border-white/[0.07] bg-white/[0.02] p-4 transition-[border-color,box-shadow,background-color] duration-500 data-[on=true]:bg-white/[0.05]"
                          style={{ ["--c" as string]: d.color }}
                        >
                          <span className="font-mono text-xs" style={{ color: d.color }}>
                            0{i + 1}
                          </span>
                          <h4 className="mt-2 text-base font-semibold">{s.title}</h4>
                          <p className="mt-2 text-sm leading-relaxed text-fg/55">{s.body}</p>
                          <ul className="mt-3 flex flex-wrap gap-1.5">
                            {s.out.map((o) => (
                              <li key={o} className="rounded-full border border-white/10 px-2 py-0.5 font-mono text-[0.625rem] uppercase tracking-[0.12em] text-fg/55">
                                {o}
                              </li>
                            ))}
                          </ul>
                        </div>
                      ))}
                    </div>
                  </div>
                )}

                <div className="mt-4 grid gap-4 lg:grid-cols-[minmax(0,1fr)_minmax(0,1.1fr)]">
                  <div className={`grid gap-3 ${d.rings ? "grid-cols-2 sm:grid-cols-4" : "grid-cols-3"}`}>
                    {d.stats.map((s, si) =>
                      d.rings ? (
                        <div key={si} className="sys-in flex flex-col items-center rounded-xl border border-white/[0.06] bg-white/[0.02] p-3">
                          <div className="relative h-14 w-14">
                            <svg viewBox="0 0 36 36" className="h-full w-full -rotate-90">
                              <circle cx="18" cy="18" r="15.9" fill="none" stroke="rgba(255,255,255,0.08)" strokeWidth="3" />
                              <circle
                                className="ring-arc"
                                cx="18"
                                cy="18"
                                r="15.9"
                                fill="none"
                                stroke={d.color}
                                strokeWidth="3"
                                strokeLinecap="round"
                                pathLength={100}
                                strokeDasharray="100 100"
                                strokeDashoffset={100}
                              />
                            </svg>
                            <span data-count={s.value} className="absolute inset-0 flex items-center justify-center text-sm font-semibold">
                              {s.value}
                            </span>
                          </div>
                          <span className="mt-2 text-center text-[0.625rem] uppercase tracking-[0.12em] text-fg/45">{s.label}</span>
                        </div>
                      ) : (
                        <div key={si} className="sys-in rounded-xl border border-white/[0.06] bg-white/[0.02] p-3 sm:p-4">
                          <span
                            data-count={s.value}
                            data-dec={s.decimals ?? 0}
                            data-suf={s.suffix ?? ""}
                            {...(s.live ? { "data-live": s.live } : {})}
                            className="block text-xl font-semibold tabular-nums sm:text-2xl"
                            style={{ textShadow: `0 0 24px ${d.color}66` }}
                          >
                            {fmt(s.value, s.decimals)}
                            {s.suffix}
                          </span>
                          <span className="mt-1 block text-[0.625rem] uppercase tracking-[0.12em] text-fg/45">{s.label}</span>
                        </div>
                      )
                    )}
                  </div>

                  <div className="sys-in h-[7.375rem] overflow-hidden rounded-xl border border-white/[0.06] bg-black/50 p-3 font-mono text-[0.6875rem] leading-[1.7]" aria-live="off">
                    {shown.map((l, i) => (
                      <div key={l.id} className="sys-line flex gap-3 truncate" style={{ opacity: 0.35 + (i / Math.max(1, shown.length - 1)) * 0.65 }}>
                        <span className="text-fg/30">{l.t}</span>
                        <span style={{ color: i === shown.length - 1 ? d.color : undefined }} className="truncate text-fg/75">
                          {l.text}
                        </span>
                      </div>
                    ))}
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}
