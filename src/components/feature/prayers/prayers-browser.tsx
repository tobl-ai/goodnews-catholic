"use client";

import { useMemo, useState } from "react";
import { useCollection } from "@/hooks/use-firestore";
import type { Prayer } from "@/types";
import { Tabs } from "@/components/ui/tabs";

const CATEGORIES = ["전체", "기본기도", "묵주기도", "성모기도", "생활기도"];

export function PrayersBrowser() {
  const { data: allPrayers, loading } = useCollection<Prayer>("prayers");

  const filterByCategory = (category: string): Prayer[] => {
    if (category === "전체") return allPrayers;
    return allPrayers.filter((p) => p.category === category);
  };

  const tabs = useMemo(
    () =>
      CATEGORIES.map((cat) => ({
        label: cat,
        content: (
          <PrayerAccordionList
            prayers={filterByCategory(cat)}
            loading={loading}
          />
        ),
      })),
    // eslint-disable-next-line react-hooks/exhaustive-deps
    [allPrayers, loading]
  );

  return <Tabs tabs={tabs} />;
}

function PrayerAccordionList({
  prayers,
  loading,
}: {
  prayers: Prayer[];
  loading: boolean;
}) {
  if (loading) {
    return <p className="py-12 text-center text-gray-400">불러오는 중...</p>;
  }

  if (prayers.length === 0) {
    return (
      <p className="py-12 text-center text-gray-400">기도문이 없습니다.</p>
    );
  }

  return (
    <article className="space-y-2">
      {prayers.map((prayer) => (
        <PrayerAccordionItem key={prayer.id} prayer={prayer} />
      ))}
    </article>
  );
}

function PrayerAccordionItem({ prayer }: { prayer: Prayer }) {
  const [expanded, setExpanded] = useState(false);

  return (
    <section className="rounded-lg border border-gray-200 bg-white">
      <button
        type="button"
        onClick={() => setExpanded((prev) => !prev)}
        className="flex w-full items-center justify-between px-5 py-4 text-left transition-colors hover:bg-gray-50"
        aria-expanded={expanded}
      >
        <span className="text-sm font-semibold text-gray-900">
          {prayer.title}
        </span>
        <span
          className={`text-gray-400 transition-transform ${
            expanded ? "rotate-180" : ""
          }`}
          aria-hidden="true"
        >
          ▼
        </span>
      </button>
      {expanded && (
        <article className="border-t border-gray-100 px-5 py-4">
          <p className="whitespace-pre-line text-sm leading-7 text-gray-700">
            {prayer.content}
          </p>
        </article>
      )}
    </section>
  );
}
