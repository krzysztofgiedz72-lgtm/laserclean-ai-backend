import express from "express";
import cors from "cors";
import fetch from "node-fetch";
import dotenv from "dotenv";

dotenv.config();

const app = express();
app.use(cors());
app.use(express.json());

const SYSTEM_PROMPT = `
You are the AI assistant for LaserClean Stockholm.
You are professional, calm, sales-oriented but not pushy.
You explain laser cleaning services and pricing approximately.
Never give final prices.
Always ask for missing details (photos, location, phone).
`;

app.post("/chat", async (req, res) => {
  const userMessage = req.body.message;
  const lang = (req.body.lang || "").toLowerCase();

  let languageInstruction = "Respond in Swedish.";
  if (lang.startsWith("pl")) {
    languageInstruction = "Respond ONLY in Polish.";
  } else if (lang.startsWith("en")) {
    languageInstruction = "Respond ONLY in English.";
  }

  try {
    const aiRes = await fetch("https://api.openai.com/v1/chat/completions", {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
        "Authorization": `Bearer ${process.env.OPENAI_API_KEY}`
      },
      body: JSON.stringify({
        model: "gpt-4o-mini",
        messages: [
          {
            role: "system",
            content: `${SYSTEM_PROMPT}\n${languageInstruction}`
          },
          {
            role: "user",
            content: userMessage
          }
        ],
        temperature: 0.4
      })
    });

    const data = await aiRes.json();
    console.log("OPENAI RESPONSE:", JSON.stringify(data, null, 2));

    res.json({
      reply: data.choices[0].message.content
    });

  } catch (err) {
    console.error(err);
    res.status(500).json({
      reply: "Server error"
    });
  }
});

app.listen(3000, () => {
  console.log("LaserClean AI backend running on port 3000");
});