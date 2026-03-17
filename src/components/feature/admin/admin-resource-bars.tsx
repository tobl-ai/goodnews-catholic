import { Card } from "@/components/ui/card";

const RESOURCES = [
  { label: "CPU", value: 67, color: "bg-blue-500" },
  { label: "Memory", value: 82, color: "bg-amber-500" },
  { label: "Disk", value: 91, color: "bg-red-500" },
];

export function AdminResourceBars() {
  return (
    <Card title="리소스 사용량">
      <ul className="space-y-4">
        {RESOURCES.map((res) => (
          <li key={res.label}>
            <header className="mb-1 flex items-center justify-between text-sm">
              <span className="font-medium text-gray-700">{res.label}</span>
              <span className="text-gray-500">{res.value}%</span>
            </header>
            <section className="h-3 w-full overflow-hidden rounded-full bg-gray-200">
              <section
                className={`h-full rounded-full transition-all ${res.color}`}
                style={{ width: `${res.value}%` }}
              />
            </section>
          </li>
        ))}
      </ul>
    </Card>
  );
}
