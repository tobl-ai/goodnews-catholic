import Image from "next/image";

export default function LogosPage() {
  return (
    <section className="mx-auto max-w-6xl px-6 py-12">
      <header className="mb-12 text-center">
        <h1 className="font-[var(--font-display)] text-4xl font-bold text-[var(--color-ink)]">
          굿뉴스 로고 디자인
        </h1>
        <p className="mt-3 text-[var(--color-stone)]">
          AI3 비둘기 크로스 Variation 10개 + AI 생성 5개 + SVG 풀 로고 20개
        </p>
      </header>

      {/* AI3 Variations */}
      <h2 className="mb-6 text-lg font-bold text-[var(--color-ink)]">AI3 비둘기 크로스 Variation (텍스트 포함)</h2>
      <article className="mb-12 grid grid-cols-2 gap-6 md:grid-cols-5">
        {VARIATIONS.map((v) => (
          <section key={v.id} className="relative flex flex-col items-center rounded-2xl border border-[var(--color-ink)]/[0.06] bg-white p-4 transition-all hover:shadow-lg hover:border-[var(--color-brick)]/30">
            <span className="absolute left-3 top-3 flex h-6 w-6 items-center justify-center rounded-full bg-[var(--color-liturgical-purple)]/10 text-[10px] font-bold text-[var(--color-liturgical-purple)]">
              V{v.id}
            </span>
            <figure className="relative h-32 w-32 overflow-hidden rounded-xl">
              <Image src={v.src} alt={v.name} fill className="object-contain" />
            </figure>
            <p className="mt-3 text-xs font-bold text-[var(--color-ink)]">{v.name}</p>
            <p className="mt-0.5 text-[10px] text-[var(--color-stone)]">{v.concept}</p>
          </section>
        ))}
      </article>

      {/* AI Generated Logos */}
      <h2 className="mb-6 text-lg font-bold text-[var(--color-ink)]">AI 생성 로고</h2>
      <article className="mb-12 grid grid-cols-2 gap-6 md:grid-cols-5">
        {AI_LOGOS.map((logo) => (
          <section key={logo.id} className="relative flex flex-col items-center rounded-2xl border border-[var(--color-ink)]/[0.06] bg-white p-4 transition-all hover:shadow-lg">
            <span className="absolute left-3 top-3 flex h-6 w-6 items-center justify-center rounded-full bg-[var(--color-brick)]/10 text-[10px] font-bold text-[var(--color-brick)]">
              AI{logo.id}
            </span>
            <figure className="relative h-28 w-28 overflow-hidden rounded-xl">
              <Image src={logo.src} alt={logo.name} fill className="object-contain" />
            </figure>
            <p className="mt-3 text-xs font-bold text-[var(--color-ink)]">{logo.name}</p>
          </section>
        ))}
      </article>

      {/* SVG Full Logos (icon + text) */}
      <h2 className="mb-6 text-lg font-bold text-[var(--color-ink)]">SVG 풀 로고 (아이콘 + 텍스트)</h2>
      <article className="grid grid-cols-2 gap-6 md:grid-cols-4 lg:grid-cols-5">
        {LOGOS.map((logo) => (
          <section
            key={logo.id}
            className="group relative flex flex-col items-center rounded-2xl border border-[var(--color-ink)]/[0.06] bg-white p-5 transition-all hover:border-[var(--color-brick)]/30 hover:shadow-lg"
          >
            <span className="absolute left-3 top-3 flex h-6 w-6 items-center justify-center rounded-full bg-[var(--color-ink)]/[0.06] text-[10px] font-bold text-[var(--color-stone)]">
              {logo.id}
            </span>
            <figure className="flex h-20 w-full items-center justify-center">
              {logo.svg}
            </figure>
            <figcaption className="mt-3 text-center">
              <p className="text-xs font-bold text-[var(--color-ink)]">{logo.name}</p>
              <p className="mt-0.5 text-[10px] text-[var(--color-stone)]">{logo.concept}</p>
            </figcaption>
          </section>
        ))}
      </article>
    </section>
  );
}

const VARIATIONS = [
  { id: 1, name: "텍스트 통합", concept: "아이콘 + 굿뉴스", src: "/images/logos/logo-var-1.png" },
  { id: 2, name: "미니멀 가로", concept: "기하학적 단순화", src: "/images/logos/logo-var-2.png" },
  { id: 3, name: "수평 레이아웃", concept: "아이콘 왼쪽 배치", src: "/images/logos/logo-var-3.png" },
  { id: 4, name: "원형 엠블럼", concept: "뱃지 스타일", src: "/images/logos/logo-var-4.png" },
  { id: 5, name: "수직 스택", concept: "아이콘 위 텍스트 아래", src: "/images/logos/logo-var-5.png" },
  { id: 6, name: "라인 아트", concept: "단일선 미니멀", src: "/images/logos/logo-var-6.png" },
  { id: 7, name: "앱 아이콘", concept: "라운드 스퀘어", src: "/images/logos/logo-var-7.png" },
  { id: 8, name: "모노크롬", concept: "다크 브랜딩", src: "/images/logos/logo-var-8.png" },
  { id: 9, name: "스테인드글라스", concept: "고딕 아치 프레임", src: "/images/logos/logo-var-9.png" },
  { id: 10, name: "에디토리얼", concept: "매거진 마스트헤드", src: "/images/logos/logo-var-10.png" },
];

const AI_LOGOS = [
  { id: 1, name: "크로스 G", src: "/images/logos/logo-ai-1.png" },
  { id: 2, name: "고딕 아치", src: "/images/logos/logo-ai-2.png" },
  { id: 3, name: "비둘기 크로스", src: "/images/logos/logo-ai-3.png" },
  { id: 4, name: "성경 크로스", src: "/images/logos/logo-ai-4.png" },
  { id: 5, name: "장미창", src: "/images/logos/logo-ai-5.png" },
];

const B = "#a0522d";
const G = "#8a7b6f";

const LOGOS = [
  { id: 1, name: "미니멀 십자가", concept: "극단적 단순", svg: (
    <svg viewBox="0 0 200 60" width="180" height="54">
      <path d="M20 10V50M12 24H28" stroke={B} strokeWidth="4" strokeLinecap="round"/>
      <text x="40" y="26" fontFamily="serif" fontSize="11" fill={G} fontWeight="600" letterSpacing="3">CATHOLIC</text>
      <text x="40" y="44" fontFamily="sans-serif" fontSize="18" fill={B} fontWeight="700">굿뉴스</text>
    </svg>
  )},
  { id: 2, name: "아치 십자가", concept: "성당 아치 + 십자가", svg: (
    <svg viewBox="0 0 200 60" width="180" height="54">
      <path d="M15 50V28C15 18 22 10 30 10C38 10 45 18 45 28V50" stroke={B} strokeWidth="1.5" fill="none"/>
      <path d="M30 16V44M24 28H36" stroke={B} strokeWidth="2.5" strokeLinecap="round"/>
      <text x="55" y="26" fontFamily="serif" fontSize="11" fill={G} fontWeight="600" letterSpacing="3">CATHOLIC</text>
      <text x="55" y="44" fontFamily="sans-serif" fontSize="18" fill={B} fontWeight="700">굿뉴스</text>
    </svg>
  )},
  { id: 3, name: "스테인드글라스", concept: "빛의 조각", svg: (
    <svg viewBox="0 0 200 60" width="180" height="54">
      <circle cx="25" cy="25" r="14" stroke={B} strokeWidth="1.2" fill="none"/>
      <path d="M25 11V39M18 25H32" stroke={B} strokeWidth="2" strokeLinecap="round"/>
      <path d="M17 17L33 33M33 17L17 33" stroke={B} strokeWidth="0.6"/>
      <text x="48" y="26" fontFamily="serif" fontSize="11" fill={G} fontWeight="600" letterSpacing="3">CATHOLIC</text>
      <text x="48" y="44" fontFamily="sans-serif" fontSize="18" fill={B} fontWeight="700">굿뉴스</text>
    </svg>
  )},
  { id: 4, name: "고딕 첨탑", concept: "명동성당 첨탑", svg: (
    <svg viewBox="0 0 200 60" width="180" height="54">
      <path d="M25 4L22 14H28L25 4Z" fill={B}/>
      <rect x="23" y="14" width="4" height="34" fill={B} rx="0.5"/>
      <path d="M18 48H32V52H18V48Z" fill={B}/>
      <text x="42" y="26" fontFamily="serif" fontSize="11" fill={G} fontWeight="600" letterSpacing="3">CATHOLIC</text>
      <text x="42" y="44" fontFamily="sans-serif" fontSize="18" fill={B} fontWeight="700">굿뉴스</text>
    </svg>
  )},
  { id: 5, name: "원 안의 십자", concept: "영원의 상징", svg: (
    <svg viewBox="0 0 200 60" width="180" height="54">
      <circle cx="25" cy="30" r="20" stroke={B} strokeWidth="1.5" fill="none"/>
      <path d="M25 14V46M13 30H37" stroke={B} strokeWidth="2" strokeLinecap="round"/>
      <text x="52" y="26" fontFamily="serif" fontSize="11" fill={G} fontWeight="600" letterSpacing="3">CATHOLIC</text>
      <text x="52" y="44" fontFamily="sans-serif" fontSize="18" fill={B} fontWeight="700">굿뉴스</text>
    </svg>
  )},
  { id: 6, name: "로즈 윈도우", concept: "장미창 패턴", svg: (
    <svg viewBox="0 0 200 60" width="180" height="54">
      <circle cx="25" cy="30" r="18" stroke={B} strokeWidth="1" fill="none"/>
      <circle cx="25" cy="30" r="12" stroke={B} strokeWidth="0.8" fill="none"/>
      <circle cx="25" cy="30" r="5" stroke={B} strokeWidth="0.8" fill="none"/>
      <path d="M25 12V48M7 30H43M14 19L36 41M36 19L14 41" stroke={B} strokeWidth="0.5"/>
      <text x="50" y="26" fontFamily="serif" fontSize="11" fill={G} fontWeight="600" letterSpacing="3">CATHOLIC</text>
      <text x="50" y="44" fontFamily="sans-serif" fontSize="18" fill={B} fontWeight="700">굿뉴스</text>
    </svg>
  )},
  { id: 7, name: "켈틱 크로스", concept: "전통 켈틱", svg: (
    <svg viewBox="0 0 200 60" width="180" height="54">
      <path d="M25 6V54M14 22H36" stroke={B} strokeWidth="3.5" strokeLinecap="round"/>
      <circle cx="25" cy="22" r="10" stroke={B} strokeWidth="1.5" fill="none"/>
      <text x="46" y="26" fontFamily="serif" fontSize="11" fill={G} fontWeight="600" letterSpacing="3">CATHOLIC</text>
      <text x="46" y="44" fontFamily="sans-serif" fontSize="18" fill={B} fontWeight="700">굿뉴스</text>
    </svg>
  )},
  { id: 8, name: "책과 십자가", concept: "성경 + 십자가", svg: (
    <svg viewBox="0 0 200 60" width="180" height="54">
      <path d="M10 12C10 12 25 8 25 8C25 8 40 12 40 12V48C40 48 25 44 25 44C25 44 10 48 10 48V12Z" stroke={B} strokeWidth="1.5" fill="none"/>
      <path d="M25 8V44" stroke={B} strokeWidth="1"/>
      <path d="M25 18V34M20 24H30" stroke={B} strokeWidth="2" strokeLinecap="round"/>
      <text x="48" y="26" fontFamily="serif" fontSize="11" fill={G} fontWeight="600" letterSpacing="3">CATHOLIC</text>
      <text x="48" y="44" fontFamily="sans-serif" fontSize="18" fill={B} fontWeight="700">굿뉴스</text>
    </svg>
  )},
  { id: 9, name: "비둘기", concept: "성령의 상징", svg: (
    <svg viewBox="0 0 200 60" width="180" height="54">
      <path d="M12 30C16 22 22 18 26 20C30 18 36 22 40 30C36 28 32 26 26 28C20 26 16 28 12 30Z" fill={B}/>
      <path d="M26 28V46" stroke={B} strokeWidth="1.2"/>
      <path d="M22 38H30" stroke={B} strokeWidth="1.2"/>
      <text x="48" y="26" fontFamily="serif" fontSize="11" fill={G} fontWeight="600" letterSpacing="3">CATHOLIC</text>
      <text x="48" y="44" fontFamily="sans-serif" fontSize="18" fill={B} fontWeight="700">굿뉴스</text>
    </svg>
  )},
  { id: 10, name: "알파오메가", concept: "AO + 십자가", svg: (
    <svg viewBox="0 0 200 60" width="180" height="54">
      <text x="4" y="40" fontFamily="serif" fontSize="22" fill={B} fontWeight="bold">A</text>
      <path d="M25 10V50M20 26H30" stroke={B} strokeWidth="1.5" strokeLinecap="round"/>
      <text x="32" y="40" fontFamily="serif" fontSize="22" fill={B} fontWeight="bold">Ω</text>
      <text x="60" y="26" fontFamily="serif" fontSize="11" fill={G} fontWeight="600" letterSpacing="3">CATHOLIC</text>
      <text x="60" y="44" fontFamily="sans-serif" fontSize="18" fill={B} fontWeight="700">굿뉴스</text>
    </svg>
  )},
  { id: 11, name: "성체", concept: "성체성사", svg: (
    <svg viewBox="0 0 200 60" width="180" height="54">
      <circle cx="25" cy="24" r="14" stroke={B} strokeWidth="1.5" fill="none"/>
      <path d="M25 14V34M18 24H32" stroke={B} strokeWidth="2" strokeLinecap="round"/>
      <path d="M15 44C18 40 22 38 25 38C28 38 32 40 35 44" stroke={B} strokeWidth="1.2" fill="none"/>
      <text x="48" y="26" fontFamily="serif" fontSize="11" fill={G} fontWeight="600" letterSpacing="3">CATHOLIC</text>
      <text x="48" y="44" fontFamily="sans-serif" fontSize="18" fill={B} fontWeight="700">굿뉴스</text>
    </svg>
  )},
  { id: 12, name: "종탑", concept: "성당 종소리", svg: (
    <svg viewBox="0 0 200 60" width="180" height="54">
      <path d="M24 6H26V10H24V6Z" fill={B}/>
      <path d="M16 38C16 22 20 10 25 10C30 10 34 22 34 38" stroke={B} strokeWidth="1.5" fill="none"/>
      <path d="M14 38H36V41H14Z" fill={B}/>
      <circle cx="25" cy="34" r="2.5" fill={B}/>
      <path d="M20 44H30V47H20Z" fill={B}/>
      <text x="44" y="26" fontFamily="serif" fontSize="11" fill={G} fontWeight="600" letterSpacing="3">CATHOLIC</text>
      <text x="44" y="44" fontFamily="sans-serif" fontSize="18" fill={B} fontWeight="700">굿뉴스</text>
    </svg>
  )},
  { id: 13, name: "물고기", concept: "이크투스", svg: (
    <svg viewBox="0 0 200 60" width="180" height="54">
      <path d="M6 30C16 20 28 20 38 30C28 40 16 40 6 30Z" stroke={B} strokeWidth="2" fill="none"/>
      <path d="M38 30L48 22M38 30L48 38" stroke={B} strokeWidth="2"/>
      <circle cx="18" cy="28" r="1.5" fill={B}/>
      <text x="56" y="26" fontFamily="serif" fontSize="11" fill={G} fontWeight="600" letterSpacing="3">CATHOLIC</text>
      <text x="56" y="44" fontFamily="sans-serif" fontSize="18" fill={B} fontWeight="700">굿뉴스</text>
    </svg>
  )},
  { id: 14, name: "타이포 GN", concept: "GN 이니셜", svg: (
    <svg viewBox="0 0 200 60" width="180" height="54">
      <text x="4" y="42" fontFamily="serif" fontSize="36" fill={B} fontWeight="bold" fontStyle="italic">GN</text>
      <path d="M42 14V44M38 26H46" stroke={B} strokeWidth="1.5" strokeLinecap="round" opacity="0.4"/>
      <text x="64" y="26" fontFamily="serif" fontSize="11" fill={G} fontWeight="600" letterSpacing="3">CATHOLIC</text>
      <text x="64" y="44" fontFamily="sans-serif" fontSize="16" fill={B} fontWeight="700">굿뉴스</text>
    </svg>
  )},
  { id: 15, name: "벽돌 십자가", concept: "벽돌 질감", svg: (
    <svg viewBox="0 0 200 60" width="180" height="54">
      <rect x="21" y="4" width="8" height="10" fill={B} rx="1"/>
      <rect x="21" y="16" width="8" height="10" fill="#c47a52" rx="1"/>
      <rect x="21" y="28" width="8" height="10" fill={B} rx="1"/>
      <rect x="21" y="40" width="8" height="10" fill="#c47a52" rx="1"/>
      <rect x="9" y="16" width="10" height="8" fill="#c47a52" rx="1"/>
      <rect x="31" y="16" width="10" height="8" fill={B} rx="1"/>
      <text x="50" y="26" fontFamily="serif" fontSize="11" fill={G} fontWeight="600" letterSpacing="3">CATHOLIC</text>
      <text x="50" y="44" fontFamily="sans-serif" fontSize="18" fill={B} fontWeight="700">굿뉴스</text>
    </svg>
  )},
  { id: 16, name: "기도하는 손", concept: "기도", svg: (
    <svg viewBox="0 0 200 60" width="180" height="54">
      <path d="M20 46C20 46 22 28 24 20C25 16 27 16 28 20C30 28 32 46 32 46" stroke={B} strokeWidth="1.5" fill="none" strokeLinecap="round"/>
      <path d="M24 20L26 10L28 20" stroke={B} strokeWidth="1.2" fill="none"/>
      <path d="M16 50C16 50 22 46 26 46C30 46 36 50 36 50" stroke={B} strokeWidth="1.5" fill="none"/>
      <text x="44" y="26" fontFamily="serif" fontSize="11" fill={G} fontWeight="600" letterSpacing="3">CATHOLIC</text>
      <text x="44" y="44" fontFamily="sans-serif" fontSize="18" fill={B} fontWeight="700">굿뉴스</text>
    </svg>
  )},
  { id: 17, name: "성광", concept: "성체 현시대", svg: (
    <svg viewBox="0 0 200 60" width="180" height="54">
      <circle cx="25" cy="22" r="8" stroke={B} strokeWidth="1.5" fill="none"/>
      <path d="M25 14V6M25 30V36M17 22H9M33 22H41M19 16L13 10M31 16L37 10M19 28L13 34M31 28L37 34" stroke={B} strokeWidth="1" strokeLinecap="round"/>
      <rect x="20" y="38" width="10" height="3" fill={B} rx="0.5"/>
      <path d="M16 44H34V47H16Z" fill={B} rx="0.5"/>
      <text x="48" y="26" fontFamily="serif" fontSize="11" fill={G} fontWeight="600" letterSpacing="3">CATHOLIC</text>
      <text x="48" y="44" fontFamily="sans-serif" fontSize="18" fill={B} fontWeight="700">굿뉴스</text>
    </svg>
  )},
  { id: 18, name: "산과 십자가", concept: "구원의 산", svg: (
    <svg viewBox="0 0 200 60" width="180" height="54">
      <path d="M4 48L18 20L25 30L36 12L48 48Z" stroke={B} strokeWidth="1.5" fill="none" strokeLinejoin="round"/>
      <path d="M36 12V2" stroke={B} strokeWidth="2" strokeLinecap="round"/>
      <path d="M32 6H40" stroke={B} strokeWidth="2" strokeLinecap="round"/>
      <text x="56" y="26" fontFamily="serif" fontSize="11" fill={G} fontWeight="600" letterSpacing="3">CATHOLIC</text>
      <text x="56" y="44" fontFamily="sans-serif" fontSize="18" fill={B} fontWeight="700">굿뉴스</text>
    </svg>
  )},
  { id: 19, name: "모노그램", concept: "원형 모노그램", svg: (
    <svg viewBox="0 0 200 60" width="180" height="54">
      <circle cx="25" cy="30" r="20" stroke={B} strokeWidth="1.2" fill="none"/>
      <text x="10" y="38" fontFamily="serif" fontSize="22" fill={B} fontWeight="bold">G</text>
      <text x="28" y="38" fontFamily="serif" fontSize="22" fill={B} fontWeight="bold">N</text>
      <text x="52" y="26" fontFamily="serif" fontSize="11" fill={G} fontWeight="600" letterSpacing="3">CATHOLIC</text>
      <text x="52" y="44" fontFamily="sans-serif" fontSize="18" fill={B} fontWeight="700">굿뉴스</text>
    </svg>
  )},
  { id: 20, name: "추상 성당", concept: "기하학적 성당", svg: (
    <svg viewBox="0 0 200 60" width="180" height="54">
      <path d="M25 2L12 24V52H38V24L25 2Z" stroke={B} strokeWidth="1.5" fill="none" strokeLinejoin="round"/>
      <circle cx="25" cy="20" r="5" stroke={B} strokeWidth="1" fill="none"/>
      <path d="M21 52V38C21 34 23 32 25 32C27 32 29 34 29 38V52" stroke={B} strokeWidth="1" fill="none"/>
      <text x="46" y="26" fontFamily="serif" fontSize="11" fill={G} fontWeight="600" letterSpacing="3">CATHOLIC</text>
      <text x="46" y="44" fontFamily="sans-serif" fontSize="18" fill={B} fontWeight="700">굿뉴스</text>
    </svg>
  )},
];
