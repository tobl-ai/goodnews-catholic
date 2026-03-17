"use client";

import { useMemo, useState, type ReactNode } from "react";
import { useCollection } from "@/hooks/use-firestore";
import type { Hymn } from "@/types";
import { Tabs } from "@/components/ui/tabs";
import { Table } from "@/components/ui/table";

const CATEGORIES = [
  "전체",
  "입당",
  "봉헌",
  "영성체",
  "파견",
  "성모",
  "사순",
  "부활",
];

const COLUMNS = [
  { key: "number", header: "번호", className: "w-16" },
  { key: "title", header: "제목" },
  { key: "lyricsFirstLine", header: "가사 첫줄" },
  { key: "category", header: "분류", className: "w-24" },
];

export function HymnsBrowser() {
  const [keyword, setKeyword] = useState("");
  const { data: allHymns, loading } = useCollection<Hymn>("hymns");

  const filterByCategory = (category: string): Hymn[] => {
    let filtered = allHymns;
    if (category !== "전체") {
      filtered = filtered.filter((h) => h.category === category);
    }
    if (keyword.trim()) {
      const kw = keyword.trim().toLowerCase();
      filtered = filtered.filter(
        (h) =>
          h.title.toLowerCase().includes(kw) ||
          h.lyricsFirstLine.toLowerCase().includes(kw)
      );
    }
    return filtered.sort((a, b) => a.number - b.number);
  };

  const tabs = useMemo(
    () =>
      CATEGORIES.map((cat) => ({
        label: cat,
        content: (
          <HymnTable hymns={filterByCategory(cat)} loading={loading} />
        ),
      })),
    // eslint-disable-next-line react-hooks/exhaustive-deps
    [allHymns, keyword, loading]
  );

  return (
    <section className="space-y-6">
      <search className="flex items-center gap-2">
        <input
          type="text"
          placeholder="성가 제목 또는 가사 검색..."
          value={keyword}
          onChange={(e) => setKeyword(e.target.value)}
          className="w-full max-w-sm rounded-md border border-gray-300 px-4 py-2 text-sm focus:border-[var(--color-primary)] focus:outline-none focus:ring-1 focus:ring-[var(--color-primary)]"
        />
      </search>
      <Tabs tabs={tabs} />
    </section>
  );
}

function HymnTable({ hymns, loading }: { hymns: Hymn[]; loading: boolean }) {
  if (loading) {
    return <p className="py-12 text-center text-gray-400">불러오는 중...</p>;
  }

  const rows: Record<string, ReactNode>[] = hymns.map((h) => ({
    number: h.number,
    title: h.title,
    lyricsFirstLine: h.lyricsFirstLine,
    category: h.category,
  }));

  return <Table columns={COLUMNS} rows={rows} />;
}
