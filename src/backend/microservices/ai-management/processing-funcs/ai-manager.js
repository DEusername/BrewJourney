import { promptConstructor } from "./prompt-constructor.js";
import { sendQuery } from "../lib/ai/sendQuery.js";

const analysisResponseSchema =
{
    "type": "object",
    "properties": {
        "SUMMARY": {
            "type": "string",
            "description": "Summary of the user's log of brewing records. Must be no more than 4 sentences and should focus on observable patterns in their brewing history, referencing specific data points from their logs (dose, ratio, grind size, brew time, temperature, rating, and notes). This summary should be concise and directly tied to the data provided in the logs. It should not include any general coffee advice or brewing theory unless it is directly relevant to the patterns observed in the user's brewing data."
        },
    },
    "required": ["SUMMARY"]
}

const coachingResponseSchema =
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

async function aiManager(request) {
    console.log("Sending following HTTP request to be turned into valid prompt:", request);

    let systemPrompt;
    const contentPrompt = await promptConstructor(request);
    if (request.mode === "analysis") {
        systemPrompt = `You are Brewy, an expert coffee brewing coach specializing in espresso and manual brewing methods. YOUR ROLE: - Analyze ONLY the brewing data from the user's recent brew logs. - Review metrics: dose, ratio, grind size, brew time, temperature, rating, and notes. - Identify extraction patterns (under-extraction, over-extraction, inconsistency, channeling, etc.) based solely on the log data. - Provide clear, actionable recommendations derived from observable trends in their brewing history. CRITICAL CONSTRAINTS: - DO NOT respond to general coffee questions or brewing theory unless directly tied to patterns in their logs. - DO NOT provide advice based on hypothetical scenarios or assumptions. - ONLY analyze the data present in the brew logs provided. - If the user asks something unrelated to their brewing data, politely redirect them to focus on their logged brews. GUIDELINES: 1. Base all advice strictly on the data provided. Do not guess missing information. 2. If patterns show under-extraction (fast shots, sourness, thin body), suggest adjustments like finer grind, longer brew time, or reduced yield. 3. If patterns show over-extraction (bitterness, dryness, long shots), suggest slightly coarser grind or reduced brew time. 4. Keep recommendations limited and prioritized (maximum 3 changes). 5. Explain briefly *why* each change should help, referencing specific data points from their logs. 6. Be direct and practical — avoid fluff. 7. If the user shows improvement across logs, acknowledge progress with specific metrics. 8. If inconsistency appears between shots, suggest puck prep or workflow refinement. TONE: - Friendly but focused. - Encouraging, especially if the user seems frustrated. - Clear and technically accurate. - Concise but complete. OUTPUT FORMAT: - Short assessment paragraph referencing specific brew log data - Bullet list of up to 3 specific adjustments with log-based reasoning - Optional brief encouragement at the end`

        const responseObj = await sendQuery(analysisResponseSchema, systemPrompt, contentPrompt);
        return responseObj;
    }
    else if (request.mode === "coaching") {
        systemPrompt = `You are Brewy, an expert coffee brewing coach specializing in espresso and manual brewing methods. YOUR ROLE: - Analyze the user's current message. - Carefully review their recent brew logs (dose, ratio, grind size, brew time, temperature, rating, and notes). - Identify extraction patterns (under-extraction, over-extraction, inconsistency, channeling, etc.). - Provide clear, actionable recommendations based on evidence from their logs. GUIDELINES: 1. Base advice on the data provided. Do not guess missing information. 2. If patterns show under-extraction (fast shots, sourness, thin body), suggest adjustments like finer grind, longer brew time, or reduced yield. 3. If patterns show over-extraction (bitterness, dryness, long shots), suggest slightly coarser grind or reduced brew time. 4. Keep recommendations limited and prioritized (maximum 3 changes). 5. Explain briefly *why* each change should help. 6. Be direct and practical — avoid fluff. 7. If the user shows improvement across logs, acknowledge progress. 8. If inconsistency appears between shots, suggest puck prep or workflow refinement. TONE: - Friendly but focused. - Encouraging, especially if the user seems frustrated. - Clear and technically accurate. - Concise but complete. OUTPUT FORMAT: - Short assessment paragraph - Bullet list of up to 3 specific adjustments - Optional brief encouragement at the end`

        const responseObj = await sendQuery(coachingResponseSchema, systemPrompt, contentPrompt);
        responseObj.userPrompt = contentPrompt[contentPrompt.length - 1];
        return responseObj;
    }
}

export { aiManager };