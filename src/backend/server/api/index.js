import { Router } from 'express'
import prisma from '../lib/prisma.js';

// ex for import: import businessesRouter from './businesses.js'

const router = Router()
// ex for using the router: router.use('/businesses', businessesRouter)

// Testing route for the database setup
router.get("/", async (req, res) => {
  	const userCount = await prisma.Users.count(); 
  	res.json(
    	userCount == 0
    	? "No users have been added yet."
      	: "Some users have been added to the database.", 
	); 
}); 

export default router
