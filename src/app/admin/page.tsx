import Link from "next/link";
import { AdminStats } from "@/components/feature/admin/admin-stats";
import { AdminServers } from "@/components/feature/admin/admin-servers";
import { AdminResources } from "@/components/feature/admin/admin-resources";
import { AdminAlerts } from "@/components/feature/admin/admin-alerts";
import { AdminActivity } from "@/components/feature/admin/admin-activity";
import { AdminQuickActions } from "@/components/feature/admin/admin-quick-actions";
import { AdminDbStats } from "@/components/feature/admin/admin-db-stats";

export default function AdminPage() {
  return (
    <section className="mx-auto max-w-6xl space-y-8 px-4 py-8">
      <header>
        <nav className="mb-3 text-sm" style={{ color: "var(--color-stone)" }} aria-label="breadcrumb">
          <Link href="/" className="hover:text-[var(--color-brick)]">홈</Link>
          <span className="mx-2">&gt;</span>
          <span style={{ color: "var(--color-ink)" }}>관리자</span>
        </nav>
        <section className="flex items-center justify-between">
          <h1
            className="font-[family-name:var(--font-display)] text-3xl font-bold"
            style={{ color: "var(--color-ink)" }}
          >
            관리자 대시보드
          </h1>
          <time
            className="text-sm"
            style={{ color: "var(--color-stone)" }}
            dateTime="2026-03-17"
          >
            2026년 3월 17일
          </time>
        </section>
        <p className="mt-1 text-sm" style={{ color: "var(--color-stone)" }}>
          굿뉴스 시스템 운영 현황을 한눈에 확인하세요.
        </p>
      </header>

      <AdminStats />

      <section className="grid gap-6 lg:grid-cols-2">
        <AdminResources />
        <AdminActivity />
      </section>

      <AdminServers />

      <AdminAlerts />

      <section className="grid gap-6 lg:grid-cols-2">
        <AdminDbStats />
        <AdminQuickActions />
      </section>
    </section>
  );
}
