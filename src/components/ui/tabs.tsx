"use client";

import { useState, type ReactNode } from "react";

interface Tab {
  label: string;
  content: ReactNode;
}

interface TabsProps {
  tabs: Tab[];
  defaultIndex?: number;
  className?: string;
}

export function Tabs({ tabs, defaultIndex = 0, className = "" }: TabsProps) {
  const [activeIndex, setActiveIndex] = useState(defaultIndex);

  return (
    <section className={className}>
      <nav
        className="flex border-b border-gray-200"
        role="tablist"
        aria-label="탭 목록"
      >
        {tabs.map((tab, idx) => (
          <button
            key={tab.label}
            type="button"
            role="tab"
            aria-selected={idx === activeIndex}
            aria-controls={`tabpanel-${idx}`}
            className={`px-4 py-2.5 text-sm font-medium transition-colors ${
              idx === activeIndex
                ? "border-b-2 border-[var(--color-primary)] text-[var(--color-primary)]"
                : "text-gray-500 hover:text-gray-700"
            }`}
            onClick={() => setActiveIndex(idx)}
          >
            {tab.label}
          </button>
        ))}
      </nav>
      <article
        id={`tabpanel-${activeIndex}`}
        role="tabpanel"
        className="pt-4"
      >
        {tabs[activeIndex]?.content}
      </article>
    </section>
  );
}
