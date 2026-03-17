import { PageHeader } from "@/components/ui/page-header";
import { BibleReader } from "@/components/feature/bible/bible-reader";

export const metadata = {
  title: "성경 - 굿뉴스",
  description: "가톨릭 성경을 읽어보세요.",
};

export default function BiblePage() {
  return (
    <article>
      <PageHeader title="성경" breadcrumb="성경" />
      <section className="mx-auto max-w-4xl px-4 py-8">
        <BibleReader />
      </section>
    </article>
  );
}
