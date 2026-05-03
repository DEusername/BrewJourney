import { Router } from 'express'

import prisma from '../lib/prisma.js'
import zmq from "zeromq";

const router = Router()

const sock = new zmq.Request();
sock.connect("tcp://127.0.0.1:4001");

// expects req.body.userID
// expects req.body.message
// expects req.body.conversationID

router.post("/coaching", async (req, res) => {
    req.body.userID = parseInt(req.body.userID);
    req.body.conversationID = parseInt(req.body.conversationID)

    // process user info
    const user = await prisma.users.findUnique({
        where: {
            id: req.body.userID
        },
        select: {
            firstName: true,
            lastName: true,
            grinder: {
                select: {
                    grinderName: true,
                    minSettingFine: true,
                    maxSettingCoarse: true
                }
            }
        }
    })
    // console.log("user making AI request:", user);

    // process message logs (logs must exist to call AI)
    const logs = await prisma.brewLogs.findMany({
        where: {
            userId: req.body.userID
        },
        orderBy: {
            createdOn: "desc"
        },
        take: 5,
        select: {
            grinder: {
                select: {
                    grinderName: true,
                    minSettingFine: true,
                    maxSettingCoarse: true
                }
            },
            brewMethod: {
                select: {
                    methodName: true,
                    defaultRatio: true,
                    description: true
                }
            },
            coffeeName: true,
            roastLevel: true,
            targetRatio: true,
            doseGrams: true,
            targetWaterGrams: true,
            actualWaterGrams: true,
            grindSize: true,
            brewTimeSeconds: true,
            waterTemp: true,
            resultRating: true,
            notes: true,
            createdOn: true
        }
    })
    console.log("recent brew logs for user:", logs);
    if (logs.length == 0)
        res.send({ msg: "User must already have logs stored" }).status(200)

    // process conversation info
    let conversationSummary = {}
    if (req.body.conversationID != undefined) {
        conversationSummary = await prisma.conversations.findUnique({
            where: {
                id: req.body.conversationID
            },
            select: {
                title: true,
                summary: true
            }
        })
    }
    // console.log("conversationSummary content: ", conversationSummary)

    let recentMessages = [];
    if (req.body.conversationID != undefined) {
        recentMessages = await prisma.messages.findMany({
            where: {
                conversationId: req.body.conversationID
            },
            orderBy: {
                createdAt: "desc"
            },
            take: 12,
            select: {
                context: true
            }
        })
    }

    let geminiFormattedMessages = []
    for (let i = 0; i < recentMessages.length; i++) {
        const raw = recentMessages[i].context;

        if (!raw) continue;

        try {
            const parsed = JSON.parse(raw);

            if (parsed && parsed.role && parsed.parts) {
                geminiFormattedMessages.push(parsed);
            }
        } catch (err) {
            console.log("Skipping bad message JSON:", raw);
        }
    }
    // console.log("recent conversation messages for user:", geminiFormattedMessages);


    const payload = {
        mode: "coaching",
        message: req.body.message,

        context: {
            user: user,
            latestBrewLogs: logs,
            pastConversations:
            {
                conversationSummary: conversationSummary,
                recentMessages: geminiFormattedMessages
            }
        }
    }

    await sock.send(JSON.stringify(payload));

    const [reply] = await sock.receive();
    const parsedReply = JSON.parse(reply.toString())

    // update conversation with a new summary
    const summaryTextString = parsedReply.CONVERSATION_SUMMARY.summary;
    console.log("Summary text string: ", summaryTextString);
    prisma.conversations.update({
        where: {
            id: req.body.conversationID
        },
        data: {
            summary: summaryTextString
        }
    })

    // store last assembled user message
    console.log("user message :", JSON.stringify(parsedReply.userPrompt))
    await prisma.messages.create({
        data: {
            conversationId: req.body.conversationID,
            context: JSON.stringify(parsedReply.userPrompt)
        }
    });

    // store model message
    let modelSpecificResponseObj = {
        DIAGNOSIS: parsedReply.DIAGNOSIS,
        REASONING: parsedReply.REASONING,
        RECOMMENDATION: parsedReply.RECOMMENDATION
    }
    let assembledModelMsg = { role: 'model' }
    assembledModelMsg.parts = [{ text: JSON.stringify(modelSpecificResponseObj) }]
    await prisma.messages.create({
        data: {
            conversationId: req.body.conversationID,
            context: JSON.stringify(assembledModelMsg)
        }
    });
    console.log("Assembled Model Msg: ", assembledModelMsg)

    res.send(parsedReply).status(200);
    console.log("parsed reply: ", parsedReply);
    return;

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