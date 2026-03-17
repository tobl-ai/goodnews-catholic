import fs from "fs";
import path from "path";

const API_KEY = "AIzaSyBGKyzEZCAdbBqKBwi41SgWLmmrQ2w96x8";
const OUTPUT_DIR = path.join(__dirname, "../public/images/banners");

const BANNERS = [
  {
    filename: "banner-1.png",
    prompt: "A warm cinematic photograph of a gothic cathedral interior with terracotta brick walls, golden sunlight streaming through stained glass windows casting colorful patterns on stone floor, Easter market decorations with handcrafted items on wooden tables, soft bokeh lights, warm amber and brick tones, ultra realistic, 16:9 aspect ratio, professional photography",
  },
  {
    filename: "banner-2.png",
    prompt: "An artistic overhead shot of an open vintage Bible on a rustic wooden desk, surrounded by warm candlelight, terracotta pottery, dried flowers, reading glasses, and a cup of coffee, cathedral brick wall background with warm golden light, cozy study atmosphere, warm browns and ambers, ultra realistic photography, 16:9 aspect ratio",
  },
  {
    filename: "banner-3.png",
    prompt: "A breathtaking panoramic view of Seoul cityscape at golden hour with Myeongdong Cathedral prominently featured, young people gathering in a plaza below, WYD Seoul 2027 banners flying, warm terracotta and golden sunset colors, brick architectural details, cinematic wide angle photography, 16:9 aspect ratio",
  },
  {
    filename: "banner-4.png",
    prompt: "A serene Lenten scene inside a beautiful brick cathedral during special evening liturgy, purple liturgical cloths draped over altar, flickering candles creating warm shadows on terracotta brick walls, wooden pews, stained glass in background, meditative peaceful atmosphere, warm amber and purple tones, cinematic photography, 16:9 aspect ratio",
  },
  {
    filename: "banner-5.png",
    prompt: "A group of diverse young Catholic volunteers in matching t-shirts joyfully working together at a community service event outside a brick church, warm sunlight, green trees, terracotta and warm earth tones, authentic candid moment, warm friendly atmosphere, professional photography, 16:9 aspect ratio",
  },
];

async function generateImage(prompt: string, filename: string) {
  const url = `https://generativelanguage.googleapis.com/v1beta/models/gemini-3.1-flash-image-preview:generateContent?key=${API_KEY}`;

  console.log(`Generating: ${filename}...`);

  const response = await fetch(url, {
    method: "POST",
    headers: { "Content-Type": "application/json" },
    body: JSON.stringify({
      contents: [
        {
          parts: [
            {
              text: `Generate a high quality image: ${prompt}`,
            },
          ],
        },
      ],
      generationConfig: {
        responseModalities: ["TEXT", "IMAGE"],
      },
    }),
  });

  if (!response.ok) {
    const errorText = await response.text();
    console.error(`Error for ${filename}: ${response.status} ${errorText}`);
    return false;
  }

  const data = await response.json();
  const candidates = data.candidates;

  if (!candidates || candidates.length === 0) {
    console.error(`No candidates for ${filename}`);
    return false;
  }

  for (const part of candidates[0].content.parts) {
    if (part.inlineData) {
      const buffer = Buffer.from(part.inlineData.data, "base64");
      const outPath = path.join(OUTPUT_DIR, filename);
      fs.writeFileSync(outPath, buffer);
      console.log(`  Saved: ${outPath} (${(buffer.length / 1024).toFixed(0)} KB)`);
      return true;
    }
  }

  console.error(`No image data in response for ${filename}`);
  console.log(JSON.stringify(data.candidates[0].content.parts.map((p: Record<string, unknown>) => Object.keys(p)), null, 2));
  return false;
}

async function main() {
  console.log("Generating banner images with Gemini...\n");

  if (!fs.existsSync(OUTPUT_DIR)) {
    fs.mkdirSync(OUTPUT_DIR, { recursive: true });
  }

  for (const banner of BANNERS) {
    const success = await generateImage(banner.prompt, banner.filename);
    if (!success) {
      console.log(`  Retrying ${banner.filename}...`);
      await generateImage(banner.prompt, banner.filename);
    }
    await new Promise((r) => setTimeout(r, 2000));
  }

  console.log("\nDone!");
}

main().catch(console.error);
