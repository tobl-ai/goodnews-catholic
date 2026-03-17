import { GalleryGrid } from "@/components/feature/gallery/gallery-grid";

export default function GalleryPage() {
  return (
    <section className="mx-auto max-w-5xl px-4 py-8">
      <nav className="mb-4 text-sm text-gray-500">홈 &gt; 갤러리</nav>
      <h1 className="mb-6 text-2xl font-bold">갤러리</h1>
      <GalleryGrid />
    </section>
  );
}
