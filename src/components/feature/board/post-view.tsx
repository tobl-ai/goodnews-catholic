"use client";

import { useAuth } from "@/hooks/use-auth";
import { Button } from "@/components/ui/button";
import { doc, deleteDoc } from "firebase/firestore";
import { db } from "@/lib/firebase";
import type { BoardPost } from "@/types";

interface PostViewProps {
  post: BoardPost;
  onClose: () => void;
}

export function PostView({ post, onClose }: PostViewProps) {
  const { user } = useAuth();
  const isAuthor = user?.displayName === post.author;

  const handleDelete = async () => {
    const confirmed = window.confirm("정말 삭제하시겠습니까?");
    if (!confirmed) return;
    await deleteDoc(doc(db, "boardPosts", post.id));
    onClose();
  };

  return (
    <section
      className="fixed inset-0 z-50 flex items-center justify-center bg-black/50 p-4"
      onClick={onClose}
    >
      <article
        className="relative w-full max-w-2xl rounded-lg bg-white shadow-xl"
        onClick={(e) => e.stopPropagation()}
      >
        <header className="flex items-center justify-between border-b border-gray-200 px-6 py-4">
          <h2 className="text-lg font-bold text-gray-900">{post.title}</h2>
          <button
            type="button"
            className="text-2xl leading-none text-gray-400 hover:text-gray-600"
            onClick={onClose}
            aria-label="닫기"
          >
            &times;
          </button>
        </header>

        <section className="border-b border-gray-100 px-6 py-3">
          <ul className="flex gap-6 text-sm text-gray-500">
            <li>작성자: {post.author}</li>
            <li>작성일: {post.createdAt.slice(0, 10)}</li>
            <li>조회수: {post.views}</li>
          </ul>
        </section>

        <section className="min-h-[200px] px-6 py-5">
          <p className="whitespace-pre-wrap text-gray-800">{post.content}</p>
        </section>

        <footer className="flex justify-end gap-2 border-t border-gray-100 px-6 py-4">
          {isAuthor && (
            <Button variant="outline" size="sm" onClick={handleDelete}>
              삭제
            </Button>
          )}
          <Button variant="secondary" size="sm" onClick={onClose}>
            닫기
          </Button>
        </footer>
      </article>
    </section>
  );
}
