import { Router } from 'express'

import prisma from '../lib/prisma.js'

const router = Router()

// expects req.body.userID
// expects req.body.message
// expects req.body.conversationID

router.post("/", async (req, res) => {
    let responseObj = null;

    responseObj.message = req.body.message;

    req.body.userID = parseInt(req.body.userID);

    const user = await prisma.users.findUnique({
        where: {
            id: req.body.userID
        },
        include: {
            grinder: true,
        }
    })
    console.log("user making AI request:", user);

    const logs = await prisma.brewLogs.findMany({
        where: {
            userId: req.body.userID
        },
        orderBy: {
            createdAt: "desc"
        },
        take: 5
    })
    console.log("recent brew logs for user:", logs);

    const conversation = await prisma.conversations.findUnique({

    })

    console.log("user making AI request:", user);

    if (!user) {
        res.status(404).json({ error: "User not found" });
        return;
    }

    res.status(200).json({ message: "AI processing started" });

    // try {
    //     const aiResponse = await aiManager(req.body);
    //     res.json(aiResponse);
    // } catch (error) {
    //     console.error("Error processing AI request:", error);
    //     res.status(500).json({ error: "An error occurred while processing the AI request." });
    // }
})

export default router