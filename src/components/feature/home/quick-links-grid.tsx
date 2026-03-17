"use client";

import Link from "next/link";
import { orderBy } from "firebase/firestore";
import { useCollection } from "@/hooks/use-firestore";
import type { QuickLink } from "@/types";

const FALLBACK_LINKS: QuickLink[] = [
  { id: "1", label: "매일미사", icon: "⛪", url: "/mass", sortOrder: 1 },
  { id: "2", label: "성무일도", icon: "📿", url: "/prayers", sortOrder: 2 },
  { id: "3", label: "성경", icon: "✝️", url: "/bible", sortOrder: 3 },
  { id: "4", label: "기도문", icon: "🙏", url: "/prayers", sortOrder: 4 },
  { id: "5", label: "가톨릭대사전", icon: "📚", url: "/bible", sortOrder: 5 },
  { id: "6", label: "7성사", icon: "✟", url: "/saints", sortOrder: 6 },
  { id: "7", label: "가톨릭성인", icon: "👼", url: "/saints", sortOrder: 7 },
  { id: "8", label: "소리주보", icon: "🔊", url: "/hymns", sortOrder: 8 },
  { id: "9", label: "가톨릭성가", icon: "🎵", url: "/hymns", sortOrder: 9 },
  { id: "10", label: "WYD", icon: "🌍", url: "/", sortOrder: 10 },
];

export function QuickLinksGrid() {
  const { data: firestoreLinks } = useCollection<QuickLink>("quickLinks", [orderBy("sortOrder")]);
  const links = firestoreLinks.length > 0 ? firestoreLinks : FALLBACK_LINKS;

  return (
    <section>
      <nav className="grid grid-cols-5 gap-2 md:grid-cols-10" aria-label="빠른 링크">
        {links.map((link) => (
          <Link
            key={link.id}
            href={link.url}
            className="group flex flex-col items-center gap-2 rounded-xl py-4 transition-all hover:bg-[var(--color-ink)]/[0.03]"
          >
            <span className="flex h-12 w-12 items-center justify-center rounded-2xl bg-[var(--color-ink)]/[0.04] text-xl transition-all group-hover:bg-[var(--color-amber)]/10 group-hover:shadow-sm">
              {link.icon}
            </span>
            <span className="text-[11px] font-medium text-[var(--color-ink)]/60 group-hover:text-[var(--color-ink)]">
              {link.label}
            </span>
          </Link>
        ))}
      </nav>
    </section>
  );
}
