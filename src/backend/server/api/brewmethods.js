import { Router } from 'express'
import prisma from '../lib/prisma.js';

const router = Router()

// Routes in this file will be for developer side only, since brewMethods is a lookup table

router.get("/all", async (req, res) => {
	const count = await prisma.brewMethods.count();
	if (count == 0){
		res.status(404).send("No brewmethods in the database")
	} else {
		const brewMethods = await prisma.brewMethods.findMany();
		res.status(200).send(brewMethods);
	}
});

// Adds multiple brew methods
router.post("/add", async (req, res) => {

	// assumes request body is in the proper format: array of objects

	try {
		const result = await prisma.brewMethods.createMany({
			data: req.body,
			skipDuplicates: true,
		});
		const count = result.count;
		res.status(200).send(`Successfully added ${count} new brew methods`);
	} catch (err) {
		console.log("Error adding multiple brew methods: ", err);
		res.status(400).send("Error adding multiple brew methods");
	}

});



export default router