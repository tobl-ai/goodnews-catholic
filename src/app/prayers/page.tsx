import { PageHeader } from "@/components/ui/page-header";
import { PrayersBrowser } from "@/components/feature/prayers/prayers-browser";

export const metadata = {
  title: "기도문 - 굿뉴스",
  description: "가톨릭 기도문을 찾아보세요.",
};

export default function PrayersPage() {
  return (
    <article>
      <PageHeader title="기도문" breadcrumb="기도문" />
      <section className="mx-auto max-w-4xl px-4 py-8">
        <PrayersBrowser />
      </section>
    </article>
  );
}
