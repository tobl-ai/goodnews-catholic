import Link from "next/link";
import { MobileNav } from "./mobile-nav";

const NAV_LINKS = [
  { href: "/mass", label: "매일미사" },
  { href: "/bible", label: "성경" },
  { href: "/saints", label: "성인" },
  { href: "/hymns", label: "성가" },
  { href: "/prayers", label: "기도문" },
  { href: "/board", label: "게시판" },
  { href: "/gallery", label: "갤러리" },
] as const;

export function Header() {
  return (
    <header className="fixed top-0 z-50 w-full border-b border-[var(--color-amber)]/10 bg-[var(--color-ink)]/90 text-white backdrop-blur-xl">
      <nav className="mx-auto flex h-20 max-w-7xl items-center justify-between px-6">
        <Link href="/" className="flex items-center gap-3 group">
          <GoodNewsLogo />
          <span className="flex flex-col leading-tight">
            <span className="font-[var(--font-display)] text-xs tracking-[0.3em] uppercase text-[var(--color-amber-light)]">
              Catholic
            </span>
            <span className="text-lg font-bold tracking-tight">
              굿뉴스
            </span>
          </span>
        </Link>

        <ul className="hidden items-center gap-0.5 lg:flex">
          {NAV_LINKS.map((link) => (
            <li key={link.href}>
              <Link
                href={link.href}
                className="relative px-4 py-2 text-[13px] font-medium tracking-wide text-white/70 transition-colors hover:text-white after:absolute after:bottom-0 after:left-1/2 after:h-px after:w-0 after:bg-[var(--color-amber)] after:transition-all after:duration-300 hover:after:left-4 hover:after:w-[calc(100%-2rem)]"
              >
                {link.label}
              </Link>
            </li>
          ))}
        </ul>

        <aside className="hidden items-center gap-4 lg:flex">
          <Link
            href="/login"
            className="rounded-full border border-[var(--color-amber)]/40 px-5 py-2 text-[13px] font-medium text-[var(--color-amber-light)] transition-all hover:border-[var(--color-amber)] hover:bg-[var(--color-amber)]/10"
          >
            로그인
          </Link>
        </aside>

        <MobileNav links={NAV_LINKS} />
      </nav>
    </header>
  );
}

function GoodNewsLogo() {
  return (
    <svg
      width="40"
      height="40"
      viewBox="0 0 48 48"
      fill="none"
      xmlns="http://www.w3.org/2000/svg"
      className="transition-transform duration-500 group-hover:scale-105"
    >
      <circle cx="24" cy="24" r="22" stroke="#c8a24e" strokeWidth="1" opacity="0.3" />
      <circle cx="24" cy="24" r="18" stroke="#c8a24e" strokeWidth="0.5" opacity="0.15" />
      <path
        d="M24 8V40M16 20H32"
        stroke="#c8a24e"
        strokeWidth="2.5"
        strokeLinecap="round"
      />
      <path
        d="M24 8C24 8 22 10 22 12"
        stroke="#c8a24e"
        strokeWidth="1.5"
        strokeLinecap="round"
        opacity="0.6"
      />
      <path
        d="M24 8C24 8 26 10 26 12"
        stroke="#c8a24e"
        strokeWidth="1.5"
        strokeLinecap="round"
        opacity="0.6"
      />
      <circle cx="24" cy="20" r="2" fill="#c8a24e" opacity="0.4" />
    </svg>
  );
}
