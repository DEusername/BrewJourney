import { GoogleGenAI } from "@google/genai";
import dotenv from "dotenv";

dotenv.config({ path: "./lib/ai/.env.ai.api" });

const ai = new GoogleGenAI({
    apiKey: process.env.GEMINI_API_KEY
});

const responseSchema =
{
    "type": "object",
    "properties": {
        "DIAGNOSIS": {
            "type": "string",
            "description": "Primary issue (e.g. under-extraction, channeling, etc.)"
        },
        "REASONING": {
            "type": "string",
            "description": "Explanation of what is likely wrong with the brewing method"
        },
        "RECOMMENDATIONS": {
            "type": "array",
            "items": {
                "type": "string"
            },
            "description": "Actionable steps the user should take next"
        },
        "CONVERSATION_SUMMARY": {
            "type": "object",
            "description": "Summary of the user's brewing journey and prior troubleshooting context",
            "properties": {
                "title": {
                    "type": "string",
                    "description": "Short title of the conversation history"
                },
                "summary": {
                    "type": "string",
                    "description": "Detailed summary of prior brewing attempts, patterns, and conclusions"
                }
            },
            "required": ["title", "summary"]
        }
    },
    "required": ["DIAGNOSIS", "REASONING", "RECOMMENDATIONS", "CONVERSATION_SUMMARY"]
}

// swap to good to go models, so 
/**
 * gemini-3-flash-preview
 * gemini-2.5-flash
 * 
*/
async function sendQuery(systemContent, userContent) {
    let response = await ai.models.generateContent({
        model: "gemini-2.5-flash",

        systemInstruction: {
            parts: [
                { text: systemContent }
            ]
        },

        contents: userContent,

        config: {
            responseMimeType: "application/json",
            responseJsonSchema: responseSchema
        }
    });

    console.log("Raw response from Gemini API:", response);

    const text = response.candidates?.[0]?.content?.parts?.[0]?.text;
    console.log("Extracted text from candidate:", text);
    const parsed = JSON.parse(text);

    try {
        console.log(parsed)
    } catch (err) {
        console.error("Non-JSON response:", response.text);
        throw new Error("Model did not return valid JSON");
    }

    return parsed;
}

export { sendQuery };

