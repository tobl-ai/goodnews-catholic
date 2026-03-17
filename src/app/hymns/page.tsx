import { PageHeader } from "@/components/ui/page-header";
import { HymnsBrowser } from "@/components/feature/hymns/hymns-browser";

export const metadata = {
  title: "가톨릭 성가 - 굿뉴스",
  description: "가톨릭 성가를 검색하고 찾아보세요.",
};

export default function HymnsPage() {
  return (
    <article>
      <PageHeader title="가톨릭 성가" breadcrumb="성가" />
      <section className="mx-auto max-w-4xl px-4 py-8">
        <HymnsBrowser />
      </section>
    </article>
  );
}
