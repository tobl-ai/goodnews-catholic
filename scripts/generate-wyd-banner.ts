import fs from "fs";
import path from "path";

const API_KEY = "AIzaSyBGKyzEZCAdbBqKBwi41SgWLmmrQ2w96x8";
const OUTPUT_DIR = path.join(__dirname, "../public/images/banners");

const prompt = `A beautiful photograph of the real Myeongdong Cathedral (명동대성당) in Seoul, South Korea. This is a famous neo-Gothic red brick Catholic cathedral with a tall central spire. Show the actual cathedral's distinctive architecture: red brick facade, pointed arches, rose window, and the iconic tall bell tower. Golden hour sunset lighting. Korean Catholic youth in casual clothes gathered peacefully in the stone plaza in front of the cathedral. Some holding small Catholic cross banners and Korean flags. NO rainbow flags, NO pride flags. Only Catholic and Korean symbols. Text banners reading WYD 2027. Warm golden amber sunset tones. Professional architectural photography, wide angle, 16:9 aspect ratio.`;

async function main() {
  const url = `https://generativelanguage.googleapis.com/v1beta/models/gemini-3.1-flash-image-preview:generateContent?key=${API_KEY}`;

  console.log("Generating WYD Myeongdong Cathedral banner...");

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
    return;
  }

  const data = await response.json();
  for (const part of data.candidates?.[0]?.content?.parts || []) {
    if (part.inlineData) {
      const buffer = Buffer.from(part.inlineData.data, "base64");
      const filename = `wyd-myeongdong-${Date.now()}.png`;
      fs.writeFileSync(path.join(OUTPUT_DIR, filename), buffer);
      console.log(`Saved: ${filename} (${(buffer.length / 1024).toFixed(0)} KB)`);
      return;
    }
  }
  console.error("No image in response");
}

main().catch(console.error);
