"use client";

import { useMemo } from "react";
import Link from "next/link";
import { orderBy } from "firebase/firestore";
import { useCollection } from "@/hooks/use-firestore";
import type { BoardPost } from "@/types";

const BOARDS: { type: BoardPost["boardType"]; label: string }[] = [
  { type: "muk", label: "묵상나눔" },
  { type: "free", label: "자유게시판" },
  { type: "qa", label: "질문답변" },
];

export function BoardPreview() {
  const { data: allPosts, loading } = useCollection<BoardPost>("boardPosts", [orderBy("createdAt", "desc")]);

  const grouped = useMemo(() => {
    const map: Record<string, BoardPost[]> = {};
    for (const board of BOARDS) {
      map[board.type] = allPosts.filter((p) => p.boardType === board.type).slice(0, 5);
    }
    return map;
  }, [allPosts]);

  return (
    <section>
      <h2 className="mb-5 text-sm font-bold uppercase tracking-[0.2em] text-[var(--color-stone)]">게시판</h2>
      <article className="grid gap-4 md:grid-cols-3">
        {BOARDS.map((board) => (
          <section key={board.type} className="rounded-2xl border border-[var(--color-ink)]/[0.06] bg-white p-5">
            <header className="mb-3 flex items-center justify-between">
              <h3 className="text-sm font-bold text-[var(--color-ink)]">{board.label}</h3>
              <Link href={`/board?type=${board.type}`} className="text-[11px] font-medium text-[var(--color-amber)] hover:underline">
                더보기 &rarr;
              </Link>
            </header>
            {loading ? (
              <p className="text-xs text-[var(--color-stone-light)]">불러오는 중...</p>
            ) : (
              <ul className="space-y-1.5">
                {grouped[board.type].map((post) => (
                  <li key={post.id}>
                    <Link href={`/board?type=${board.type}`} className="block truncate text-[13px] text-[var(--color-ink)]/60 hover:text-[var(--color-ink)]">
                      {post.isNotice && <span className="mr-1 text-[11px] font-bold text-[var(--color-liturgical-red)]">[공지]</span>}
                      {post.title}
                    </Link>
                  </li>
                ))}
                {grouped[board.type].length === 0 && <li className="text-xs text-[var(--color-stone-light)]">글이 없습니다</li>}
              </ul>
            )}
          </section>
        ))}
      </article>
    </section>
  );
}
