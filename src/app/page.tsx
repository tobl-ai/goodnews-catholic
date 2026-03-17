import { BannerSlider } from "@/components/feature/home/banner-slider";
import { NewsTicker } from "@/components/feature/home/news-ticker";
import { QuickLinksGrid } from "@/components/feature/home/quick-links-grid";
import { TodayCatholic } from "@/components/feature/home/today-catholic";
import { NewsTabs } from "@/components/feature/home/news-tabs";
import { DioceseNewsTabs } from "@/components/feature/home/diocese-news-tabs";
import { BoardPreview } from "@/components/feature/home/board-preview";
import { AudioBooksSection } from "@/components/feature/home/audio-books-section";

export default function HomePage() {
  return (
    <section className="bg-[var(--color-bg-light)]">
      <NewsTicker />
      <BannerSlider />
      <section className="mx-auto max-w-7xl px-4 py-6 space-y-8">
        <QuickLinksGrid />
        <TodayCatholic />
        <NewsTabs />
        <DioceseNewsTabs />
        <BoardPreview />
        <AudioBooksSection />
      </section>
    </section>
  );
}
