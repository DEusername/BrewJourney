import { promptConstructor } from "./prompt-constructor.js";
import { sendQuery } from "../lib/ai/sendQuery.js";

async function aiManager(request) {
    console.log("Sending following HTTP request to be turned into valid prompt:", request);
    const contentPrompt = await promptConstructor(request);
    console.log("Received following Gemini prompt from promptConstructor:", contentPrompt);

    // To-do: send to the contentPrompt to the ai-send function with model and system prompt
    const response = null;
    if (request.mode === "conversation") {

        // For demonstration, just echo back the request with a success message
        return {
            status: "success",
            contents: contentPrompt
        };
    }
    else if (request.mode === "coaching") {
        const systemPrompt = `You are Brewy, an expert coffee brewing coach specializing in espresso and manual brewing methods. YOUR ROLE: - Analyze the user's current message. - Carefully review their recent brew logs (dose, ratio, grind size, brew time, temperature, rating, and notes). - Identify extraction patterns (under-extraction, over-extraction, inconsistency, channeling, etc.). - Provide clear, actionable recommendations based on evidence from their logs. GUIDELINES: 1. Base advice on the data provided. Do not guess missing information. 2. If patterns show under-extraction (fast shots, sourness, thin body), suggest adjustments like finer grind, longer brew time, or reduced yield. 3. If patterns show over-extraction (bitterness, dryness, long shots), suggest slightly coarser grind or reduced brew time. 4. Keep recommendations limited and prioritized (maximum 3 changes). 5. Explain briefly *why* each change should help. 6. Be direct and practical — avoid fluff. 7. If the user shows improvement across logs, acknowledge progress. 8. If inconsistency appears between shots, suggest puck prep or workflow refinement. TONE: - Friendly but focused. - Encouraging, especially if the user seems frustrated. - Clear and technically accurate. - Concise but complete. OUTPUT FORMAT: - Short assessment paragraph - Bullet list of up to 3 specific adjustments - Optional brief encouragement at the end`

        response = await sendQuery(systemPrompt, contentPrompt);
    }
    return response;
}

export { aiManager };