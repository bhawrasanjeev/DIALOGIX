require("dotenv").config();
const express = require("express");
const axios = require("axios");
const cors = require("cors");

const app = express();
const port = process.env.PORT || 5000;

app.use(express.json());
app.use(cors());

// Google Gemini API Route
app.post("/gemini", async (req, res) => {
    try {
        const { message } = req.body;

        const response = await axios.post(
            `https://generativelanguage.googleapis.com/v1/models/gemini-pro:generateContent?key=${process.env.GOOGLE_API_KEY}`,
            {
                contents: [{ parts: [{ text: message }] }],
            }
        );

        res.json({ response: response.data.candidates[0].content.parts[0].text });
    } catch (error) {
        res.status(500).json({ error: error.message });
    }
});

app.listen(port, () => {
    console.log(`Server running on port ${port}`);
});
