import { Router } from 'express'

import coachingRouter from './routes/coaching.js'

const router = Router()

router.use('/coaching', coachingRouter)

export default router
