"use client";

import { useState, useCallback } from "react";
import Link from "next/link";

interface NavLink {
  readonly href: string;
  readonly label: string;
}

export function MobileNav({ links }: { links: readonly NavLink[] }) {
  const [isOpen, setIsOpen] = useState(false);
  const close = useCallback(() => setIsOpen(false), []);
  const toggle = useCallback(() => setIsOpen((p) => !p), []);

  return (
    <aside className="lg:hidden">
      <button
        type="button"
        onClick={toggle}
        className="rounded-lg p-2.5 text-white/70 transition-colors hover:bg-white/5 hover:text-white"
        aria-label={isOpen ? "메뉴 닫기" : "메뉴 열기"}
      >
        <svg width="22" height="22" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round">
          {isOpen ? (
            <path d="M6 18L18 6M6 6l12 12" />
          ) : (
            <path d="M4 7h16M4 12h12M4 17h8" />
          )}
        </svg>
      </button>

      {isOpen && (
        <>
          <section className="fixed inset-0 top-20 z-40 bg-black/60 backdrop-blur-sm" onClick={close} />
          <nav className="fixed right-0 top-20 z-50 h-[calc(100vh-5rem)] w-72 bg-[var(--color-ink)] p-6 shadow-2xl">
            <ul className="space-y-1">
              {links.map((link) => (
                <li key={link.href}>
                  <Link
                    href={link.href}
                    onClick={close}
                    className="block rounded-lg px-4 py-3.5 text-[15px] font-medium text-white/70 transition-all hover:bg-white/5 hover:text-white hover:pl-6"
                  >
                    {link.label}
                  </Link>
                </li>
              ))}
            </ul>
            <footer className="mt-8 border-t border-white/10 pt-6">
              <Link
                href="/login"
                onClick={close}
                className="block rounded-full border border-[var(--color-amber)]/40 py-3 text-center text-sm font-medium text-[var(--color-amber-light)] transition-all hover:bg-[var(--color-amber)]/10"
              >
                로그인
              </Link>
            </footer>
          </nav>
        </>
      )}
    </aside>
  );
}
