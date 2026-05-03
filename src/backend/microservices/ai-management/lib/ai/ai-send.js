import { GoogleGenAI } from "@google/genai";
import dotenv from "dotenv";

dotenv.config({ path: ".env.ai.api" });

const ai = new GoogleGenAI({
    apiKey: process.env.GEMINI_API_KEY
});

async function sendQuery(specifiedModel, systemInstruction, userContent) {
    const response = await ai.models.generateContent({
        model: specifiedModel,

        systemInstruction: {
            parts: [
                { text: `${systemInstruction}` }
            ]
        },

        contents: [
            {
                role: "user",
                parts: [{ text: `${userContent}` }]
            }
        ]

    });
    console.log(response.text);
    return response.text;
}

export default sendQuery;

