// Small looping animations that show each service doing its job. They carry
// no text, so they work in every language. They play while the card is
// hovered, or always on touch screens (see .svc-demo in globals.css).
type Props = { kind: number; color: string };

export default function ServiceDemo({ kind, color }: Props) {
  const style = { ["--c" as string]: color };
  const box = "svc-demo relative h-11 w-32 lg:h-10 overflow-hidden rounded-lg border border-white/10 bg-white/[0.03]";

  switch (kind) {
    // Website: a page assembling itself.
    case 0:
      return (
        <div aria-hidden className={box} style={style}>
          <div className="flex h-2.5 items-center gap-1 border-b border-white/10 px-1.5">
            {[0, 1, 2].map((i) => <span key={i} className="h-1 w-1 rounded-full bg-white/30" />)}
          </div>
          <div className="space-y-1 p-1.5">
            <span className="svc-grow block h-1.5 w-[70%] rounded-sm bg-[var(--c)]" />
            <span className="svc-grow block h-1 w-[90%] rounded-sm bg-white/25 [animation-delay:.25s]" />
            <span className="svc-grow block h-1 w-[55%] rounded-sm bg-white/25 [animation-delay:.5s]" />
          </div>
        </div>
      );
    // Bookings: slots filling up on a week grid.
    case 1:
      return (
        <div aria-hidden className={`${box} grid grid-cols-7 gap-1 p-1.5`} style={style}>
          {Array.from({ length: 14 }, (_, i) => (
            <span
              key={i}
              className="svc-slot rounded-[3px] bg-white/10"
              style={{ animationDelay: `${((i * 5) % 14) * 0.18}s` }}
            />
          ))}
        </div>
      );
    // AI assistant: a question, typing, an answer.
    case 2:
      return (
        <div aria-hidden className={`${box} flex flex-col justify-center gap-1 px-2`} style={style}>
          <span className="svc-pop block h-2 w-14 rounded-full rounded-bl-sm bg-white/20" />
          <span className="flex justify-end gap-0.5">
            {[0, 1, 2].map((i) => (
              <span key={i} className="svc-dot h-1.5 w-1.5 rounded-full bg-[var(--c)]" style={{ animationDelay: `${i * 0.15}s` }} />
            ))}
            <span className="svc-pop ml-1 block h-2 w-16 rounded-full rounded-br-sm bg-[var(--c)] [animation-delay:.9s]" />
          </span>
        </div>
      );
    // Automations: a task passing through connected steps.
    case 3:
      return (
        <div aria-hidden className={`${box} flex items-center justify-between px-3`} style={style}>
          <span className="absolute inset-x-4 top-1/2 h-px bg-white/15" />
          {[0, 1, 2, 3].map((i) => (
            <span key={i} className="svc-node relative h-3 w-3 rounded-full border border-white/25 bg-[#0b0a18]" style={{ animationDelay: `${i * 0.45}s` }} />
          ))}
          <span className="svc-run absolute left-4 top-1/2 h-1.5 w-1.5 -translate-y-1/2 rounded-full bg-[var(--c)] shadow-[0_0_10px_var(--c)]" />
        </div>
      );
    // Apps: a loyalty card collecting stamps.
    case 4:
      return (
        <div aria-hidden className={`${box} flex items-center justify-center gap-1.5`} style={style}>
          {[0, 1, 2, 3, 4].map((i) => (
            <span key={i} className="svc-stamp h-4 w-4 rounded-full border border-white/20" style={{ animationDelay: `${i * 0.35}s` }} />
          ))}
        </div>
      );
    // Online store: checkout bar filling, then paid.
    case 5:
      return (
        <div aria-hidden className={`${box} flex items-center gap-2 px-2.5`} style={style}>
          <span className="relative h-1.5 flex-1 overflow-hidden rounded-full bg-white/10">
            <span className="svc-fill absolute inset-y-0 left-0 rounded-full bg-[var(--c)]" />
          </span>
          <span className="svc-paid flex h-5 w-5 items-center justify-center rounded-full bg-[var(--c)] text-[0.625rem] font-bold text-black">
            ✓
          </span>
        </div>
      );
    // Brand identity: a palette finding its balance.
    case 6:
      return (
        <div aria-hidden className={`${box} flex gap-1 p-1.5`} style={style}>
          {["var(--c)", "#22d3ee", "#ec4899", "#f4f2ff"].map((c, i) => (
            <span key={i} className="svc-swatch rounded-md" style={{ background: c, animationDelay: `${i * -0.8}s` }} />
          ))}
        </div>
      );
    // Redesign: old layout wiped into the new one.
    default:
      return (
        <div aria-hidden className={box} style={style}>
          <div className="absolute inset-0 space-y-1 p-1.5">
            <span className="block h-1.5 w-[40%] bg-white/15" />
            <span className="block h-1 w-[80%] bg-white/10" />
            <span className="block h-1 w-[60%] bg-white/10" />
          </div>
          <div className="svc-wipe absolute inset-0 space-y-1 bg-[#0b0a18] p-1.5">
            <span className="block h-1.5 w-[60%] rounded-sm bg-[var(--c)]" />
            <span className="block h-1 w-[85%] rounded-sm bg-white/30" />
            <span className="block h-1 w-[50%] rounded-sm bg-white/30" />
          </div>
          <span className="svc-wipe-line absolute inset-y-0 w-px bg-white shadow-[0_0_8px_#fff]" />
        </div>
      );
  }
}
