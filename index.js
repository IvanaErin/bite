import express from "express";
import cors from "cors";
import OpenAI from "openai";

const app = express();
app.use(express.json());
app.use(cors());

// Load your API key from Render environment variables
const client = new OpenAI({
  apiKey: process.env.OPENAI_KEY
});

// AI endpoint
app.post("/ai", async (req, res) => {
  try {
    const userMessage = req.body.message;

    const response = await client.responses.create({
      model: "gpt-4o-mini",
      input: userMessage
    });

    res.json({
      reply: response.output_text
    });

  } catch (err) {
    console.error(err);
    res.status(500).json({ reply: "Error contacting AI server." });
  }
});

// Default homepage
app.get("/", (req, res) => {
  res.send("AI Proxy is running!");
});

app.listen(3000, () => console.log("Proxy running on port 3000"));
