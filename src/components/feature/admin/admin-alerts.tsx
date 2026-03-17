import { Card } from "@/components/ui/card";
import { Table } from "@/components/ui/table";
import { Badge } from "@/components/ui/badge";

const SECURITY_ALERTS = [
  {
    level: "critical" as const,
    message: "SQL Injection 시도 감지: 3건",
    date: "2026.03.09",
  },
  {
    level: "warning" as const,
    message: "비인가 접속 시도: 12건",
    date: "2026.03.08~09",
  },
  {
    level: "warning" as const,
    message: "SSL 인증서 만료 예정: pds.catholic.or.kr",
    date: "2026.03.15",
  },
];

const PATCH_COLUMNS = [
  { key: "software", header: "소프트웨어" },
  { key: "version", header: "버전" },
  { key: "status", header: "상태", className: "text-center" },
  { key: "eol", header: "지원 종료일", className: "text-center" },
];

const PATCH_ROWS = [
  {
    software: "Windows Server 2003",
    version: "SP2",
    status: <Badge variant="notice">지원 종료</Badge>,
    eol: "2015-07-14",
  },
  {
    software: "Windows Server 2008",
    version: "SP2",
    status: <Badge variant="notice">지원 종료</Badge>,
    eol: "2020-01-14",
  },
  {
    software: "MS-SQL Server 2008 R2",
    version: "SP3",
    status: <Badge variant="notice">지원 종료</Badge>,
    eol: "2019-07-09",
  },
  {
    software: "IIS 6.0",
    version: "-",
    status: <Badge variant="notice">지원 종료</Badge>,
    eol: "2015-07-14",
  },
];

function AlertIcon({ level }: { level: "critical" | "warning" }) {
  const color = level === "critical"
    ? "text-[var(--color-liturgical-red)]"
    : "text-[var(--color-amber)]";
  return (
    <svg
      className={`mt-0.5 h-5 w-5 shrink-0 ${color}`}
      fill="none"
      viewBox="0 0 24 24"
      stroke="currentColor"
      strokeWidth={2}
    >
      <path
        strokeLinecap="round"
        strokeLinejoin="round"
        d="M12 9v2m0 4h.01M21 12a9 9 0 11-18 0 9 9 0 0118 0z"
      />
    </svg>
  );
}

function AlertBadge({ level }: { level: "critical" | "warning" }) {
  if (level === "critical") {
    return <Badge variant="red">긴급</Badge>;
  }
  return <Badge variant="notice">경고</Badge>;
}

export function AdminAlerts() {
  return (
    <section className="space-y-6">
      <Card title="보안 알림">
        <ul className="space-y-3">
          {SECURITY_ALERTS.map((alert, idx) => (
            <li
              key={idx}
              className="flex items-start gap-3 rounded-lg border p-3"
              style={{
                borderColor: alert.level === "critical"
                  ? "var(--color-liturgical-red)"
                  : "var(--color-mortar)",
                backgroundColor: alert.level === "critical"
                  ? "rgba(178, 34, 34, 0.05)"
                  : "rgba(184, 110, 63, 0.05)",
              }}
            >
              <AlertIcon level={alert.level} />
              <section className="flex-1">
                <p className="text-sm font-medium" style={{ color: "var(--color-ink)" }}>
                  {alert.message}
                </p>
                <p className="mt-0.5 text-xs" style={{ color: "var(--color-stone)" }}>
                  {alert.date}
                </p>
              </section>
              <AlertBadge level={alert.level} />
            </li>
          ))}
        </ul>
      </Card>

      <Card title="소프트웨어 패치 현황">
        <Table columns={PATCH_COLUMNS} rows={PATCH_ROWS} />
      </Card>
    </section>
  );
}
