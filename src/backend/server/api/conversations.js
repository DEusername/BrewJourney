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

    const convoID = parseInt(req.params.id);

    if (isNaN(convoID)) {
        return res.status(400).send({ error: "Invalid id" });
    }

    const recentMessages = await prisma.messages.findMany({
        where: {
            conversationId: convoID
        },
        orderBy: {
            createdAt: "desc"
        },
        select: {
            context: true
        }
    });

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

    return res.status(200).json(geminiFormattedMessages);
});

export default router