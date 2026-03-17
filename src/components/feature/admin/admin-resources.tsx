import { Card } from "@/components/ui/card";

const RESOURCES = [
  {
    label: "CPU",
    value: 67,
    barColor: "bg-[var(--color-liturgical-green)]",
    textColor: "text-[var(--color-liturgical-green)]",
    bgColor: "bg-green-100",
  },
  {
    label: "Memory",
    value: 82,
    barColor: "bg-[var(--color-amber)]",
    textColor: "text-[var(--color-amber)]",
    bgColor: "bg-amber-100",
  },
  {
    label: "Disk",
    value: 91,
    barColor: "bg-[var(--color-liturgical-red)]",
    textColor: "text-[var(--color-liturgical-red)]",
    bgColor: "bg-red-100",
  },
];

function SeverityLabel({ value }: { value: number }) {
  if (value >= 90) return <span className="text-xs font-medium text-[var(--color-liturgical-red)]">위험</span>;
  if (value >= 80) return <span className="text-xs font-medium text-[var(--color-amber)]">주의</span>;
  return <span className="text-xs font-medium text-[var(--color-liturgical-green)]">정상</span>;
}

export function AdminResources() {
  return (
    <Card title="리소스 사용량">
      <ul className="space-y-5">
        {RESOURCES.map((res) => (
          <li key={res.label}>
            <header className="mb-2 flex items-center justify-between">
              <span className="text-sm font-semibold" style={{ color: "var(--color-ink)" }}>
                {res.label}
              </span>
              <section className="flex items-center gap-2">
                <SeverityLabel value={res.value} />
                <span className={`text-sm font-bold ${res.textColor}`}>
                  {res.value}%
                </span>
              </section>
            </header>
            <section
              className={`h-3 w-full overflow-hidden rounded-full ${res.bgColor}`}
            >
              <section
                className={`h-full rounded-full transition-all duration-1000 ease-out ${res.barColor}`}
                style={{ width: `${res.value}%` }}
              />
            </section>
          </li>
        ))}
      </ul>
    </Card>
  );
}
