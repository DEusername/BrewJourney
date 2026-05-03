import { Router } from 'express'

const router = Router()

// Testing route for the ai system setup
router.post("/", async (req, res) => {

    res.send("Hello world").status(200)
});

export default router