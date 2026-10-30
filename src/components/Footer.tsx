export default function Footer() {
  return (
    <footer className="bg-bg/80 px-6 py-10 sm:px-10">
      <div className="mx-auto flex max-w-6xl flex-col items-center justify-between gap-4 text-sm text-muted sm:flex-row">
        <span className="font-mono tracking-[0.2em]">CAIDE</span>
        <span>&copy; 2026 CAIDE. Kryptyk / AP Division.</span>
        <a href="#top" className="transition-colors hover:text-fg">
          Back to top
        </a>
      </div>
    </footer>
  );
}
