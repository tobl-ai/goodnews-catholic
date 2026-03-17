import Link from "next/link";

const FOOTER_LINKS = [
  { href: "/privacy", label: "개인정보처리방침" },
  { href: "/terms", label: "이용약관" },
  { href: "/directions", label: "오시는 길" },
] as const;

export function Footer() {
  return (
    <footer className="bg-[var(--color-ink)] text-white/60">
      <section className="mx-auto max-w-7xl px-6 py-16">
        <header className="flex flex-col items-start justify-between gap-8 border-b border-white/10 pb-10 md:flex-row md:items-center">
          <article className="flex items-center gap-3">
            <svg width="32" height="32" viewBox="0 0 48 48" fill="none">
              <path d="M24 8V40M16 20H32" stroke="#c8a24e" strokeWidth="2" strokeLinecap="round" />
            </svg>
            <span className="text-lg font-bold text-white">굿뉴스</span>
          </article>
          <nav className="flex flex-wrap gap-8">
            {FOOTER_LINKS.map((link) => (
              <Link
                key={link.href}
                href={link.href}
                className="text-sm transition-colors hover:text-[var(--color-amber)]"
              >
                {link.label}
              </Link>
            ))}
          </nav>
        </header>

        <section className="mt-10 flex flex-col gap-6 md:flex-row md:justify-between">
          <article className="space-y-2 text-sm text-white/40">
            <p>서울특별시 중구 명동길 74 (명동2가)</p>
            <p>한국천주교중앙협의회</p>
          </article>
          <p className="text-xs text-white/30">
            &copy; 2026 한국천주교중앙협의회
          </p>
        </section>
      </section>
    </footer>
  );
}
