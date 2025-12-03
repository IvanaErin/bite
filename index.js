import express from "express";
import cors from "cors";
import OpenAI from "openai";

const app = express();
app.use(express.json());
app.use(cors());

// OpenAI client
const client = new OpenAI({
  apiKey: process.env.OPENAI_KEY
});

// POST /ai endpoint
app.post("/ai", async (req, res) => {
  try {
    const userMessage = req.body.message;

    const response = await client.responses.create({
      model: "gpt-4o-mini",
      input: userMessage
    });

    res.json({ reply: response.output_text });
  } catch (err) {
    console.error(err);
    res.status(500).json({ reply: "AI Server Error" });
  }
});

// test route
app.get("/", (req, res) => {
  res.send("AI Proxy is running!");
});

// Render must use process.env.PORT
const PORT = process.env.PORT || 3000;
app.listen(PORT, () => console.log("Server running on port " + PORT));
