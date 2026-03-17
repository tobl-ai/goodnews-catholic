"use client";

import { useState, useMemo } from "react";
import { orderBy } from "firebase/firestore";
import { useCollection } from "@/hooks/use-firestore";
import type { NewsItem } from "@/types";

const SOURCES = ["가톨릭신문", "가톨릭평화신문"] as const;

export function NewsTabs() {
  const [active, setActive] = useState<string>(SOURCES[0]);
  const { data: allNews, loading } = useCollection<NewsItem>("news", [orderBy("createdAt", "desc")]);
  const filtered = useMemo(() => allNews.filter((i) => i.source === active).slice(0, 8), [allNews, active]);

  return (
    <section className="grid gap-6 md:grid-cols-2">
      <article>
        <h2 className="mb-5 text-sm font-bold uppercase tracking-[0.2em] text-[var(--color-stone)]">뉴스</h2>
        <nav className="mb-4 flex gap-1">
          {SOURCES.map((src) => (
            <button
              key={src}
              type="button"
              onClick={() => setActive(src)}
              className={`rounded-full px-4 py-1.5 text-xs font-medium transition-all ${
                active === src
                  ? "bg-[var(--color-ink)] text-white"
                  : "bg-[var(--color-ink)]/[0.04] text-[var(--color-stone)] hover:bg-[var(--color-ink)]/[0.08]"
              }`}
            >
              {src}
            </button>
          ))}
        </nav>
        {loading ? (
          <p className="py-6 text-center text-sm text-[var(--color-stone-light)]">불러오는 중...</p>
        ) : (
          <ul className="space-y-0">
            {filtered.map((item) => (
              <li key={item.id} className="group flex items-start justify-between border-b border-[var(--color-ink)]/[0.04] py-3">
                <article className="min-w-0 flex-1">
                  <h3 className="text-[13px] font-medium text-[var(--color-ink)]/80 group-hover:text-[var(--color-ink)]">{item.title}</h3>
                  {item.summary && <p className="mt-0.5 line-clamp-1 text-xs text-[var(--color-stone-light)]">{item.summary}</p>}
                </article>
                <time className="shrink-0 pl-4 text-[11px] text-[var(--color-stone-light)]">{item.createdAt?.slice(5, 10)}</time>
              </li>
            ))}
            {filtered.length === 0 && <li className="py-6 text-center text-sm text-[var(--color-stone-light)]">뉴스가 없습니다</li>}
          </ul>
        )}
      </article>
      <DioceseNewsInline />
    </section>
  );
}

function DioceseNewsInline() {
  return (
    <article>
      <h2 className="mb-5 text-sm font-bold uppercase tracking-[0.2em] text-[var(--color-stone)]">교구 소식</h2>
      <p className="py-6 text-center text-sm text-[var(--color-stone-light)]">교구 소식을 불러오는 중...</p>
    </article>
  );
}
