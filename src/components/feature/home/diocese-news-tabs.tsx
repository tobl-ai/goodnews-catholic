"use client";

import { useState, useMemo } from "react";
import { orderBy } from "firebase/firestore";
import { useCollection } from "@/hooks/use-firestore";
import type { DioceseNews } from "@/types";

const DIOCESES = ["서울대교구", "수원교구", "인천교구", "대전교구"] as const;

export function DioceseNewsTabs() {
  const [active, setActive] = useState<string>(DIOCESES[0]);
  const { data: allNews, loading } = useCollection<DioceseNews>("dioceseNews", [orderBy("createdAt", "desc")]);
  const filtered = useMemo(() => allNews.filter((i) => i.diocese === active).slice(0, 5), [allNews, active]);

  return (
    <section>
      <h2 className="mb-5 text-sm font-bold uppercase tracking-[0.2em] text-[var(--color-stone)]">교구 소식</h2>
      <nav className="mb-4 flex gap-1">
        {DIOCESES.map((d) => (
          <button
            key={d}
            type="button"
            onClick={() => setActive(d)}
            className={`rounded-full px-4 py-1.5 text-xs font-medium transition-all ${
              active === d
                ? "bg-[var(--color-ink)] text-white"
                : "bg-[var(--color-ink)]/[0.04] text-[var(--color-stone)] hover:bg-[var(--color-ink)]/[0.08]"
            }`}
          >
            {d}
          </button>
        ))}
      </nav>
      {loading ? (
        <p className="py-6 text-center text-sm text-[var(--color-stone-light)]">불러오는 중...</p>
      ) : (
        <ul className="space-y-0">
          {filtered.map((item) => (
            <li key={item.id} className="flex items-center justify-between border-b border-[var(--color-ink)]/[0.04] py-3">
              <h3 className="text-[13px] font-medium text-[var(--color-ink)]/80">{item.title}</h3>
              <time className="shrink-0 pl-4 text-[11px] text-[var(--color-stone-light)]">{item.createdAt?.slice(5, 10)}</time>
            </li>
          ))}
          {filtered.length === 0 && <li className="py-6 text-center text-sm text-[var(--color-stone-light)]">소식이 없습니다</li>}
        </ul>
      )}
    </section>
  );
}
