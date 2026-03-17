"use client";

import { orderBy, limit } from "firebase/firestore";
import { useCollection } from "@/hooks/use-firestore";
import type { RealtimeNews, Announcement } from "@/types";

export function NewsTicker() {
  const { data: news } = useCollection<RealtimeNews>("realtimeNews", [
    orderBy("createdAt", "desc"),
    limit(10),
  ]);
  const { data: announcements } = useCollection<Announcement>("announcements", [
    orderBy("createdAt", "desc"),
    limit(5),
  ]);

  return (
    <section className="border-b border-[var(--color-cream-dark)] bg-white/80 backdrop-blur-sm">
      <article className="mx-auto max-w-7xl px-6 py-2.5 space-y-1">
        <TickerRow label="속보" color="var(--color-amber)" items={news.map((n) => n.title)} />
        <TickerRow label="공지" color="var(--color-stone)" items={announcements.map((a) => a.title)} />
      </article>
    </section>
  );
}

function TickerRow({ label, color, items }: { label: string; color: string; items: string[] }) {
  if (items.length === 0) return null;
  const joined = items.join(" \u00A0\u00A0\u00B7\u00A0\u00A0 ");

  return (
    <p className="flex items-center gap-3 overflow-hidden py-1 text-[13px]">
      <span
        className="shrink-0 rounded-sm px-2 py-0.5 text-[11px] font-bold uppercase tracking-wider text-white"
        style={{ backgroundColor: color }}
      >
        {label}
      </span>
      <span className="inline-block whitespace-nowrap text-[var(--color-ink)]/60 animate-marquee">
        {joined}
      </span>
    </p>
  );
}
