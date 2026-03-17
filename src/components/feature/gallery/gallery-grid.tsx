"use client";

import { useState, useMemo } from "react";
import { useCollection } from "@/hooks/use-firestore";
import { Card } from "@/components/ui/card";
import type { GalleryItem } from "@/types";

const CATEGORIES = [
  { key: "all", label: "전체" },
  { key: "flower", label: "전례꽃꽂이" },
  { key: "painting", label: "성화" },
  { key: "architecture", label: "성당건축" },
  { key: "pilgrimage", label: "성지" },
];

const CATEGORY_ICONS: Record<string, string> = {
  flower: "🌸",
  painting: "🖼️",
  architecture: "⛪",
  pilgrimage: "✝️",
};

const CATEGORY_COLORS: Record<string, string> = {
  flower: "bg-pink-100",
  painting: "bg-amber-100",
  architecture: "bg-blue-100",
  pilgrimage: "bg-green-100",
};

export function GalleryGrid() {
  const [activeCategory, setActiveCategory] = useState("all");
  const { data: items, loading } = useCollection<GalleryItem>("gallery");

  const filtered = useMemo(() => {
    if (activeCategory === "all") return items;
    return items.filter((item) => item.category === activeCategory);
  }, [items, activeCategory]);

  return (
    <section>
      <nav className="mb-6 flex flex-wrap gap-2">
        {CATEGORIES.map((cat) => (
          <button
            key={cat.key}
            type="button"
            className={`rounded-full px-4 py-1.5 text-sm font-medium transition-colors ${
              activeCategory === cat.key
                ? "bg-[var(--color-primary)] text-white"
                : "bg-gray-100 text-gray-600 hover:bg-gray-200"
            }`}
            onClick={() => setActiveCategory(cat.key)}
          >
            {cat.label}
          </button>
        ))}
      </nav>

      {loading ? (
        <p className="py-12 text-center text-gray-400">불러오는 중...</p>
      ) : filtered.length === 0 ? (
        <p className="py-12 text-center text-gray-400">
          갤러리 항목이 없습니다.
        </p>
      ) : (
        <ul className="grid grid-cols-1 gap-6 sm:grid-cols-2 lg:grid-cols-3">
          {filtered.map((item) => (
            <li key={item.id}>
              <GalleryCard item={item} />
            </li>
          ))}
        </ul>
      )}
    </section>
  );
}

function GalleryCard({ item }: { item: GalleryItem }) {
  const bgColor = CATEGORY_COLORS[item.category] ?? "bg-gray-100";
  const icon = CATEGORY_ICONS[item.category] ?? "📷";

  return (
    <Card className="overflow-hidden">
      <figure
        className={`flex h-48 items-center justify-center ${bgColor}`}
        aria-label={item.title}
      >
        <span className="text-5xl">{icon}</span>
      </figure>
      <section className="p-4">
        <h3 className="mb-1 font-semibold text-gray-900">{item.title}</h3>
        <p className="mb-2 line-clamp-2 text-sm text-gray-600">
          {item.description}
        </p>
        <time className="text-xs text-gray-400">
          {item.createdAt.slice(0, 10)}
        </time>
      </section>
    </Card>
  );
}
