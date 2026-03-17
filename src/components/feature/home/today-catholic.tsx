"use client";

import Link from "next/link";

const CARDS = [
  {
    title: "전례 시기",
    sub: "사순 제2주간",
    href: "/mass",
    color: "var(--color-liturgical-purple)",
    icon: (
      <svg width="28" height="28" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5">
        <circle cx="12" cy="12" r="10" />
        <path d="M12 6v6l4 2" />
      </svg>
    ),
  },
  {
    title: "오늘의 미사",
    sub: "전례와 독서",
    href: "/mass",
    color: "var(--color-amber)",
    icon: (
      <svg width="28" height="28" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5">
        <path d="M4 19.5A2.5 2.5 0 016.5 17H20" />
        <path d="M4 19.5V4.5A2.5 2.5 0 016.5 2H20v20H6.5A2.5 2.5 0 014 19.5z" />
      </svg>
    ),
  },
  {
    title: "오늘의 성인",
    sub: "축일 성인",
    href: "/saints",
    color: "var(--color-amber-dim)",
    icon: (
      <svg width="28" height="28" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5">
        <path d="M12 2l3.09 6.26L22 9.27l-5 4.87 1.18 6.88L12 17.77l-6.18 3.25L7 14.14 2 9.27l6.91-1.01L12 2z" />
      </svg>
    ),
  },
  {
    title: "오늘의 말씀",
    sub: "매일 말씀",
    href: "/bible",
    color: "var(--color-stone)",
    icon: (
      <svg width="28" height="28" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5">
        <path d="M12 20h9" />
        <path d="M16.5 3.5a2.121 2.121 0 013 3L7 19l-4 1 1-4L16.5 3.5z" />
      </svg>
    ),
  },
] as const;

export function TodayCatholic() {
  return (
    <section>
      <h2 className="mb-5 text-sm font-bold uppercase tracking-[0.2em] text-[var(--color-stone)]">
        오늘의 가톨릭
      </h2>
      <article className="grid grid-cols-2 gap-3 md:grid-cols-4">
        {CARDS.map((card) => (
          <Link
            key={card.title}
            href={card.href}
            className="group relative overflow-hidden rounded-2xl border border-[var(--color-ink)]/[0.06] bg-white p-5 transition-all hover:border-[var(--color-amber)]/20 hover:shadow-lg hover:shadow-[var(--color-amber)]/5"
          >
            <span className="mb-3 inline-flex rounded-xl p-2.5 text-white" style={{ backgroundColor: card.color }}>
              {card.icon}
            </span>
            <h3 className="text-sm font-bold text-[var(--color-ink)]">{card.title}</h3>
            <p className="mt-1 text-xs text-[var(--color-stone)]">{card.sub}</p>
            <span className="absolute right-4 top-4 text-[var(--color-stone-light)] opacity-0 transition-all group-hover:opacity-100 group-hover:translate-x-0 -translate-x-1">
              &rarr;
            </span>
          </Link>
        ))}
      </article>
    </section>
  );
}
