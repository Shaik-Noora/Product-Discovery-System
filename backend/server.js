require("dotenv").config();
const express = require("express");
const cors = require("cors");
const axios = require("axios");
const fs = require("fs");
const path = require("path");

const app = express();

app.use(cors());
app.use(express.json());

/* ---------- STATIC IMAGES (FIXED PATH) ---------- */
app.use(
  "/images",
  express.static(path.join(__dirname, "data/images"))
);

/* ---------- LOAD PRODUCTS ---------- */
const products = JSON.parse(
  fs.readFileSync(path.join(__dirname, "data/products.json"))
);

/* ---------- GET PRODUCTS ---------- */
app.get("/api/products", (req, res) => {
  res.json(products);
});

/* ---------- GEMINI CALL ---------- */
async function getAvailableModel() {
  try {
    const res = await axios.get(
      `https://generativelanguage.googleapis.com/v1beta/models?key=${process.env.GEMINI_API_KEY}`
    );

    const models = res.data.models;

    const usable = models.find(m =>
      m.supportedGenerationMethods?.includes("generateContent")
    );

    if (!usable) throw new Error("No usable Gemini model");

    console.log("✅ Using model:", usable.name);

    return usable.name;
  } catch (err) {
    console.log("Model fetch error:", err.message);
    throw err;
  }
}

async function callGemini(query) {
  const prompt = `
You are an AI product discovery assistant.

Products:
${JSON.stringify(products)}

User query: "${query}"

Return STRICT JSON:
{
 "products": ["P001","P002"],
 "summary": "2 sentence shopping assistant explanation explaining WHY these products match and WHEN to choose each."
}
`;

  try {
    const modelName = await getAvailableModel();

    const response = await axios.post(
      `https://generativelanguage.googleapis.com/v1beta/${modelName}:generateContent?key=${process.env.GEMINI_API_KEY}`,
      {
        contents: [{ parts: [{ text: prompt }] }]
      }
    );

    const text =
      response.data.candidates[0].content.parts[0].text;

    const jsonMatch = text.match(/\{[\s\S]*\}/);

    if (!jsonMatch) {
      throw new Error("No JSON returned");
    }

    return JSON.parse(jsonMatch[0]);
  } catch (err) {

  console.error("❌ GEMINI ERROR:", {
    message: err.message,
    status: err.response?.status,
    data: err.response?.data
  });

  return {
    products: products.slice(0, 2).map(p => p.id),
    summary:
      "AI is temporarily unavailable due to rate limits or network issues. Showing popular products instead.",
    fallback: true
  };
}
}

/* ---------- ASK ENDPOINT ---------- */
app.post("/api/ask", async (req, res) => {
  const { query } = req.body;

  if (!query)
    return res.status(400).json({ error: "Query required" });

  const ai = await callGemini(query);

  // ⭐ USE AI DECISION
  const result = products.filter(p =>
    ai.products.includes(p.id)
  );

  res.json({
    summary: ai.summary,
    products: result
  });
});

/* ---------- START SERVER ---------- */
app.listen(process.env.PORT, () =>
  console.log(`✅ Backend running on port ${process.env.PORT}`)
);