import { PageHeader } from "@/components/ui/page-header";
import { SaintsList } from "@/components/feature/saints/saints-list";

export const metadata = {
  title: "가톨릭 성인 - 굿뉴스",
  description: "오늘의 성인과 축일 정보를 확인하세요.",
};

export default function SaintsPage() {
  return (
    <article>
      <PageHeader title="가톨릭 성인" breadcrumb="성인" />
      <section className="mx-auto max-w-4xl px-4 py-8">
        <SaintsList />
      </section>
    </article>
  );
}
