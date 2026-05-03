import { GoogleGenAI } from "@google/genai";
import dotenv from "dotenv";

dotenv.config({ path: "./lib/ai/.env.ai.api" });

const ai = new GoogleGenAI({
    apiKey: process.env.GEMINI_API_KEY
});

async function sendQuery(systemContent, userContent) {
    let response = await ai.models.generateContent({
        model: "gemini-3-flash-preview",

        systemInstruction: {
            parts: [
                { text: systemContent }
            ]
        },

        contents: userContent,

        config: {
            responseMimeType: "application/json"
        }
    });

    console.log("Raw response from Gemini API:", response);

    const candidate = response.candidates?.[0];
    console.log("Extracted candidate from response:", candidate);
    const text = candidate?.content?.parts?.[0]?.text;
    console.log("Extracted text from candidate:", text);
    const parsed = JSON.parse(text);

    try {
        console.log(parsed)
    } catch (err) {
        console.error("Non-JSON response:", response.text);
        throw new Error("Model did not return valid JSON");
    }
}

export { sendQuery };

