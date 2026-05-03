import { Router } from 'express'
import prisma from '../lib/prisma.js';

const router = Router()

router.get("/users/:id", async (req, res) => {
    const userID = parseInt(req.params.id);

    const allUserConvos = await prisma.conversations.findMany({
        where: {
            userId: userID
        },
        orderBy: {
            createdAt: "desc"
        },
        select: {
            id: true,
            title: true
        }
    });

    return res.status(200).json(allUserConvos);

});

router.get("/:id", async (req, res) => {

    console.log(1)
    const convoID = parseInt(req.params.id);
    console.log("Convo: ", convoID)

    if (isNaN(convoID)) {
        return res.status(400).send({ error: "Invalid id" });
    }
    console.log(2)

    const recentMessages = await prisma.messages.findMany({
        where: {
            conversationId: convoID
        },
        orderBy: {
            createdAt: "asc"
        },
        select: {
            context: true
        }
    });

    console.log(3, recentMessages)
    let geminiFormattedMessages = [];

    for (let i = 0; i < recentMessages.length; i++) {
        const raw = recentMessages[i].context;
        if (!raw) continue;

        let parsed;

        try {
            parsed = typeof raw === "string" ? JSON.parse(raw) : raw;
        } catch (err) {
            continue;
        }

        const role = parsed?.role;
        if (parsed?.role && parsed?.parts) {
            console.log(parsed)
            try {
                let parsedTextObj = {}
                parsedTextObj = JSON.parse(parsed.parts[0].text);
                parsedTextObj.role = role
                geminiFormattedMessages.push(parsedTextObj)
            } catch (err) {
                console.log("Failed to parse model message:", err);
                geminiFormattedMessages.push(parsed);
            }
        }
    }

    console.log("Output: ", geminiFormattedMessages)
    return res.status(200).json(geminiFormattedMessages);
});

export default router