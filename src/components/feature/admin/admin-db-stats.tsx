import { Card } from "@/components/ui/card";

const DB_STATS = [
  { label: "전체 테이블 수", value: "247개" },
  { label: "전체 레코드 수", value: "1,892,341건" },
  { label: "DB 크기", value: "12.4 GB" },
  { label: "마지막 백업", value: "2026.03.17 04:00" },
  { label: "백업 용량", value: "8.7 GB" },
  { label: "일 평균 쿼리", value: "34,521건" },
];

export function AdminDbStats() {
  return (
    <Card title="데이터베이스 통계">
      <ul className="grid grid-cols-2 gap-4 sm:grid-cols-3">
        {DB_STATS.map((stat) => (
          <li
            key={stat.label}
            className="rounded-lg border border-gray-100 bg-gray-50 p-4 text-center"
          >
            <p className="text-xs text-gray-500">{stat.label}</p>
            <p className="mt-1 text-lg font-bold text-gray-900">
              {stat.value}
            </p>
          </li>
        ))}
      </ul>
    </Card>
  );
}
