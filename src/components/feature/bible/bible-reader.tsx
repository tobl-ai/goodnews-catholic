"use client";

import { useEffect, useMemo, useState } from "react";

interface Verse {
  book: string;
  chapter: number;
  verse: number;
  textKo: string;
  translation: string;
}

const BOOK_CHAPTERS: Record<string, number[]> = {
  창세기: Array.from({ length: 50 }, (_, i) => i + 1),
  탈출기: Array.from({ length: 40 }, (_, i) => i + 1),
  레위기: Array.from({ length: 27 }, (_, i) => i + 1),
  민수기: Array.from({ length: 36 }, (_, i) => i + 1),
  신명기: Array.from({ length: 34 }, (_, i) => i + 1),
  여호수아: Array.from({ length: 24 }, (_, i) => i + 1),
};

const BOOKS = Object.keys(BOOK_CHAPTERS);

export function BibleReader() {
  const [allVerses, setAllVerses] = useState<Verse[]>([]);
  const [loading, setLoading] = useState(true);
  const [selectedBook, setSelectedBook] = useState(BOOKS[0]);
  const [selectedChapter, setSelectedChapter] = useState(1);

  useEffect(() => {
    fetch("/data/bible.json")
      .then((r) => r.json())
      .then((data: Verse[]) => {
        setAllVerses(data);
        setLoading(false);
      })
      .catch(() => setLoading(false));
  }, []);

  const chapters = BOOK_CHAPTERS[selectedBook] ?? [];

  const filtered = useMemo(
    () =>
      allVerses
        .filter((v) => v.book === selectedBook && v.chapter === selectedChapter)
        .sort((a, b) => a.verse - b.verse),
    [allVerses, selectedBook, selectedChapter]
  );

  const handleBookChange = (book: string) => {
    setSelectedBook(book);
    setSelectedChapter(1);
  };

  const totalVerses = useMemo(
    () => allVerses.filter((v) => v.book === selectedBook).length,
    [allVerses, selectedBook]
  );

  return (
    <section className="space-y-6">
      {/* Stats */}
      <article className="flex flex-wrap gap-3 text-xs text-[var(--color-stone)]">
        <span className="rounded-full bg-[var(--color-brick)]/10 px-3 py-1 font-medium text-[var(--color-brick)]">
          {BOOKS.length}권 수록
        </span>
        <span className="rounded-full bg-[var(--color-ink)]/[0.04] px-3 py-1">
          총 {allVerses.length.toLocaleString()}절
        </span>
        <span className="rounded-full bg-[var(--color-ink)]/[0.04] px-3 py-1">
          {selectedBook} {totalVerses.toLocaleString()}절
        </span>
      </article>

      {/* Selectors */}
      <nav className="flex flex-wrap items-center gap-4">
        <label className="flex items-center gap-2">
          <span className="text-sm font-medium text-[var(--color-ink)]">성경</span>
          <select
            value={selectedBook}
            onChange={(e) => handleBookChange(e.target.value)}
            className="rounded-xl border border-[var(--color-ink)]/10 bg-white px-4 py-2.5 text-sm focus:border-[var(--color-brick)] focus:outline-none focus:ring-1 focus:ring-[var(--color-brick)]"
          >
            {BOOKS.map((book) => (
              <option key={book} value={book}>{book}</option>
            ))}
          </select>
        </label>

        <label className="flex items-center gap-2">
          <span className="text-sm font-medium text-[var(--color-ink)]">장</span>
          <select
            value={selectedChapter}
            onChange={(e) => setSelectedChapter(Number(e.target.value))}
            className="rounded-xl border border-[var(--color-ink)]/10 bg-white px-4 py-2.5 text-sm focus:border-[var(--color-brick)] focus:outline-none focus:ring-1 focus:ring-[var(--color-brick)]"
          >
            {chapters.map((ch) => (
              <option key={ch} value={ch}>{ch}장</option>
            ))}
          </select>
        </label>
      </nav>

      {/* Chapter header */}
      <header className="rounded-2xl bg-[var(--color-ink)] px-6 py-5 text-white">
        <h2 className="font-[var(--font-display)] text-2xl font-bold">
          {selectedBook} {selectedChapter}장
        </h2>
        <p className="mt-1 text-sm text-white/50">공동번역 &middot; {filtered.length}절</p>
      </header>

      {/* Verses */}
      {loading && (
        <p className="py-12 text-center text-[var(--color-stone-light)]">성경을 불러오는 중...</p>
      )}

      {!loading && filtered.length === 0 && (
        <p className="py-12 text-center text-[var(--color-stone-light)]">해당 구절이 없습니다.</p>
      )}

      {!loading && filtered.length > 0 && (
        <article className="space-y-1 rounded-2xl border border-[var(--color-ink)]/[0.06] bg-white p-6">
          {filtered.map((verse) => (
            <p key={`${verse.chapter}-${verse.verse}`} className="text-[15px] leading-8 text-[var(--color-ink)]/80">
              <sup className="mr-1.5 text-[11px] font-bold text-[var(--color-brick)]">
                {verse.verse}
              </sup>
              {verse.textKo}
            </p>
          ))}
        </article>
      )}

      {/* Chapter navigation */}
      {!loading && (
        <nav className="flex justify-between">
          <button
            type="button"
            onClick={() => setSelectedChapter((c) => Math.max(1, c - 1))}
            disabled={selectedChapter <= 1}
            className="rounded-xl border border-[var(--color-ink)]/10 px-4 py-2 text-sm font-medium text-[var(--color-ink)]/60 transition-colors hover:bg-[var(--color-ink)]/[0.04] disabled:opacity-30"
          >
            &larr; 이전 장
          </button>
          <button
            type="button"
            onClick={() => setSelectedChapter((c) => Math.min(chapters.length, c + 1))}
            disabled={selectedChapter >= chapters.length}
            className="rounded-xl border border-[var(--color-ink)]/10 px-4 py-2 text-sm font-medium text-[var(--color-ink)]/60 transition-colors hover:bg-[var(--color-ink)]/[0.04] disabled:opacity-30"
          >
            다음 장 &rarr;
          </button>
        </nav>
      )}
    </section>
  );
}
