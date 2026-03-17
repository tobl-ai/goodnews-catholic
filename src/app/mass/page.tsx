import { PageHeader } from "@/components/ui/page-header";
import { MassReader } from "@/components/feature/mass/mass-reader";

export const metadata = {
  title: "매일미사 - 굿뉴스",
  description: "오늘의 미사 독서와 복음을 확인하세요.",
};

export default function MassPage() {
  return (
    <article>
      <PageHeader title="매일미사" breadcrumb="매일미사" />
      <section className="mx-auto max-w-4xl px-4 py-8">
        <MassReader />
      </section>
    </article>
  );
}
