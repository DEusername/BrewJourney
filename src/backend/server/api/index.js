import { Router } from 'express'
import prisma from '../lib/prisma.js';

import ai from './ai.js'
import brewlogs from './brewlogs.js'
import conversations from './conversations.js'
import users from './users.js'
import grinders from './grinders.js'
import brewmethods from './brewmethods.js'

// ex for import: import businessesRouter from './businesses.js'

const router = Router()
// ex for using the router: router.use('/businesses', businessesRouter)

// Setup for routers for different route handling topics
router.use("/ai", ai)
router.use("/brewlogs", brewlogs)
router.use("/conversations", conversations)
router.use("/users", users)
router.use("/grinders", grinders)
router.use("/brewmethods", brewmethods)

// Testing route for backend
router.get("/", async (req, res) => {
    res.send("Backend routes being sent here, and to respective routers")
});

export default router
