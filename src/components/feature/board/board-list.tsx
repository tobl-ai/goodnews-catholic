"use client";

import { useState, useMemo } from "react";
import { useCollection } from "@/hooks/use-firestore";
import { useAuth } from "@/hooks/use-auth";
import { Table } from "@/components/ui/table";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import { Pagination } from "@/components/ui/pagination";
import { PostView } from "./post-view";
import { PostForm } from "./post-form";
import type { BoardPost } from "@/types";

const TABS = [
  { key: "muk" as const, label: "묵상나눔" },
  { key: "free" as const, label: "자유게시판" },
  { key: "qa" as const, label: "질문답변" },
];

const POSTS_PER_PAGE = 10;

const TABLE_COLUMNS = [
  { key: "title", header: "제목" },
  { key: "author", header: "작성자", className: "w-24 text-center" },
  { key: "views", header: "조회수", className: "w-20 text-center" },
  { key: "date", header: "작성일", className: "w-28 text-center" },
];

export function BoardList() {
  const [activeTab, setActiveTab] = useState<"muk" | "free" | "qa">("muk");
  const [page, setPage] = useState(1);
  const [selectedPost, setSelectedPost] = useState<BoardPost | null>(null);
  const [showForm, setShowForm] = useState(false);

  const { user } = useAuth();
  const { data: posts, loading } = useCollection<BoardPost>("boardPosts");

  const filtered = useMemo(() => {
    const byType = posts.filter((p) => p.boardType === activeTab);
    return byType.sort((a, b) => {
      if (a.isNotice !== b.isNotice) return a.isNotice ? -1 : 1;
      return b.createdAt.localeCompare(a.createdAt);
    });
  }, [posts, activeTab]);

  const totalPages = Math.max(1, Math.ceil(filtered.length / POSTS_PER_PAGE));
  const paginated = filtered.slice(
    (page - 1) * POSTS_PER_PAGE,
    page * POSTS_PER_PAGE
  );

  const rows = paginated.map((post) => ({
    title: (
      <button
        type="button"
        className="text-left hover:text-[var(--color-primary)] hover:underline"
        onClick={() => setSelectedPost(post)}
      >
        {post.isNotice && (
          <Badge variant="notice" className="mr-2">공지</Badge>
        )}
        {post.title}
      </button>
    ),
    author: <span className="block text-center">{post.author}</span>,
    views: <span className="block text-center">{post.views}</span>,
    date: (
      <span className="block text-center text-gray-500">
        {post.createdAt.slice(0, 10)}
      </span>
    ),
  }));

  const handleTabChange = (key: "muk" | "free" | "qa") => {
    setActiveTab(key);
    setPage(1);
  };

  return (
    <section>
      <nav className="mb-4 flex items-center justify-between">
        <ul className="flex border-b border-gray-200">
          {TABS.map((tab) => (
            <li key={tab.key}>
              <button
                type="button"
                className={`px-4 py-2.5 text-sm font-medium transition-colors ${
                  activeTab === tab.key
                    ? "border-b-2 border-[var(--color-primary)] text-[var(--color-primary)]"
                    : "text-gray-500 hover:text-gray-700"
                }`}
                onClick={() => handleTabChange(tab.key)}
              >
                {tab.label}
              </button>
            </li>
          ))}
        </ul>
        {user && (
          <Button size="sm" onClick={() => setShowForm(true)}>
            글쓰기
          </Button>
        )}
      </nav>

      {loading ? (
        <p className="py-12 text-center text-gray-400">불러오는 중...</p>
      ) : (
        <Table columns={TABLE_COLUMNS} rows={rows} />
      )}

      <Pagination
        currentPage={page}
        totalPages={totalPages}
        onPageChange={setPage}
        className="mt-6"
      />

      {selectedPost && (
        <PostView
          post={selectedPost}
          onClose={() => setSelectedPost(null)}
        />
      )}

      {showForm && (
        <PostForm
          boardType={activeTab}
          onClose={() => setShowForm(false)}
          onSubmit={() => setShowForm(false)}
        />
      )}
    </section>
  );
}
