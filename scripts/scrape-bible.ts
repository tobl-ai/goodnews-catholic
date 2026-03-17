/**
 * Catholic Bible (공동번역) Scraper
 * Source: maria.catholic.or.kr (Korean Catholic Bishops' Conference)
 *
 * Usage: npx tsx scripts/scrape-bible.ts
 *
 * Saves progress incrementally to scripts/bible-data.json
 * Can be resumed if interrupted - skips already-scraped chapters.
 */

import * as cheerio from "cheerio";
import * as fs from "fs";
import * as path from "path";

const BASE_URL = "https://maria.catholic.or.kr/bible/read/bible_read.asp";
const OUTPUT_FILE = path.join(__dirname, "bible-data.json");
const PROGRESS_FILE = path.join(__dirname, "bible-progress.json");

interface BibleVerse {
  book: string;
  chapter: number;
  verse: number;
  textKo: string;
  translation: string;
}

interface BookDef {
  code: number;
  m: number;
  nameKo: string;
  chapters: number;
}

// All 73 books of the Catholic Bible canon
const BIBLE_BOOKS: BookDef[] = [
  // ── 구약 (Old Testament) ──
  { code: 101, m: 1, nameKo: "창세기", chapters: 50 },
  { code: 102, m: 1, nameKo: "탈출기", chapters: 40 },
  { code: 103, m: 1, nameKo: "레위기", chapters: 27 },
  { code: 104, m: 1, nameKo: "민수기", chapters: 36 },
  { code: 105, m: 1, nameKo: "신명기", chapters: 34 },
  { code: 106, m: 1, nameKo: "여호수아", chapters: 24 },
  { code: 107, m: 1, nameKo: "판관기", chapters: 21 },
  { code: 108, m: 1, nameKo: "룻기", chapters: 4 },
  { code: 109, m: 1, nameKo: "사무엘기 상권", chapters: 31 },
  { code: 110, m: 1, nameKo: "사무엘기 하권", chapters: 24 },
  { code: 111, m: 1, nameKo: "열왕기 상권", chapters: 22 },
  { code: 112, m: 1, nameKo: "열왕기 하권", chapters: 25 },
  { code: 113, m: 1, nameKo: "역대기 상권", chapters: 29 },
  { code: 114, m: 1, nameKo: "역대기 하권", chapters: 36 },
  { code: 115, m: 1, nameKo: "에즈라", chapters: 10 },
  { code: 116, m: 1, nameKo: "느헤미야", chapters: 13 },
  { code: 117, m: 1, nameKo: "토빗", chapters: 14 },
  { code: 118, m: 1, nameKo: "유딧", chapters: 16 },
  { code: 119, m: 1, nameKo: "에스테르", chapters: 10 },
  { code: 120, m: 1, nameKo: "마카베오기 상권", chapters: 16 },
  { code: 121, m: 1, nameKo: "마카베오기 하권", chapters: 15 },
  { code: 122, m: 1, nameKo: "욥기", chapters: 42 },
  { code: 123, m: 1, nameKo: "시편", chapters: 150 },
  { code: 124, m: 1, nameKo: "잠언", chapters: 31 },
  { code: 125, m: 1, nameKo: "코헬렛", chapters: 12 },
  { code: 126, m: 1, nameKo: "아가", chapters: 8 },
  { code: 127, m: 1, nameKo: "지혜서", chapters: 19 },
  { code: 128, m: 1, nameKo: "집회서", chapters: 51 },
  { code: 129, m: 1, nameKo: "이사야", chapters: 66 },
  { code: 130, m: 1, nameKo: "예레미야", chapters: 52 },
  { code: 131, m: 1, nameKo: "애가", chapters: 5 },
  { code: 132, m: 1, nameKo: "바룩", chapters: 6 },
  { code: 133, m: 1, nameKo: "에제키엘", chapters: 48 },
  { code: 134, m: 1, nameKo: "다니엘", chapters: 14 },
  { code: 135, m: 1, nameKo: "호세아", chapters: 14 },
  { code: 136, m: 1, nameKo: "요엘", chapters: 4 },
  { code: 137, m: 1, nameKo: "아모스", chapters: 9 },
  { code: 138, m: 1, nameKo: "오바디야", chapters: 1 },
  { code: 139, m: 1, nameKo: "요나", chapters: 4 },
  { code: 140, m: 1, nameKo: "미가", chapters: 7 },
  { code: 141, m: 1, nameKo: "나훔", chapters: 3 },
  { code: 142, m: 1, nameKo: "하바쿡", chapters: 3 },
  { code: 143, m: 1, nameKo: "스바니야", chapters: 3 },
  { code: 144, m: 1, nameKo: "하까이", chapters: 2 },
  { code: 145, m: 1, nameKo: "즈카르야", chapters: 14 },
  { code: 146, m: 1, nameKo: "말라키", chapters: 3 },
  // ── 신약 (New Testament) ──
  { code: 147, m: 2, nameKo: "마태오 복음서", chapters: 28 },
  { code: 148, m: 2, nameKo: "마르코 복음서", chapters: 16 },
  { code: 149, m: 2, nameKo: "루카 복음서", chapters: 24 },
  { code: 150, m: 2, nameKo: "요한 복음서", chapters: 21 },
  { code: 151, m: 2, nameKo: "사도행전", chapters: 28 },
  { code: 152, m: 2, nameKo: "로마서", chapters: 16 },
  { code: 153, m: 2, nameKo: "코린토 전서", chapters: 16 },
  { code: 154, m: 2, nameKo: "코린토 후서", chapters: 13 },
  { code: 155, m: 2, nameKo: "갈라티아서", chapters: 6 },
  { code: 156, m: 2, nameKo: "에페소서", chapters: 6 },
  { code: 157, m: 2, nameKo: "필리피서", chapters: 4 },
  { code: 158, m: 2, nameKo: "콜로새서", chapters: 4 },
  { code: 159, m: 2, nameKo: "테살로니카 전서", chapters: 5 },
  { code: 160, m: 2, nameKo: "테살로니카 후서", chapters: 3 },
  { code: 161, m: 2, nameKo: "티모테오 전서", chapters: 6 },
  { code: 162, m: 2, nameKo: "티모테오 후서", chapters: 4 },
  { code: 163, m: 2, nameKo: "티토서", chapters: 3 },
  { code: 164, m: 2, nameKo: "필레몬서", chapters: 1 },
  { code: 165, m: 2, nameKo: "히브리서", chapters: 13 },
  { code: 166, m: 2, nameKo: "야고보서", chapters: 5 },
  { code: 167, m: 2, nameKo: "베드로 전서", chapters: 5 },
  { code: 168, m: 2, nameKo: "베드로 후서", chapters: 3 },
  { code: 169, m: 2, nameKo: "요한 1서", chapters: 5 },
  { code: 170, m: 2, nameKo: "요한 2서", chapters: 1 },
  { code: 171, m: 2, nameKo: "요한 3서", chapters: 1 },
  { code: 172, m: 2, nameKo: "유다서", chapters: 1 },
  { code: 173, m: 2, nameKo: "요한 묵시록", chapters: 22 },
];

function delay(ms: number): Promise<void> {
  return new Promise((resolve) => setTimeout(resolve, ms));
}

function loadProgress(): Set<string> {
  try {
    if (fs.existsSync(PROGRESS_FILE)) {
      const data = JSON.parse(fs.readFileSync(PROGRESS_FILE, "utf-8"));
      return new Set(data as string[]);
    }
  } catch {
    // ignore
  }
  return new Set();
}

function saveProgress(completed: Set<string>): void {
  fs.writeFileSync(
    PROGRESS_FILE,
    JSON.stringify(Array.from(completed), null, 2)
  );
}

function loadExistingData(): BibleVerse[] {
  try {
    if (fs.existsSync(OUTPUT_FILE)) {
      return JSON.parse(fs.readFileSync(OUTPUT_FILE, "utf-8"));
    }
  } catch {
    // ignore
  }
  return [];
}

function saveData(verses: BibleVerse[]): void {
  fs.writeFileSync(OUTPUT_FILE, JSON.stringify(verses, null, 2));
}

async function fetchPage(url: string, retries = 3): Promise<string> {
  for (let attempt = 1; attempt <= retries; attempt++) {
    try {
      const response = await fetch(url, {
        headers: {
          "User-Agent":
            "Mozilla/5.0 (Macintosh; Intel Mac OS X 10_15_7) AppleWebKit/537.36",
          Accept: "text/html,application/xhtml+xml",
          "Accept-Language": "ko-KR,ko;q=0.9",
        },
      });
      if (!response.ok) {
        throw new Error(`HTTP ${response.status}`);
      }
      return await response.text();
    } catch (err) {
      console.error(
        `  Attempt ${attempt}/${retries} failed for ${url}:`,
        (err as Error).message
      );
      if (attempt < retries) {
        await delay(2000 * attempt);
      }
    }
  }
  throw new Error(`Failed to fetch ${url} after ${retries} retries`);
}

/**
 * Parse verses from the HTML page.
 *
 * HTML structure per verse row:
 *   <tr>
 *     <td class="num_color"><span>1</span></td>
 *     <td class="al tt"><span id="mytitle_02" class="lineheight_chg">verse text</span></td>
 *     ...
 *   </tr>
 *
 * Section headers have class "stitle" on the span - skip those.
 */
function parseVerses(
  html: string,
  book: string,
  chapter: number
): BibleVerse[] {
  const $ = cheerio.load(html);
  const verses: BibleVerse[] = [];

  $("td.num_color").each((_i, el) => {
    const verseNumText = $(el).find("span").text().trim();
    if (!verseNumText || !/^\d+$/.test(verseNumText)) return;

    const verseNum = parseInt(verseNumText, 10);

    // The verse text is in the next sibling td with class "al"
    const textTd = $(el).next("td.al");
    if (!textTd.length) return;

    const span = textTd.find("span");
    // Skip section titles (headers like "천지 창조")
    if (span.hasClass("stitle")) return;

    const text = span.text().trim();
    if (text && verseNum > 0) {
      verses.push({
        book,
        chapter,
        verse: verseNum,
        textKo: text,
        translation: "공동번역",
      });
    }
  });

  verses.sort((a, b) => a.verse - b.verse);
  return verses;
}

async function scrapeChapter(
  book: BookDef,
  chapter: number
): Promise<BibleVerse[]> {
  const url = `${BASE_URL}?m=${book.m}&n=${book.code}&p=${chapter}`;
  const html = await fetchPage(url);
  return parseVerses(html, book.nameKo, chapter);
}

async function main(): Promise<void> {
  console.log("=== Catholic Bible (공동번역) Scraper ===");
  console.log(`Output: ${OUTPUT_FILE}`);
  console.log(`Total books: ${BIBLE_BOOKS.length}`);

  const totalChapters = BIBLE_BOOKS.reduce((s, b) => s + b.chapters, 0);
  console.log(`Total chapters: ${totalChapters}`);

  const completed = loadProgress();
  const allVerses = loadExistingData();

  console.log(`Existing verses: ${allVerses.length}`);
  console.log(`Completed chapters: ${completed.size}/${totalChapters}`);
  console.log("");

  let totalNew = 0;

  for (const book of BIBLE_BOOKS) {
    const bookStart = Date.now();
    let bookVerses = 0;
    let skippedChapters = 0;

    for (let ch = 1; ch <= book.chapters; ch++) {
      const key = `${book.code}-${ch}`;
      if (completed.has(key)) {
        skippedChapters++;
        continue;
      }

      try {
        const verses = await scrapeChapter(book, ch);

        if (verses.length === 0) {
          console.warn(
            `  WARNING: No verses found for ${book.nameKo} ${ch}장`
          );
        } else {
          allVerses.push(...verses);
          bookVerses += verses.length;
          totalNew += verses.length;
        }

        completed.add(key);

        // Polite delay between requests (1-2s)
        await delay(1000 + Math.random() * 1000);
      } catch (err) {
        console.error(
          `  ERROR scraping ${book.nameKo} ${ch}장:`,
          (err as Error).message
        );
        // Save progress on error and continue
        saveProgress(completed);
        saveData(allVerses);
      }
    }

    // Save progress after each book
    saveProgress(completed);
    saveData(allVerses);

    const elapsed = ((Date.now() - bookStart) / 1000).toFixed(1);
    if (skippedChapters === book.chapters) {
      console.log(`[SKIP] ${book.nameKo} (already scraped)`);
    } else {
      console.log(
        `[DONE] ${book.nameKo}: ${bookVerses} verses in ${elapsed}s` +
          (skippedChapters > 0
            ? ` (${skippedChapters} chapters skipped)`
            : "")
      );
    }
  }

  console.log("");
  console.log("=== Scraping Complete ===");
  console.log(`Total verses: ${allVerses.length}`);
  console.log(`New verses this run: ${totalNew}`);
  console.log(`Output saved to: ${OUTPUT_FILE}`);

  // Clean up progress file on full completion
  if (completed.size === totalChapters) {
    fs.unlinkSync(PROGRESS_FILE);
    console.log("Progress file cleaned up (all books complete).");
  }
}

main().catch((err) => {
  console.error("Fatal error:", err);
  process.exit(1);
});
