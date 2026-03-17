import fs from "fs";
import path from "path";

const API_KEY = "AIzaSyBGKyzEZCAdbBqKBwi41SgWLmmrQ2w96x8";
const OUTPUT_DIR = path.join(__dirname, "../public/images/logos");
const REF_IMAGE = path.join(OUTPUT_DIR, "logo-ai-3.png");

const refBase64 = fs.readFileSync(REF_IMAGE).toString("base64");

const VARIATIONS = [
  { filename: "logo-var-1.png", prompt: "Based on this dove-cross Catholic logo, create a variation with the Korean text '굿뉴스' and small English text 'CATHOLIC' integrated below the icon. Same warm terracotta brick and gold color palette. Clean professional branding on white background. Logo lockup format." },
  { filename: "logo-var-2.png", prompt: "Redesign this dove-cross Catholic logo in a more minimal geometric style. Add '굿뉴스' text in a modern sans-serif Korean font to the right of the icon. Include tiny 'CATHOLIC' text above in spaced letters. Terracotta and amber gold colors on white background." },
  { filename: "logo-var-3.png", prompt: "Create a horizontal logo variation based on this dove-cross design. The dove icon on left, then '굿뉴스' in bold Korean typography, with 'GoodNews' in elegant serif below. Warm brick red and gold. White background. Professional brand identity." },
  { filename: "logo-var-4.png", prompt: "Reimagine this dove-cross Catholic logo with a circular badge/emblem format. The dove-cross icon in the center, '가톨릭' text curved on top, '굿뉴스' text curved on bottom. Terracotta brick color, vintage seal aesthetic. White background." },
  { filename: "logo-var-5.png", prompt: "Create a stacked vertical logo variation based on this dove-cross. Icon on top, '굿뉴스' in large bold Korean text in the middle, 'Catholic Portal' in small English below. Warm terracotta and deep brick red colors. Clean white background." },
  { filename: "logo-var-6.png", prompt: "Simplify this dove-cross logo into ultra-minimal line art. Single continuous line forming both the dove and cross. Add '굿뉴스' text beside it in a refined thin Korean font. Brick terracotta color only. White background. Elegant minimalism." },
  { filename: "logo-var-7.png", prompt: "Transform this dove-cross Catholic logo into a modern app icon style. Rounded square shape, the dove-cross centered inside, with '굿뉴스' text below the icon. Gradient from terracotta to warm amber gold. White background around the icon." },
  { filename: "logo-var-8.png", prompt: "Create a monochrome dark version of this dove-cross logo. Deep charcoal brown dove-cross icon with '굿뉴스' in bold, 'CATHOLIC GOOD NEWS' in small caps. Sophisticated dark branding. On cream/off-white background." },
  { filename: "logo-var-9.png", prompt: "Redesign this dove-cross logo with stained glass window inspiration. The dove-cross inside a gothic arch frame, colorful but muted stained glass style. '굿뉴스' in decorative Korean serif below. Warm terracotta dominant. White background." },
  { filename: "logo-var-10.png", prompt: "Create an editorial/magazine masthead version of this dove-cross logo. Wide horizontal format. Small dove-cross icon, then '굿뉴스' in large elegant display typography, with a thin line separator and 'catholic.or.kr' in small text. Warm brick and gold. White background." },
];

async function generateVariation(prompt: string, filename: string) {
  const url = `https://generativelanguage.googleapis.com/v1beta/models/gemini-3.1-flash-image-preview:generateContent?key=${API_KEY}`;

  console.log(`Generating: ${filename}...`);

  const response = await fetch(url, {
    method: "POST",
    headers: { "Content-Type": "application/json" },
    body: JSON.stringify({
      contents: [{
        parts: [
          { inlineData: { mimeType: "image/png", data: refBase64 } },
          { text: `Look at this reference logo image. ${prompt}` },
        ],
      }],
      generationConfig: { responseModalities: ["TEXT", "IMAGE"] },
    }),
  });

  if (!response.ok) {
    console.error(`Error: ${response.status} ${await response.text()}`);
    return false;
  }

  const data = await response.json();
  for (const part of data.candidates?.[0]?.content?.parts || []) {
    if (part.inlineData) {
      const buffer = Buffer.from(part.inlineData.data, "base64");
      fs.writeFileSync(path.join(OUTPUT_DIR, filename), buffer);
      console.log(`  Saved: ${filename} (${(buffer.length / 1024).toFixed(0)} KB)`);
      return true;
    }
  }
  console.error(`  No image for ${filename}`);
  return false;
}

async function main() {
  console.log("Generating AI3 dove-cross variations with text...\n");
  for (const v of VARIATIONS) {
    await generateVariation(v.prompt, v.filename);
    await new Promise((r) => setTimeout(r, 2000));
  }
  console.log("\nDone!");
}

main().catch(console.error);
