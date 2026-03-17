"use client";

import { useEffect } from "react";
import { useRouter } from "next/navigation";
import { useAuth } from "@/hooks/use-auth";
import { Card } from "@/components/ui/card";
import { Button } from "@/components/ui/button";

export default function LoginPage() {
  const { user, loading, signInWithGoogle, signOut } = useAuth();
  const router = useRouter();

  useEffect(() => {
    if (!loading && user) {
      const timer = window.setTimeout(() => router.push("/"), 1500);
      return () => window.clearTimeout(timer);
    }
  }, [user, loading, router]);

  if (loading) {
    return (
      <section className="flex min-h-[60vh] items-center justify-center">
        <p className="text-gray-400">로딩 중...</p>
      </section>
    );
  }

  return (
    <section className="flex min-h-[60vh] items-center justify-center px-4">
      <Card className="w-full max-w-sm text-center">
        {user ? (
          <LoggedInView
            displayName={user.displayName}
            email={user.email}
            onSignOut={signOut}
          />
        ) : (
          <LoggedOutView onSignIn={signInWithGoogle} />
        )}
      </Card>
    </section>
  );
}

function LoggedInView({
  displayName,
  email,
  onSignOut,
}: {
  displayName: string | null;
  email: string | null;
  onSignOut: () => Promise<void>;
}) {
  return (
    <section className="space-y-4">
      <figure className="mx-auto flex h-16 w-16 items-center justify-center rounded-full bg-green-100">
        <svg
          className="h-8 w-8 text-green-600"
          fill="none"
          viewBox="0 0 24 24"
          stroke="currentColor"
          strokeWidth={2}
        >
          <path
            strokeLinecap="round"
            strokeLinejoin="round"
            d="M5 13l4 4L19 7"
          />
        </svg>
      </figure>
      <h2 className="text-lg font-bold text-gray-900">로그인 완료</h2>
      <p className="text-sm text-gray-600">
        {displayName ?? "사용자"}님 환영합니다
      </p>
      <p className="text-xs text-gray-400">{email}</p>
      <p className="text-xs text-gray-400">잠시 후 홈으로 이동합니다...</p>
      <Button variant="outline" size="sm" onClick={onSignOut}>
        로그아웃
      </Button>
    </section>
  );
}

function LoggedOutView({ onSignIn }: { onSignIn: () => Promise<void> }) {
  return (
    <section className="space-y-6">
      <header>
        <h2 className="text-lg font-bold text-gray-900">로그인</h2>
        <p className="mt-1 text-sm text-gray-500">
          굿뉴스 서비스를 이용하려면 로그인하세요
        </p>
      </header>
      <button
        type="button"
        onClick={onSignIn}
        className="inline-flex w-full items-center justify-center gap-3 rounded-md border border-gray-300 bg-white px-4 py-2.5 text-sm font-medium text-gray-700 shadow-sm transition-colors hover:bg-gray-50"
      >
        <svg className="h-5 w-5" viewBox="0 0 24 24">
          <path
            d="M22.56 12.25c0-.78-.07-1.53-.2-2.25H12v4.26h5.92a5.06 5.06 0 01-2.2 3.32v2.77h3.57c2.08-1.92 3.28-4.74 3.28-8.1z"
            fill="#4285F4"
          />
          <path
            d="M12 23c2.97 0 5.46-.98 7.28-2.66l-3.57-2.77c-.98.66-2.23 1.06-3.71 1.06-2.86 0-5.29-1.93-6.16-4.53H2.18v2.84C3.99 20.53 7.7 23 12 23z"
            fill="#34A853"
          />
          <path
            d="M5.84 14.09c-.22-.66-.35-1.36-.35-2.09s.13-1.43.35-2.09V7.07H2.18C1.43 8.55 1 10.22 1 12s.43 3.45 1.18 4.93l2.85-2.22.81-.62z"
            fill="#FBBC05"
          />
          <path
            d="M12 5.38c1.62 0 3.06.56 4.21 1.64l3.15-3.15C17.45 2.09 14.97 1 12 1 7.7 1 3.99 3.47 2.18 7.07l3.66 2.84c.87-2.6 3.3-4.53 6.16-4.53z"
            fill="#EA4335"
          />
        </svg>
        Google로 로그인
      </button>
    </section>
  );
}
