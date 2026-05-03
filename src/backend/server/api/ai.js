import { Router } from 'express'

import prisma from '../lib/prisma.js'

const router = Router()


// expects req.body.userID
// expects req.body.message
// expects req.body.conversationID


router.post("/ai", async (req, res) => {
    req.body.userID = parseInt(req.body.userID);



    try {
        const aiResponse = await aiManager(req.body);
        res.json(aiResponse);
    } catch (error) {
        console.error("Error processing AI request:", error);
        res.status(500).json({ error: "An error occurred while processing the AI request." });
    }
})

export default router