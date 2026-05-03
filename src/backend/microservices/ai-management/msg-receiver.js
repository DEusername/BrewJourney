import express from "express";
import { validateAgainstSchema, extractValidFields } from './lib/validate/validate.js'
import { aiManager } from "./processing-funcs/ai-manager.js";

const app = express()
const port = process.env.PORT || 4001

app.use(express.json());

const aiRequestSchema = {
    message: { required: false },

    context: {
        required: true,
        type: "object"
    }
};

app.post("/", async (req, res) => {
    console.log("Received ai request with body:", req.body);

    const isValid = validateAgainstSchema(req.body, aiRequestSchema);
    if (!isValid) {
        return res.status(400).send("Invalid request body");
    }

    const validFieldsObj = extractValidFields(req.body, aiRequestSchema);

    const result = await aiManager(validFieldsObj);

    res.send(result).status(200)
});

app.use('*splat', function (req, res, next) {
    res.status(404).send({
        error: `Requested resource ${req.originalUrl} does not exist`
    })
})

app.listen(port, () => {
    console.log("AI Manager running on port 4001");
});