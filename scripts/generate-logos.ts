import fs from "fs";
import path from "path";

const API_KEY = "AIzaSyBGKyzEZCAdbBqKBwi41SgWLmmrQ2w96x8";
const OUTPUT_DIR = path.join(__dirname, "../public/images/logos");

const LOGO_PROMPTS = [
  {
    filename: "logo-ai-1.png",
    prompt: "Design a minimal, elegant logo for 'GoodNews' (굿뉴스) Catholic portal. A refined golden cross integrated with the letter G, on pure white background. Terracotta and warm gold colors. Clean vector style, no text, just the icon mark. Professional branding quality.",
  },
  {
    filename: "logo-ai-2.png",
    prompt: "Design a logo icon for a Catholic website called GoodNews. Gothic cathedral arch shape with a subtle cross inside, brick terracotta color palette. Minimal, modern, geometric style. White background, no text. Professional brand identity quality.",
  },
  {
    filename: "logo-ai-3.png",
    prompt: "Design a modern Catholic logo: a dove carrying an olive branch forming a cross shape. Warm terracotta brick and golden amber colors. Clean flat design on white background. No text. Suitable for a Korean Catholic news portal.",
  },
  {
    filename: "logo-ai-4.png",
    prompt: "Design a minimalist Catholic logo: an open book with pages forming a cross shape above it. Warm brick red and gold color scheme. Clean modern design on white background. No text. Professional brand quality for a Catholic information portal.",
  },
  {
    filename: "logo-ai-5.png",
    prompt: "Design a elegant stained glass window inspired logo mark. Rose window pattern simplified into a modern geometric icon. Terracotta, amber gold, and deep burgundy colors. White background, no text. For a Catholic portal called GoodNews.",
  },
];

async function generateImage(prompt: string, filename: string) {
  const url = `https://generativelanguage.googleapis.com/v1beta/models/gemini-3.1-flash-image-preview:generateContent?key=${API_KEY}`;

  console.log(`Generating: ${filename}...`);

  const response = await fetch(url, {
    method: "POST",
    headers: { "Content-Type": "application/json" },
    body: JSON.stringify({
      contents: [{ parts: [{ text: `Generate a high quality image: ${prompt}` }] }],
      generationConfig: { responseModalities: ["TEXT", "IMAGE"] },
    }),
  });

  if (!response.ok) {
    console.error(`Error for ${filename}: ${response.status}`);
    return false;
  }

  const data = await response.json();
  const candidates = data.candidates;
  if (!candidates?.[0]?.content?.parts) return false;

  for (const part of candidates[0].content.parts) {
    if (part.inlineData) {
      const buffer = Buffer.from(part.inlineData.data, "base64");
      fs.writeFileSync(path.join(OUTPUT_DIR, filename), buffer);
      console.log(`  Saved: ${filename} (${(buffer.length / 1024).toFixed(0)} KB)`);
      return true;
    }
  }
  return false;
}

async function main() {
  console.log("Generating AI logo images...\n");
  if (!fs.existsSync(OUTPUT_DIR)) fs.mkdirSync(OUTPUT_DIR, { recursive: true });

  for (const logo of LOGO_PROMPTS) {
    await generateImage(logo.prompt, logo.filename);
    await new Promise((r) => setTimeout(r, 2000));
  }
  console.log("\nDone!");
}

main().catch(console.error);
