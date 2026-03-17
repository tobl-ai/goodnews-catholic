"use client";

import { useMemo, useState } from "react";
import { useCollection } from "@/hooks/use-firestore";
import type { Saint } from "@/types";
import { Card } from "@/components/ui/card";
import { Button } from "@/components/ui/button";

const DEMO_MONTH = 3;
const DEMO_DAY = 10;

function formatFeastDate(month: number, day: number): string {
  return `${month}월 ${day}일`;
}

export function SaintsList() {
  const [month, setMonth] = useState(DEMO_MONTH);
  const [day, setDay] = useState(DEMO_DAY);

  const { data: allSaints, loading } = useCollection<Saint>("saints");

  const currentDateLabel = formatFeastDate(month, day);

  const filteredSaints = useMemo(() => {
    const matched = allSaints.filter((s) => s.feastDate === currentDateLabel);
    if (matched.length > 0) return { saints: matched, mode: "date" as const };
    return { saints: allSaints.slice(0, 5), mode: "all" as const };
  }, [allSaints, currentDateLabel]);

  const prevDay = () => {
    if (day > 1) {
      setDay((d) => d - 1);
    } else {
      const prevMonth = month > 1 ? month - 1 : 12;
      setMonth(prevMonth);
      setDay(28);
    }
  };

  const nextDay = () => {
    if (day < 31) {
      setDay((d) => d + 1);
    } else {
      const nextMonth = month < 12 ? month + 1 : 1;
      setMonth(nextMonth);
      setDay(1);
    }
  };

  return (
    <section className="space-y-6">
      <nav className="flex items-center justify-center gap-4">
        <Button variant="outline" size="sm" onClick={prevDay}>
          ← 이전
        </Button>
        <h2 className="text-lg font-bold text-gray-900">{currentDateLabel}</h2>
        <Button variant="outline" size="sm" onClick={nextDay}>
          다음 →
        </Button>
      </nav>

      {loading && (
        <p className="py-12 text-center text-gray-400">불러오는 중...</p>
      )}

      {!loading && filteredSaints.mode === "all" && (
        <p className="text-center text-sm text-gray-500">
          해당 날짜의 성인이 없어 전체 성인 목록을 표시합니다.
        </p>
      )}

      {!loading && (
        <article className="space-y-4">
          {filteredSaints.saints.map((saint) => (
            <Card key={saint.id}>
              <header className="mb-2 flex items-center justify-between">
                <h3 className="text-base font-bold text-gray-900">
                  {saint.name}
                </h3>
                <span className="text-sm text-gray-500">{saint.feastDate}</span>
              </header>
              <p className="text-sm leading-6 text-gray-700">
                {saint.description}
              </p>
            </Card>
          ))}
        </article>
      )}
    </section>
  );
}
