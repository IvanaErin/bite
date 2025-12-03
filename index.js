import express from "express";
import fetch from "node-fetch";
import cors from "cors";

const app = express();
app.use(express.json());

app.use(cors({
    origin: "*",
    methods: ["GET", "POST", "OPTIONS"]
}));

const OPENAI_KEY = process.env.OPENAI_KEY;

// Test routes
app.get("/", (req, res) => {
    res.send("Server is running.");
});

app.get("/ai", (req, res) => {
    res.send("AI proxy ready. Use POST /ai.");
});

// AI endpoint
app.post("/ai", async (req, res) => {
    try {
        const response = await fetch("https://api.openai.com/v1/responses", {
            method: "POST",
            headers: {
                "Content-Type": "application/json",
                "Authorization": `Bearer ${OPENAI_KEY}`
            },
            body: JSON.stringify({
                model: "gpt-4o-mini",
                input: req.body.message
            })
        });

        const data = await response.json();
        res.json({ reply: data.output_text || "No response" });

    } catch (err) {
        console.error(err);
        res.status(500).json({ reply: "Error contacting AI server." });
    }
});

app.listen(3000, () => console.log("Proxy running on port 3000"));
