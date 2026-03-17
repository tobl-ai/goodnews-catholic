import { BoardList } from "@/components/feature/board/board-list";

export default function BoardPage() {
  return (
    <section className="mx-auto max-w-5xl px-4 py-8">
      <nav className="mb-4 text-sm text-gray-500">홈 &gt; 게시판</nav>
      <h1 className="mb-6 text-2xl font-bold">게시판</h1>
      <BoardList />
    </section>
  );
}
