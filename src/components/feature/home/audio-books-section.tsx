"use client";

import { orderBy, limit } from "firebase/firestore";
import { useCollection } from "@/hooks/use-firestore";
import type { AudioBook } from "@/types";

export function AudioBooksSection() {
  const { data: books, loading } = useCollection<AudioBook>("audioBooks", [orderBy("title"), limit(6)]);

  return (
    <section>
      <h2 className="mb-5 text-sm font-bold uppercase tracking-[0.2em] text-[var(--color-stone)]">오디오북</h2>
      {loading ? (
        <article className="grid gap-3 sm:grid-cols-2 md:grid-cols-3">
          {Array.from({ length: 6 }).map((_, i) => (
            <span key={i} className="block h-24 animate-pulse rounded-2xl bg-[var(--color-ink)]/[0.03]" />
          ))}
        </article>
      ) : (
        <article className="grid gap-3 sm:grid-cols-2 md:grid-cols-3">
          {books.map((book) => (
            <section key={book.id} className="group flex items-center gap-4 rounded-2xl border border-[var(--color-ink)]/[0.06] bg-white p-4 transition-all hover:border-[var(--color-amber)]/20 hover:shadow-sm">
              <span className="flex h-12 w-12 shrink-0 items-center justify-center rounded-xl bg-[var(--color-ink)]/[0.04] text-lg group-hover:bg-[var(--color-amber)]/10">
                🎧
              </span>
              <article className="min-w-0 flex-1">
                <h3 className="truncate text-sm font-medium text-[var(--color-ink)]">{book.title}</h3>
                <p className="mt-0.5 text-xs text-[var(--color-stone)]">{book.author} &middot; {book.duration}</p>
              </article>
            </section>
          ))}
          {books.length === 0 && <p className="col-span-full text-center text-sm text-[var(--color-stone-light)]">오디오북이 없습니다</p>}
        </article>
      )}
    </section>
  );
}
