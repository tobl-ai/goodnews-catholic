"use client";

import { useEffect, useState } from "react";
import { collection, getDocs, query, where, limit } from "firebase/firestore";
import { db } from "@/lib/firebase";
import type { DailyMass } from "@/types";
import { Card } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";

const DEMO_DATE = new Date(2026, 2, 10);

const COLOR_TO_BADGE: Record<string, { variant: "purple" | "red" | "green" | "white" | "default"; label: string }> = {
  purple: { variant: "purple", label: "보라색" },
  red: { variant: "red", label: "빨간색" },
  green: { variant: "green", label: "초록색" },
  white: { variant: "white", label: "흰색" },
  rose: { variant: "default", label: "장미색" },
  black: { variant: "default", label: "검은색" },
};

function formatDate(d: Date): string {
  const yyyy = d.getFullYear();
  const mm = String(d.getMonth() + 1).padStart(2, "0");
  const dd = String(d.getDate()).padStart(2, "0");
  return `${yyyy}-${mm}-${dd}`;
}

function displayDate(d: Date): string {
  return `${d.getFullYear()}년 ${d.getMonth() + 1}월 ${d.getDate()}일`;
}

export function MassReader() {
  const [date, setDate] = useState<Date>(DEMO_DATE);
  const [mass, setMass] = useState<DailyMass | null>(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    async function load() {
      setLoading(true);
      const dateStr = formatDate(date);
      const q = query(
        collection(db, "dailyMass"),
        where("date", "==", dateStr),
        limit(1)
      );
      const snap = await getDocs(q);
      if (snap.docs.length > 0) {
        setMass({ id: snap.docs[0].id, ...snap.docs[0].data() } as DailyMass);
      } else {
        setMass(null);
      }
      setLoading(false);
    }
    load();
  }, [date]);

  const prevDay = () => setDate((d) => new Date(d.getTime() - 86400000));
  const nextDay = () => setDate((d) => new Date(d.getTime() + 86400000));

  const colorKey = mass?.liturgicalColor?.toLowerCase() ?? "green";
  const badgeInfo = COLOR_TO_BADGE[colorKey] ?? COLOR_TO_BADGE.green;

  return (
    <section className="space-y-6">
      <nav className="flex items-center justify-center gap-4">
        <Button variant="outline" size="sm" onClick={prevDay}>
          ← 이전 날
        </Button>
        <h2 className="text-lg font-bold text-gray-900">{displayDate(date)}</h2>
        <Button variant="outline" size="sm" onClick={nextDay}>
          다음 날 →
        </Button>
      </nav>

      {loading && (
        <p className="py-12 text-center text-gray-400">불러오는 중...</p>
      )}

      {!loading && !mass && (
        <p className="py-12 text-center text-gray-400">
          해당 날짜의 미사 정보가 없습니다.
        </p>
      )}

      {!loading && mass && (
        <article className="space-y-6">
          <header className="flex items-center gap-3 rounded-lg bg-gray-50 p-4">
            <Badge variant={badgeInfo.variant}>{badgeInfo.label}</Badge>
            <p className="font-medium text-gray-800">{mass.liturgicalSeason}</p>
          </header>

          <ReadingCard label="제1독서" reference={mass.firstReadingRef} text={mass.firstReadingText} />
          <ReadingCard label="화답송" reference={mass.psalmRef} text={mass.psalmResponse} />
          {mass.secondReadingRef && mass.secondReadingText && (
            <ReadingCard label="제2독서" reference={mass.secondReadingRef} text={mass.secondReadingText} />
          )}
          <ReadingCard label="복음환호송" reference="" text={mass.gospelAcclamation} />
          <ReadingCard label="복음" reference={mass.gospelRef} text={mass.gospelText} />
        </article>
      )}
    </section>
  );
}

function ReadingCard({ label, reference, text }: { label: string; reference: string; text: string }) {
  return (
    <Card>
      <header className="mb-2">
        <h3 className="text-base font-bold text-[var(--color-primary)]">{label}</h3>
        {reference && <p className="text-sm text-gray-500">{reference}</p>}
      </header>
      <p className="whitespace-pre-line text-sm leading-7 text-gray-700">{text}</p>
    </Card>
  );
}
