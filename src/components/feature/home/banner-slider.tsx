"use client";

import { useEffect, useState, useCallback } from "react";
import Image from "next/image";
import { orderBy, where } from "firebase/firestore";
import { useCollection } from "@/hooks/use-firestore";
import type { Banner } from "@/types";

const FALLBACK_BANNERS: (Banner & { image: string })[] = [
  { id: "1", title: "2026 부활 평화마켓", subtitle: "다양한 수공예품과 먹거리를 만나보세요", dateText: "2026. 3. 21(토) 12-18시", location: "청년문화공간JU", bgColor: "#1a1a2e", isActive: true, sortOrder: 1, image: "/images/banners/easter-market-1773715254.png" },
  { id: "2", title: "어른들을 위한 성경공부", subtitle: "성경의 핵심을 쉽고 깊이 있게", dateText: "상반기 19기: 4월 9일~", location: "Zoom 온라인", bgColor: "#0f2027", isActive: true, sortOrder: 2, image: "/images/banners/bible-study-1773715254.png" },
  { id: "3", title: "2027 서울 세계청년대회", subtitle: "전 세계 청년들이 서울에서 만납니다", dateText: "WYD Seoul 2027", location: "명동대성당", bgColor: "#1a0a2e", isActive: true, sortOrder: 3, image: "/images/banners/wyd-myeongdong-1773715325013.png" },
  { id: "4", title: "사순시기 특별 강좌", subtitle: "사순시기의 의미와 실천을 함께", dateText: "매주 수요일 저녁 7시", location: "명동대성당", bgColor: "#1e1e2e", isActive: true, sortOrder: 4, image: "/images/banners/lenten-liturgy-1773715254.png" },
  { id: "5", title: "가톨릭 청년 봉사단", subtitle: "함께 나누는 기쁨에 참여하세요", dateText: "3월 15일 마감", location: "youth.catholic.or.kr", bgColor: "#0a1628", isActive: true, sortOrder: 5, image: "/images/banners/youth-volunteer-1773715254.png" },
];

export function BannerSlider() {
  const { data: firestoreBanners } = useCollection<Banner>("banners", [
    where("isActive", "==", true),
    orderBy("sortOrder"),
  ]);
  const banners = firestoreBanners.length > 0 ? firestoreBanners : FALLBACK_BANNERS;
  const [current, setCurrent] = useState(0);

  const prev = useCallback(() => {
    setCurrent((p) => (p - 1 + banners.length) % banners.length);
  }, [banners.length]);

  const next = useCallback(() => {
    setCurrent((p) => (p + 1) % banners.length);
  }, [banners.length]);

  useEffect(() => {
    if (banners.length === 0) return;
    const timer = setInterval(next, 6000);
    return () => clearInterval(timer);
  }, [banners.length, next]);

  const banner = banners[current];
  const img = (banner as Banner & { image?: string }).image || FALLBACK_BANNERS[current % FALLBACK_BANNERS.length].image;

  return (
    <section className="relative overflow-hidden" style={{ height: "480px" }}>
      <Image src={img} alt={banner.title} fill className="object-cover transition-all duration-1000" priority />
      <article className="absolute inset-0 bg-gradient-to-r from-[var(--color-ink)]/90 via-[var(--color-ink)]/60 to-transparent" />

      {/* Content */}
      <article className="relative z-10 mx-auto flex h-full max-w-7xl flex-col justify-center px-8 md:px-16">
        <p className="mb-3 text-xs font-medium tracking-[0.3em] uppercase text-[var(--color-amber-light)]/80">
          {banner.dateText}
        </p>
        <h2 className="mb-4 max-w-xl font-[var(--font-display)] text-4xl font-bold leading-tight text-white md:text-6xl">
          {banner.title}
        </h2>
        <p className="mb-2 max-w-lg text-lg text-white/70">{banner.subtitle}</p>
        {banner.location && (
          <p className="flex items-center gap-2 text-sm text-white/50">
            <svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
              <path d="M12 2C8.13 2 5 5.13 5 9c0 5.25 7 13 7 13s7-7.75 7-13c0-3.87-3.13-7-7-7z" />
              <circle cx="12" cy="9" r="2.5" />
            </svg>
            {banner.location}
          </p>
        )}
      </article>

      {/* Left/Right arrows */}
      <button
        type="button"
        onClick={prev}
        className="absolute left-4 top-1/2 z-20 -translate-y-1/2 rounded-full bg-black/30 p-3 text-white/80 backdrop-blur-sm transition-all hover:bg-black/50 hover:text-white md:left-6"
        aria-label="이전 배너"
      >
        <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5" strokeLinecap="round" strokeLinejoin="round">
          <path d="M15 18l-6-6 6-6" />
        </svg>
      </button>
      <button
        type="button"
        onClick={next}
        className="absolute right-4 top-1/2 z-20 -translate-y-1/2 rounded-full bg-black/30 p-3 text-white/80 backdrop-blur-sm transition-all hover:bg-black/50 hover:text-white md:right-6"
        aria-label="다음 배너"
      >
        <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5" strokeLinecap="round" strokeLinejoin="round">
          <path d="M9 18l6-6-6-6" />
        </svg>
      </button>

      {/* Progress dots */}
      <nav className="absolute bottom-8 left-8 z-10 flex gap-2 md:left-16" aria-label="배너 탐색">
        {banners.map((_, i) => (
          <button
            key={banners[i].id}
            type="button"
            onClick={() => setCurrent(i)}
            className={`h-1 rounded-full transition-all duration-500 ${
              i === current ? "w-10 bg-[var(--color-amber)]" : "w-4 bg-white/25 hover:bg-white/50"
            }`}
            aria-label={`배너 ${i + 1}`}
          />
        ))}
      </nav>

      {/* Counter */}
      <span className="absolute bottom-8 right-8 z-10 text-xs text-white/40 md:right-16">
        {current + 1} / {banners.length}
      </span>
    </section>
  );
}
