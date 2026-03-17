import fs from "fs";
import path from "path";

const API_KEY = process.env.GEMINI_API_KEY || "";
const OUTPUT_DIR = path.join(__dirname, "../public/images/banners");

const BANNERS = [
  {
    filename: "banner-1.png",
    prompt: "A warm photograph of a Catholic Easter market inside a traditional Korean cathedral parish hall. Handcrafted items on display tables with warm lighting. Traditional Korean Catholic church architecture with red brick walls. Warm terracotta and golden amber lighting. Ultra realistic professional photography, wide angle 16:9 aspect ratio.",
  },
  {
    filename: "banner-2.png",
    prompt: "A beautiful overhead photograph of a Korean Catholic Bible study scene. An open Bible on a wooden table with study notes, warm candlelight, and a rosary. Background shows traditional Korean Catholic church interior with red brick walls and wooden pews. Warm amber tones. Realistic photography, 16:9 aspect ratio.",
  },
  {
    filename: "banner-3.png",
    prompt: "Myeongdong Cathedral in Seoul, South Korea, the iconic red brick neo-Gothic Catholic cathedral, photographed at golden hour sunset. The actual Myeongdong Cathedral with its distinctive tall spire and red brick facade. Korean youth gathering in the plaza in front. WYD 2027 Seoul theme. No rainbow flags. Catholic banners with cross symbols. Warm sunset golden light. Real architectural photography, 16:9 aspect ratio.",
  },
  {
    filename: "banner-4.png",
    prompt: "Interior of a traditional Korean Catholic cathedral during Lenten evening liturgy. Purple liturgical cloths on the altar. Warm candlelight illuminating red brick walls and stone columns. Wooden pews with a few worshippers in prayer. Stained glass windows glowing softly. Peaceful meditative atmosphere. Purple and warm amber tones. Realistic photography, 16:9 aspect ratio.",
  },
  {
    filename: "banner-5.png",
    prompt: "Young Korean Catholic volunteers in matching white t-shirts working together at a community food bank outside a red brick Korean Catholic church. Warm natural sunlight, green trees. Genuine candid moment of joy and service. Terracotta brick church visible in background. Professional photography, 16:9 aspect ratio.",
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
  console.error(`No image in response for ${filename}`);
  return false;
}

async function main() {
  console.log("Regenerating banners with Myeongdong Cathedral focus...\n");
  for (const banner of BANNERS) {
    await generateImage(banner.prompt, banner.filename);
    await new Promise((r) => setTimeout(r, 2000));
  }
  console.log("\nDone!");
}

main().catch(console.error);
