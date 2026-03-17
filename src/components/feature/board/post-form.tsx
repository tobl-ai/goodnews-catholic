"use client";

import { useState } from "react";
import { useAuth } from "@/hooks/use-auth";
import { Button } from "@/components/ui/button";
import { collection, addDoc, serverTimestamp } from "firebase/firestore";
import { db } from "@/lib/firebase";

interface PostFormProps {
  boardType: "muk" | "free" | "qa";
  onClose: () => void;
  onSubmit: () => void;
}

const BOARD_LABELS: Record<string, string> = {
  muk: "묵상나눔",
  free: "자유게시판",
  qa: "질문답변",
};

export function PostForm({ boardType, onClose, onSubmit }: PostFormProps) {
  const { user } = useAuth();
  const [title, setTitle] = useState("");
  const [content, setContent] = useState("");
  const [author, setAuthor] = useState(user?.displayName ?? "");
  const [submitting, setSubmitting] = useState(false);

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!title.trim() || !content.trim() || !author.trim()) return;

    setSubmitting(true);
    const now = new Date().toISOString();
    await addDoc(collection(db, "boardPosts"), {
      boardType,
      title: title.trim(),
      content: content.trim(),
      author: author.trim(),
      isNotice: false,
      views: 0,
      createdAt: now,
      _serverTimestamp: serverTimestamp(),
    });
    setSubmitting(false);
    onSubmit();
  };

  return (
    <section
      className="fixed inset-0 z-50 flex items-center justify-center bg-black/50 p-4"
      onClick={onClose}
    >
      <article
        className="relative w-full max-w-lg rounded-lg bg-white shadow-xl"
        onClick={(e) => e.stopPropagation()}
      >
        <header className="flex items-center justify-between border-b border-gray-200 px-6 py-4">
          <h2 className="text-lg font-bold text-gray-900">
            {BOARD_LABELS[boardType]} 글쓰기
          </h2>
          <button
            type="button"
            className="text-2xl leading-none text-gray-400 hover:text-gray-600"
            onClick={onClose}
            aria-label="닫기"
          >
            &times;
          </button>
        </header>

        <form onSubmit={handleSubmit} className="px-6 py-5">
          <fieldset className="space-y-4" disabled={submitting}>
            <label className="block">
              <span className="mb-1 block text-sm font-medium text-gray-700">
                작성자
              </span>
              <input
                type="text"
                value={author}
                onChange={(e) => setAuthor(e.target.value)}
                className="w-full rounded-md border border-gray-300 px-3 py-2 text-sm focus:border-[var(--color-primary)] focus:outline-none focus:ring-1 focus:ring-[var(--color-primary)]"
                required
              />
            </label>

            <label className="block">
              <span className="mb-1 block text-sm font-medium text-gray-700">
                제목
              </span>
              <input
                type="text"
                value={title}
                onChange={(e) => setTitle(e.target.value)}
                placeholder="제목을 입력하세요"
                className="w-full rounded-md border border-gray-300 px-3 py-2 text-sm focus:border-[var(--color-primary)] focus:outline-none focus:ring-1 focus:ring-[var(--color-primary)]"
                required
              />
            </label>

            <label className="block">
              <span className="mb-1 block text-sm font-medium text-gray-700">
                내용
              </span>
              <textarea
                value={content}
                onChange={(e) => setContent(e.target.value)}
                placeholder="내용을 입력하세요"
                rows={8}
                className="w-full rounded-md border border-gray-300 px-3 py-2 text-sm focus:border-[var(--color-primary)] focus:outline-none focus:ring-1 focus:ring-[var(--color-primary)]"
                required
              />
            </label>
          </fieldset>

          <footer className="mt-6 flex justify-end gap-2">
            <Button
              type="button"
              variant="outline"
              size="sm"
              onClick={onClose}
            >
              취소
            </Button>
            <Button type="submit" size="sm" disabled={submitting}>
              {submitting ? "등록 중..." : "등록"}
            </Button>
          </footer>
        </form>
      </article>
    </section>
  );
}
