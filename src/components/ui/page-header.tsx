import Link from "next/link";

interface PageHeaderProps {
  title: string;
  breadcrumb: string;
}

export function PageHeader({ title, breadcrumb }: PageHeaderProps) {
  return (
    <header className="border-b border-gray-200 bg-white">
      <section className="mx-auto max-w-7xl px-4 py-6">
        <nav className="mb-2 text-sm text-gray-500" aria-label="breadcrumb">
          <Link href="/" className="hover:text-[var(--color-primary)]">
            홈
          </Link>
          <span className="mx-2">&gt;</span>
          <span className="text-gray-900">{breadcrumb}</span>
        </nav>
        <h1 className="text-2xl font-bold text-gray-900">{title}</h1>
      </section>
    </header>
  );
}
