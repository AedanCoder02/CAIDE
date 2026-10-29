# CAIDE

Landing page for CAIDE, a web development studio offering web design,
automations, backend engineering, app development, and tech solutions.

## Stack

- Next.js 16 (App Router, TypeScript, Tailwind v4)
- GSAP + ScrollTrigger for scroll-driven animation
- Lenis for smooth scroll, synced to the GSAP ticker
- React Three Fiber for the animated shader hero background

`prefers-reduced-motion` is respected throughout (Lenis, GSAP intro
timelines, and the marquee all degrade to a static state).

## Development

```bash
npm install
npm run dev
```

Open [http://localhost:3000](http://localhost:3000).

## Build

```bash
npm run build
npm run start
```
