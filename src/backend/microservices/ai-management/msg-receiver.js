import zmq from "zeromq";
import { validateAgainstSchema, extractValidFields } from './lib/validate/validate.js'
import { aiManager } from "./processing-funcs/ai-manager.js";

const sock = new zmq.Reply();

// bind once (this is your "listening port")
await sock.bind("tcp://127.0.0.1:4001");

const aiRequestSchema = {
    mode: { required: true },
    message: { required: false },

    context: {
        required: true,
        type: "object"
    }
};

console.log("AI Manager listening on ZeroMQ...");

for await (const [msg] of sock) {
    try {
        const requestObj = JSON.parse(msg.toString());
        validateAgainstSchema(requestObj, aiRequestSchema);
        const validObj = extractValidFields(requestObj, aiRequestSchema);

        console.log("Received:", validObj);
        // const result = { success: true, data: "This is a placeholder response from the AI Manager." };
        const result = await aiManager(validObj);

        await sock.send(JSON.stringify(result));
        console.log("MADE IT PAST RESPONSE");
    } catch (err) {
        await sock.send(JSON.stringify({ error: err.message }));
    }
}